
from django.urls import path
from . import views

urlpatterns = [
    
    path('registrar/', views.registrar_mascota, name='registrar_mascota'),
    path('por-usuario/', views.obtener_mascotas_por_usuario, name='mascotas_por_usuario'),
    
    # nuevas rutas para el Panel de Administrador para ver todas las mascotas
    
    path('listar-todas/', views.listar_todas_las_mascotas, name='listar_todas_mascotas'),
    path('actualizar/<int:mascota_id>/', views.actualizar_mascota, name='actualizar_mascota'),
    path('eliminar/<int:mascota_id>/', views.eliminar_mascota, name='eliminar_mascota'),
    path('adoptables/', views.listar_mascotas_adoptables, name='listar_adoptables'),
    
]

