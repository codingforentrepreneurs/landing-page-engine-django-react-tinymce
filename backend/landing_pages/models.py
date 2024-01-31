from django.db import models

# Create your models here.
class LandingPage(models.Model):
    content = models.TextField()
    active = models.BooleanField(default=True)