from django.urls import path
from .views import UserProfileDetail

urlpatterns = [
    path('profiles/', UserProfileDetail.as_view(), name='user-profile'),
]
