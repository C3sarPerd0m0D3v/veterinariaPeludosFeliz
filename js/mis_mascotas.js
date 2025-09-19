document.addEventListener('DOMContentLoaded', function() {
    
    // Obtenemos los datos del usuario de la sesión

    const idUsuario = localStorage.getItem('usuario_id');

    const rolUsuario = localStorage.getItem('usuario_rol');

    // Obtenemos los contenedores del HTML

    const contenedorMascotas = document.getElementById('lista-de-mascotas');

    const contenedorHistorial = document.getElementById('historial-container');

    const tituloPagina = document.querySelector('.mascotas-container h1');

    const subtituloPagina = document.querySelector('.mascotas-container p');
    
    // Obtenemos los elementos del modal de edición

    const editModal = document.getElementById('edit-modal');

    const editForm = document.getElementById('edit-mascota-form');

    const cancelEditBtn = document.getElementById('cancel-edit');

    // Verificamos si el usuario ha iniciado sesion

    if (!idUsuario) {

        alert('Por favor, inicia sesión para ver las mascotas.');

        window.location.href = 'login.html';

        return;

    }

    // --- vista principal segiun rol-

    if (rolUsuario === 'Administrador') {
        tituloPagina.textContent = 'Registro Total de Mascotas';
        subtituloPagina.textContent = 'Aquí puedes ver y gestionar todos los animales de la clínica.';
        cargarTodasLasMascotas();
    } else {
        tituloPagina.textContent = 'Mis Mascotas Registradas';
        subtituloPagina.textContent = 'Haz clic en una mascota para ver su historial de citas.';
        cargarMascotasDelUsuario();
    }


    // Funcion para el Administrador carga todas las mascotas con sus dueños

    function cargarTodasLasMascotas() {

        fetch('http://127.0.0.1:8000/mascotas/listar-todas/')

            .then(response => response.json())

            .then(data => {

                contenedorMascotas.innerHTML = '';

                if (data.success && data.mascotas.length > 0) {

                    data.mascotas.forEach(mascota => {

                        const mascotaCard = document.createElement('div');

                        mascotaCard.className = 'mascota-card';

                        // Guardamos todos los datos de la mascota en el elemento para poder editarlos

                        mascotaCard.dataset.id = mascota.id;

                        mascotaCard.dataset.nombre = mascota.nombre;

                        mascotaCard.dataset.especie = mascota.especie;

                        mascotaCard.dataset.raza = mascota.raza || '';

                        mascotaCard.dataset.edad = mascota.edad;

                        const icono = mascota.especie.toLowerCase().includes('gato') ? '🐈' : '🐕';
                        
                        mascotaCard.innerHTML = `
                            <span class="mascota-card-icon">${icono}</span>
                            <div style="flex-grow: 1;">
                                <strong>${mascota.nombre}</strong>
                                <p style="font-size: 0.9rem; color: #555;">Dueño: ${mascota.dueño}</p>
                            </div>
                            <div class="acciones" style="display: flex; gap: 5px;">
                                <button class="edit-btn">Editar</button>
                                <button class="delete-btn">Eliminar</button>
                            </div>`;

                        contenedorMascotas.appendChild(mascotaCard);

                    });

                } else {

                    contenedorMascotas.innerHTML = '<p>No hay ninguna mascota registrada en la clínica.</p>';

                }
            });
    }

    // Función para el Cliente: Carga solo sus propias mascotas

    function cargarMascotasDelUsuario() {

        fetch(`http://127.0.0.1:8000/mascotas/por-usuario/?usuario_id=${idUsuario}`)

            .then(response => response.json())

            .then(data => {

                contenedorMascotas.innerHTML = '';

                if (data.success && data.mascotas.length > 0) {

                    data.mascotas.forEach(mascota => {

                        const mascotaCard = document.createElement('div');

                        mascotaCard.className = 'mascota-card';

                        // Guardamos datos para poder hacer clic y ver el historial

                        mascotaCard.dataset.id = mascota.id;

                        mascotaCard.dataset.nombre = mascota.nombre;

                        mascotaCard.dataset.cliente = "true"; // Marcamos que es de un cliente
                        
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

    // eventos listar mascota 

    contenedorMascotas.addEventListener('click', function(e) {

        const mascotaCard = e.target.closest('.mascota-card');

        if (!mascotaCard) return;

        // Si el usuario es Administrador, activa la lógica de editar y eliminar

        if (rolUsuario === 'Administrador') {

            const mascotaId = mascotaCard.dataset.id;

            if (e.target.classList.contains('delete-btn')) {

                if (confirm(`¿Estás seguro de que quieres eliminar a ${mascotaCard.dataset.nombre}?`)) {

                    fetch(`http://127.0.0.1:8000/mascotas/eliminar/${mascotaId}/`, { method: 'DELETE' })

                        .then(res => res.json())

                        .then(data => {

                            alert(data.message);

                            if (data.success) cargarTodasLasMascotas();

                        });
                }
            }
            if (e.target.classList.contains('edit-btn')) {
                document.getElementById('edit-mascota-id').value = mascotaId;
                document.getElementById('edit-nombre').value = mascotaCard.dataset.nombre;
                document.getElementById('edit-especie').value = mascotaCard.dataset.especie;
                document.getElementById('edit-raza').value = mascotaCard.dataset.raza;
                document.getElementById('edit-edad').value = mascotaCard.dataset.edad;
                editModal.style.display = 'flex';
            }
        } 
        // Si es Cliente se activa ver el historial

        else if (mascotaCard.dataset.cliente === "true") {

            const mascotaId = mascotaCard.dataset.id;

            const mascotaNombre = mascotaCard.dataset.nombre;
            
            contenedorHistorial.innerHTML = `<h2 class="historial-titulo">Historial de Citas para ${mascotaNombre}</h2><p>Cargando historial...</p>`;
            
            fetch(`http://127.0.0.1:8000/mascotas/historial/${mascotaId}/`)

                .then(response => response.json())

                .then(data => {


                    if (data.success && data.historial.length > 0) {

                        contenedorHistorial.innerHTML = `<h2 class="historial-titulo">Historial de Citas para ${mascotaNombre}</h2>`;

                        data.historial.forEach(cita => {

                            const citaItem = document.createElement('div');

                            citaItem.className = 'cita-item';

                            const fecha = new Date(cita.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

                            citaItem.innerHTML = `
                                <p><strong>Fecha:</strong> ${fecha}</p>
                                <p><strong>Motivo:</strong> ${cita.motivo}</p>
                                <p><strong>Diagnóstico:</strong> ${cita.diagnostico || 'No especificado'}</p>
                            `;

                            contenedorHistorial.appendChild(citaItem);

                        });

                    } else {

                        contenedorHistorial.innerHTML = `<h2 class="historial-titulo">Historial de Citas para ${mascotaNombre}</h2><p>Esta mascota no tiene citas registradas.</p>`;

                    }
                });
        }
    });

    // --- modal de edicion para el admin ---

    if (editForm) {

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

                    editModal.style.display = 'none';

                    cargarTodasLasMascotas();

                }

            });

        });

    }
    
    if (cancelEditBtn) {

        cancelEditBtn.addEventListener('click', () => {

            editModal.style.display = 'none';

        });

    }

});