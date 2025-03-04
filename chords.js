const noteFiles = {
    'DO-3': './Sounds/DO-3.wav',
    'DO-sostenido-3': './Sounds/DO-sostenido-3.wav',
    'RE-3': './Sounds/RE-3.wav',
    'RE-sostenido-3': './Sounds/RE-sostenido-3.wav',
    'MI-3': './Sounds/MI-3.wav',
    'FA-3': './Sounds/FA-3.wav',
    'FA-sostenido-3': './Sounds/FA-sostenido-3.wav',
    'SOL-3': './Sounds/SOL-3.wav',
    'SOL-sostenido-3': './Sounds/SOL-sostenido-3.wav',
    'LA-3': './Sounds/LA-3.wav',
    'LA-sostenido-3': './Sounds/LA-3.wav',
    'SI-3': './Sounds/SI-3.wav',
    'DO-4': './Sounds/DO-4.wav',
    'DO-sostenido-4': './Sounds/DO-sostenido-4.wav',
    'RE-4': './Sounds/RE-4.wav',
    'RE-sostenido-4': './Sounds/RE-sostenido-4.wav',
    'MI-4': './Sounds/MI-4.wav',
    'FA-4': './Sounds/FA-4.wav',
    'FA-sostenido-4': './Sounds/FA-sostenido-4.wav',
    'SOL-4': './Sounds/SOL-4.wav',
    'SOL-sostenido-4': './Sounds/SOL-sostenido-4.wav',
    'LA-4': './Sounds/LA-4.wav',
    'LA-sostenido-4': './Sounds/LA-4.wav',
    'SI-4': './Sounds/SI-4.wav',
    'DO-5': './Sounds/DO-5.wav',
    'DO-sostenido-5': './Sounds/DO-sostenido-5.wav',
    'RE-5': './Sounds/RE-5.wav',
    'RE-sostenido-5': './Sounds/RE-sostenido-5.wav',
    'MI-5': './Sounds/MI-5.wav',
    'FA-5': './Sounds/FA-5.wav',
    'FA-sostenido-5': './Sounds/FA-sostenido-5.wav',
    'SOL-5': './Sounds/SOL-5.wav',
    'SOL-sostenido-5': './Sounds/SOL-sostenido-5.wav',
    'LA-5': './Sounds/LA-5.wav',
    'LA-sostenido-5': './Sounds/LA-5.wav',
    'SI-5': './Sounds/SI-5.wav',
    'DO-6': './Sounds/DO-6.wav',
};

// Funciones genéricas para reproducción
function playChord(notes) {
    const sounds = notes.map(note => new Audio(noteFiles[note]));
    sounds.forEach(sound => sound.play().catch(error => console.log('Error al reproducir el acorde:', error)));
}

function playIntervalos(notes) {
    const sounds = notes.map(note => new Audio(noteFiles[note]));
    sounds.forEach(sound => sound.play().catch(error => console.log('Error al reproducir el intervalo:', error)));
}

// Funciones específicas para acordes
function playDOmayor() { playChord(['DO-4', 'MI-4', 'SOL-4']); }
function playREmenor() { playChord(['RE-4', 'FA-4', 'LA-4']); }
function playMImenor() { playChord(['MI-4', 'SOL-4', 'SI-4']); }
function playFAMAYOR() { playChord(['FA-4', 'LA-4', 'DO-5']); }
function playSOLMAYOR() { playChord(['SOL-4', 'SI-4', 'RE-5']); }
function playLAmenor() { playChord(['LA-4', 'DO-5', 'MI-5']); }
function playSIdisminuido() { playChord(['SI-4', 'RE-5', 'FA-5']); }

