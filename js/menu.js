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
const carrusel = document.querySelector('.carrusel');
const prevBtn = document.querySelector('.carrusel-btn.prev');
const nextBtn = document.querySelector('.carrusel-btn.next');

// ==========================================================
// funcion para mover el carrusel
// ==========================================================
function actualizarCarrusel(dir = 1) {
  // mover índice
  indice = (indice + dir + items.length) % items.length;
  carrusel.style.transform = `translateX(${-indice * (100 / items.length)}%)`;
}

// ==========================================================
//  auto-movimiento con reset al usar botones
// ==========================================================

// variable para guardar el temporizador
let carruselInterval = setInterval(() => actualizarCarrusel(1), 3000);

// función que reinicia el temporizador cuando se usa un botón
function moverConReset(dir) {
  actualizarCarrusel(dir);          // mueve el carrusel
  clearInterval(carruselInterval);  // detiene el intervalo actual
  carruselInterval = setInterval(() => actualizarCarrusel(1), 3000); // reinicia desde cero
}

// ==========================================================
// Botones laterales
// ==========================================================
nextBtn.addEventListener('click', () => moverConReset(1));
prevBtn.addEventListener('click', () => moverConReset(-1));
