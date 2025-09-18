from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection


@csrf_exempt
def registrar_mascota(request):

    if request.method != "POST":

        return JsonResponse(
            {"success": False, "message": "Método no permitido"}, status=405
        )

    try:

        data = json.loads(request.body)

        id_usuario = data.get("id_usuario")

        nombre_mascota = data.get("nombreMascota")

        edad = data.get("edadMascota")

        especie = data.get("especie")

        if not all([id_usuario, nombre_mascota, edad, especie]):

            return JsonResponse(
                {"success": False, "message": "Faltan datos requeridos"}, status=400
            )

        with connection.cursor() as cursor:

            # creamos la mascota osea el registro

            query_mascota = """
            
                INSERT INTO registro_mascotas (id_usuario, nombre_mascota, edad, especie)
                
                VALUES (%s, %s, %s, %s)
                
            """
            cursor.execute(query_mascota, [id_usuario, nombre_mascota, edad, especie])

            # importante aca obtenemos el ID de la mascota que acabamos de crear

            id_mascota_nueva = cursor.lastrowid

            # creamos su expediente medico asociado despues de haberse registrado
            query_expediente = """
            
                INSERT INTO expedientes_medicos (id_mascota, fecha_creacion) 
                
                VALUES (%s, CURDATE())
                
            """
            cursor.execute(query_expediente, [id_mascota_nueva])

        return JsonResponse(
            {"success": True, "message": "Mascota y expediente creados con éxito"}
        )

    except Exception as e:

        return JsonResponse(
            {"success": False, "message": f"Error en el servidor: {e}"}, status=500
        )


# Esta es la nueva funcionalidad para listar las mascotas del usuario


def obtener_mascotas_por_usuario(request):
    if request.method != "GET":
        return JsonResponse(
            {"success": False, "message": "Método no permitido"}, status=405
        )

    usuario_id = request.GET.get("usuario_id")

    if not usuario_id:
        return JsonResponse(
            {"success": False, "message": "Falta el ID del usuario"}, status=400
        )

    try:
        with connection.cursor() as cursor:
            # CORRECCIÓN 1: Añadimos la columna 'especie' a la consulta SQL
            query = "SELECT id_mascota, nombre_mascota, especie FROM registro_mascotas WHERE id_usuario = %s"
            cursor.execute(query, [usuario_id])
            mascotas = cursor.fetchall()

        # CORRECCIÓN 2: Añadimos la 'especie' al objeto que se construye
        lista_mascotas = [
            {"id": row[0], "nombre": row[1], "especie": row[2]} for row in mascotas
        ]

        return JsonResponse({"success": True, "mascotas": lista_mascotas})

    except Exception as e:
        return JsonResponse(
            {"success": False, "message": f"Error en el servidor: {e}"}, status=500
        )


def listar_todas_las_mascotas(request):
    """
    Esta función es para es solo para inicio de sesion rol administrador devuelve todas las mascotas
    de todos los usuarios de la base de datos

    """
    if request.method != "GET":

        return JsonResponse(
            {"success": False, "message": "Método no permitido"}, status=405
        )

    try:

        with connection.cursor() as cursor:

            #  obtener el nombre del dueño desde la tabla usuarios

            query = """
                SELECT rm.id_mascota, rm.nombre_mascota, rm.especie, rm.raza, rm.edad, u.NombreCompleto
                FROM registro_mascotas rm
                JOIN usuarios u ON rm.id_usuario = u.Id
                ORDER BY rm.id_mascota
            """
            cursor.execute(query)
            mascotas = cursor.fetchall()

        lista_mascotas = [
            {
                "id": row[0],
                "nombre": row[1],
                "especie": row[2],
                "raza": row[3],
                "edad": row[4],
                "dueño": row[5],
            }
            for row in mascotas
        ]

        return JsonResponse({"success": True, "mascotas": lista_mascotas})

    except Exception as e:

        return JsonResponse(
            {"success": False, "message": f"Error en el servidor: {e}"}, status=500
        )


@csrf_exempt
def actualizar_mascota(request, mascota_id):
    """
    Permite al administrador actualizar los datos de una mascota
    """
    if request.method != "POST":

        return JsonResponse(
            {"success": False, "message": "Método no permitido"}, status=405
        )

    try:

        data = json.loads(request.body)
        nombre = data.get("nombre_mascota")
        especie = data.get("especie")
        raza = data.get("raza")
        edad = data.get("edad")

        with connection.cursor() as cursor:

            query = """
                UPDATE registro_mascotas 
                SET nombre_mascota = %s, especie = %s, raza = %s, edad = %s
                WHERE id_mascota = %s
            """
            cursor.execute(query, [nombre, especie, raza, edad, mascota_id])

        return JsonResponse(
            {"success": True, "message": "Mascota actualizada con exito"}
        )

    except Exception as e:

        return JsonResponse(
            {"success": False, "message": f"Error en el servidor: {e}"}, status=500
        )


@csrf_exempt
def eliminar_mascota(request, mascota_id):
    if request.method != 'DELETE':
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

    try:
        with connection.cursor() as cursor:
            # Paso 1: Buscar el expediente para borrar las citas.
            cursor.execute("SELECT id_expediente FROM expedientes_medicos WHERE id_mascota = %s", [mascota_id])
            expediente = cursor.fetchone()

            if expediente:
                id_expediente = expediente[0]
                # Paso 2: Borrar las citas médicas asociadas.
                cursor.execute("DELETE FROM citas_medicas WHERE id_expediente = %s", [id_expediente])

            # --- PASO NUEVO AÑADIDO ---
            # Paso 3: Borrar el registro de adopción (si existe).
            cursor.execute("DELETE FROM adopciones WHERE id_mascota = %s", [mascota_id])

            # Paso 4: Borrar el expediente médico.
            cursor.execute("DELETE FROM expedientes_medicos WHERE id_mascota = %s", [mascota_id])
            
            # Paso 5: Finalmente, borrar la mascota.
            cursor.execute("DELETE FROM registro_mascotas WHERE id_mascota = %s", [mascota_id])
        
        connection.commit()
        return JsonResponse({'success': True, 'message': 'Mascota y todo su historial eliminados con éxito'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)
    
    
def listar_mascotas_adoptables(request):
    """
    Devuelve una lista de mascotas que están disponibles para adopción.
    Asumimos que son las que pertenecen al usuario Administrador (ID 3).
    """
    ID_ADMIN = 3  # ID del usuario que representa a la clínica/admin
    try:
        with connection.cursor() as cursor:
            query = """
                SELECT id_mascota, nombre_mascota, especie, raza, edad 
                FROM registro_mascotas 
                WHERE id_usuario = %s
            """
            cursor.execute(query, [ID_ADMIN])
            mascotas = cursor.fetchall()

        lista_mascotas = [{'id': row[0], 'nombre': row[1], 'especie': row[2]} for row in mascotas]
        return JsonResponse({'success': True, 'mascotas': lista_mascotas})
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)