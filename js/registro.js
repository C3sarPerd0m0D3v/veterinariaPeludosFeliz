document.addEventListener('DOMContentLoaded', function() {
    console.log("registro.js cargado y listo.");

    // 1. Buscamos el formulario específico por su ID
    const formRegistro = document.getElementById('registroForm');

    // Si no estamos en la página de registro, no hacemos nada más para evitar errores.
    if (!formRegistro) {
        return;
    }

    // 2. Le decimos que escuche cuando ESE formulario se envíe (y no a otros)
    formRegistro.addEventListener('submit', function(evento) {
        evento.preventDefault(); 
        
        const id_usuario = localStorage.getItem('usuario_id');
        
        if (!id_usuario) {
            alert("Error: No se ha iniciado sesión. Por favor, inicie sesión primero.");
            window.location.href = 'login.html';
            return;
        }
        
        // 3. Obtenemos los valores de los campos del formulario correcto y simplificado
        const nombreMascota = document.getElementById('nombreMascota').value;
        const edadMascota = document.getElementById('edadMascota').value;
        const especie = document.getElementById('especie').value;
        const raza = document.getElementById('razaMascota').value;

        // 4. La validación está corregida
        if (nombreMascota === "" || edadMascota === "" || especie === "") {
            alert("Por favor, llena todos los campos requeridos.");
            return;
        }
        
        // 5. Agrupamos TODOS los datos que el servidor necesita
        const datosMascota = {
            id_usuario: id_usuario,
            nombreMascota: nombreMascota,
            edadMascota: edadMascota,
            especie: especie,
            raza: raza
        };

        // 6. Enviamos los datos al servidor
        fetch('http://127.0.0.1:8000/mascotas/registrar/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosMascota)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                // 7. Redirigimos a "Mis Mascotas"
                window.location.href = 'mis_mascotas.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al registrar la mascota.');
        });
    });
});