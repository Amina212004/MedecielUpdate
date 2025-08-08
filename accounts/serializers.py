import re

from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from rest_framework import serializers

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


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    img = serializers.SerializerMethodField()
    initials = serializers.SerializerMethodField()  # New field for initials

    class Meta:
        model = User
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
            "email": {"read_only": True},
        }

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    def get_img(self, obj):
        return obj.img if obj.img else None

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
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def validate_role(self, value):
        valid_roles = [choice[0] for choice in User.role.field.choices]
        if value not in valid_roles:
            raise serializers.ValidationError(
                f"Role must be one of: {', '.join(valid_roles)}"
            )
        return value

    def create(self, validated_data):
        user = User(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            role=validated_data["role"],
            is_verified=validated_data.get("is_verified", False),
            created_by_admin=validated_data.get("created_by_admin", False),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


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
