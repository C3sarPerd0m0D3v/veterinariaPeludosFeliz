document.addEventListener('DOMContentLoaded', function() {
    
    const idUsuario = localStorage.getItem('usuario_id');

    const contenedorMascotas = document.getElementById('lista-de-mascotas');

    // verificamos si el usuario ha iniciado sesion

    if (!idUsuario) {

        alert('Por favor, inicia sesión para ver tus mascotas');

        window.location.href = 'login.html';

        return;

    }

    // mensaje de carga mientras se obtienen los datos

    contenedorMascotas.innerHTML = '<p>Cargando tus mascotas...</p>';

    // pedimos la lista de mascotas al servidor

    fetch(`http://127.0.0.1:8000/mascotas/por-usuario/?usuario_id=${idUsuario}`)

        .then(response => response.json())

        .then(data => {

            // Limpiamos el mensaje de cargando

            contenedorMascotas.innerHTML = '';

            if (data.success && data.mascotas.length > 0) {

                // si hay mascotas las mostramos en la pagina

                data.mascotas.forEach(mascota => {

                    const mascotaCard = document.createElement('div');

                    mascotaCard.className = 'mascota-card';
                    
                    // elegimos un icono segun la especie

                    const icono = mascota.especie.toLowerCase() === 'gato' ? '🐈' : '🐕';

                    mascotaCard.innerHTML = `

                        <span class="mascota-card-icon">${icono}</span>
                        <div>
                            <strong>${mascota.nombre}</strong>
                        </div>
                    `;
                    contenedorMascotas.appendChild(mascotaCard);
                });

            } else {

                // si no hay mascotas mostramos un mensaje

                contenedorMascotas.innerHTML = '<p>Aun no tienes mascotas registradas</p>';
            }
        })
        .catch(error => {

            console.error('Error al cargar las mascotas:', error);

            contenedorMascotas.innerHTML = '<p>Hubo un error al cargar tus mascotas preguntale a Admin</p>';
        });
});