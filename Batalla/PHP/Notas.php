<?php 
session_start();
///// revisa que la pagina sea cargada desde el servidor y no desde otra parte
// if (isset($_SESSION['SERVIDOR'])) {
//     if (basename($_SERVER['PHP_SELF']) != $_SESSION['SERVIDOR']) {
//         session_destroy();
//     }
// }
///////// revisa que no se pueda acceder a la pagina si no se tiene una session iniciada
if(!isset($_SESSION["User"]) || !isset($_SESSION["Name"]) || !isset($_SESSION["Password"]))
{
    header("Location: ../index.html");
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unidad Educativa Batalla de la Victoria</title>
    <link rel="icon" type="" href="../ICON/LogoSmall.png">
    <link rel="stylesheet" href="../CSS/Notas.css">
    <link rel="stylesheet" href="../CSS/FJCSS.css">
    <script src="../JS/Icons.js"></script>
    <script src="../JS/Notas.js"></script>
    <script src="../JS/FJJS.js"></script>
    
</head>
<body>
    <header>
        <div id="contenedor-logo"> <object data="../SVG/BatallaLogo.svg" id="logo"></object> </div>
        <div id="titulo">Unidad Educativa Batalla de la Victoria</div>
       
    </header>
    <div id="NombreUsuario"> Prof. <?php echo $_SESSION["Name"] ?></div>
    <div id="windowContainer">
        <div id="MainContainer1">

            <div id="Contenedor-Seccion" class="contenedor">
                <div>
                    <label for="List-Periodo" class = "lblinputData">Periodo</label>
                    <select name="List-Periodo" id="List-Periodo" class="input-data">
                        <option value="none" >-</option>
                    </select> 
                </div>


                <div>
                    <label for="List-Seccion" class = "lblinputData">Sección</label>
                    <select name="List-Seccion" id="List-Seccion" class="input-data">
                    <option value="none">-</option>
                     </select>   
                </div>  
            </div>


            <div id="Contenedor-Buscar-Alumno"  class="contenedor">

                <div>
                    <label for="txtBuscarAlumno" class = "lblinputData">Buscar Alumno</label>
                    <input type="text" class ="input-data" id="txtBuscarAlumno" name="txtBuscarAlumno" autocomplete="off">
                </div>
                <div>
                    <button id="btn-Limpiar" class=""> <svg class="iconoBoton2" viewBox="0 0 20 20" id="btn-Limpiar2"> <script> document.write(icono_flechaIzquierda)</script> </svg>
                   </button>
                </div>

            </div>

            <div id="Contenedor-Datos-Alumno" class="contenedor">
                <table id="table1">
                    <tr>
                        <th colspan ="3"> <label >Datos del Alumno</label> </th>
                    </tr>
                    <tr>

                        <td class="Columna-Cedula" class="td1">
                            <label>Cedula</label>

                        </td>
                        <td class="Columna-Nombre" class="td1">
                            <label >Nombre</label>

                        </td>
                        <td class="Columna-Botones" class="td1">
                        <button id="btn-Guardar"><svg class="iconoBoton" viewBox="0 0 20 20"> <script> document.write(icono_guardar)</script> </svg></button>
                        </td>
                    </tr>

                    <tr>

                        <td class="td1">
                            <span class="nombreAlumno" id="CedulaAlumno"></span>
                        </td>
                        <td class="td1">
                            <span class="nombreAlumno" id="NombreAlumno"></span> 
                        </td>
                        <td id="contenedorBotones" class="td1">
                            <button id="btn-Anterior"><svg class="iconoBoton" viewBox="0 0 20 20" id="BA"> <script> document.write(icono_anterior)</script> </svg></button>
                            <button id = "btn-Siguiente"><svg class="iconoBoton" viewBox="0 0 20 20" id="BS"> <script> document.write(icono_siguiente)</script> </svg></button>
                        </td>
                    </tr>


                    <tr>
                        <td colspan = "2" class="td1">
                            <Label id="lblNota1" class="lblNota"> Nota del Primer Lapso</Label>
                        </td>
                        <td class="td1">
                            <input type="number" class = "input-nota" id="Nota1" >
                        </td>
                    </tr>

                    <tr>
                        <td colspan = "2" class="td1">
                            <Label id="lblNota2" class="lblNota"> Nota del Segundo Lapso</Label>
                        </td>
                        <td class="td1">
                            <input type="number" class = "input-nota" id="Nota2">
                        </td>
                    </tr>

                    <tr>
                        <td colspan = "2" class="td1">
                            <Label id="lblNota3" class="lblNota"> Nota del Tercer Lapso</Label>
                        </td>
                        <td class="td1">
                            <input type="number" class = "input-nota" id="Nota3">
                        </td>
                    </tr>

                    <tr>
                        <td colspan = "2" class="td1">
                            <Label id="Total" class="lblNota"> Total Acumulado</Label>
                        </td>
                        <td class="td1">
                            <input type="number" class = "input-nota" id="Nota-Acumulada" readonly>
                        </td>
                    </tr>




                </table>
            </div>
            <!--  -->
        </div>

        <div id="MainContainer2" >
            <div id="encabezadoNomina">
                Lista de Estudiantes.
            </div>
            <table class="nomina1">
                <tr id="nominaTitulos">
                    <td><label class="Columna-Cedula2">Cedula</label></td>
                    <td><label class="Columna-Nombre2"> Nombres y Apellidos</label></td>
                    <td><label class="ColLapso">1er</label></td>
                    <td ><label class="ColLapso">2do</label></td>
                    <td><label class="ColLapso">3er</label></td>
                </tr>
            </table>
            <table class="nomina2" id="nomina2"> </table>
        </div>
    </div>

        <div id="Hints"></div>
        <!--  -->
        <div class="FJ_errorPointer"></div>
        <!--  -->
        <div id="tuto1">Seleccione un Periodo Escolar
            <div class = "relative">
                <svg class="iconoFlechaArriba" viewBox="0 0 20 20">
                    <script>
                    document.write(icono_arriba);
                </script>
                </svg>
            </div>
        </div>
        <!--  -->

        <div id="tuto2">Seleccione una seccion
            <div class = "relative">
                <svg class="iconoFlechaAbajo" viewBox="0 0 20 20">
                    <script>
                    document.write(icono_abajo);
                </script>
                </svg>
            </div>
        </div>
        <div id="MensajeGuardar">
            <div id="MensajeGuardar-Interno" class="relative">
                <div id="MensajeGuardar-Texto">
                    Advertencia, si cambia de periodo perderán todos los datos NO guardados <br><br>
                    ¿Desea Guardar los Cambios?
                </div>
                <div id="contenedorBotonesMensajeGuardar">
                    <button id="btnSiGuardar">Si</button>
                    <button id="btnNoGuardar">No</button>
                </div>
            </div>
        </div>

</body>
</html>