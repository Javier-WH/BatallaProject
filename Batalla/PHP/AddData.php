<?php 
session_start();
require "Connection.php";

// if (isset($_SESSION['SERVIDOR'])) {
//     if (basename($_SERVER['PHP_SELF']) != $_SESSION['SERVIDOR']) {
//         session_destroy();
//     }
// }
// if(!isset($_SESSION["User"]) || !isset($_SESSION["Name"]) || !isset($_SESSION["Password"]))
// {
//     header("Location: ../index.html");
// }else{


    
    $Connection = getConnection();
    $Connection->set_charset("utf8");
    $Periodo = $_POST["Periodo"];
    $Mat = $_POST["Materia"];
    $Lista = (json_decode($_POST["Datos"], true)); //lista del cliente
    


    for($i = 0 ; i < count($Lista) ; $i++){
        $Query = "UPDATE ".$Periodo." SET ".$Mat."1='".$Lista[$i][$Mat."1"]."', ".$Mat."2 = '".$Lista[$i][$Mat."2"]."', ".$Mat."3 = '".$Lista[$i][$Mat."3"]."' WHERE ID = '".$Lista[$i]["ID"]."'";
        $Connection->query($Query);
       
    }


    // $Query =  "INSERT INTO ".$Periodo." (ID,".$Mat."1, ".$Mat."2, ".$Mat."3) VALUES";

    // for($i = 0 ; i < count($Lista) ; $i++){

    //     if($i<count($Lista)-1){
    //         $Query .=  "(".$Lista[$i]["ID"].",".$Lista[$i][$Mat."1"].",".$Lista[$i][$Mat."2"].", ".$Lista[$i][$Mat."3"]." ),";
    //     }
    //     else{
    //         $Query .=  "(".$Lista[$i]["ID"].",".$Lista[$i][$Mat."1"].",".$Lista[$i][$Mat."2"].", ".$Lista[$i][$Mat."3"]." ) ";
    //     }
    // }

    // $Query .=  "ON DUPLICATE KEY UPDATE ID=VALUES(ID),".$Mat."1=VALUES(".$Mat."1), ".$Mat."2=VALUES(".$Mat."2), ".$Mat."3=VALUES(".$Mat."3)";


    // if($Connection->query($Query) === true){ 
    //     echo "OK";
    // }
    // else{
    //     echo "error";
    // }

    $Connection -> close();


    // INSERT INTO _p_2020 (id,M1) VALUES (1,10),(2,10) ON DUPLICATE KEY UPDATE id=VALUES(id),M1=VALUES(M1);


    
  

 
        
    
    
   


// }
?>