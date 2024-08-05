from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ProfileFriendSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'avatar']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    friendlist = serializers.SerializerMethodField()
    friend_requests_received = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['user', 'avatar', 'fav_genres', 'age', 'inktokens', 'friendlist', 'friend_requests_received']
        read_only_fields = ['inktokens']

    def get_friendlist(self, obj):
        friends = obj.friendlist.all()
        return ProfileFriendSerializer(friends, many=True).data

    def get_friend_requests_received(self, obj):
        requests = obj.friend_requests_received.all()
        return ProfileFriendSerializer(requests, many=True).data

class PublicProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'avatar', 'fav_genres', 'age']
