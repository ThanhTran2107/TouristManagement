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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_details`
--

LOCK TABLES `tour_details` WRITE;
/*!40000 ALTER TABLE `tour_details` DISABLE KEYS */;
INSERT INTO `tour_details` VALUES (24,'Visit Hoi An Ancient Town, relax at My Khe Beach',2500000,'Hoi An',21,'Da Nang','Explore the beauty of Hoi An and Da Nang.','2024-12-03','Da Nang - Hoi An Tour','2024-12-01','DOMESTIC','BUS'),(25,'Climb Fansipan Moutain, visit Cat Cat Village',3200000,'Sapa',15,'Hanoi','Experience the culture and nature of Sapa','2024-12-08','Hanoi - Sapa Tour','2024-12-05','DOMESTIC','TRAIN'),(26,'Snorkeling, swimming',1200000,'Hon Mun Island',20,'Nha Trang','Discover the beauty of Nha Trang\'s beaches','2024-12-12','Nha Trang - Hon Mun Island Tour','2024-12-10','DOMESTIC','BUS'),(27,'Visit Vinpearl, relax on the beach',4500000,'Phu Quoc Island',25,'Phu Quoc','Relax and have fun in Phu Quoc','2024-12-19','Phu Quoc - Islang Exploration Tour','2024-12-15','DOMESTIC','TRAIN'),(28,'Visit the Imperial City of Hue, Marble Moutains',1800000,'Da Nang',18,'Hue','Explore the cultural heritage of Hue and Da Nang','2024-12-21','Hue - Da Nang Tour','2024-12-20','DOMESTIC','BUS'),(29,'Visit the floating market, enjoy local specialties',800000,'Cai Rang Floating Market ',25,'Can Tho','Experience the unique culture of the floating market','2024-12-30','Can Tho - Floating Market Tour','2024-12-25','DOMESTIC','TRAIN'),(30,'Visit Trang An, Bai Dinh Pagoda',1000000,'Trang An',30,'Ninh Binh','Explore the natural beauty and culture of Ninh Binh\n','2024-12-03','Ninh Binh - Trang An Tour','2024-11-30','DOMESTIC','BUS'),(31,'Visit flower gardens, hike trails',2200000,'Love Valley',20,'Da Lat','Relax and explore the beauty of Da Lat','2025-01-06','Da Lat - Love Valley Tour','2025-01-05','DOMESTIC','BUS'),(33,'Visit caves, kayak',3000000,'Ha Long Bay',20,'Ha Long','Explore the natural wonder of the world','2024-12-12','Ha Long - Ha Long Bay Tour','2024-12-10','DOMESTIC','BUS'),(34,'Swimming, photography',1500000,'Ky Co',25,'Quy Nhon','Relax at the most beautiful beach in Quy Nhon','2024-12-20','Quy Nhon - Ky Co Tour','2024-12-15','DOMESTIC','TRAIN'),(35,'Sand sliding, dune exploration',1000000,'Mui Ne Sand Dunes',20,'Mui Ne','Discover the pristine beauty of Mui Ne','2024-12-25','Mui Ne - Sand Dunes Tour','2024-12-20','DOMESTIC','BUS'),(36,'Visit national park, kayak',3500000,'Cat Ba',20,'Hai Phong','Explore the untouched beauty of Cat Ba','2024-12-27','Cat Ba - Lan Ha Bay Tour','2024-12-25','DOMESTIC','BUS'),(37,'Visit Lung Cu Flagpole, Dong Van Market',4000000,'Ha Giang',20,'Ha Giang','Experience unique culture and nature','2024-12-04','Ha Giang - Stone Plateau Tour','2024-12-01','DOMESTIC','BUS'),(38,'Visit Golden Bridge, flower garden',1200000,'Ba Na Hills',30,'Da Nang','Explore the beauty of Ba Na Hills','2024-12-13','Da Nang - Ba Na Hills Tour','2024-12-10','DOMESTIC','BUS'),(39,'Visit amusement park, swimming',1500000,'Vinpearl Land',30,'Nha Trang','Relax and have fun at Vinpearl Land','2024-12-20','Nha Trang - Vinpearl Land Tour','2024-12-15','DOMESTIC','BUS'),(40,'Visit the reef, swimming',2000000,'Dia Reef',20,'Phu Yen','Explore the natural beauty of Phu Yen','2024-12-21','Phu Yen - Dia Reef Tour','2024-12-20','DOMESTIC','BUS'),(41,'Swimming, enjoy seafoods',2500000,'Binh Ba Island',30,'Cam Ranh','Discover the pristine beauty of Binh Ba Island','2024-12-30','Binh Ba - Binh Ba Island Tour','2024-12-25','DOMESTIC','BUS'),(42,'Visit Hang Duong Cemetery, Dam Trau Beach',3800000,'Con Dao',20,'Ba Ria - Vung Tau','Explore the history and nature of Con Dao','2024-12-03','Con Dao - Explore Con Dao Tour','2024-12-01','DOMESTIC','BUS'),(43,'Climb the moutain, visit Ba Den Pagoda',2500000,'Ba Den Moutain',30,'Tay Ninh','Experience the nature and culture of Tay Ninh','2024-12-10','Tay Ninh - Ba Den Moutain Tour','2024-12-05','DOMESTIC','BUS'),(44,'Snorkeling, visit fishing village',2300000,'Cu Lao Cham',25,'Da Nang','Discover the beauty of Cu Lao Cham','2024-12-14','Da Nang - Cu Lao Cham Tour','2024-12-10','DOMESTIC','TRAIN'),(45,'Visit the Grand Palace, explore local markets, enjoy Thai cuisine',4500000,'Bangkok',30,'Hanoi','A 5-day tour exploring the beauty of Thailand','2024-11-05','Vietnam - Thailand','2024-11-01','INTERNATIONAL','BUS'),(46,'Visit Mount Fuji, explore Shibuya, enjoy sushi',5200000,'Tokyo',25,'Ho Chi Minh City','A 8-day tour in Japan','2024-12-17','Vietnam - Japan','2024-12-10','INTERNATIONAL','TRAIN'),(47,'Visit Gyeongbokgung Palace, shop in Myoengdong, enjoy Korean BBQ',6500000,'Seoul',20,'Da Nang','A 6-day tour in South Korea','2024-12-20','Vietnam - South Korea','2024-12-15','INTERNATIONAL','BUS'),(48,'Visit Marina Bay Sands, explore Gardens by the Bay',3082000,'Singapore',30,'Hanoi','A 11-day tour in Singapore','2024-11-30','Vietnam - Singapore','2024-11-20','INTERNATIONAL','TRAIN'),(49,'Visit the Sydney Opera House, explore the Blue Moutains',10279876,'Sydney',15,'Ho Chi Minh City','An 8-day tour in Australia','2024-11-12','Vietnam - Australia','2024-11-05','INTERNATIONAL','BUS'),(50,'Visit the Eiffel Tower, explore the Louvre',12798960,'Paris',20,'Hanoi','A 11-day tour in France','2024-12-25','Vietnam - France','2024-12-15','INTERNATIONAL','TRAIN'),(51,'Visit Times Square, explore Central Park',19454000,'New York',30,'Ho Chi Minh City','A 13-day tour in the USA','2024-12-12','Vietnam - USA','2024-12-01','INTERNATIONAL','TRAIN'),(52,'Visit the CN Tower, explore Niagara Falls',22064000,'Toronto',30,'Hanoi','A 10-day tour in Canada','2024-12-24','Vietnam - Canada','2024-12-15','INTERNATIONAL','BUS'),(53,'Visit the Colosseum, explore Vatican City',35399000,'Rome',20,'Ho Chi Minh City','A 11-day tour in Italy','2024-12-10','Vietnam - Italy','2024-12-01','INTERNATIONAL','TRAIN'),(54,'Visit Sagrada Familia, enjoy tapas',28242000,'Barcelona',30,'Da Nang','A 10-day tour in Spain','2024-12-24','Vietnam - Spain','2024-12-15','INTERNATIONAL','BUS'),(55,'Visit Petronas Tower, explore Batu Caves',2516500,'Kuala Lumpur',30,'Ho Chi Minh City','A 7-day tour in Malaysia','2024-12-15','Vietnam - Malaysia','2024-12-10','INTERNATIONAL','BUS'),(56,'Relax onnthe beach, visit Ubud',4400000,'Bali',30,'Da Nang','A 8-day tour in Indonesia','2024-12-27','Vietnam - Indonesia','2024-12-20','INTERNATIONAL','TRAIN'),(57,'Visit the Taj Mahal, explore local markets',6769850,'New Delhi',30,'Hanoi','A 9-day tour in India ','2024-12-09','Vietnam - India','2024-12-01','INTERNATIONAL','TRAIN');
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
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (64,'286, Thống Nhất','2003-12-31','sgutravel@gmail.com','SGU','Travel','sgutravel@123','917339863','ADMIN',NULL),(66,'319/1 Nguyễn Công Trứ, Quận 1','2003-07-07','lekhanhtram@gmail.com','Tram','Le','lekhanhtram@123','797967886','USER',NULL),(67,'123 Main St, Springfield, USA','1990-01-15','johndoe@gmail.com','John','Doe','johndoe@123','912345678','USER',NULL),(68,'456 Elm St, Springfield, USA','1992-02-20','janesmith@gmail.com','Jane','Smith','janesmith@123','912345679','USER',NULL),(69,'789 Oak St, Springfield, USA','1988-03-25','michaeljohnson@gmail.com','Michael','Johnson','michaeljohnson@123','912345680','USER',NULL),(70,'321 Pine St, Springfield, USA','1995-04-30','emilybrown@gmail.com','Emily','Brown','emilybrown@123','912345681','USER',NULL),(71,'654 Maple St, Springfield, USA','1985-05-05','davidwilson@gmail.com','David','Wilson','davidwilson@123','912345682','USER',NULL),(72,'987 Cedar St, Springfield, USA','1993-06-10','sarahjones@gmail.com','Sarah','Jones','sarahjones@123','912345683','USER',NULL),(73,'159 Birch St, Springfield, USA','1991-07-15','chrismiller@gmail.com','Chris','Miller','chrismiller@123','912345684','USER',NULL),(74,'753 Spruce St, Springfield, USA','1989-08-20','jessicadavis@gmail.com','Jessica','Davis','jessicadavis@123','912345685','USER',NULL),(75,'852 Fir St, Springfield, USA','1994-09-25','danielgarcia@gmail.com','Daniel','Garcia','danielgarcia@123','912345686','USER',NULL),(76,'369 Willow St, Springfield, USA','1990-10-30','lauramartinez@gmail.com','Laura','Martinez','lauramartinez@123','912345687','USER',NULL),(81,'286, Thống Nhất','2003-02-02','thanhadmin@gmail.com','Thanh','Admin','thanhadmin@123','0988883335','ADMIN',NULL),(83,'286, Thống Nhất','2003-11-01','thanhuser@gmail.com','Thanh','User','thanhuser@123','0988776549','USER',NULL),(84,'286, Thống Nhất','2003-03-03','thanhcnttmcpe@gmail.com','Thanh','Tran','minecraftpe@123','0917339863','USER',NULL);
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

-- Dump completed on 2024-11-18 15:46:10
