// Variable global para almacenar el enlace bloqueado
var blockedLink = "";

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        // Comprobar si la URL coincide con el enlace bloqueado
        if (details.url.includes(blockedLink)) {
            return { cancel: true };
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

// Escuchar mensajes enviados desde la página de la extensión
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "blockLink") {
            blockedLink = request.link;
            sendResponse({ message: "Enlace bloqueado guardado exitosamente." });
        }
    }
);