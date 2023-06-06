// Función para mostrar el resultado desencriptado y ocultar la imagen
function mostrarResultadoDesencriptado() {
    var seccionPlaceholder = document.getElementById("placeholderInfo");
    var seccionTextoDes = document.getElementById("textoDes");
    var imagen = seccionPlaceholder.querySelector("img");

    imagen.style.display = "block";
    seccionTextoDes.style.display = "none";
}

// Función para mostrar el resultado encriptado y ocultar el texto desencriptado
function mostrarResultadoEncriptado() {
    var seccionPlaceholder = document.getElementById("placeholderInfo");
    var seccionTextoDes = document.getElementById("textoDes");
    var imagen = seccionPlaceholder.querySelector("img");

    imagen.style.display = "none";
    seccionTextoDes.style.display = "block";
}

// Función para ocultar el mensaje de advertencia
function ocultarWarning() {
    var warning = document.getElementById("warning");
    warning.style.display = "none";
}

// Función para mostrar el mensaje de advertencia
function mostrarWarning() {
    var warning = document.getElementById("warning");
    warning.style.display = "block";
}

// Función para encriptar el texto ingresado por el usuario
function encriptar() {
    var palabraOriginal = document.getElementById("textInput").value;
    palabraOriginal = palabraOriginal.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    var reglas = { 'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat' };
    var palabraEncriptada = "";
    for (var i = 0; i < palabraOriginal.length; i++) {
        var letra = palabraOriginal[i];
        if (letra in reglas) {
            palabraEncriptada += reglas[letra];
        } else {
            palabraEncriptada += letra;
        }
    }
    document.getElementById("textArea").value = palabraEncriptada;
    ocultarWarning();
    mostrarResultadoEncriptado();
}

// Función para desencriptar el texto ingresado por el usuario
function desencriptar() {
    var palabraEncriptada = document.getElementById("textArea").value;
    palabraEncriptada = palabraEncriptada.toLowerCase();
    var reglas = { 'enter': 'e', 'imes': 'i', 'ai': 'a', 'ober': 'o', 'ufat': 'u' };
    var palabraOriginal = "";
    var palabrasEncriptadas = Object.keys(reglas);
    while (palabraEncriptada.length > 0) {
        var palabraEncriptadaEncontrada = false;
        for (var i = 0; i < palabrasEncriptadas.length; i++) {
            var palabraEncriptadaActual = palabrasEncriptadas[i];
            if (palabraEncriptada.startsWith(palabraEncriptadaActual)) {
                palabraOriginal += reglas[palabraEncriptadaActual];
                palabraEncriptada = palabraEncriptada.slice(palabraEncriptadaActual.length);
                palabraEncriptadaEncontrada = true;
                break;
            }
        }
        if (!palabraEncriptadaEncontrada) {
            palabraOriginal += palabraEncriptada[0];
            palabraEncriptada = palabraEncriptada.slice(1);
        }
    }
    document.getElementById("textInput").value = palabraOriginal;
    mostrarWarning();
    mostrarResultadoDesencriptado();
}

// Función para copiar el texto en el área de texto encriptado/desencriptado
function copiar() {
    var textArea = document.getElementById("textArea");
    textArea.select();
    document.execCommand("copy");
}

// Asignar los eventos a los botones después de que se haya cargado el DOM
document.addEventListener("DOMContentLoaded", function() {
    var btnEncriptar = document.getElementById("encriptar");
    var btnDesencriptar = document.getElementById("desencriptar");
    var btnCopiar = document.getElementById("copiado");
    btnEncriptar.addEventListener("click", encriptar);
    btnDesencriptar.addEventListener("click", desencriptar);
    btnCopiar.addEventListener("click", copiar);
});
