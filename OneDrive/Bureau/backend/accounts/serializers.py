from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(
        validators=[
            RegexValidator(
                regex=r'^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$',
                message='Email must follow the format: abc.prenom@esi-sba.dz (abc = 1-3 letters)'
            )
        ]
    )
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user