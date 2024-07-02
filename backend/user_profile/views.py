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

# ENDPOINT : add_friend


# ENDPOINT : remove_friend
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_friend(request, username):
    user = request.user
    friend = get_object_or_404(User, username=username)
    user_profile = get_object_or_404(Profile, user=user)
    friend_profile = get_object_or_404(Profile, user=friend)

    if friend_profile in user_profile.friendlist.all():
        user_profile.friendlist.remove(friend_profile)
        friend_profile.friendlist.remove(user_profile)
        return Response({"message": f"{friend.username} has been removed from your friend list."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": f"{friend.username} is not in your friend list."}, status=status.HTTP_400_BAD_REQUEST)


from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Profile
from .serializers import ProfileSerializer, PublicProfileSerializer,UserSerializer
from django.shortcuts import get_object_or_404

# ENDPOINT : send_friend_request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_friend_request(request, username):
    user = request.user
    friend = get_object_or_404(User, username=username)
    user_profile = get_object_or_404(Profile, user=user)
    friend_profile = get_object_or_404(Profile, user=friend)

    if friend_profile not in user_profile.friendlist.all() and friend_profile not in user_profile.friend_requests_sent.all():
        user_profile.friend_requests_sent.add(friend_profile)
        return Response({"message": f"Friend request sent to {friend.username}."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": f"Friend request already sent to {friend.username} or {friend.username} is already in your friend list."}, status=status.HTTP_400_BAD_REQUEST)

# ENDPOINT : accept_friend_request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_friend_request(request, username):
    user = request.user
    friend = get_object_or_404(User, username=username)
    user_profile = get_object_or_404(Profile, user=user)
    friend_profile = get_object_or_404(Profile, user=friend)

    if friend_profile in user_profile.friend_requests_received.all():
        user_profile.friend_requests_received.remove(friend_profile)
        user_profile.friendlist.add(friend_profile)
        friend_profile.friendlist.add(user_profile)
        user_profile.inktokens += 5
        friend_profile.inktokens += 5
        user_profile.save()
        friend_profile.save()  
        return Response({"message": f"Friend request from {friend.username} accepted."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": f"No friend request from {friend.username}."}, status=status.HTTP_400_BAD_REQUEST)

# ENDPOINT : reject_friend_request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_friend_request(request, username):
    user = request.user
    friend = get_object_or_404(User, username=username)
    user_profile = get_object_or_404(Profile, user=user)
    friend_profile = get_object_or_404(Profile, user=friend)

    if friend_profile in user_profile.friend_requests_received.all():
        user_profile.friend_requests_received.remove(friend_profile)
        return Response({"message": f"Friend request from {friend.username} rejected."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": f"No friend request from {friend.username}."}, status=status.HTTP_400_BAD_REQUEST)
    