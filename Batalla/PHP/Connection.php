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
?>