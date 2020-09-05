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

    $Usuario = $_SESSION["User"];
    $Password = $_SESSION["Password"];
    $Type = $_POST["Type"];
    $Connection = getConnection();

    if(!strcmp($Type,"user")){
        $Query= "SELECT * FROM users WHERE usuario = '$Usuario' AND pass = '$Password'";
        $ResultSet = $Connection->query($Query);

        $Respuesta = array();

        if($Row = $ResultSet->fetch_assoc()){
          
            echo ($Respuesta = json_encode($Row));
        }

    }else if(!strcmp($Type,"periodo")){
        $Query = "SELECT TABLE_NAME AS Periodos FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE '_p_2%'";

        $ResultSet = $Connection->query($Query);

        $Respuesta = array();
        $i=0;
        while($Row = $ResultSet->fetch_assoc()){
            $Respuesta[$i] = $Row;
            $i++;
        }
     
        echo (json_encode($Respuesta));
    }
    $Connection -> close();
}
    


?>