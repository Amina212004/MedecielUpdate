from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser


# Proxy model for Medical Staff
class MedicalStaff(CustomUser):
    class Meta:
        proxy = True
        verbose_name = "Medical Staff"
        verbose_name_plural = "Medical Staff"
        app_label = "accounts"


# Proxy model for Doctors
class Doctor(CustomUser):
    class Meta:
        proxy = True
        verbose_name = "Doctor"
        verbose_name_plural = "Doctors"
        app_label = "accounts"


class AssistantDoctor(CustomUser):
    class Meta:
        proxy = True
        verbose_name = "Assistant Doctor"
        verbose_name_plural = "Assistant Doctors"
        app_label = "accounts"


class PatientGroup(CustomUser):
    class Meta:
        proxy = True
        verbose_name = "Patient"
        verbose_name_plural = "Patients"
        app_label = "accounts"


# Proxy model for Directors
class Director(CustomUser):
    class Meta:
        proxy = True
        verbose_name = "Director"
        verbose_name_plural = "Directors"
        app_label = "accounts"


# Proxy model for Admin
class AdminUser(CustomUser):
    class Meta:
        proxy = True
        verbose_name = "Admin"
        verbose_name_plural = "Admins"
        app_label = "accounts"


class RoleBasedUserAdmin(UserAdmin):
    def change_view(self, request, object_id, form_url="", extra_context=None):
        extra_context = extra_context or {}
        extra_context["show_save_and_continue"] = False
        extra_context["show_save_and_add_another"] = False
        return super().change_view(request, object_id, form_url, extra_context)

    def role_display(self, obj):
        from django.utils.html import format_html

        return format_html(
            '<span class="badge badge-role-{}">{}</span>',
            obj.role,
            obj.get_role_display(),
        )

    role_display.short_description = "Role"
    role_display.admin_order_field = "role"

    list_display = (
        "email",
        "first_name",
        "last_name",
        "role_display",
        "is_verified",
        "is_active",
        "created_by_admin",
    )
    list_filter = ("role", "is_verified", "is_active", "created_by_admin")
    search_fields = ("email", "first_name", "last_name")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name", "role", "img")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_verified",
                    "is_staff",
                    "is_superuser",
                    "created_by_admin",
                )
            },
        ),
        ("Reset Info", {"fields": ("reset_code", "reset_code_expiry")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "first_name",
                    "last_name",
                    "role",
                    "img",
                    "is_verified",
                    "is_active",
                    "created_by_admin",
                ),
            },
        ),
    )
    ordering = ("email",)
    filter_horizontal = ()

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if self.model == MedicalStaff:
            return qs.filter(role__in=["Medecin", "Assistant"])
        elif self.model == Doctor:
            return qs.filter(role="Medecin")
        elif self.model == AssistantDoctor:
            return qs.filter(role="Assistant")
        elif self.model == PatientGroup:
            return qs.filter(role__in=["ATS", "Teacher", "Student"])
        elif self.model == Director:
            return qs.filter(role="Director")
        elif self.model == AdminUser:
            return qs.filter(role="Admin")
        return qs

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if not obj:
            if self.model == MedicalStaff:
                form.base_fields["role"].choices = [
                    ("Medecin", "Doctor"),
                    ("Assistant", "Assistant Doctor"),
                ]
            elif self.model == Doctor:
                form.base_fields["role"].initial = "Medecin"
                form.base_fields["role"].disabled = True
            elif self.model == AssistantDoctor:
                form.base_fields["role"].initial = "Assistant"
                form.base_fields["role"].disabled = True
            elif self.model == PatientGroup:
                form.base_fields["role"].choices = [
                    ("ATS", "ATS"),
                    ("Teacher", "Teacher"),
                    ("Student", "Student"),
                ]
            elif self.model == Director:
                form.base_fields["role"].initial = "Director"
                form.base_fields["role"].disabled = True
            elif self.model == AdminUser:
                form.base_fields["role"].initial = "Admin"
                form.base_fields["role"].disabled = True
        return form


admin.site.register(MedicalStaff, RoleBasedUserAdmin)
admin.site.register(Doctor, RoleBasedUserAdmin)
admin.site.register(AssistantDoctor, RoleBasedUserAdmin)
admin.site.register(PatientGroup, RoleBasedUserAdmin)
admin.site.register(Director, RoleBasedUserAdmin)
admin.site.register(AdminUser, RoleBasedUserAdmin)

admin.site.register(CustomUser, RoleBasedUserAdmin)
