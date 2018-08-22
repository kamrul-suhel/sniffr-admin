# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.22)
# Database: sniffer_test
# Generation Time: 2018-08-20 08:10:52 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table asset_story
# ------------------------------------------------------------

DROP TABLE IF EXISTS `asset_story`;

CREATE TABLE `asset_story` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `story_id` int(10) unsigned NOT NULL,
  `asset_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `asset_story_story_id_index` (`story_id`),
  KEY `asset_story_asset_id_index` (`asset_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table assets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assets`;

CREATE TABLE `assets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `alpha_id` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wp_asset_id` int(11) DEFAULT NULL,
  `mime_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` text COLLATE utf8mb4_unicode_ci,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jw_player_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alpha_id` (`alpha_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table cache
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cache`;

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL,
  UNIQUE KEY `cache_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table client_mailer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `client_mailer`;

CREATE TABLE `client_mailer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `alpha_id` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `sent_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alpha_id` (`alpha_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table client_mailer_open
# ------------------------------------------------------------

DROP TABLE IF EXISTS `client_mailer_open`;

CREATE TABLE `client_mailer_open` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_mailer_id` int(10) unsigned DEFAULT '0',
  `user_id` int(10) unsigned DEFAULT '0',
  `user_client_id` int(10) unsigned DEFAULT '0',
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table client_mailer_story
# ------------------------------------------------------------

DROP TABLE IF EXISTS `client_mailer_story`;

CREATE TABLE `client_mailer_story` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_mailer_id` int(10) unsigned NOT NULL,
  `story_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_mailer_story_client_mailer_id_index` (`client_mailer_id`),
  KEY `client_mailer_story_story_id_index` (`story_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table client_mailer_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `client_mailer_user`;

CREATE TABLE `client_mailer_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_mailer_id` int(10) unsigned NOT NULL,
  `user_client_id` int(10) unsigned NOT NULL DEFAULT '0',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `sent_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_mailer_user_client_mailer_id_index` (`client_mailer_id`),
  KEY `client_mailer_user_user_client_id_index` (`user_client_id`),
  KEY `client_mailer_user_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table client_mailer_video
# ------------------------------------------------------------

DROP TABLE IF EXISTS `client_mailer_video`;

CREATE TABLE `client_mailer_video` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_mailer_id` int(10) unsigned NOT NULL,
  `video_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_mailer_video_client_mailer_id_index` (`client_mailer_id`),
  KEY `client_mailer_video_video_id_index` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table clients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_owner_id` int(10) unsigned DEFAULT NULL,
  `address_line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `billing_tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_user_id` int(10) unsigned DEFAULT '0',
  `billing_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vat_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usable_domains` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tier` enum('social-media-agency','online','random','production','publisher','well-known') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` enum('western-europe','north-america','eastern-europe','africa','middle-east-east','asia','south-america','latin-america','south-africa','middle-east-west','oceania','russia','japan','china','singapore') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(4) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;

INSERT INTO `clients` (`id`, `name`, `account_owner_id`, `address_line1`, `address_line2`, `city`, `postcode`, `country`, `region`, `billing_tel`, `billing_email`, `billing_user_id`, `billing_name`, `vat_number`, `usable_domains`, `slug`, `tier`, `location`, `active`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(1,'The DailyMail',NULL,NULL,NULL,NULL,NULL,NULL,'singapore',NULL,NULL,0,NULL,NULL,NULL,'est-ut',NULL,NULL,1,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(2,'The Sun',NULL,NULL,NULL,NULL,NULL,NULL,'china',NULL,NULL,0,NULL,NULL,NULL,'et-est-ut','production',NULL,1,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(3,'Animi ipsa tenetur.',NULL,NULL,NULL,NULL,NULL,NULL,'singapore',NULL,NULL,0,NULL,NULL,NULL,'quo-a-veniam','online',NULL,1,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(4,'Veritatis delectus totam.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'molestiae-odit','well-known',NULL,1,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(5,'Dignissimos iste.',NULL,NULL,NULL,NULL,NULL,NULL,'singapore',NULL,NULL,0,NULL,NULL,NULL,'temporibus-vel','social-media-agency',NULL,1,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53');

/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table collection_quotes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `collection_quotes`;

CREATE TABLE `collection_quotes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT 'must be admin user',
  `collection_video_id` int(10) unsigned DEFAULT NULL,
  `collection_story_id` int(10) unsigned DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `rejection_notes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table collection_stories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `collection_stories`;

CREATE TABLE `collection_stories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `collection_id` int(10) unsigned NOT NULL,
  `story_id` int(10) unsigned NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_tier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'status and type of company',
  `company_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'location of company where they will use the story',
  `class` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'class at the time of request or purchase',
  `length` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `platform` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `final_price` int(11) DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `status` enum('requested','received','offered','accepted','purchased','expired','closed') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `licensed_at` datetime DEFAULT NULL,
  `license_ends_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table collection_videos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `collection_videos`;

CREATE TABLE `collection_videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `collection_id` int(10) unsigned NOT NULL,
  `video_id` int(10) unsigned NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `platform` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `length` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'class at the time of request or purchase',
  `company_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'location of company where they will use the video',
  `company_tier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'status and type of company',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `final_price` int(11) DEFAULT NULL,
  `status` enum('requested','received','offered','accepted','purchased','expired','closed') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `licensed_at` datetime DEFAULT NULL,
  `license_ends_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table collections
# ------------------------------------------------------------

DROP TABLE IF EXISTS `collections`;

CREATE TABLE `collections` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `client_id` int(10) unsigned DEFAULT NULL,
  `discount` double(100,2) DEFAULT NULL,
  `status` enum('open','closed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` int(10) unsigned NOT NULL,
  `story_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `moderated` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table contacts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contacts`;

CREATE TABLE `contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paypal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reddit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imgur` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `other` text COLLATE utf8mb4_unicode_ci,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;

INSERT INTO `contacts` (`id`, `full_name`, `email`, `tel`, `language`, `country_code`, `location`, `paypal`, `facebook`, `youtube`, `instagram`, `twitter`, `reddit`, `imgur`, `other`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(1,'Agnes McClure','donald.murray@bauch.com','587-479-7429','fy','LB','West Leonie','carlee.bashirian@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(2,'Chet Carter','obuckridge@gmail.com','+1-863-395-8640','sk','GY','McDermottfurt','dibbert.kendall@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(3,'Neha Stamm','gaylord.cary@hotmail.com','912.889.0332','lv','RS','New Jude','mathilde.flatley@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(4,'Cesar Corwin','rogahn.lorine@harvey.org','1-337-371-7369 x166','rn','ER','Destanyside','sstrosin@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(5,'Talon Moen Sr.','neha.hudson@grady.com','1-978-290-3088','pl','KG','Pfefferview','bailey07@brakus.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(6,'Chance Krajcik','grady.camren@donnelly.org','(302) 658-1944','ay','TM','East Cordiamouth','bayer.dulce@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(7,'Brendon Schamberger','mayer.jevon@swaniawski.net','+1 (847) 326-9054','my','FO','Everettefort','arielle.aufderhar@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(8,'Ms. April Weber','sibyl.daugherty@yahoo.com','635.237.9785','fr','BO','New Daniella','lrosenbaum@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(9,'Arlene Pagac','lbarrows@hotmail.com','916.998.0096 x090','vi','IL','Port Rosalindhaven','johnpaul.bartoletti@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(10,'Sincere Spencer','flo99@gmail.com','(915) 870-7354','rw','MU','Hahnchester','yadira.klocko@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(11,'Sarah Anderson I','gayle.hodkiewicz@gmail.com','+1-829-836-4785','tl','GE','West Deannaport','grimes.earline@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(12,'Alvera Miller','vernie13@hotmail.com','(323) 342-6905 x2729','si','UA','West Enos','helen67@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(13,'Mya Grant','nienow.whitney@baumbach.com','781-861-2959 x394','in','FO','Aminastad','caterina.rau@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(14,'Keagan Volkman MD','teagan33@nienow.info','774.726.8855','fr','KN','New Julio','georgette46@huel.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(15,'Kraig Mohr II','abbott.emil@hotmail.com','(886) 954-9593','hi','BW','Lake Arnulfo','dulce56@stroman.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(16,'Rocky Kris','wade.kub@gmail.com','(497) 656-5011','it','AX','West Tamaraburgh','baumbach.magdalena@jast.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(17,'Sam Gerhold','rlowe@jones.com','(897) 775-1833','cs','TG','North Roosevelt','al.von@smitham.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(18,'Dean Schowalter','dhoeger@hotmail.com','(783) 660-7282','is','TZ','East Meda','felicia47@daugherty.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(19,'Amber Wolf','macejkovic.melyna@lebsack.com','704.686.6578 x35698','wo','SI','Lake Melyna','delmer.bogisich@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(20,'Jeffry Pollich','dejon98@anderson.biz','1-292-596-5163 x8848','ba','LU','New Melany','lulu.reilly@bogan.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(21,'Prof. Joanie Jacobson','hadley17@gmail.com','254-932-0419 x47073','si','JO','Tyrelfort','bosco.darren@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(22,'Demond Kuvalis','lulu.eichmann@yahoo.com','319-376-2639 x60613','ca','NT','West Maribelburgh','bode.kelly@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(23,'Kylee Balistreri','landen07@torphy.com','434-602-3096','mn','SV','Devinmouth','fgibson@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(24,'Mrs. Vicky O\'Reilly','avery30@white.com','1-307-407-5986','bh','JP','Port Bud','imelda43@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(25,'Mr. Vidal Satterfield','elisabeth.greenholt@yahoo.com','(549) 852-8577','vi','PM','Toyside','johara@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(26,'Yvonne Hettinger','aoconner@gmail.com','(867) 362-8914 x9644','sa','JP','New Trinityview','emmett.upton@powlowski.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(27,'Dr. Effie Ratke','xzavier.feest@haley.com','(641) 880-4518 x11159','bh','PT','Jefferyhaven','rae.wiza@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(28,'Greyson Harvey II','obauch@yahoo.com','1-692-947-7216','ks','RS','Lebsackhaven','ariane.marks@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(29,'Terrill Fritsch','ufritsch@sawayn.com','894-957-7218 x0401','ja','MT','Eribertoview','shanny58@zulauf.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(30,'Dr. Ethelyn O\'Conner II','prosacco.jaleel@abshire.info','1-468-358-2974','si','CV','Nathanaelton','gmertz@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(31,'Dr. Leonardo Prohaska III','amparo.green@gmail.com','(406) 404-6231 x353','gu','SM','Devonfort','dillan60@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(32,'Kim Schneider MD','sterling22@leffler.org','+1 (442) 762-9294','to','MM','Annabellland','jarred.robel@bayer.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(33,'Merl Hodkiewicz Sr.','rosemary.kuhic@hotmail.com','397.806.0041','my','CT','Kirlinmouth','estell16@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(34,'Stacey Farrell','rau.marta@berge.com','584.952.6982','lo','GM','Balistreritown','weber.nichole@reilly.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(35,'Dr. Thaddeus Rohan','wkertzmann@yahoo.com','(734) 466-6281','no','NT','Feestborough','ejohnston@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(36,'Wilhelmine Hauck','nick95@hotmail.com','+19803369512','am','VC','New Mertieland','nellie.bernhard@moore.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(37,'Mr. Mack Bartell V','phammes@yahoo.com','469.365.4143 x76445','si','MY','Ferryland','alexzander58@hermann.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(38,'Ms. Talia Luettgen','econroy@kiehn.com','(310) 523-4332 x53136','ay','FX','Auerfurt','kellen.haley@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(39,'Hollis Walker','gleason.lavon@smith.info','(370) 647-3071 x261','be','SE','North Rafael','christiansen.mikel@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(40,'Dr. Sterling Fay MD','kuvalis.katarina@gmail.com','901-905-9810','sv','BO','West Charlotte','legros.thurman@doyle.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(41,'Prof. Lexus Block IV','hullrich@yahoo.com','860.925.6648 x97662','ta','SU','South Evansshire','ydaniel@yundt.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(42,'Ms. Alva Schmitt III','emedhurst@feeney.biz','+1-698-348-1861','ta','FR','Sauerville','griffin.ledner@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(43,'Morton Hettinger','zachariah.johnson@yahoo.com','(439) 780-2296 x0813','de','IS','Ferryfort','jcarter@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(44,'Jarret Bogan','olson.milford@hotmail.com','(772) 570-9131 x9048','en','US','Lulashire','brendon49@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(45,'Ms. Esther Bechtelar IV','hills.lazaro@hotmail.com','(403) 378-0809 x75929','ro','BM','East Ernaburgh','tamia97@stehr.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(46,'Ms. Eulah Sipes Jr.','nicola.vonrueden@crona.biz','(478) 284-8361 x59024','mi','MI','Cleomouth','tanya.lemke@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(47,'Jordyn Grant','ebeier@feil.net','1-883-375-2342','bi','HR','Haileyview','friesen.lue@bogan.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(48,'Dr. Wilhelmine Rau','cpfeffer@turner.com','1-451-464-3443 x351','ar','ML','New Aidan','vtrantow@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(49,'Elise Hane','catalina.bogisich@yahoo.com','1-295-722-9280 x2364','ga','RU','New Hunterview','joreilly@kub.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(50,'Bobbie Gibson','ronaldo00@haley.com','+1-598-660-0464','fa','VA','Handstad','waylon.bins@mcdermott.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(51,'Lafayette Schinner Jr.','otha74@gmail.com','309-695-5222 x282','ky','FM','East Duane','heaven.quitzon@weimann.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(52,'Helga Paucek V','bolson@hotmail.com','747.969.3490 x5708','br','PH','Hahnburgh','uheller@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(53,'Waylon Green','xmoen@yahoo.com','325-463-4151 x1323','sv','FX','Muellerton','armstrong.irwin@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(54,'Marcelina Howell','ugaylord@schuppe.org','+1-528-605-2872','br','EH','Turcottestad','nschimmel@skiles.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(55,'Baby Cronin PhD','freddy34@gmail.com','(665) 337-9622 x7798','be','CA','Jacklynland','sraynor@baumbach.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(56,'Mrs. Caroline Buckridge MD','wilhelm74@raynor.org','1-263-438-0662 x3587','ay','CC','Ankundingstad','bryon.block@yundt.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(57,'Brenna Schumm','jazmin.price@lang.net','+1-741-758-0650','ko','BZ','Louisaton','chandler45@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(58,'Dr. Kristy O\'Connell III','trent.bosco@yahoo.com','1-613-369-6459','ay','DE','Port Dominique','walker.ismael@bechtelar.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(59,'Miss Alessia Stoltenberg II','becker.kattie@gmail.com','+1-425-829-7529','en','CA','Kemmerchester','weber.jonathan@nader.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(60,'Dr. Scottie Streich DDS','dstokes@lindgren.com','1-221-688-1259 x486','ar','SK','Gleasonmouth','whills@sawayn.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(61,'Kavon Homenick','may72@gmail.com','1-460-477-2408','ka','IN','Malcolmview','samara.west@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(62,'Dr. Margarett McGlynn','osimonis@bashirian.info','429-315-2866','kn','KY','Reganshire','walker.colten@tremblay.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(63,'Prof. Maegan Sipes','satterfield.claire@gmail.com','1-742-763-1916 x03671','ka','GY','North Bartholomebury','hillard36@watsica.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(64,'Mose Brown','wilmer30@denesik.org','+12155813919','iw','MF','Peytonbury','rhomenick@waelchi.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(65,'Macy Stark','imohr@bailey.com','(731) 744-9317 x4530','ca','DD','Flatleyhaven','goodwin.evert@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(66,'Ryder Haag MD','schiller.holden@hotmail.com','430-858-2872 x0821','gl','SA','North Chayastad','hamill.eloy@hodkiewicz.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(67,'Johnpaul Prosacco DVM','lily40@yahoo.com','+17234797363','ha','BD','Feesttown','mylene.kozey@mertz.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(68,'Miss Libby Farrell Jr.','kellie.gusikowski@gmail.com','558-516-4985','rw','AN','Mosciskiport','sauer.danielle@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(69,'Devin Sawayn','lilyan46@mcdermott.info','862.665.8241 x79216','en','MR','New Lori','jaime.brekke@schimmel.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(70,'Richmond Weimann','danyka.wolff@mosciski.com','+1-645-347-6120','th','NG','Tillmanberg','june.dickens@brekke.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(71,'Callie Aufderhar','cloyd.hackett@yahoo.com','(725) 568-3922','fj','VA','Lake Bartholomeborough','senger.roy@gorczany.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(72,'Jayme Macejkovic','okonopelski@howell.com','+1-365-448-4316','ia','MW','Shermanberg','pborer@ledner.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(73,'Reva Shanahan II','oschaden@gmail.com','956.718.5196 x120','tt','PA','North Donaldtown','gia.fritsch@bosco.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(74,'Dr. Milton Kuhn I','poberbrunner@waelchi.org','+15259385114','ja','BM','South Haliebury','vklein@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(75,'Dr. Ramon Collins I','blick.soledad@yahoo.com','991-769-2214','zu','SB','Estelfort','skye17@effertz.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(76,'Betsy McLaughlin','hayden50@gmail.com','(481) 536-1823 x175','tl','CN','Koelpinhaven','garnet90@braun.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(77,'Dr. Enid Ebert IV','jordi34@gmail.com','398.661.7757 x0571','sk','ER','East Erwin','mohammad29@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(78,'Izaiah Metz','paucek.jennings@hotmail.com','+1.909.219.3814','kn','GI','Zulaufville','qstark@hartmann.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(79,'Hulda Kling','heber81@kuphal.info','296-243-3648 x0928','st','MQ','Akeemchester','lorna03@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(80,'Gregory Doyle','ohara.gaetano@gmail.com','1-212-621-7739 x19165','st','DO','Port Patberg','isobel58@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(81,'Suzanne Gibson','schiller.keira@gmail.com','+1-829-527-1204','gu','GW','Lake Alberthafort','dina.schowalter@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(82,'Miss Dawn O\'Connell V','devan72@bahringer.biz','897.930.5674 x39294','no','TH','Lake Meghan','anderson.matteo@shanahan.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(83,'Gretchen Fadel','chad.schuppe@hansen.biz','924-968-7102 x77407','km','TT','Chaddland','carter.kristofer@leannon.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(84,'Prof. Vladimir Gaylord MD','hhansen@emmerich.com','(418) 989-3042 x91669','sm','MK','Jeffrymouth','lurline.ryan@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(85,'Justyn McDermott','okerluke@heidenreich.net','554-334-4277 x03920','tr','CR','Aliside','reinhold.feeney@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(86,'Clemmie Stanton','virginia.larkin@ohara.com','1-785-510-1381 x1849','in','JP','Mrazland','jany29@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(87,'Dr. Priscilla Beahan PhD','kay.murazik@yahoo.com','669.414.8051','sd','SK','Carrollhaven','leda.johnston@senger.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(88,'Vincent Brekke','tbogan@gmail.com','298-804-2801','si','MW','O\'Reillychester','zgorczany@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(89,'Prof. Chelsea Dietrich','ymoen@glover.info','+1.656.598.1682','to','TL','West Tyrelberg','wiza.carlos@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(90,'Ms. Ernestina Gleichner','mraz.isaias@huel.info','758-477-8712','rn','CD','Osinskiberg','jon87@lindgren.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(91,'Reyna Schulist','llindgren@yahoo.com','(670) 961-1679 x565','tn','DZ','Herzogberg','kristoffer53@conroy.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(92,'Laurel Gaylord','remington.stark@little.org','834-910-0199 x8469','sw','KR','East Mariela','stokes.pauline@schmitt.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(93,'Juanita Koch V','mandy.deckow@legros.com','645-923-2895 x689','fy','RU','East Earl','laurie.veum@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(94,'Prof. Kole Ankunding','damian.wunsch@moen.com','(409) 351-2997 x603','sl','BB','Lake Shannastad','amitchell@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(95,'Geraldine Paucek DDS','otorp@donnelly.com','+1-273-390-5678','as','PS','Sauerside','marks.garnett@haag.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(96,'Angelina Goodwin','bartoletti.keaton@mccullough.net','452-862-6268 x5390','it','FI','South Marlon','htromp@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(97,'Gunner Kessler','augustus.smith@hotmail.com','1-650-718-7429 x454','ta','PU','Nienowberg','jed.cole@lindgren.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(98,'Pete Gottlieb','tsmith@yahoo.com','1-756-870-0662 x816','rw','BE','Daxton','rebeka.schaden@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(99,'Clarabelle Ebert','meghan.jaskolski@gmail.com','273.625.8239 x25339','tg','SG','South Virginieland','hbrekke@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(100,'Sedrick Jacobs','anya64@hotmail.com','+1-864-912-3065','la','TR','Port Nikita','ndach@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(101,'Viva Harris','misty.crooks@yahoo.com','(243) 618-0871 x579','ku','NF','Moniqueshire','koelpin.cristopher@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(102,'Dr. Casimir Hahn MD','stacey90@hotmail.com','471.556.5419 x775','cs','UZ','East Kailynbury','tbecker@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(103,'Princess Kutch','braeden11@hoeger.info','454.915.9201 x1395','sr','GS','Port Gillianton','cayla.feil@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(104,'Macey Adams','jeffry.dare@hotmail.com','(420) 666-3783','yo','GS','West Marilyne','rcorwin@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(105,'Jaclyn O\'Reilly','uwest@lesch.org','1-281-659-9708 x73078','te','BF','Port Emmaborough','alexandrea75@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(106,'Prof. Casimir Hoeger Sr.','little.grace@yahoo.com','498.498.1264 x004','tg','CR','Mireyahaven','candido.sawayn@kunde.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(107,'Dominique Bosco IV','hintz.giles@smith.biz','(625) 892-4803 x22651','ha','BY','Lake Carlifurt','nitzsche.ewell@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(108,'Prof. Lexie Hagenes IV','pvolkman@yahoo.com','+1-254-772-4971','ga','NG','West Marquise','kali.cremin@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(109,'Carolyn Beatty','kkuhn@hotmail.com','1-447-797-2577 x27955','om','LB','West Pedroshire','walter.orlando@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(110,'Adrain Feil II','stevie.gorczany@hotmail.com','427.784.0725','bg','JM','Jonesside','lacy.heidenreich@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(111,'Shanon Raynor','amani77@hotmail.com','(973) 546-7631 x12113','ms','SL','Beerfort','selena97@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(112,'Miss Joanie Gorczany PhD','lwyman@grimes.net','980-379-1572','ja','PH','Harveyside','jakubowski.leila@price.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(113,'Alexandria Wisoky','vmurazik@emard.net','+1 (547) 709-1535','te','YE','North Zellaberg','dawn79@bahringer.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(114,'Taya Sanford MD','willms.judy@reichert.com','874-656-5771 x900','pa','AZ','South Presleyport','collins.bartholome@hermann.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(115,'Prof. Harmon Connelly V','tschumm@yahoo.com','(704) 453-9663 x2615','sq','GI','Madieshire','rosalinda06@kiehn.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(116,'Mr. Jonathan Rogahn Jr.','audreanne34@funk.com','762-246-7521 x793','hu','RW','West Jarrell','blockman@luettgen.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(117,'Dr. David Sporer','dpfeffer@yahoo.com','363-999-8668 x650','fa','LT','Carafort','fabbott@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(118,'Estel Stroman','jeramy15@fahey.com','695-493-6632 x22685','bi','PZ','South Mitchellhaven','batz.willa@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(119,'Maynard Morissette','lhomenick@hotmail.com','+1-774-228-3535','ss','BV','West Everardoville','alyce28@kassulke.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(120,'Clark Bechtelar','pouros.tommie@schmeler.com','241.535.5705 x4468','dz','LK','Port Axel','mcclure.dora@connelly.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(121,'Carter Spencer','ldietrich@bergnaum.org','(206) 863-3526','to','BW','Leilanimouth','virginia.dooley@berge.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(122,'Prof. Damien Bahringer Sr.','marianne62@gmail.com','+1-785-252-5391','fy','CL','Brigittefurt','bins.tabitha@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(123,'Ms. Isobel Gleason','huel.pinkie@gmail.com','1-816-274-7884 x04751','pa','KN','Morarfort','vkulas@willms.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(124,'Mr. Jayde Botsford I','rosenbaum.linnea@gmail.com','562-714-2707 x074','kk','BI','Darianabury','osborne.damore@bailey.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(125,'Vallie Jakubowski II','lbecker@yahoo.com','+1-494-680-5930','ti','IL','South Katarina','gbecker@gusikowski.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(126,'Prof. Clementina Kuhlman V','pinkie.marvin@gibson.com','1-529-844-2682 x4393','ks','FJ','Jermeyville','rpowlowski@roberts.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(127,'Harmon Grady','pdenesik@yahoo.com','1-348-952-1540 x61960','lv','NG','North Evemouth','pollich.nina@stanton.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(128,'Jermain Lesch','bechtelar.roy@hotmail.com','375-572-9499','rn','PT','South Christy','gerald.ernser@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(129,'Dr. Nettie Keeling','cathrine.graham@hotmail.com','1-249-738-0149','vi','MR','Melliestad','uhand@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(130,'Kendall Padberg DVM','joshua.connelly@yahoo.com','268.649.8180','ko','DM','Lake Isadorechester','cdurgan@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(131,'Delaney Powlowski V','amir.littel@yahoo.com','+1-251-399-9287','tw','BR','Sisterview','deja.rohan@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(132,'Leland Ullrich III','kautzer.harley@crooks.com','531-806-0743 x7270','ba','GG','Flatleyview','minnie.quitzon@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(133,'Rossie DuBuque','lucy69@bauch.org','980-364-5008 x0721','gu','BO','New Orinview','ctreutel@kohler.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(134,'Bernard Kozey','myrtie69@herman.net','1-408-214-8081 x479','pl','BB','Stanmouth','hackett.chanel@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(135,'Kelley Marks','lindsey38@hotmail.com','+1.310.425.8430','in','PY','Harbermouth','alvah53@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(136,'Dr. Flavie Lebsack','igibson@gmail.com','1-952-832-0837','na','VU','Rennerchester','ckutch@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(137,'Dr. Danial Deckow','reed55@gmail.com','+1-591-279-6260','ar','EC','New Francesco','aiden72@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(138,'Delta Boyle','stanley28@gorczany.com','351-859-1308 x10940','qu','MF','Garettmouth','streich.leon@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(139,'Bridie Welch','aric15@koss.com','+1 (739) 647-7054','ro','IE','Beckerbury','west.sylvia@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(140,'Caroline Mohr','donnie04@hotmail.com','410.370.0722','gn','NQ','Schowalterchester','keeley.becker@fisher.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(141,'Bridget Bernier','stamm.kellen@yahoo.com','1-880-507-6941 x2482','zu','SK','Zoramouth','aleen54@johns.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(142,'Coleman Emmerich','douglas.grady@yahoo.com','(951) 789-5482','es','MS','Stantonhaven','ottis48@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(143,'Carmella Spinka','ruecker.magnolia@okon.biz','236.972.8395 x460','vo','UA','East Britneyburgh','ywiegand@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(144,'Miss Gabriella Dietrich','terrance.gutmann@hyatt.com','1-728-531-0575','ab','KY','Nellechester','larissa95@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(145,'Chance Heaney','tbruen@yahoo.com','528.930.7830 x133','zh','AG','North Marisolstad','bbins@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(146,'Norbert Boyer','albertha.kutch@hotmail.com','1-396-638-7287 x7907','ba','KH','Lake Bayleemouth','ahowell@brakus.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(147,'Mac Considine II','griffin.shanahan@yahoo.com','597.284.0654 x4555','my','HM','North Yolanda','mayert.frederick@langosh.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(148,'Kade Kunze III','alicia.kutch@gmail.com','504-789-2431','ca','SY','Enochview','homenick.alysha@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(149,'Dr. Savion Paucek MD','allene61@gmail.com','562.719.1588 x85639','sw','IS','West Ashlynn','cathy.swaniawski@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(150,'Benedict Heller IV','tillman.kenna@daniel.com','490-316-3899 x48745','aa','BM','West Burnice','zakary95@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(151,'Orland Rosenbaum I','felicia95@baumbach.com','+1-736-674-3224','ml','TV','West Valentina','leffler.corbin@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(152,'Rodrigo Armstrong','jtoy@yahoo.com','1-963-713-3010','th','PW','West Rethahaven','chloe49@dickens.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(153,'Dr. Hal Carroll III','zwitting@gmail.com','+1-314-280-9359','ro','IM','Port Mollyland','alek.walter@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(154,'Mia Armstrong','lexi32@gmail.com','+1.626.226.1750','mr','VC','East Sidneyside','qpredovic@zemlak.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(155,'Mr. Tyree Cummings Jr.','gia.jacobs@yahoo.com','604-747-4122 x124','ga','MQ','North Mustafaport','okonopelski@haag.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(156,'Mr. Bradford Hegmann MD','lelia.schmitt@yahoo.com','982-573-6991 x410','xh','MX','Murphyside','kiara02@ledner.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(157,'Greyson Turcotte','ryan63@trantow.com','(740) 519-8948','cy','LA','New Jarrodmouth','maia56@zieme.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(158,'Krystal Hickle','isaiah.denesik@hotmail.com','818-316-2027 x348','hi','LU','New Lyricburgh','waylon.muller@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(159,'Albert Kling PhD','vdavis@bernhard.com','1-523-496-6527 x6262','af','NP','Ondrickamouth','ktowne@fritsch.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(160,'Dora Nikolaus','lorena02@yahoo.com','(553) 842-2829','br','KZ','Luciotown','slang@lebsack.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:53','2018-08-20 09:02:53'),
	(161,'Keagan Feil','marques.kuhlman@gmail.com','658-932-2770 x549','st','GT','Port Darrylchester','aurelia48@batz.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(162,'Kelsi Wehner Sr.','furman.kreiger@hirthe.com','657.774.0866','ay','DZ','New Ozellaland','howard84@gorczany.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(163,'Ms. Chasity Berge','bartoletti.gene@bashirian.com','(354) 991-5899 x6781','sn','LC','North Arnoldo','florida.tremblay@hahn.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(164,'Flavio Leffler DVM','hailee48@baumbach.org','+1.421.378.3568','tr','BV','Madisonport','zander.kohler@hackett.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(165,'Fanny Nader','nmertz@hansen.com','324-391-7084 x97763','hr','VN','East Orlofurt','jammie53@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(166,'Miss Judy Brakus DDS','jordy52@hotmail.com','628-353-3113','to','GU','Annabellhaven','houston40@konopelski.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(167,'Mckenzie Lynch','kuvalis.hester@thiel.org','1-805-597-1624','ga','YE','Kingmouth','edubuque@moen.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(168,'Dr. Bennie Glover','dgusikowski@bergnaum.com','+1-521-643-0873','am','EE','Lake Cletus','tyson.denesik@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(169,'Al Welch V','bettie.nikolaus@hotmail.com','715-638-9736 x018','gn','AR','Haleyshire','adalberto23@connelly.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(170,'Amani Hand','elockman@hane.info','752.578.2348 x54405','kk','BF','Lake Dortha','magdalena73@cummerata.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(171,'Lisandro Schimmel','alejandrin.wolf@yahoo.com','1-743-644-4580','hy','FM','New Sincerechester','blanda.marcelina@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(172,'Linda Shanahan','ljohnson@nienow.org','+1 (941) 558-7732','fy','ID','Naderfort','norbert.gutmann@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(173,'Roslyn Labadie','arely81@pacocha.com','219.441.5756','zu','LI','East Violettemouth','ariane44@boyer.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(174,'Rebeca Skiles PhD','keira60@gmail.com','(373) 478-9023 x21700','st','GG','Sallyview','evans.beier@goyette.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(175,'Prof. Maiya Stokes PhD','anthony.zboncak@funk.com','941.312.3376','na','RU','Lake Patsy','hauck.pinkie@hodkiewicz.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(176,'Ms. Penelope D\'Amore','annalise.brekke@hotmail.com','546-543-7953','vi','UY','North Sarai','destin.hirthe@rice.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(177,'Marcelina Gleichner','albert67@rau.com','532-753-1947','ne','WS','New Kara','baumbach.laila@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(178,'Kylee Pollich','norwood89@gmail.com','+1 (395) 708-6992','tl','TK','Lizaberg','nboyle@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(179,'Laurianne Frami','kuhic.albertha@yahoo.com','407-919-0491','sk','CI','East Royce','quitzon.velva@paucek.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(180,'Mr. Dewayne Fisher IV','febert@price.com','(898) 293-2651 x894','ti','GY','West Elysechester','ugoldner@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(181,'Rubye Pouros','tromp.korbin@casper.biz','552-396-0733','mg','MM','Dickinsonville','egutmann@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(182,'Prof. Keith Stracke Sr.','price.camilla@gmail.com','1-331-670-6930 x92619','ku','VC','South Odafort','kuphal.marielle@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(183,'Dr. Troy Emmerich V','charlie06@hotmail.com','264-441-8896 x4783','om','NI','Lake Trudie','santina.dubuque@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(184,'Dr. Juanita Schuppe I','wgerlach@yahoo.com','383.388.8713 x26001','tk','DM','Lake Pasqualehaven','jamir.mraz@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(185,'Crystal Lynch','bjohns@hotmail.com','1-334-259-5618 x53280','hy','KP','East Jaylon','sincere27@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(186,'Dr. Asa Cremin','fbreitenberg@gmail.com','(947) 950-4567 x0878','ky','MK','North Aylinberg','jason.abernathy@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(187,'Freddie Vandervort Sr.','hhand@kirlin.com','+1-585-457-8742','th','NE','Lake Hosea','nichole.aufderhar@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(188,'Sidney Vandervort','prudence41@hoppe.biz','1-498-695-4907 x293','gl','DD','East Noemie','flynch@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(189,'Judge Gibson MD','morissette.alfonso@pagac.info','+1-396-586-9586','sg','HR','Bauchton','dtillman@adams.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(190,'Prof. Oda Gusikowski','bhansen@walter.com','286-834-5538 x972','ln','TV','Shainaland','marquardt.letha@dubuque.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(191,'Harvey Heller','marquardt.adriana@hotmail.com','1-707-297-0534 x89165','oc','CH','West Shanabury','rosemary77@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(192,'Kaci Conroy','emerald.cormier@hotmail.com','290.730.4960 x523','vi','PL','West Guidoburgh','dach.angeline@mertz.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(193,'Natasha Kunze','alf.hodkiewicz@gmail.com','+1.996.409.8000','dz','UA','Ressieville','shaniya.white@huel.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(194,'Nathanial Weissnat','ldurgan@oreilly.org','+1 (528) 240-1649','af','GL','Jeanieland','timmothy25@reynolds.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(195,'Caesar Becker','linda53@hotmail.com','893-223-6355 x0661','ti','GW','Abelardomouth','graham.corwin@gibson.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(196,'Lenore Littel','queen16@marquardt.info','718-714-7843 x7049','oc','CZ','Port Lane','isabelle.williamson@abernathy.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(197,'Fatima Fay','luisa59@hotmail.com','(504) 252-3952','co','KH','New Brittanyborough','oharber@legros.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(198,'Mr. Aidan Jacobson','yasmeen.kunze@gmail.com','1-730-604-8860','bh','GY','South Jovannyport','schaden.ericka@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(199,'Tom Koss','qzulauf@romaguera.info','1-509-948-4759','ar','JT','Faheyfurt','madeline.schmitt@gleason.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(200,'Jose Ruecker','carlotta.bins@yahoo.com','510.787.8104 x5091','ko','SY','North Elinore','ssimonis@bruen.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(201,'Shaun Ankunding','lokeefe@gleichner.com','1-983-414-5342','tn','GG','Odabury','alia.klein@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(202,'Will Becker','veronica21@hotmail.com','1-539-832-5602 x137','ne','PU','Maddisonfurt','donavon.pacocha@sawayn.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(203,'Edward Weimann','xernser@oreilly.com','361.631.3328 x363','bh','CN','Lake Jordanhaven','vconn@olson.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(204,'Mrs. Ilene Jacobs','leannon.eldred@gmail.com','1-264-253-7218 x55698','lo','BR','East Bartholomeside','margie.kub@huels.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(205,'Whitney Crooks II','muller.cecil@gmail.com','1-571-938-4982','am','CA','Brownside','declan07@wolff.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(206,'Marlene Smitham','bartholome.hahn@bogan.com','256.246.0558 x1732','mg','ES','West Gwendolyn','nannie.leuschke@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(207,'Stacey Aufderhar II','rodriguez.aylin@rice.org','1-374-929-9839 x4101','sm','FQ','Zboncakborough','sabina.bins@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(208,'Neal Mraz','nsipes@rogahn.info','1-946-527-8690 x8479','sd','IE','Loycebury','imorar@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(209,'Phoebe Anderson','irving.block@gmail.com','562.650.6305 x4591','ta','WK','New Michale','moen.celia@schoen.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(210,'Melba Pagac','everette.toy@wintheiser.info','452.517.8111 x38228','ms','TK','Bartonberg','chadrick.beahan@stroman.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(211,'Monica Kemmer','evie06@yahoo.com','965.374.5320 x6783','ky','KH','North Eula','williamson.ima@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(212,'Aileen Bailey','kuhic.suzanne@doyle.org','890-704-5275','fr','AO','South Hassanport','desiree44@kirlin.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(213,'Paolo Weber','kaia77@yahoo.com','+1-352-292-4091','eu','PT','Lake Timmy','schultz.mathilde@kunde.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(214,'Kaitlin Lowe','josiah.hills@bosco.com','1-393-686-5248 x8715','om','AU','Lake Abigailland','uveum@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(215,'Marcellus Barton MD','jerrod91@dare.com','+13864462280','ay','SB','Kshlerinbury','wcorwin@towne.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(216,'Mrs. Shyanne Davis DDS','nkemmer@hotmail.com','+1 (709) 471-9239','su','RE','West Aishaborough','thompson.alexandro@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(217,'Ubaldo Collins','bella28@gmail.com','1-373-348-7556 x17928','mg','LU','North Orieville','adelbert.kris@mayert.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(218,'Eli Parisian','spencer.shaniya@hotmail.com','979-747-8320 x818','fa','MG','Raynormouth','bayer.julia@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(219,'Octavia Kris','harvey.jermey@klocko.com','1-614-896-9981 x033','iw','VD','West Clevelandmouth','breanna75@donnelly.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(220,'Dangelo Murazik III','dorthy99@leannon.com','+1.882.493.2132','sq','JM','North Nathanielchester','angelita.damore@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(221,'Demarco Okuneva','swaniawski.julie@parker.com','1-202-298-2825 x666','be','LI','Doraside','mcclure.ursula@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(222,'Vergie Dicki','ewisoky@reichert.info','952-458-9627 x29212','ka','NL','Langworthside','ahamill@king.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(223,'Dr. Hannah White DDS','howell.mohr@hoeger.com','231-206-0753 x1617','tw','CN','East Emilie','ariane.harvey@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(224,'Shyanne Altenwerth','jayden02@hotmail.com','1-872-721-3807 x52461','la','BA','Jonatanmouth','sgraham@dickinson.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(225,'Dr. Estrella Littel','crona.ferne@grady.com','+1-807-690-6421','sl','TV','Port Ernestine','goldner.lisette@rodriguez.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(226,'Nia Wolf MD','kaley.okon@wilderman.biz','(454) 821-3497 x764','rn','BL','New Halton','aron.koelpin@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(227,'Dr. Carmela Mante III','kamryn.harvey@gmail.com','+1-318-286-0231','bo','FO','Caesarport','eudora.johnson@lind.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(228,'Adolf Wintheiser','sim.schinner@yahoo.com','360-603-6390','eo','DE','Elmoreburgh','patricia.crona@wiegand.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(229,'Abbie Schmitt','rae41@effertz.info','991.640.1214','ss','BG','New Crawford','abbott.kailyn@heathcote.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(230,'Yadira McDermott','powlowski.josue@kreiger.com','203-787-3368 x674','gd','BG','Kuvalisbury','rhuels@schmeler.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(231,'Miss Adele Donnelly Sr.','treutel.juliana@hotmail.com','(734) 686-2558 x56645','tl','ML','Candidomouth','igaylord@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(232,'Alessandro Beier MD','fadel.veda@yahoo.com','+1 (973) 282-8289','my','DZ','Lake Amira','dwisozk@stark.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(233,'Freida Greenfelder','jaylan32@yahoo.com','734.331.1218 x07565','si','PL','Jenningschester','wiegand.alec@paucek.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(234,'Lauretta Bernhard V','suzanne71@hotmail.com','+1.665.922.3339','si','CC','Faustomouth','pbraun@mcglynn.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(235,'Alvis Ferry','antonetta.jakubowski@yahoo.com','665.875.9823 x11794','hy','JT','Muellerburgh','anais90@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(236,'Prof. Justina Jaskolski','sparisian@yahoo.com','(961) 353-9069 x96694','st','LV','Port Glenna','kaela07@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(237,'Brenna Brekke','lora.botsford@fadel.com','871.945.6396 x9205','ba','BD','Port Mario','rempel.abe@legros.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(238,'Dr. Odie Carter','jannie.mayert@yahoo.com','252-231-8986 x3231','et','ET','North Velda','lionel82@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(239,'Mrs. Kiana Boyle','precious.olson@gmail.com','(934) 683-7709 x25938','fa','BH','East Mateo','mertie15@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(240,'Harmony Legros','hamill.micheal@mcclure.com','(249) 523-4679','am','FM','East Rahsaan','kwilliamson@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(241,'Diego Marks','robert45@stokes.com','1-208-869-3057 x168','sh','IM','Dickimouth','tatum43@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(242,'Litzy Grant DVM','adriel.bergnaum@walter.net','689.722.7486 x9797','ie','KP','Lake Brennanshire','hauck.kattie@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(243,'Shyann Nader','hudson.toni@schumm.org','(889) 292-6912','uk','GR','Austynport','jaskolski.destini@pfannerstill.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(244,'Joel Bartell','bradley.vandervort@stokes.com','1-418-230-4404','sl','DK','Port Keshaunton','griffin03@wintheiser.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(245,'Lyric Buckridge','sosinski@hermiston.com','1-897-682-2345 x13730','tk','DM','South Joanieton','lou.stoltenberg@connelly.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(246,'Clovis Morar','hzemlak@hotmail.com','1-330-371-3087 x156','my','GF','West Karine','scotty00@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(247,'Abbie Moore V','scummings@volkman.com','+18642519210','te','VD','Lake Enricofurt','drew71@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(248,'Maximus Bailey III','trystan78@hotmail.com','602-900-3531','tr','CN','Lake Alexieside','jadyn.volkman@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(249,'Miss Susie Stark','nikolaus.alejandra@hotmail.com','917-617-3955 x606','hi','FM','Lake Gradyside','heidenreich.sanford@schoen.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(250,'Dr. Raymond Hessel DVM','zander11@fahey.com','807.701.7716','ha','VE','Teresaberg','wilkinson.darrick@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(251,'Marjolaine Upton','fshields@hotmail.com','536.709.4311','mk','BH','North Elvisfurt','hahn.verona@goldner.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(252,'Triston Kuhn I','maryjane.satterfield@zieme.info','+1.941.437.4865','ji','TL','New Cathy','brown.abigayle@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(253,'Genevieve Brakus','arianna.padberg@yahoo.com','+12149453711','ml','ZZ','Feestburgh','hoppe.brittany@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(254,'Nick Yundt Sr.','vanessa62@muller.org','1-720-269-1481','kn','LS','East Madelineport','aschmitt@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(255,'Mr. Armani Gutmann','greenfelder.martina@hotmail.com','+14929299042','ks','BO','East Destinyton','feest.gwendolyn@nolan.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(256,'Mr. Thaddeus Johnson','joshua66@yahoo.com','(526) 514-6055 x95447','tl','AU','Brekkemouth','lia.macejkovic@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(257,'Charity Stroman','kirlin.anita@gmail.com','639.984.4348 x83774','mn','ZZ','Lake Breana','katelynn11@gleichner.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(258,'Prof. Bill Lueilwitz V','smitham.sage@hotmail.com','321.505.5150','st','GU','Mullerbury','labernathy@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(259,'Kiara Oberbrunner','zroob@purdy.net','(562) 956-3146 x93259','ja','PN','Wilkinsonburgh','samson01@morar.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(260,'Cesar Koepp','rubye.bruen@hotmail.com','473.898.7865 x54585','sr','WK','Daughertyland','vilma95@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(261,'Sheldon Bergstrom','santa.torphy@gulgowski.net','353.993.6400','bn','NQ','Terryfort','alek81@schneider.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(262,'Dr. Friedrich Littel DDS','bogan.winston@hoeger.com','+1-453-917-4052','ur','BT','Rowestad','tania.corkery@barton.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(263,'Nadia Hand','jovani.torp@feil.net','296.414.4453 x00985','to','PU','North Dominique','blaze.lindgren@grady.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(264,'Mr. Kevon Schroeder','darron39@osinski.com','826.727.4793 x246','uk','MQ','South Lea','katharina.pacocha@abernathy.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(265,'Gwendolyn Schneider','schoen.wyman@yahoo.com','225.901.7453 x98030','vi','AR','Maurinetown','okuneva.harmony@hill.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(266,'Rudolph Franecki','makayla67@gmail.com','+1-302-863-8921','az','TJ','New Shayneland','gleichner.cornelius@gorczany.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(267,'Immanuel Schowalter','mills.geovanni@daniel.com','223-493-7669 x544','tt','IL','Bergnaummouth','stanton.leta@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(268,'Miss Augusta Batz Sr.','rosalee.jenkins@hotmail.com','221-656-8308 x572','be','SG','Krajcikside','zulauf.gavin@gottlieb.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(269,'Vida Pfeffer','ejohns@haley.com','(586) 904-3595 x698','bo','CT','Waelchiside','zoila05@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(270,'Lonny Fritsch','jamil67@zboncak.biz','+1.940.564.6349','ps','UG','North Emelyton','david48@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(271,'Margaret Romaguera','bashirian.savanna@gmail.com','(540) 278-7212','st','ZW','North Jeff','hschmidt@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(272,'Percy Ward','yvon@yahoo.com','375-786-2280 x44865','hr','GH','East Lester','hilpert.xander@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(273,'Miracle Gleason','anderson68@hotmail.com','458-406-8583 x26159','tw','PG','Port Manleyborough','alejandrin26@gutkowski.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(274,'Salvador Dach','ricardo.rodriguez@hotmail.com','1-787-518-3419 x90569','tt','ER','Frankiefort','janessa.ohara@wisozk.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(275,'Sebastian Kerluke','jason.oreilly@willms.com','292-704-5027 x5724','ts','PK','Kossmouth','pagac.skyla@turner.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(276,'Ansley Sauer MD','felipe23@mohr.biz','+1.357.363.1187','hi','GM','Wisozkmouth','wstroman@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(277,'Damion Schoen','fdoyle@gmail.com','1-279-482-7219','ts','OM','Bauchside','giovani61@herman.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(278,'Dr. Louie Bechtelar IV','paul67@gmail.com','526.332.9786 x5261','qu','TH','West Ahmed','amelia.dach@predovic.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(279,'Louie Weimann','zmuller@torp.com','730-956-4542 x403','mk','TD','Port Ileneshire','mason.ledner@beahan.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(280,'Stanton Greenholt Jr.','wilford.denesik@schroeder.info','412-741-7775 x93840','gn','IT','Howellside','harmony.hackett@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(281,'Cathrine Krajcik','sandy70@gmail.com','245-816-6033','br','VE','Nathenmouth','ferry.kelly@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(282,'Dr. Sim Sanford','cartwright.carmel@beatty.biz','1-892-478-5671','tk','PF','East Prudence','rosario.schultz@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(283,'Prof. Kristy Rempel','feeney.kirsten@hotmail.com','+1 (820) 778-2463','ko','PY','Dawsonport','jkirlin@boehm.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(284,'Shawna Romaguera','una.wiza@hotmail.com','689-890-9697 x450','mg','UM','South Neva','sydnie60@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(285,'Danika Kuhlman','thauck@gmail.com','534-576-1369 x574','sa','GL','West Yadiraburgh','oma13@berge.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(286,'Augustus Tillman','anabelle77@gmail.com','985-724-6118 x9089','ts','MK','Ninaville','jeanie.durgan@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(287,'Dina Swift','mcrooks@hotmail.com','1-260-853-1913','to','GT','Port Kacey','vbernhard@kris.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(288,'Kristina Mosciski','lora.skiles@ziemann.biz','1-620-675-4792','fr','BM','New Audiehaven','hanna55@satterfield.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(289,'Lambert Terry','theodore.hayes@mohr.com','753.617.1430','sh','PE','South Waldoville','lowell52@wuckert.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(290,'Miss Cordia Lindgren Sr.','heidenreich.alanna@flatley.com','386-387-8590 x35207','ba','BL','Peggieberg','qweissnat@hegmann.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(291,'Alexys Stracke','cbogisich@kihn.biz','714.633.6119','sd','LC','Florencioborough','paolo.blanda@gibson.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(292,'Rigoberto Johnston','qschumm@langosh.org','+1.272.917.2560','cs','NZ','Jesustown','tondricka@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(293,'Ms. Cortney Waters III','ohara.mercedes@herzog.com','1-587-505-6446','rw','PR','North Newellburgh','piper.zulauf@emmerich.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(294,'Cyrus Rutherford','jaqueline65@hotmail.com','(442) 833-5166 x8926','mr','BT','South Madisynmouth','dino.gibson@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(295,'Werner Veum','armstrong.delpha@champlin.org','1-317-891-6543 x54076','es','AO','New Jabari','kira.price@kulas.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(296,'Santino Johnston','stark.blanca@greenfelder.com','+17317650793','ko','SV','Streichstad','randal50@casper.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(297,'Allene Collins','gutmann.maximillia@schmidt.net','(674) 321-9812 x8839','aa','HK','West Libbie','franco.kemmer@fay.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(298,'Annetta Greenfelder','unicolas@yahoo.com','484-491-5802 x36718','my','IL','Simonisshire','margot.goodwin@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(299,'Elissa Runte','tillman.tate@tromp.info','+1 (245) 385-6393','ku','EG','Lake Hallieview','kaden09@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(300,'Keshaun Reilly','micheal.stehr@witting.org','490.797.1921 x81354','wo','ET','East Ansley','pamela16@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(301,'REDDIT IAN - Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'schooch',NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(302,'TWITTER IAN - Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ian_tweettest',NULL,NULL,NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54'),
	(303,'IMGUR IAN - Test',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'schoooch',NULL,NULL,'2018-08-20 09:02:54','2018-08-20 09:02:54');

/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table contracts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contracts`;

CREATE TABLE `contracts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` int(10) unsigned DEFAULT NULL,
  `story_id` int(10) unsigned DEFAULT NULL,
  `reference_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revenue_share` int(11) DEFAULT NULL,
  `upfront_payment` int(11) DEFAULT NULL,
  `upfront_payment_currency_id` int(10) unsigned NOT NULL,
  `success_system` int(11) DEFAULT NULL,
  `contract_model_id` int(11) NOT NULL,
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `signed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sent_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table downloads
# ------------------------------------------------------------

DROP TABLE IF EXISTS `downloads`;

CREATE TABLE `downloads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `client_id` int(10) unsigned NOT NULL,
  `video_id` int(10) unsigned NOT NULL,
  `story_id` int(11) DEFAULT NULL,
  `mailer_id` int(11) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table failed_jobs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table favorites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `favorites`;

CREATE TABLE `favorites` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `video_id` int(10) unsigned NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table jobs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `jobs`;

CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(4) NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT '1',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;

INSERT INTO `migrations` (`id`, `migration`, `batch`)
VALUES
	(1,'2018_04_01_223428_create_cache_table',1),
	(2,'2018_04_01_223428_create_clients_table',1),
	(3,'2018_04_01_223428_create_comments_table',1),
	(4,'2018_04_01_223428_create_contacts_table',1),
	(5,'2018_04_01_223428_create_downloads_table',1),
	(6,'2018_04_01_223428_create_failed_jobs_table',1),
	(7,'2018_04_01_223428_create_favorites_table',1),
	(8,'2018_04_01_223428_create_jobs_table',1),
	(9,'2018_04_01_223428_create_menu_table',1),
	(10,'2018_04_01_223428_create_pages_table',1),
	(11,'2018_04_01_223428_create_password_resets_table',1),
	(12,'2018_04_01_223428_create_sessions_table',1),
	(13,'2018_04_01_223428_create_tag_video_table',1),
	(14,'2018_04_01_223428_create_tags_table',1),
	(15,'2018_04_01_223428_create_users_table',1),
	(16,'2018_04_01_223428_create_video_categories_table',1),
	(17,'2018_04_01_223428_create_video_collections_table',1),
	(18,'2018_04_01_223428_create_video_shot_types_table',1),
	(19,'2018_04_01_223428_create_videos_table',1),
	(20,'2018_04_01_223428_create_youtube_access_tokens_table',1),
	(21,'2018_05_04_101431_add_reddit_contact',1),
	(22,'2018_05_04_115620_add_country_contact',1),
	(23,'2018_05_04_133516_make_other_notes_larger_contact',1),
	(24,'2018_05_04_165740_add_contracts_table',1),
	(25,'2018_05_11_170325_add_contract_id_to_videos',1),
	(26,'2018_05_15_115441_create_stories_table',1),
	(27,'2018_05_15_115441_create_stories_video_table',1),
	(28,'2018_05_22_115441_create_clientmailer_stories_table',1),
	(29,'2018_05_22_115441_create_clientmailer_table',1),
	(30,'2018_05_22_115441_create_clientmailer_users_table',1),
	(31,'2018_05_22_134250_create_orders_table',1),
	(32,'2018_05_23_115441_create_assets_story_table',1),
	(33,'2018_05_23_223428_create_assets_table',1),
	(34,'2018_05_29_161705_add_story_id_downloads',1),
	(35,'2018_05_31_161705_add_mailer_id_downloads',1),
	(36,'2018_05_31_161706_add_mailer_id_orders',1),
	(37,'2018_06_05_084103_add_jwplayer_code',1),
	(38,'2018_06_06_085433_create_client_mailer_video_pivot',1),
	(39,'2018_06_07_092517_add_sent_at_contract',1),
	(40,'2018_06_07_101749_add_video_id_to_orders',1),
	(41,'2018_06_08_084103_add_wp_asset_id',1),
	(42,'2018_06_08_101158_create_video_social_links_table',1),
	(43,'2018_06_08_101206_create_video_stats_table',1),
	(44,'2018_06_11_101749_add_client_onboarding_fields_to_clients',1),
	(45,'2018_06_11_101749_add_client_onboarding_fields_to_users',1),
	(46,'2018_06_12_070125_add_name_last_name_users',1),
	(47,'2018_06_12_072354_add_account_owner_id_company',1),
	(48,'2018_06_15_072354_add_flagged_to_stories',1),
	(49,'2018_06_15_145547_change_username_nullable',1),
	(50,'2018_06_19_115441_create_clientmailer_opens_table',1),
	(51,'2018_06_21_102243_add_billing_name_to_clients_table',1),
	(52,'2018_06_22_115112_create_recommended_assets_table',1),
	(53,'2018_06_25_134567_change_stories_states',1),
	(54,'2018_06_25_155203_create_collections_table',1),
	(55,'2018_06_25_155223_create_collection_videos_table',1),
	(56,'2018_06_25_155228_create_collection_stories_table',1),
	(57,'2018_06_25_155242_create_quotes_table',1),
	(58,'2018_06_25_165909_add_class_to_videos',1),
	(59,'2018_06_27_134567_update_clients_table',1),
	(60,'2018_06_27_134568_add_source_stories_table',1),
	(61,'2018_06_28_105947_add_region_tier_to_clients',1),
	(62,'2018_07_04_134567_update_stories_table',1),
	(63,'2018_07_06_134568_add_story_id_contracts_table',1),
	(64,'2018_07_09_134568_add_subject_client_mailer_table',1),
	(65,'2018_07_09_140937_add_active_to_clients_table',1),
	(66,'2018_07_09_234567_update_contracts_table',1),
	(67,'2018_07_10_083855_add_expired_status_to_collection_videos',1),
	(68,'2018_07_10_083915_add_expired_status_to_collection_stories',1),
	(69,'2018_07_11_134567_change_stories_destination',1),
	(70,'2018_07_16_134567_add_contacted_at_stories_table',1),
	(71,'2018_07_16_154029_add_license_end_to_collection_videos',1),
	(72,'2018_07_16_154046_add_license_end_to_collection_stories',1),
	(73,'2018_07_17_134567_add_reminders_stories_table',1),
	(74,'2018_07_19_134567_add_awaiting_stories_states',1),
	(75,'2018_07_19_174908_add_imgur_contacts',1),
	(76,'2018_07_26_115123_add_soft_delete_to_users',1),
	(77,'2018_07_26_174908_add_story_id_comments',1),
	(78,'2018_07_31_082131_add_license_terms_to_collection_stories',1),
	(79,'2018_08_15_130215_add_rejection_notes_to_collection_quotes',1);

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `story_id` int(10) unsigned NOT NULL,
  `mailer_id` int(11) DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `client_id` int(10) unsigned DEFAULT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `video_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_story_id_index` (`story_id`),
  KEY `orders_user_id_index` (`user_id`),
  KEY `orders_client_id_index` (`client_id`),
  KEY `orders_video_id_index` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table pages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pages`;

CREATE TABLE `pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table password_resets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table recommended_assets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `recommended_assets`;

CREATE TABLE `recommended_assets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `client_id` int(10) unsigned DEFAULT NULL,
  `video_id` int(10) unsigned DEFAULT NULL,
  `story_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  UNIQUE KEY `sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table stories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stories`;

CREATE TABLE `stories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `alpha_id` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wp_id` int(10) unsigned DEFAULT NULL,
  `state` enum('unapproved','awaiting-contact','approved','rejected','unlicensed','licensing','licensed','hacks-unassigned','writing-inprogress','writing-completed','subs-unassigned','subs-inprogress','subs-approved','subs-rejected','edits-unassigned','edits-inprogress','edits-approved','edits-rejected','ready-to-publish','published','archive') COLLATE utf8mb4_unicode_ci DEFAULT 'licensed',
  `user_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci,
  `author` text COLLATE utf8mb4_unicode_ci,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `thumb` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categories` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_ingested` datetime DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rights` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rights_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `flagged` tinyint(3) unsigned DEFAULT '0',
  `source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `priority` enum('high','medium','low') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pick_label` enum('subbed','speaking-to','contract-sent','licensed','interviewing','video') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `destination` enum('for-sale','for-page','for-both') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submitted_to` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `problem_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `removed_from_social` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permission` tinyint(1) DEFAULT NULL,
  `allow_publish` tinyint(1) DEFAULT NULL,
  `contact_is_owner` tinyint(1) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `story_category_id` int(10) unsigned DEFAULT NULL,
  `story_collection_id` int(10) unsigned DEFAULT NULL,
  `sourced_at` timestamp NULL DEFAULT NULL,
  `contacted_at` timestamp NULL DEFAULT NULL,
  `reminders` int(10) unsigned DEFAULT NULL,
  `contact_made` int(10) unsigned DEFAULT NULL,
  `licensed_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alpha_id` (`alpha_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table story_video
# ------------------------------------------------------------

DROP TABLE IF EXISTS `story_video`;

CREATE TABLE `story_video` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `story_id` int(10) unsigned NOT NULL,
  `video_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `story_video_story_id_index` (`story_id`),
  KEY `story_video_video_id_index` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table tag_video
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag_video`;

CREATE TABLE `tag_video` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tag_video_video_id_index` (`video_id`),
  KEY `tag_video_tag_id_index` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(10) unsigned DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.jpg',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'subscriber',
  `job_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `activation_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_active` tinyint(1) NOT NULL DEFAULT '0',
  `stripe_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_subscription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_plan` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_four` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trial_ends_at` datetime DEFAULT NULL,
  `subscription_ends_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`username`),
  KEY `uniuqe_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `client_id`, `username`, `full_name`, `email`, `first_name`, `last_name`, `tel`, `avatar`, `password`, `role`, `job_title`, `active`, `activation_code`, `remember_token`, `stripe_active`, `stripe_id`, `stripe_subscription`, `stripe_plan`, `last_four`, `trial_ends_at`, `subscription_ends_at`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(1,NULL,'ianlainchbury','Ian Lainchbury','ian@unilad.co.uk',NULL,NULL,NULL,'default.jpg','$2y$10$uCCdWxIGXlQQnZH4J2Z1yekyVzk/pv.BCK.x8jyO223GPVUp1bhYC','admin',NULL,1,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'1998-12-14 00:00:00',NULL,NULL),
	(2,NULL,'mikewright','Mike Wright','mike@unilad.co.uk',NULL,NULL,NULL,'default.jpg','$2y$10$NdIKXvhtrnkvdnd.5fmuB.o/kkqEL0jSLGO2Kzro.0gJWxXNrPE9m','admin',NULL,1,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2007-04-24 00:00:00',NULL,NULL),
	(3,1,'dailymail','DailyMail','admin@dailymail.co.uk',NULL,NULL,NULL,'default.jpg','$2y$10$oPcbl3JFoSct4Be3SqdwL.qcCG5L1krZbUL./F3XhHAxHv2itUgHu','client_admin',NULL,1,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2012-09-27 00:00:00',NULL,NULL),
	(4,1,'dailymailvideo','DailyMail Video','video@dailymail.co.uk',NULL,NULL,NULL,'default.jpg','$2y$10$4JKOFh96RXkYZkSlRTIovOqWUA1CMxMBnYYwwpxEJJ3uiSEkuyq0W','client',NULL,1,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'1996-08-14 00:00:00',NULL,NULL),
	(5,1,'dailymailpicture','DailyMail Picture','picture@dailymail.co.uk',NULL,NULL,NULL,'default.jpg','$2y$10$deZufeJBlV95NX3czHUrM.D4tO/u.zfy9P0/kOrZ.nrFAJcH.rrrW','client',NULL,1,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'1991-11-05 00:00:00',NULL,NULL),
	(6,2,'thesun','The Sun','thesun@unilad.co.uk',NULL,NULL,NULL,'default.jpg','$2y$10$.GvhmPtehKpsTyoV/DYnZ.g5WW2ZiV0mE8kpBXBIH4dZkUnXT1p/6','client',NULL,1,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'1977-10-21 00:00:00',NULL,NULL),
	(7,NULL,'kahmed','Kamrul','kamrul@unilad.co.uk',NULL,NULL,NULL,'default.jpg','$2y$10$mYrLzcPZIbUX57nivkVcLevPFKGJWX3.Ke2ztLTy1yMDtk62AaurC','admin',NULL,1,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'1999-09-19 00:00:00',NULL,NULL),
	(8,NULL,'hemmkerrai','Hemm Kerrai','hemmit.kerrai@unilad.co.uk',NULL,NULL,NULL,'default.jpg','$2y$10$3VirUPeDApwvpoxaOIOmiehmzWbCLiWVnhvKHtDA8mhpd1noXUrGC','admin',NULL,1,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'1975-02-04 00:00:00',NULL,NULL),
	(9,NULL,'manager','Manager','manager@unilad.co.uk',NULL,NULL,NULL,'default.jpg','$2y$10$6MqwEFQ6iCW94pTAZ38sqesgn.QTDgDjDbrdu2a5VzDbuiGhQMEya','manager',NULL,1,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2004-01-24 00:00:00',NULL,NULL),
	(10,NULL,'editorial','Editor','editorial@unilad.co.uk',NULL,NULL,NULL,'default.jpg','$2y$10$Atv135TG1fhzHnDdXEa6M.g/xh1k.2GOBTrIFlM2Ot/yQ/g98fzwK','editorial',NULL,1,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2005-01-09 00:00:00',NULL,NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table video_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_categories`;

CREATE TABLE `video_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT '1',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `video_categories` WRITE;
/*!40000 ALTER TABLE `video_categories` DISABLE KEYS */;

INSERT INTO `video_categories` (`id`, `parent_id`, `order`, `name`, `slug`, `created_at`, `updated_at`)
VALUES
	(1,NULL,1,'UNILAD','unilad',NULL,NULL),
	(2,NULL,3,'Gaming','gaming',NULL,NULL),
	(3,NULL,4,'Adventure','adventure',NULL,NULL),
	(4,NULL,6,'Fitness','fitness',NULL,NULL),
	(5,NULL,7,'Grub','grub',NULL,NULL),
	(6,NULL,8,'Film','film',NULL,NULL),
	(7,NULL,2,'Tech','tech',NULL,NULL),
	(8,NULL,5,'Sound','sound',NULL,NULL);

/*!40000 ALTER TABLE `video_categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table video_collections
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_collections`;

CREATE TABLE `video_collections` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT '1',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `video_collections` WRITE;
/*!40000 ALTER TABLE `video_collections` DISABLE KEYS */;

INSERT INTO `video_collections` (`id`, `parent_id`, `order`, `name`, `slug`, `created_at`, `updated_at`)
VALUES
	(1,NULL,1,'Animals','animals',NULL,NULL),
	(2,NULL,2,'New Content','new-content',NULL,NULL),
	(3,NULL,3,'Fails','fails',NULL,NULL),
	(4,NULL,4,'News/Newsworthy','newsworthy',NULL,NULL),
	(5,NULL,5,'Funny/Humour','funny',NULL,NULL),
	(6,NULL,6,'Feel Good','feel-good',NULL,NULL),
	(7,NULL,7,'Sports','sports',NULL,NULL),
	(8,NULL,8,'Weather','weather',NULL,NULL),
	(9,NULL,9,'Cool Stuff','cool-stuff',NULL,NULL),
	(10,NULL,10,'Archive','archive',NULL,NULL);

/*!40000 ALTER TABLE `video_collections` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table video_shot_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_shot_types`;

CREATE TABLE `video_shot_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT '1',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `video_shot_types` WRITE;
/*!40000 ALTER TABLE `video_shot_types` DISABLE KEYS */;

INSERT INTO `video_shot_types` (`id`, `parent_id`, `order`, `name`, `slug`, `created_at`, `updated_at`)
VALUES
	(1,NULL,1,'Drone','drone',NULL,NULL),
	(2,NULL,2,'Go Pro','gopro',NULL,NULL),
	(3,NULL,3,'Camera','camera',NULL,NULL),
	(4,NULL,4,'Mobile','mobile',NULL,NULL),
	(5,NULL,5,'Animation','animation',NULL,NULL);

/*!40000 ALTER TABLE `video_shot_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table video_social_links
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_social_links`;

CREATE TABLE `video_social_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` int(10) unsigned NOT NULL,
  `platform_id` bigint(20) DEFAULT NULL COMMENT 'the id of the video depending on the platform, not a foreign key!',
  `platform` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `video_social_links_video_id_foreign` (`video_id`),
  CONSTRAINT `video_social_links_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table video_stats
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_stats`;

CREATE TABLE `video_stats` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_social_link_id` int(10) unsigned NOT NULL,
  `likes` bigint(20) NOT NULL DEFAULT '0',
  `comments` bigint(20) NOT NULL DEFAULT '0',
  `shares` bigint(20) NOT NULL DEFAULT '0',
  `reach` bigint(20) NOT NULL DEFAULT '0',
  `reactions` bigint(20) NOT NULL DEFAULT '0',
  `link_clicks` bigint(20) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `video_stats_video_social_link_id_foreign` (`video_social_link_id`),
  CONSTRAINT `video_stats_video_social_link_id_foreign` FOREIGN KEY (`video_social_link_id`) REFERENCES `video_social_links` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table videos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `alpha_id` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` enum('new','accepted','rejected','inprogress','pending','licensed','restricted','problem','noresponse') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `maybe` tinyint(1) DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `video_category_id` int(10) unsigned DEFAULT NULL,
  `video_collection_id` int(10) unsigned DEFAULT NULL,
  `video_shottype_id` int(10) unsigned DEFAULT NULL,
  `title` text COLLATE utf8mb4_unicode_ci,
  `rights` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'guest',
  `details` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `nsfw` tinyint(1) DEFAULT NULL,
  `referrer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `credit` text COLLATE utf8mb4_unicode_ci,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `views` int(10) unsigned NOT NULL DEFAULT '0',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'placeholder.gif',
  `thumb` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mime` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ext` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` text COLLATE utf8mb4_unicode_ci,
  `file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_watermark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_watermark_dirty` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vertical` tinyint(1) DEFAULT NULL,
  `youtube_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `embed_code` text COLLATE utf8mb4_unicode_ci,
  `duration` int(11) DEFAULT NULL,
  `date_filmed` date DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `more_details` tinyint(1) DEFAULT NULL,
  `more_details_sent` datetime DEFAULT NULL,
  `more_details_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reminders` int(10) unsigned DEFAULT NULL,
  `contact_is_owner` tinyint(1) DEFAULT NULL,
  `submitted_elsewhere` tinyint(1) DEFAULT NULL,
  `submitted_where` text COLLATE utf8mb4_unicode_ci,
  `allow_publish` int(11) DEFAULT NULL,
  `filmed_by_me` tinyint(1) DEFAULT NULL,
  `permission` tinyint(1) DEFAULT NULL,
  `is_exclusive` tinyint(1) DEFAULT NULL,
  `terms` tinyint(1) DEFAULT NULL,
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `licensed_at` timestamp NULL DEFAULT NULL,
  `dimension_width` int(10) unsigned DEFAULT NULL,
  `dimension_height` int(10) unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `contract_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alpha_id` (`alpha_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;

INSERT INTO `videos` (`id`, `alpha_id`, `state`, `class`, `maybe`, `user_id`, `contact_id`, `video_category_id`, `video_collection_id`, `video_shottype_id`, `title`, `rights`, `access`, `details`, `description`, `notes`, `nsfw`, `referrer`, `credit`, `active`, `featured`, `views`, `image`, `thumb`, `mime`, `ext`, `url`, `file`, `file_watermark`, `file_watermark_dirty`, `link`, `vertical`, `youtube_id`, `embed_code`, `duration`, `date_filmed`, `location`, `source`, `more_details`, `more_details_sent`, `more_details_code`, `reminders`, `contact_is_owner`, `submitted_elsewhere`, `submitted_where`, `allow_publish`, `filmed_by_me`, `permission`, `is_exclusive`, `terms`, `ip`, `user_agent`, `licensed_at`, `dimension_width`, `dimension_height`, `deleted_at`, `created_at`, `updated_at`, `contract_id`)
VALUES
	(1,'n72536x83M','licensed','random',NULL,NULL,153,4,1,2,'Enim provident consequatur quos laborum consequatur.','ex','guest',NULL,'Voluptatibus alias est voluptatibus asperiores voluptates. Odio et eos consequatur optio nihil facilis sunt. Quos maiores incidunt iusto reprehenderit unde sed aperiam. Omnis magni minus beatae molestiae. Architecto velit nostrum accusamus totam illo. Aut aspernatur similique similique vel velit fugiat amet et. Sit eos ut dolores minus eveniet velit. Dolor velit laborum optio debitis nam voluptatem rerum. Aut quo ut tempora veniam. Quos quasi vero et ut. Ut sed dolores et corrupti sunt nam. Qui voluptates et itaque consectetur quibusdam qui id. Ea qui deleniti id neque ut voluptatibus autem. Ipsum provident facilis autem quidem dicta totam. Mollitia architecto nam voluptatibus adipisci. Aliquam labore ullam nulla omnis autem exercitationem ut et. Debitis error sit saepe. Consectetur quo consequatur possimus ut. Aut quaerat sunt quisquam et consequatur necessitatibus. Earum voluptas odio provident. Laudantium sint voluptatum tempore esse fuga alias voluptas. Omnis id qui veniam unde incidunt tenetur voluptatibus. Aut nisi rem hic labore ut dolorum numquam. Et nemo modi placeat ut dolor et excepturi. Qui voluptas autem quos excepturi incidunt nam dolor. Iste iusto sapiente eius non omnis autem et. Iusto maiores nisi error mollitia ut excepturi. Cumque dolores ut nemo. Voluptates in sint qui vel quo quisquam debitis. Minima facilis animi saepe beatae perferendis. Nihil dicta nam id qui et et ut. Mollitia minus delectus molestiae ut et aut ex consequatur. Provident facere quam at magni porro et ut soluta. Vel quidem at atque ratione. Et quod voluptate dignissimos esse tempora molestiae. Quis necessitatibus fuga corporis temporibus occaecati voluptatem. Et quis voluptas natus voluptatem. Et molestiae minus quasi sunt id. Aut odit eum omnis. Dolores amet natus ut delectus. Deserunt a non facilis. Reprehenderit rerum consequatur rerum vel assumenda voluptas. Sunt ab facere ut quisquam illum voluptas. Dolores reiciendis et consequatur. Eos ut rerum consequatur doloremque repellendus fugit voluptatum.',NULL,0,'0',NULL,0,0,129,'https://scontent-lhr3-1.cdninstagram.com/vp/9a413ca0bf5598a5e98f73191137f2cf/5AC0DAA8/t51.2885-15/s640x640/sh0.08/e35/23164754_300299553786678_6697820546844852224_n.jpg','https://scontent-lhr3-1.cdninstagram.com/vp/9a413ca0bf5598a5e98f73191137f2cf/5AC0DAA8/t51.2885-15/s640x640/sh0.08/e35/23164754_300299553786678_6697820546844852224_n.jpg',NULL,NULL,'https://www.instagram.com/p/BbC_fm_nf-b/',NULL,NULL,NULL,'',NULL,NULL,'<blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-permalink=\"https://www.instagram.com/p/BbC_fm_nf-b/?utm_source=ig_embed\" data-instgrm-version=\"9\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:49.583333333333336% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://www.instagram.com/p/BbC_fm_nf-b/?utm_source=ig_embed\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_blank\">Welcome to Daisio Kart! ?? • • • • • • • #daisyrey #minidachshund #minidoxie #mariokart #nintendo #mario #dachshundappreciation #dogs_of_world_ #sausagedogcentral #longhaireddachshund #sausagedog #doxieoftheday #weinerdog #dachshund #dachshundoftheday #puppy #dog #cute #adorable #fun #teckel #ilovemydog #puppiesofinstagram #dachshundsofig #love #follow #picoftheday #instagood #instalike  _______________________________ @doxiefever @dogs_of_world_ @doxiecentral @doxieobsessed @sausagedogcentral @dachshundsunited @dachshundappreciation @weenteam @wienerdogworld</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A post shared by <a href=\"https://www.instagram.com/daisy_rey_dachshund/?utm_source=ig_embed\" style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;\" target=\"_blank\"> Daisy Rey</a> (@daisy_rey_dachshund) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2017-11-03T20:41:17+00:00\">Nov 3, 2017 at 1:41pm PDT</time></p></div></blockquote>\n<script async defer src=\"//www.instagram.com/embed.js\"></script>',653,'1987-07-15','Tressieland',NULL,1,'1985-10-03 02:47:22','e22a3128-9c2d-3aec-8da9-e92d7b821751',0,1,1,'other site',1,1,1,1,NULL,'138.45.27.22','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/5321 (KHTML, like Gecko) Chrome/37.0.828.0 Mobile Safari/5321','2010-12-21 22:45:30',NULL,NULL,NULL,'2018-08-13 00:00:00','2018-08-20 09:02:54',NULL),
	(2,'5Fl8IV3n8N','licensed','big-story',NULL,NULL,94,1,1,4,'Est ipsam consequuntur aut.','exc','guest',NULL,'Sit maiores doloribus eveniet reiciendis cum minima odio. Saepe blanditiis et sit modi. In voluptas et enim eos. Iste est quis ad. Vel et deserunt et veritatis totam corrupti facilis. Voluptate saepe voluptate et nihil molestiae excepturi tempore. Voluptatem earum exercitationem autem omnis est. Ea aut sed est delectus voluptatem reprehenderit nihil omnis. Maxime et sequi qui in iure eius ut repellendus. Dicta libero atque dolore ducimus. Odit ut et asperiores alias ad. Voluptates earum molestias aut veritatis ea nemo veritatis. Deserunt rerum qui autem natus expedita. Et hic ut esse minima. Cupiditate voluptas tempora deleniti dolor. Cum hic et tempore voluptatibus. Sit et sit iure assumenda consectetur. Nisi adipisci maiores vero assumenda molestias. Omnis dicta doloremque et aut necessitatibus recusandae hic voluptas. Sequi nisi maxime ut ut fugiat fuga aliquam. Sit fuga temporibus exercitationem quis. Quae quibusdam inventore quasi itaque itaque. Amet magnam similique sit voluptas tenetur. Est quas repudiandae laudantium sit incidunt quam impedit. Quod fugit voluptatem sequi minima. Consequuntur vel quas quibusdam. Sint consequatur saepe tenetur hic. Voluptas dolor unde et ab sit aspernatur perspiciatis et. Autem assumenda rerum facilis voluptas aspernatur veritatis. Unde sit est id sequi voluptatem. Alias quo et consectetur aliquam quas consectetur dolor. Quisquam non at et et beatae. Aut ea iure harum in. Voluptatum aspernatur cupiditate similique inventore non praesentium vel. Ducimus quis labore fuga autem dolores aspernatur. Vel tempore officiis ut reprehenderit placeat laudantium dolorem totam. Perspiciatis consequatur rerum sapiente sed delectus iusto reiciendis. Animi occaecati dolor iste maxime vero. Distinctio nesciunt expedita voluptatem voluptate omnis. Iste neque saepe nisi nihil. Vero sit et rerum neque sapiente blanditiis. Eos dolores et est eaque voluptates ea. Id maiores ea et in ut a. Quis exercitationem ratione beatae quos doloribus tenetur reprehenderit necessitatibus. Omnis vero id autem quia aut. Sit non impedit dolores deserunt vel rerum sed. Itaque ut tempore at nihil quod. Adipisci tempora ut numquam temporibus. Non natus expedita earum tenetur est id odit aliquid. Maiores et sapiente quibusdam et. In culpa nam voluptatibus ut laboriosam voluptates exercitationem. Quod assumenda quos id sunt sint necessitatibus. Vero qui perferendis voluptas sit expedita. Est autem eos dolor eveniet tenetur dolores exercitationem. Illo ut enim eos nemo suscipit. Dicta ut velit consequatur est provident nobis. Libero nulla illum quis id labore optio sunt. Placeat rerum atque quia dolor hic reiciendis. Incidunt voluptatem magni error et molestiae veniam. Quibusdam ipsa quia exercitationem omnis.',NULL,0,'0',NULL,1,0,89,'https://scontent-lhr3-1.cdninstagram.com/vp/9a413ca0bf5598a5e98f73191137f2cf/5AC0DAA8/t51.2885-15/s640x640/sh0.08/e35/23164754_300299553786678_6697820546844852224_n.jpg','https://scontent-lhr3-1.cdninstagram.com/vp/9a413ca0bf5598a5e98f73191137f2cf/5AC0DAA8/t51.2885-15/s640x640/sh0.08/e35/23164754_300299553786678_6697820546844852224_n.jpg',NULL,NULL,'https://www.instagram.com/p/BbC_fm_nf-b/',NULL,NULL,NULL,'',NULL,NULL,'<blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-permalink=\"https://www.instagram.com/p/BbC_fm_nf-b/?utm_source=ig_embed\" data-instgrm-version=\"9\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:49.583333333333336% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://www.instagram.com/p/BbC_fm_nf-b/?utm_source=ig_embed\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_blank\">Welcome to Daisio Kart! ?? • • • • • • • #daisyrey #minidachshund #minidoxie #mariokart #nintendo #mario #dachshundappreciation #dogs_of_world_ #sausagedogcentral #longhaireddachshund #sausagedog #doxieoftheday #weinerdog #dachshund #dachshundoftheday #puppy #dog #cute #adorable #fun #teckel #ilovemydog #puppiesofinstagram #dachshundsofig #love #follow #picoftheday #instagood #instalike  _______________________________ @doxiefever @dogs_of_world_ @doxiecentral @doxieobsessed @sausagedogcentral @dachshundsunited @dachshundappreciation @weenteam @wienerdogworld</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A post shared by <a href=\"https://www.instagram.com/daisy_rey_dachshund/?utm_source=ig_embed\" style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;\" target=\"_blank\"> Daisy Rey</a> (@daisy_rey_dachshund) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2017-11-03T20:41:17+00:00\">Nov 3, 2017 at 1:41pm PDT</time></p></div></blockquote>\n<script async defer src=\"//www.instagram.com/embed.js\"></script>',837,'2009-09-15','West Helenhaven','facebook',1,'1996-02-18 19:57:00','c9af7e4e-de7d-3ec4-9568-4f67fb979e3d',5,1,1,'other site',1,1,1,1,NULL,'65.149.169.70','Opera/9.28 (Windows NT 5.2; sl-SI) Presto/2.8.211 Version/11.00','1973-06-20 09:05:57',NULL,NULL,NULL,'2018-07-30 00:00:00','2018-08-20 09:02:55',NULL),
	(3,'XTprXyYHg7','new','story',NULL,NULL,29,3,8,5,'Qui magni reprehenderit minus ullam corrupti.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,988,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,NULL,'',564,NULL,NULL,'website',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'130.228.196.228','Mozilla/5.0 (compatible; MSIE 5.0; Windows 98; Win 9x 4.90; Trident/3.0)',NULL,640,480,NULL,'2018-07-18 00:00:00','2018-08-20 09:02:55',NULL),
	(4,'t1M5BBf3Eb','accepted','nuker',NULL,NULL,55,5,8,4,'Quaerat molestiae sapiente neque ab.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,33,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','video/quicktime',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark-dirty.MOV','',1,'8GvDudVgxCY','',46,NULL,NULL,'facebook',NULL,'1972-08-30 09:33:30','1b8a9b6d-affb-30a4-acbd-d1db6342730f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'22.101.241.230','Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_8_6 rv:6.0) Gecko/20170505 Firefox/36.0',NULL,480,640,NULL,'2018-07-27 00:00:00','2018-08-20 09:02:55',NULL),
	(5,'vlChEscj8b','accepted','nuker',NULL,NULL,176,4,6,2,'Id maiores eaque rem odit.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,0,'https://graph.facebook.com/3761625000527198/picture','https://graph.facebook.com/3761625000527198/picture',NULL,NULL,'https://www.facebook.com/uniladmag/videos/3761625000527198/',NULL,NULL,NULL,'',NULL,NULL,'',510,NULL,NULL,'facebook',NULL,'1971-11-21 23:22:24','a4491011-409f-332f-b558-a386904bbfd1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'252.180.211.13','Mozilla/5.0 (X11; Linux i686; rv:6.0) Gecko/20140601 Firefox/37.0',NULL,NULL,NULL,NULL,'2018-06-25 00:00:00','2018-08-20 09:02:55',NULL),
	(6,'nD5gT9KVvK','rejected','exceptional',NULL,NULL,295,6,7,4,'Fugit harum iusto aut.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,733,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',33,NULL,NULL,'website',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'129.71.49.108','Opera/9.12 (Windows 98; Win 9x 4.90; sl-SI) Presto/2.10.185 Version/12.00',NULL,NULL,NULL,NULL,'2018-08-03 00:00:00','2018-08-20 09:02:55',NULL),
	(7,'TVch2jnQrv','licensed','story',NULL,NULL,69,4,7,1,'Iste dolor culpa ut.','exc','guest',NULL,'Architecto id repellendus rerum voluptas occaecati dignissimos eum impedit. Sit mollitia minus consequatur itaque. At nihil eveniet qui consequatur voluptatum exercitationem reiciendis nesciunt. Aperiam fugit consequuntur quo vel numquam voluptatibus eum. Nostrum voluptas similique praesentium quo et aperiam. Incidunt rerum et optio. Alias omnis ut aliquid aut enim rerum et. Aut voluptates pariatur est vel voluptatem praesentium dolorum. Inventore recusandae occaecati est quibusdam. Ab numquam facilis officia repellat qui. Ratione voluptas aut aliquid autem. Dolor labore ut et molestiae. Libero dolores voluptas voluptatem ad rerum nisi aut nisi. Eligendi eos dolor velit illo voluptatem quo voluptatibus. Voluptatem officiis non quia qui. Eligendi ratione est ipsam. Autem quasi totam voluptas laborum amet odio. Qui qui debitis a sunt. Quod voluptatem iusto quia numquam dolor velit. Id et enim ut et. Totam dolores laboriosam debitis sit doloribus. Tempora qui amet maiores omnis. Reprehenderit nesciunt dolorum et occaecati non quia quas. Sint quo nam quisquam tempore aliquam. Vel nam id ea qui non. Et eius eos consectetur architecto doloribus. Optio voluptas praesentium veritatis eius rem cumque minus et. Exercitationem enim repudiandae exercitationem dolores culpa voluptate sed. Voluptas recusandae deserunt assumenda omnis praesentium. Qui rerum iusto animi perferendis dolorem sunt quo. Magni sit nihil hic sed. Mollitia perferendis ipsa consequuntur quaerat non. Quibusdam quidem dignissimos harum adipisci ut est. Est qui odio odio rerum non commodi mollitia. Placeat amet et qui ab amet nesciunt. Quod quia officiis sunt. Aut sed pariatur aut. Laudantium et nesciunt harum est eveniet aut. Omnis facilis odio id molestiae fugiat ut. Deleniti illum laborum veritatis ad ipsa animi. Sunt omnis saepe quidem voluptas ea odit. Ipsum non minus aliquid error aliquam et totam. Consequatur qui quia inventore ut nostrum. Commodi dolorem laboriosam debitis placeat. Laudantium magnam repellendus est dolorem aut. Omnis ut quis eius aliquam qui aliquam recusandae maiores. Possimus neque ut harum non consequuntur earum sunt. Pariatur ratione sunt maxime ipsa. Asperiores aliquid aliquid repellendus consectetur illo illum. Beatae beatae dolores aut. Fuga aut voluptatum deserunt sed. Qui ex ea quia quia aut itaque.',NULL,0,'0',NULL,1,0,967,'https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg','https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg',NULL,NULL,'https://www.youtube.com/watch?v=hI_J8rK9jyw',NULL,NULL,NULL,'',NULL,'hI_J8rK9jyw','',121,'1994-12-03','East Estebanside',NULL,1,'1989-11-25 09:52:31','ddaa26cc-6d92-3c5d-b8cc-eeb029880a7b',0,1,1,'viral site',1,1,1,1,NULL,'11.38.87.62','Mozilla/5.0 (compatible; MSIE 9.0; Windows 98; Win 9x 4.90; Trident/5.1)','1986-02-25 05:02:56',NULL,NULL,NULL,'2018-06-21 00:00:00','2018-08-20 09:02:55',NULL),
	(8,'qVSMZKRZfQ','licensed','story',NULL,NULL,127,7,3,2,'Qui quo reiciendis sint amet.','ex','guest',NULL,'Non quasi voluptates velit cupiditate. Et consequuntur impedit optio ratione. Nihil consequatur quisquam deleniti id necessitatibus aut. Consequatur nesciunt deserunt error veniam dolores cupiditate. Nesciunt id minus eos natus pariatur. Veritatis sapiente rem atque aut. Vel labore laborum non quam suscipit voluptas dolorem. Similique tenetur distinctio qui reprehenderit amet ea et. Consequatur magni ea facere sunt non. Neque maiores possimus omnis officia provident eaque facere eum. Voluptatibus dolore non nisi necessitatibus assumenda. Sequi libero corrupti eum odit at optio enim. Asperiores quia natus minima explicabo. Sit quod eius et maiores commodi eius itaque. Maiores magnam quam exercitationem officia qui facilis necessitatibus. Atque accusantium non fugit rerum dolorem molestiae quo aut. Et quos non est iusto et. Neque laboriosam non dolore sequi deserunt et. Sunt iste assumenda odit soluta. Aperiam temporibus non ea commodi. Doloremque rerum dolorum aut tempora fuga. Laboriosam cum voluptatum error. Neque et temporibus accusamus commodi vitae. Recusandae nam molestias molestiae laboriosam aliquid magnam repellat. Pariatur excepturi provident nesciunt velit aut consequatur similique. Doloremque recusandae porro voluptas ea fugiat itaque. Omnis ipsam ut a ut. Eaque dolores optio asperiores voluptatem cumque est. Quod ducimus sed qui laborum et est. Repudiandae et non praesentium eligendi repellendus incidunt eius. Quidem quas id autem soluta illum explicabo autem. Voluptas laboriosam sed cupiditate aspernatur. Deserunt voluptas inventore et est ipsum. Magni repellendus tempora nobis non cumque. Voluptatum ut molestiae beatae veniam natus facere. Aliquid porro animi quia ipsam doloremque. Dolore laborum quis odio non est. Natus dolore eligendi nihil non est. Et soluta sunt asperiores ex nostrum veniam. Vitae at qui enim nobis ducimus quia. Maxime delectus tenetur veniam ex molestiae. Sunt odio qui qui consectetur quia saepe necessitatibus. Et alias dolor repudiandae blanditiis ipsum. Nemo qui aliquid quidem voluptatem praesentium voluptatibus suscipit. Voluptatem autem quia laborum repellendus hic veniam. Sunt nisi hic qui eum.',NULL,0,'0',NULL,1,0,718,'https://scontent-lhr3-1.cdninstagram.com/vp/9a413ca0bf5598a5e98f73191137f2cf/5AC0DAA8/t51.2885-15/s640x640/sh0.08/e35/23164754_300299553786678_6697820546844852224_n.jpg','https://scontent-lhr3-1.cdninstagram.com/vp/9a413ca0bf5598a5e98f73191137f2cf/5AC0DAA8/t51.2885-15/s640x640/sh0.08/e35/23164754_300299553786678_6697820546844852224_n.jpg',NULL,NULL,'https://www.instagram.com/p/BbC_fm_nf-b/',NULL,NULL,NULL,'',NULL,NULL,'<blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-permalink=\"https://www.instagram.com/p/BbC_fm_nf-b/?utm_source=ig_embed\" data-instgrm-version=\"9\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:49.583333333333336% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://www.instagram.com/p/BbC_fm_nf-b/?utm_source=ig_embed\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_blank\">Welcome to Daisio Kart! ?? • • • • • • • #daisyrey #minidachshund #minidoxie #mariokart #nintendo #mario #dachshundappreciation #dogs_of_world_ #sausagedogcentral #longhaireddachshund #sausagedog #doxieoftheday #weinerdog #dachshund #dachshundoftheday #puppy #dog #cute #adorable #fun #teckel #ilovemydog #puppiesofinstagram #dachshundsofig #love #follow #picoftheday #instagood #instalike  _______________________________ @doxiefever @dogs_of_world_ @doxiecentral @doxieobsessed @sausagedogcentral @dachshundsunited @dachshundappreciation @weenteam @wienerdogworld</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A post shared by <a href=\"https://www.instagram.com/daisy_rey_dachshund/?utm_source=ig_embed\" style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;\" target=\"_blank\"> Daisy Rey</a> (@daisy_rey_dachshund) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2017-11-03T20:41:17+00:00\">Nov 3, 2017 at 1:41pm PDT</time></p></div></blockquote>\n<script async defer src=\"//www.instagram.com/embed.js\"></script>',606,'1982-04-23','Lottieshire',NULL,1,'2002-08-22 15:06:00','456393b8-efa9-3eac-b2c9-511d19607c27',7,1,1,'other site',1,1,1,1,NULL,'166.249.49.79','Mozilla/5.0 (iPhone; CPU iPhone OS 7_2_1 like Mac OS X; sl-SI) AppleWebKit/534.14.2 (KHTML, like Gecko) Version/3.0.5 Mobile/8B117 Safari/6534.14.2','2011-09-10 16:46:07',NULL,NULL,NULL,'2018-07-07 00:00:00','2018-08-20 09:02:55',NULL),
	(9,'jYH1MssG2Y','problem','story',NULL,NULL,22,5,4,5,'Voluptatem nulla rem.','ex','guest',NULL,'Eos asperiores corporis voluptatem repellat optio officiis. Explicabo doloremque modi nihil dolorem accusantium repellat illum. Quis repellat minus animi nulla odio architecto dolores. Non dolorum omnis tempora magni. Ipsam est occaecati nihil officiis voluptatem temporibus illo voluptate. Accusantium quisquam quos natus provident incidunt quia. Laboriosam architecto repellat vel itaque ipsum. Cumque quibusdam illo ut quas. Similique aperiam et nihil placeat. Et illum quia eum et et animi soluta. Et et omnis minus non est. Ut ut est nostrum. Deserunt magnam impedit velit impedit dignissimos eos. Quis amet minus id porro. Alias qui rem facere id possimus. Et ex harum impedit aut amet soluta sed. Eaque doloribus qui modi autem. Ullam nostrum et vitae exercitationem. Cupiditate rerum tempore doloribus laboriosam quia laborum et. Eius quis debitis officia. Quo ipsum recusandae soluta ipsum architecto voluptas. Nulla qui nihil exercitationem tenetur tempora. Praesentium fugit omnis eveniet tempore at assumenda. Exercitationem eligendi ut qui consectetur corporis ut. Illum accusamus qui voluptatem temporibus. A sed architecto in. Minima nostrum ducimus illo aut non sit. Vero est magni voluptatem voluptatem. Similique vero porro eveniet consequatur. Sed deserunt eaque provident similique ducimus aut harum error. Iusto deleniti quisquam voluptatem incidunt. Exercitationem dolores saepe animi voluptatem blanditiis perferendis. Architecto quam et quam iste quisquam voluptas. Omnis nesciunt deserunt sit totam voluptas. Id non quaerat esse veritatis. Minima fuga exercitationem qui quidem et quia iste. Illum aut delectus doloribus est inventore. Est iure velit inventore sunt sunt est. Quae nisi enim enim quaerat.',NULL,0,'0',NULL,1,0,988,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','video/quicktime',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark-dirty.MOV','',1,NULL,'',224,'2017-07-21','North Dylanport','facebook',1,'1984-08-16 03:27:38','da3b0197-ad7a-385d-8fe9-25ad2eaaee01',8,1,1,'viral site',1,1,1,1,NULL,'45.89.220.86','Mozilla/5.0 (compatible; MSIE 5.0; Windows 98; Win 9x 4.90; Trident/4.1)',NULL,480,640,NULL,'2018-07-14 00:00:00','2018-08-20 09:02:55',NULL),
	(10,'SdMsesqB1w','licensed',NULL,NULL,NULL,259,6,7,5,'Ipsum vel quia soluta eos.','exc','guest',NULL,'Aut ut debitis nulla in vel. Et consequatur voluptas et repudiandae dolor quas et. Beatae vel quia quia iste. Et totam qui ut quibusdam cum magni. Ut eius vel aut quia et. Ut est deleniti et doloremque modi. Error autem saepe ipsum dolores ea est. Qui similique animi iste incidunt totam aperiam iusto accusamus. Occaecati harum asperiores laudantium voluptatem asperiores. Accusamus accusantium facilis doloremque eaque. Nulla et fugit omnis consectetur voluptate vel expedita eos. Sit corporis cum harum architecto cum et. Vel minima fugiat et perferendis quia quis error. Voluptate adipisci cupiditate dolore enim in. Cupiditate quam sequi laborum. Eum aliquid repellendus explicabo velit. Sit non omnis quibusdam consequatur quisquam delectus tempora. Rerum vel delectus magni tempora. Rerum voluptatem nihil incidunt rem eos maxime et. Vel non facilis modi neque ut. Consequatur et id sunt sit. Numquam sit illo veniam sed et nemo. Sapiente soluta eum aut voluptatem est ullam. Vel sit ullam qui temporibus. Tempora pariatur et magni voluptas. Deserunt ut quia natus neque iure occaecati officia. Minima quisquam autem aliquam accusamus deserunt. Qui est sit exercitationem est voluptatem animi sed. Quas quia nesciunt porro. Molestias voluptates nesciunt in velit reprehenderit. Et sunt ab neque nemo consequatur. Blanditiis voluptas ducimus rem ea enim corrupti. Minima laboriosam quia fugit minima. Sunt deleniti esse maxime. Voluptate quisquam dolorum sapiente officiis illum corrupti. Est veniam officia qui ad corrupti. Iusto vitae ut quo enim tenetur quos vel reiciendis. Magnam dolorem reprehenderit quia sunt pariatur non. Culpa corporis non qui et quis. Voluptatem expedita facilis quisquam aut voluptates pariatur. Est dolorem ut eligendi temporibus dolor enim qui. Consequatur est non provident aut optio dolores eligendi. Provident labore qui quia eum. Vel ut quia velit cum odit dolorem. Fuga porro necessitatibus reiciendis nihil eius qui quis. In et quas quos commodi. Recusandae repellat dignissimos accusamus et minima dolore in. Unde vel molestiae soluta delectus culpa blanditiis est. Ratione ea iste quidem quis. Commodi quo et quo neque qui distinctio. Velit assumenda maiores iste magni. Qui et nihil quia nihil repudiandae reprehenderit pariatur. Iure sed fugiat assumenda quis beatae. Dolores ducimus in dolor ut quidem. In quis doloribus consequatur laboriosam. Autem sit est cupiditate et recusandae. Ut tempore nobis repellat labore et quasi quis. Commodi fuga reiciendis aut qui. Modi voluptatem eligendi quidem et magnam veniam quas. Nesciunt dolorem quo error aspernatur amet eius possimus rerum. Perferendis sed sunt ullam laboriosam voluptatibus iste delectus. Eos explicabo in veritatis suscipit. Qui optio ea nesciunt sunt placeat. Voluptas aperiam officiis eligendi qui sed consequatur veritatis.',NULL,0,'0',NULL,1,0,530,'https://graph.facebook.com/3761625000527198/picture','https://graph.facebook.com/3761625000527198/picture',NULL,NULL,'https://www.facebook.com/uniladmag/videos/3761625000527198/',NULL,NULL,NULL,'',NULL,NULL,'',398,'1982-04-30','Milfordborough','facebook',1,'1988-08-10 09:41:15','89765c1f-6f28-3503-912e-93c4e1b84e6e',8,1,0,NULL,1,1,1,1,NULL,'35.167.29.182','Mozilla/5.0 (Windows NT 5.01) AppleWebKit/5321 (KHTML, like Gecko) Chrome/37.0.887.0 Mobile Safari/5321','2011-03-13 21:53:18',NULL,NULL,NULL,'2018-07-07 00:00:00','2018-08-20 09:02:55',NULL),
	(11,'1YDjwNHXXE','accepted','big-story',NULL,NULL,146,8,9,2,'Facilis facere est magnam.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,864,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',395,NULL,NULL,'facebook',NULL,'1991-10-29 09:26:18','97313f7d-7f7b-39aa-b071-d89e0a4f7641',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'107.208.198.111','Mozilla/5.0 (Windows NT 4.0) AppleWebKit/5310 (KHTML, like Gecko) Chrome/40.0.825.0 Mobile Safari/5310',NULL,NULL,NULL,NULL,'2018-08-09 00:00:00','2018-08-20 09:02:55',NULL),
	(12,'s8SwkglLn7','pending','big-story',NULL,NULL,217,8,10,3,'Ipsa neque et consequatur porro error.','ex','guest',NULL,'Eveniet est sit harum quia dolores voluptas non. Aut odit quia nisi consequatur eos expedita excepturi amet. Aut quis explicabo aut assumenda ea. Quia exercitationem atque atque autem. Nam commodi ut reprehenderit odio exercitationem aut cupiditate. Asperiores alias quia in autem molestias sunt repellendus. Voluptatem ea mollitia eveniet sit aut soluta nemo. Non labore dolorem alias facilis expedita excepturi veritatis. Eos eveniet quo in recusandae nisi. Laboriosam nisi et cumque omnis illum maxime. Odio nihil expedita vitae voluptates magnam officiis. Ut sint sed aut porro quasi. Consequatur fugit corporis et quibusdam. Distinctio et inventore omnis magnam corporis cum. Temporibus distinctio ad totam sint corrupti nam. Sunt quo nihil non laboriosam totam voluptatem nihil accusantium. Rerum sapiente est dicta enim fugiat. Aliquid minima tempore eos voluptatem officiis. Aliquid et aperiam dolorem totam est. Commodi doloremque necessitatibus officia error minima. Quam nesciunt tenetur corporis laborum pariatur rerum aliquam. Qui sunt ab vero nobis nam officiis. Sit quis ut adipisci dolores sint. Vel aut qui omnis. Rerum inventore dolor quia ut. Quia fuga sed nostrum. Dolor quod mollitia voluptate impedit. Distinctio veritatis perspiciatis ipsam rerum. Velit illo perferendis quis perspiciatis aperiam. Et pariatur sequi harum est quisquam. Aut aliquid officiis consequatur sed laborum molestiae. Corrupti quidem est porro ipsa est quam cupiditate. Corporis ipsa atque ut eum aliquam qui omnis. Aut ducimus quo ea ab iusto molestiae. Impedit cupiditate natus eos labore architecto consequatur quia ut. Sit ipsa aut voluptatibus iste. Sit ut consequatur qui cupiditate eos dolorem eum. Rerum corrupti provident omnis dolor qui earum voluptatem. Aut rerum voluptas mollitia. Vero cupiditate voluptatem eos voluptatum. Labore occaecati quia minus error labore minima. Quam ut explicabo minus voluptas repudiandae qui dolorem beatae.',NULL,0,'0',NULL,1,0,790,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',314,'1991-11-14','Huelland',NULL,1,'2005-10-25 09:43:10','f8e13e6b-b81d-3deb-9168-5b639f1d5b69',9,1,0,NULL,1,1,1,1,NULL,'223.196.60.207','Opera/8.13 (Windows 98; Win 9x 4.90; en-US) Presto/2.12.165 Version/11.00',NULL,NULL,NULL,NULL,'2018-06-27 00:00:00','2018-08-20 09:02:55',NULL),
	(13,'nizFbvI39R','new','exceptional',NULL,NULL,122,4,4,1,'Aut vel dicta dolore at.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,317,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,NULL,'',532,NULL,NULL,'website',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'145.19.182.212','Opera/8.41 (X11; Linux x86_64; sl-SI) Presto/2.8.291 Version/10.00',NULL,640,480,NULL,'2018-07-28 00:00:00','2018-08-20 09:02:55',NULL),
	(14,'INrvJmzRVw','licensed','random',NULL,NULL,299,8,8,4,'Totam et qui cum.','exc','guest',NULL,'Ut voluptates possimus quia libero. Rerum et quam voluptatem inventore quasi odit velit corporis. Ducimus et cupiditate modi repudiandae. Debitis est suscipit beatae et. Accusantium sapiente quibusdam repellendus doloremque aut quasi nostrum. Veniam sit aperiam illo et nihil odio. Qui tenetur iste voluptates sunt nostrum vitae. Libero ex labore veniam et. Dolor consectetur dolorem repellendus ut voluptatibus et ut. Vitae iusto quae dignissimos. Provident consequuntur officiis deleniti ut mollitia quos unde quaerat. Eum consequatur voluptates pariatur nulla est aut illum aperiam. Aliquam id et tempore assumenda nobis. Dolorem excepturi alias temporibus magnam animi. Ipsa adipisci et aut est sit. Aut laboriosam sed est ut non. Vitae atque sint totam ab. Quod magnam molestiae repellendus autem. Quia voluptatem dolorum hic vel similique voluptatem. Possimus debitis neque explicabo porro enim. Et autem ut ut. Et deleniti rerum quo repudiandae culpa. Similique sequi laborum esse et ut animi cupiditate. Accusamus ipsum possimus et magni unde. Consectetur dolorem et ea quidem reprehenderit. Aperiam animi beatae quos et culpa quidem consequatur. Alias iure modi porro aut quas eum aut. Autem delectus ut eum sint. Vero cupiditate dolor dolor et neque at. Qui maiores earum exercitationem at pariatur harum. Eligendi velit fugit et ipsum dolor. Debitis consequatur incidunt in sint optio. Amet sed veritatis consequatur dolorem. Repellat quibusdam voluptatem perspiciatis esse vel voluptates sit. Atque quia nihil tempore minima facilis similique asperiores. Eum sunt eligendi quo vel velit. Nesciunt sed qui eos cupiditate tempora rerum aperiam. Et et labore excepturi quaerat ut. Error voluptatum rerum nihil. Deleniti architecto aliquid quidem optio et sunt quis rerum. Ipsum perspiciatis sunt quia eos iure architecto nostrum. Qui ab corrupti dolores incidunt sunt laborum fugiat. Non vero et voluptas animi quos consectetur. Voluptatem consequatur consectetur quo quas iure ea nihil sequi. Aut cumque molestiae necessitatibus et. Recusandae mollitia deserunt deserunt eos incidunt possimus. Velit voluptatum veniam rerum corporis assumenda et ipsam. Dicta harum quidem modi. Delectus libero et perferendis distinctio. Error ipsam quas sint itaque quo quia. Ad modi quo aut beatae aut rerum doloribus. Consectetur eligendi fugit quia placeat. Necessitatibus modi cumque voluptas autem iste perferendis. Laboriosam nobis alias molestias. Voluptates eius provident nulla nobis in. Laborum harum nemo numquam commodi impedit velit qui. Sint a optio magni aspernatur reprehenderit facere. Sequi est at qui rerum asperiores. Esse itaque et optio debitis repellendus dolorem. Quo facere ipsa accusamus voluptas.',NULL,0,'0',NULL,1,0,324,'https://graph.facebook.com/3761625000527198/picture','https://graph.facebook.com/3761625000527198/picture',NULL,NULL,'https://www.facebook.com/uniladmag/videos/3761625000527198/',NULL,NULL,NULL,'',NULL,NULL,'',671,'1995-05-29','South Theresiafort',NULL,1,'2001-03-13 05:22:58','92c14b3d-4535-3638-99aa-ad746ceb059b',3,1,1,'lad book',1,1,1,1,NULL,'85.253.101.197','Mozilla/5.0 (X11; Linux x86_64; rv:6.0) Gecko/20110429 Firefox/37.0','1995-11-07 08:21:42',NULL,NULL,NULL,'2018-08-05 00:00:00','2018-08-20 09:02:55',NULL),
	(15,'6jKiMrSf5q','rejected','random',NULL,NULL,101,6,1,1,'Repellat consequatur distinctio soluta amet.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,305,'https://scontent-lhr3-1.cdninstagram.com/vp/9a413ca0bf5598a5e98f73191137f2cf/5AC0DAA8/t51.2885-15/s640x640/sh0.08/e35/23164754_300299553786678_6697820546844852224_n.jpg','https://scontent-lhr3-1.cdninstagram.com/vp/9a413ca0bf5598a5e98f73191137f2cf/5AC0DAA8/t51.2885-15/s640x640/sh0.08/e35/23164754_300299553786678_6697820546844852224_n.jpg',NULL,NULL,'https://www.instagram.com/p/BbC_fm_nf-b/',NULL,NULL,NULL,'',NULL,NULL,'<blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-permalink=\"https://www.instagram.com/p/BbC_fm_nf-b/?utm_source=ig_embed\" data-instgrm-version=\"9\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:49.583333333333336% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://www.instagram.com/p/BbC_fm_nf-b/?utm_source=ig_embed\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_blank\">Welcome to Daisio Kart! ?? • • • • • • • #daisyrey #minidachshund #minidoxie #mariokart #nintendo #mario #dachshundappreciation #dogs_of_world_ #sausagedogcentral #longhaireddachshund #sausagedog #doxieoftheday #weinerdog #dachshund #dachshundoftheday #puppy #dog #cute #adorable #fun #teckel #ilovemydog #puppiesofinstagram #dachshundsofig #love #follow #picoftheday #instagood #instalike  _______________________________ @doxiefever @dogs_of_world_ @doxiecentral @doxieobsessed @sausagedogcentral @dachshundsunited @dachshundappreciation @weenteam @wienerdogworld</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A post shared by <a href=\"https://www.instagram.com/daisy_rey_dachshund/?utm_source=ig_embed\" style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;\" target=\"_blank\"> Daisy Rey</a> (@daisy_rey_dachshund) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2017-11-03T20:41:17+00:00\">Nov 3, 2017 at 1:41pm PDT</time></p></div></blockquote>\n<script async defer src=\"//www.instagram.com/embed.js\"></script>',646,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'124.169.249.18','Mozilla/5.0 (compatible; MSIE 5.0; Windows NT 5.2; Trident/4.1)',NULL,NULL,NULL,NULL,'2018-07-02 00:00:00','2018-08-20 09:02:56',NULL),
	(16,'1b61r2DgfW','pending','story',NULL,NULL,172,7,8,3,'Est minima et saepe fugit dolorum.','ex','guest',NULL,'Libero distinctio excepturi et atque. Quo vel commodi exercitationem temporibus nisi. Est quis laborum sunt libero est. Eveniet enim voluptatibus autem perferendis eveniet. Quod molestiae aspernatur tenetur neque numquam quo maiores. Laudantium dicta corporis laborum dolorum saepe voluptates non. Sit eum quas eligendi harum aspernatur molestiae. Sint et fuga tempore doloribus optio consequatur dolor. Suscipit natus velit exercitationem alias laboriosam magnam. Dolorem nobis in quas. Voluptatum non adipisci iste totam corrupti. Sed enim commodi corporis. Laudantium voluptatem eum sed nesciunt impedit quam accusantium. Minima tempora dicta qui quis in sequi. Sit eius pariatur vero quae qui. Et odit quam consequatur nisi molestiae nisi. Aut nesciunt nulla alias veritatis quia asperiores. Velit quasi est nobis. Numquam possimus quia hic aut laudantium voluptatem. Aut ullam maxime aut quasi excepturi voluptatibus. Consequatur ipsam laborum ut sed. Quia possimus ut ut maiores aut ipsum quae. Deleniti aliquid excepturi quis repudiandae recusandae ut. Libero non sit vero. Ab adipisci officia molestiae quasi. Est distinctio corrupti perspiciatis velit vel. Ab magnam a et repellendus sed. Repudiandae et fugit vel earum. Nam saepe neque tempora ea. Et voluptatem rerum sapiente libero. Perferendis ad vel eum ullam perferendis placeat sit. Dolores accusantium molestiae autem sit quam vel. Sed et eos saepe dolorem inventore. Deserunt tempora eum molestias accusantium in. Quia assumenda eaque consequatur omnis ut. Qui quaerat similique quo dolores. Quia delectus itaque suscipit animi veritatis nemo. Consectetur a ducimus vel qui. Aperiam in dolores quia qui aut ut. Natus ut illum distinctio corporis eos sint. Minus sed magnam amet. Debitis reprehenderit rerum repellendus neque rem et. Quia molestiae est magnam ratione velit dolorem sequi. Quaerat error deserunt aut rerum quia dolores. Qui sint iure odio ut dicta. Excepturi dolor exercitationem ipsam architecto adipisci perspiciatis. Sed et commodi quia iure. Aliquid ut odio et soluta qui ut. Officiis est delectus suscipit velit vitae consectetur eos. Ut ut unde illo sunt exercitationem adipisci ad.',NULL,0,'0',NULL,1,0,542,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,NULL,'',844,'2013-12-29','Ferryville',NULL,1,'2018-04-06 15:05:12','27656457-32b9-3bcd-8c89-e1da4a79e24b',2,1,1,'other site',1,1,1,1,NULL,'2.24.49.198','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_9) AppleWebKit/5340 (KHTML, like Gecko) Chrome/37.0.878.0 Mobile Safari/5340',NULL,640,480,NULL,'2018-06-30 00:00:00','2018-08-20 09:02:56',NULL),
	(17,'VE6FIz4z6x','accepted','exceptional',NULL,NULL,104,4,6,2,'Aut hic eius ut.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,217,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,'eK0pO79YkvY','',748,NULL,NULL,'website',NULL,'1995-03-25 16:04:12','f59fbc9d-7f96-3b0a-b48c-7f203ad9f33c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'45.226.16.125','Mozilla/5.0 (Macintosh; PPC Mac OS X 10_8_8 rv:4.0; en-US) AppleWebKit/532.28.3 (KHTML, like Gecko) Version/5.0.3 Safari/532.28.3',NULL,640,480,NULL,'2018-07-16 00:00:00','2018-08-20 09:02:56',NULL),
	(18,'JXMGx8Gy9S','accepted','random',NULL,NULL,167,3,2,5,'Velit animi labore quo eveniet.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,649,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','video/quicktime',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark-dirty.MOV','',1,'eK0pO79YkvY','',204,NULL,NULL,NULL,NULL,'1995-12-14 11:18:45','6c109941-95eb-3259-9c90-b532fb83857e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'253.217.184.136','Opera/8.79 (X11; Linux i686; en-US) Presto/2.8.313 Version/12.00',NULL,480,640,NULL,'2018-07-21 00:00:00','2018-08-20 09:02:56',NULL),
	(19,'VQ3sRR7dIf','restricted',NULL,NULL,NULL,283,2,8,1,'Facilis fugit aut quidem.','exc','guest',NULL,'Consectetur qui voluptatem ea temporibus. Odio ipsum quia id accusantium ut aut. Qui iure et corporis aliquam. Rerum ab nihil ipsa magni ex. Consequatur rerum ad aut sunt laborum doloremque sapiente. Ipsam maxime impedit nobis quo quo. Et voluptatem facere ea voluptatum. Est non accusamus et aperiam fugit voluptate. Laudantium est ea non non adipisci facilis soluta. Cumque placeat molestiae repellendus ab velit. Minima eveniet unde omnis incidunt. Necessitatibus dolor maxime nulla et aut et. Ut quibusdam fugiat praesentium dicta dolor. Voluptatem et distinctio quaerat nemo quaerat. Quaerat inventore alias sunt nihil inventore. Magni ipsum dicta tenetur voluptates at similique temporibus id. Amet illum ipsum consequatur vitae recusandae. Numquam quae omnis voluptas quis. Delectus est voluptas autem deleniti velit cum. Laudantium aut quo modi inventore delectus. Eum et in ut molestiae non molestiae. Alias rem impedit iure voluptatibus reprehenderit illo nam. At itaque ex sed vel. Doloremque vitae aliquam fugiat. Praesentium qui culpa nesciunt quis voluptatem officiis in. Iste et eligendi unde dolore. Harum vel et voluptas et ipsum voluptatum. Et quisquam optio qui dolores deserunt rem atque est. Quibusdam sit dolorem voluptatem quaerat at. Eveniet dicta ut porro rerum repellendus itaque vel. Voluptates vel omnis eveniet consequuntur atque quo explicabo. Neque asperiores sed quibusdam earum delectus praesentium et. Inventore et ab sit nam quia. Et qui earum reprehenderit non cumque sit. Magni fuga dignissimos et odit deleniti. Excepturi ut necessitatibus molestiae nostrum. Voluptatum incidunt quia dolorum inventore. Doloribus nesciunt aliquam delectus non est. Aut voluptas eos et et corrupti tempora. Vel consequuntur illum beatae vel vel sed provident. Aut rerum autem in ea quidem illo distinctio vel. Sapiente aut fugit et quasi autem esse a. Non eligendi enim harum aut sapiente quia. Distinctio itaque qui officia dicta soluta incidunt. Optio accusantium distinctio rem laudantium velit ratione. Dolores id sequi qui nihil unde aliquid ipsa. Amet voluptatem illum laboriosam illo explicabo odit. Quod aut dolorum reiciendis hic qui. Sint minus perferendis at magnam tempore iusto. Rerum architecto quo quo. Qui odit accusantium labore repudiandae. Mollitia quisquam molestiae omnis ab. Officia rerum voluptatibus tempore enim sapiente explicabo neque tenetur. Harum laudantium voluptatem est sit sit rerum tempore sequi. Eaque maxime omnis rerum voluptatum laborum aut ut enim. Omnis omnis esse culpa quasi quia doloremque. Culpa aut non et molestiae eveniet. Nulla sed et aperiam a impedit nemo. Quam quia alias sunt saepe. Expedita ut impedit reiciendis nulla est magni asperiores. Non dolores recusandae unde assumenda. Qui et molestias quis dolorem. Suscipit ratione nihil minus et est nihil doloremque. Perferendis quia ullam in vel aut qui. Perferendis totam dolor error sit. Voluptatum velit accusamus porro quo voluptatibus repellendus nobis. Sed repellat odio repellendus sint et. Doloremque molestias consectetur quidem cupiditate cumque quia rerum quaerat. Est praesentium voluptatem cupiditate eum natus cum repudiandae labore. Id tempora vel eum deserunt corrupti minus non fugit.',NULL,0,'0',NULL,1,0,664,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',690,'1998-06-29','North Eduardomouth','website',1,'1971-09-21 16:30:55','b0de11a2-da6a-3180-8995-181147453d05',6,1,0,NULL,1,1,1,1,NULL,'105.126.96.164','Opera/8.56 (X11; Linux x86_64; en-US) Presto/2.11.325 Version/11.00',NULL,NULL,NULL,NULL,'2018-08-14 00:00:00','2018-08-20 09:02:56',NULL),
	(20,'jZ1klhetCp','accepted','story',NULL,NULL,142,3,6,4,'Quaerat ipsa quasi tenetur et.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,367,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',505,NULL,NULL,'website',NULL,'1982-11-08 15:57:49','80ba9b69-10e6-3fbd-9851-60427862db22',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'132.88.203.60','Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5) AppleWebKit/5341 (KHTML, like Gecko) Chrome/40.0.890.0 Mobile Safari/5341',NULL,NULL,NULL,NULL,'2018-08-02 00:00:00','2018-08-20 09:02:56',NULL),
	(21,'FfTpwGG9NZ','accepted','story',NULL,NULL,290,4,10,1,'Libero ipsum facere et ipsum.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,403,'https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg','https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg',NULL,NULL,'https://twitter.com/AleReyes10/status/938830145263165440',NULL,NULL,NULL,'',NULL,NULL,'',344,NULL,NULL,NULL,NULL,'2010-05-08 16:32:43','5fb7b92e-25f0-3aaf-b3f0-3e18016f3dde',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'10.230.234.210','Mozilla/5.0 (compatible; MSIE 8.0; Windows 98; Win 9x 4.90; Trident/4.0)',NULL,NULL,NULL,NULL,'2018-07-13 00:00:00','2018-08-20 09:02:56',NULL),
	(22,'LkCKTBTiD6','rejected',NULL,NULL,NULL,291,3,5,4,'Ex recusandae consequuntur non illo.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,226,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','video/quicktime',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark-dirty.MOV','',1,NULL,'',972,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'12.253.20.43','Mozilla/5.0 (compatible; MSIE 6.0; Windows NT 6.2; Trident/4.1)',NULL,480,640,NULL,'2018-07-25 00:00:00','2018-08-20 09:02:56',NULL),
	(23,'S2KRrxbx3P','problem','exceptional',NULL,NULL,144,8,10,4,'Repellendus delectus in debitis.','ex','guest',NULL,'Reiciendis voluptate impedit delectus qui praesentium. Voluptas odio unde quasi repellat atque repellendus. Dolorem ratione odio cumque earum enim voluptate ea numquam. Quasi eum eos perspiciatis labore. Recusandae voluptas at dolor amet magnam voluptas aliquid facere. Incidunt provident hic cumque quam. Consequatur fugit eaque consequatur aut reiciendis. Amet doloremque et aut. Officiis minima ab vitae adipisci est. Est minima enim voluptas reprehenderit pariatur et. Necessitatibus fuga dolor rerum autem voluptas voluptas. Vel inventore ex perferendis nihil iure illum ea. Dolorem sed eos quasi temporibus. Nobis sed consequatur error dicta iste. Qui non et et. Porro odio autem facilis dolorem rerum voluptatibus. Eaque et quas ut accusamus. Enim ut tenetur rerum aperiam molestiae. Ad minus qui explicabo voluptatem. Corrupti qui et autem officia officiis voluptates sit. Deleniti nemo ut hic libero sequi accusamus aspernatur. Reiciendis voluptatem molestiae esse nisi qui sit. Et velit ut fugit voluptatem deleniti. Maiores dicta id quo vel et. Labore dolor explicabo autem nostrum nostrum. Enim laboriosam est odio optio odio aut sunt. Totam ut libero voluptatem iusto sit. Error aut et consequatur excepturi. Minus rerum qui aspernatur. Illum distinctio quod quos laborum blanditiis. Ad nam laborum ipsum error. Qui accusamus expedita aperiam omnis laborum sit dolorum. Cupiditate et accusamus est. Quod quia repellat sed iste omnis quam. Inventore odit non ipsam odit voluptatem non facere modi. Voluptatem veniam pariatur earum quia culpa. Officiis soluta culpa eius et culpa. Quis maiores impedit et eum error quaerat doloribus. Aut id ex nesciunt voluptates nihil et. Expedita doloremque quis rem consequatur. Qui non sit nesciunt dolores et eum. Temporibus incidunt soluta laborum nihil qui non voluptas sunt. Natus soluta sed blanditiis porro autem voluptatem voluptatem.',NULL,0,'0',NULL,0,0,104,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,NULL,'',861,'2003-01-04','Anissaville','facebook',1,'1999-10-23 16:49:09','82609f54-e8e1-39f0-b8cf-de20da036dfa',6,1,1,'lad book',1,1,1,1,NULL,'112.49.58.170','Mozilla/5.0 (Windows NT 6.0) AppleWebKit/5331 (KHTML, like Gecko) Chrome/36.0.859.0 Mobile Safari/5331',NULL,640,480,NULL,'2018-07-21 00:00:00','2018-08-20 09:02:56',NULL),
	(24,'7gEZJKTIce','licensed','big-story',NULL,NULL,238,4,7,3,'Deserunt ipsa minima enim cum.','ex','guest',NULL,'Iure deserunt ea consequatur ut omnis nihil. Ut deleniti sapiente eius et sequi repudiandae omnis. Aut rerum velit recusandae laboriosam eveniet iure. Labore rerum omnis necessitatibus beatae voluptas nihil quo commodi. Est sint eaque sint voluptatem excepturi exercitationem qui. Quo ut eum qui aut at unde qui. Quia non et et commodi facilis iure magni. Vero omnis at itaque voluptatibus et. Tenetur qui et voluptas quia aperiam repellendus laborum. Dolores rerum dicta dolores. Sed quas aspernatur modi quod doloribus. Pariatur dicta eius qui vel voluptatem fugit aliquam. In laudantium exercitationem debitis tempora. At eveniet at illo explicabo molestiae ex reprehenderit amet. Doloribus velit tenetur molestias fuga sit officiis. Dolorum harum cupiditate nihil. Et dolores hic possimus ducimus dolore nihil. Qui quisquam voluptatem et sunt ex delectus exercitationem. Voluptas rerum maiores facilis fugiat quisquam id. Facere eveniet voluptatum possimus suscipit non. Recusandae laboriosam ab nam non repellendus. Sit natus occaecati quia. Ipsum nulla iusto non odit dolorem illo. Debitis et molestiae facere nulla praesentium laborum vel. Repellendus facilis quod eligendi aliquam et. Voluptas fuga omnis deleniti natus doloremque deserunt velit non. Voluptatibus eos sapiente ab corrupti qui sunt delectus. Quibusdam occaecati beatae sapiente accusamus omnis voluptate. Et error autem deserunt accusamus quaerat id. Aliquam eveniet itaque earum et aut voluptatem veniam velit. Rerum magni libero eos incidunt voluptatem delectus. Consectetur quia dolores reiciendis ipsum. Repellat eaque facere omnis deserunt. Incidunt est est earum quo. Qui rerum cum rerum aut qui incidunt doloribus non. Aliquid nihil vero consequatur at ut voluptatem non ut. Et dolor et earum perferendis. Odio assumenda delectus a unde autem suscipit sed. Nihil velit ut minima velit accusamus voluptatum ea voluptatem. Non quidem repudiandae est rem iure nobis ea dicta. Iste facere saepe quam dolorum debitis. Praesentium non fugit inventore voluptatem dolorem beatae est. Eos enim quis iusto eius vel. Officiis ratione eveniet eos voluptas reprehenderit voluptatem iusto. Nostrum pariatur et vel voluptatem sit. Et aspernatur rerum praesentium cupiditate ut quae nemo. Error quia iusto at omnis incidunt qui sit. Quo nulla sit nesciunt autem earum amet.',NULL,0,'0',NULL,0,1,998,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,'8GvDudVgxCY','',604,'1995-12-12','Clareburgh','facebook',1,'1988-12-10 03:53:10','8389a00d-7523-3678-9eeb-27501bd88ce6',3,1,1,'viral site',1,1,1,1,NULL,'95.145.77.73','Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_1) AppleWebKit/5362 (KHTML, like Gecko) Chrome/40.0.872.0 Mobile Safari/5362','1995-07-24 04:47:03',640,480,NULL,'2018-08-07 00:00:00','2018-08-20 09:02:56',NULL),
	(25,'6bCdHc2fbz','problem','random',NULL,NULL,290,2,2,1,'Ut doloribus aut nam.','ex','guest',NULL,'Possimus numquam explicabo non ea vel. Veritatis aut corrupti et doloremque delectus ut. Quia deserunt optio quas sunt. Voluptas illum vel velit libero odio. Id qui harum possimus. Ipsa reiciendis impedit nesciunt impedit esse inventore sunt. Quod voluptatem nam sit et. Aut velit voluptatem consequuntur quia tempora voluptates nulla. Quo et et laborum culpa autem deserunt dolorem. Vel sapiente praesentium est eaque. Eaque enim architecto totam aliquid et sed. Velit magnam reprehenderit hic impedit quia consequatur. Ut incidunt animi sint quis. Id sint accusamus earum rem. Et aut suscipit omnis et nostrum architecto amet. A aliquam laboriosam facere odio. Voluptate qui blanditiis officiis cumque quibusdam dolore saepe. Perspiciatis optio inventore quisquam. Commodi veritatis quis fugit aut molestias beatae. Alias sit vero ut quas. Ratione possimus qui est doloribus dolore tenetur blanditiis. At ab exercitationem minima voluptas quia. Dolor assumenda eveniet libero voluptatum perspiciatis consequatur occaecati. Fuga aut quod minima nisi aut velit omnis. Ea dolorem assumenda consequatur sed illum. Molestiae et vel dolore sint. Dolorum aut qui praesentium et. Unde itaque illum sequi non laborum. Iste illo qui eligendi ut. Ab quasi officiis temporibus sed quis. Accusamus aut natus possimus voluptatibus ut nisi repudiandae deleniti. Et maiores amet hic deleniti. Quia repellendus aspernatur quis et nihil deleniti enim. Voluptatibus accusantium vitae ad occaecati. Magnam eaque cupiditate soluta numquam possimus unde. Rerum illum ipsum aut facere. Eos laborum rerum incidunt facere. In fugiat harum occaecati fuga. Maiores nobis debitis vero beatae. Pariatur amet at alias consequatur magni quidem. Inventore velit odit sed dignissimos perferendis dicta. Quod voluptates laborum aut cum minus omnis. Officiis at qui iste quos molestiae. Harum commodi ipsam et porro odio tenetur. Est nostrum hic suscipit aut mollitia et. Sapiente aut dolorem ut. Asperiores temporibus non voluptatem. Qui voluptatem laboriosam hic atque maxime. Accusamus fugit magni mollitia est qui illo. Molestias non nemo non sed. Voluptatem nam aut est rerum dolores deserunt. Ipsam sit rem quae temporibus. Dolorem autem illum dolorem corrupti. Eius dicta velit assumenda consectetur accusamus. Reprehenderit velit excepturi nisi dolores sint vitae. Reprehenderit sed est porro consequatur. Deleniti dignissimos enim temporibus rerum non rerum odit. Consectetur nobis ut consectetur aspernatur et molestiae. Quia voluptate maxime cumque ducimus. Sit modi voluptas quia cumque iusto suscipit suscipit. Perferendis velit enim est vel aut inventore illum. Doloribus iure ut voluptatibus aut. Nesciunt omnis dolor unde molestias. Dignissimos aut molestias inventore rerum eligendi veritatis deleniti. Eius nihil dolorum et. Quos qui ipsum sint eveniet mollitia quia soluta magni.',NULL,0,'0',NULL,1,0,809,'https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg','https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg',NULL,NULL,'https://www.youtube.com/watch?v=hI_J8rK9jyw',NULL,NULL,NULL,'',NULL,'hI_J8rK9jyw','',766,'2016-07-06','Port Gaylefort','website',1,'2016-01-20 20:49:01','f78d41dd-14ce-3494-98dd-8b569c72a484',3,1,1,'other site',1,1,1,1,NULL,'95.25.229.86','Mozilla/5.0 (X11; Linux i686) AppleWebKit/5311 (KHTML, like Gecko) Chrome/40.0.843.0 Mobile Safari/5311',NULL,NULL,NULL,NULL,'2018-07-21 00:00:00','2018-08-20 09:02:56',NULL),
	(26,'8eRM6c45Pd','problem','exceptional',NULL,NULL,10,6,2,5,'Aperiam numquam velit ratione iusto.','exc','guest',NULL,'Omnis sunt voluptatum iste earum quia magni. Illum perferendis illo aut quaerat quidem sunt. Dolorum magnam cupiditate nihil quo eaque quas laboriosam. A cum vero aliquam amet. Veritatis distinctio cupiditate omnis consequuntur reprehenderit. Nam recusandae commodi et consequatur ea possimus quia. Doloremque nisi architecto odit aut mollitia fugit. Delectus rerum sequi incidunt dolore non. Et quaerat sint at aut. Neque animi vel beatae optio placeat praesentium voluptatem quia. Vitae et voluptate aliquam aspernatur dolore reprehenderit dolores nostrum. Quia recusandae accusantium ea dolores est ea voluptas rerum. Id incidunt velit voluptatem ab. Est molestias eos quasi et sequi nostrum qui. Sunt ut et autem dolor pariatur. Facilis sequi soluta similique accusamus. Aut dolores quibusdam ducimus iure iure deserunt. Ad consequuntur minima porro eum facilis quia dicta est. Ipsam aut placeat eius aut neque commodi. Dignissimos laborum et autem libero necessitatibus dicta pariatur. Quasi dolores odio odio temporibus sint dolore. Rerum fugiat mollitia atque rerum et. Omnis sunt at repudiandae et ipsa adipisci ea ut. Veniam mollitia voluptas explicabo. Non et quia fuga necessitatibus. Aut consequatur voluptas esse quod atque et. Laborum et quidem saepe aut quae quae voluptas nobis. Temporibus optio et voluptatem consequatur. Ut aut voluptas porro dolorem perspiciatis fugit adipisci. Et magnam eligendi rerum provident magnam et tempora. Nulla rerum sapiente corrupti ut voluptatem voluptas quibusdam. Non dolor qui ab ex laboriosam vero. Quo nisi molestiae velit amet et ullam quia. Doloribus doloribus placeat nam quam. At commodi nam voluptas officiis consequatur dolore. Deleniti doloremque rerum architecto dolore quisquam velit saepe. Ea modi consequatur aut quas rerum. Veritatis id et aut voluptas enim quo eos. Nemo et qui repellat facere dolores recusandae. Quia blanditiis et ullam cum aut. Possimus corrupti illo alias et aut. Est nihil aut nam est. Quisquam quia provident porro. Eligendi nam deleniti error quos optio ducimus et. Laudantium odio natus expedita distinctio eaque. Et dolorem laboriosam veritatis ea temporibus quis quisquam accusamus. Quasi ut eos hic qui expedita quo et animi. Beatae nisi officia quia tenetur. Vitae minima dignissimos voluptatem nobis id nulla fugiat. Laudantium aut facilis qui quam hic nemo. Rerum vitae dolorem nam a debitis distinctio maiores. Quas blanditiis aliquam quis sed quos quia non. Occaecati dignissimos quibusdam ut aut aut deleniti. Consequatur ut necessitatibus dolorem occaecati ut est. Asperiores soluta quia est quas placeat facere rerum. Molestiae voluptatem et occaecati nobis eaque. Et magni ut fuga aspernatur dolorum. Iusto sapiente deleniti dolores temporibus eligendi dicta. Eum dolore fuga aliquam earum qui sit molestiae. Non natus non est rerum eveniet. Perferendis architecto vero assumenda at at voluptatem deserunt. Voluptate et accusantium itaque quaerat. Dolor distinctio aut atque autem autem. Quisquam asperiores beatae repellat adipisci. Et ut qui voluptatem rerum molestias corrupti quisquam recusandae. Ut qui necessitatibus et.',NULL,0,'0',NULL,1,0,648,'https://graph.facebook.com/3761625000527198/picture','https://graph.facebook.com/3761625000527198/picture',NULL,NULL,'https://www.facebook.com/uniladmag/videos/3761625000527198/',NULL,NULL,NULL,'',NULL,NULL,'',959,'1983-10-17','Karsonshire','facebook',1,'2009-09-24 07:12:43','32be45e1-a44d-3f98-8d0c-a2c8d8aceaaf',8,1,1,'other site',1,1,1,1,NULL,'90.241.91.252','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/5312 (KHTML, like Gecko) Chrome/40.0.814.0 Mobile Safari/5312',NULL,NULL,NULL,NULL,'2018-07-30 00:00:00','2018-08-20 09:02:56',NULL),
	(27,'hFyMQqNMxc','accepted','nuker',NULL,NULL,271,7,4,1,'A voluptatem consequatur architecto.','exc','guest',NULL,NULL,NULL,0,'0',NULL,0,0,851,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',585,NULL,NULL,NULL,NULL,'1996-10-29 11:01:22','a31b9f8b-4f17-3320-b295-f313d5510000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'69.44.151.127','Mozilla/5.0 (iPad; CPU OS 8_1_2 like Mac OS X; en-US) AppleWebKit/535.3.4 (KHTML, like Gecko) Version/3.0.5 Mobile/8B113 Safari/6535.3.4',NULL,NULL,NULL,NULL,'2018-08-07 00:00:00','2018-08-20 09:02:56',NULL),
	(28,'FMgiw9tING','licensed','big-story',NULL,NULL,88,5,5,5,'Dolorem blanditiis perspiciatis ea pariatur.','ex','guest',NULL,'Minima voluptatem recusandae nihil sapiente et quisquam. Quam ab consectetur exercitationem vel. Eveniet ut asperiores omnis odio cumque aliquam. In facilis enim officiis voluptatibus et omnis. Voluptatem aperiam facere consequuntur voluptas provident. Totam eaque repellendus suscipit repellat accusamus aut. Ea optio in eum earum. Velit aliquid distinctio voluptas. Est nobis pariatur rerum culpa quaerat assumenda possimus. Eveniet nihil voluptatem voluptatem omnis harum quis voluptatem. Voluptas consequuntur praesentium doloribus nam sit est dolorem. Consequatur molestiae et esse. Delectus necessitatibus voluptatem vitae sit. Rem qui dicta modi quis ratione voluptate aliquid. Officia quam eum ut tempore in recusandae. Eveniet quia a aliquid ipsa. Doloremque quia enim temporibus. Error eum sit omnis repudiandae omnis. Iusto ut nulla necessitatibus autem sapiente sit. Pariatur quisquam voluptatum optio et consectetur ipsam molestias. Et quidem maxime ducimus minus fuga repellat. Vitae molestias non architecto ea et ab rem iusto. Voluptatem facilis sed aliquam ut nihil. Amet in dicta similique molestiae voluptas. Est laboriosam dignissimos nulla dolore voluptas itaque explicabo. Impedit hic minus dolor. Neque enim consequatur tempore commodi. Praesentium aliquid ratione non ut. Nemo consequatur ducimus alias nobis harum. Ipsam sit sed numquam quia tempore quam deleniti. Aut dolorum earum a facere ut natus. Voluptas voluptas quo id tempore sapiente sapiente. Nemo molestiae quos rerum animi. Ut autem sit alias quaerat facere. Et et distinctio minus ratione. Dolor quo nisi voluptas sit doloremque optio. Ratione quam assumenda sint vel. Qui molestiae sequi repudiandae eos mollitia perspiciatis consectetur. Beatae tempora doloremque officiis dolorum. Dolor et quis aut. Est accusamus nobis excepturi earum veritatis. Qui quia aut quia provident dignissimos est eos. Quod sunt natus quidem autem inventore nostrum placeat. Voluptates qui nihil atque aut aspernatur aut unde. Inventore culpa quo dolor dolores veritatis. Facere cumque esse fuga iste tempore ut eligendi. Et iure autem qui rerum vitae dolore sed. Odit possimus modi expedita fugiat asperiores quasi. Occaecati nesciunt et qui odio et. Consequatur eum nemo voluptates reprehenderit est. Nulla sit accusamus tempore ab. Nesciunt nobis nisi reiciendis cumque. Consequatur eum ea suscipit architecto eligendi delectus rerum ipsum. Deleniti molestias unde sunt esse et. Maxime dicta aut saepe quis. Earum unde perspiciatis quaerat quos expedita maxime. Asperiores et rerum nemo hic laudantium. Ex et voluptatum non dolorem magnam enim assumenda. Qui quia cupiditate amet sint corporis. Dolorem nisi perspiciatis voluptatum exercitationem ipsa totam non. Nihil vel ut dignissimos non et blanditiis. Dolore vero voluptatum ut rem. Aut delectus itaque maxime qui illo exercitationem. Id error quos vel molestias sed. Labore eaque commodi ab natus adipisci. Rem libero nesciunt sit. Provident est et repellendus voluptatem nulla dolores. Quo in aliquid est sit voluptatem quam. Ratione velit sed laudantium corporis quidem. Enim sunt magni nobis et laudantium aperiam. Voluptatem ducimus natus dignissimos qui nobis non voluptas.',NULL,0,'0',NULL,0,1,964,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','video/quicktime',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark-dirty.MOV','',1,'8GvDudVgxCY','',617,'1981-02-09','Morissettebury','facebook',1,'2009-03-18 17:06:51','37f6a220-1969-3a11-ad32-23f0ec29fdbb',6,1,0,NULL,1,1,1,1,NULL,'39.234.27.95','Mozilla/5.0 (Windows NT 4.0) AppleWebKit/5352 (KHTML, like Gecko) Chrome/36.0.841.0 Mobile Safari/5352','1989-12-16 22:51:39',480,640,NULL,'2018-07-14 00:00:00','2018-08-20 09:02:56',NULL),
	(29,'MmLsl8dWb6','rejected','big-story',NULL,NULL,198,7,9,2,'Quo molestiae quia et animi.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,679,'https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg','https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg',NULL,NULL,'https://twitter.com/AleReyes10/status/938830145263165440',NULL,NULL,NULL,'',NULL,NULL,'',370,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'84.106.244.17','Mozilla/5.0 (iPhone; CPU iPhone OS 8_2_1 like Mac OS X; en-US) AppleWebKit/533.15.4 (KHTML, like Gecko) Version/4.0.5 Mobile/8B113 Safari/6533.15.4',NULL,NULL,NULL,NULL,'2018-08-10 00:00:00','2018-08-20 09:02:56',NULL),
	(30,'5vHPTWsFGD','new','story',NULL,NULL,16,4,3,5,'Aliquid labore nisi iste.','exc','guest',NULL,NULL,NULL,0,'0',NULL,0,0,769,'https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg','https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg',NULL,NULL,'https://www.youtube.com/watch?v=hI_J8rK9jyw',NULL,NULL,NULL,'',NULL,'hI_J8rK9jyw','',672,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'14.140.18.29','Mozilla/5.0 (Windows NT 6.1; sl-SI; rv:1.9.1.20) Gecko/20171210 Firefox/37.0',NULL,NULL,NULL,NULL,'2018-08-02 00:00:00','2018-08-20 09:02:56',NULL),
	(31,'xnrk4MYBNr','restricted','story',NULL,NULL,268,4,4,5,'Reiciendis ut nisi odio rem.','ex','guest',NULL,'Quia blanditiis at odio reiciendis quasi ipsam corrupti. Quae exercitationem amet nostrum provident est et modi. Ut et neque veniam eligendi. Necessitatibus quis expedita quia dolores facere adipisci rerum. Nulla et incidunt provident nemo sapiente minus architecto eum. Amet fuga expedita quis ut vitae. Delectus impedit voluptas aut est. Sint illum deserunt recusandae fuga perferendis quibusdam. Consequuntur quia doloribus quo repellendus aliquam libero dolorem quis. Sequi est dolores dolore non nulla. Omnis non impedit illum provident. Voluptatem accusantium aut aut aut placeat blanditiis. Fugiat aut ipsam sunt ut ratione delectus. Quisquam velit dignissimos sunt tempore est vitae. Suscipit sed voluptatem illum fugiat et. Ipsum aut qui delectus minima aliquam adipisci porro. Ad ab voluptate veritatis sequi deserunt laudantium. Iure provident modi cum repellat atque eaque. Itaque non eligendi perspiciatis dolore libero. Dolorem consequatur cum odio et nesciunt animi. Corrupti dolores expedita corporis autem rerum. Nisi pariatur est non mollitia voluptatem voluptatum. Totam consequatur sed est quo dicta. Quia minima non reiciendis quis et ut. Illo accusantium cumque officia sed. Et aliquid accusamus dignissimos sed sint dolorum ad. Odio dolore et pariatur nobis debitis quo. In nam sequi accusantium perferendis. Provident eligendi optio rerum facilis tempore tempore. Et aliquid laboriosam vel consequatur et. Itaque sint omnis laudantium neque. Eveniet ex excepturi est non amet minus earum. Fugit velit assumenda quae. Quia beatae quasi ut et fugiat nostrum occaecati.',NULL,0,'0',NULL,1,0,294,'https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg','https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg',NULL,NULL,'https://www.youtube.com/watch?v=hI_J8rK9jyw',NULL,NULL,NULL,'',NULL,'hI_J8rK9jyw','',464,'1994-04-23','Emmerichton',NULL,1,'1991-04-03 03:29:04','dea97597-b544-386c-9512-ac887eed5ab2',5,1,1,'other site',1,1,1,1,NULL,'124.168.29.205','Opera/8.97 (X11; Linux i686; sl-SI) Presto/2.11.183 Version/10.00',NULL,NULL,NULL,NULL,'2018-07-24 00:00:00','2018-08-20 09:02:56',NULL),
	(32,'ilNnvCgE1q','problem','big-story',NULL,NULL,171,3,2,3,'Et debitis quis.','ex','guest',NULL,'Non facere delectus fugit temporibus vero animi voluptatem. Reprehenderit explicabo itaque delectus. Mollitia esse quae est possimus sint qui. Qui officia hic qui autem. Voluptatum est omnis ut voluptas hic nam iure. Distinctio saepe ut ut minima sed. Distinctio tempora voluptatem illum ipsum harum reiciendis et quia. Iste placeat deleniti velit minima occaecati. Ea est incidunt ea doloribus quas libero voluptate. Praesentium et aperiam voluptatem voluptatem. Qui eius et praesentium qui dolores animi magni. Quos distinctio labore velit et ut est deleniti. Quibusdam fuga alias deleniti provident suscipit reprehenderit cum. Veniam ut consequuntur qui tempora. Nemo soluta eveniet quasi porro. Officiis provident aut fuga distinctio iusto eaque similique. Occaecati deleniti quia rerum cum. Saepe qui ipsam beatae nesciunt ut at. Eaque eos dolores reprehenderit saepe at omnis. Assumenda sunt distinctio voluptatem a ex modi et. Rerum et esse expedita consequatur iste. Aliquam rerum amet officiis magni animi. Sunt officiis qui fugiat accusamus rem nihil nihil iste. Quisquam placeat quae molestias labore. Saepe quia amet blanditiis repellat dignissimos. Dolorem dolor autem blanditiis pariatur rerum. Quis perferendis quia quia provident molestiae voluptatem. Rem sed placeat ratione consectetur ex dolorem quis. Eius natus aliquid ut. Similique natus sit qui et deleniti. Illo qui quae quae amet. Fuga mollitia alias at dolore recusandae commodi. At temporibus quo asperiores rerum quo enim. Quod voluptates voluptatem officiis earum. Explicabo voluptatibus mollitia at occaecati. Sit debitis quas porro provident quisquam dignissimos amet. Ut rem doloribus nostrum deserunt suscipit dolorem nihil. Cum eius dolores necessitatibus repudiandae vel quo autem consequatur. Ducimus optio dolor qui mollitia. Distinctio dolorum et ut dolore est possimus. Itaque ex exercitationem delectus nobis. Quo odit ut totam nihil optio quae. Sint iure facilis modi delectus. Et omnis ut quod dolorem. Dolorem ut perspiciatis eveniet quia nesciunt aspernatur dolorem. Nihil qui alias cumque commodi. Et ipsum sit repellendus sint ut. Aut et est officiis ipsum quis qui nihil. Perferendis et sunt voluptatem ut in necessitatibus. Aut reiciendis laborum vitae recusandae enim id fugit. Repellat molestias a necessitatibus impedit exercitationem ut maxime ad. Porro cum dolor vel aut molestiae. Sed soluta ut delectus et sunt autem. Itaque aut eveniet reprehenderit sit dolor consequatur. Ut accusantium iusto ut nemo ipsam molestiae. Recusandae rerum sed magnam dicta ratione et consequuntur. Nam quibusdam pariatur aut omnis temporibus molestiae. Illum et totam ex saepe aut laudantium vel. Voluptas quasi ipsa sunt deserunt.',NULL,0,'0',NULL,1,0,31,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',343,'1988-04-14','Kovacektown','website',1,'1986-08-05 18:30:13','6db7483d-b445-38fb-a226-8735df0b8fbc',2,1,1,'other site',1,1,1,1,NULL,'157.86.7.195','Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_2 rv:6.0) Gecko/20120805 Firefox/37.0',NULL,NULL,NULL,NULL,'2018-07-13 00:00:00','2018-08-20 09:02:56',NULL),
	(33,'g9832EYrPE','accepted','nuker',NULL,NULL,69,4,5,4,'Nesciunt similique dolorum recusandae.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,868,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,'8geuehYuMP0','',607,NULL,NULL,'website',NULL,'1992-06-19 02:55:34','a0fd2770-ccf6-3349-9ff3-ccfc887360a3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'254.6.253.202','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/5351 (KHTML, like Gecko) Chrome/38.0.849.0 Mobile Safari/5351',NULL,640,480,NULL,'2018-07-25 00:00:00','2018-08-20 09:02:56',NULL),
	(34,'YKCjhDYh2Q','accepted','story',NULL,NULL,38,5,4,3,'Quo officia aut ipsam.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,508,'https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg','https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg',NULL,NULL,'https://twitter.com/AleReyes10/status/938830145263165440',NULL,NULL,NULL,'',NULL,NULL,'',646,NULL,NULL,'website',NULL,'1986-05-07 19:40:53','720a5904-de0f-3846-bfc7-cb2da8dac437',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'156.238.128.134','Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_4 rv:5.0; sl-SI) AppleWebKit/535.13.4 (KHTML, like Gecko) Version/5.0.2 Safari/535.13.4',NULL,NULL,NULL,NULL,'2018-07-24 00:00:00','2018-08-20 09:02:56',NULL),
	(35,'5RwlmB4qBj','restricted','random',NULL,NULL,280,5,1,4,'Aut libero voluptate a odit.','exc','guest',NULL,'Neque at adipisci totam ullam sint molestiae voluptatem. Vero atque quia nisi similique consequuntur. Vel dolores ipsa eum dolores ipsa. Autem tenetur aliquid et fugit. Magni eos magni beatae voluptatem quae soluta. Perferendis modi facere unde aut quidem impedit veritatis. Quidem quo saepe et et tempore voluptatem. Nesciunt excepturi vitae sapiente omnis ad ipsa. Laudantium molestiae inventore laboriosam pariatur sit sit magni. Est et voluptatem sit sit ut hic. Non magni sed dolor doloribus qui hic accusamus aliquam. Ipsam et exercitationem aperiam quia consectetur ratione. Nesciunt esse mollitia eos aut explicabo deleniti. Voluptas quam corporis sint. Est qui corporis aspernatur consectetur. Et eos magnam occaecati ad hic. Magni dolores molestiae porro praesentium at minus. Nulla dignissimos placeat aut sint est consequatur repellat. Repellendus neque enim est enim esse. Quas cupiditate illo molestiae perspiciatis et libero iusto corrupti. Voluptas porro harum tenetur laudantium corrupti commodi. Rerum dolorum vitae ipsum non cumque numquam doloremque. Esse aliquid omnis temporibus libero quia voluptatum voluptatibus. Enim hic iste dolorem et aut aliquid aut eum. Et enim est quis rerum aut autem. Perspiciatis quisquam asperiores dolores. Ducimus a labore amet enim reiciendis quibusdam fugiat. Ab autem in velit dolor aperiam accusantium voluptas. Fugit adipisci eaque dolorem placeat pariatur consequatur. Reiciendis eos et facere et similique. Omnis repellat aspernatur consequatur repudiandae dicta qui. Qui consequatur est illo ea a velit. Qui non dignissimos soluta illum quia minima eum. Architecto hic et est incidunt fugit repellat. Eos ut tempora totam reiciendis iusto animi. Quis non officiis ut necessitatibus similique beatae quaerat tenetur. Minima blanditiis quo animi ratione impedit eius dolores. Qui reprehenderit aut non tenetur repellat quia quia. Voluptas porro officia eaque corporis porro aut. Fugiat magnam omnis praesentium aut suscipit. Nam eos exercitationem accusamus quos. Nobis et ab culpa sint. Placeat quisquam eum quos nam. Iste repudiandae est aperiam qui quia expedita. Sit quo et magni numquam aut laudantium dolorem eum. Sed in molestiae rerum veniam rerum aperiam quia. Et odio aperiam officiis consequatur veritatis odit. In sed quidem eos sapiente velit est. Iure voluptatibus eum sint sed. A iste asperiores omnis deserunt. Non autem non nulla. Vel beatae hic cumque omnis et nisi. Ipsa est incidunt veritatis dignissimos illum et. Ut aut qui tempora. Ut iure veniam nihil et minima dolor laboriosam ratione. Et ut maiores dolore. Deserunt aut amet voluptatum voluptatibus corporis eligendi. A totam et minima veniam rerum. Consequatur dolores iure et qui quam laboriosam cupiditate. Voluptatem aliquid voluptas dolores architecto voluptatem magnam velit. Ut temporibus occaecati expedita porro expedita. Dolor aut laudantium vel sed impedit. Fugiat eius voluptates ipsum quaerat corporis.',NULL,0,'0',NULL,0,0,73,'https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg','https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg',NULL,NULL,'https://twitter.com/AleReyes10/status/938830145263165440',NULL,NULL,NULL,'',NULL,NULL,'',789,'1987-01-06','Lake Stuart','facebook',1,'2018-05-16 13:27:25','6bdf61e5-a3e4-37c8-b744-eaadb60cd0c1',3,1,1,'viral site',1,1,1,1,NULL,'139.7.127.150','Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_6 rv:2.0) Gecko/20100215 Firefox/36.0',NULL,NULL,NULL,NULL,'2018-07-18 00:00:00','2018-08-20 09:02:56',NULL),
	(36,'Lc5T8FISiW','rejected','exceptional',NULL,NULL,297,7,3,1,'Voluptas dolores vitae est.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,924,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,NULL,'',541,NULL,NULL,'website',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'211.79.50.155','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0 rv:5.0) Gecko/20111023 Firefox/37.0',NULL,640,480,NULL,'2018-06-25 00:00:00','2018-08-20 09:02:56',NULL),
	(37,'H3fpRisH9p','accepted',NULL,NULL,NULL,163,5,6,1,'Illo voluptatum vel dicta.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,920,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','video/quicktime',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark-dirty.MOV','',1,'8geuehYuMP0','',526,NULL,NULL,'website',NULL,'1995-12-03 02:49:19','7913fc1d-e65e-395f-8b45-5956542d5d34',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'219.168.223.196','Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_8_5 rv:5.0) Gecko/20111226 Firefox/37.0',NULL,480,640,NULL,'2018-08-15 00:00:00','2018-08-20 09:02:56',NULL),
	(38,'F1XF4cp948','accepted','nuker',NULL,NULL,291,5,9,2,'Quia ullam suscipit voluptatem consequatur rem.','ex','guest',NULL,NULL,NULL,0,'0',NULL,0,0,76,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','video/quicktime',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark-dirty.MOV','',1,'eK0pO79YkvY','',142,NULL,NULL,NULL,NULL,'1983-09-09 20:18:35','0cf317f6-fede-3cc9-817d-ee847af57ca3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'252.154.34.153','Opera/9.67 (X11; Linux x86_64; en-US) Presto/2.12.194 Version/10.00',NULL,480,640,NULL,'2018-08-16 00:00:00','2018-08-20 09:02:56',NULL),
	(39,'HMR5syg7xV','restricted','story',NULL,NULL,185,3,10,1,'Qui quo eos quam et.','exc','guest',NULL,'Ut illum sapiente earum porro veritatis excepturi ea. Voluptas laborum temporibus voluptatem enim enim debitis ea. Totam et quisquam quia. Sapiente voluptas sit commodi odit excepturi maxime veritatis. Totam ullam blanditiis ad. Doloribus perspiciatis assumenda ut consequatur animi maxime. Numquam totam numquam veritatis. Nostrum neque ab adipisci perferendis sit porro. Vero quaerat consequatur dolores maxime repudiandae modi in. Temporibus expedita suscipit culpa nam officia alias est. Et corporis impedit voluptatem facilis ratione. Repellat inventore aliquam quisquam magni. Reiciendis necessitatibus sed dolor dolor inventore praesentium architecto. Dolorem rerum qui asperiores illum provident ipsum optio. Suscipit in vitae nam ullam eos. Et minus quis nam libero fugit asperiores. Adipisci at ut nostrum repudiandae. Nobis quidem asperiores voluptatem ut maiores. Magni voluptates ea ut tempore asperiores. Quaerat et corporis consectetur ea. Omnis est omnis beatae ipsum minima soluta. Corrupti voluptatem recusandae quia illo et voluptatem. Ipsam accusantium non eum velit consequuntur ab maxime. Vel et qui et nulla et. Nisi tempora hic amet qui eum. Voluptate dolores reiciendis asperiores voluptatem. Nulla atque eum itaque animi. Qui voluptas neque iure ullam distinctio consectetur nulla. Est voluptate qui beatae accusantium perferendis. Fuga nesciunt incidunt voluptatum et omnis sed. Ut voluptatum amet voluptas hic dolor veritatis nam molestiae. Eligendi voluptatem et quas quas enim et omnis. Vero sed commodi sit repellendus. Odit alias dicta dolor et enim.',NULL,0,'0',NULL,0,0,53,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,NULL,'',759,'1970-02-25','Nyaport','website',1,'1991-05-20 00:02:49','fa82ac77-d5d1-354c-9e9a-f6ab6e8166c4',3,1,0,NULL,1,1,1,1,NULL,'70.110.32.223','Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',NULL,640,480,NULL,'2018-07-05 00:00:00','2018-08-20 09:02:56',NULL),
	(40,'4PvFNkHxeF','accepted','story',NULL,NULL,273,6,7,5,'Vero ex sint officiis.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,786,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',396,NULL,NULL,'facebook',NULL,'2001-06-26 22:29:39','a097c3f1-4737-380a-a9a2-b87ea8417b95',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'73.204.1.6','Mozilla/5.0 (X11; Linux x86_64; rv:7.0) Gecko/20160917 Firefox/35.0',NULL,NULL,NULL,NULL,'2018-07-22 00:00:00','2018-08-20 09:02:56',NULL),
	(41,'TsqiYbvjyH','rejected','story',NULL,NULL,162,5,6,5,'Est numquam est.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,850,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','video/quicktime',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark-dirty.MOV','',1,NULL,'',255,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'175.41.52.250','Mozilla/5.0 (compatible; MSIE 8.0; Windows 98; Win 9x 4.90; Trident/3.0)',NULL,480,640,NULL,'2018-07-03 00:00:00','2018-08-20 09:02:56',NULL),
	(42,'HfqEjPHTkG','rejected','story',NULL,NULL,115,1,8,1,'Et error maiores modi fuga.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,114,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,NULL,'',99,NULL,NULL,'website',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'194.53.238.83','Mozilla/5.0 (X11; Linux x86_64; rv:5.0) Gecko/20150816 Firefox/37.0',NULL,640,480,NULL,'2018-07-14 00:00:00','2018-08-20 09:02:56',NULL),
	(43,'HjTfGJelqZ','rejected',NULL,NULL,NULL,15,8,3,3,'Quisquam aut eligendi possimus possimus.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,296,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',699,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'139.20.242.14','Opera/8.61 (Windows NT 4.0; sl-SI) Presto/2.8.332 Version/10.00',NULL,NULL,NULL,NULL,'2018-08-04 00:00:00','2018-08-20 09:02:56',NULL),
	(44,'HVv2fyzWt4','new','exceptional',NULL,NULL,147,4,2,4,'Voluptatum quia eos.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,611,'https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg','https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg',NULL,NULL,'https://twitter.com/AleReyes10/status/938830145263165440',NULL,NULL,NULL,'',NULL,NULL,'',940,NULL,NULL,'website',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'111.106.126.77','Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20100717 Firefox/35.0',NULL,NULL,NULL,NULL,'2018-07-03 00:00:00','2018-08-20 09:02:56',NULL),
	(45,'ckSNl8i9Mn','problem','exceptional',NULL,NULL,297,3,4,2,'Necessitatibus dolor nesciunt vel dicta.','ex','guest',NULL,'Facilis molestiae doloribus deserunt nam. Eius ut eaque id ex similique vitae animi sit. Neque nostrum quod ratione eum. Alias repudiandae quas qui aliquid reprehenderit quis. Ipsa in aut dolores sit vero laboriosam. Minima incidunt alias dicta modi ex qui. Blanditiis sint ipsum et. Deleniti eaque autem quis aut. Rerum nobis omnis delectus et autem sunt. Iste sunt eius quia ad. Molestiae doloribus quod ea esse est eligendi qui ipsa. Eveniet labore reprehenderit nisi sequi sunt amet. Qui beatae quo occaecati occaecati. Id nihil vero maiores totam aut ipsam sit. Laborum saepe magnam maiores est debitis. In aut molestiae et libero hic ut repellat. Enim hic iure laborum nobis. Esse consectetur quisquam sit dolorem voluptas culpa sit modi. Praesentium labore temporibus similique voluptas temporibus error. Debitis assumenda dolorum quae aut. Ipsam ad debitis dolorem. Eum enim inventore ab et quod harum. Minus est possimus nihil dignissimos ad architecto dicta. Et mollitia accusantium doloremque assumenda laudantium. Consectetur nesciunt et accusantium voluptas dignissimos a. Quam debitis illo aliquid neque libero. Animi est voluptas nostrum id sunt. Dolor consequatur autem possimus necessitatibus quia. Et aliquam esse similique voluptatem rerum quis aut eum. Repellendus et dignissimos nobis laboriosam soluta perferendis. Modi aspernatur hic cum quis officiis non commodi. Ipsa sed maxime quasi consectetur accusantium. Qui facere sed ut qui. Aut earum est et assumenda asperiores. Occaecati eum nostrum nobis. Consequatur sed sed in eos sit. Modi incidunt sequi vero tempora illo deleniti.',NULL,0,'0',NULL,1,0,613,'https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg','https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg',NULL,NULL,'https://www.youtube.com/watch?v=hI_J8rK9jyw',NULL,NULL,NULL,'',NULL,'hI_J8rK9jyw','',900,'1981-09-22','East Liam',NULL,1,'2016-02-07 05:22:10','58102e71-6f80-3fb6-ba1d-773e3650f60e',5,1,0,NULL,1,1,1,1,NULL,'104.178.112.222','Mozilla/5.0 (X11; Linux i686) AppleWebKit/5330 (KHTML, like Gecko) Chrome/37.0.882.0 Mobile Safari/5330',NULL,NULL,NULL,NULL,'2018-08-13 00:00:00','2018-08-20 09:02:56',NULL),
	(46,'7bIl8igVDs','problem','nuker',NULL,NULL,221,7,1,3,'Odit quaerat voluptatem amet quae aut.','exc','guest',NULL,'Consequatur aspernatur et aut totam eveniet. Quasi necessitatibus quia consequatur cupiditate quis. Enim voluptatum neque aliquid blanditiis nesciunt. Iure ipsam et voluptates nulla adipisci rerum explicabo et. Ipsum at quis fugit et. Perferendis corporis sint tempora voluptatem. Quam architecto nisi ut. Impedit explicabo deleniti aspernatur velit fugiat. Sed fugiat vitae voluptas possimus nobis. Iusto omnis et consequatur sit et. Id harum neque asperiores sit. Numquam aliquam ratione aspernatur omnis harum perspiciatis modi. Quam qui velit reprehenderit dolor facilis voluptatibus magnam. Assumenda aperiam quibusdam veritatis quo error cupiditate ut. Et ullam voluptas quisquam dolor molestiae. Labore similique nesciunt est et excepturi et soluta. Velit accusamus in delectus. Unde itaque alias perspiciatis harum porro at cupiditate. Magni pariatur voluptatum ex a nihil quis et. Reprehenderit nobis et laboriosam et et ipsam. Rerum blanditiis doloribus doloremque id laboriosam qui qui. Corporis consequatur odit voluptatem ea nostrum maiores eos. Consequatur porro est nam nulla et omnis. Et incidunt et sit. Voluptas molestiae sapiente nemo impedit. Laborum placeat et sunt dolore eligendi reprehenderit aspernatur. Molestias odit deserunt consequuntur et. Odit veritatis dolorem eos saepe facilis quia maxime. Alias reiciendis unde eligendi est nihil. Cum tempora voluptas est facilis maiores. Ipsa quisquam aut eum consequatur et. Et nihil corporis facilis. Occaecati eum est voluptatem architecto pariatur ipsa. Quibusdam aperiam occaecati commodi voluptate. In autem nesciunt sed quisquam. Incidunt quam modi dicta sunt et temporibus doloremque. Fuga et sint ducimus adipisci odio. Unde ea quibusdam vero voluptatum quis cumque. Omnis eos ipsum autem sint. Beatae qui a dignissimos et. Ad quae nihil repellat quia expedita voluptatibus. Dignissimos necessitatibus nostrum rerum sint. Enim aut accusamus praesentium magnam eos. Aut non iusto qui quasi. Amet a dolorem quis nemo molestias et sequi. Voluptatem possimus ratione molestias ipsa dolorem pariatur. Nulla velit deleniti ducimus sunt. Culpa ab maxime occaecati doloribus placeat. Et ratione aliquid quia quia illum aut. Vel eaque qui assumenda ipsam iure et culpa. Ad ipsum labore libero consectetur nobis expedita. Enim eos aut minus eum neque dolores. Temporibus adipisci pariatur ea cumque asperiores ipsa recusandae consequatur. Doloribus quo qui architecto accusamus sit nihil. In mollitia hic asperiores repellat qui. Dolor optio dolores optio ut quasi laboriosam omnis. Nesciunt excepturi libero occaecati velit sed earum ratione. Voluptas voluptatem et quod dolor ratione. Aut repellat possimus sapiente voluptatem debitis rerum aperiam. Repellat dolores molestiae quod est. In iure et non incidunt voluptas voluptas et. Quod in dolorem est ex ut. Beatae quaerat ullam quis. Qui consequatur sunt delectus illum. In ut quia magnam libero. Dolor corrupti sed dignissimos vitae ipsa enim quod. Enim neque omnis maxime.',NULL,0,'0',NULL,1,0,711,'https://graph.facebook.com/3761625000527198/picture','https://graph.facebook.com/3761625000527198/picture',NULL,NULL,'https://www.facebook.com/uniladmag/videos/3761625000527198/',NULL,NULL,NULL,'',NULL,NULL,'',231,'2016-06-04','North Tyree',NULL,1,'1985-03-01 17:29:51','672f7c14-d8d5-3802-88b6-d908df5244f2',2,1,0,NULL,1,1,1,1,NULL,'104.125.45.21','Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)',NULL,NULL,NULL,NULL,'2018-08-13 00:00:00','2018-08-20 09:02:56',NULL),
	(47,'l7FDMS53Z3','restricted','nuker',NULL,NULL,118,6,8,1,'Non labore fugit autem asperiores sapiente.','exc','guest',NULL,'Accusantium corporis omnis rem nihil. Corrupti culpa qui ex omnis illo et vitae. Qui aliquam nesciunt fuga non cum repellendus quos sed. Exercitationem consequatur quasi ut repudiandae. Tempore in nesciunt sunt occaecati. Odio cupiditate culpa aut sit voluptas repellendus. Iste alias quaerat dolores facere est perferendis at. Et soluta voluptatem est non deleniti. Incidunt recusandae quaerat corrupti aut sit placeat. Dolorem quia iste qui neque. Ut ut est ratione eaque eos blanditiis. Consequuntur repellendus et numquam enim asperiores soluta quia. Molestiae commodi vero reprehenderit deserunt. Id sit deserunt praesentium eaque soluta in. A qui cupiditate reiciendis magnam. Explicabo voluptas illo quos quod omnis modi. Qui voluptatem vel repellendus delectus quo. Id quia quam omnis non. Dolor officia sapiente aut ex. Pariatur est ex natus facilis impedit minima. Esse quia sequi eius voluptas sunt cum. Et ad praesentium earum ipsa voluptatem. Aliquam ipsum officia et aut repellendus consequatur provident. Eius ullam illo vero dolores voluptatem cupiditate. Qui dolor voluptatum enim perspiciatis. Magni veritatis itaque veritatis sit. Unde atque unde consequatur ad architecto fuga. Qui beatae molestiae expedita ducimus saepe omnis iusto. Impedit non ad adipisci saepe. Illo voluptates autem ut libero sed perferendis libero. Fugit rerum expedita voluptatem culpa ut vero. Sint quaerat repellendus repellat sequi. Voluptate ipsa sed voluptas magnam. Esse non ex reprehenderit accusantium illo id esse totam. Odio aut et quisquam aut cum dolorem. Harum porro sunt qui quibusdam cum ex facere. Sed temporibus eum ipsum eos. Officia cumque quos temporibus voluptates vel aspernatur. Quia at occaecati ut et. Deserunt debitis magni ipsam architecto architecto. Laudantium rerum dolorem est. Magni voluptatem unde possimus sunt aut. Rerum molestiae accusantium omnis animi reiciendis repellendus. Voluptates numquam delectus officia quam impedit distinctio. Debitis libero at et veritatis iure fugit consectetur. Similique sunt suscipit alias sapiente atque itaque. Dolores voluptas atque excepturi nihil eos delectus. Quis aut corrupti alias reiciendis nam dolore. Sit enim magnam corporis fugit ab beatae.',NULL,0,'0',NULL,1,0,12,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-00001.jpg','video/mp4',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark.mp4','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525906422-vid-20180509-wa0000-watermark-dirty.mp4','',0,NULL,'',102,'1996-08-26','South Mafalda',NULL,1,'1984-06-02 08:48:09','4c26d8c7-09a4-3ac3-aa88-43b16cc64f9d',5,1,1,'lad book',1,1,1,1,NULL,'61.75.115.142','Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_8_3 rv:2.0; en-US) AppleWebKit/533.32.4 (KHTML, like Gecko) Version/4.0 Safari/533.32.4',NULL,640,480,NULL,'2018-08-02 00:00:00','2018-08-20 09:02:56',NULL),
	(48,'Fgf8vWESZ4','rejected','big-story',NULL,NULL,115,3,8,4,'Eveniet corporis et repudiandae repudiandae.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,630,'https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg','https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg',NULL,NULL,'https://www.youtube.com/watch?v=hI_J8rK9jyw',NULL,NULL,NULL,'',NULL,'hI_J8rK9jyw','',476,NULL,NULL,'facebook',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'179.140.208.21','Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_1 like Mac OS X; sl-SI) AppleWebKit/534.36.7 (KHTML, like Gecko) Version/3.0.5 Mobile/8B111 Safari/6534.36.7',NULL,NULL,NULL,NULL,'2018-08-06 00:00:00','2018-08-20 09:02:56',NULL),
	(49,'yXELeyiGf1','problem','big-story',NULL,NULL,179,4,10,1,'Debitis id quo laboriosam.','exc','guest',NULL,'Et consequatur debitis vel ut earum tempora. Ut numquam sint quod itaque. Ipsa et sit rerum molestiae et. Architecto ratione est ea magnam ea facere. Totam illum tempora incidunt aut. Consequatur ipsa dolor nam qui quaerat impedit pariatur. Inventore velit molestias dolores quia explicabo. Eum ea suscipit nesciunt vel. Molestias ab quam quam consequatur. Veniam quia iste itaque velit eveniet aut soluta. Ut praesentium iure aliquid. Dolores dicta esse odio labore tempora vel officia iusto. Rerum eius odit dolore dolorum optio eveniet itaque. Ut odio iste ipsum. Unde et sint quia rerum. Delectus atque vitae accusamus id consequatur iste. Dolor unde ea rerum ut. Ut quod reprehenderit sint qui. Distinctio est veritatis cum. Rem quas id provident ea molestias architecto cumque. Reiciendis ab laborum et blanditiis est occaecati. Vero odio nemo ut distinctio tempora alias minus quam. Et nam consequatur natus et. Quod ut ullam fuga suscipit consequatur. Consectetur aliquam id commodi corporis. Vel saepe sint alias sunt eos. Exercitationem eum sed impedit consequuntur porro cum voluptatem. Corporis ut itaque magni quisquam tempore. Ratione in id eos sunt dolorem. Consequatur fugiat aspernatur ipsum omnis architecto laboriosam. Deleniti accusamus nisi exercitationem sed aut id. Doloremque perferendis autem praesentium. Quidem quaerat cum modi enim dolores voluptas. Et doloribus eveniet reiciendis dolor sint. Ut et error ad voluptas aut. Quia placeat fugiat aut amet dolore. Aliquid corrupti rerum ex nam quae enim quas. Impedit temporibus expedita ipsam ab quia minima consequatur. Dignissimos at eum modi dolores. A et deleniti est est tempora. Repellat odio iusto illum laborum. Dignissimos rem est beatae occaecati sunt. Quod et et aliquam hic perferendis nisi. Sit accusantium inventore quis a adipisci sequi ullam. Esse accusantium cum ab eligendi eos. Est earum vel neque repudiandae qui. Ea qui sit eos ut hic non. Magni laborum nihil dolores aut. Quidem officia sed ullam eum quo. Ab et tempore eius. Rerum id explicabo quo deserunt. Quaerat architecto quibusdam velit tempore alias. Nobis dolores quis ducimus et. Mollitia sapiente porro est qui ex inventore laudantium repellat. Aut enim dolor quas rerum dolorem impedit nihil esse. Harum iste voluptatem explicabo quis. Maiores accusamus animi deleniti. Praesentium quidem error animi commodi aut harum. Sit voluptas porro molestias asperiores illo consectetur et reprehenderit. Autem autem quidem ab architecto ipsa doloribus. Incidunt eligendi rerum eos. Id ut earum eos unde. Aspernatur voluptatem expedita debitis nihil laudantium non labore temporibus. Ut omnis consectetur velit et quam adipisci. Quasi vel fugit excepturi similique. Atque facere tempora rem voluptas.',NULL,0,'0',NULL,1,0,181,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','video/quicktime',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark-dirty.MOV','',1,NULL,'',814,'2010-11-04','Boyleview','facebook',1,'2014-12-21 10:09:18','95416eda-720e-39e2-bc25-beadebbaf5ac',7,1,1,'viral site',1,1,1,1,NULL,'128.10.123.254','Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_7_7 rv:3.0; sl-SI) AppleWebKit/531.44.3 (KHTML, like Gecko) Version/5.1 Safari/531.44.3',NULL,480,640,NULL,'2018-06-21 00:00:00','2018-08-20 09:02:56',NULL),
	(50,'KB5vBmL1gV','new','nuker',NULL,NULL,300,2,1,1,'Sed vitae qui placeat.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,366,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-00001.jpg','video/quicktime',NULL,NULL,'https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark.MOV','https://vlp-storage.s3.eu-west-1.amazonaws.com/1525911183-d7560649-2bcb-4767-8581-a6f6dc2a63b5-watermark-dirty.MOV','',1,NULL,'',450,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'16.160.16.240','Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_0 rv:3.0; en-US) AppleWebKit/535.23.4 (KHTML, like Gecko) Version/5.0.5 Safari/535.23.4',NULL,480,640,NULL,'2018-07-09 00:00:00','2018-08-20 09:02:56',NULL),
	(51,'HrQD5ZYvnM','pending','exceptional',NULL,NULL,184,6,5,3,'Aut occaecati doloremque aut.','exc','guest',NULL,'Quo illum animi rerum excepturi dicta et. Autem excepturi illum eveniet modi explicabo dolores assumenda debitis. Animi culpa alias minima eos aspernatur eos. Vero id corrupti enim qui voluptas rerum quibusdam. Est sit ut libero sint. Provident quidem a voluptas non id odio neque. Sunt vitae deserunt autem. Voluptatem blanditiis corporis nostrum quos blanditiis. Aliquid libero omnis voluptatem aut cum. Repellat reiciendis in id totam. Impedit vero aliquam et dolore doloremque. Soluta quas modi blanditiis voluptas. Impedit sint voluptatibus eaque iste culpa quo. Voluptatibus eligendi ratione unde non harum. Sit omnis incidunt ut excepturi vel est. Perspiciatis sed repellendus temporibus fugiat ex. Recusandae harum vel tempora voluptatibus sapiente. Et commodi maxime voluptatem omnis possimus molestiae doloremque. Nemo suscipit non dolore velit et. Voluptatibus et nobis deleniti ducimus ut laborum. In molestiae enim rerum et. Sequi ea et quis ipsa nulla nulla et. Voluptatem laboriosam qui cupiditate consectetur. Assumenda fuga officiis qui repellat corrupti. Vel ducimus numquam totam adipisci soluta quaerat. Molestiae saepe incidunt quas quo laudantium ipsum ut. Laudantium tempore et enim quisquam autem voluptas. Fugiat delectus suscipit necessitatibus non est. Voluptatum eum suscipit ipsum ipsum et dolorum sit. Id cum distinctio sit aliquam ullam exercitationem non quia. Non eos id voluptas harum culpa est impedit. Aut ut minus incidunt omnis accusantium dolorem. Omnis deserunt debitis sit aut aut repudiandae reprehenderit. Sint quo et ipsam voluptatibus rerum minima id dignissimos. Dolor et ullam aut eligendi nobis et.',NULL,0,'0',NULL,1,0,821,'https://graph.facebook.com/3761625000527198/picture','https://graph.facebook.com/3761625000527198/picture',NULL,NULL,'https://www.facebook.com/uniladmag/videos/3761625000527198/',NULL,NULL,NULL,'',NULL,NULL,'',557,'1986-08-29','Keelingbury',NULL,1,'1978-05-02 06:32:07','c88dcf0e-be44-3206-a3df-270b45211f34',3,1,1,'lad book',1,1,1,1,NULL,'234.252.72.4','Mozilla/5.0 (compatible; MSIE 7.0; Windows 98; Trident/3.1)',NULL,NULL,NULL,NULL,'2018-08-12 00:00:00','2018-08-20 09:02:56',NULL),
	(52,'MDiZdwNeRX','accepted','exceptional',NULL,NULL,156,6,3,2,'Ut quia quidem iure.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,352,'https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg','https://pbs.twimg.com/ext_tw_video_thumb/938830057551753218/pu/img/nEXIVX9oFViS2lYf.jpg',NULL,NULL,'https://twitter.com/AleReyes10/status/938830145263165440',NULL,NULL,NULL,'',NULL,NULL,'',875,NULL,NULL,'facebook',NULL,'1993-03-25 13:31:44','ca8d88df-2a9d-32bb-bb3c-0c5395a56c4d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'19.146.124.36','Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/5.0)',NULL,NULL,NULL,NULL,'2018-07-20 00:00:00','2018-08-20 09:02:56',NULL),
	(53,'fIHwgZmMyl','problem',NULL,NULL,NULL,80,7,5,3,'Quo fugiat impedit.','exc','guest',NULL,'Sed ea omnis rem veniam voluptatum aspernatur qui. Similique aut quo quasi dolor esse. Adipisci minima qui sunt dolorem iure velit aut. Magni reiciendis qui excepturi officia optio officia quasi. Et maiores illo aut nisi temporibus. Quis sed veritatis eum cum repellendus qui quasi sint. Ratione dolor maxime perspiciatis cum. Aut architecto ipsum voluptate consequatur eveniet. Aut molestiae molestiae est quaerat. Laborum dolor ipsa molestiae impedit consectetur tempora aut eveniet. Distinctio sed vero non et aut debitis. Illum veritatis aut soluta nihil amet praesentium et ipsum. Iste quae adipisci soluta quia nisi voluptas odio. Dolorem veniam et quam sunt. Nemo voluptatem voluptatem non dolor perferendis tempora. Cum quia dolor velit earum similique quo id voluptas. Voluptas et et iusto. Expedita at omnis qui voluptas nobis iste aut. Recusandae voluptatum voluptatem provident sunt assumenda quo corrupti. Doloribus vel voluptatum totam facilis molestiae aut exercitationem quidem. Sit doloribus sapiente autem itaque suscipit atque. Omnis consectetur voluptatibus facilis accusamus voluptates et dolores. Aspernatur voluptates consequuntur autem doloremque. Magnam iusto quis quia accusantium. Voluptatem quo et autem consequatur autem quia quam. Id dolor illo ea ut. Ipsam quo sunt beatae omnis. Et dolorem omnis sint. Voluptas aperiam temporibus aut molestiae dolor quia. Facilis beatae placeat aut totam. Facere error ut cumque quia. Laudantium sunt repellendus quia qui amet voluptatibus. Voluptas et officia aperiam. Veritatis eligendi incidunt veniam aut aut molestiae. Expedita et illum numquam soluta. Architecto harum earum dicta ex facere. Eos assumenda est cum atque assumenda repellendus cum.',NULL,0,'0',NULL,1,0,571,'https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg','https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg',NULL,NULL,'https://www.youtube.com/watch?v=hI_J8rK9jyw',NULL,NULL,NULL,'',NULL,'hI_J8rK9jyw','',288,'2001-10-19','Blandaburgh','website',1,'1992-11-05 00:43:11','6b1ea043-4ddd-3eab-8e48-d49542ec0b0f',4,1,1,'viral site',1,1,1,1,NULL,'176.199.78.202','Mozilla/5.0 (X11; Linux x86_64; rv:7.0) Gecko/20140419 Firefox/36.0',NULL,NULL,NULL,NULL,'2018-07-31 00:00:00','2018-08-20 09:02:56',NULL),
	(54,'NKCHJQLwm7','problem','story',NULL,NULL,219,4,4,2,'Enim eos aliquam nesciunt earum.','ex','guest',NULL,'Ea deserunt deserunt nemo voluptatem ut repellendus. Dolor laudantium repudiandae sit optio ut. Unde et inventore sit. Animi et aut eum temporibus ipsam. Quisquam ut non asperiores laudantium ex. Velit cupiditate nisi dolores et facere animi voluptates provident. Accusantium totam magnam est. Ea ullam pariatur sit non qui quo quas sequi. Beatae quis necessitatibus beatae labore ut laudantium eum. Voluptates rerum ab et debitis. Qui quo sint culpa ratione. Quia nesciunt amet dolores quia ipsa ut incidunt. Quisquam qui esse ut amet sapiente ad. Quod ab molestias officia distinctio. Consequatur sed doloribus aut non sunt facilis. Voluptatibus eveniet officia enim nulla quia qui. Aut vel incidunt tempore est. Ut maiores voluptatum veritatis eum voluptatem molestias. Recusandae ut pariatur sapiente laudantium velit molestias. Ut voluptatem nisi atque officia. Pariatur distinctio consequatur non dolorum. Ea neque itaque odio molestiae cupiditate. Qui enim est impedit accusamus nihil pariatur ipsa. Sapiente est sint nostrum consequatur autem. Mollitia enim quasi eaque cumque consequatur. Hic voluptas ducimus deserunt aut molestiae mollitia voluptate. Nihil ut consectetur qui dignissimos ut. Praesentium in occaecati omnis reprehenderit aliquid facere quis. Rerum sit sit autem eum et amet similique. Voluptates occaecati accusamus in sint nostrum. Rerum delectus aut maiores. Accusamus quia asperiores quod molestias ab. Consequatur illo ratione delectus consectetur explicabo. Autem molestias velit reiciendis et voluptatibus rem voluptas. A a qui perferendis et ex et. Et et et perferendis animi molestiae ut. Doloremque blanditiis repellat corporis aut reprehenderit. Nulla voluptatem non aut assumenda vero pariatur. Et omnis et omnis magni expedita facilis dolore. Sit nihil repellat sunt ut id in. Ipsum iure culpa vel neque illum. Occaecati rerum sint dolore quisquam debitis alias. Repellendus qui reprehenderit non aspernatur omnis saepe expedita reprehenderit. Quibusdam quis ex ut. Sit distinctio exercitationem ab placeat. Quidem asperiores unde vel quo. Sint fuga omnis numquam. Id cumque et est culpa. Sit nulla et amet est. In laborum magnam ullam quia et id. Natus expedita amet facilis placeat libero dicta omnis. Id tempora magnam illo enim recusandae et sed. Quis velit consequatur sint deleniti. Est eum fugiat quod voluptatem. Id consequatur est dolorum voluptatem voluptas. Sed maiores quia quos quo repellendus.',NULL,0,'0',NULL,0,0,94,'https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg','https://img.youtube.com/vi/hI_J8rK9jyw/hqdefault.jpg',NULL,NULL,'https://www.youtube.com/watch?v=hI_J8rK9jyw',NULL,NULL,NULL,'',NULL,'hI_J8rK9jyw','',177,'1987-07-19','Port Cleora','facebook',1,'1986-03-16 15:52:48','a21e05a1-23f3-3614-9b4b-037e47774ca6',2,1,1,'viral site',1,1,1,1,NULL,'84.234.50.194','Opera/9.77 (X11; Linux x86_64; sl-SI) Presto/2.9.291 Version/10.00',NULL,NULL,NULL,NULL,'2018-08-02 00:00:00','2018-08-20 09:02:56',NULL),
	(55,'pq9CrXl2dJ','accepted','exceptional',NULL,NULL,169,4,5,5,'Nihil eum non eius similique.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,681,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',229,NULL,NULL,'facebook',NULL,'1998-04-22 12:23:27','ed48cea8-e867-3a45-a3b5-42a345eb0266',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'155.236.242.184','Mozilla/5.0 (compatible; MSIE 6.0; Windows NT 5.01; Trident/4.0)',NULL,NULL,NULL,NULL,'2018-07-16 00:00:00','2018-08-20 09:02:56',NULL),
	(56,'mcKxL9Ttp8','new',NULL,NULL,NULL,64,3,10,4,'Dolorum veniam deserunt animi rerum.','ex','guest',NULL,NULL,NULL,0,'0',NULL,1,0,941,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',107,NULL,NULL,'facebook',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'255.246.47.51','Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6 rv:5.0; sl-SI) AppleWebKit/532.30.3 (KHTML, like Gecko) Version/4.1 Safari/532.30.3',NULL,NULL,NULL,NULL,'2018-07-24 00:00:00','2018-08-20 09:02:56',NULL),
	(57,'Vblf6EJLyN','new','random',NULL,NULL,179,2,8,2,'Alias et beatae quo ut.','exc','guest',NULL,NULL,NULL,0,'0',NULL,1,0,250,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',412,NULL,NULL,'website',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'243.127.157.22','Opera/8.92 (Windows NT 5.1; en-US) Presto/2.10.283 Version/12.00',NULL,NULL,NULL,NULL,'2018-08-02 00:00:00','2018-08-20 09:02:56',NULL),
	(58,'jym5VIfred','restricted','big-story',NULL,NULL,43,2,9,3,'Quos nobis est voluptatum.','ex','guest',NULL,'Nam molestiae sed atque voluptates sed earum. Aliquid eveniet nihil alias impedit iure in. Ipsa aliquid aut natus qui. Eius molestias quia fugit modi incidunt. Facere eos quibusdam enim nisi inventore velit commodi harum. Ratione eum earum voluptas et excepturi. Modi saepe aut officia voluptas. Ad qui consectetur aut repellat. Similique corrupti odio aliquid odio. Id sint non hic in fugit consequatur rem. Molestiae sed autem id cupiditate et quo. Explicabo soluta nostrum quae ut eius nihil error et. Vero nisi aut impedit repellat illum. Eos quaerat enim facere iure ea dolorem. Minima minus dolore atque eos. Veritatis nesciunt quia vitae repudiandae quis ut culpa odit. Qui nihil culpa enim illo dolor est accusamus et. Dolor natus aliquid illum vel aut dolorem. Illum eos aut accusamus soluta nulla a consequuntur. Qui optio libero corrupti qui dolores. Molestiae perspiciatis hic sed et ullam dignissimos. Reiciendis accusantium aut ipsam ut sapiente dicta laboriosam. Nihil aut totam ullam rerum tempore distinctio. Harum omnis cum blanditiis adipisci reprehenderit corrupti numquam facere. Praesentium quod sunt expedita repellendus voluptas quisquam nemo necessitatibus. Optio inventore nulla repellat consequatur voluptate. Fugiat sapiente repudiandae veritatis hic. Et sed delectus exercitationem. Sequi voluptas dignissimos et totam sint consequatur tempore. Quia vel repellendus laborum quasi ullam. Consequatur est quaerat et dolore tenetur. Odit ut nesciunt quod architecto reprehenderit reprehenderit. Accusamus qui qui est est vero. Distinctio et praesentium blanditiis. Ut et enim et et eos. Deleniti odio necessitatibus dolorem rerum. Sunt numquam atque quod atque architecto. Atque qui facere earum voluptas unde sint. Tempora eum beatae placeat tempora est veritatis provident. Incidunt libero culpa harum quisquam omnis impedit. Voluptate id itaque culpa aut eos maxime et. Labore et voluptas et illo consequatur veritatis repellat corporis. Tempora corporis excepturi expedita ea voluptatem fuga facere. Dicta placeat autem corrupti hic dolorem est. Accusantium sunt et rem dicta cupiditate consequatur.',NULL,0,'0',NULL,1,0,543,'','',NULL,NULL,'https://vimeo.com/channels/staffpicks/222582596',NULL,NULL,NULL,'',NULL,NULL,'',402,'2016-04-26','Lake Camrenland','facebook',1,'1995-10-10 01:42:20','742923d5-21b3-3bd7-b025-6acbbb1b80ac',0,1,1,'viral site',1,1,1,1,NULL,'231.114.85.131','Opera/8.42 (Windows NT 5.0; en-US) Presto/2.8.322 Version/11.00',NULL,NULL,NULL,NULL,'2018-06-25 00:00:00','2018-08-20 09:02:56',NULL);

/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table youtube_access_tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `youtube_access_tokens`;

CREATE TABLE `youtube_access_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `access_token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
