// ==========================================================
// logica para mostrar el nombre del usuario activo en el menu
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // datos guardados en el localStorage

  const usuarioActivo = localStorage.getItem('usuario');
  
  // busca la linea del id que pusimos en el html para mostrar el nombre

  const elementoBienvenida = document.getElementById('nombre-usuario-activo');
  
  // verificacion de usuario

  if (usuarioActivo && elementoBienvenida) {

    // usario encontrado se muestra en el menu

    elementoBienvenida.textContent = usuarioActivo;

  } else if (elementoBienvenida) {

    // se deja esta logica de prueba para una eventual creacion de usuarios

    //elementoBienvenida.textContent = 'Invitado';
  }
  
});

// ==========================================================
// aca va la logica del carrusel automatico que estaba en menu.html
// ==========================================================

let indice = 0;

const items = document.querySelectorAll('.carrusel-item');

function moverCarrusel() {

  if (items.length > 0) { // validacion de existencia de items

    indice++;

    if (indice >= items.length) {

        indice = 0;

    }
    const desplazamiento = -indice * 50; 

    document.querySelector('.carrusel').style.transform = `translateX(${desplazamiento}%)`;

  }
}

// el carrusel se mueve cada 3 segundos
setInterval(moverCarrusel, 3000);