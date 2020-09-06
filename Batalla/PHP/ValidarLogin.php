<?php 
session_start();
require "Connection.php";

$User = $_POST["User"];
$Pass = $_POST["Password"];
$Expresion = array(
    "Usuario" => "/^[a-zA-Z0-9\_\-]{4,16}$/",
    "Password" => "/^.{4,12}$/"
);

if(!isset($_POST["User"]) || !isset($_POST["Password"])){

    header("Location: ../Index.html");
}
else if(!preg_match($Expresion["Usuario"], $User) || !preg_match($Expresion["Password"], $Pass)){ 

    header("Location: ../Index.html");
}
else{ 

    $Respuesta = getUser($User, $Pass);

    if(!strcmp($Respuesta, "No-Econtrado" )){
        echo "Usuario o Contraseña inconectos";
    }else{
        $_SESSION["SERVIDOR"] = basename($_SERVER['PHP_SELF']);
        $Respuesta = json_decode($Respuesta, true);
        $_SESSION["Name"] = $Respuesta["Nombre"];
        $_SESSION["User"] = $Respuesta["usuario"];
        $_SESSION["Password"] = $Respuesta["pass"];
        $_SESSION["Secciones"] = array();
        for ($i = 1 ; $i <=10 ; $i++){
            if($Respuesta["Mat$i"] != ""){
            $_SESSION["Secciones"] = $Respuesta["Mat$i"];
            }
        }
        echo "ProfesorEcontrado";
    }
}
?>