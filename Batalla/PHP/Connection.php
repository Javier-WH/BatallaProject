<?php 
    function getConnection(){
        try {
            $DBHost = "localhost";
            $DBUser = "Javier";
            $DBPassword = "pi3coma14";
            $DBName = "batallaprealfa_0_1";
            $Connection = new PDO("mysql:host=$DBHost;dbname=$DBName", $DBUser, $DBPassword);
            $Connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $Connection->exec("SET CHARACTER SET utf8");
            return $Connection;
        } catch (Exception $error) {
            die("Error al intentar conectar con el servidor");   
        }
    }

    function getUser($User, $Pass){
        $User = htmlentities(addslashes($User));
        $Pass = htmlentities(addslashes($Pass));
        $Connection = getConnection();
        $SQL= "SELECT * FROM users WHERE usuario= :Usuario AND pass= :Pass";
        try {
            $ResultSet = $Connection->prepare($SQL);
            $ResultSet->bindValue(":Usuario", $User);
            $ResultSet->bindValue(":Pass", $Pass);
            $ResultSet->execute();
            if($ResultSet->rowCount() != 0){
                return json_encode($ResultSet->fetch(PDO::FETCH_ASSOC));
            }
            else{
                return "No-Econtrado";
            }
        } catch (Exception $error) {
            die("Error al realizar la consulta");
        }
    }

    function getPeriodos(){
        $Connection = getConnection();
        $SQL = "SELECT TABLE_NAME AS Periodos FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE '_p_2%'";
        try {
            $ResultSet = $Connection->prepare($SQL);
            $ResultSet->execute();
            $i=0;
            while($Row = $ResultSet->fetch(PDO::FETCH_ASSOC)){
                $Respuesta[$i] = $Row;
                $i++;
            }
            return json_encode($Respuesta);
        } catch (Exception $error) {
            die("Error al realizar la consulta");
        }
    }

    function getSeccions(){

        $User = htmlentities(addslashes($_SESSION["User"]));
        $Pass = htmlentities(addslashes($_SESSION["Password"]));
        $Connection = getConnection();
        $SQL= "SELECT Mat1, Mat2, Mat3, Mat4, Mat5, Mat6, Mat7, Mat8, Mat9, Mat10 FROM users WHERE usuario= :Usuario AND pass= :Pass";
        try {
            $ResultSet = $Connection->prepare($SQL);
            $ResultSet->bindValue(":Usuario", $User);
            $ResultSet->bindValue(":Pass", $Pass);
            $ResultSet->execute();
            if($ResultSet->rowCount() != 0){
                return json_encode($ResultSet->fetch(PDO::FETCH_ASSOC));
            }
            else{
                return "No-Econtrado";
            }
        } catch (Exception $error) {
            die("Error al realizar la consulta");
        }


    }

    function getAllStuden($Periodo){
        $SQL = "SELECT * FROM $Periodo ORDER by Cedula";
        $Connection = getConnection();

        try {
            $ResultSet = $Connection->prepare($SQL);
            $ResultSet->execute();
            $i=0;
            while($Row = $ResultSet->fetch(PDO::FETCH_ASSOC)){
                $Respuesta[$i] = $Row;
                $i++;
            }
            return json_encode($Respuesta);
        } catch (Exception $error) {
            return "Error al realizar la consulta";
        }
    }

    function saveAllMateria($Lista, $Mat, $Periodo){
        $Connection = getConnection();
        
        try {
            $Connection->beginTransaction();
        
            for($i = 0 ; $i < count($Lista) ; $i++){
                $SQL = "UPDATE $Periodo SET ".$Mat."1='".$Lista[$i][$Mat."1"]."', ".$Mat."2 = '".$Lista[$i][$Mat."2"]."', ".$Mat."3 = '".$Lista[$i][$Mat."3"]."' WHERE ID = '".$Lista[$i]["ID"]."'";
                $Connection->exec($SQL);
            }
            $Connection->commit();
            echo "OK";
        } catch (PDOException $error) {
            $Connection->rollback();
            echo "Error message: " . $error->getMessage();
        }
    }
?>

