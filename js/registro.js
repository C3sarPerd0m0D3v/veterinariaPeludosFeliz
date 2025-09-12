// mensaje para saber que cargo bien
// esto no la va a ver el usuario, solo nosotros por temas de errores
console.log("registro.js cargado");

// aca seleccionamos el formulario por su id
let formRegistro = document.getElementById('registroForm');

// le decimos que escuche cuando alguien intente darle en el boton de enviar
formRegistro.addEventListener('submit', function(evento) {

  // aqui evitamos que se recargue la pagina
  evento.preventDefault(); 
  
  // despues seleccionamos cada uno de los campos del formulario
  let nombreMascota = document.getElementById('nombreMascota').value;
  let edadMascota = document.getElementById('edadMascota').value;
  let nombreDuenio = document.getElementById('nombreDuenio').value;
  let duiDuenio = document.getElementById('duiDuenio').value;
  let especie = document.getElementById('especie').value;
  let contacto = document.getElementById('contacto').value;

  // Obtenemos el ID del usuario que guardamos al iniciar sesión
  const id_usuario = localStorage.getItem('usuario_id');

  // realizamos una validación simple para ver si alguno de los campos esta vacio
  if (nombreMascota === "" || edadMascota === "" || nombreDuenio === "" || especie === "") {
    // si algo esta vacio mostramos un error al usuario
    alert("Por favor, llena todos los campos requeridos.");
    return;
  }
  
  if (!id_usuario) {
    alert("Error: No se ha iniciado sesión. Por favor, inicie sesión primero.");
    return;
  }

  // si todo esta completo, nos comunicamos con el servidor
  console.log("Enviando datos de mascota al servidor...");
    
  // primero se agruparian los datos en un objeto
  const datosMascota = {
    id_usuario: id_usuario,
    nombreMascota: nombreMascota,
    edadMascota: edadMascota,
    especie: especie,
    // Los otros campos del formulario no son necesarios para la tabla de mascotas
  };

  // luego se usuaria el fetch para enviar el objeto a una url o ruta del servidor
  fetch('http://127.0.0.1:8000/api/mascotas/registrar/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosMascota)
  })
  .then(response => response.json())
  .then(data => {
      // finalmente el cliente osea javascript recibe la respuesta y mostraria un mensaje al usuario
      alert(data.message);

      if (data.success) {
          formRegistro.reset(); // esto es para limpiar el formulario
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al registrar la mascota.');
  });
});