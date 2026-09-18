from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

# create a custom user model by extending the AbstractUser class
class User(AbstractUser):

    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        USER = 'user', 'User'

    name = models.CharField(max_length=150, default='')
    surname = models.CharField(max_length=150, default='')
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.USER
    )

    def __str__(self):
        return self.username