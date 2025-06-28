from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token  
from .serializers import LoginSerializer, UserSerializer, PasswordResetRequestSerializer, VerifyCodeSerializer, PasswordResetSerializer
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
import random
import string
from .models import CustomUser

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'message': 'Login successful'
                }, status=status.HTTP_200_OK)
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'message': 'User created successfully'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = CustomUser.objects.get(email=email)
                reset_code = ''.join(random.choices(string.digits, k=6))
                user.reset_code = reset_code
                user.reset_code_expiry = timezone.now() + timedelta(hours=1)
                user.save()
                send_mail(
                    subject='Password Reset Verification Code',
                    message=f'Your verification code is: {reset_code}\nThis code is valid for 1 hour.',
                    from_email='your-email@gmail.com',
                    recipient_list=[email],
                    fail_silently=False,
                )
                return Response({
                    'message': 'Verification code sent to your email'
                }, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response({
                    'error': 'No user found with this email'
                }, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyCodeView(APIView):
    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            code = serializer.validated_data['code']
            try:
                user = CustomUser.objects.get(email=email)
                if not user.reset_code or user.reset_code != code:
                    return Response({
                        'error': 'Invalid verification code'
                    }, status=status.HTTP_400_BAD_REQUEST)
                if user.reset_code_expiry < timezone.now():
                    return Response({
                        'error': 'Verification code has expired'
                    }, status=status.HTTP_400_BAD_REQUEST)
                return Response({
                    'message': 'Code verified successfully'
                }, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response({
                    'error': 'No user found with this email'
                }, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            code = serializer.validated_data['code']
            new_password = serializer.validated_data['new_password']
            try:
                user = CustomUser.objects.get(email=email)
                if not user.reset_code or user.reset_code != code:
                    return Response({
                        'error': 'Invalid verification code'
                    }, status=status.HTTP_400_BAD_REQUEST)
                if user.reset_code_expiry < timezone.now():
                    return Response({
                        'error': 'Verification code has expired'
                    }, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(new_password)
                user.reset_code = None
                user.reset_code_expiry = None
                user.save()
                return Response({
                    'message': 'Password reset successfully'
                }, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response({
                    'error': 'No user found with this email'
                }, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)