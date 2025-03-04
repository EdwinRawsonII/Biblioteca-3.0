/* 
EN CASO DE RESPALDO
// Función para reproducir un acorde usando múltiples notas
function playChord(notes) {
    const sounds = notes.map(note => new Audio(noteFiles[note])); // Crear un array de audios

    // Reproducir todas las notas al mismo tiempo
    sounds.forEach(sound => sound.play().catch(error => console.log('Error al reproducir el acorde:', error)));
}

// Función para reproducir el acorde DO MAYOR
function playDOmayor() {
    // El acorde de DO Mayor está formado por las notas DO-4, MI-4 y SOL-4
    playChord(['DO-4', 'MI-4', 'SOL-4']);
}

// Función para reproducir el acorde RE menor
function playREmenor() {
    // El acorde de RE Menor está formado por las notas RE-4, FA-4 y LA-4
    playChord(['RE-4', 'FA-4', 'LA-4']);
}

// Función para reproducir el acorde MI menor
function playMImenor() {
    // El acorde de MI menor está formado por las notas MI-4, SOL-4 y SI-4
    playChord(['MI-4', 'SOL-4', 'SI-4']);
}

// Función para reproducir el acorde FA mayor
function playFAMAYOR() {
    // El acorde de FA MAYOR está formado por las notas FA-4, LA-4 y DO-4
    playChord(['FA-4', 'LA-4', 'DO-4']);
}

// Función para reproducir el acorde SOL MAYOR
function playSOLMAYOR() {
    // El acorde de SOL MAYOR está formado por las notas SOL-4, SI-4 y RE-4
    playChord(['SOL-4', 'SI-4', 'RE-4']);
}

// Función para reproducir el acorde LA menor
function playLAmenor() {
    // El acorde de LA menor está formado por las notas LA-4, DO-4 y MI-4
    playChord(['LA-4', 'DO-4', 'MI-4']);
}

// Función para reproducir el acorde SI disminuido
function playSIdisminuido() {
    // El acorde de SI disminuido está formado por las notas SI-4, RE-4 y FA-4
    playChord(['SI-4', 'RE-4', 'FA-4']);
}

// chords.js
const noteFiles = {
    'DO-4': './Sounds/DO-4.wav', 'RE-4': './Sounds/RE-4.wav', 'MI-4': './Sounds/MI-4.wav',
    'FA-4': './Sounds/FA-4.wav', 'SOL-4': './Sounds/SOL-4.wav', 'LA-4': './Sounds/LA-4.wav',
    'SI-4': './Sounds/SI-4.wav', 'DO-5': './Sounds/DO-5.wav'
};

function playChord(notes) {
    notes.forEach(note => new Audio(noteFiles[note]).play().catch(err => console.log('Error:', err)));
}

const chordFunctions = {
    'I': () => playChord(['DO-4', 'MI-4', 'SOL-4']),
    'II': () => playChord(['RE-4', 'FA-4', 'LA-4']),
    'III': () => playChord(['MI-4', 'SOL-4', 'SI-4']),
    'IV': () => playChord(['FA-4', 'LA-4', 'DO-4']),
    'V': () => playChord(['SOL-4', 'SI-4', 'RE-4']),
    'VI': () => playChord(['LA-4', 'DO-4', 'MI-4']),
    'VII': () => playChord(['SI-4', 'RE-4', 'FA-4'])
};

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

/////////

let intentos = 0;
const maxIntentos = 10;
let resultadosSecuencia = [];
let respuestasUsuario = Array(maxIntentos).fill(null); // Almacena las respuestas del usuario
let respuestasIncorrectas = 0;

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
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        grados.push(checkbox.value);
    });
    return grados;
}

function generarSecuenciaAleatoria(gradosSeleccionados) {
    const secuencia = [];
    for (let i = 0; i < maxIntentos; i++) {
        const gradoAleatorio = gradosSeleccionados[Math.floor(Math.random() * gradosSeleccionados.length)];
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
            document.getElementById('resultado').className = 'text-danger';
            break;
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
////




function activarSecuencia(indiceSecuencia) {
    const dropdown = document.querySelectorAll('.dropdown')[indiceSecuencia];
    dropdown.classList.toggle('activo');
}

// Funciones de audio (reemplaza con tus archivos de audio)
function playDOmayor() { playChord(['DO-4', 'MI-4', 'SOL-4']); }
function playREmenor() { playChord(['RE-4', 'FA-4', 'LA-4']); }
function playMImenor() { playChord(['MI-4', 'SOL-4', 'SI-4']); }
function playFAMAYOR() { playChord(['FA-4', 'LA-4', 'DO-4']); }
function playSOLMAYOR() { playChord(['SOL-4', 'SI-4', 'RE-4']); }
function playLAmenor() { playChord(['LA-4', 'DO-4', 'MI-4']); }
function playSIdisminuido() { playChord(['SI-4', 'RE-4', 'FA-4']); }

function playChord(notes, noteFiles) {
    const sounds = notes.map(note => new Audio(noteFiles[note]));
    sounds.forEach(sound => sound.play().catch(error => console.log('Error al reproducir el acorde:', error)));
}

function playIntervalos(notes, noteFiles) {
    const sounds = notes.map(note => new Audio(noteFiles[note]));
    sounds.forEach(sound => sound.play().catch(error => console.log('Error al reproducir el acorde:', error)));
}

// Definición de noteFiles
const noteFiles = {
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
};

// Ejemplo de uso
const chordNotes = [    'DO-4', 'RE-4', 'MI-4',
    'FA-4', 'SOL-4', 'LA-4',
    'SI-4', 'DO-5'];
const intervalNotes = [ 'DO-4','DO-sostenido-4','RE-4','RE-sostenido-4','MI-4','FA-4','FA-sostenido-4','SOL-4','SOL-sostenido-4','LA-4','LA-sostenido-4','SI-4','DO-5'];

playChord(chordNotes, noteFiles);
playIntervalos(intervalNotes, noteFiles);




function repetirSecuencia() {
    reproducirSecuencia(resultadosSecuencia);
}





function playintervalos(notes) {
    const sounds = notes.map(note => new Audio(noteFiles[note]));
    sounds.forEach(sound => sound.play().catch(error => console.log('Error al reproducir el acorde:', error)));
}

function playIntervalo2M() { playintervalos(['DO-4', 'RE-4']); }
function playIntervalo2m() { playintervalos(['DO-4', 'DO-sostenido-4']); }
function playIntervalo3M() { playintervalos(['DO-4', 'MI-4']); }
function playIntervalo3m() { playintervalos(['DO-4', 'RE-sostenido-4']); }
function playIntervalo4J() { playintervalos(['DO-4', 'FA-4']); }
function playIntervalo5J() { playintervalos(['DO-4', 'SOL-4']); }
function playIntervalo6M() { playintervalos(['DO-4', 'LA-4']); }
function playIntervalo6m() { playintervalos(['DO-4', 'SOL-sostenido-4']); }
function playIntervalo7M() { playintervalos(['DO-4', 'SI-4']); }
function playIntervalo7m() { playintervalos(['DO-4', 'LA-sostenido-4']); }
function playIntervalo8J() { playintervalos(['DO-4', 'DO-5']); }

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

function iniciarEjercicioIntervalos() {
    const intervalosSeleccionados = obtenerIntervalosSeleccionados();
    if (intervalosSeleccionados.length === 0) {
        alert('Por favor, selecciona al menos un intervalo.');
        return;
    }

    const secuencia = generarSecuenciaAleatoria(intervalosSeleccionados);
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

function generarSecuenciaAleatoria(intervalosSeleccionados) {
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

function seleccionarGrado(event, grado) {
    const botonSeleccionado = event.target;
    const dropdown = botonSeleccionado.closest('.dropdown2');
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

function activarSecuencia(indiceSecuencia) {
    const dropdowns = document.querySelectorAll('.dropdown2');
    dropdowns[indiceSecuencia].classList.toggle('activo');
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button[onclick="iniciarEjercicioIntervalos()"]').onclick = iniciarEjercicioIntervalos;
});*/


