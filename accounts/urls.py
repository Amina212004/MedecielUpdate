from django.urls import path

from .views import (
    AdminAddUserView,
    LoginView,
    PasswordResetRequestView,
    PasswordResetView,
    RecentUsersView,
    SignupView,
    UserVerificationView,
    VerifyCodeView,
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
    path("recent-users/", RecentUsersView.as_view(), name="recent-users"),
]
