from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection 

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

@csrf_exempt
def registrar_mascota(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

    try:
        data = json.loads(request.body)
        
        # Obtenemos los datos del JavaScript
        id_usuario = data.get('id_usuario')
        nombre_mascota = data.get('nombreMascota')
        edad = data.get('edadMascota')
        especie = data.get('especie')
        
        # Validamos que los datos esenciales estén presentes
        if not all([id_usuario, nombre_mascota, edad, especie]):
             return JsonResponse({'success': False, 'message': 'Faltan datos requeridos'}, status=400)

        with connection.cursor() as cursor:
            query = """
                INSERT INTO registro_mascotas (id_usuario, nombre_mascota, edad, especie)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, [id_usuario, nombre_mascota, edad, especie])
            connection.commit()
        
        return JsonResponse({'success': True, 'message': 'Mascota registrada con éxito'})

    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)