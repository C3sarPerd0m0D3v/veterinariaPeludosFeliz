// Aqui inicia toda la logica del inicio de sesion de la veterinaria

// esperamos a que el DOM este completamente cargado

// =====================================================================

// para cargar el nombre de usuario guardado en el localStorage

document.addEventListener('DOMContentLoaded', function() {

  const usuarioGuardado = localStorage.getItem('usuario'); // lee un dato guardado

  if (usuarioGuardado) {

    document.getElementById('username').value = usuarioGuardado;
  }

});

// =====================================================================

// primero al seleccionar el formulario usando su id

let miFormulario = document.getElementById('loginForm');

// despues le decimos que este escuchando cuando se envie el formulario osea el boton de iniciar sesion

miFormulario.addEventListener('submit', function(evento) {
  
  // esto se lo deje para evitar que la pagina se recargue o se vaya a otra parte
  // para cuando el usuario de click en el boton de iniciar sesion haga algo
  // es decir ira al menu principal, caso contrario ira a carrusel directeamente
  // pero en este caso lo dejamos asi para que no se recargue la pagina

  evento.preventDefault(); 

  console.log('Impresion de prueba en consola solo para ver que funciona');

  // Ahora si al seleccionar los campos de texto

  let usuarioInput = document.getElementById('username');

  let contrasenaInput = document.getElementById('password');

  // Y obtenemos el valor es decir (lo que el usuario escribio)

  let usuario = usuarioInput.value;

  let contrasena = contrasenaInput.value;

  // Mostramos en la consola lo que escribieron, para estar seguros de que lo capturamos bien

  console.log('Usuario escrito:', usuario);

  console.log('Contraseña escrita:', contrasena);
  
  // aca creamos una prueba simple en caso se cumpla la condicion

  // si el usuario y la contraseña no estan vacios

  if (usuario !== "" && contrasena !== "") {

    localStorage.setItem('usuario', usuario); 

    console.log(`Usuario '${usuario}' guardado`);

    alert('Tus Datos son correctos, iniciando sesion');

    setTimeout(function() { // usamos esta funcion para dar un tiempo para que se guarde el usuario en el navegador

    // y entonces lo mandamos a la pagina del menu principal  

    }, 500); window.location.href = miFormulario.action; // medio segundo de espera

  } else {;

    // si todo esta completo mostramos un mensaje de exito
    // si la validacion de arriba pasa entonces mostramos un mensaje al usuario
    // y aqui es donde nos comunicariamos con el servidor (python y mysql)
    // primero se agruparian los datos en un objeto o en un formulario
    // luego se usuaria el fetch para enviar el objeto a una url o ruta del servidor
    // luego django recibiria los datos los validaria y los guardaria en la base de datos
    // luego el servidor responderia con un mensaje de exito o de error
    // finalmente el cliente osea javascript (navegador) recibiria la respuesta y mostraria un mensaje al usuario
    // osea el mensaje de alert(" Tus Datos correctos, iniciando sesion")

    // ===========================================
    // en lugar de validar le preguntariamos al servidor si el usuario es correcto o esta en la base de datos
    // aqui va la logica para validar con el servidor (django (python) y mysql)
    // ===========================================

    alert('Campos Requeridos');

  }

});