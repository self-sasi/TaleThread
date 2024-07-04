from django.db import models
from user_profile.models import Profile

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Thread(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='owned_threads')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    max_contributors = models.IntegerField(default=10)
    max_words = models.IntegerField(default=150)
    min_rating = models.FloatField(default=0.0)
    contributors = models.ManyToManyField(Profile, through='ThreadContributor', related_name='contributed_threads')
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='threads')

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
    upvoters = models.ManyToManyField(Profile, related_name='upvoted_contributions', blank=True)
    downvoters = models.ManyToManyField(Profile, related_name='downvoted_contributions', blank=True)

    def upvote(self, user):
        if user in self.downvoters.all():
            self.downvoters.remove(user)
            self.downvotes -= 1
            self.user.inktokens = max(self.user.inktokens + 25, 0)

        if user not in self.upvoters.all():
            self.upvoters.add(user)
            self.upvotes += 1
            self.user.inktokens += 100
            self.save()
            self.user.save()

    def downvote(self, user):
        if user in self.upvoters.all():
            self.upvoters.remove(user)
            self.upvotes -= 1
            self.user.inktokens -= 100
            self.user.save()

        if user not in self.downvoters.all():
            self.downvoters.add(user)
            self.downvotes += 1
            self.user.inktokens = max(self.user.inktokens - 25, 0)
            self.save()
            self.user.save()
