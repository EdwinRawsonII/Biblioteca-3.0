// piano.js
const pianoKeys = document.querySelectorAll('.piano div');
const playRandomNoteButton = document.getElementById('play-random-note');
const repeatNoteButton = document.getElementById('repeat-note');
const toggleExerciseButton = document.getElementById('switch-label');

const notes = ['DO3', 'DO-sostenido-3', 'RE-3', 'RE-sostenido-3', 'MI-3', 'FA-3', 'FA-sostenido-3', 'SOL-3', 'SOL-sostenido-3', 'LA-3', 'LA-sostenido-3', 'SI-3','DO4', 'DO-sostenido-4', 'RE-4', 'RE-sostenido-4', 'MI-4', 'FA-4', 'FA-sostenido-4', 'SOL-4', 'SOL-sostenido-4', 'LA-4', 'LA-sostenido-4', 'SI-4', 'DO-5', 'DO-sostenido-5', 'RE-5', 'RE-sostenido-5', 'MI-5', 'FA-5', 'FA-sostenido-5', 'SOL-5', 'SOL-sostenido-5', 'LA-5', 'LA-sostenido-5', 'SI-5', 'DO-6'];
let currentNote = null;
let lastPlayedNote = null;
let exerciseActive = true;

function playSound(note) {
    const sound = new Audio(`Sounds/${note}.wav`);
    sound.play();
    lastPlayedNote = note;
}

function getRandomNote() {
    return notes[Math.floor(Math.random() * notes.length)];
}

playRandomNoteButton.addEventListener('click', () => {
    if (exerciseActive) {
        currentNote = getRandomNote();
        playSound(currentNote);
    }
});

repeatNoteButton.addEventListener('click', () => {
    if (exerciseActive && lastPlayedNote) {
        playSound(lastPlayedNote);
    }
});

toggleExerciseButton.addEventListener('click', () => {
    exerciseActive = !exerciseActive;
    toggleExerciseButton.textContent = exerciseActive ? 'Desactivar Ejercicio' : 'Activar Ejercicio';
});

pianoKeys.forEach(key => {
    key.addEventListener('click', () => {
        const selectedNote = key.dataset.note;
        playSound(selectedNote);

        if (exerciseActive) {
            alert(selectedNote === currentNote ? '¡Correcto!' : `Incorrecto. La nota correcta era: ${currentNote}`);
        }
    });
});
