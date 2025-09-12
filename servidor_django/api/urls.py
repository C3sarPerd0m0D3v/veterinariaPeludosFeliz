
from django.urls import path
from . import views

urlpatterns = [
    
    path('login/', views.login_view, name='login'),
    path('mascotas/registrar/', views.registrar_mascota, name='registrar_mascota'),
]

