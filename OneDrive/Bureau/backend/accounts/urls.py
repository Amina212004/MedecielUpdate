from django.urls import path
from .views import LoginView, SignupView,PasswordResetRequestView,VerifyCodeView,PasswordResetView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('forgotpassword/', PasswordResetRequestView.as_view(), name='forgotpassword'),
    path('verifycode/', VerifyCodeView.as_view(), name='verifycode'),
    path('resetpassword/', PasswordResetView.as_view(), name='resetpassword'),
]