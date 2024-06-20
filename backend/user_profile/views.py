from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Profile
from .serializers import ProfileSerializer, PublicProfileSerializer
from django.shortcuts import get_object_or_404

# ENDPOINT : get_profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request, username=None):
    if username:
        user = get_object_or_404(User, username=username)
        profile = get_object_or_404(Profile, user=user)
        serializer = PublicProfileSerializer(profile)
    else:
        profile = get_object_or_404(Profile, user=request.user)
        serializer = ProfileSerializer(profile)
    return Response(serializer.data)

# ENDPOINT : update_profile
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    profile = get_object_or_404(Profile, user=request.user)
    serializer = ProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
