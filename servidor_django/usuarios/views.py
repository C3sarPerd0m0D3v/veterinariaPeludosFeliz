from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection 
from django.shortcuts import render

@csrf_exempt 

def login_view(request):
    
    if request.method != 'POST':
        
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

    try:
        
        data = json.loads(request.body)
        
        usuario = data.get('usuario')
        
        contrasena = data.get('contrasena')

        
        with connection.cursor() as cursor:
            
            query = "SELECT * FROM usuarios WHERE NombreCompleto = %s AND Contrasena = %s"
            
            cursor.execute(query, [usuario, contrasena])
            
            resultado = cursor.fetchone()

        if resultado:
            
            id_del_usuario = resultado[0]
            
            rol_del_usuario = resultado[4] # aqui obtenemos el rol del usuario
            
            return JsonResponse({
                                 'success': True, 
                                 'message': 'Inicio de sesion exitoso', 
                                 'usuario_id': id_del_usuario,
                                 'rol': rol_del_usuario
                                 })
        
        else:
            
            #este es el mensaje de alerta si el usuario es != de la base de datos
            
            return JsonResponse({'success': False, 'message': 'Usuario o contraseña incorrectos'})

    except json.JSONDecodeError:
        
        return JsonResponse({'success': False, 'message': 'Error: JSON mal formado'}, status=400)
    
    except Exception as e:
        
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)
    
    
    #se crea logica de registro de usuario
    
@csrf_exempt

def registrar_usuario(request):
    
    if request.method != 'POST':
        
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

    try:
        
        data = json.loads(request.body)
        
        nombre = data.get('nombre')
        
        email = data.get('email')
        
        contrasena = data.get('contrasena')
        
        # se deja este espacio opcional si se desea agrega un validador de email

        if not all([nombre, email, contrasena]):
            
            return JsonResponse({'success': False, 'message': 'Nombre, email y contraseña son requeridos'}, status=400)

        with connection.cursor() as cursor:
            
            # los nuevos usuarios se les asignara un rol por defecto
            
            # pendiente validar su columna rol de usuario puede aceptar cliente como rol 
            
            rol_por_defecto = 'Cliente'
            
            privilegiado_por_defecto = 0 # 0 para no-admin

            query = """
            
                INSERT INTO usuarios (NombreCompleto, Email, Contrasena, Rol, Privilegiado)
                
                VALUES (%s, %s, %s, %s, %s)
                
            """
            cursor.execute(query, [nombre, email, contrasena, rol_por_defecto, privilegiado_por_defecto])

        return JsonResponse({'success': True, 'message': '¡Bienvenido! Tu cuenta ha sido creada. Ya puedes iniciar sesión'})

    except Exception as e:
        
        # opcional validador de existencia de usuario
        
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)
    
    # al final de servidor_django\usuarios\views.py

def listar_usuarios(request):
    if request.method != 'GET':
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

    try:
        with connection.cursor() as cursor:
            
            # Seleccionamos solo los datos que queremos mostrar
            
            query = "SELECT Id, NombreCompleto, Email, Rol FROM usuarios"
            
            cursor.execute(query)
            
            usuarios = cursor.fetchall()

        # conversion de resultados auna lista de diccionarios
        
        lista_usuarios = [{'id': row[0], 'nombre': row[1], 'email': row[2], 'rol': row[3]} for row in usuarios]
        
        return JsonResponse({'success': True, 'usuarios': lista_usuarios})

    except Exception as e:
        
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)
    
    
@csrf_exempt

def actualizar_usuario(request, usuario_id):
    
    if request.method != 'POST':
        
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

    try:
        data = json.loads(request.body)
        nombre = data.get('nombre')
        email = data.get('email')
        rol = data.get('rol')

        if not all([nombre, email, rol]):
            
            return JsonResponse({'success': False, 'message': 'Todos los campos son requeridos'}, status=400)
        
        
        # validacion si el usuario debe ser privilegiado segun en el rol
        
        privilegiado = 1 if rol == 'Administrador' else 0
        
        with connection.cursor() as cursor:
          
            # se actualiza la columna privilegiado de la base de datos
            
            query = """
                UPDATE usuarios 
                SET NombreCompleto = %s, Email = %s, Rol = %s, Privilegiado = %s
                WHERE Id = %s
            """
            # se agrega privilegiado a al query
            
            cursor.execute(query, [nombre, email, rol, privilegiado, usuario_id])

        return JsonResponse({'success': True, 'message': 'Usuario actualizado con éxito'})

    except Exception as e:
        
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)

@csrf_exempt

def eliminar_usuario(request, usuario_id):
    
    if request.method != 'DELETE':
        
        return JsonResponse({'success': False, 'message': 'Método no permitido'}, status=405)

    try:
        
        with connection.cursor() as cursor:
            
            query = "DELETE FROM usuarios WHERE Id = %s"
            
            cursor.execute(query, [usuario_id])
        
        return JsonResponse({'success': True, 'message': 'Usuario eliminado con éxito'})

    except Exception as e:
        
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)

# La funcion registrar_usuario sirve para crear usuarios desde el panel de admin
# no fue necesario crear una nueva si le permitimos al admin especificar el rol
# por ahora el admin creara usuarios como "Cliente" usando el formulario publico
