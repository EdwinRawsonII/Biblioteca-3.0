

// Función para reproducir un acorde usando múltiples notas
function playChord(notes) {
    const sounds = notes.map(note => new Audio(noteFiles[not])); // Crear un array de audios

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

function seleccionarGrado(indiceSecuencia, grado) {
    respuestasUsuario[indiceSecuencia] = grado; // Guarda la respuesta del usuario
    const dropdown = document.querySelectorAll('.dropdown')[indiceSecuencia];
    const botones = dropdown.querySelectorAll('.dropdown-content button');
    botones.forEach(boton => boton.classList.remove('seleccionado'));
    const botonSeleccionado = dropdown.querySelector(`[data-grado="${grado}"]`);
    botonSeleccionado.classList.add('seleccionado');
}

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

function playChord(notes) {
    const noteFiles = {
        'DO-4': './Sounds/DO-4.wav',
        'RE-4': './Sounds/RE-4.wav',
        'MI-4': './Sounds/MI-4.wav',
        'FA-4': './Sounds/FA-4.wav',
        'SOL-4': './Sounds/SOL-4.wav',
        'LA-4': './Sounds/LA-4.wav',
        'SI-4': './Sounds/SI-4.wav',
        'DO-5': './Sounds/DO-5.wav',
    };
    const sounds = notes.map(note => new Audio(noteFiles[note]));
    sounds.forEach(sound => sound.play().catch(error => console.log('Error al reproducir el acorde:', error)));
}

function repetirSecuencia() {
    reproducirSecuencia(resultadosSecuencia);
}