
document.addEventListener('DOMContentLoaded', function() {
    console.log("tienda.js cargado y listo.");


    const contenedorProductos = document.getElementById('lista-productos');
    const compraModal = document.getElementById('compra-modal');
    const productoNombreModal = document.getElementById('producto-nombre-modal');
    const productoPrecioModal = document.getElementById('producto-precio-modal');
    const whatsappLink = document.getElementById('whatsapp-link');
    const cancelCompraBtn = document.getElementById('cancel-compra-btn');

    // CARGAR PRODUCTOS 

    function cargarProductos() {

        fetch('http://127.0.0.1:8000/tienda/listar/')

            .then(response => response.json())

            .then(data => {

                if (data.success) {

                    mostrarProductos(data.productos);

                } else {

                    contenedorProductos.innerHTML = `<p>Error al cargar los productos: ${data.message}</p>`;

                }

            })

            .catch(error => {

                console.error("Error en la conexión:", error);

                contenedorProductos.innerHTML = `<p>No se pudo conectar con el servidor para cargar los productos</p>`;

            });
    }

    // MOSTRAR LOS PRODUCTOS

    function mostrarProductos(productos) {

    contenedorProductos.innerHTML = ''; // Limpiar el contenedor

    if (productos.length === 0) {

        contenedorProductos.innerHTML = '<p>No hay productos disponibles en este momento.</p>';

        return;

    }

    productos.forEach(producto => {

        const card = document.createElement('div');

        card.className = 'producto-card';

        
        // Si el producto tiene una imagen_url, creamos una etiqueta <img>
        // Si no mostramos el ícono de la patita

        const imagenHTML = producto.imagen_url

            ? `<img src="${producto.imagen_url}" alt="${producto.nombre}" class="producto-imagen-real">`

            : `<div class="producto-imagen"><i class="fas fa-paw"></i></div>`;


        // Logica de disponibilidad 

        const stockClass = producto.stock > 0 ? 'stock-disponible' : 'stock-agotado';

        const stockText = producto.stock > 0 ? `Disponible: ${producto.stock}` : 'Agotado';

        const botonComprar = producto.stock > 0

            ? `<button class="btn-comprar" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Comprar</button>`

            : `<button class="btn-comprar" disabled>Agotado</button>`;

        // usamos la nueva variable "imagenHTML" para construir la tarjeta

        card.innerHTML = `

            ${imagenHTML}

            <div class="producto-info">

                <span class="producto-categoria">${producto.categoria}</span>

                <h3 class="producto-nombre">${producto.nombre}</h3>

                <p class="producto-descripcion">${producto.descripcion}</p>

                <div class="producto-footer">

                    <span class="producto-precio">$${producto.precio}</span>

                    ${botonComprar}

                </div>

                <span class="producto-stock ${stockClass}">${stockText}</span>

            </div>

        `;

        contenedorProductos.appendChild(card);

    });
}

    // BOToN DE COMPRAR

    contenedorProductos.addEventListener('click', function(e) {

        if (e.target.classList.contains('btn-comprar')) {

            const nombre = e.target.dataset.nombre;

            const precio = e.target.dataset.precio;

            // info del producto

            productoNombreModal.textContent = nombre;

            productoPrecioModal.textContent = `$${precio}`;

            //  enlace de WhatsApp

            const numeroTelefono = '50376164936'; // cualquier numero de telefono

            const mensaje = encodeURIComponent(`¡Hola! Estoy interesado en comprar el producto: ${nombre}`);

            whatsappLink.href = `https://wa.me/${numeroTelefono}?text=${mensaje}`;

            // mostramos el modal

            compraModal.style.display = 'flex';

        }

    });

    // CERRAR EL MODAL 

    cancelCompraBtn.addEventListener('click', () => {

        compraModal.style.display = 'none';

    });
    
    compraModal.addEventListener('click', (e) => {

        if (e.target === compraModal) {

            compraModal.style.display = 'none';
        }
        
    });

    // Carga inicial de productos 
    cargarProductos();
});