document.addEventListener('DOMContentLoaded', function() {
    console.log("adoptar.js cargado con lógica dinámica.");

    let mascotaSeleccionadaId = null;
    let mascotaSeleccionadaNombre = "";

    const divMascotaSeleccion = document.getElementById('mascotasSeleccion');
    const formAdopcion = document.getElementById('adopcionForm');
    const galeria = document.querySelector('.galeria');

    // --- FUNCIÓN NUEVA: Cargar mascotas desde el servidor ---
    function cargarMascotasAdoptables() {
        fetch('http://127.0.0.1:8000/mascotas/adoptables/')
            .then(response => response.json())
            .then(data => {
                galeria.innerHTML = ''; // Limpiamos la galería fija
                if (data.success && data.mascotas.length > 0) {
                    data.mascotas.forEach(mascota => {
                        const mascotaCard = document.createElement('button');
                        mascotaCard.type = 'button';
                        mascotaCard.className = 'card';
                        mascotaCard.dataset.id = mascota.id;
                        mascotaCard.dataset.nombre = mascota.nombre;

                        const icono = mascota.especie.toLowerCase() === 'gato' ? 'gato1.jpg' : 'perro1.jpg';

                        mascotaCard.innerHTML = `
                            <img src="../img/${icono}" alt="${mascota.nombre}">
                            <p>${mascota.nombre}</p>
                        `;
                        galeria.appendChild(mascotaCard);
                    });
                } else {
                    galeria.innerHTML = '<p>No hay mascotas disponibles para adopción en este momento.</p>';
                }
            });
    }

    // --- El resto del código es similar, pero ahora es más seguro ---
    if (galeria) {
        galeria.addEventListener('click', function(e) {
            const mascotaCard = e.target.closest('.card');
            if (!mascotaCard) return;

            mascotaSeleccionadaId = mascotaCard.dataset.id;
            mascotaSeleccionadaNombre = mascotaCard.dataset.nombre;
            
            divMascotaSeleccion.innerHTML = `<p>Has seleccionado a: <strong>${mascotaSeleccionadaNombre}</strong></p>`;
            window.location.hash = '#';
        });
    }

    formAdopcion.addEventListener('submit', function(evento) {
        evento.preventDefault();
        const nombreAdoptante = document.getElementById('nombre').value;
        const id_usuario = localStorage.getItem('usuario_id');

        if (nombreAdoptante && id_usuario && mascotaSeleccionadaId) {
            const datosAdopcion = {
                id_usuario: id_usuario,
                id_mascota: mascotaSeleccionadaId,
                nombreAdoptante: nombreAdoptante
            };

            fetch('http://127.0.0.1:8000/adopciones/registrar/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosAdopcion)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    formAdopcion.reset();
                    mascotaSeleccionadaId = null;
                    mascotaSeleccionadaNombre = "";
                    divMascotaSeleccion.innerHTML = "";
                    cargarMascotasAdoptables(); // Recargamos la lista
                }
            });
        } else {
            alert("Por favor, completa tu nombre, inicia sesion y selecciona una mascota");
        }
    });

    // Llamamos a la función para cargar las mascotas al iniciar
    cargarMascotasAdoptables();
});