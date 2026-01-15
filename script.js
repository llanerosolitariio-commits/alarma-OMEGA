let tiempoAlarma = null;
let alarmaActiva = false;
const audio = document.getElementById('audio-player');

// Actualizar el reloj cada segundo
setInterval(() => {
    const ahora = new Date();
    const h = String(ahora.getHours()).padStart(2, '0');
    const m = String(ahora.getMinutes()).padStart(2, '0');
    const s = String(ahora.getSeconds()).padStart(2, '0');
    
    document.getElementById('reloj').innerText = `${h}:${m}:${s}`;

    // Verificar si es hora de sonar
    if (tiempoAlarma === `${h}:${m}` && !alarmaActiva) {
        sonar();
    }
}, 1000);

// Cargar el tono elegido
document.getElementById('alarm-sound').onchange = function(e) {
    const reader = new FileReader();
    reader.onload = function(e) {
        audio.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
};

function setAlarm() {
    const input = document.getElementById('alarm-time');
    if (!input.value) return alert("Selecciona una hora primero");
    if (!audio.src) return alert("Por favor, elige un archivo MP3");

    tiempoAlarma = input.value;
    document.getElementById('status').innerText = `🔔 Alarma programada para las ${tiempoAlarma}`;
    document.getElementById('status').style.color = "#3b82f6";
}

function sonar() {
    alarmaActiva = true;
    audio.play();
    document.getElementById('btn-set').classList.add('hidden');
    document.getElementById('btn-stop').classList.remove('hidden');
    document.getElementById('status').innerText = "⏰ ¡DESPIERTA!";
    document.getElementById('status').style.color = "#ef4444";
}

function stopAlarm() {
    alarmaActiva = false;
    tiempoAlarma = null;
    audio.pause();
    audio.currentTime = 0;
    document.getElementById('btn-set').classList.remove('hidden');
    document.getElementById('btn-stop').classList.add('hidden');
    document.getElementById('status').innerText = "Alarma no programada";
}
