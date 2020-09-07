let lblnota1, lblnota2, lblnota3;
let nota1, nota2, nota3;
let lblInputData, inputdata;
let btnLimpiar;
let lista = [];
let listaSeccion = [];
let indice = 0;
let indiceMax;
let innerUserData;
let seccion;
let periodo;
let SavedData = true;
let Tabla;
let Hint;
let TextBuscar;
let MsjGuardar;
let MsjGopt = true;
let btnSiGuardar;
let btnNoGuardar;

window.addEventListener("load", () => {

    initialize(); //inicializa todos los elementos
    getUserData("seccion"); //carga los datos de usuario, los periodos y las secciones
    getUserData("periodo"); // va junto con la de arriba


    events();
    getGradeAverage();
    adjustHint();
    adjustSaveMessage();
    loadEstudiantes(); //
    setData();
    periodoAntesQueSeccion();
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
    nota1.addEventListener("keyup", getChanges);
    nota2.addEventListener("keyup", getChanges);
    nota3.addEventListener("keyup", getChanges);
    nota1.addEventListener("keydown", preventkeyUpKeyDown);
    nota2.addEventListener("keydown", preventkeyUpKeyDown);
    nota3.addEventListener("keydown", preventkeyUpKeyDown);

    inputdata[0].addEventListener("focus", NotaGainFocus);
    inputdata[1].addEventListener("focus", NotaGainFocus);
    inputdata[2].addEventListener("focus", NotaGainFocus);
    inputdata[0].addEventListener("blur", NotaLostFocus);
    inputdata[1].addEventListener("blur", NotaLostFocus);
    inputdata[2].addEventListener("blur", NotaLostFocus);

    document.querySelector("#List-Periodo").addEventListener("click", isSaved);
    document.querySelector("#List-Periodo").addEventListener("change", setPeriodo);
    document.querySelector("#List-Seccion").addEventListener("change", selectEstudiantes);
    document.querySelector("#List-Periodo").addEventListener("change", setData); ////////////////////
    document.querySelector("#List-Seccion").addEventListener("change", periodoAntesQueSeccion);
    document.querySelector("#List-Periodo").addEventListener("change", periodoAntesQueSeccion);

    document.querySelector("#btn-Guardar").addEventListener("click", sendData);

    TextBuscar.addEventListener("keyup", fillHint);

    window.addEventListener('mousemove', tuto1);

    document.getElementById("btn-Siguiente").addEventListener("click", ForwardBackward);
    document.getElementById("btn-Anterior").addEventListener("click", ForwardBackward);
    window.addEventListener("keydown", ForwardBackward);

    btnSiGuardar.addEventListener("click", saveMessageButtons);
    btnNoGuardar.addEventListener("click", saveMessageButtons);

    btnLimpiar.addEventListener("click", () => {
        TextBuscar.value = "";
        Hint.style.display = "none";
        TextBuscar.focus();
    });
}

//inicializa todas las variables
const initialize = () => {


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

//determina el codigo de la seccion  ///////////////////////////////////////////////////////////////////////////////////////////

const getSecctionCode = (code) => {
    let anno, seccion, materia;

    let xhttp = new XMLHttpRequest();
    let data = new FormData();
    data.append("Materia", code[0].toUpperCase());
    data.append("Type", "MateriaCode");

    xhttp.open("POST", "/BatallaProject/Batalla/PHP/LoadData.php", false);

    xhttp.addEventListener("load", () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            materia = xhttp.responseText;
            // console.log(materia);
        }
    })
    xhttp.send(data);

    switch (code[1]) {
        case "1":
            anno = "Primer Año";
            break;
        case "2":
            anno = "Segundo Año";
            break;
        case "3":
            anno = "Tercer Año";
            break;
        case "4":
            anno = "Cuarto Año";
            break;
        case "5":
            anno = "Quinto Año";
            break;
        default:
            anno = "Año Desconocido";
            break;
    }

    seccion = code[2].toUpperCase();
    return materia + " - " + anno + " " + seccion;
}



/////////////////obtiene todos los datos del usuario/////////////////////

const getUserData = (type = "seccion") => {
    let xhtml = new XMLHttpRequest();
    let data = new FormData();
    data.append("Type", type);
    xhtml.open("POST", "/BatallaProject/Batalla/PHP/LoadData.php", true);


    xhtml.addEventListener("load", () => {

        if (xhtml.readyState == 4 && xhtml.status == 200) {
            innerUserData = JSON.parse(xhtml.responseText);
            if (type == "seccion") {
                loadUserData(innerUserData);
            } else if (type == "periodo") {
                loadPeriodos(innerUserData);
            }
            // console.log(innerUserData);
        } else {
            alert("Error con el servidor de notas");
            window.open("/Batalla/index.html", "_self");
        }
    })

    xhtml.send(data);
}

//Carga los datos en los campos
const loadUserData = (data) => {
    let Seccion = document.querySelector("#List-Seccion");

    for (let i = 1; i <= 10; i++) {
        if (data["Mat" + i] != "") {
            Seccion.innerHTML += "<option value='" + data["Mat" + i] + "'>" + getSecctionCode(data["Mat" + i]) + "</option>";
        }
    }
}

