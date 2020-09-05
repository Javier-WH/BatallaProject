const expresion = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
    password: /^.{4,12}$/,
}
let formulario;
window.addEventListener("load", () => {

    formulario = document.getElementById("formulario-login");
    document.getElementById("btnIngresar").addEventListener("click", isValid);

})

const isValid = (e) => {

    e.preventDefault();

    if (!expresion.usuario.test(Usuario.value) || !expresion.password.test(Password.value)) {

        ShowMessage("Datos Incorrectos");
    } else {

        let xhttp = new XMLHttpRequest();
        let data = new FormData(formulario);
        xhttp.open("POST", "/Batalla/PHP/ValidarLogin.php", true);

        xhttp.addEventListener("load", () => {

            if (xhttp.status >= 500) {
                ShowMessage("Error interno en el servidor");
            } else if (xhttp.status >= 400) {
                ShowMessage("El servidor no esta disponible");
            } else if (xhttp.readyState == 4 && xhttp.status == 200) {
                if (xhttp.response == "ProfesorEcontrado") {
                    window.open("/Batalla/PHP/Notas.php", "_self");
                } else {
                    ShowMessage(xhttp.response);
                }

            } else {
                ShowMessage("Error desconocido");
            }

        });
        xhttp.send(data);


    }

}