// mensaje para saber que cargo bien

// esto no la va a ver el usuario, solo nosotros por temas de errores

console.log("registro.js cargado");

// aca seleccionamos el formulario por su id

let formRegistro = document.getElementById('registroForm');

// le decimos que escuche cuando alguien intente darle en el boton de enviar

formRegistro.addEventListener('submit', function(evento) {

  // aqui evitamos que se recargue la pagina y que se no se vaya al carrusel

  evento.preventDefault(); 
  
  // despues seleccionamos cada uno de los campos del formulario

  let nombreMascota = document.getElementById('nombreMascota').value;

  let edadMascota = document.getElementById('edadMascota').value;

  let nombreDuenio = document.getElementById('nombreDuenio').value;

  let duiDuenio = document.getElementById('duiDuenio').value;

  let especie = document.getElementById('especie').value;

  let contacto = document.getElementById('contacto').value;
  
  // luego mostramos los datos en la consola para revisar si todo esta bien
  // recuerden que esto no lo vera el usuario solo nosotros

  console.log("==== Datos de la Mascota Registrada ====");

  console.log("Nombre Mascota:", nombreMascota);

  console.log("Edad:", edadMascota);

  console.log("Dueño:", nombreDuenio);

  console.log("DUI:", duiDuenio);

  console.log("Especie:", especie);

  console.log("Contacto:", contacto);
  
  // realizamos una validación simple para ver si alguno de los campos esta vacio

  if (nombreMascota === "" || edadMascota === "" || nombreDuenio === "" || duiDuenio === "" || especie === "" || contacto === "") {

    // si algo esta vacio mostramos un error al usuario pero no en consola

    alert("Campos Requeridos");

  } else {

    // si todo esta completo mostramos un mensaje de exito
    // si la validacion de arriba pasa entonces mostramos un mensaje al usuario
    // y aqui es donde nos comunicariamos con el servidor (python y mysql)
    // primero se agruparian los datos en un objeto o en un formulario
    // luego se usuaria el fetch para enviar el objeto a una url o ruta del servidor
    // luego django recibiria los datos los validaria y los guardaria en la base de datos
    // luego el servidor responderia con un mensaje de exito o de error
    // finalmente el cliente osea javascript (navegador) recibiria la respuesta y mostraria un mensaje al usuario
    // osea el mensaje de la linea 74 de alert("Tu Mascota ha sido registrada con exito")

    // -----------------------------------------------------------------
    // en este espacio aca va la logica para enviar datos a DJANGO(python) y a MYSQL 
    // ------------------------------------------------------------------

    alert("Tu Mascota ha sido registrada con exito");

    formRegistro.reset(); // esto es para limpiar el formulario
  }

});