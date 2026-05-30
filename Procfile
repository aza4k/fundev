web: python manage.py migrate --noinput && python manage.py collectstatic --noinput && python manage.py create_admin && gunicorn studio.wsgi:application
