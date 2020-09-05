<?php 
session_start();
require "Connection.php";

$User = $_POST["User"];
$Pass = $_POST["Password"];

$Expresion = array(
    "Usuario" => "/^[a-zA-Z0-9\_\-]{4,16}$/",
    "Password" => "/^.{4,12}$/"
);

//Si no tiene usuario y password se redirecciona al login
if(!isset($_POST["User"]) || !isset($_POST["Password"])){

    header("Location: ../Index.html");
}
else if(!preg_match($Expresion["Usuario"], $User) || !preg_match($Expresion["Password"], $Pass)){ //Si los datos no cumplen los requerimientos se redirecciona al login

    header("Location: ../Index.html");
}
else{ //si todo lo demas es falso, hace la consulta en la base de datos

 
    $BD_Query = "SELECT * FROM users WHERE usuario = '$User' AND pass = '$Pass'";
    
    $Connection = getConnection();

    $ResultSet = $Connection->query($BD_Query);

    if(!$Row = $ResultSet->fetch_assoc()){
        echo "Usuario o Contraseña invalidos";
    }
    else{
        //Variables de session
        $_SESSION["Name"] = $Row["Nombre"];
        $_SESSION["User"] = $Row["usuario"];
        $_SESSION["Password"] = $Row["pass"];

        $_SESSION["SERVIDOR"] = basename($_SERVER['PHP_SELF']); //y crea una variable que contiene la direccion del server
        
        $_SESSION["Secciones"] = array();

        for ($i = 1 ; $i <=10 ; $i++){
            if($Row["Mat" . $i] != ""){
                $_SESSION["Secciones"] = $Row["Mat" . $i];
            }
        }
     
        echo "ProfesorEcontrado";
       
    }

}




?>