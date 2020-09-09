window.addEventListener("load", () => {

    let test = new Conection("ListaAlumnosCompleta", "_p_2020");
    // console.log(test.getConn);
    console.log(test.getResponse);



})


class Conection {
    constructor(ConnType, Periodo = null) {

        this.URL = `/BatallaProject/Batalla/PHP/BatallaSystem.php?TYPE=${ConnType}`;
        if (Periodo != null) {
            this.URL += `&PERIODO=${Periodo}`
        }

        this.xhttp = new XMLHttpRequest()
        this.xhttp.open("POST", this.URL, false);
        this.xhttp.addEventListener("load", () => {
            if (this.xhttp.readyState == 4 & this.xhttp.status == 200) {
                this.response = this.xhttp.responseText;
            } else {
                this.response = "Error al realizar la consulta";
            }
        })
        this.xhttp.send();
    }

    get getResponse() {
        return JSON.parse(this.response);
    }



    get getConn() {
        return this.URL;
    }
}