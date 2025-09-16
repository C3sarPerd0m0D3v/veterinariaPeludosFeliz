import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection

@csrf_exempt

def registrar_cita(request):
    
    if request.method != 'POST':
        
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

    try:
        data = json.loads(request.body)
        id_mascota = data.get('id_mascota')
        fecha_cita = data.get('fecha_cita') # Formato esperado: año mes dia
        motivo_cita = data.get('motivo_cita')
        
        if not all([id_mascota, fecha_cita, motivo_cita]):
            
            return JsonResponse({'success': False, 'message': 'Faltan datos requeridos'}, status=400)

        with connection.cursor() as cursor:
            
            # buscamos el id_expediente que corresponde a la mascota
            
            cursor.execute("SELECT id_expediente FROM expedientes_medicos WHERE id_mascota = %s", [id_mascota])
            
            expediente = cursor.fetchone()

            if not expediente:
                
                return JsonResponse({'success': False, 'message': 'La mascota seleccionada no tiene un expediente médico'}, status=404)
            
            id_expediente = expediente[0]

            # ahora insertamos la cita con el id_expediente correcto
            
            query = """
                INSERT INTO citas_medicas (id_expediente, fecha_cita, motivo_cita)
                
                VALUES (%s, %s, %s)
                
            """
            cursor.execute(query, [id_expediente, fecha_cita, motivo_cita])
        
        return JsonResponse({'success': True, 'message': 'Cita registrada con éxito'})

    except Exception as e:
        
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)