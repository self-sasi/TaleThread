from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import UserProfileSerializer

class UserProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

