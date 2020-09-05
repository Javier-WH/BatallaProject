/**
 * 
 * Este fichero contiene complementos en la animación para la pagina de login "index.html"
 * Tambien agrega la funcion "ShowMessage('mensaje')", que muestra un mensaje de error en la pantalla login
 * 
 * tambien declara y señala las variables generales Password y Usuario
 * 
 * Creado por Francisco Javier Rodriguez Hernandez - agosto 2020 
 * 
 */


let Vcontrol = true; //variable que se recicla en diferenes controles de este fichero
let Usuario;
let Password;

window.addEventListener("load", () => {

    document.getElementById("ShowHiddenIcon").addEventListener("click", togleShowIcon); // agrega la animacion y la accion de ocultar y mostrar password

    //animaciones de los input
    Usuario = document.getElementById("usuario");
    Password = document.getElementById("Password");
    Usuario.addEventListener("focus", checkFocus);
    Password.addEventListener("focus", checkFocus);
    Usuario.addEventListener("blur", checkLostFocus);
    Password.addEventListener("blur", checkLostFocus);
    /////////////////////////////////


    //alinea verticalmente el login
    alinearVerticalmente();
    window.addEventListener("resize", alinearVerticalmente);
})

//Revisa si los campos de usuario estan en focus y asiga las acciones correspondientes
//gana focus
const checkFocus = (e) => {

        if (e.target == Usuario) {
            document.getElementsByClassName("lbl-input")[0].style.color = "var(--Color-Principal)";
            document.getElementsByClassName("iconos-input")[0].style.fill = "var(--Color-Principal)";
        } else if (e.target == Password) {
            document.getElementsByClassName("lbl-input")[1].style.color = "var(--Color-Principal)";
            document.getElementsByClassName("iconos-input")[1].style.fill = "var(--Color-Principal)";
            document.getElementById("ShowHiddenIcon").style.fill = "var(--Color-Principal)";
            document.getElementById("line").style.stroke = "var(--Color-Principal)";
        }
    }
    //pierde focus

const checkLostFocus = (e) => {

    if (e.target == Usuario) {
        document.getElementsByClassName("lbl-input")[0].style.color = "var(--Color-Contraste)";
        document.getElementsByClassName("iconos-input")[0].style.fill = "var(--Color-Contraste)";
    } else if (e.target == Password) {
        document.getElementsByClassName("lbl-input")[1].style.color = "var(--Color-Contraste)";
        document.getElementsByClassName("iconos-input")[1].style.fill = "var(--Color-Contraste)";
        document.getElementById("ShowHiddenIcon").style.fill = "var(--Color-Contraste)";
        document.getElementById("line").style.stroke = "var(--Color-Contraste)";
    }
}

//funcion que muestra un mensaje debajo del boton ingresar
const ShowMessage = (Message = "TEST", timer = 5000) => {
    document.getElementById("mensaje").innerHTML = Message;
    MError = document.getElementById("mensajeError");
    MError.style.display = "initial";
    if (Vcontrol) {
        Vcontrol = false;
        setTimeout(() => {
            MError.style.display = "none";
            Vcontrol = true;
        }, timer);
    }
}

//alinea verticalmente el login
const alinearVerticalmente = () => {

    CP = document.getElementById("contenedor_principal");
    LG = document.getElementById("LOGO");
    CP.style.top = (window.innerHeight / 2) - ((CP.offsetHeight - (LG.offsetHeight/2))  / 2) + "px";

}