document.getElementById('rol').addEventListener('change', function() {
    const rol = this.value;
    document.getElementById('datosAcademicos').style.display = rol === 'edu' ? 'block' : 'none';
    document.getElementById('datosLaborales').style.display = rol === 'admin' ? 'block' : 'none';
});

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    fetch('/api/registro', { // Reemplaza '/api/registro' con tu endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Registro exitoso:', data);
        // Redirigir o mostrar mensaje de éxito
    })
    .catch(error => {
        console.error('Error en el registro:', error);
        // Mostrar mensaje de error
    });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    fetch('/api/login', { // Reemplaza '/api/login' con tu endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Inicio de sesión exitoso:', data);
        // Almacena el JWT en el almacenamiento local o en una cookie
        localStorage.setItem('jwt', data.token);
        // Redirige a la página principal o al panel de usuario
    })
    .catch(error => {
        console.error('Error en el inicio de sesión:', error);
        // Muestra un mensaje de error
    });
});


/////////Docente/admin-alumno/edu



