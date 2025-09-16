# En servidor_django/servidor_django/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuarios/', include('usuarios.urls')), 
    path('mascotas/', include('mascotas.urls')), 
    path('citas/', include('citas.urls')),
]

