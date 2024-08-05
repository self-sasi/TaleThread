from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

# from backend.backend import settings
from django.conf import settings
import requests
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

    @action(detail=True, methods=['post'])
    def recommended_contribution(self, request, *args, **kwargs):
        thread_id = self.kwargs.get('thread_id')

        
        contributions_data = request.data        
        if not contributions_data:
            return Response({"error": "No contributions provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Extract thread_id from the first contribution
        check_id = contributions_data[0]['thread']
        
        if thread_id != check_id:
            return Response({"error": "Thread ID mismatch"}, status=status.HTTP_400_BAD_REQUEST)

        # Concatenate content from all contributions
        concatenated_content = ' '.join([contribution['content'] for contribution in contributions_data])
        print(concatenated_content)
                
        # Construct the prompt for OpenAI API
        prompt = f"Given the following story: {concatenated_content}\nPlease provide a recommended continuation for this story in 2-3 sentences.Don't forget to keep the tone and style consistent with the story so far.Don't say anything else in your response, just the continuation."

        # OpenAI API request
        openai_api_key = settings.OPENAI_API_KEY
        headers = {
            'Authorization': f'Bearer {openai_api_key}',
            'Content-Type': 'application/json'
        }
        payload = {
            "model": "gpt-4o",  # or the model you are using
            "prompt": prompt,
            "max_tokens": 100,  # Adjust token count as needed
            "temperature": 0.7
        }
        
        response = requests.post('https://api.openai.com/v1/completions', headers=headers, json=payload)
        
        if response.status_code == 200:
            gpt_response = response.json()
            continuation = gpt_response.get('choices')[0].get('text').strip()
            return Response({"recommended_continuation": continuation})
        else:
            return Response({"error": "Failed to get response from OpenAI"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAuthenticated]
