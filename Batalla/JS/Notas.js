let lblnota1, lblnota2, lblnota3;
let nota1, nota2, nota3;
let lblInputData, inputdata;
let btnLimpiar;

let indiceMax;
let innerUserData;
let seccion;
let periodo;
let SavedData = true;
let Tabla;
let Hint;
let TextBuscar;
let MsjGuardar;
let btnSiGuardar;
let btnNoGuardar;
/////////////////////////////
let indice = 0;
let listaMaterias = [];
let lista = [];
let listaSeccion = [];
let requestTime = 1000;
let ListaCodigos;
let ListaPeriodos;
let ListaSecciones;
let ListaEstudiantes;


window.addEventListener("load", () => {

    initialize(); //inicializa todos los elementos
  



    events();
    getGradeAverage();
    adjustHint();
    adjustSaveMessage();
    Hint.style.display = "none";

})


//asigna todos los eventos
const events = () => {

    nota1.addEventListener("focus", NotaGainFocus);
    nota2.addEventListener("focus", NotaGainFocus);
    nota3.addEventListener("focus", NotaGainFocus);
    nota1.addEventListener("blur", NotaLostFocus);
    nota2.addEventListener("blur", NotaLostFocus);
    nota3.addEventListener("blur", NotaLostFocus);
    nota1.addEventListener("keydown", preventkeyUpKeyDown);
    nota2.addEventListener("keydown", preventkeyUpKeyDown);
    nota3.addEventListener("keydown", preventkeyUpKeyDown);
    inputdata[0].addEventListener("focus", NotaGainFocus);
    inputdata[1].addEventListener("focus", NotaGainFocus);
    inputdata[2].addEventListener("focus", NotaGainFocus);
    inputdata[0].addEventListener("blur", NotaLostFocus);
    inputdata[1].addEventListener("blur", NotaLostFocus);
    inputdata[2].addEventListener("blur", NotaLostFocus);
    TextBuscar.addEventListener("keyup", fillHint);



    btnLimpiar.addEventListener("click", () => {
        TextBuscar.value = "";
        Hint.style.display = "none";
        TextBuscar.focus();
    });
}

//inicializa todas las variables
const initialize = () => {
        let opt = document.querySelector("#List-Periodo");

        ListaPeriodos = new Conection("periodo"); //para obtener la lista de periodos disponibles
        ListaCodigos = new Conection("MateriaCode"); //para obtener la lista de codigos de materias
        ListaSecciones = new Conection("seccion"); //para obtener la lista se secciones del profesor en cuestion
        ListaEstudiantes = new Conection("ListaAlumnosCompleta", "_p_2020", null); //carga la lista de estudiantes de un periodo

        nota1 = document.getElementById("Nota1");
        nota2 = document.getElementById("Nota2");
        nota3 = document.getElementById("Nota3");
        lblnota1 = document.getElementById("lblNota1");
        lblnota2 = document.getElementById("lblNota2");
        lblnota3 = document.getElementById("lblNota3");
        lblInputData = document.getElementsByClassName("lblinputData");
        inputdata = document.getElementsByClassName("input-data");
        btnLimpiar = document.querySelector("#btn-Limpiar2");
        Tabla = document.querySelector("#nomina2");
        Hint = document.querySelector("#Hints");
        TextBuscar = document.querySelector("#txtBuscarAlumno");
        MsjGuardar = document.querySelector("#MensajeGuardar");
        btnSiGuardar = document.querySelector("#btnSiGuardar");
        btnNoGuardar = document.querySelector("#btnNoGuardar");

    }
    //posiciona la sugerencia de ayuda debajo del input buscar alumno (Motor de busqueda)
const adjustHint = () => {
    Hint.style.top = (TextBuscar.offsetTop + 20) + "px";
    Hint.style.left = TextBuscar.offsetLeft + "px";
}
const adjustSaveMessage = () => {

    MsjGuardar.style.top = ((window.innerHeight / 2) - (200)) + "px";

}

