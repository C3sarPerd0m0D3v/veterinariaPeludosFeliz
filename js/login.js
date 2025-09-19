// Aqui inicia toda la logica del inicio de sesion de la veterinaria
// esperamos a que el DOM este completamente cargado
// =====================================================================

// para cargar el nombre de usuario guardado en el localStorage

document.addEventListener("DOMContentLoaded", function () {

    const usuarioGuardado = localStorage.getItem("usuario"); // lee un dato guardado

    if (usuarioGuardado) {

        document.getElementById("username").value = usuarioGuardado;

    }

});

// ====================================================================

// primero al seleccionar el formulario usando su id

let miFormulario = document.getElementById("loginForm");

// despues le decimos que este escuchando cuando se envie el formulario osea el boton de iniciar sesion

miFormulario.addEventListener("submit", function (evento) {

    // esto se lo deje para evitar que la pagina se recargue o se vaya a otra parte

    evento.preventDefault();

    console.log("El formulario fue enviado");

    // Ahora si al seleccionar los campos de texto

    let usuarioInput = document.getElementById("username");
    let contrasenaInput = document.getElementById("password");

    // Y obtenemos el valor es decir (lo que el usuario escribio)

    let usuario = usuarioInput.value;
    let contrasena = contrasenaInput.value;

    // Mostramos en la consola lo que escribieron para estar seguros de que lo capturamos bien

    console.log("Usuario escrito:", usuario);
    console.log("Contraseña escrita:", contrasena);

  
    // Ahora si validamos y contactamos al servidor

    // primero validamos que los campos no esten vacios

    if (usuario === "" || contrasena === "") {

        alert("Campos Requeridos");

        return; // si falta algun dato el programa no continua

    }

    // ahora bien si los campos estan llenos ahora si contactamos al servidor
    // hacemos la peticion al servidor usando fetch

    fetch("http://127.0.0.1:8000/usuarios/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usuario: usuario,
            contrasena: contrasena,
        }),
    })
    .then(response => {

        if (!response.ok) {

            // si el servidor responde con un error 500 lo capturamos aqui

            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();

    })

    .then(data => {

        // ahora mostramos la respuesta que viene del servidor Django

        alert(data.message);

        console.log("Respuesta del servidor:", data);

        // ahora si el servidor nos dice que el login fue exitoso entonces guardamos y redirigimos a menu.html

        if (data.success) {

            localStorage.setItem("usuario", usuario);
            localStorage.setItem("usuario_id", data.usuario_id); // guardamos el usuario solo si el login es correcto
            localStorage.setItem("usuario_rol", data.rol); // guardamos el rol solo si el login es correcto
            
            // usamos esta funcion para dar un tiempo para que se guarde el usuario en el navegador
            // y entonces lo mandamos a la pagina del menu principal

            setTimeout(function () {

                window.location.href = "menu.html";

            }, 500); //este es el tiempo de espera en segundos

        }

    })
    
    .catch(error => {

        console.error("Error en la petición fetch:", error);

        alert("No se pudo conectar con el servidor o hubo un error.");

    });

});

// olvido de contraseña

document.addEventListener('DOMContentLoaded', function() {

    const forgotPasswordLink = document.getElementById('forgot-password-link');

    if (forgotPasswordLink) {

        forgotPasswordLink.addEventListener('click', function(evento) {

            evento.preventDefault(); 
            
            // mostramos la alerta 

            alert("Se notifica al administrador");

        });

    }
    
});