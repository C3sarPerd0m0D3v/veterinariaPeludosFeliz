console.log("archivo citas cargado");

// seleccionamos el formulario por su id

let formCitas = document.getElementById('citasForm');

// le ponemos un addEventListener de eventos para cuando se intente enviar

formCitas.addEventListener('submit', function(evento) {

  // evitamos que la pagina se recargue o que se vaya a otra parte

  evento.preventDefault();
  
  // obtenemos los valores de cada campo del formulario

  let mascota = document.getElementById('mascota').value;

  let fecha = document.getElementById('fechaCita').value;

  let hora = document.getElementById('horaCita').value;

  let razon = document.getElementById('razon').value;

  let historial = document.getElementById('historial').value;

  
  // hacemos una validacion rapida para los campos que son obligatorios

  if (mascota === "" || fecha === "" || hora === "" || razon === "") { // si algun campo obligatorio esta vacio entonces

    // mostramos un mensaje de error
    // || es el operador logico "O" 

    alert("Campos Requeridos");

  } else {

    // si la validacion pasa entonces mostramos un mensaje de exito

    // ===================================================================

    // aquie enviariamos los datos de la cita al servidor django (python) y mysql 

    // ===================================================================

    console.log("Enviando datos de la cita al servidor");

    console.log(`Mascota: ${mascota}, Fecha: ${fecha}, Hora: ${hora}, Razón: ${razon}`);

    // solo todo sale bien entonces django guardaria la cita en la base de datos de mysql

    // ===================================================================

    alert(`Tu Cita fue agendada con exito para ${mascota} el dia ${fecha} a las ${hora}`); // mostramos un mensaje al usuario
    
    // limpiamos el formulario para que se pueda agendar otra cita

    formCitas.reset(); // esto limpia todos los campos del formulario

  }

});