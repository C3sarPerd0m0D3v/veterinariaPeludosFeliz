
document.addEventListener('DOMContentLoaded', function() {

    const formRegistro = document.getElementById('formularioRegistro');

    formRegistro.addEventListener('submit', function(e) {

        e.preventDefault();

        const nombre = document.getElementById('nombreRegistro').value;

        const email = document.getElementById('emailRegistro').value;

        const contrasena = document.getElementById('contrasenaRegistro').value;

        fetch('http://127.0.0.1:8000/usuarios/registrar/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombre, email: email, contrasena: contrasena })
        })

        .then(response => response.json())

        .then(data => {

            alert(data.message);

            if (data.success) {

                // Si el registro es exitoso lo enviamos al login

                window.location.href = 'login.html'; 
            }
        })

        .catch(error => console.error('Error:', error));
    });
});