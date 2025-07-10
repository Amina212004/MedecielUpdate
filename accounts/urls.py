from django.urls import path
from .views import (
    LoginView,
    SignupView,
    AdminAddUserView,
    PasswordResetRequestView,
    VerifyCodeView,
    PasswordResetView,
    UserVerificationView,
)

app_name = 'accounts'

urlpatterns = [
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/admin/add-user/', AdminAddUserView.as_view(), name='admin_add_user'),
    path('api/password-reset-request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('api/verify-code/', VerifyCodeView.as_view(), name='verify_code'),
    path('api/password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('api/verify-user/', UserVerificationView.as_view(), name='verify_user'),
]