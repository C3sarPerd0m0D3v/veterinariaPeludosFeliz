@echo off
start "Django Backend" cmd /k "cd servidor_django && python manage.py runserver"
start "Frontend Server" cmd /k "live-server --port=5501 --open=html/login.html"