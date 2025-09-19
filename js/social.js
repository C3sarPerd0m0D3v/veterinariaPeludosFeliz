document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para seleccionar la cantidad (se mantiene igual) ---
    const amountButtons = document.querySelectorAll('.amount-btn');
    const otherAmountInput = document.getElementById('other-amount-input');

    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            otherAmountInput.value = '';
        });
    });

    otherAmountInput.addEventListener('focus', () => {
        amountButtons.forEach(btn => btn.classList.remove('selected'));
    });

    // --- LÓGICA MEJORADA PARA LOS BOTONES DE PAGO ---
    
    // Obtenemos los elementos de nuestro nuevo modal
    const infoModal = document.getElementById('info-modal');
    const infoModalMessage = document.getElementById('info-modal-message');
    const infoModalCloseBtn = document.getElementById('info-modal-close');

    const cardButton = document.querySelector('.card-payment');
    const paypalButton = document.querySelector('.paypal-payment');

    // Función para mostrar el modal con un mensaje
    function mostrarAviso(mensaje) {
        infoModalMessage.textContent = mensaje;
        infoModal.style.display = 'flex';
    }

    // Cerramos el modal al hacer clic en el botón "Entendido"
    infoModalCloseBtn.addEventListener('click', () => {
        infoModal.style.display = 'none';
    });

    // Eventos para los botones de pago
    if (cardButton) {
        cardButton.addEventListener('click', () => {
            mostrarAviso("Funcion de pago con tarjeta en Desarrollo");
        });
    }

    if (paypalButton) {
        paypalButton.addEventListener('click', () => {
            mostrarAviso("Funcion de pago con PayPal en Desarrollo");
        });
    }
});