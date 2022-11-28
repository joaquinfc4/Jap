function emailPasswordCompletos() {
    let completo = true
    let Email = document.getElementById("Email").value;
    let password = document.getElementById("Password").value;
    

    if(Email == "" || password == ""){
        completo = false
        alert("Verifique que los dos campos estan completos")
    }
    return completo;
    
}

function validarCorreo(correo) {
    let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let esValido = expReg.test(correo);
    if (esValido == false) {
        alert("El correo electronico no es valido");
    } else {
        return true;
    }
}


document.getElementById("ingresar_Boton").addEventListener("click", function() {
    if(emailPasswordCompletos() && validarCorreo(document.getElementById('Email').value)){
        
        let email_usr = document.getElementById("Email").value;
        
        localStorage.setItem("email", email_usr)

        window.location = "login.html";

    }
    
});

