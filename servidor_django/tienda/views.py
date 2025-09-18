from django.http import JsonResponse
from django.db import connection

def listar_productos(request):
    try:
        with connection.cursor() as cursor:
            query = """
                SELECT 
                    p.id_producto, 
                    p.nombre_producto, 
                    p.descripcion, 
                    p.precio, 
                    p.stock, 
                    c.nombre_categoria
                FROM productos p
                JOIN categorias_productos c ON p.id_categoria = c.id_categoria
                ORDER BY c.nombre_categoria, p.nombre_producto
            """
            cursor.execute(query)
            productos = cursor.fetchall()

        lista_productos = [
            {
                'id': row[0],
                'nombre': row[1],
                'descripcion': row[2],
                'precio': f"{row[3]:.2f}", # Formateamos a 2 decimales
                'stock': row[4],
                'categoria': row[5]
            }
            for row in productos
        ]
        
        return JsonResponse({'success': True, 'productos': lista_productos})
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Error en el servidor: {e}'}, status=500)