//carga los periodos

const loadPeriodos = (data) => {
    let Periodos = document.querySelector("#List-Periodo");

    for (let i = data.length - 1; i >= 0; i--) {
        Periodos.innerHTML += "<option value = '" + data[i]["Periodos"] + "'>" + data[i]["Periodos"].substring(3) + "</option>";
    }

}

//Carga los estudiantes

const loadEstudiantes = () => {


    periodo = getSelectedOption(document.querySelector("#List-Periodo")).value;


    let xhttp = new XMLHttpRequest();
    let data = new FormData();
    data.append("Periodo", periodo);
    data.append("Type", "ListaAlumnosCompleta");


    xhttp.open("POST", "/BatallaProject/Batalla/PHP/LoadData.php", true);

    lista = [];
    xhttp.addEventListener("load", () => {

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            lista = JSON.parse(xhttp.responseText);
            // console.log(lista);
            return lista
        }
    })
    xhttp.send(data);


}

//selecciona los estudiantes, llena lista seccion2
const selectEstudiantes = (reset = true) => {
    let doesExist = false;
    if (reset) {
        indice = 0;
    }

    periodo = getSelectedOption(document.querySelector("#List-Periodo")).value;
    seccion = getSelectedOption(document.querySelector("#List-Seccion")).value;


    document.querySelector("#NombreAlumno").style.color = "var(--Color-Principal)";

    //Verifica que existen registros con el grado y la seccion seleccionado
    for (let i = 0; i < lista.length; i++) {
        if (lista[i]["Grado"].includes(seccion[1]) && lista[i]["Seccion"].includes(seccion[2])) {
            doesExist = true;
            break;
        }

    }


    if (doesExist) {

        listaSeccion = [];
        for (let i = 0; i < lista.length; i++) {
            if (lista[i]["Seccion"] == seccion[2] && lista[i]["Grado"] == seccion[1]) {
                listaSeccion.push(lista[i]);
            }
        }
        indiceMax = listaSeccion.length - 1;


    } else {

        if (getSelectedOption(document.querySelector("#List-Seccion")).value != "none") {
            alert("No se encontraron alumnos en la seccion seleccionada");
            document.querySelector("#List-Seccion").selectedIndex = 0;

        }
        listaSeccion = [];

    }

    SavedData = true;
    MsjGopt = true;
    setData();
    fillTable();




    document.querySelector("#List-Seccion").blur(); // necesario que pierda el focus para que puedan funcionar las teclas de direccion

}

//actualiza los datos
const setData = () => {

    periodo = getSelectedOption(document.querySelector("#List-Periodo")).value;
    seccion = getSelectedOption(document.querySelector("#List-Seccion")).value;
    if (periodo == "none") {
        document.querySelector("#List-Periodo").selectedIndex = 0;

    }
    if (periodo == "none" || seccion == "none") {

        document.querySelector("#CedulaAlumno").innerHTML = "";
        document.querySelector("#NombreAlumno").innerHTML = "Selecciona un Periodo y una Sección";
        document.querySelector("#NombreAlumno").style.color = "Red";
        nota1.value = "";
        nota2.value = "";
        nota3.value = "";
        nota1.disabled = true;
        nota2.disabled = true;
        nota3.disabled = true;
        Tabla.innerHTML = "";

    } else {

        document.querySelector("#CedulaAlumno").innerHTML = listaSeccion[indice]["Cedula"];
        document.querySelector("#NombreAlumno").innerHTML = listaSeccion[indice]["Nombre"];
        nota1.value = listaSeccion[indice][seccion[0].toUpperCase() + "1"];
        nota2.value = listaSeccion[indice][seccion[0].toUpperCase() + "2"];
        nota3.value = listaSeccion[indice][seccion[0].toUpperCase() + "3"];
        nota1.disabled = false;
        nota2.disabled = false;
        nota3.disabled = false;
    }

    getGradeAverage();
}

//determina que elemento esta seleccionado

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

//listener de los bonones siguiente y anterior

const ForwardBackward = (e) => {

        if (periodo != "none" && seccion != "none") {

            //BS y BA son los icononos de los botones
            if ( /*indice < indiceMax &&*/ e.target == document.getElementById("BS") || e.target == document.getElementById("btn-Siguiente") ||
                /*e.key == "ArrowRight" ||*/
                e.key == "ArrowDown") {
                indice++;
                if (indice > indiceMax) {
                    indice = 0;
                }
                TextBuscar.value = "";
                document.querySelector("#N0").focus(); //Coloca el focus en la tabla
            }
            if ( /*indice > 0 &&*/ e.target == document.getElementById("BA") || e.target == document.getElementById("btn-Anterior") ||
                /*e.key == "ArrowLeft" ||*/
                e.key == "ArrowUp") {
                indice--;
                if (indice < 0) {
                    indice = indiceMax;
                }
                TextBuscar.value = "";
                document.querySelector("#N0").focus(); //Coloca el focus en la tabla
            }

            setData();
            selectedFromTable();
        }
    }
    //control de periodo, 
