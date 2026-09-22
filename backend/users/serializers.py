from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'surname', 'role']


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'surname', 'password']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('This username is already taken.')
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')

        user = User(
            username=validated_data['username'],
            name=validated_data['name'],
            surname=validated_data['surname'],
            role=User.Role.USER,
        )
        user.set_password(password)
        user.save()
        return user









