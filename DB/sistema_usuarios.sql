CREATE DATABASE  IF NOT EXISTS `sistema_usuarios` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sistema_usuarios`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: sistema_usuarios
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adopciones`
--

DROP TABLE IF EXISTS `adopciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adopciones` (
  `id_adopcion` int NOT NULL AUTO_INCREMENT,
  `id_mascota` int NOT NULL,
  `id_usuario` int NOT NULL,
  `fecha_adopcion` date NOT NULL,
  `notas` text,
  PRIMARY KEY (`id_adopcion`),
  UNIQUE KEY `id_mascota` (`id_mascota`),
  KEY `fk_adopcion_usuario` (`id_usuario`),
  CONSTRAINT `fk_adopcion_mascota` FOREIGN KEY (`id_mascota`) REFERENCES `registro_mascotas` (`id_mascota`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_adopcion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adopciones`
--

LOCK TABLES `adopciones` WRITE;
/*!40000 ALTER TABLE `adopciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `adopciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias_productos`
--

DROP TABLE IF EXISTS `categorias_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias_productos` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `nombre_categoria` (`nombre_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_productos`
--

LOCK TABLES `categorias_productos` WRITE;
/*!40000 ALTER TABLE `categorias_productos` DISABLE KEYS */;
INSERT INTO `categorias_productos` VALUES (1,'Alimentos','Comida seca y húmeda para mascotas.'),(2,'Medicinas','Antibióticos, vitaminas y tratamientos.'),(3,'Higiene','Shampoos, cepillos y productos de limpieza.');
/*!40000 ALTER TABLE `categorias_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas_medicas`
--

DROP TABLE IF EXISTS `citas_medicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas_medicas` (
  `id_cita` int NOT NULL AUTO_INCREMENT,
  `id_expediente` int NOT NULL,
  `fecha_cita` datetime NOT NULL,
  `motivo_cita` varchar(255) DEFAULT NULL,
  `diagnostico` text,
  PRIMARY KEY (`id_cita`),
  KEY `id_expediente` (`id_expediente`),
  CONSTRAINT `citas_medicas_ibfk_1` FOREIGN KEY (`id_expediente`) REFERENCES `expedientes_medicos` (`id_expediente`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas_medicas`
--

LOCK TABLES `citas_medicas` WRITE;
/*!40000 ALTER TABLE `citas_medicas` DISABLE KEYS */;
INSERT INTO `citas_medicas` VALUES (1,1,'2025-09-15 10:00:00','Cojera en pata trasera','Leve esguince. Se recomienda reposo.');
/*!40000 ALTER TABLE `citas_medicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donaciones`
--

DROP TABLE IF EXISTS `donaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donaciones` (
  `id_donacion` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha_donacion` datetime NOT NULL,
  `mensaje` text,
  PRIMARY KEY (`id_donacion`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `donaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donaciones`
--

LOCK TABLES `donaciones` WRITE;
/*!40000 ALTER TABLE `donaciones` DISABLE KEYS */;
INSERT INTO `donaciones` VALUES (1,NULL,25.00,'2025-09-11 15:56:24','Para ayudar a los que más lo necesitan.');
/*!40000 ALTER TABLE `donaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expedientes_medicos`
--

DROP TABLE IF EXISTS `expedientes_medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expedientes_medicos` (
  `id_expediente` int NOT NULL AUTO_INCREMENT,
  `id_mascota` int NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id_expediente`),
  UNIQUE KEY `id_mascota` (`id_mascota`),
  CONSTRAINT `expedientes_medicos_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `registro_mascotas` (`id_mascota`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expedientes_medicos`
--

LOCK TABLES `expedientes_medicos` WRITE;
/*!40000 ALTER TABLE `expedientes_medicos` DISABLE KEYS */;
INSERT INTO `expedientes_medicos` VALUES (1,1,'2025-09-11 15:56:24');
/*!40000 ALTER TABLE `expedientes_medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `imagen_url` varchar(255) DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias_productos` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Analgésico Canino','Analgésico para aliviar el dolor en perros.',12.50,100,NULL,2);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta_detalle`
--

DROP TABLE IF EXISTS `receta_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receta_detalle` (
  `id_receta_detalle` int NOT NULL AUTO_INCREMENT,
  `id_receta` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `dosis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_receta_detalle`),
  KEY `id_receta` (`id_receta`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `receta_detalle_ibfk_1` FOREIGN KEY (`id_receta`) REFERENCES `recetas_medicas` (`id_receta`),
  CONSTRAINT `receta_detalle_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta_detalle`
--

LOCK TABLES `receta_detalle` WRITE;
/*!40000 ALTER TABLE `receta_detalle` DISABLE KEYS */;
INSERT INTO `receta_detalle` VALUES (1,1,1,1,'1 pastilla cada 12 horas por 3 días.');
/*!40000 ALTER TABLE `receta_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recetas_medicas`
--

DROP TABLE IF EXISTS `recetas_medicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recetas_medicas` (
  `id_receta` int NOT NULL AUTO_INCREMENT,
  `id_cita` int NOT NULL,
  `fecha_emision` datetime NOT NULL,
  `instrucciones_generales` text,
  PRIMARY KEY (`id_receta`),
  UNIQUE KEY `id_cita` (`id_cita`),
  CONSTRAINT `recetas_medicas_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `citas_medicas` (`id_cita`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recetas_medicas`
--

LOCK TABLES `recetas_medicas` WRITE;
/*!40000 ALTER TABLE `recetas_medicas` DISABLE KEYS */;
INSERT INTO `recetas_medicas` VALUES (1,1,'2025-09-11 15:56:24','Administrar medicamento con comida.');
/*!40000 ALTER TABLE `recetas_medicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_mascotas`
--

DROP TABLE IF EXISTS `registro_mascotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro_mascotas` (
  `id_mascota` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `nombre_mascota` varchar(100) NOT NULL,
  `especie` varchar(50) DEFAULT NULL,
  `raza` varchar(50) DEFAULT NULL,
  `edad` int DEFAULT NULL,
  PRIMARY KEY (`id_mascota`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `registro_mascotas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_mascotas`
--

LOCK TABLES `registro_mascotas` WRITE;
/*!40000 ALTER TABLE `registro_mascotas` DISABLE KEYS */;
INSERT INTO `registro_mascotas` VALUES (1,1,'Firulais','Perro','Mestizo',20220510),(2,1,'terry','perro',NULL,5),(3,1,'terry','perro',NULL,5),(4,1,'terry','perro',NULL,5),(5,1,'terry','perro',NULL,5),(6,1,'terry','perro',NULL,5),(7,1,'taquito','gato',NULL,3),(8,1,'juguete','perro',NULL,2);
/*!40000 ALTER TABLE `registro_mascotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(100) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Token` varchar(255) DEFAULT NULL,
  `Rol` enum('Encargado de Farmacia','Médico Veterinario','Administrador') NOT NULL,
  `Privilegiado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan Pérez','farmacia123','tok_farmacia','Encargado de Farmacia',0),(2,'María Gómez','vet456','tok_vet','Médico Veterinario',0),(3,'Carlos Ruiz','admin789','tok_admin','Administrador',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-12 17:27:10
