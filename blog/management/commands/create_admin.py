from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = 'Creates a superuser if it does not exist'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@fundev.uz')

        if not password:
            self.stdout.write(self.style.ERROR('DJANGO_SUPERUSER_PASSWORD environment variable is required to create admin user.'))
            return

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(self.style.SUCCESS(f'Admin user "{username}" created successfully.'))
        else:
            self.stdout.write(self.style.WARNING(f'Admin user "{username}" already exists.'))
