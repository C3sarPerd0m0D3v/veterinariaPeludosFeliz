from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection 
from django.shortcuts import render

# Create your views here.
@csrf_exempt 
def login_view(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

    try:
        
        data = json.loads(request.body)
        usuario = data.get('usuario')
        contrasena = data.get('contrasena')

        
        with connection.cursor() as cursor:
            
            query = "SELECT * FROM usuarios WHERE nombreCompleto = %s AND contrasena = %s"
            cursor.execute(query, [usuario, contrasena])
            resultado = cursor.fetchone()

        if resultado:
            id_del_usuario = resultado[0]
            return JsonResponse({'success': True, 'message': 'Inicio de sesión exitoso', 'usuario_id': id_del_usuario})
        else:
            #este es el mensaje de alerta si el usuario es != de la base de datos
            return JsonResponse({'success': False, 'message': 'Usuario o contraseña incorrectos'})

    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Error: JSON mal formado'}, status=400)
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)