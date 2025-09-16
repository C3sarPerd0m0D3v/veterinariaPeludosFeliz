document.addEventListener('DOMContentLoaded', function() {

    console.log("registro.js cargado y listo.");

    // seleccionamos el formulario por su id

    const formRegistro = document.getElementById('registroForm');

    // Le decimos que escuche cuando se envíe el formulario

    formRegistro.addEventListener('submit', function(evento) {

        // Evitamos que la página se recargue

        evento.preventDefault(); 
        
        // Obtenemos el ID del usuario que guardó la sesión

        const id_usuario = localStorage.getItem('usuario_id');

        // Validamos que el usuario haya iniciado sesión

        if (!id_usuario) {

            alert("Error: No se ha iniciado sesión. Por favor, inicie sesión primero.");

            window.location.href = 'login.html';

            return;

        }

        // obtenemos los valores de los campos del NUEVO formulario
        const nombreMascota = document.getElementById('nombreMascota').value;
        const edadMascota = document.getElementById('edadMascota').value;
        const especie = document.getElementById('especie').value;
        const raza = document.getElementById('razaMascota').value;

        // corregimos la validacion para que revise los campos correctos

        if (nombreMascota === "" || edadMascota === "" || especie === "") {

            alert("Por favor, llena todos los campos requeridos.");

            return;

        }
        
        // agrupamos TODOS los datos que el servidor necesita, incluyendo la raza

        const datosMascota = {
            id_usuario: id_usuario,
            nombreMascota: nombreMascota,
            edadMascota: edadMascota,
            especie: especie,
            raza: raza
        };

        // enviamos los datos al servidor

        fetch('http://127.0.0.1:8000/mascotas/registrar/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosMascota)
        })

        .then(response => response.json())

        .then(data => {

            alert(data.message);

            if (data.success) {

                // si el registro es exitoso redirigimos a Mis Mascotas

                window.location.href = 'mis_mascotas.html';
            }

        })
        .catch(error => {

            console.error('Error:', error);

            alert('Hubo un error al registrar la mascota.');

        });

    });
    
});