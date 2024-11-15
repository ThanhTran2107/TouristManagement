-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tourist_management
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (3,' So beautiful honey','thanhcnttmcpe@gmail.com','Thanh Tran',5,65),(4,'I gonna get back again','thanhcnttmcpe@gmail.com','Thanh Tran',5,65),(8,'good','thanhuser@gmail.com','Thanh',5,63),(9,'Wow so fantastic','thanhuser@gmail.com','Thanh',5,63),(10,'this is the first time I use it hah, it makes me feel gud','thanhuser@gmail.com','Thanh',5,63);
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
INSERT INTO `tour_details` VALUES (1,'Snow Rafting, treking etc',30000,'Kashmir',17,'Mumbai','You can visit beautiful Kashmir','2023-04-05','Explore Kashmir','2023-03-30','DOMESTIC','TRAIN'),(2,'Treking',40000,'Pune',46,'Pune','We see Forts in Pune region','2023-03-31','Historical Pune','2023-03-30','HOLIDAY','BUS'),(3,'Skuba Diving, F1 Racing, Golf',100000,'Dubai',16,'Pune','You can visit Luxurious Dubai','2023-05-26','Palm Jumeirah Dubai','2023-04-26','INTERNATIONAL','FLIGHT');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourist`
--

LOCK TABLES `tourist` WRITE;
/*!40000 ALTER TABLE `tourist` DISABLE KEYS */;
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
  `phone_no` varchar(20) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (63,'286, Thống Nhất','2003-02-01','thanhuser@gmail.com','Thanh','Tran','thanhuser@123','98777499394','USER',NULL),(64,'286, Thống Nhất','2003-12-31','sgutravel@gmail.com','SGU','Travel','sgutravel@123','917339863','ADMIN',NULL),(65,'286, Thống Nhất','2003-07-21','thanhcnttmcpe@gmail.com','Thanh','Tran','thanh@12345','917339863','USER',NULL),(66,'319/1 Nguyễn Công Trứ, Quận 1','2003-07-07','lekhanhtram@gmail.com','Tram','Le','lekhanhtram@123','797967886','USER',NULL),(67,'123 Main St, Springfield, USA','1990-01-15','johndoe@gmail.com','John','Doe','johndoe@123','912345678','USER',NULL),(68,'456 Elm St, Springfield, USA','1992-02-20','janesmith@gmail.com','Jane','Smith','janesmith@123','912345679','USER',NULL),(69,'789 Oak St, Springfield, USA','1988-03-25','michaeljohnson@gmail.com','Michael','Johnson','michaeljohnson@123','912345680','USER',NULL),(70,'321 Pine St, Springfield, USA','1995-04-30','emilybrown@gmail.com','Emily','Brown','emilybrown@123','912345681','USER',NULL),(71,'654 Maple St, Springfield, USA','1985-05-05','davidwilson@gmail.com','David','Wilson','davidwilson@123','912345682','USER',NULL),(72,'987 Cedar St, Springfield, USA','1993-06-10','sarahjones@gmail.com','Sarah','Jones','sarahjones@123','912345683','USER',NULL),(73,'159 Birch St, Springfield, USA','1991-07-15','chrismiller@gmail.com','Chris','Miller','chrismiller@123','912345684','USER',NULL),(74,'753 Spruce St, Springfield, USA','1989-08-20','jessicadavis@gmail.com','Jessica','Davis','jessicadavis@123','912345685','USER',NULL),(75,'852 Fir St, Springfield, USA','1994-09-25','danielgarcia@gmail.com','Daniel','Garcia','danielgarcia@123','912345686','USER',NULL),(76,'369 Willow St, Springfield, USA','1990-10-30','lauramartinez@gmail.com','Laura','Martinez','lauramartinez@123','912345687','USER',NULL);
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

-- Dump completed on 2024-11-16  1:53:56
