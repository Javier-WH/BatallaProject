<?php
session_start();
// if (isset($_SESSION['SERVIDOR'])) {
//     if (basename($_SERVER['PHP_SELF']) != $_SESSION['SERVIDOR']) {
//         session_destroy();
//     }
// }

if (!isset($_SESSION["User"]) || !isset($_SESSION["Name"]) || !isset($_SESSION["Password"])) {
    header("Location: ../index.html");
} else {
    require "Connection.php";
    $Type = $_POST["Type"];


    switch ($_POST["Type"]) {
        case 'seccion':
            echo (getSeccions());
            break;
        case 'periodo':
            echo (getPeriodos());
            break;
        case 'ListaAlumnosCompleta':
            echo (getAllStuden($_POST["Periodo"]));
            break;
        case 'ADDStudent':
            $Periodo = $_POST["Periodo"];
            $Mat = $_POST["Materia"];
            $Lista = (json_decode($_POST["Datos"], true));
            $Respuesta = saveAllMateria($Lista, $Mat, $Periodo);
            echo $Respuesta;
            break;
        case 'MateriaCode':
            echo (getMateriaCode($_POST["Materia"]));
            break;
        default:
            echo "Error desconocido";
            break;
    }
}
