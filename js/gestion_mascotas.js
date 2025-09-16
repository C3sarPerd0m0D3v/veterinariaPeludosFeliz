document.addEventListener('DOMContentLoaded', function() {
    
    // elementos DOM nanvegador

    const tbody = document.getElementById('lista-mascotas');
    const createForm = document.getElementById('create-mascota-form');
    const ownerSelect = document.getElementById('create-dueño');
    
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-mascota-form');
    const cancelEditBtn = document.getElementById('cancel-edit');

    // Nueva funcionalidad cargar lista de duenios

    function cargarDueños() {
        fetch('http://127.0.0.1:8000/usuarios/listar/')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    data.usuarios.forEach(usuario => {
                        const option = document.createElement('option');
                        option.value = usuario.id; // Guardamos el ID del usuario
                        option.textContent = usuario.nombre; // Mostramos el nombre
                        ownerSelect.appendChild(option);
                    });
                }
            });
    }

    // funcion para cargar todas las mascotas

    function cargarMascotas() {
        fetch('http://127.0.0.1:8000/mascotas/listar-todas/')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    tbody.innerHTML = ''; // para limpiar la tabla
                    data.mascotas.forEach(mascota => {
                        const fila = document.createElement('tr');

                        // guardamos los datos en atributos para usarlos al editar

                        fila.setAttribute('data-id', mascota.id);
                        fila.setAttribute('data-nombre', mascota.nombre);
                        fila.setAttribute('data-especie', mascota.especie);
                        fila.setAttribute('data-raza', mascota.raza || '');
                        fila.setAttribute('data-edad', mascota.edad);

                        fila.innerHTML = `
                            <td>${mascota.id}</td>
                            <td class="nombre">${mascota.nombre}</td>
                            <td class="especie">${mascota.especie}</td>
                            <td class="raza">${mascota.raza || 'N/A'}</td>
                            <td class="edad">${mascota.edad}</td>
                            <td>${mascota.dueño}</td>
                            <td>
                                <button class="edit-btn">Editar</button>
                                <button class="delete-btn">Eliminar</button>
                            </td>
                        `;
                        tbody.appendChild(fila);
                    });
                }
            });
    }

    // evento para crear a la mascota

    createForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const datosMascota = {
            id_usuario: document.getElementById('create-dueño').value,
            nombreMascota: document.getElementById('create-nombre').value,
            especie: document.getElementById('create-especie').value,
            raza: document.getElementById('create-raza').value,
            edadMascota: document.getElementById('create-edad').value
        };

        fetch('http://127.0.0.1:8000/mascotas/registrar/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosMascota)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                createForm.reset();
                cargarMascotas(); // Recargar la lista
            }
        });
    });

    // editar y eliminar mascota

    tbody.addEventListener('click', function(e) {
        const fila = e.target.closest('tr');
        if (!fila) return;
        const mascotaId = fila.getAttribute('data-id');

        // boton eliminar

        if (e.target.classList.contains('delete-btn')) {
            if (confirm(`¿Seguro que quieres eliminar la mascota con ID ${mascotaId}?`)) {
                fetch(`http://127.0.0.1:8000/mascotas/eliminar/${mascotaId}/`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    if (data.success) cargarMascotas();
                });
            }
        }

        // boton editar

        if (e.target.classList.contains('edit-btn')) {
            document.getElementById('edit-mascota-id').value = mascotaId;
            document.getElementById('edit-nombre').value = fila.getAttribute('data-nombre');
            document.getElementById('edit-especie').value = fila.getAttribute('data-especie');
            document.getElementById('edit-raza').value = fila.getAttribute('data-raza');
            document.getElementById('edit-edad').value = fila.getAttribute('data-edad');
            editModal.style.display = 'flex';
        }
    });

    // para editar el modal

    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const mascotaId = document.getElementById('edit-mascota-id').value;
        const datosMascota = {
            nombre_mascota: document.getElementById('edit-nombre').value,
            especie: document.getElementById('edit-especie').value,
            raza: document.getElementById('edit-raza').value,
            edad: document.getElementById('edit-edad').value
        };

        fetch(`http://127.0.0.1:8000/mascotas/actualizar/${mascotaId}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosMascota)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                editModal.style.display = 'none';
                cargarMascotas();
            }
        });
    });
    
    cancelEditBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // carga de datos
    
    cargarDueños();
    cargarMascotas();
});