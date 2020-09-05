<?php 

function getConnection(){
    $DB_Adress = "localhost";
    $DB_User = "Javier";
    $DB_Password = "pi3coma14";
    $DB_Name = "batallaprealfa_0_1";   
    $Connection = new mysqli($DB_Adress, $DB_User, $DB_Password, $DB_Name);
    if($Connection->connect_error){
        die("Error al acceder a la Base de Datos");
    }
    return $Connection;
}

?>