// Funciones específicas para intervalos
function playIntervalo2M() { playIntervalos(['DO-4', 'RE-4']); }
function playIntervalo2m() { playIntervalos(['DO-4', 'DO-sostenido-4']); }
function playIntervalo3M() { playIntervalos(['DO-4', 'MI-4']); }
function playIntervalo3m() { playIntervalos(['DO-4', 'RE-sostenido-4']); }
function playIntervalo4J() { playIntervalos(['DO-4', 'FA-4']); }
function playIntervalo5J() { playIntervalos(['DO-4', 'SOL-4']); }
function playIntervalo6M() { playIntervalos(['DO-4', 'LA-4']); }
function playIntervalo6m() { playIntervalos(['DO-4', 'SOL-sostenido-4']); }
function playIntervalo7M() { playIntervalos(['DO-4', 'SI-4']); }
function playIntervalo7m() { playIntervalos(['DO-4', 'LA-sostenido-4']); }
function playIntervalo8J() { playIntervalos(['DO-4', 'DO-5']); }

// Objeto para mapear grados a funciones de acorde
const chordFunctions = {
    'I': playDOmayor,
    'II': playREmenor,
    'III': playMImenor,
    'IV': playFAMAYOR,
    'V': playSOLMAYOR,
    'VI': playLAmenor,
    'VII': playSIdisminuido
};

// Objeto para mapear intervalos a funciones de intervalo
const intervaloFunctions = {
    '2M': playIntervalo2M,
    '2m': playIntervalo2m,
    '3M': playIntervalo3M,
    '3m': playIntervalo3m,
    '4J': playIntervalo4J,
    '5J': playIntervalo5J,
    '6M': playIntervalo6M,
    '6m': playIntervalo6m,
    '7M': playIntervalo7M,
    '7m': playIntervalo7m,
    '8J': playIntervalo8J,
};

// Funciones para reproducir secuencias
function playSequence(sequence) {
    let index = 0;
    function playNext() {
        if (index < sequence.length) {
            chordFunctions[sequence[index]]();
            index++;
            setTimeout(playNext, 1500);
        }
    }
    playNext();
}

function playSequenceIntervalos(sequence) {
    let index = 0;
    function playNext() {
        if (index < sequence.length) {
            intervaloFunctions[sequence[index]]();
            index++;
            setTimeout(playNext, 2500);
        }
    }
    playNext();
}

// Variables para el ejercicio
let intentos = 0;
const maxIntentos = 10;
let resultadosSecuencia = [];
let respuestasUsuario = Array(maxIntentos).fill(null);
let respuestasIncorrectas = 0;

// Funciones para el ejercicio de acordes
function iniciarEjercicio() {
    const gradosSeleccionados = getGradosSeleccionados();
    if (gradosSeleccionados.length === 0) {
        alert('Por favor, seleccione al menos un grado.');
        return;
    }

    const secuencia = generarSecuenciaAleatoria(gradosSeleccionados);
    resultadosSecuencia = secuencia;
    reproducirSecuencia(secuencia);
}

function getGradosSeleccionados() {
    const grados = [];
    document.querySelectorAll('#grados input[type="checkbox"]:checked').forEach(checkbox => {
        grados.push(checkbox.value);
    });
    return grados;
}

function generarSecuenciaAleatoria(gradosSeleccionados) {
    const secuencia = [];
    for (let i = 0; i < maxIntentos; i++) {
        const gradoAleatorio = gradosSeleccionados [Math.floor(Math.random() * gradosSeleccionados.length)];
        secuencia.push(gradoAleatorio);
    }
    return secuencia;
}

function reproducirSecuencia(secuencia) {
    const audioMap = {
        "I": playDOmayor,
        "II": playREmenor,
        "III": playMImenor,
        "IV": playFAMAYOR,
        "V": playSOLMAYOR,
        "VI": playLAmenor,
        "VII": playSIdisminuido
    };

    let currentIndex = 0;
    function playNextChord() {
        if (currentIndex < secuencia.length) {
            const grado = secuencia[currentIndex];
            audioMap[grado]();
            currentIndex++;
            setTimeout(playNextChord, 1500);
        }
    }
    playNextChord();
}

function verificarTarea() {
    let todasCorrectas = true;
    for (let i = 0; i < maxIntentos; i++) {
        const gradoSeleccionado = respuestasUsuario[i];
        const gradoCorrecto = resultadosSecuencia[i];
        if (gradoSeleccionado !== gradoCorrecto) {
            todasCorrectas = false;
            document.getElementById('resultado').textContent = `Secuencia ${i + 1}: Incorrecto. Era ${gradoCorrecto}.`;
            document.getElementById('resultado').className = 'text-danger'; break;
        }
    }
    if (todasCorrectas) {
        document.getElementById('resultado').textContent = '¡Tarea completada correctamente!';
        document.getElementById('resultado').className = 'text-success';
    }
}

