from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Thread, Contribution, Genre
from .serializers import ThreadSerializer, ContributionSerializer, GenreSerializer

class ThreadViewSet(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.profile)

class ContributionViewSet(viewsets.ModelViewSet):
    serializer_class = ContributionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        thread_id = self.kwargs['thread_id']
        return Contribution.objects.filter(thread_id=thread_id)

    def perform_create(self, serializer):
        thread_id = self.kwargs['thread_id']
        thread = Thread.objects.get(id=thread_id)
        serializer.save(thread=thread, user=self.request.user.profile)

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAuthenticated]
