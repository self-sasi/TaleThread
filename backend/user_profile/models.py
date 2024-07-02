from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    fav_genres = models.CharField(max_length=255) 
    age = models.IntegerField(null=True, blank=True)
    inktokens = models.IntegerField(default=25)
    friendlist = models.ManyToManyField("self", symmetrical=True, blank=True)
    friend_requests_sent = models.ManyToManyField('self', related_name='friend_requests_received', symmetrical=False, blank=True)
    def __str__(self):
        return self.user.username

