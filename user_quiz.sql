-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: user
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_question` longtext NOT NULL,
  `quiz_answer` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (1,'Inheritance allows a class to use methods and properties of another class.',1),(2,'In Python, a class that is derived from another class is called a parent class.',0),(3,'The derived class in Python is also known as a subclass.',1),(4,'A single class can inherit from multiple classes in Python.',1),(5,'The keyword used to inherit a class in Python is \"inherits\".',0),(6,'The \"__init__\" method is a constructor in Python that initializes an object.',1),(7,'In Python, private members of a parent class are accessible in the child class.',0),(8,'A child class can override methods from the parent class in Python.',1),(9,'The \"super()\" function is used to call a method from the parent class.',1),(10,'Inheritance in Python allows for code reuse.',1),(11,'You can create an instance of an abstract class in Python.',0),(12,'The \"issubclass()\" function checks if a class is a subclass of another class.',1),(13,'The \"isinstance()\" function checks if an object is an instance of a class.',1),(14,'Multiple inheritance can lead to the diamond problem in Python.',1),(15,'Python uses the C3 linearization algorithm to resolve the method resolution order.',1),(16,'The \"pass\" statement is used to create empty classes in Python.',1),(17,'A child class cannot add new methods of its own in Python.',0),(18,'Encapsulation is not related to inheritance in Python.',0),(19,'Polymorphism allows methods to be used interchangeably in classes with inheritance.',1),(20,'In Python, a base class can be inherited by multiple subclasses.',1);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-11 13:59:12
