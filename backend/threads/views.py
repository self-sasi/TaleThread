from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Thread, Contribution, Genre
from .serializers import ThreadSerializer, ContributionSerializer, GenreSerializer
from django.shortcuts import get_object_or_404

class ThreadViewSet(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user_profile = self.request.user.profile
        if user_profile.inktokens < 50:
            self.permission_denied(
                self.request,
                message="Not enough inktokens to create a thread",
                code=status.HTTP_400_BAD_REQUEST
            )
        serializer.save(owner=user_profile)
        user_profile.inktokens -= 50
        user_profile.save()

class ContributionViewSet(viewsets.ModelViewSet):
    serializer_class = ContributionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        thread_id = self.kwargs['thread_id']
        return Contribution.objects.filter(thread_id=thread_id)

    def perform_create(self, serializer):
        thread_id = self.kwargs['thread_id']
        thread = Thread.objects.get(id=thread_id)
        
        content = serializer.validated_data['content']
        word_count = len(content.split())
        contributors_count = thread.contributions.count()
        
        if word_count > thread.max_words:
            self.permission_denied(
                self.request,
                message="Word limit exceeded.",
                code=status.HTTP_400_BAD_REQUEST
            )
        
        elif contributors_count >= thread.max_contributors:
            self.permission_denied(
                self.request,
                message="Maximum contributions reached.",
                code=status.HTTP_400_BAD_REQUEST
            )
        
        contribution = serializer.save(thread=thread, user=self.request.user.profile)
        self.request.user.profile.inktokens += 50
        self.request.user.profile.save()

    @action(detail=True, methods=['post'])
    def upvote(self, request, pk=None, thread_id=None):
        contribution = get_object_or_404(Contribution, pk=pk, thread_id=thread_id)
        contribution.upvote(request.user.profile)
        return Response({"status": "upvoted"})

    @action(detail=True, methods=['post'])
    def downvote(self, request, pk=None, thread_id=None):
        contribution = get_object_or_404(Contribution, pk=pk, thread_id=thread_id)
        contribution.downvote(request.user.profile)
        return Response({"status": "downvoted"})

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAuthenticated]
