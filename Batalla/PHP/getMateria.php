<?php 
session_start();
// if (isset($_SESSION['SERVIDOR'])) {
//     if (basename($_SERVER['PHP_SELF']) != $_SESSION['SERVIDOR']) {
//         session_destroy();
//     }
// }
if(!isset($_POST["Materia"])){
    die("Conexion ilegal");
    session_destroy();
}else
{
    $CodigoMateria = $_POST["Materia"];
    try {
        $Connection = new PDO("mysql:host=localhost;dbname=batallaprealfa_0_1", "Javier", "pi3coma14");
        $Connection->exec("SET CHARACTER SET utf8");
        $Connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $ResultSet = $Connection->prepare("SELECT Materia FROM codigosmaterias WHERE Code = :CodigoMateria");
        $ResultSet->execute(array(":CodigoMateria" => $CodigoMateria));
        if($Row = $ResultSet->fetch(PDO::FETCH_ASSOC)){
            echo $Row["Materia"];
        }
        else{
            echo "Materia Desconocida";
        }
    } catch (Exception $error) {
        die("Error");
    }
    finally{
        $Connection = null;
    }
}
?>