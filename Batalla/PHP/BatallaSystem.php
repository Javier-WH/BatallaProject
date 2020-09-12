<?php 
session_start();
require "Connection.php";

switch ($_GET["TYPE"]) {
    case 'seccion':
        echo (getSeccions());
        break;
    case 'periodo':
        echo (getPeriodos());
        break;
    case 'ListaAlumnosCompleta':
        echo (getAllStuden($_GET["PERIODO"]));
        break;
    case 'MateriaCode':
        echo (getMateriaCode());
        break;
    case 'Update':
        $Lista = (json_decode($_POST["Datos"], true));
        echo (saveAllMateria($Lista, $_GET["Materia"], $_GET["Periodo"]));    
        break;
    break;
    default:
        echo "No se encuentra una respuesta apropiada para esa peticion";
        break;
}

