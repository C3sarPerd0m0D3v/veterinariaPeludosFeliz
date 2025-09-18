document.addEventListener('DOMContentLoaded', function() {
    
    // Obtenemos los datos del usuario
    const idUsuario = localStorage.getItem('usuario_id');
    const rolUsuario = localStorage.getItem('usuario_rol');

    const contenedorMascotas = document.getElementById('lista-de-mascotas');
    const tituloPagina = document.querySelector('.mascotas-container h1');
    const subtituloPagina = document.querySelector('.mascotas-container p');

    // Elementos del nuevo modal de edición
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-mascota-form');
    const cancelEditBtn = document.getElementById('cancel-edit');

    if (!idUsuario) {
        alert('Por favor, inicia sesión para ver las mascotas');
        window.location.href = 'login.html';
        return;
    }

    contenedorMascotas.innerHTML = '<p>Cargando mascotas...</p>';

    // decidimos que vista mostrar segun el rol
    // esto es lo que vera el administrador

    if (rolUsuario === 'Administrador') {
        tituloPagina.textContent = 'Registro Total de Mascotas';
        subtituloPagina.textContent = 'Consolidado';
        cargarTodasLasMascotas();

        // esto es lo que ver el cliente
        
    } else {
        tituloPagina.textContent = 'Mis Mascotas Registradas';
        subtituloPagina.textContent = 'Aqui es donde encontraras a todos tus amigos peludos';
        cargarMascotasDelUsuario();
    }

    // --- FUNCIONES ---

    // Funcion para el Administrador 

    function cargarTodasLasMascotas() {

        fetch('http://127.0.0.1:8000/mascotas/listar-todas/')

            .then(response => response.json())

            .then(data => {

                contenedorMascotas.innerHTML = '';

                if (data.success && data.mascotas.length > 0) {

                    data.mascotas.forEach(mascota => {

                        const mascotaCard = document.createElement('div');

                        mascotaCard.className = 'mascota-card';
                        
                        // Guardamos todos los datos de la mascota en el elemento

                        mascotaCard.dataset.id = mascota.id;
                        mascotaCard.dataset.nombre = mascota.nombre;
                        mascotaCard.dataset.especie = mascota.especie;
                        mascotaCard.dataset.raza = mascota.raza || '';
                        mascotaCard.dataset.edad = mascota.edad;

                        const icono = mascota.especie.toLowerCase().includes('gato') ? '🐈' : '🐕';

                        // Agregamos los botones de Editar y Eliminar

                        mascotaCard.innerHTML = `

                            <span class="mascota-card-icon">${icono}</span>

                            <div style="flex-grow: 1;">

                                <strong>${mascota.nombre}</strong>

                                <p style="font-size: 0.9rem; color: #555;">Dueño: ${mascota.dueño}</p>

                            </div>

                            <div class="acciones" style="display: flex; gap: 5px;">
                                <button class="edit-btn" style="padding: 4px 8px; font-size: 12px; cursor: pointer;">Editar</button>
                                <button class="delete-btn" style="padding: 4px 8px; font-size: 12px; cursor: pointer;">Eliminar</button>
                            </div>

                        `;

                        contenedorMascotas.appendChild(mascotaCard);

                    });

                } else {

                    contenedorMascotas.innerHTML = '<p>No hay ninguna mascota registrada en la clínica.</p>';
                }
            });
    }

    // Funcion para el Cliente 

    function cargarMascotasDelUsuario() {

        fetch(`http://127.0.0.1:8000/mascotas/por-usuario/?usuario_id=${idUsuario}`)

            .then(response => response.json())

            .then(data => {

                contenedorMascotas.innerHTML = '';

                if (data.success && data.mascotas.length > 0) {

                    data.mascotas.forEach(mascota => {

                        const mascotaCard = document.createElement('div');

                        mascotaCard.className = 'mascota-card';

                        const icono = mascota.especie.toLowerCase() === 'gato' ? '🐈' : '🐕';

                        mascotaCard.innerHTML = `

                            <span class="mascota-card-icon">${icono}</span>

                            <div><strong>${mascota.nombre}</strong></div>`;

                        contenedorMascotas.appendChild(mascotaCard);

                    });

                } else {

                    contenedorMascotas.innerHTML = '<p>Aún no tienes mascotas registradas.</p>';

                }
            });
    }

    // --- BOTONES DE EDITAR Y ELIMINAR ---

    contenedorMascotas.addEventListener('click', function(e) {

        const mascotaCard = e.target.closest('.mascota-card');

        if (!mascotaCard) return;

        // LOgica para ELIMINAR

        if (e.target.classList.contains('delete-btn')) {

            const mascotaId = mascotaCard.dataset.id;

            if (confirm(`¿Estás seguro de que quieres eliminar a ${mascotaCard.dataset.nombre}?`)) {

                fetch(`http://127.0.0.1:8000/mascotas/eliminar/${mascotaId}/`, { method: 'DELETE' })

                    .then(res => res.json())

                    .then(data => {

                        alert(data.message);

                        if (data.success) cargarTodasLasMascotas(); // Recargamos la lista

                    });
            }
        }
        
        // LOgica para EDITAR 

        if (e.target.classList.contains('edit-btn')) {

            // Llenamos el formulario del modal con los datos guardados en el `dataset`

            document.getElementById('edit-mascota-id').value = mascotaCard.dataset.id;
            document.getElementById('edit-nombre').value = mascotaCard.dataset.nombre;
            document.getElementById('edit-especie').value = mascotaCard.dataset.especie;
            document.getElementById('edit-raza').value = mascotaCard.dataset.raza;
            document.getElementById('edit-edad').value = mascotaCard.dataset.edad;
            editModal.style.display = 'flex'; // Mostramos el modal
        }
    });

    // formulario de EDICION (guardar cambios)

    editForm.addEventListener('submit', function(e) {

        e.preventDefault();

        const mascotaId = document.getElementById('edit-mascota-id').value;

        const datosMascota = {

            nombre_mascota: document.getElementById('edit-nombre').value,

            especie: document.getElementById('edit-especie').value,

            raza: document.getElementById('edit-raza').value,

            edad: document.getElementById('edit-edad').value,

        };

        fetch(`http://127.0.0.1:8000/mascotas/actualizar/${mascotaId}/`, {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(datosMascota)

        })

        .then(res => res.json())

        .then(data => {

            alert(data.message);

            if(data.success) {

                editModal.style.display = 'none'; // Ocultamos el modal

                cargarTodasLasMascotas(); // Recargamos la lista

            }

        });

    });

    // Para cerrar el modal con el botOn "Cancelar"

    cancelEditBtn.addEventListener('click', () => {

        editModal.style.display = 'none';

    });
    
});