# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.2.10-MariaDB)
# Database: videoapp
# Generation Time: 2018-01-16 09:42:27 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table cache
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cache`;

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL,
  UNIQUE KEY `cache_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table campaign_video
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campaign_video`;

CREATE TABLE `campaign_video` (
  `video_id` int(11) unsigned DEFAULT NULL,
  `campaign_id` int(11) unsigned DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table campaigns
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campaigns`;

CREATE TABLE `campaigns` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `campaigns` WRITE;
/*!40000 ALTER TABLE `campaigns` DISABLE KEYS */;

INSERT INTO `campaigns` (`id`, `client_id`, `name`, `slug`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(1,2,'Thirsty Moments','thirsty-moments',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(2,1,'Daily Mail Dailies','daily-mail-dailies',NULL,'2017-11-30 17:54:43','2017-11-30 17:54:43'),
	(3,1,'Unused Campaign','unused-campaign',NULL,'2018-01-12 15:04:45','2018-01-12 15:04:45');

/*!40000 ALTER TABLE `campaigns` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table clients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;

INSERT INTO `clients` (`id`, `name`, `slug`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(1,'Daily Mail','daily-mail',NULL,'2017-11-22 17:26:56','2017-12-04 18:03:35'),
	(2,'Fosters','fosters',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56');

/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `moderated` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table contacts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contacts`;

CREATE TABLE `contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paypal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `other` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;

INSERT INTO `contacts` (`id`, `first_name`, `last_name`, `email`, `tel`, `language`, `location`, `paypal`, `facebook`, `youtube`, `instagram`, `twitter`, `other`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(1,'Ian','Lainchbury','ian@unilad.co.uk','+447895752108',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-03 10:45:19','2018-01-15 13:39:31'),
	(2,'Ian','Lainchbury','text@example.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-03 12:12:46','2018-01-03 12:12:46'),
	(3,'Test','Test','test@example.com','+447895752108',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-03 12:25:55','2018-01-12 12:57:41'),
	(4,'yo','yo','yo@example.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-04 09:24:14','2018-01-04 09:24:14'),
	(5,'Mike','Wright','mike.filmworks@gmail.com','+447782497004',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-04 17:50:21','2018-01-09 11:04:00'),
	(6,'Moo','Moo','moo@example.com','+447885752108',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-11 14:12:51','2018-01-11 18:04:05'),
	(7,'Test','Test','test@unilad.co.uk',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-15 12:38:38','2018-01-15 12:38:38'),
	(8,'Joe','Bloggs','joe@unillad.co.uk','+447890000000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-15 13:36:59','2018-01-15 13:40:31'),
	(9,'Mike','Wrifght','mike@unilad.co.uk',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-15 13:48:24','2018-01-15 13:48:24');

/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table downloads
# ------------------------------------------------------------

DROP TABLE IF EXISTS `downloads`;

CREATE TABLE `downloads` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `client_id` int(11) unsigned NOT NULL,
  `video_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table failed_jobs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table favorites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `favorites`;

CREATE TABLE `favorites` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table jobs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `jobs`;

CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
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
  `order` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `type` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;

INSERT INTO `menu` (`id`, `parent_id`, `order`, `name`, `url`, `type`, `created_at`, `updated_at`)
VALUES
	(3,NULL,1,'Home','/','none','2015-01-06 03:52:06','2015-02-05 14:09:07'),
	(4,NULL,4,'Pages','/pages','none','2015-01-06 04:33:01','2017-11-29 12:06:15'),
	(5,4,5,'F.A.Q.s','/page/faq','none','2015-01-07 18:26:13','2017-11-29 12:06:15'),
	(11,NULL,2,'Videos','','videos','2015-01-11 02:14:53','2017-11-29 12:06:15'),
	(12,NULL,3,'Posts','','posts','2015-01-11 02:16:26','2017-11-29 12:06:15');

/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;


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
	(2,'2015_05_06_194030_create_youtube_access_tokens_table',1),
	(3,'2018_01_09_104232_create_jobs_table',2),
	(4,'2018_01_09_104248_create_failed_jobs_table',2);

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pages`;

CREATE TABLE `pages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `body` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;

INSERT INTO `pages` (`id`, `user_id`, `title`, `slug`, `body`, `active`, `created_at`, `updated_at`)
VALUES
	(1,1,'Frequently Asked Questions','faq','<div style=\"width: 47%; margin-right: 3%; float: left; height: 270px;\">\r\n<p class=\"theme_color_background\" style=\"padding: 10px; color: #fff; border-radius: 5px; font-weight: bold; font-size: 16px; text-align: center;\">What is HelloVideo?</p>\r\n<p style=\"color: #8a929d; font-size: 14px;\">Hello Video is a Premium Video Content Management System. As an admin you\'ll be able to add Videos and Articles to your website. You can choose to make your content available for free or only to subscribers. You can link a <a href=\"http://www.stripe.com\" target=\"_blank\">Stripe</a> account to your site and allow for users to subscribe to your site and unlock the premium content. You add your videos, add your articles, add your price point, and you rake in money from your subscribers</p>\r\n</div>\r\n<div style=\"width: 47%; margin-left: 3%; float: left; height: 270px;\">\r\n<p class=\"theme_color_background\" style=\"padding: 10px 20px; color: #fff; border-radius: 5px; font-weight: bold; font-size: 16px; text-align: center;\">What is HelloVideo?</p>\r\n<p style=\"color: #8a929d; font-size: 14px;\">Hello Video is a Premium Video Content Management System. As an admin you\'ll be able to add Videos and Articles to your website. You can choose to make your content available for free or only to subscribers. You can link a <a href=\"http://www.stripe.com\" target=\"_blank\">Stripe</a> account to your site and allow for users to subscribe to your site and unlock the premium content. You add your videos, add your articles, add your price point, and you rake in money from your subscribers</p>\r\n</div>\r\n<div style=\"width: 47%; margin-right: 3%; float: left; height: 270px;\">\r\n<p class=\"theme_color_background\" style=\"padding: 10px 20px; color: #fff; border-radius: 5px; font-weight: bold; font-size: 16px; text-align: center;\">What is HelloVideo?</p>\r\n<p style=\"color: #8a929d; font-size: 14px;\">Hello Video is a Premium Video Content Management System. As an admin you\'ll be able to add Videos and Articles to your website. You can choose to make your content available for free or only to subscribers. You can link a <a href=\"http://www.stripe.com\" target=\"_blank\">Stripe</a> account to your site and allow for users to subscribe to your site and unlock the premium content. You add your videos, add your articles, add your price point, and you rake in money from your subscribers</p>\r\n</div>\r\n<div style=\"width: 47%; margin-left: 3%; float: left; height: 270px;\">\r\n<p class=\"theme_color_background\" style=\"padding: 10px 20px; color: #fff; border-radius: 5px; font-weight: bold; font-size: 16px; text-align: center;\">What is HelloVideo?</p>\r\n<p style=\"color: #8a929d; font-size: 14px;\">Hello Video is a Premium Video Content Management System. As an admin you\'ll be able to add Videos and Articles to your website. You can choose to make your content available for free or only to subscribers. You can link a <a href=\"http://www.stripe.com\" target=\"_blank\">Stripe</a> account to your site and allow for users to subscribe to your site and unlock the premium content. You add your videos, add your articles, add your price point, and you rake in money from your subscribers</p>\r\n</div>\r\n<div style=\"width: 47%; margin-right: 3%; float: left; height: 270px;\">\r\n<p class=\"theme_color_background\" style=\"padding: 10px 20px; color: #fff; border-radius: 5px; font-weight: bold; font-size: 16px; text-align: center;\">What is HelloVideo?</p>\r\n<p style=\"color: #8a929d; font-size: 14px;\">Hello Video is a Premium Video Content Management System. As an admin you\'ll be able to add Videos and Articles to your website. You can choose to make your content available for free or only to subscribers. You can link a <a href=\"http://www.stripe.com\" target=\"_blank\">Stripe</a> account to your site and allow for users to subscribe to your site and unlock the premium content. You add your videos, add your articles, add your price point, and you rake in money from your subscribers</p>\r\n</div>\r\n<div style=\"width: 47%; margin-left: 3%; float: left; height: 270px;\">\r\n<p class=\"theme_color_background\" style=\"padding: 10px 20px; color: #fff; border-radius: 5px; font-weight: bold; font-size: 16px; text-align: center;\">What is HelloVideo?</p>\r\n<p style=\"color: #8a929d; font-size: 14px;\">Hello Video is a Premium Video Content Management System. As an admin you\'ll be able to add Videos and Articles to your website. You can choose to make your content available for free or only to subscribers. You can link a <a href=\"http://www.stripe.com\" target=\"_blank\">Stripe</a> account to your site and allow for users to subscribe to your site and unlock the premium content. You add your videos, add your articles, add your price point, and you rake in money from your subscribers</p>\r\n</div>',1,'2015-01-10 03:47:27','2015-02-05 14:05:39');

/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table password_resets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table payment_settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment_settings`;

CREATE TABLE `payment_settings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `live_mode` tinyint(1) NOT NULL DEFAULT 0,
  `test_secret_key` varchar(100) NOT NULL DEFAULT '',
  `test_publishable_key` varchar(100) NOT NULL DEFAULT '',
  `live_secret_key` varchar(100) NOT NULL DEFAULT '',
  `live_publishable_key` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `payment_settings` WRITE;
/*!40000 ALTER TABLE `payment_settings` DISABLE KEYS */;

INSERT INTO `payment_settings` (`id`, `live_mode`, `test_secret_key`, `test_publishable_key`, `live_secret_key`, `live_publishable_key`)
VALUES
	(1,0,'','','','');

/*!40000 ALTER TABLE `payment_settings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table plugin_data
# ------------------------------------------------------------

DROP TABLE IF EXISTS `plugin_data`;

CREATE TABLE `plugin_data` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `plugin_slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `value` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `plugin_data` WRITE;
/*!40000 ALTER TABLE `plugin_data` DISABLE KEYS */;

INSERT INTO `plugin_data` (`id`, `plugin_slug`, `key`, `value`, `created_at`, `updated_at`)
VALUES
	(1,'hello','value1','asdfasdf','2015-06-12 03:57:47','2015-06-12 04:02:47'),
	(2,'hello','_token','m2CP6Lp6rXfQZLxcFkTZSEwqnwMDDszJzYEvsEGd','2015-06-12 03:57:47','2015-06-12 03:57:47'),
	(3,'hello','value2','testval212312312f','2015-06-12 22:01:02','2015-06-12 22:01:51');

/*!40000 ALTER TABLE `plugin_data` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table plugins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `plugins`;

CREATE TABLE `plugins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `plugins` WRITE;
/*!40000 ALTER TABLE `plugins` DISABLE KEYS */;

INSERT INTO `plugins` (`id`, `name`, `description`, `version`, `slug`, `active`, `created_at`, `updated_at`)
VALUES
	(3,'Hello','This is an example plugin for HelloVideo','1.0','hello',1,'2015-06-12 03:50:47','2015-06-12 03:50:47');

/*!40000 ALTER TABLE `plugins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table post_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post_categories`;

CREATE TABLE `post_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `post_categories` WRITE;
/*!40000 ALTER TABLE `post_categories` DISABLE KEYS */;

INSERT INTO `post_categories` (`id`, `parent_id`, `order`, `name`, `slug`, `created_at`, `updated_at`)
VALUES
	(6,NULL,1,'Example Category 1','example-category-1','2015-01-04 01:15:33','2015-02-05 14:08:36'),
	(7,NULL,3,'Example Category 2','example-category-2','2015-01-04 01:16:27','2015-02-05 14:08:33'),
	(8,6,2,'Example Sub-category 1','example-sub-category-1','2015-01-04 01:16:42','2015-02-05 14:08:36');

/*!40000 ALTER TABLE `post_categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table posts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `post_category_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(255) NOT NULL DEFAULT '',
  `body` mediumtext NOT NULL,
  `body_guest` mediumtext DEFAULT NULL,
  `access` varchar(20) NOT NULL DEFAULT 'guest',
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;

INSERT INTO `posts` (`id`, `post_category_id`, `user_id`, `title`, `slug`, `image`, `body`, `body_guest`, `access`, `active`, `created_at`, `updated_at`)
VALUES
	(1,6,1,'Example Post 1','example-post-1','January2015/example-post-1.jpg','<p>This is an example post. You can blog about anything related to your video site. You can blog about anything interesting that your audience might find beneficial. You can create new posts from your admin section and add as much text, images, links, and content as you would like.</p>\r\n<p><strong>Here is an example Bold Text Paragraph. And below is an example image :)</strong></p>\r\n<p><img title=\"Example Post 1\" src=\"/content/uploads/images/January2015/FILE-20150103-1715FX2CPTHWAFHR.jpg\" alt=\"\" width=\"100%\" height=\"auto\" /></p>\r\n<p>Add many posts to add value to your site and increase your sites SEO value. Creating new posts is a breeze with our Simple to use WYSIWYG editor and easy to use admin section. Checkout a quick screenshot of this article being created below:</p>\r\n<p><img title=\"Example Post 1\" src=\"/content/uploads/images/January2015/FILE-20150103-18154RYZ152RD692.jpg\" alt=\"\" width=\"100%\" height=\"auto\" /></p>','','guest',1,'2015-01-04 01:10:21','2015-01-10 16:24:23'),
	(2,7,1,'Example Post 2','example-post-2','January2015/example-post-2.jpg','<p>This is yet another example post. In this post I\'ll Show a few more things that can be added to a post. Such as different headers and styled&nbsp;text.</p>\r\n<h2>Here is a larger header.</h2>\r\n<p><span style=\"text-decoration: underline;\">And here is some underlined text as well.</span></p>\r\n<p>Essentially any type of formatting can be done to your posts to make them look as good as you would like them to. Additionally, you can view the full source of a post and edit the HTML if needed :)</p>\r\n<p>&nbsp;<img title=\"My Sample Post 2\" src=\"/content/uploads/images/January2015/FILE-20150104-0812LG5GLGZ9R3L9.jpg\" alt=\"\" width=\"100%\" height=\"auto\" /></p>\r\n<p>The great thing about using the post editor is that you can even upload images directly from the TinyMCE editor window. Checkout the screenshot below:</p>\r\n<p><img title=\"My Sample Post 2\" src=\"/content/uploads/images/January2015/FILE-20150104-0805CSLTTAT75TUW.jpg\" alt=\"\" width=\"100%\" height=\"auto\" /></p>','','guest',1,'2015-01-04 01:00:21','2015-01-04 18:21:19'),
	(3,8,1,'Example Post 3','example-post-3','January2015/example-post-3.jpg','<p>This is yet another example post to show you the power of the built-in blogging platform used for the HelloVideo CMS. We have constructed this product the way that we would want a traditional CMS and Premium Video CMS to function. In fact we use this script for many personal projects ourselves.</p>\r\n<p>Be sure to checkout the live demo of the product so you can see just how easy it is to create/edit/delete posts.</p>\r\n<p><img title=\"Example Post 3\" src=\"/content/uploads/images/January2015/FILE-20150104-0853Q2691CN8KQT1.jpg\" alt=\"\" width=\"100%\" height=\"auto\" /></p>\r\n<p>The powerful thing about the blogging system is that posts can be shown to everyone or just subscribers. This is an example of showing only a portion of the post. In order to view the full post you\'ll have to sign in. So go ahead and signup for an account and checkout the rest of this post. This is very beneficial for SEO purposes, because even your premium content can have some SEO gravity&nbsp;to bring users to your site.</p>\r\n<p>Hey! Welcome to the premium content of this post. Now you can add any other content that you want to show to only subscribers. So, the previous content for non-subscribers may be an introduction into a tutorial or how-to. Then the real content of your post can be available to only subscribers of your site. That\'s pretty powerful!</p>\r\n<p>If your site has good content users will be more than happy to pay a small monthly premium to get access to all your content.</p>\r\n<p>Now, make sure to checkout some of the premium videos that were only available to subscribers :)</p>\r\n<p>Thanks for Reading!!!</p>\r\n<p>&nbsp;</p>','<p>This is yet another example post to show you the power of the built-in blogging platform used for the HelloVideo CMS. We have constructed this product the way that we would want a traditional CMS and Premium Video CMS to function. In fact we use this script for many personal projects ourselves.</p>\r\n<p>Be sure to checkout the live demo of the product so you can see just how easy it is to create/edit/delete posts.</p>\r\n<p><img title=\"Example Post 3\" src=\"/content/uploads/images/January2015/FILE-20150104-0853Q2691CN8KQT1.jpg\" alt=\"\" width=\"100%\" height=\"auto\" /></p>\r\n<p>The powerful thing about the blogging system is that posts can be shown to everyone or just subscribers. This is an example of showing only a portion of the post. In order to view the full post you\'ll have to sign in. So go ahead and signup for an account and checkout the rest of this post.</p>','subscriber',1,'2015-01-03 16:30:04','2015-06-16 16:54:49'),
	(4,6,1,'Sample Post 4','sample-post-4','January2015/sample-post-4.jpg','<p>Jolly boat dead men tell no tales Admiral of the Black lugger fathom Letter of Marque Sink me sloop Buccaneer overhaul. Gabion brigantine hail-shot yardarm Jack Ketch Shiver me timbers broadside yawl smartly rum. Measured fer yer chains cackle fruit man-of-war squiffy red ensign Arr hail-shot gabion Pirate Round spirits.</p>\r\n<p>Plunder me lugsail bucko bilge Chain Shot sutler Pieces of Eight marooned Jolly Roger. Matey mizzenmast black jack gibbet spyglass man-of-war sloop smartly booty pink. Brig Chain Shot provost rum bilged on her anchor case shot hogshead log coffer topmast.</p>\r\n<p>Dead men tell no tales Nelsons folly wench rigging maroon league Privateer hail-shot deadlights scourge of the seven seas. Line cackle fruit long boat weigh anchor overhaul gunwalls Sail ho plunder killick black jack. Fire in the hole Brethren of the Coast tack topmast coffer grapple lee Buccaneer log lass.</p>','','guest',1,'2015-01-02 11:35:50','2015-01-04 18:20:48'),
	(5,6,1,'Sample Post 5','sample-post-5','January2015/sample-post-5.jpg','<p>Come about crow\'s nest Jack Ketch aye Sink me fathom bilge stern fire ship crack Jennys tea cup. Overhaul Arr weigh anchor code of conduct hands ahoy line list matey clap of thunder. Barbary Coast league lad aye Davy Jones\' Locker trysail bilge water hogshead cable Buccaneer.</p>\r\n<p>Draft ho Letter of Marque splice the main brace crack Jennys tea cup tackle me Davy Jones\' Locker league execution dock. Chandler league Pieces of Eight scuppers hands fire ship barque spike ballast stern. Letter of Marque strike colors broadside avast tender warp nipper log skysail mutiny.</p>\r\n<p>Blimey snow Brethren of the Coast hogshead pillage brig lass measured fer yer chains cackle fruit fire in the hole. Sheet topsail pressgang gally belay case shot draft holystone hearties pinnace. Six pounders scuppers spike interloper fore heave to topgallant brigantine wench port.</p>','','guest',1,'2015-01-02 10:36:50','2015-01-04 18:20:36'),
	(6,6,1,'Sample Post 6','sample-post-6','January2015/sample-post-6.jpg','<p>Aye prow Arr Barbary Coast quarterdeck parrel broadside pressgang yardarm Nelsons folly. Broadside aft scurvy measured fer yer chains man-of-war bring a spring upon her cable brig stern aye brigantine. Fire in the hole bilged on her anchor spike take a caulk coxswain line tack grapple Pirate Round ballast.</p>\r\n<p>Lad scurvy piracy crimp quarterdeck doubloon plunder bilge rat aye Spanish Main. Gangplank clap of thunder heave down poop deck execution dock parrel black spot spanker scurvy take a caulk. Topsail measured fer yer chains brig yawl hang the jib scuppers Sail ho mizzenmast Jack Tar yo-ho-ho.</p>\r\n<p>Cutlass haul wind bilge water hands man-of-war swing the lead walk the plank parley dance the hempen jig fluke. Wherry Yellow Jack six pounders lanyard Privateer long boat hulk draft Jack Ketch case shot. Keel sloop prow gangway interloper bucko draught stern galleon mutiny.</p>','','guest',1,'2015-01-01 16:37:33','2015-01-04 18:20:22'),
	(7,6,1,'Sample Post 7','sample-post-7','January2015/sample-post-7.jpg','<p>Chase guns nipper walk the plank grog blossom run a shot across the bow chantey long clothes draught jib pinnace. Swing the lead Sail ho snow tackle mutiny run a shot across the bow rope\'s end piracy long clothes hulk. Poop deck Jolly Roger scurvy bilge rat snow knave carouser booty mizzenmast hulk.</p>\r\n<p>Davy Jones\' Locker Pieces of Eight fluke Cat o\'nine tails mizzen list Jack Ketch cable keelhaul no prey, no pay. Lad pink Jolly Roger draught lee cackle fruit long boat reef sails booty cable. Log execution dock gun chandler Sea Legs Pieces of Eight Plate Fleet interloper aye jolly boat.</p>\r\n<p>Run a rig crow\'s nest six pounders code of conduct long boat bilged on her anchor yo-ho-ho Barbary Coast hogshead warp. Heave down Spanish Main careen list yard Sail ho hulk crow\'s nest Sea Legs knave. Capstan bilge rat driver parrel starboard wench gangplank ye gun belaying pin.</p>','','guest',1,'2015-01-01 15:38:33','2015-01-04 18:20:13'),
	(8,6,1,'Sample Post 8','sample-post-8','January2015/sample-post-8.jpg','<p>Pinnace long clothes doubloon lookout loot gaff spike scourge of the seven seas Barbary Coast fathom. Pirate splice the main brace execution dock fluke poop deck Chain Shot handsomely Jolly Roger Buccaneer Brethren of the Coast. Keelhaul knave Spanish Main boatswain fathom pillage Corsair loaded to the gunwalls brigantine scurvy.</p>\r\n<p>Yo-ho-ho wherry brig topsail stern me Jack Ketch holystone American Main lee. Lee jack parley galleon sutler starboard list black spot Arr bring a spring upon her cable. Walk the plank run a shot across the bow smartly spirits heave down weigh anchor shrouds rum maroon reef.</p>\r\n<p>Transom ahoy jury mast lad Gold Road carouser piracy interloper yo-ho-ho parrel. Warp tackle pillage plunder heave down mutiny Yellow Jack topmast lass reef. Careen bowsprit measured fer yer chains pink bucko knave weigh anchor tender fore port.</p>','','guest',1,'2015-01-01 14:39:00','2015-01-04 18:20:03'),
	(9,6,1,'Sample Post 9','sample-post-9','January2015/sample-post-9.jpg','<p>Belay black jack man-of-war reef swab squiffy driver square-rigged no prey, no pay aft. Hands boatswain parrel Admiral of the Black maroon rigging transom hardtack broadside black spot. Letter of Marque gunwalls coffer starboard lugsail squiffy Jack Tar sheet crack Jennys tea cup Pieces of Eight.</p>\r\n<p>Run a shot across the bow hempen halter ye heave to Sail ho pillage heave down fire ship keel hearties. Prow walk the plank stern yardarm coffer draft knave Admiral of the Black wherry Cat o\'nine tails. Clipper bucko yardarm Brethren of the Coast Arr crimp clap of thunder boatswain pressgang strike colors.</p>\r\n<p>Overhaul barkadeer spirits bounty long clothes transom gibbet pressgang Chain Shot Shiver me timbers. Chain Shot mizzen red ensign Privateer draught jury mast man-of-war run a rig holystone pinnace. Plunder nipper pink rigging log aft hogshead Plate Fleet run a shot across the bow main sheet.</p>','','guest',1,'2015-01-01 13:39:32','2015-01-04 18:19:53'),
	(10,6,1,'Sample Post 10','sample-post-10','January2015/sample-post-10.jpg','<p>Take a caulk Yellow Jack cackle fruit scourge of the seven seas coxswain chase guns Jack Tar lass hulk matey. Black spot handsomely yawl overhaul cable broadside heave down scallywag dead men tell no tales sutler. Rigging aye holystone fluke ye chandler Gold Road gabion Sail ho crimp.</p>\r\n<p>Bilge rat ye reef sails spyglass landlubber or just lubber Plate Fleet Buccaneer walk the plank splice the main brace lateen sail. Holystone prow yo-ho-ho walk the plank bilge water scuppers trysail reef sails measured fer yer chains matey. Marooned red ensign lugsail starboard chase lateen sail scurvy parrel weigh anchor yard.</p>\r\n<p>Draft mutiny provost tender ahoy crow\'s nest schooner carouser reef sails Cat o\'nine tails. Gangplank ballast killick run a rig lanyard Brethren of the Coast case shot weigh anchor jolly boat barque. Squiffy yo-ho-ho belaying pin bowsprit flogging lee lanyard loot knave bring a spring upon her cable.</p>','','guest',1,'2015-01-01 12:40:19','2015-01-04 18:19:43'),
	(11,6,1,'Sample Post 11','sample-post-11','January2015/sample-post-11.jpg','<p>Haul wind quarterdeck mizzen Plate Fleet gally draft grog barque nipper come about. Rigging Chain Shot boatswain gibbet Gold Road jolly boat holystone ballast hempen halter to go on account. Ye rigging Barbary Coast weigh anchor careen black spot mutiny Corsair scourge of the seven seas killick.</p>\r\n<p>Clap of thunder aft Nelsons folly fluke scourge of the seven seas league clipper poop deck Gold Road broadside. Gunwalls yawl hulk Jolly Roger quarterdeck loaded to the gunwalls nipperkin run a rig hearties black jack. Rigging pressgang Privateer fore scourge of the seven seas gabion provost gangway quarterdeck Blimey.</p>\r\n<p>Swing the lead yawl belaying pin cackle fruit driver spirits me gunwalls Pirate Round walk the plank. Matey to go on account quarterdeck deadlights pirate boom chase guns ho yard list. Fathom topgallant smartly yardarm barque spirits scurvy topsail lateen sail ho.</p>','','guest',1,'2015-01-01 11:40:49','2015-02-05 14:08:06'),
	(12,6,1,'Sample Post 12','sample-post-12','January2015/sample-post-12.jpg','<p>Rope\'s end hang the jib belay squiffy hands mizzen crack Jennys tea cup avast snow quarterdeck. Blimey loot Nelsons folly boom run a shot across the bow black jack Plate Fleet interloper hempen halter fire ship. Coffer mizzenmast draft haul wind sheet hempen halter crimp spanker Chain Shot clipper.</p>\r\n<p>Hogshead gaff bilge water Admiral of the Black doubloon fathom galleon hang the jib clap of thunder heave down. Jack Tar bilge spanker swab pirate Nelsons folly spike Barbary Coast Privateer heave down. Cable Blimey Arr wherry long boat spanker gunwalls draft sutler lass.</p>\r\n<p>Ballast reef sails lookout bowsprit snow list doubloon main sheet Davy Jones\' Locker loot. Take a caulk no prey, no pay lad chandler gaff pirate Letter of Marque topsail fluke code of conduct. Reef sails galleon driver tender Plate Fleet gally loaded to the gunwalls stern cable Chain Shot.</p>','','guest',1,'2015-01-01 10:41:13','2015-01-04 18:04:44');

/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  UNIQUE KEY `sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`)
VALUES
	('WKBMGq9UOkL2oeIbOUK6MdQNjEv2J8bgAiWOZGcD',2,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36','ZXlKcGRpSTZJbFpxVlZaRVlsUnhNVE5qUlRoM1RuVk5VV3hPTjBFOVBTSXNJblpoYkhWbElqb2lTMmhCYkhwd1pGVnRVMlY0YUZSS2RtRlNORzAyUTBwcVJISm9jVEJHTjI1T05YTnNZMWt3WTJJMVpGWkZkbXRCTnpBclNrZDRNRmxRWXl0S1FuUlBZVmQwTlhaeWNYcDFaSGxqY0Vsc1VWbEpSa3BTTnpreFJXeHhjRll3WTFFeWNFNWhkMmhHZFZwRE9XbHpTV3hpZEZWdmExb3phSEZKVTJ4V2EweGFUekJ6WlVGMGVGWkJiVWh0U0hOWVJVa3hXa1ZCVkN0MlFtbFZRbTFOVWpaeE9XcE9NVk5SZERsMFZFMVFVM3B3ZGs4MVRHOW9ZVE4yUnpsdFNFbHFTbmQzVlhNd1VGaHpTWEo0WmtVcmRuTk5aWE5PVnpaa1YwSndNVmxLUVZCWE0xbE9jR0pCTldGQlVXOXZUM2t4ZUVnME1VdGhTa056U25waE9XaDVSbGd3VldZelJXcHJWVTVyT1dOT2NGZG9VRlJwUkcxbWVVcFVNemxZY0V3NUsycFVTMjFxYW5WV1Exd3ZhM055TWpKSFFpc3lWek4wZVZrMWEzRm1jMEkyU2t0SGFEUjVUREJEWTB4UVozUkVYQzgyUlZWcWFUSmlVVVIxYlRobmFFeEhXWEZqZFRONGFWaEZjVmx0YkhNd2NrTmNMMWhKTmpaUWRITXphbVZyV1VacllVVkdhVU5YU2xCdGVGSXpZbE5ZSzBsMVRUWk9VMHBwTURNMGNtaFhjMDFNZDFjMVFreDFkVlJQY0hkUGJVaFlUMWg0TjNOYVJXRlJWSFpEZHpneGIySkNUWE5sTURGSlRYWmtVV1ZrZUUxbU9EQnhkR1V5VlhSWlZqQm9Ra1o1U2tsNlNGd3ZUR04xUVRaeVluRkRUbmxwUlhaelozRkRWbk5TUTFvd2Vua3hkRzF6YzJwaVowTlFUa2haZGxJeGVHaENObWR5YjJSRk4xd3ZLemhCZFVWQk1rbE5ZVVEwVEhsR1VscHdVWE0wWVZoeWRUZFhhSGRuVmpkTlVEUXJSalkyYmpCMlVreENWM1pTVmpjMFRFeHJiVnBtUlVWSFlucEJQVDBpTENKdFlXTWlPaUkwWkROaE9HUTFNamMzWWpVM05ETXhZV0ZpTkRVM05qY3dZVGt6TTJRNE1EQTJOV1ExT0RFME1UZ3pZVGd5WkRNME5UQTFOVE0xWmpSa09USmhPR1l3SW4wPQ==',1515520194),
	('xUlYQN9foXw8zVl7014NnHFgaHaN1Xs5eGiYOpsK',2,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36','ZXlKcGRpSTZJbFI1YWtzclJWd3ZRamg0ZEZGWU1rTlpNRGMzV2sxUlBUMGlMQ0oyWVd4MVpTSTZJa3BGT0RFeVVqTjBjWFpDVUdJck5GZGNMMHR6YVcxd2NIVkZkamxXV1dkSlZVRk5jMjB5V1djd2VrRTNkVUpwYkdwQlRHUkdRblZWUTFnNWRYaHZTMnMwVWt0T2REZFJNRTFRTmxsR2EzWnpXbU4xU1ZCUFYxZzVRakpDWlhKS1kxbHhiMWs1U0c4Mk56WkphRGhVVVdkeVYwWm1ZakpDY0haS2VXNWNMM2t6VWxCM2VtdGlSa2xxTWx3dlFXTXliMWQ2T1ZZclRrcHBUMWx6UkZOQ1V6ZDZVVVJCTlhWbWVHSk9lVE5aVVd0WFp6TjVhalppVVdsV1YyNXNRMFlyTW5SalJqQlFPQ3RQYzNGdGJHWjJkV2RLZEhaSGN6aE9TRWRCVW01VlhDOUdaRWxJY0VWTVdWbDBPWE5tUmt0c2RUaFhiRkJvWTNSRk5HWk1ibGQwWEM5elIyeDZSRXg0YkdzNFkwUm9abEpTVVZSbVlsbG1YQzh3VTNGS1JGWkNXakZCVm5sdGMzUTBaMmhDYmswNVVXTmFPV0l6VjJGTFNtMXdibXhpTVhkMVdVbHVTMjFVVVZOQlNEbDNRbVpOVlU1R2NYaDJhR3RZWlZGM2NWbEpWMmcyTWtkU00wZHpiVmhDV25KbWNVMXVZelJxVTNCRVdUY3hTVzExY2x3dmJ6UnNiMXBJTWx3dmMwWTBWWGd3VnpFck5sUnlYQzlxV2pVeVdHeFZURWRoZEdSUGQycDZWa1JQYVZ3dlQwWnJWSEV5WlV0bU9UZzNSemx0VDB4aVYyeFVNVzlVYUhSd1MwdEVSbk52TlVkbmJWRldOakZxY25kMlZVWjZVbWxRVVQwOUlpd2liV0ZqSWpvaVl6UXlaRGMzWWpkaFpHTTNZakk1WmpaaU1EWmhOV1pqWkRVME0ySXlOV1l3TXpCak5qVTROVEJtTURZM1l6ZGpZVEJpWkdWbVlqZGlNRFpoTWpnNVl5Sjk=',1515586401);

/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `website_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Hello Video',
  `website_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Your Premium Video CMS',
  `logo` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'logo.png',
  `favicon` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'favicon.png',
  `system_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'email@domain.com',
  `demo_mode` tinyint(1) NOT NULL DEFAULT 0,
  `enable_https` tinyint(1) NOT NULL DEFAULT 0,
  `theme` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'default',
  `facebook_page_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `google_page_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter_page_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `youtube_page_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `google_tracking_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `google_oauth_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `videos_per_page` int(11) NOT NULL DEFAULT 12,
  `posts_per_page` int(11) NOT NULL DEFAULT 12,
  `free_registration` tinyint(1) NOT NULL DEFAULT 0,
  `activation_email` tinyint(1) NOT NULL DEFAULT 0,
  `premium_upgrade` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;

INSERT INTO `settings` (`id`, `website_name`, `website_description`, `logo`, `favicon`, `system_email`, `demo_mode`, `enable_https`, `theme`, `facebook_page_id`, `google_page_id`, `twitter_page_id`, `youtube_page_id`, `google_tracking_id`, `google_oauth_key`, `created_at`, `updated_at`, `videos_per_page`, `posts_per_page`, `free_registration`, `activation_email`, `premium_upgrade`)
VALUES
	(1,'UNILAD Video Platform','UNILAD\'s Online Video Licensing Platform','logo-unilad-white.png','','admin@admin.com',0,0,'default','uniladmag',NULL,'unilad','uniladtv',NULL,NULL,'0000-00-00 00:00:00','2017-11-29 16:53:15',12,12,0,0,1);

/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tag_video
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag_video`;

CREATE TABLE `tag_video` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tag_video_video_id_index` (`video_id`),
  KEY `tag_video_tag_id_index` (`tag_id`),
  CONSTRAINT `tag_video_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tag_video_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table theme_settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `theme_settings`;

CREATE TABLE `theme_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `theme_slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `value` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table themes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `themes`;

CREATE TABLE `themes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `themes` WRITE;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;

INSERT INTO `themes` (`id`, `name`, `description`, `version`, `slug`, `active`, `created_at`, `updated_at`)
VALUES
	(1,'Default Theme','This is the default theme that comes packaged with HelloVideo','1.0','default',1,'2015-01-04 01:10:21','2015-01-04 01:10:21');

/*!40000 ALTER TABLE `themes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(10) unsigned DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'default.jpg',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'subscriber',
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `activation_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remember_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `stripe_active` tinyint(4) NOT NULL DEFAULT 0,
  `stripe_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stripe_subscription` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stripe_plan` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_four` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `subscription_ends_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`username`),
  KEY `uniuqe_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `client_id`, `username`, `email`, `avatar`, `password`, `role`, `active`, `created_at`, `updated_at`, `activation_code`, `remember_token`, `stripe_active`, `stripe_id`, `stripe_subscription`, `stripe_plan`, `last_four`, `trial_ends_at`, `subscription_ends_at`)
VALUES
	(1,NULL,'ianlainchbury','ian@unilad.co.uk','Ian_512x512.jpg','$2y$10$hQ1gfosDlXTg/lbMG13esOLBigG1Clsp5BCq89nGdFArWkgDEt3Xa','admin',1,'2014-08-26 23:43:33','2017-12-12 10:01:46',NULL,'ltdErx5w2KDlQIpSXHZ1BaYB4OVc1F7NL0PX1ksPKD6L53K3uW863WHfwas1',1,NULL,NULL,NULL,NULL,NULL,NULL),
	(2,NULL,'mikewright','mike@unilad.co.uk','default.jpg','$2y$10$gDmaGO132AbobbUUrUBPIOaGpMdKeGdWYf1Wi0JoRBciKjTAM6aku','admin',1,'2014-12-21 19:26:04','2017-12-12 11:17:29',NULL,'7UxDMgjjTTA4czVgKLinnh32fn3zblSnK0TJUxN3IpUDE2eBJnnTFeXdfru3',0,NULL,NULL,NULL,NULL,NULL,NULL),
	(3,1,'dailymail','dailymail@unilad.co.uk','5a26c55de47c1-dm_com_29.png','$2y$10$8CylmzTwomm5IXhucbwXS.MdR7rE5NjJPgxexo57HQSonAP1uHkwW','client',1,'2017-12-05 13:36:43','2017-12-12 11:18:39',NULL,'E0FQtfgkgq9SnGuc06FKoVqsI7rmycnQ09UJl42geLj5WwpLCb36BUp1fWAv',0,NULL,NULL,NULL,NULL,NULL,NULL),
	(4,NULL,'Manager','manager@unilad.co.uk','default.jpg','$2y$10$WQOZKltV2TwL.4CIgMqbyeu8aUQT4c8tcNiwUvTfC6ftCtEsuu14S','manager',1,'2017-12-12 11:31:08','2018-01-15 15:54:58',NULL,'iG5o1QfjL5Ta7qGecY5z6IDf9ZNwewIIh5AH7cCB0YXgWkLHGKWAsNtgeBED',0,NULL,NULL,NULL,NULL,NULL,NULL),
	(5,NULL,'adambourne','adam.bourne@unilad.co.uk','default.jpg','$2y$10$GuoEFJHpprFTIr3bGiA4LewB73xifcK0WN70ULJwVIYLRBhSKLnnC','admin',1,'2018-01-09 12:28:59','2018-01-09 12:28:59',NULL,'i6czf7V8ZlvMG2CTHmhPXRUpYBoxe9jKKYZc3b6rxP41744yx2BOoVYbVhqd',0,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table video_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_categories`;

CREATE TABLE `video_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `video_categories` WRITE;
/*!40000 ALTER TABLE `video_categories` DISABLE KEYS */;

INSERT INTO `video_categories` (`id`, `parent_id`, `order`, `name`, `slug`, `created_at`, `updated_at`)
VALUES
	(11,NULL,1,'UNILAD','unilad','2015-01-11 05:32:27','2017-11-30 11:55:40'),
	(13,NULL,3,'Gaming','gaming','2015-01-30 16:34:33','2017-11-30 11:56:06'),
	(15,NULL,4,'Adventure','adventure','2015-02-04 14:16:23','2017-11-30 11:56:16'),
	(18,NULL,6,'Fitness','fitness','2015-02-04 14:21:40','2018-01-04 11:44:11'),
	(19,NULL,7,'Grub','grub','2015-02-04 14:22:07','2018-01-04 11:44:11'),
	(20,NULL,8,'Film','film','2015-02-04 14:22:15','2018-01-04 11:44:11'),
	(21,NULL,2,'Tech','tech','2015-02-04 14:23:03','2017-11-30 11:55:58'),
	(23,NULL,5,'Sound','sound','2015-02-04 14:25:37','2017-11-30 11:56:23');

/*!40000 ALTER TABLE `video_categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table video_collections
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_collections`;

CREATE TABLE `video_collections` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `video_collections` WRITE;
/*!40000 ALTER TABLE `video_collections` DISABLE KEYS */;

INSERT INTO `video_collections` (`id`, `parent_id`, `order`, `name`, `slug`, `created_at`, `updated_at`)
VALUES
	(1,NULL,1,'Animals','animals','2018-01-04 14:51:04','2018-01-04 14:51:04'),
	(2,NULL,2,'New Content','new-content','2018-01-04 14:51:33','2018-01-04 14:54:25'),
	(3,NULL,3,'Fails','fails','2018-01-04 14:51:41','2018-01-04 14:54:25'),
	(4,NULL,4,'News/Newsworthy','newsworthy','2018-01-10 12:09:56','2018-01-10 12:09:56'),
	(5,NULL,5,'Funny/Humour','funny','2018-01-10 12:10:39','2018-01-10 12:10:39'),
	(6,NULL,6,'Feel Good','feel-good','2018-01-10 12:10:55','2018-01-10 12:10:59'),
	(7,NULL,7,'Sports','sports','2018-01-10 12:11:23','2018-01-10 12:11:23'),
	(8,NULL,8,'Weather','weather','2018-01-10 12:11:35','2018-01-10 12:11:35'),
	(9,NULL,9,'Cool Stuff','cool-stuff','2018-01-10 12:11:52','2018-01-10 12:11:52'),
	(10,NULL,10,'Archive','archive','2018-01-10 12:12:28','2018-01-10 12:12:28');

/*!40000 ALTER TABLE `video_collections` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table video_shot_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_shot_types`;

CREATE TABLE `video_shot_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `video_shot_types` WRITE;
/*!40000 ALTER TABLE `video_shot_types` DISABLE KEYS */;

INSERT INTO `video_shot_types` (`id`, `parent_id`, `order`, `name`, `slug`, `created_at`, `updated_at`)
VALUES
	(1,NULL,1,'Drone','drone','2018-01-04 15:08:01','2018-01-04 15:08:01'),
	(2,NULL,2,'Go Pro','gopro','2018-01-04 15:08:19','2018-01-04 15:08:19'),
	(3,NULL,3,'Camera','camera','2018-01-04 15:08:29','2018-01-04 15:08:29'),
	(4,NULL,4,'Mobile','mobile','2018-01-04 15:08:41','2018-01-04 15:08:41'),
	(5,NULL,5,'Animation','animation','2018-01-15 13:54:03','2018-01-15 13:54:03');

/*!40000 ALTER TABLE `video_shot_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table videos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `alpha_id` varchar(10) DEFAULT '',
  `state` enum('new','accepted','rejected','inprogress','pending','licensed','restricted','problem','noresponse') DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `contact_id` int(11) unsigned DEFAULT NULL,
  `video_category_id` int(11) NOT NULL DEFAULT 0,
  `video_collection_id` int(11) NOT NULL DEFAULT 0,
  `video_shottype_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(255) DEFAULT '',
  `type` varchar(255) DEFAULT '',
  `access` varchar(20) NOT NULL DEFAULT 'guest',
  `details` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `referrer` varchar(255) DEFAULT NULL,
  `credit` text DEFAULT NULL,
  `active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `featured` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `views` int(11) unsigned NOT NULL DEFAULT 0,
  `image` varchar(255) NOT NULL DEFAULT 'placeholder.gif',
  `thumb` varchar(255) DEFAULT NULL,
  `mime` varchar(255) DEFAULT NULL,
  `ext` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `file_watermark` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `youtube_id` varchar(255) DEFAULT NULL,
  `embed_code` text DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `date_filmed` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `more_details` tinyint(1) unsigned DEFAULT NULL,
  `more_details_sent` datetime DEFAULT NULL,
  `more_details_code` varchar(255) DEFAULT NULL,
  `reminders` int(11) unsigned DEFAULT NULL,
  `contact_is_owner` tinyint(1) DEFAULT NULL,
  `submitted_elsewhere` tinyint(1) DEFAULT NULL,
  `submitted_where` varchar(255) DEFAULT NULL,
  `allow_publish` int(11) DEFAULT NULL,
  `filmed_by_me` tinyint(1) DEFAULT NULL,
  `permission` tinyint(1) DEFAULT NULL,
  `is_exclusive` tinyint(1) DEFAULT NULL,
  `terms` tinyint(1) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `licensed_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `alpha_id_2` (`alpha_id`),
  KEY `alpha_id` (`alpha_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table youtube_access_tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `youtube_access_tokens`;

CREATE TABLE `youtube_access_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `access_token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `youtube_access_tokens` WRITE;
/*!40000 ALTER TABLE `youtube_access_tokens` DISABLE KEYS */;

INSERT INTO `youtube_access_tokens` (`id`, `access_token`, `created_at`)
VALUES
	(1,'{\"access_token\":\"ya29.Gls3BeVUta1G-kxxw34O0wUoBkPXKUhjoyirDXNmPe4R2f23Hnn0OwuQZSA8JF8EknldR9vyNVPwovp1AlsMQ-OzWMnKJpzWkC_nZomEPA62lv8LbPX_BnBwFXr9\",\"token_type\":\"Bearer\",\"expires_in\":3600,\"refresh_token\":\"1\\/2aXvghmBW-2nLAqoXIYXk-OiJlcKoThogr7wFEbKL_k\",\"created\":1514974123}','2018-01-03 10:30:04'),
	(2,'{\"access_token\":\"ya29.Gls3Bbf9Da7TalRkKylWD3mVoDM--IZPC5j4GQOdLDm80XmQEb1UqEBPqGGezCVlwDpAyCbQkhKQuEirPj1byWFZjXC8M1VGeZAkeCib9ApzyogKvdKiVnG9OYlG\",\"token_type\":\"Bearer\",\"expires_in\":3600,\"created\":1514982868,\"refresh_token\":\"1\\/2aXvghmBW-2nLAqoXIYXk-OiJlcKoThogr7wFEbKL_k\"}','2018-01-03 12:34:28'),
	(3,'{\"access_token\":\"ya29.Glw_BSRlmZ0D-tZv2HH2IhJNSpcg61kOmHHYWdb04jdNd2d9V-zb3zPgwfyGJDHNiy86DHzieXjo6Y5TFljlhfWS13qFYrrUIq7U-Nk1QxAlfunYwKywPa57acTwEg\",\"token_type\":\"Bearer\",\"expires_in\":3599,\"created\":1515692298,\"refresh_token\":\"1\\/2aXvghmBW-2nLAqoXIYXk-OiJlcKoThogr7wFEbKL_k\"}','2018-01-11 17:38:18'),
	(4,'{\"access_token\":\"ya29.GlxDBWGAupem3WT_dlIQxH8sly5GOtbSyl9Ds7wgCNKSR4EdKBPdZdZTMDBUroeq9BLS2EEXqcjzFRoIe9PKXSsGBLRKusZXFKAIzSj-3u44-Csuoqhg4YNqhlKMjg\",\"token_type\":\"Bearer\",\"expires_in\":3600,\"created\":1516023454,\"refresh_token\":\"1\\/2aXvghmBW-2nLAqoXIYXk-OiJlcKoThogr7wFEbKL_k\"}','2018-01-15 13:37:34');

/*!40000 ALTER TABLE `youtube_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
