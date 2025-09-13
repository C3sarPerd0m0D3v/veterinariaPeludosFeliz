from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection 
from django.shortcuts import render

@csrf_exempt
def registrar_mascota(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

    try:
        data = json.loads(request.body)
        
        # obtenemos los datos de login
        
        id_usuario = data.get('id_usuario')
        nombre_mascota = data.get('nombreMascota')
        edad = data.get('edadMascota')
        especie = data.get('especie')
        
        # validamos que los datos existan
        
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