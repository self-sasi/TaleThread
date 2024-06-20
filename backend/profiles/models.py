from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fav_genres = models.CharField(max_length=255, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    inktokens = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.username
