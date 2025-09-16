
from django.urls import path
from . import views  

urlpatterns = [
    
    path('login/', views.login_view, name='login'),
    path('registrar/', views.registrar_usuario, name='registrar_usuario'),
    path('listar/', views.listar_usuarios, name='listar_usuarios'),
    path('actualizar/<int:usuario_id>/', views.actualizar_usuario, name='actualizar_usuario'),
    path('eliminar/<int:usuario_id>/', views.eliminar_usuario, name='eliminar_usuario'),
]

