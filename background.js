// Variable global para almacenar los enlaces bloqueados
var blockedLinks = ['https://test.com/'];

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        // Comprobar si la URL coincide con alguno de los enlaces bloqueados
        for (var i = 0; i < blockedLinks.length; i++) {
            if (details.url.includes(blockedLinks[i])) {
                return { cancel: true };
            }
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

// Escuchar mensajes enviados desde la página de la extensión
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "blockLink") {
            blockedLinks.push(request.link);
            sendResponse({ message: "Enlace bloqueado guardado exitosamente." });
        } else if (request.action === "unblockLink") {
            var index = blockedLinks.indexOf(request.link);
            if (index !== -1) {
                blockedLinks.splice(index, 1);
                sendResponse({ message: "Enlace desbloqueado exitosamente." });
            } else {
                sendResponse({ message: "El enlace no está bloqueado." });
            }
        }
    }
);