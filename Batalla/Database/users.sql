-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 26-08-2020 a las 20:41:32
-- Versión del servidor: 5.7.26
-- Versión de PHP: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `batallaprealfa_0_1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(60) NOT NULL,
  `Cedula` int(15) NOT NULL,
  `usuario` varchar(15) NOT NULL,
  `pass` varchar(15) NOT NULL,
  `level` int(11) NOT NULL,
  `Mat1` varchar(5) NOT NULL,
  `Mat2` varchar(5) NOT NULL,
  `Mat3` varchar(5) NOT NULL,
  `Mat4` varchar(5) NOT NULL,
  `Mat5` varchar(5) NOT NULL,
  `Mat6` varchar(5) NOT NULL,
  `Mat7` varchar(5) NOT NULL,
  `Mat8` varchar(5) NOT NULL,
  `Mat9` varchar(5) NOT NULL,
  `Mat10` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `Nombre`, `Cedula`, `usuario`, `pass`, `level`, `Mat1`, `Mat2`, `Mat3`, `Mat4`, `Mat5`, `Mat6`, `Mat7`, `Mat8`, `Mat9`, `Mat10`) VALUES
(1, 'Francisco Javier Rodriguez Hernandez', 16193765, 'admin', 'admin', 0, 'f1a', 'f1b', '', '', '', '', '', '', '', ''),
(2, 'Milagros Coromoto Hernandez Chiliberti', 4713068, 'Milagros', 'Tomate77', 1, 'c1b', '', '', '', '', '', '', '', '', ''),
(3, 'Daniel Vicente Rodriguez Hernandez', 17583656, 'Daniel', 'FateGO', 1, 'c1a', 'i1b', 'i1a', '', '', '', '', '', '', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
