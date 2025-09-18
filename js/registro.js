
document.addEventListener('DOMContentLoaded', function() {

    console.log("registro.js cargado y listo.");

    // buscamos el formulario especifico por su ID

    const formRegistro = document.getElementById('registroForm');

    // Si no estamos en la pagina de registro no hacemos nada mas para evitar errores

    if (!formRegistro) {

        return;

    }

    // Le decimos que escuche cuando ESE formulario se envie

    formRegistro.addEventListener('submit', function(evento) {

        evento.preventDefault(); 
        
        const id_usuario = localStorage.getItem('usuario_id');
        
        if (!id_usuario) {

            alert("Error: No se ha iniciado sesión. Por favor, inicie sesión primero.");

            window.location.href = 'login.html';

            return;
        }
        
        // obtenemos los valores de los campos del formulario correcto y simplificado

        const nombreMascota = document.getElementById('nombreMascota').value;
        const edadMascota = document.getElementById('edadMascota').value;
        const especie = document.getElementById('especie').value;
        const raza = document.getElementById('razaMascota').value;

        // la validacion esta corregida

        if (nombreMascota === "" || edadMascota === "" || especie === "") {

            alert("Por favor, llena todos los campos requeridos.");

            return;

        }
        
        // agrupamos TODOS los datos que el servidor necesita

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

                // rdirigimos a Mis Mascotas

                window.location.href = 'mis_mascotas.html';
            }
        })

        .catch(error => {

            console.error('Error:', error);

            alert('Hubo un error al registrar la mascota.');

        });

    });
    
});