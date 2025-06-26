from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('subscribe/', views.subscribe_newsletter, name='subscribe_newsletter'),
    path('send-support-email/', views.send_support_email, name='send_support_email'),
]
