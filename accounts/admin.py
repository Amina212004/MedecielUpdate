from django.contrib import admin

from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "role",
        "is_verified",
        "is_active",
    )
    list_filter = ("role", "is_verified", "is_active")
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "role",
                    "is_verified",
                    "is_active",
                )
            },
        ),
        ("Permissions", {"fields": ("is_staff", "is_superuser")}),
        ("Password Reset", {"fields": ("reset_code", "reset_code_expiry")}),
    )
