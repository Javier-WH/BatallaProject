<?php 
session_start();
require "Connection.php";

if (isset($_SESSION['SERVIDOR'])) {
    if (basename($_SERVER['PHP_SELF']) != $_SESSION['SERVIDOR']) {
        session_destroy();
    }
}
if(!isset($_SESSION["User"]) || !isset($_SESSION["Name"]) || !isset($_SESSION["Password"]))
{
    header("Location: ../index.html");
}else
{


    echo "Probando";
    







}





?>