//llena la sugerencia del textbox Buscar Alumno de ayuda con elementos de la listaseccion (llena el motor de busqueda)
const fillHint = () => {
    Hint.style.display = "block";
    Hint.innerHTML = "";
    let text = TextBuscar.value.toUpperCase();
    for (let i = 0; i < listaSeccion.length; i++) {
        let Nombre = listaSeccion[i]["Nombre"].toUpperCase();
        let Ced = listaSeccion[i]["Cedula"];
        if (text.length == 0) {
            Hint.innerHTML == "";
            Hint.style.display = "none";
        } else if (Nombre.indexOf(text) !== -1 || Ced.indexOf(text) !== -1) {
            Hint.innerHTML += "<button id='hint" + i + "' value='" + i + "' class='hintOPT'>" + listaSeccion[i]["Cedula"] + "  - " + listaSeccion[i]["Nombre"] + "</button> <br>"
        }
    }

    let hints = document.querySelectorAll(".hintOPT");

    for (let i = 0; i < hints.length; i++) {
        hints[i].addEventListener("click", (e) => {

            indice = e.target.value;

            setData();
            selectedFromTable();
            TextBuscar.value = document.querySelector("#NombreAlumno").innerHTML;
            Hint.style.display = "none";
        })
    }
}

//previene que se incremente la nota al pisar arriba o abajo
const preventkeyUpKeyDown = (e) => {
    if (e.key == "ArrowUp" || e.key == "ArrowDown") {
        e.preventDefault();
    }
}
//complemento animacion cuando ganan focus
const NotaGainFocus = (e) => {
    if (e.target == nota1) {
        lblnota1.style.color = " var(--Color-Principal)";
    } else if (e.target == nota2) {
        lblnota2.style.color = " var(--Color-Principal)";
    } else if (e.target == nota3) {
        lblnota3.style.color = " var(--Color-Principal)";
    } else if (e.target == inputdata[0]) {
        lblInputData[0].style.color = " var(--Color-Principal)";
    } else if (e.target == inputdata[1]) {
        lblInputData[1].style.color = " var(--Color-Principal)";
    } else if (e.target == inputdata[2]) {
        lblInputData[2].style.color = " var(--Color-Principal)";
    }
}

//complemento animcion cuando pierden focus
const NotaLostFocus = (e) => {

    if (e.target == nota1) {
        lblnota1.style.color = " var(--Color-Contraste)";
    } else if (e.target == nota2) {
        lblnota2.style.color = "  var(--Color-Contraste)";
    } else if (e.target == nota3) {
        lblnota3.style.color = "  var(--Color-Contraste)";
    } else if (e.target == inputdata[0]) {
        lblInputData[0].style.color = " var(--Color-Contraste)";
    } else if (e.target == inputdata[1]) {
        lblInputData[1].style.color = " var(--Color-Contraste)";
    } else if (e.target == inputdata[2]) {
        lblInputData[2].style.color = " var(--Color-Contraste)";
    }

    if (e.target.value > 20) {
        ShowMessageAtPointer("Advertencia, la nota introducida supera los 20 puntos", "White", "Red", "Red", 7000);
    }
    getGradeAverage();

}

//obtiene el promedio de las tres notas

const getGradeAverage = () => {

    let n1 = parseFloat(nota1.value);
    let n2 = parseFloat(nota2.value);
    let n3 = parseFloat(nota3.value);

    if (nota1.value == "") {
        n1 = 0;
    }
    if (nota2.value == "") {
        n2 = 0;
    }
    if (nota3.value == "") {
        n3 = 0;
    }

    document.getElementById("Nota-Acumulada").value = Math.round((n1 + n2 + n3) / 3);
}

const getSelectedOption = (sel) => {
    var opt;
    for (var i = 0, len = sel.options.length; i < len; i++) {
        opt = sel.options[i];
        if (opt.selected === true) {
            break;
        }
    }
    return opt;
}

//marca un elemento de la tabla conforme el indicee vigente .... tambien selecciona un elemeto al hacer click en el
const selectedFromTable = () => {

    for (let i = 0; i < listaSeccion.length; i++) {
        document.getElementById("T" + i).classList.remove("tdSelected")
        document.getElementById("T" + i).addEventListener("click", pickFromTable);

    }
    document.getElementById("T" + indice).classList.add("tdSelected");

}
//al dar click en un estudiante de la tabla, lo selecciona
const pickFromTable = (e) => {

    target = e.target.id;
    if (target[0] == "C" || target[0] == "N") {
        indice = target.substring(1);
        selectedFromTable();
        setData();
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