function seleccionarGrado(event, grado) {
    const botonSeleccionado = event.target;
    const dropdown = botonSeleccionado.closest('.dropdown2');
    const indiceSecuencia = parseInt(dropdown.dataset.index);

    respuestasUsuario[indiceSecuencia] = grado;

    const botones = dropdown.querySelectorAll('.dropdown-content2 button');
    botones.forEach(boton => boton.classList.remove('seleccionado'));
    botonSeleccionado.classList.add('seleccionado');

    const botonSecuencia = document.getElementById(`secuencia-${indiceSecuencia + 1}`);
    botonSecuencia.textContent = grado;
}

function activarSecuencia(indiceSecuencia) {
    const dropdown = document.querySelectorAll('.dropdown')[indiceSecuencia];
    dropdown.classList.toggle('activo');
}

function repetirSecuencia() {
    reproducirSecuencia(resultadosSecuencia);
}

// Funciones para el ejercicio de intervalos
function iniciarEjercicioIntervalos() {
    const intervalosSeleccionados = obtenerIntervalosSeleccionados();
    if (intervalosSeleccionados.length === 0) {
        alert('Por favor, selecciona al menos un intervalo.');
        return;
    }

    const secuencia = generarSecuenciaAleatoriaIntervalos(intervalosSeleccionados);
    resultadosSecuencia = secuencia;
    playSequenceIntervalos(secuencia);
}

function obtenerIntervalosSeleccionados() {
    const intervalos = [];
    document.querySelectorAll('#grados2 input[type="checkbox"]:checked').forEach(checkbox => {
        intervalos.push(checkbox.value);
    });
    return intervalos;
}

function generarSecuenciaAleatoriaIntervalos(intervalosSeleccionados) {
    const secuencia = [];
    for (let i = 0; i < maxIntentos; i++) {
        const intervaloAleatorio = intervalosSeleccionados[Math.floor(Math.random() * intervalosSeleccionados.length)];
        secuencia.push(intervaloAleatorio);
    }
    return secuencia;
}

function verificarTareaIntervalos() {
    let todasCorrectas = true;
    for (let i = 0; i < maxIntentos; i++) {
        const intervaloSeleccionado = respuestasUsuario[i];
        const intervaloCorrecto = resultadosSecuencia[i];
        if (intervaloSeleccionado !== intervaloCorrecto) {
            todasCorrectas = false;
            document.getElementById('resultado2').textContent = `Secuencia ${i + 1}: Incorrecto. Era ${intervaloCorrecto}.`;
            document.getElementById('resultado2').className = 'text-danger';
            break;
        }
    }
    if (todasCorrectas) {
        document.getElementById('resultado2').textContent = '¡Tarea completada correctamente!';
        document.getElementById('resultado2').className = 'text-success';
    }
}

function seleccionarGradoIntervalo(event, grado) {
    const botonSeleccionado = event.target;
    const dropdown = botonSeleccionado.closest('.dropdown3');
    const indiceSecuencia = parseInt(dropdown.dataset.index);

    respuestasUsuario[indiceSecuencia] = grado;

    const botones = dropdown.querySelectorAll('.dropdown-content2 button');
    botones.forEach(boton => boton.classList.remove('seleccionado'));
    botonSeleccionado.classList.add('seleccionado');

    const botonSecuencia = document.getElementById(`intervalos-${indiceSecuencia + 1}`);
    botonSecuencia.textContent = grado;
}

function repetirSecuenciaIntervalos() {
    playSequenceIntervalos(resultadosSecuencia);
}

function activarSecuenciaIntervalo(indiceSecuencia) {
    const dropdowns = document.querySelectorAll('.dropdown2');
    dropdowns[indiceSecuencia].classList.toggle('activo');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button[onclick="iniciarEjercicioIntervalos()"]').onclick = iniciarEjercicioIntervalos;
});