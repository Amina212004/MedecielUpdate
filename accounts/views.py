import random
import string
from datetime import timedelta

from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser
from .serializers import (
    LoginSerializer,
    PasswordResetRequestSerializer,
    PasswordResetSerializer,
    UserSerializer,
    VerifyCodeSerializer,
)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = authenticate(email=email, password=password)

            if user:

                if user.email == "medeciels@gmail.com":
                    token, created = Token.objects.get_or_create(user=user)
                    return Response(
                        {
                            "token": token.key,
                            "message": "Admin login successful",
                            "role": user.role,
                            "redirect": "adminhome",
                        },
                        status=status.HTTP_200_OK,
                    )

                if not user.is_verified:
                    return Response(
                        {"error": "Your account is awaiting admin verification."},
                        status=status.HTTP_403_FORBIDDEN,
                    )

                if not user.is_active:
                    return Response(
                        {"error": "Your account is deactivated."},
                        status=status.HTTP_403_FORBIDDEN,
                    )

                token, created = Token.objects.get_or_create(user=user)
                return Response(
                    {
                        "token": token.key,
                        "message": "Login successful",
                        "role": user.role,
                        "redirect": "home",
                    },
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.save()
            admin_email = "medeciels@gmail.com"
            send_mail(
                subject="New User Registration Request",
                message=f"A new user has registered:\n\n"
                f"Name: {user.first_name} {user.last_name}\n"
                f"Email: {user.email}\n"
                f"Role: {user.role}\n\n"
                f"Please verify this user in the admin panel.",
                from_email="medeciels@gmail.com",
                recipient_list=[admin_email],
                fail_silently=False,
            )
            return Response(
                {
                    "message": "User registered successfully. Awaiting admin verification."
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminAddUserView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = UserSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.validated_data["is_verified"] = True
            serializer.validated_data["created_by_admin"] = True
            user = serializer.save()
            return Response(
                {
                    "message": f"User {user.email} added successfully.",
                    "user": {
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "role": user.role,
                        "is_verified": user.is_verified,
                        "img": user.img
                        or f"https://randomuser.me/api/portraits/{'men' if user.id % 2 else 'women'}/{user.id % 100}.jpg",
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            try:
                user = CustomUser.objects.get(email=email)
                reset_code = "".join(random.choices(string.digits, k=6))
                user.reset_code = reset_code
                user.reset_code_expiry = timezone.now() + timedelta(hours=1)
                user.save()
                send_mail(
                    subject="Password Reset Verification Code",
                    message=f"Your verification code is: {reset_code}\nThis code is valid for 1 hour.",
                    from_email="medeciels@gmail.com",
                    recipient_list=[email],
                    fail_silently=False,
                )
                return Response(
                    {"message": "Verification code sent to your email"},
                    status=status.HTTP_200_OK,
                )
            except CustomUser.DoesNotExist:
                return Response(
                    {"error": "No user found with this email"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyCodeView(APIView):
    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            code = serializer.validated_data["code"]
            try:
                user = CustomUser.objects.get(email=email)
                if not user.reset_code or user.reset_code != code:
                    return Response(
                        {"error": "Invalid verification code"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                if user.reset_code_expiry < timezone.now():
                    return Response(
                        {"error": "Verification code has expired"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                return Response(
                    {"message": "Code verified successfully"}, status=status.HTTP_200_OK
                )
            except CustomUser.DoesNotExist:
                return Response(
                    {"error": "No user found with this email"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            code = serializer.validated_data["code"]
            new_password = serializer.validated_data["new_password"]
            try:
                user = CustomUser.objects.get(email=email)
                if not user.reset_code or user.reset_code != code:
                    return Response(
                        {"error": "Invalid verification code"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                if user.reset_code_expiry < timezone.now():
                    return Response(
                        {"error": "Verification code has expired"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                user.set_password(new_password)
                user.reset_code = None
                user.reset_code_expiry = None
                user.save()
                return Response(
                    {"message": "Password reset successfully"},
                    status=status.HTTP_200_OK,
                )
            except CustomUser.DoesNotExist:
                return Response(
                    {"error": "No user found with this email"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserVerificationView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = CustomUser.objects.filter(is_verified=False)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = request.data.get("user_id")
        action = request.data.get("action")
        try:
            user = CustomUser.objects.get(id=user_id)
            if action == "accept":
                user.is_verified = True
                user.save()
                send_mail(
                    subject="Account Verified",
                    message=f"Your account ({user.email}) has been verified. You can now log in.",
                    from_email="medeciels@gmail.com",
                    recipient_list=[user.email],
                    fail_silently=False,
                )
                return Response(
                    {"message": f"User {user.email} verified successfully"},
                    status=status.HTTP_200_OK,
                )
            elif action == "delete":
                user.delete()
                return Response(
                    {"message": f"User {user.email} deleted successfully"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST
                )
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )


class RecentUsersView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = CustomUser.objects.filter(created_by_admin=True).order_by(
            "-date_joined"
        )[:4]
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
