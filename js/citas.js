// esperamos a que el DOM este completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    console.log("archivo citas cargado");

    //  elementos del DOM

    const idUsuario = localStorage.getItem('usuario_id');

    const formCitas = document.getElementById('citasForm'); 

    const selectMascota = document.getElementById('mascota');   
    
    // ventana emergente de citas

    const overlay = document.getElementById('overlay');

    const cerrarBtn = document.getElementById('cerrarBtn');

    const mensajePopup = document.getElementById('mensajePopup');

    const generarCitaBtn = document.getElementById('generarCitaBtn');

    if (!idUsuario) {

        alert('Por favor, inicia sesión para poder agendar una cita.');

        window.location.href = 'login.html';

        return;

    }

    // Cargar mascotas del ususario (lista)

    function cargarMascotas() {

        fetch(`http://127.0.0.1:8000/mascotas/por-usuario/?usuario_id=${idUsuario}`)

            .then(response => response.json())

            .then(data => {

                if (data.success && data.mascotas.length > 0) {

                    selectMascota.innerHTML = '<option value="">Selecciona la mascota</option>';

                    data.mascotas.forEach(mascota => {

                        const opcion = document.createElement('option');

                        opcion.value = mascota.id;

                        opcion.textContent = mascota.nombre;

                        selectMascota.appendChild(opcion);

                    });

                } else {

                    selectMascota.innerHTML = '<option value="">No tienes mascotas registradas</option>';

                }

            })

            .catch(error => console.error('Error al cargar mascotas:', error));
    }

    // Envio del formualrio

    formCitas.addEventListener('submit', function(evento) {

        evento.preventDefault();
        
        const idMascota = selectMascota.value;

        const fecha = document.getElementById('fechaCita').value;

        const hora = document.getElementById('horaCita').value;

        const motivo = document.getElementById('razon').value; 

        if (!idMascota || !fecha || !hora || !motivo) {

            alert('Por favor, completa todos los campos.');

            return;

        }

        const fechaHoraCompleta = `${fecha} ${hora}:00`;

        const datosCita = {

            id_mascota: idMascota,

            fecha_cita: fechaHoraCompleta,

            motivo_cita: motivo

        };

        fetch('http://127.0.0.1:8000/citas/registrar/', {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(datosCita)

        })

        .then(response => response.json())

        .then(data => {

            alert(data.message);

            if (data.success) {

                formCitas.reset();

            }

        })

        .catch(error => {

            console.error('Error al registrar cita:', error);

            alert('Hubo un error al conectar con el servidor.');

        });

    });

    // Generar Cita ventna emergente

    generarCitaBtn.addEventListener('click', function() {

        const mascotaTexto = selectMascota.options[selectMascota.selectedIndex].text || "tu mascota";

        const fecha = document.getElementById('fechaCita').value || "una fecha";

        const hora = document.getElementById('horaCita').value || "una hora";
        
        mensajePopup.textContent = `Se ha generado un comprobante de cita para ${mascotaTexto} el ${fecha} a las ${hora}.`;

        overlay.style.display = 'flex';

    });

    cerrarBtn.addEventListener('click', function() {

        overlay.style.display = 'none';

    });

    // listado de mascotas al cargar la pagina
    
    cargarMascotas();
});