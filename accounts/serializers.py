import re
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from rest_framework import serializers

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(
        validators=[
            RegexValidator(
                regex=r"^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$",
                message="Email must follow the format: abc.prenom@esi-sba.dz (abc = 1-3 letters)",
            )
        ]
    )
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password", "first_name", "last_name", "role", "is_verified"]
        extra_kwargs = {
            "password": {"write_only": True},
            "is_verified": {"read_only": True},
        }

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
        return value

    def validate_role(self, value):
        if (
            self.context.get("request")
            and self.context["request"].method == "POST"
            and "signup" in self.context["request"].path
        ):
            valid_roles = ["Student", "Teacher", "ATS"]
            if value not in valid_roles:
                raise serializers.ValidationError(
                    "Role must be one of: Student, Teacher, ATS"
                )
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            role=validated_data["role"],
            is_verified=False,
        )
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