document.addEventListener('DOMContentLoaded', function() {
    
    // DOM del navegador
    const tbody = document.getElementById('lista-usuarios');
    const createForm = document.getElementById('create-usuario-form'); // El formulario de creación
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-usuario-form');
    const cancelEditBtn = document.getElementById('cancel-edit');

    // cargar usuarios

    function cargarUsuarios() {
        fetch('http://127.0.0.1:8000/usuarios/listar/')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    tbody.innerHTML = '';
                    data.usuarios.forEach(usuario => {
                        const fila = document.createElement('tr');
                        fila.setAttribute('data-user-id', usuario.id);
                        fila.innerHTML = `
                            <td>${usuario.id}</td>
                            <td class="nombre">${usuario.nombre}</td>
                            <td class="email">${usuario.email || 'No especificado'}</td>
                            <td class="rol">${usuario.rol}</td>
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

    // crear usuarios directamente desde el formulario

    createForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('create-nombre').value;
        const email = document.getElementById('create-email').value;
        const contrasena = document.getElementById('create-contrasena').value;
        const rol = document.getElementById('create-rol').value;

        fetch('http://127.0.0.1:8000/usuarios/registrar/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, contrasena, rol })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                createForm.reset();
                cargarUsuarios(); // recargamos la lista para ver el nuevo usuario
            }
        });
    });

    // editar y eliminar usuarios

    tbody.addEventListener('click', function(e) {
        const fila = e.target.closest('tr');
        if (!fila) return;
        const userId = fila.getAttribute('data-user-id');

        if (e.target.classList.contains('delete-btn')) {
            if (confirm(`¿Seguro que quieres eliminar al usuario con ID ${userId}?`)) {
                fetch(`http://127.0.0.1:8000/usuarios/eliminar/${userId}/`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    if (data.success) cargarUsuarios();
                });
            }
        }

        if (e.target.classList.contains('edit-btn')) {
            document.getElementById('edit-user-id').value = userId;
            document.getElementById('edit-nombre').value = fila.querySelector('.nombre').textContent;
            document.getElementById('edit-email').value = fila.querySelector('.email').textContent;
            document.getElementById('edit-rol').value = fila.querySelector('.rol').textContent;
            editModal.style.display = 'flex';
        }
    });

    // editar modal

    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userId = document.getElementById('edit-user-id').value;
        const nombre = document.getElementById('edit-nombre').value;
        const email = document.getElementById('edit-email').value;
        const rol = document.getElementById('edit-rol').value;

        fetch(`http://127.0.0.1:8000/usuarios/actualizar/${userId}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, rol })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                editModal.style.display = 'none';
                cargarUsuarios();
            }
        });
    });
    
    cancelEditBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // cargar de datos de usuaro
    
    cargarUsuarios();
});