console.log("adoptar.js cargado");

// aqui va la parte logica del modal y de seleccionar mascota

// lo primero guardamos en una variable el nombre de la mascota que se elija

// porque la iniciamos vacia? porque al principio no se ha seleccionado ninguna

let mascotaSeleccionada = "";

// luego seleccionamos el div o la caja a donde mostraremos el nombre de la mascota elegida

let divMascotaSeleccion = document.getElementById('mascotasSeleccion');

// despues seleccionamos todas las tarjetas de mascotas a la vez

// querySelectorAll nos dara una lista de todos los elementos que coinciden

let todasLasMascotas = document.querySelectorAll('.card');

// ahora recorremos esa lista de mascotas una por una para agregarles a una funcion

todasLasMascotas.forEach(function(mascota) {

  // ahora bien a cada tarjeta de mascota le ponemos un addEventListener de click 
  // esto hara que se ejecute una funcion

  mascota.addEventListener('click', function() {
    
    // Cuando se hace clic obtenemos el nombre guardado en data-nombre

    mascotaSeleccionada = mascota.dataset.nombre;

    console.log("Mascota seleccionada:", mascotaSeleccionada);
    
    // Mostramos en la página principal cuál mascota se eligio

    // usamos comilla invertida para poder usar ${} y poner variables dentro de adoptar.html

    divMascotaSeleccion.innerHTML = ` 

      <p>Has seleccionado a: <strong>${mascotaSeleccionada}</strong></p>

    `;
    
    // ahora ya podemos cerrar el modal La forma mas facil es cambiar el "hash" de la URL a nada

    // lo dejamos vacio con '#'

    window.location.hash = '#';

  });

});

// la logica del formulario de adopcion

let formAdopcion = document.getElementById('adopcionForm');

formAdopcion.addEventListener('submit', function(evento) {

  evento.preventDefault(); // como en las demas evitamos que la pagina se recargue o se vaya a otra parte
  
  // obtenemos el nombre de la persona que va a adoptar

  let nombreAdoptante = document.getElementById('nombre').value;
  
  // hacemos la validacion

  // Revisamos si el nombre no esta vacio Y (&&) si ya se selecciono una mascota

  if (nombreAdoptante !== "" && mascotaSeleccionada !== "") {

    // ================================================================
    // aqui va la logica python(django) y mysql aqui se enviaria  la solicitud de adopcion a django/mysql
    // =================================================================

    console.log(`Solicitud de adopcion enviada: ${nombreAdoptante} quiere adoptar a ${mascotaSeleccionada}.`);


    // django recibiria estos datos y los guardaria en la base de datos mysql

    
    alert(`Gracias ${nombreAdoptante} solicitud de adopcion enviada para adoptar a ${mascotaSeleccionada}.`);
    
    // limpiamos los campos para una nueva adopcion

    formAdopcion.reset(); // esto limpia el campo de texto del nombre

    mascotaSeleccionada = ""; // esto limpia la variable de la mascota seleccionada

    divMascotaSeleccion.innerHTML = ""; // esto limpia el div que muestra la mascota seleccionada

  } else {

    // Si falta algun dato mostramos un error

    alert("Ingresa tu nombre y selecciona una mascota del Album de Adopciones");

  }

});

