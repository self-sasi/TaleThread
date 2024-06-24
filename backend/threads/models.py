from django.db import models
from user_profile.models import Profile

class Genre(models.Model):
    name = models.CharField(max_length=100)

class Thread(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='owned_threads')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    max_contributors = models.IntegerField(default=10)
    max_words = models.IntegerField(default=150)
    min_rating = models.FloatField(default=0.0)
    # genres = models.ManyToManyField(Genre)
    contributors = models.ManyToManyField(Profile, through='ThreadContributor', related_name='contributed_threads')

class ThreadContributor(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)
    position = models.IntegerField()
    contributed = models.BooleanField(default=False)

class Contribution(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='contributions')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
