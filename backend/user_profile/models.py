from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    fav_genres = models.CharField(max_length=255) 
    age = models.IntegerField(null=True, blank=True)
    inktokens = models.IntegerField(default=0)
    friendlist = models.ManyToManyField(User, related_name='friends')

    def __str__(self):
        return self.user.username

