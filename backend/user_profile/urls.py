from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_profile, name='get_profile'),
    path('update/', views.update_profile, name='update_profile'),
    path('<str:username>/', views.get_profile, name='get_public_profile'),
    path('add_friend/<str:username>/', views.add_friend, name='add_friend'),
    path('remove_friend/<str:username>/', views.remove_friend, name='remove_friend'),
]
