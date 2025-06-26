from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    role = models.CharField(max_length=20, choices=[
        ('Student', 'Student'),
        ('Teacher', 'Teacher'),
        ('ATS', 'ATS'),
    ])

    def __str__(self):
        return self.email