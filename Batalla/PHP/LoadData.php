<?php 
session_start();
// if (isset($_SESSION['SERVIDOR'])) {
//     if (basename($_SERVER['PHP_SELF']) != $_SESSION['SERVIDOR']) {
//         session_destroy();
//     }
// }

if(!isset($_SESSION["User"]) || !isset($_SESSION["Name"]) || !isset($_SESSION["Password"]))
{
    header("Location: ../index.html");
}
else{
    require "Connection.php";
    $Type = $_POST["Type"];

    if(!strcmp($Type,"seccion")){
        echo (getSeccions());
    }else if(!strcmp($Type,"periodo")){
        echo (getPeriodos());
    }
    else if(!strcmp($Type,"ListaAlumnosCompleta")){
        echo (getAllStuden($_POST["Periodo"]));
    }
    else if(!strcmp($Type,"ADDStudent")){
        $Periodo = $_POST["Periodo"];
        $Mat = $_POST["Materia"];
        $Lista = (json_decode($_POST["Datos"], true));
        $Respuesta = saveAllMateria($Lista, $Mat, $Periodo);
        if($Respuesta){
            echo "OK";
        }

    }
}
    


?>