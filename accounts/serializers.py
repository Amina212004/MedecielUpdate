import re

from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from rest_framework import serializers

from .models import CustomUser

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        admin_email = "medeciels@gmail.com"
        if value != admin_email:
            if not bool(re.match(r"^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$", value)):
                raise serializers.ValidationError(
                    "Email must follow the format: abc.prenom@esi-sba.dz (abc = 1-3 letters)"
                )
        return value


import re
from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "name",
            "role",
            "is_verified",
            "created_by_admin",
            "img",
            "initials",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "is_verified": {"read_only": False},
            "created_by_admin": {"read_only": False},
            "img": {"required": False, "allow_null": True},
            "initials": {"read_only": True},
        }

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    def get_initials(self, obj):
        return (
            f"{obj.first_name[0]}{obj.last_name[0]}".upper()
            if obj.first_name and obj.last_name
            else ""
        )

    def validate_first_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("First name must contain only letters")
        return value

    def validate_last_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("Last name must contain only letters")
        return value

    def validate_email(self, value):
        if not bool(re.match(r"^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$", value)):
            raise serializers.ValidationError(
                "Email must be in the format abc.prenom@esi-sba.dz"
            )
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def validate_role(self, value):
        valid_roles = [choice[0] for choice in CustomUser.role.field.choices]
        if value not in valid_roles:
            raise serializers.ValidationError(
                f"Role must be one of: {', '.join(valid_roles)}"
            )
        return value

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            role=validated_data["role"],
            is_verified=validated_data.get("is_verified", False),
            created_by_admin=validated_data.get("created_by_admin", False),
            img=validated_data.get("img", None),
           
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get("request")

        try:
            if instance.img and hasattr(instance.img, 'url'):
                if request:
                    representation['img'] = request.build_absolute_uri(instance.img.url)
                else:
                    representation['img'] = instance.img.url
            else:
                representation['img'] = None
        except Exception:
            representation['img'] = None

        return representation





class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.CharField(
        validators=[
            RegexValidator(
                regex=r"^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$",
                message="Email must follow the format: abc.prenom@esi-sba.dz (abc = 1-3 letters)",
            )
        ]
    )


class VerifyCodeSerializer(serializers.Serializer):
    email = serializers.CharField(
        validators=[
            RegexValidator(
                regex=r"^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$",
                message="Email must follow the format: abc.prenom@esi-sba.dz (abc = 1-3 letters)",
            )
        ]
    )
    code = serializers.CharField(max_length=6, min_length=6)


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.CharField(
        validators=[
            RegexValidator(
                regex=r"^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$",
                message="Email must follow the format: abc.prenom@esi-sba.dz (abc = 1-3 letters)",
            )
        ]
    )
    code = serializers.CharField(max_length=6, min_length=6)
    new_password = serializers.CharField(min_length=8, write_only=True)
