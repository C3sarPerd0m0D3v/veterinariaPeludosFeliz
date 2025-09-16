
document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================================
  // BIENVENIDA Y PANEL DE ADMINISTRADOR
  // ==========================================================

  const usuarioActivo = localStorage.getItem('usuario');

  const rolUsuario = localStorage.getItem('usuario_rol');
  
  const elementoBienvenida = document.getElementById('nombre-usuario-activo');
  
  
  const adminLink = document.getElementById('admin-link-li'); 
  
  // Muestra el nombre del usuario

  if (usuarioActivo && elementoBienvenida) {

    elementoBienvenida.textContent = usuarioActivo;

  } 
  
  // muestra el boton del panel de admin si el rol es 'Administrador'

  if (adminLink && rolUsuario === 'Administrador') {

    // esto hace vvisisble el boton del panel de admin si se ha ingresado como administrador

    adminLink.style.display = 'list-item'; 
  }

  // ==========================================================
  // LOGICA DEL CARRUSEL
  // ==========================================================
  
  const carruselContainer = document.querySelector('.carrusel-container');

  if (carruselContainer) {

    let indice = 0;
    const items = carruselContainer.querySelectorAll('.carrusel-item');
    const carrusel = carruselContainer.querySelector('.carrusel');
    const prevBtn = carruselContainer.querySelector('.carrusel-btn.prev');
    const nextBtn = carruselContainer.querySelector('.carrusel-btn.next');
    let carruselInterval;

    function actualizarCarrusel(dir = 1) {

      if (items.length > 0) {

        indice = (indice + dir + items.length) % items.length;

        if (carrusel) {

          carrusel.style.transform = `translateX(${-indice * (100 / items.length)}%)`;

        }

      }

    }

    function moverConReset(dir) {

      actualizarCarrusel(dir);   

      clearInterval(carruselInterval);  

      carruselInterval = setInterval(() => actualizarCarrusel(1), 3000); 
    }

    if (items.length > 0) {
      carruselInterval = setInterval(() => actualizarCarrusel(1), 3000);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => moverConReset(1));
    if (prevBtn) prevBtn.addEventListener('click', () => moverConReset(-1));
  }

  // ==========================================================
  // ROTACION DE IMAGENES EN LA SECCION DE SERVICIOS
  // ==========================================================

  const selectionImgContainer = document.querySelector(".selection-img");
  if (selectionImgContainer) {
    const imagenes = selectionImgContainer.querySelectorAll("img");
    if (imagenes.length > 0) {
      let index = 0;
      imagenes[index].classList.add("active");
      setInterval(() => {
        imagenes[index].classList.remove("active");
        index = (index + 1) % imagenes.length;
        imagenes[index].classList.add("active");
      }, 3000);
    }
  }
  
  // ==========================================================
  // LoGICA DEL MODAL DE DONACIONES
  // ==========================================================
  const btnDonar = document.getElementById('open-donate-modal-btn');
  const modal = document.getElementById('modalDonar');
  
  if (btnDonar && modal) {
    const cerrar = document.getElementById('cerrarModal');
    const miniForm = document.getElementById('miniFormularioDonar');
    const donarOpciones = document.getElementById('donarOpciones');
   
    btnDonar.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      if (miniForm) miniForm.style.display = 'block';
      if (donarOpciones) donarOpciones.style.display = 'none';
    });
   
    if (cerrar) cerrar.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if(e.target === modal) modal.classList.remove('active');
    });
   
    if (miniForm) {
      miniForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreDonante').value;
        const correo = document.getElementById('correoDonante').value;
        console.log("Donante:", nombre, correo);
        miniForm.style.display = 'none';
        if (donarOpciones) donarOpciones.style.display = 'block';
      });
    }
  }

  // Cerrar sesion

  const logoutButton = document.getElementById('logout-btn');
  
  if (logoutButton) {

    logoutButton.addEventListener('click', () => {

      // Mostramos un mensaje de confirmacion

      if (confirm('¿Estás seguro de que quieres cerrar la sesion?')) {

        // borramos todos los datos guardados en localStorage

        localStorage.clear();
        
        // redirigimos al usuario a la pagina de login

        window.location.href = 'login.html';

      }

    });

  }

});


