@echo off
REM Este script inicia el backend y abre el frontend.

ECHO Iniciando el servidor de Django en una nueva ventana...
REM El comando 'cd' es necesario si tu manage.py está dentro de la carpeta servidor_django
start "Servidor Django" cmd /k "cd servidor_django && python manage.py runserver"

ECHO Espera 5 segundos para que el servidor inicie...
timeout /t 5 >nul

ECHO Iniciando login en el navegador...
REM Asegúrate de que el puerto (5501) sea el correcto para tu Live Server
start http://127.0.0.1:5501/html/login.html

ECHO Listo !