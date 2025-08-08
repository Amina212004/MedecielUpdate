from django.urls import path

from .views import (
    AdminAddUserView,
    AdminUsersView,
    CurrentUserView,
    LoginView,
    MedicalStaffView,
    PasswordResetRequestView,
    PasswordResetView,
    PatientListView,
    SignupView,
    UserVerificationView,
    VerifyCodeView,
    ProfileUpdateView
)

app_name = "accounts"

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("signup/", SignupView.as_view(), name="signup"),
    path("admin/add-user/", AdminAddUserView.as_view(), name="admin_add_user"),
    path(
        "password-reset-request/",
        PasswordResetRequestView.as_view(),
        name="password_reset_request",
    ),
    path("verify-code/", VerifyCodeView.as_view(), name="verify_code"),
    path("password-reset/", PasswordResetView.as_view(), name="password_reset"),
    path("verify-user/", UserVerificationView.as_view(), name="verify_user"),
    path("recent-users/", AdminUsersView.as_view(), name="recent-users"),
    path("patients/", PatientListView.as_view(), name="patient-list"),
    path("current-user/", CurrentUserView.as_view(), name="current-user"),
    path("medical-staff/", MedicalStaffView.as_view(), name="medical-staff"),
    path('profile/update/', ProfileUpdateView.as_view(), name='profile-update'),
]
