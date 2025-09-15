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
    // usuario encontrado se muestra en el menu
    elementoBienvenida.textContent = usuarioActivo;
  } else if (elementoBienvenida) {
    // se deja esta logica de prueba para una eventual creacion de usuarios
    //elementoBienvenida.textContent = 'Invitado';
  }
});

// ==========================================================
// logica del carrusel automatico
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
// auto-movimiento con reset al usar botones
// ==========================================================
let carruselInterval = setInterval(() => actualizarCarrusel(1), 3000);

function moverConReset(dir) {
  actualizarCarrusel(dir);          
  clearInterval(carruselInterval);  
  carruselInterval = setInterval(() => actualizarCarrusel(1), 3000); 
}

// ==========================================================
// Botones laterales
// ==========================================================
nextBtn.addEventListener('click', () => moverConReset(1));
prevBtn.addEventListener('click', () => moverConReset(-1));

// ==========================================================
// Rotación automática de imágenes en .selection-img
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const imagenes = document.querySelectorAll(".selection-img img");
  let index = 0;

  // mostrar primera
  imagenes[index].classList.add("active");

  setInterval(() => {
    // quitar actual
    imagenes[index].classList.remove("active");
    // avanzar
    index = (index + 1) % imagenes.length;
    // mostrar nueva
    imagenes[index].classList.add("active");
  }, 3000); 
});

// ==========================================================
// SELECCIÓN DE ITEM DEL CARRUSEL CON PAUSA Y RESALTE
// ==========================================================
// ==========================================================
// SELECCIÓN DE ITEM DEL CARRUSEL CON PAUSA Y RESALTE
// ==========================================================
let selectedItem = null; 
let resetTimeout = null;

items.forEach(item => {
  item.addEventListener('click', () => {
    if (item === selectedItem) {
      const enlace = item.querySelector('a');
      if (enlace) window.location.href = enlace.href;
      return;
    }

    selectedItem = item;

    items.forEach(i => {
      if (i === item) {
        i.classList.add('selected');
        i.classList.remove('faded');
      } else {
        i.classList.add('faded');
        i.classList.remove('selected');
      }
    });

    clearInterval(carruselInterval);

    if (resetTimeout) clearTimeout(resetTimeout);

    resetTimeout = setTimeout(() => {
      items.forEach(i => i.classList.remove('selected', 'faded'));
      selectedItem = null;
      // reinicia carrusel automático sin centrar nada extra
      carrusel.style.transform = `translateX(${-indice * (100 / items.length)}%)`;
      carruselInterval = setInterval(() => actualizarCarrusel(1), 3000);
    }, 2500);
  });
});


// ==========================================================
// LOGICA MODAL DE DONACIONES
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {

  const btnDonar = document.querySelector('.donar-btn');
  const modal = document.getElementById('modalDonar');
  const cerrar = document.getElementById('cerrarModal');

  if(btnDonar && modal && cerrar) {
    btnDonar.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });

    cerrar.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

});
