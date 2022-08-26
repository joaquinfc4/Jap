function email_completo() {
    let completo = true
    let Email = document.getElementById("Email").value;
    

    if(Email == "" ){
        completo = false
    }
    return completo;
}

function password_completo() {
    let completo = true
    let password = document.getElementById("Password").value;

    if(password == "" ){
        completo = false
    }
    return completo;
}



document.getElementById("ingresar_Boton").addEventListener("click", function() {
    if(password_completo() && email_completo() ){
        return window.location = "login.html";
    } else {
        alert("Verifique que los dos campos estan completos")
    }
    
});
