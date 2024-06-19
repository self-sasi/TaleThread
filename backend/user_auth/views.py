from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


# ENDPOINT : signup
@api_view(['POST'])
def signup(request):
    
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token" : token.key, "user" : serializer.data})
    
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ENDPOINT : login 
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(instance=user)
        return Response({"token": token.key, "user": serializer.data})
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


# ENDPOINT : logout
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    
    try:
        
        token = request.auth
        
        if token:
            token.delete()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        
    except Token.DoesNotExist:
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
    

# ENDPOINT : change_password
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    
    user = request.user
    new_password = request.data.get('new_password')
    
    user.set_password(new_password)
    user.save()
    
    Token.objects.filter(user = user).delete()
    new_token = Token.objects.create(user=user)
    
    return Response({"message": "Password changed successfully", "token": new_token.key}, status=status.HTTP_200_OK)



