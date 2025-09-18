
from django.urls import path
from . import views

urlpatterns = [
    path('', views.adopcion_view, name='adopcion_view'),  
    path('registrar/', views.registrar_adopcion, name='registrar_adopcion'),
]