const setPeriodo = () => {
        MsjGuardar.style.display = "none"; // esconde el mensaje de guardar si se cambia de perido
        document.querySelector("#List-Seccion").selectedIndex = 0;
        loadEstudiantes();
        periodoAntesQueSeccion();
    }
    //se debe escooger el periodo antes que la seccion, para evitar algunos bugs
const periodoAntesQueSeccion = () => {

    if (document.querySelector("#List-Periodo").selectedIndex == 0) {
        document.querySelector("#List-Seccion").disabled = true;

    } else {
        document.querySelector("#List-Seccion").disabled = false;
    }

    if (document.querySelector("#List-Periodo").selectedIndex == 0 ||
        document.querySelector("#List-Seccion").selectedIndex == 0) {
        TextBuscar.disabled = true;
    } else {
        TextBuscar.value = "";
        TextBuscar.disabled = false;
    }

}

//verifica que los datos esten guardados
const isSaved = () => {

    if (!SavedData && MsjGopt) {
        MsjGopt = false;
        MsjGuardar.style.display = "block";
    }


}

//modifica el arreglo en el lado del cliente conforme a los cambios realizados
const getChanges = () => {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i]["Cedula"] == document.querySelector("#CedulaAlumno").innerHTML) {
            lista[i][seccion[0].toUpperCase() + "1"] = nota1.value;
            lista[i][seccion[0].toUpperCase() + "2"] = nota2.value;
            lista[i][seccion[0].toUpperCase() + "3"] = nota3.value;
            selectEstudiantes(false);
            SavedData = false;
            MsjGopt = true;
        }
    }
}

//Guarda los cambios
const sendData = () => {

    if (getSelectedOption(document.querySelector("#List-Seccion")).value != "none" && !SavedData) {
        document.querySelector("#List-Periodo").disabled = true; //Estro previene algunos bugs, es momentaneo mientras aprendo a como hacerlo mejor
        xhttp = new XMLHttpRequest();
        data = new FormData();
        data.append("Datos", JSON.stringify(listaSeccion));
        data.append("Materia", seccion[0].toUpperCase());
        data.append("Periodo", periodo);
        data.append("Type", "ADDStudent");
        xhttp.open("POST", "/BatallaProject/Batalla/PHP/LoadData.php", true);

        xhttp.addEventListener("load", () => {

            if (xhttp.readyState == 4 && xhttp.status == 200) {
                SavedData = true;
                MsjGopt = true;
                document.querySelector("#List-Periodo").disabled = false;
                ShowMessageAtPointer("Todas las notas han estan guardadas");
            } else {
                ShowMessageAtPointer("ATENCIÓN, ocurrio un problema, no se han podido guardar las notas", "Red", "White");
            }
        })
        xhttp.send(data);

    } else {
        ShowMessageAtPointer("No hay nada nuevo que guardar", "var(--Color-Secundario)", "var(--Color-Principal)", "var(--Color-Principal)", 1000);
    }
}

//llena la tabla de estudiantes
const fillTable = () => {


    Tabla.innerHTML = "";
    for (i = 0; i < listaSeccion.length; i++) {
        Tabla.innerHTML += "<tr id = 'T" + i + "'> <td class = 'td2'> <button class = 'Columna-Cedula2 CL' id='C" + i + "'> " + listaSeccion[i]["Cedula"] + " </button></td><td class = 'td2' > <button class = 'Columna-Nombre2 CL' id='N" + i + "'> " + listaSeccion[i]["Nombre"] + " </button></td><td class = 'td2'> <label class = 'ColLapso'> " + listaSeccion[i][seccion[0].toUpperCase() + "1"] + " </label></td><td class = 'td2'> <label class = 'ColLapso'> " + listaSeccion[i][seccion[0].toUpperCase() + "2"] + " </label></td><td class = 'td2'> <label class = 'ColLapso'> " + listaSeccion[i][seccion[0].toUpperCase() + "3"] + " </label></td></tr>";
    }
    selectedFromTable();

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

//tutorial de ayuda al iniciar el programa
const tuto1 = () => {
    let mensaje = document.querySelector("#tuto1");
    let mensaje2 = document.querySelector("#tuto2");

    setTimeout(() => {
        if (getSelectedOption(document.querySelector("#List-Periodo")).value == "none") {
            mensaje.style.display = "block";
            mensaje2.style.display = "none";

        } else {
            mensaje.style.display = "none";
            setTimeout(() => {

                if (getSelectedOption(document.querySelector("#List-Seccion")).value == "none") {

                    mensaje2.style.display = "block";
                } else {
                    mensaje2.style.display = "none";
                }

            }, 1000);
        }
    }, 3000);

    if (getSelectedOption(document.querySelector("#List-Periodo")).value != "none") {
        mensaje.style.display = "none";
    }
    if (getSelectedOption(document.querySelector("#List-Periodo")).value == "none" &&
        getSelectedOption(document.querySelector("#List-Seccion")).value == "none") {
        mensaje2.style.display = "none";
    }
}

const saveMessageButtons = (e) => {

    if (e.target == btnSiGuardar) {
        sendData();
    }


    MsjGuardar.style.display = "none";
}