CREATE DATABASE  IF NOT EXISTS `travel_and_tourism_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `travel_and_tourism_management`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: travel_and_tourism_management
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` bigint NOT NULL AUTO_INCREMENT,
  `booking_date` date NOT NULL,
  `payment_status` enum('PAYMENT_FAILED','PAYMENT_IN_PROGRESS','PAYMENT_NOT_DONE','PAYMENT_SUCCESSFUL') NOT NULL,
  `seat_count` int NOT NULL,
  `total_amount` bigint NOT NULL,
  `tour_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `FKhavlcxrs7dfxpgrr2w3jfgsg3` (`tour_id`),
  KEY `FK7udbel7q86k041591kj6lfmvw` (`user_id`),
  CONSTRAINT `FK7udbel7q86k041591kj6lfmvw` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKhavlcxrs7dfxpgrr2w3jfgsg3` FOREIGN KEY (`tour_id`) REFERENCES `tour_details` (`tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (3,'2023-03-10','PAYMENT_SUCCESSFUL',1,25000,1,1),(4,'2023-03-12','PAYMENT_SUCCESSFUL',1,25000,1,1),(6,'2023-03-12','PAYMENT_SUCCESSFUL',1,12000,2,1),(9,'2023-03-12','PAYMENT_SUCCESSFUL',2,60002,1,17),(10,'2024-11-09','PAYMENT_SUCCESSFUL',1,100000,3,20);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `rating` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `FKpwwmhguqianghvi1wohmtsm8l` (`user_id`),
  CONSTRAINT `FKpwwmhguqianghvi1wohmtsm8l` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,'Good','ajay@gmail.com','ajay',5,1),(2,' very good','Mohsin@gmail.com','mohsin',5,1);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_details`
--

DROP TABLE IF EXISTS `tour_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_details` (
  `tour_id` bigint NOT NULL AUTO_INCREMENT,
  `activities` varchar(255) DEFAULT NULL,
  `booking_amount` double NOT NULL,
  `destination` varchar(255) NOT NULL,
  `max_seats` int DEFAULT NULL,
  `source` varchar(255) NOT NULL,
  `tour_detail_info` varchar(255) DEFAULT NULL,
  `tour_end_date` date NOT NULL,
  `tour_name` varchar(255) NOT NULL,
  `tour_start_date` date NOT NULL,
  `tour_type` enum('ACTIVITIES','DOMESTIC','HOLIDAY','INTERNATIONAL') DEFAULT NULL,
  `transportation_mode` enum('BUS','FLIGHT','TRAIN') DEFAULT NULL,
  PRIMARY KEY (`tour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_details`
--

LOCK TABLES `tour_details` WRITE;
/*!40000 ALTER TABLE `tour_details` DISABLE KEYS */;
INSERT INTO `tour_details` VALUES (1,'Snow Rafting, treking etc',30001,'Kashmir',18,'Mumbai','You can visit beautiful Kashmir','2023-04-05','Explore Kashmir','2023-03-30','DOMESTIC','TRAIN'),(2,'Treking',4000,'Pune',46,'Pune','We see Forts in Pune region','2023-03-31','Historical Pune','2023-03-30','HOLIDAY','BUS'),(3,'Skuba Diving, F1 Racing, Golf',100000,'Dubai',18,'Pune','You can visit Luxurious Dubai','2023-05-26','Palm Jumeirah Dubai','2023-04-26','INTERNATIONAL','FLIGHT');
/*!40000 ALTER TABLE `tour_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourist`
--

DROP TABLE IF EXISTS `tourist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tourist` (
  `tourist_id` bigint NOT NULL AUTO_INCREMENT,
  `age` int NOT NULL,
  `id_proof` enum('AADHAR_CARD','DRIVING_LICENSE','PAN_CARD') NOT NULL,
  `id_proof_no` varchar(255) NOT NULL,
  `tourist_name` varchar(255) NOT NULL,
  `booking_id` bigint DEFAULT NULL,
  PRIMARY KEY (`tourist_id`),
  KEY `FKegiqgndkbel8rlanb6mk661i9` (`booking_id`),
  CONSTRAINT `FKegiqgndkbel8rlanb6mk661i9` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourist`
--

LOCK TABLES `tourist` WRITE;
/*!40000 ALTER TABLE `tourist` DISABLE KEYS */;
INSERT INTO `tourist` VALUES (2,26,'AADHAR_CARD','12341324134','Harshit ',3),(3,23,'AADHAR_CARD','2311222','Sunny sharma',4),(5,25,'AADHAR_CARD','12341324134','Ajay Khade',6),(9,24,'PAN_CARD','1341234141234','Pranav Dhanawade',9),(10,22,'DRIVING_LICENSE','060203000811','Thanh',10);
/*!40000 ALTER TABLE `tourist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_no` bigint NOT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Kolhapur','1994-10-01','ajay@gmail.com','Ajay','Khade','Ajay@123',7744965911,'USER'),(3,'Gaya','1997-04-16','Mohsin@gmail.com','Mohsin','Khan','Mohsin@123',8158931704,'USER'),(7,'Gorambe','2022-12-13','Digvijay@gmail.com','Digvijay','Savant','Digvijay@1',7744965911,'ADMIN'),(11,'Sangrul','1994-10-01','ajay12@gmail.com','Ajay','Khade','Ajay@123',7744965911,'ADMIN'),(13,'old pune','2023-03-01','ganesh@gmail.com','ganesh','mane','ganesh@123',9874563209,'USER'),(14,'sangrul','2023-03-09','mahesh@gmail.com','mahesh','kamble','Mahesh@123',7896541229,'ADMIN'),(15,'kolhapur','2023-03-01','ajaykhade11@gmail.com','ajay','khade','Ajay@123',9876543210,'ADMIN'),(16,'junnar','1997-10-13','gaurang@gmail.com','gaurang','thorve','Gaurang@1',9876543210,'USER'),(17,'Dubai','1998-11-26','pranav@gmail.com','Pranav','Dhanawade','Pranav@123',7744965911,'USER'),(18,'Dubai','1998-11-26','pranav12@gmail.com','Pranav','Dhanawade','Pranav@123',7744965911,'ADMIN'),(19,'286, Thống Nhất','2003-07-21','thanhcnttmcpe@gmail.com','Trần','Thanh','thanh@123',917339863,'ADMIN'),(20,'198/13C, Tôn Đản, P8, Q4','2003-07-21','b4r@gmail.com','Thanh','Tran','b4r@123',11111111111,'USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-11  8:42:42
