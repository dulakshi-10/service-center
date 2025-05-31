-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 31, 2025 at 07:03 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servicedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `telephone`, `name`, `password`, `isAdmin`) VALUES
(9, 'pasindu@gmail.com', '1234567891', 'Pasindu', '$2b$10$pQLkomPWOLYbGGSKOHe1oun8WwwGAQq48vFSXoJBqPDpfux3xarrC', 0),
(10, 'dulakshitsomarathna@gmail.com', '0770000000', 'Admin', '$2b$10$9UR5.dulShCDM4GErprXeeHHW2cWoIggqyJNWPjsVznj.P2I3EXR6', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vehicle_name` varchar(255) DEFAULT NULL,
  `vehicle_type` varchar(100) DEFAULT NULL,
  `vehicle_brand` varchar(100) DEFAULT NULL,
  `vehicle_model` varchar(100) DEFAULT NULL,
  `vehicle_year` int DEFAULT NULL,
  `transmission` varchar(50) DEFAULT NULL,
  `engine_capacity` varchar(100) DEFAULT NULL,
  `registration_number` varchar(100) DEFAULT NULL,
  `mileage` varchar(100) DEFAULT NULL,
  `chassis_number` varchar(100) DEFAULT NULL,
  `made_country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `user_id`, `vehicle_name`, `vehicle_type`, `vehicle_brand`, `vehicle_model`, `vehicle_year`, `transmission`, `engine_capacity`, `registration_number`, `mileage`, `chassis_number`, `made_country`) VALUES
(11, 9, 'Ford Edge', 'SUV & 4 x 4 Vehicle', 'Honda', 'Edge', 2011, 'Automatic', '1.5', 'CAJ-2766', '21000', 'CA423423', 'Canada');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_service_orders`
--

DROP TABLE IF EXISTS `vehicle_service_orders`;
CREATE TABLE IF NOT EXISTS `vehicle_service_orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `washing_type` varchar(50) DEFAULT NULL,
  `oil_check_type` varchar(50) DEFAULT NULL,
  `additional_services` text,
  `order_date` date NOT NULL,
  `order_time` time NOT NULL,
  `additional_note` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isAdvancePaid` int NOT NULL DEFAULT '0',
  `payment` varchar(100) NOT NULL DEFAULT '500',
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `vehicle_id` (`vehicle_id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vehicle_service_orders`
--

INSERT INTO `vehicle_service_orders` (`order_id`, `user_id`, `vehicle_id`, `washing_type`, `oil_check_type`, `additional_services`, `order_date`, `order_time`, `additional_note`, `created_at`, `isAdvancePaid`, `payment`) VALUES
(20, 9, 11, 'Full Washing', 'Petrol Oil Check', 'Tire Rotation, Transmission Service, Coolant Flush', '2025-05-23', '11:10:00', '', '2025-05-19 17:12:59', 1, '500'),
(21, 9, 11, 'Full Washing', 'Petrol Oil Check', 'Tire Rotation', '2025-05-23', '11:10:00', '', '2025-05-19 17:31:32', 1, '500'),
(22, 9, 11, 'Full Washing', 'Petrol Oil Check', 'Tire Rotation', '2025-05-23', '11:10:00', '', '2025-05-19 17:31:38', 1, '500'),
(23, 9, 11, 'Full Washing', 'Petrol Oil Check', 'Tire Rotation', '2025-05-31', '10:00:00', '', '2025-05-31 17:51:17', 1, '500'),
(24, 9, 11, 'Full Washing', 'Petrol Oil Check', '', '2025-05-31', '10:00:00', '', '2025-05-31 17:51:23', 1, '0'),
(29, 9, 11, 'Full Washing', 'Petrol Oil Check', 'Tire Rotation', '2025-05-31', '10:00:00', '', '2025-05-31 18:00:21', 1, '500'),
(37, 9, 11, 'Full Washing', 'Petrol Oil Check', 'Spark Plug Replacement', '2025-05-31', '10:05:00', '', '2025-05-31 18:15:46', 1, '500'),
(38, 9, 11, 'Full Washing', 'Petrol Oil Check', 'Spark Plug Replacement', '2025-05-31', '10:05:00', '', '2025-05-31 18:15:58', 1, '500'),
(39, 9, 11, 'Full Washing', 'Petrol Oil Check', 'Spark Plug Replacement', '2025-05-31', '10:05:00', '', '2025-05-31 18:16:00', 1, '500'),
(40, 9, 11, 'Full Washing', 'Petrol Oil Check', 'Spark Plug Replacement', '2025-05-31', '10:05:00', '', '2025-05-31 18:16:02', 1, '500'),
(41, 9, 11, 'Full Washing', 'Petrol Oil Check', 'Spark Plug Replacement, Added another new tire', '2025-05-31', '10:05:00', '', '2025-05-31 18:16:04', 1, '1000');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
