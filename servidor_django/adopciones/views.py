from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json

def adopcion_view(request):
    return render(request, 'adoptar.html')  # coincide con tu HTML

@csrf_exempt
def registrar_adopcion(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)
    try:
        data = json.loads(request.body)
        id_usuario = data.get('id_usuario')
        id_mascota = data.get('id_mascota')
        nombre_adoptante = data.get('nombreAdoptante')
       
        if not all([id_usuario, id_mascota, nombre_adoptante]):
            return JsonResponse({'success': False, 'message': 'Faltan datos requeridos'}, status=400)

        with connection.cursor() as cursor:
            # Paso 1: Registrar la adopción (esto ya lo tenías)
            query_adopcion = """
                INSERT INTO adopciones (id_mascota, id_usuario, fecha_adopcion, notas)
                VALUES (%s, %s, NOW(), %s)
            """
            # Usamos un texto más descriptivo para las notas
            nota = f"Adoptado por {nombre_adoptante}"
            cursor.execute(query_adopcion, [id_mascota, id_usuario, nota])

            # --- PASO NUEVO Y SENCILLO ---
            # Paso 2: Actualizamos el dueño de la mascota en la tabla principal
            query_update_owner = """
                UPDATE registro_mascotas
                SET id_usuario = %s
                WHERE id_mascota = %s
            """
            cursor.execute(query_update_owner, [id_usuario, id_mascota])
            
        connection.commit()    

        return JsonResponse({'success': True, 'message': '¡Adopción registrada con éxito! La mascota ha sido añadida a tu lista.'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)