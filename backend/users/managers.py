from django.contrib.auth.models import UserManager as DjangoUserManager


class UserManager(DjangoUserManager):

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields["role"] = "admin"

        return super().create_superuser(
            username=username,
            email=email,
            password=password,
            **extra_fields
        )