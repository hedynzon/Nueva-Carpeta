const inputIntento = document.getElementById("inputIntento");
const btnAdivinar = document.getElementById("btnAdivinar");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const mejorpuntaje = document.getElementById("mejorpuntaje");
const historial = document.getElementById("historial");
const btnReiniciar = document.getElementById("btnReiniciar");
const tarjeta = document.getElementById("game-card");

inputIntento.addEventListener('keypress', function(evento) {
  if (evento.key === 'Enter') {
    verificarIntento();
  }
});

console.log("Elementos encontrados:", inputIntento, tarjeta, mensaje);

function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
}

mostrarMensaje("Bienvenido al juego", "#e94560");

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let mejorPuntaje = 0;
let historialIntentos = [];

console.log("(DEBUG)Número secreto:", numeroSecreto);

function verificarIntento() {
    let valor = Number(inputIntento.value);
    if(isNaN(valor) || valor < 1 || valor > 100) {
        mostrarMensaje(" ⚠️ Por favor ingresa un número entre 1 y 100", "orange");
        return;
    }

    intentos++;
    if (intentos <= 10) {
        contador.textContent = "Intentos: " + intentos;
    /*historialIntentos.push(valor);
    historial.textContent = "Historial: " + historialIntentos.join(", ");*/
        
        let color = valor > numeroSecreto ? '#ff6b6b' : valor < numeroSecreto ? '#4ecdc4' : '#00ff88';
        historial.innerHTML += '<span class="guess-pill" style="background:' + color + '30; color:' + color + '">' + valor + '</span>';

        if(valor === numeroSecreto) {
            mostrarMensaje("🎉¡Felicidades! Has adivinado el número secreto.", "green");
            if (mejorPuntaje===0 || mejorPuntaje > intentos) {
                mejorpuntaje.textContent = "Mejor Puntaje: " + intentos;
                mejorPuntaje = intentos;
            }            
            inputIntento.disabled = true;
            btnAdivinar.disabled = true;
            btnReiniciar.style.display = "inline-block";
            tarjeta.style.borderColor = "green";
            tarjeta.style.boxShadow = "0 0 40px rgba(0,255,136,0.3)";
        }
        else if(valor > numeroSecreto) {
                mostrarMensaje("📈 Muy alto, intenta más bajo", "#ff6b6b");
                mostrarMensaje(obtenerPista(valor, numeroSecreto), "#ff6b6b");
            } else {
                    mostrarMensaje("📉Muy bajo, intenta más alto", "#4ecdc4");                mostrarMensaje(obtenerPista(valor, numeroSecreto), "#4ecdc4");  
            }
            inputIntento.value = "";
            inputIntentofocus();
    } else {
        mostrarMensaje("💀 Has agotado tus 10 intentos. El número secreto era: " + numeroSecreto, "red");
        btnAdivinar.disabled = true;
        btnReiniciar.style.display = "inline-block";
        tarjeta.style.borderColor = "red";
        tarjeta.style.boxShadow = "0 0 40px rgba(255,0,0,0.3)";
    }
}

function reiniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    historialIntentos = [];
    contador.textContent = "Intentos: 0";
    /*historial.textContent = "Historial: ";*/

    historial.innerHTML = '';

    mostrarMensaje("Juego reiniciado. Intenta adivinar el número secreto.", "#e94560");
    inputIntento.disabled = false;
    btnAdivinar.disabled = false;
    btnReiniciar.style.display = "none";
    inputIntento.value = "";
    inputIntento.focus();

    tarjeta.style.borderColor = "rgba(233,69,96,0.3)";
    tarjeta.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";

    console.log("(DEBUG)Número secreto reiniciado:", numeroSecreto);
}

function obtenerPista(intento, secreto) {
  let diferencia = Math.abs(intento - secreto);

  if (diferencia <= 5) {
    return '🔥 ¡Muy cerca!';
  } else if (diferencia <= 15) {
    return '♨️ Caliente';
  } else if (diferencia <= 30) {
    return '🌤️ Tibio';
  } else {
    return '❄️ Frío';
  }
}


btnAdivinar.addEventListener("click", verificarIntento); 
btnReiniciar.addEventListener("click", reiniciarJuego);