<?php 
session_start();
require "Connection.php";

// if (isset($_SESSION['SERVIDOR'])) {
//     if (basename($_SERVER['PHP_SELF']) != $_SESSION['SERVIDOR']) {
//         session_destroy();
//     }
// }
if(!isset($_SESSION["User"]) || !isset($_SESSION["Name"]) || !isset($_SESSION["Password"]) || !isset($_POST["Periodo"]))
{
    header("Location: ../index.html");
}else{


    $Periodo = $_POST["Periodo"];
  

    $Connection = getConnection();
    $Connection->set_charset("utf8");

    

    $Query = "SELECT * FROM ".$Periodo." ORDER by Cedula";

        $ResultSet = $Connection->query($Query);
        
        $Respuesta = array();
        $i=0;
        while($Row = $ResultSet->fetch_assoc()){
            $Respuesta[$i] = $Row;
            $i++;
        }
        
        
        echo (json_encode($Respuesta));
    
        $Connection -> close();

    }
?>