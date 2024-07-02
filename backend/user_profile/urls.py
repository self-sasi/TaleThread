from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_profile, name='get_profile'),
    path('update/', views.update_profile, name='update_profile'),
    path('<str:username>/', views.get_profile, name='get_public_profile'),
    path('remove_friend/<str:username>/', views.remove_friend, name='remove_friend'),
    path('send_request/<str:username>/', views.send_friend_request, name='send_friend_request'),
    path('accept_request/<str:username>/', views.accept_friend_request, name='accept_friend_request'),
    path('reject_request/<str:username>/', views.reject_friend_request, name='reject_friend_request'),

]
