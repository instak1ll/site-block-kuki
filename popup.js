document.addEventListener('DOMContentLoaded', function () {
    var linkInput = document.getElementById('linkInput');
    var saveButton = document.getElementById('saveButton');

    // Guardar el enlace al hacer clic en el botón "Guardar"
    saveButton.addEventListener('click', function () {
        var link = linkInput.value;

        // Enviar mensaje al background script para bloquear el enlace
        chrome.runtime.sendMessage({ action: "blockLink", link: link }, function (response) {
            // Mostrar una notificación de éxito
            var notification = document.createElement('div');
            notification.textContent = response.message;
            document.body.appendChild(notification);

            // Restablecer el campo de entrada
            linkInput.value = '';
        });
    });

    var removeButton = document.getElementById('removeButton');

    // Eliminar el enlace al hacer clic en el botón "Eliminar"
    removeButton.addEventListener('click', function () {
        var link = linkInput.value;

        // Enviar mensaje al background script para desbloquear el enlace
        chrome.runtime.sendMessage({ action: "unblockLink", link: link }, function (response) {
            // Mostrar una notificación de éxito
            var notification = document.createElement('div');
            notification.textContent = response.message;
            document.body.appendChild(notification);

            // Restablecer el campo de entrada
            linkInput.value = '';
        });
    });
});
