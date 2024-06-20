from django.urls import path,include
from . import views

urlpatterns = [
    path('login', views.login),
    path('signup', views.signup),
    path('logout', views.logout),
    path('change_password', views.change_password),
   
]