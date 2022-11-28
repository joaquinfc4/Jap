let emailInput = document.getElementById("e-mail")
let primerNombre = document.getElementById("primer-nombre")
let segundoNombre = document.getElementById("segundo-nombre")
let primerApellido = document.getElementById("primer-apellido")
let segundoApellido = document.getElementById("segundo-apellido")
let telefonoContacto = document.getElementById("telefono-contacto")

function debeEstarIngresado() {
    if (localStorage.getItem('email') == null) {
        alert("Debes estar logueado para ver el perfil")
        window.location = "index.html"
    }
}


function mostrarDatos() {
    emailInput.value = localStorage.getItem('email');
    datosPerfil = JSON.parse(localStorage.getItem(emailInput.value))
    console.log(datosPerfil);
    primerNombre.value = datosPerfil.primerNombre;
    segundoNombre.value = datosPerfil.segundoNombre;
    primerApellido.value = datosPerfil.primerApellido
    segundoApellido.value = datosPerfil.segundoApellido;
    telefonoContacto.value = datosPerfil.telefonoContacto;
}


document.getElementById("guardar-cambios").addEventListener("click", function () {
    let datosPerfil = {
        primerNombre: primerNombre.value,
        segundoNombre: segundoNombre.value,
        primerApellido: primerApellido.value,
        segundoApellido: segundoApellido.value,
        telefonoContacto: telefonoContacto.value,
    };

    if (form.checkValidity()) {
        document.getElementById("email-usr").innerHTML = emailInput.value;
        localStorage.setItem("email", emailInput.value)
        localStorage.setItem(emailInput.value, JSON.stringify(datosPerfil));
        alert('Se ha guardado con exito!')
    } 
        
    
    form.classList.add('was-validated');


});

document.addEventListener("DOMContentLoaded", function () {
    debeEstarIngresado()
    mostrarDatos()
})

