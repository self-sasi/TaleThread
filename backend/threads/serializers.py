from rest_framework import serializers
from .models import Thread, Contribution, Genre

from .models import Thread, Contribution, Genre
from rest_framework import serializers
from .models import Thread, Contribution, Genre
from user_profile.models import Profile

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class ThreadSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.user.username')
    genre = serializers.CharField()

    class Meta:
        model = Thread
        fields = ['id', 'title', 'description', 'owner', 'created_at', 'updated_at', 'max_contributors', 'max_words', 'min_rating', 'genre']

    def create(self, validated_data):
        owner = self.context['request'].user.profile
        genre_name = validated_data.pop('genre')
        genre, created = Genre.objects.get_or_create(name=genre_name)
        thread = Thread.objects.create(owner=owner, genre=genre, **validated_data)
        return thread

    def update(self, instance, validated_data):
        if 'owner' in validated_data:
            owner_username = validated_data.pop('owner')
            instance.owner = Profile.objects.get(user__username=owner_username)
        if 'genre' in validated_data:
            genre_name = validated_data.pop('genre')
            instance.genre, created = Genre.objects.get_or_create(name=genre_name)
        return super().update(instance, validated_data)

class ContributionSerializer(serializers.ModelSerializer):
    thread = serializers.ReadOnlyField(source='thread.id')
    user = serializers.ReadOnlyField(source='user.user.username')
    upvoters = serializers.StringRelatedField(many=True, read_only=True)
    downvoters = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Contribution
        fields = '__all__'
