let int = true; //variable para el timer
let int2 = true;

//muestra un mensaje en la ubicacion del puntero
const ShowMessageAtPointer = (mensaje = "hola", color = "var(--Color-Secundario)", colorTexto = "var(--Color-Principal)", boder = "var(--Color-Principal)", timer = 5000) => {

    let Mensaje = document.getElementsByClassName("FJ_errorPointer")[0];
    Mensaje.style.width = "500pX";
    Mensaje.style.height = "100px";
    Mensaje.style.fontSize = "30px";
    Mensaje.style.lineHeight = "100px";
    Mensaje.style.borderColor = boder;
    Mensaje.innerHTML = mensaje;
    Mensaje.style.backgroundColor = color;
    Mensaje.style.color = colorTexto;
    Mensaje.style.display = "initial";
    Mensaje.style.left = (window.innerWidth/2 - Mensaje.offsetWidth /2) + "px";
    Mensaje.style.top = (window.innerHeight/2 - Mensaje.offsetHeight /2) + "px";
    window.addEventListener("mousemove", () => {
        Mensaje.style.width = "400pX";
        Mensaje.style.height = "40px";
        Mensaje.style.fontSize = "16px";
        Mensaje.style.lineHeight = "40px";
        Mensaje.style.left = (window.event.pageX + 10) + "px";
        Mensaje.style.top = (window.event.pageY + 10) + "px";
    })
    if (int) {
        int = false;
        setTimeout(() => {
            Mensaje.style.display = "none";
            int = true;
        }, timer);

    }
}