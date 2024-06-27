from rest_framework import serializers
from .models import Thread, Contribution, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class ContributionSerializer(serializers.ModelSerializer):
    thread = serializers.ReadOnlyField(source='thread.id')
    user = serializers.ReadOnlyField(source='user.user.username')
    upvoters = serializers.StringRelatedField(many=True, read_only=True)
    downvoters = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Contribution
        fields = '__all__'

class ThreadSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.user.username')
    contributions = ContributionSerializer(many=True, read_only=True)

    class Meta:
        model = Thread
        fields = '__all__'
