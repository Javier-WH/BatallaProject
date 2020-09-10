const ConnectionTime = 1500;
let test;
let count = 0;
window.addEventListener("load", () => {
    
    test = new Conection("ListaAlumnosCompleta", "_p_2020", null);
    let test2 = new Conection("seccion");
    let test3 = new Conection("periodo");
    let test4 = new Conection("MateriaCode");

    // let x = "qwwqe";
    // setTimeout(() => {
    //     x = test.getResponse;
    //     console.log(x);
        // console.log(test.getResponse);
    //     console.log(test2.getResponse);
    //     console.log(test3.getResponse);
    //     console.log(test4.getResponse);
    // }, ConnectionTime);
    setStudensList();
})

function setStudensList(){
    let list = test.getResponse;
    if(list=="Error")
    {
        setTimeout(() => {
            count++;
            console.log(count);
            setStudensList();
        }, 1);
    }
    else{
        console.log(list);
    }   
}


class Conection {
    constructor(ConnType, Periodo = null) {
        this.response = null;
        this.URL = `/BatallaProject/Batalla/PHP/BatallaSystem.php?TYPE=${ConnType}`;
        if (Periodo != null) {
            this.URL += `&PERIODO=${Periodo}`
        }
        this.xhttp = new XMLHttpRequest()
        this.xhttp.open("POST", this.URL, true);
        this.xhttp.onreadystatechange =()=>{
            if (this.xhttp.readyState == 4 & this.xhttp.status == 200) {
                this.response = JSON.parse(this.xhttp.responseText);
            } else {
                this.response = "Error al realizar la consulta";
            }
        }
        this.xhttp.send();
    }
    get getResponse() {
        if(this.response != null){
            return this.response;
        }
        else{
            return "Error";
        }
    }
}