from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    last_name = serializers.ReadOnlyField(source='user.last_name')

    class Meta:
        model = Profile
        fields = ['username', 'email', 'name', 'fav_genres', 'age', 'avatar']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username','name', 'email', 'profile']
