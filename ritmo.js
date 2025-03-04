/*const noteFiles = {
     'DO-3':'./Sounds/DO-3.wav',        // ... (notas musicales anteriores)
    'stick': './Sounds/stick.wav', // Reemplaza con tu archivo .wav
    'bombo': './Sounds/bombo.wav', // Reemplaza con tu archivo .wav
    'timbre': './Sounds/timbre.wav', // Reemplaza con tu archivo .wav
};

function tocarNota(nota, duracion, sonidoPercusion) {
    const sonido = new Audio(sonidoPercusion ? noteFiles[nota] : noteFiles[nota]);
    sonido.play();
    return duracion * 1000;
}

function tocarRitmo(notas, ritmos, sonidoPercusion) {
    let tiempo = 0;
    for (let i = 0; i < notas.length; i++) {
        setTimeout(() => {
            tiempo += tocarNota(notas[i], ritmos[i], sonidoPercusion);
        }, tiempo);
    }
}

function tocarAcordeRitmo(notas, ritmos, sonidoPercusion) {
    tocarRitmo(notas, ritmos, sonidoPercusion);
}

function tocarIntervaloRitmo(notas, ritmos, sonidoPercusion) {
    tocarRitmo(notas, ritmos, sonidoPercusion);
}

const patronesRitmo = {
    'negras': [1, 1, 1, 1],
    'corcheas': [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    'ritmo1': [1, 0.5, 0.5],
    'ritmo2': [0.5, 1, 0.5]
};

const compases = {
    '2/4': [1, 1],
    '3/4': [1, 1, 1],
    '4/4': [1, 1, 1, 1],
    '6/8': [0.5, 0.5, 1, 0.5, 0.5, 1],
    '9/8': [0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1],
    '12/8': [0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 0.5, 1]
};

// ... (código JavaScript anterior)

const sonidoPercusionCheckbox = document.getElementById('sonido-percusion');
const compasCheckbox = document.getElementById('compas-seleccion');
const compasSelector = document.getElementById('grados4');

compasCheckbox.addEventListener('change', function() {
    compasSelector.disabled = !this.checked;
});

function obtenerRitmoSeleccionado() {
    const ritmoSelector = document.getElementById('ritmo-selector');
    return patronesRitmo[ritmoSelector.value];
}

function obtenerCompasSeleccionado() {
    return compases[compasSelector.value];
}

function tocarAcordeConRitmo() {
    const notasAcorde = ['DO-4', 'MI-4', 'SOL-4']; // Ejemplo
    const ritmos = compasCheckbox.checked ? obtenerCompasSeleccionado() : obtenerRitmoSeleccionado();
    const sonidoPercusion = sonidoPercusionCheckbox.checked;
    tocarAcordeRitmo(notasAcorde, ritmos, sonidoPercusion);
}

function tocarIntervaloConRitmo() {
    const notasIntervalo = ['DO-4', 'RE-4']; // Ejemplo
    const ritmos = compasCheckbox.checked ? obtenerCompasSeleccionado() : obtenerRitmoSeleccionado();
    const sonidoPercusion = sonidoPercusionCheckbox.checked;
    tocarIntervaloRitmo(notasIntervalo, ritmos, sonidoPercusion);
}

document.getElementById('tocar-acorde').addEventListener('click', tocarAcordeConRitmo);
document.getElementById('tocar-intervalo').addEventListener('click', tocarIntervaloConRitmo);

// Generar secciones del ejercicio (10 compases)
const ejercicioSecciones = document.getElementById('ejercicio-secciones');
for (let i = 0; i < 10; i++) {
    const seccion = document.createElement('div');
    seccion.className = 'dropdown4';
    seccion.dataset.index = i;
    seccion.innerHTML = `
        <button id="compas-<span class="math-inline">\{i \+ 1\}" class\="compas\-button" onclick\="activarSeccion\(</span>{i})">Seleccionar Compás</button>
        <div class="dropdown-content4">
            ${Object.keys(compases).map(compas => `<button onclick="seleccionarCompas(event, '${compas}')">${compas}</button>`).join('')}
        </div>
    `;
    ejercicioSecciones.appendChild(seccion);
}

let respuestasUsuario = Array(10).fill(null);

function seleccionarCompas(event, compas) {
    const botonSeleccionado = event.target;
    const dropdown = botonSeleccionado.closest('.dropdown4');
    const indiceSeccion = parseInt(dropdown.dataset.index);

    respuestasUsuario[indiceSeccion] = compas;

    const botones = dropdown.querySelectorAll('.dropdown-content4 button');
    botones.forEach(boton => boton.classList.remove('seleccionado'));
    botonSeleccionado.classList.add('seleccionado');

    const botonCompas = document.getElementById(`compas-${indiceSeccion + 1}`);
    botonCompas.textContent = compas;
}
function activarSeccion(indiceSeccion) {const dropdown = document.querySelectorAll('.dropdown4')[indiceSeccion];
    dropdown.classList.toggle('activo');
}

function verificarEjercicio() {
    let todasCorrectas = true;
    for (let i = 0; i < 10; i++) {
        if (!respuestasUsuario[i]) {
            todasCorrectas = false;
            document.getElementById('resultado-ejercicio').textContent = `Sección ${i + 1}: Compás no seleccionado.`;
            document.getElementById('resultado-ejercicio').className = 'text-danger';
            return;
        }
    }
    for (let i = 0; i < 10; i++) {
        if (respuestasUsuario[i] !== obtenerCompasSeleccionado()[i]) {
            todasCorrectas = false;
            document.getElementById('resultado-ejercicio').textContent = `Sección ${i + 1}: Incorrecto. Era ${obtenerCompasSeleccionado()[i]}.`;
            document.getElementById('resultado-ejercicio').className = 'text-danger';
            break;
        }
    }
    if (todasCorrectas) {
        document.getElementById('resultado-ejercicio').textContent = '¡Ejercicio completado correctamente!';
        document.getElementById('resultado-ejercicio').className = 'text-success';
    }
}

document.getElementById('verificar-ejercicio').addEventListener('click', verificarEjercicio);}
*/