from django.urls import path
from . import views

urlpatterns = [
    
    path('registrar/', views.registrar_cita, name='registrar_cita'),
    
]

