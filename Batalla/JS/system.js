const ConnectionTime = 1500;
let test;
let count = 0;

class Conection {
    constructor(ConnType, Periodo = null) {
        this.response = null;
        this.URL = `/BatallaProject/Batalla/PHP/BatallaSystem.php?TYPE=${ConnType}`;
        if (Periodo != null) {
            this.URL += `&PERIODO=${Periodo}`
        }
        this.xhttp = new XMLHttpRequest()
        this.xhttp.open("POST", this.URL, true);
        this.xhttp.onreadystatechange = () => {
            if (this.xhttp.readyState == 4 & this.xhttp.status == 200) {
                this.response = JSON.parse(this.xhttp.responseText);
            } else {
                this.response = "Error al realizar la consulta";
            }
        }
        this.xhttp.send();
    }
    get getResponse() {
        if (this.response != null) {
            return this.response;
        } else {
            return "Error";
        }
    }
}