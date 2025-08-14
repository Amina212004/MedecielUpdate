import random
import string
from datetime import timedelta

from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.pagination import PageNumberPagination
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
                    "user": UserSerializer(user, context={"request": request}).data
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

        if not user_id or not action:
            return Response(
                {"error": "user_id and action are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = CustomUser.objects.get(id=user_id, is_verified=False)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User not found or already verified"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if action == "accept":
            user.is_verified = True
            user.save()
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
                {"error": "Invalid action. Use 'accept' or 'delete'"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class AdminUsersView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        days = int(request.query_params.get("days", 7))
        role = request.query_params.get("role", None)
        if role and role not in ["Medecin", "Assistant", "Director"]:
            return Response(
                {"error": "Invalid role. Use 'Medecin', 'Assistant', or 'Director'."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        cutoff_date = timezone.now() - timedelta(days=days)
        query = CustomUser.objects.filter(
            created_by_admin=True, date_joined__gte=cutoff_date
        )
        if role:
            query = query.filter(role=role)
        users = query.order_by("-date_joined")[:10]
        serializer = UserSerializer(users, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class PatientListView(APIView):
    permission_classes = [IsAdminUser]
    pagination_class = PageNumberPagination

    def get(self, request):
        patients = CustomUser.objects.filter(
            role__in=["Student", "Teacher", "ATS"], is_verified=True
        ).order_by("-date_joined")
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(patients, request)
        serializer = UserSerializer(page, many=True, context={"request": request})
        return paginator.get_paginated_response(serializer.data)





class MedicalStaffView(APIView):
    permission_classes = [IsAdminUser]
    pagination_class = PageNumberPagination

    def get(self, request):
        role = request.query_params.get("role", None)
        if role and role not in ["Medecin", "Assistant"]:
            return Response(
                {"error": "Invalid role. Use 'Medecin' or 'Assistant'."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        staff = CustomUser.objects.filter(
            role__in=["Medecin", "Assistant"] if not role else [role], is_verified=True
        ).order_by("-date_joined")
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(staff, request)
        serializer = UserSerializer(page, many=True, context={"request": request})
        return paginator.get_paginated_response(serializer.data)


class ProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserSerializer(
            user, data=request.data, partial=True, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            img_url = request.build_absolute_uri(user.img.url) if user.img else None
            print("Saved img path:", user.img.path if user.img else "No image")
            print("Saved img URL:", img_url)

            return Response(
                {
                    "message": "Profile updated successfully",
                    "user": {
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "role": user.role,
                        "is_verified": user.is_verified,
                        "img": img_url,
                        "initials": (
                            f"{user.first_name[0]}{user.last_name[0]}".upper()
                            if user.first_name and user.last_name
                            else ""
                        ),
                    },
                },
                status=status.HTTP_200_OK,
            )
        errors = serializer.errors
        print("Serializer errors:", errors)  # Debug log
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")

        if not current_password or not new_password:
            return Response(
                {"error": "Current password and new password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.check_password(current_password):
            return Response(
                {"error": "Current password is incorrect"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(new_password) < 8:
            return Response(
                {"error": "New password must be at least 8 characters long"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()
        return Response(
            {"message": "Password updated successfully"},
            status=status.HTTP_200_OK,
        )


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .serializers import UserSerializer
from .models import CustomUser
from rest_framework.pagination import PageNumberPagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class PatientListView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        role = request.query_params.get('role', None)
        patients = CustomUser.objects.all()

        if role and role.lower() != 'all':
            patients = patients.filter(role=role)

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(patients, request)
        serializer = UserSerializer(page, many=True, context={"request": request})
        return paginator.get_paginated_response(serializer.data)

class ToggleAccountStatusView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def patch(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
            user.is_active = request.data.get('is_active', not user.is_active)
            user.save()
            serializer = UserSerializer(user, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
