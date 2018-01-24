# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: videoapp
# Generation Time: 2018-01-24 10:15:47 +0000
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
  `moderated` tinyint(1) NOT NULL DEFAULT '0',
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
	(7,'Test','Test','test@unilad.co.uk','+447895752108',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-15 12:38:38','2018-01-16 11:07:18'),
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
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  `order` int(11) NOT NULL DEFAULT '1',
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
  `user_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `body` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
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
  `live_mode` tinyint(1) NOT NULL DEFAULT '0',
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
  `active` tinyint(1) NOT NULL DEFAULT '0',
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
  `order` int(11) NOT NULL DEFAULT '1',
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
  `post_category_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(255) NOT NULL DEFAULT '',
  `body` mediumtext NOT NULL,
  `body_guest` mediumtext,
  `access` varchar(20) NOT NULL DEFAULT 'guest',
  `active` tinyint(1) NOT NULL DEFAULT '1',
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
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  UNIQUE KEY `sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`)
VALUES
	('0aL8PiCa65oTadCVmXDkiB9Hvlq8p5yvwdujKR7H',NULL,'172.68.65.169','Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online) AppleWebKit/534.34','ZXlKcGRpSTZJbVZUYVUxT2NqQlJTM3BqWm10Nk1tTXdTVXBKWjBFOVBTSXNJblpoYkhWbElqb2lXREpTSzFWRllXaENTbXRTV1RRMFozVm5SblIwYlRkclFWSXhWV3hXU1RKU2NIbDBjMnhNVFd4SE5tSm1NR0psWjF3dlVqWlhLMWt4TkVjcldVVjFZMlJFVjJsVFQwdzVNRTVMUlVKSFZYRlplamh3ZWpGTGVEZHFZbkpaVlRaV1RHZHpaWGxTWTNrMVFUZ3JXR0ZFTjFOdWJsVm9iVFYyY21WQlZIQlVRVEJGT0dNclIyZHdOR3hUUzBnd2FrNDJVVEZDZWt0WU1IWmNMM1pYZEdscGRHVk5XVmxDV0VoVE1qaFJZa1ZLYjFGNVpETmNMMFpUYURSbFoyeFNNVVZLZWpKalQyRk1hWE5RUlhOc1pVaFJOM2RQYVVvMGJuaE9TRmQ2U0VwbWJtbENVU3N6T1hvMU5rcHFiemhJVjNWWWJqZFdNWFJwZUNzNWNsazRTMUZMTXpoVEsySTJTV00wT0RoaVUzZFdSU3Q0YW5NNGJWSkNWbmM5UFNJc0ltMWhZeUk2SWpWbVptTTVabUZrTjJJek1XRTJOR1JoTnprM1lXRTNNekUyTXpneU5XVmtOVEJtWWpZM1lXRTVPRGRrWldSa09EQXdNelJoTjJNME5EQXdPR000WldZaWZRPT0=',1516735404),
	('2gpJ28tQrXfoiIq3Olb8zBX3auk8ZXx0fN3TiWNM',NULL,'162.158.255.35','Mozilla/5.0 (Linux; U; Android 5.0.2; zh-CN; Redmi Note 3 Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 OPR/11.2.3.102637 Mobile Safari/537.36','ZXlKcGRpSTZJalpOUm5OUVMzQjZYQzlDWWtOeWRtRm1NRTVHYmt0UlBUMGlMQ0oyWVd4MVpTSTZJbUZhWEM4NWNGd3ZXRWhETVZCaFVFWnNRM0p6VjB0Mk5pdHFXSEpaYVV0dlRHaExVbmxoYkdGWVpUYzRYQzlMUVZKa01HazRiMGRNZFZVMllXUlRNVU5SZW5aVVUwMVNlRlpOTkcxSWFEWXhlbWR6ZFVFM1oyaE9ZbWRoY0ZSNlRsVlBhbk5CU0hCVlZYTjJaMU51T1d4c1duUXJkemxxVVhGNVFVaHFZVEUwYUZWMGRGd3ZhbEJPUVhvNVRDczRhbWR5ZG10NlVuVnBibk51T1RNME5WQlpVbEVyZDNCdlhDOVBVRkl3YlRkNFFXczVlakZuYlRGY0wzcEhLelpzY1VoTGJsRm1SVmRaU1U1UVZUZE1Nbmc1WkVVMVEwWlJPRGRLT1ZKd01UQkJTR1l4YjJVeU5UUmxNMk14YUZoaVNtbHlkM05sVGtsV1pteGFZalZ2ZG1sTVVXVk9UREI2WEM5TVdVbFlXR1IzVFZsNFRIZzFjSEIyVXprMlp6MDlJaXdpYldGaklqb2lNakk1WkRFd00yTTNPVE0zWkdFM1pUTXhZakF4TTJJd00yUXdOekUxT1dRd1pEUTVObVl5TlRBeVpURmhNVFl4WWpnelpHWmlaVE0zTUdVMk9EZG1OaUo5',1516773574),
	('9kDaEtUZDzV2jR6EKn5iDS3cc1Amf2m1jn4dk08r',NULL,'172.68.65.37','Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online) AppleWebKit/534.34','ZXlKcGRpSTZJbHBIUjNaQ1dWbHlNWHA0UTBVMkszcFBXVmhoYjJjOVBTSXNJblpoYkhWbElqb2lWelZaUW5ad1VYZENUWEJCV25sb2RXbGtTVkF3VEZaVWMwbFJkVzE0Y2l0d0szSnBabmhOVUdoaFJIVkNWRnd2WkZkcU1YRkdORkJ1VFhsQlJIWktNVFpTVmxWeVVGSkhObUYxU2pOWVVrY3dOMjVqWTBWTlRFVTRkbHd2ZEcxSFQxSkRWWEUxWXpkc2VVeFBRWGhQZG5KemJUTkNTbVpQVFROSVFqTmNMMFJjTDAwMWFscEViV0pFTnpOdFpraDNOVlV4VTFCY0wySk9kell6VFhwVFp6UTNPRlUxYW5CaWREVmxjV2xVUXpWVWNGWmhOMGRzY25nMmVGVXJUbHd2VVVsVlFsQXdLM1J5WTFKTmRFeDFVakpLYkcwNGRGTmliRTFEWVZCa05qVXpWR05uT0VWeGIxWmhUMFUwUkdjd05ETjVTWGRSUkU5MFVsQTFZMHR4V1ZKYU0xbElVblZNWTAxU00zRnBRM1JWWkUxeWIwZDVOVFpJTm5jOVBTSXNJbTFoWXlJNklqWXlNbVE0WlRneU5EUTBPVFkzTm1FeU9UUXdOelU1TWpZMk5UVTRNV0kyWkRSa05UVTRPR05tTldaa09EZGxabVF5TTJOa01EY3dOR1ZoWmpjd1l6VWlmUT09',1516735400),
	('9r86XhTkkcVVX0MzJZ2qHOVykoMV0SI7pATFrvvu',NULL,'172.68.65.25','Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online) AppleWebKit/534.34','ZXlKcGRpSTZJamRIS3lzMFZsd3ZjV1JpTldsRmFXY3hhbkprU1dsblBUMGlMQ0oyWVd4MVpTSTZJazAzVkRBM1NVODRiRzU1UkdVelIxQjRWbnBoVDI4MmFUSnpXbTVZTUdOeFpGWlFSVlJzWVRaNWRFdHFRM1JJTVV0MmVHVnJhSFpIWkhOQlN6QlpTVE4zYVVaUFpFOTNVMUZZTjJKbk1rczNVelUzUkc1NFVISlpjMGhpWVZoUWQyaERlbGxtVkRFNE5WSnRhV3R4WEM5U1lWaGpWa1Z0VDFGY0wwRXhibGwzZWxaQlhDOXlRMFZFYWtFelNtOTVjVTlvYzNwV1RISnhWVEpCU2xOVWVXNVdhWHBPVFdSM01GbGpjR3hZUVVSMFRtVm5RMmcxVVV0UVEyUnZkRkZqWkZaWE1sbE1NV1JDTTFWUVEyOXVkMGxLVGpOSFVUbGtRMU5YUVdGVFVISlZZV2NyVjBaWWJuWkJWV2h6V2tkV2IzQmxVMEpIWlc5SVFYQkJSbkE1V25KalZHcExSSEFyYldKdGRFcElaWEY2Y0ZaTldXTXdZMk5CUFQwaUxDSnRZV01pT2lKaE5UQTNPV1EyTTJZNE1tWXlOR0ppWVRaalpEaGtOV1JtWVRreU1HSTRNamN5TlRJek9EVTBaVEF4T0dObE5URTJaalk1TURjd01tUmlPVEE1T0RaaEluMD0=',1516735404),
	('AidUgsdSnXKGsueSvRyxNiRzGb4Uwcbc6XPNaQ1t',NULL,'172.69.62.119','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/600.1.25 (KHTML, like Gecko) Version/8.0 Safari/600.1.25','ZXlKcGRpSTZJa3BGYkVWSlJGcFlUbnBUWlhkVU9HWkJiemR5ZEhjOVBTSXNJblpoYkhWbElqb2ljRUpST1VaRldFNDBXa1IxWVdGWlJWSlRlRFZzU0dkTmJWaFdZMG8zTm1OdmRrODJhM2hoU1VoQ2FYTm9ablY0VDNaWlVXcHNXV1pqVlZCbk9FZHJPVWhRVDJ0Q04ySkJTazl2VFRaa2FGQXlUMU4xWW1SeFltRm9hWGhDYldKaU5FZDRZbG94YlZwelJVUm5XbFJoU0VoVFptdHdOSFJoUlU0NGJuVm5ZMlZuVm1wdmJWVkJSV2xzWjFsMk16WlZSREptWEM5dVQybDRTV296UVRVeFRubHlOekl6YVZaaVJuTkVRWEpyVlhwNFhDOTNNWEJOVEc1aVoxd3ZkRkoxVmtwc1lUWnNNR2haUm5oNWVuSmlhVkp3ZFZKdVhDOHhNRFk0ZFdocFdUWnFWWEJ3Y0d4M1NtaHhSMk5aUjI5aFZFeFVjRkJETW1OdGMwdHhRMkZuWWpGUU9YZ3pVVE5JUldaMGVFdHlVRzlxYjA1QmFqVXdWMFZCUFQwaUxDSnRZV01pT2lKaE5qWTNOemd4Tm1VNU16Umpaamc0WkRNMlkySTNOamt3TmpobE5EYzJOVEpqTm1Zd1pEZGlabUpsTkRBek1XVTNNbVUwTlRNeU5UQXhZalpqTTJVekluMD0=',1516719280),
	('cMB00jttiyg0REU3BVhZX29xe8NaKpLXqx0U4LaF',2,'141.101.98.113','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36','ZXlKcGRpSTZJbU5MVjNGd2NHRlNSVzFuUzFKdFdXaHpia0o1ZEdjOVBTSXNJblpoYkhWbElqb2lSVWh5UXpsbFlqSlRla00xYVdOcFNGZHlNbnBIYzBWcWRYSnpabVpuVm13MVdqa3hRekl3TmpWRVdtMXhlblpXUlRSbU5teE1WMVI1WmxWak4wTlVXbEZRYjNBeU9XTnFZVkpZYkZKcFlrSlJORWh1ZDB0TFdqUkpkVU1yVlRoRVdUSkRUMDQxVUhwY0x6RlFUamhVYUc5b1NrTndXblo2V1VGSk5WZHFVMEpyVDI5b05GZFpYQzlDV0hSVVJtRkhPRW93T1ZaRGFVTlZNRUpITld4dldVMUNOMUkyWms1S1pVczJWMEpLTVdJd1duVldXRWh1V1VWa09FczFiSGx3VTNCR1JUQXhSMjAwU2tKQ2RXTmxOVzFhZURWb2FsZEhVblZ1TUhsclZVcHFXV0ZTY1ROelMyUnlYQzlvVFVwNmNuRTFSVkU1WlhJd2FuZGlTbXA2WVZKRk0xTnlUVkJ5YWxNd1puWkJjMmRFYkRWQ1REZ3lla3R2ZWpVclRVeDBhV1ZDYzFCNk9XSjNSMDE1SzB3MGVqQlpjbkkyWEM5S2IzbEhhRU5oYUVaVlZXRnRPVlU1YzNkU09UWmpaMmx4UkVsbWFVdFpNWGxEVTNKRFpHTkNRMW95YVRBeksyMUNPWFpVVGtkMFFYYzBibmsxVDJzNGVuQlFka00zU25BNVpHTXhjVU0xYVRGYVdsUlhVMk52VjNJMUsxcFlkREZ4WjFsMWRFSktORmxsT0ZOTlFXZHFkRUpIVWxwclMxYzVURzFDYUhoVVNWd3ZNRk5CWVZGek1WUnpTbHBHUmpsTGRGQjZSSFJaUkdoRWNrOUtWVEJvWVdwSVVHcDVVWEowYjJ4YVZHaG9jelU0YnpkdloyOHpVVDBpTENKdFlXTWlPaUpsTVRRMFpXRmxNVEUwTm1JNE0yRmpaRGMxTVRrNFkySTFaVEF3TVdReE5ETTJZVEl3TkRCaU9UTXlPVFU1TXpabFpUSmpPRGxoTXpFM05UazNabU0ySW4wPQ==',1516786314),
	('CoSoIMTI6lVLPBO5L786d35vviCXu1KM54qS8pGX',NULL,'172.68.143.73','Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online)','ZXlKcGRpSTZJbnAwTTNCQlJuVm1UWGxhWkhGTGNWQndla1ozVVdjOVBTSXNJblpoYkhWbElqb2laV1pxT0N0a1duWk9aSFZMU0RVM04ybHpYQzlXWm1FNVQxazVkMU0yWkZSVldFbDRPRTF5U1dSNFEydExjMDVUZFhwSWFqQnJSMWRtUzBGak9YZGxaMDVyY1V0UVVXVlBPRTFPU0RKR1kwTXdlVmhSUlhsc1dsZzVYQzlNTlZaM0swcFpNMFZRTVN0TllYSkxkVlU0VTJ0NFRVVXdkMXBoY1hGbU1GUkVZMnhxZVUxWk5GWlJNRzlHZEZBNFdTdE9kalJ5TkNzck1tWnhUR1kyWmxWV1RrdDJWVVZqTlRKTFNFUXhRMFU5SWl3aWJXRmpJam9pTUdZNE5ESTBNMkZsWmpJek9UTTBPRGhqWTJVMk16VTRNV0UzWmpGak4yTmpaVFUxTkRCa05qSmxZakJpWTJGallXSmlOREl5WVRFeFlURmtaRE5qTUNKOQ==',1516735399),
	('cYVcg2phtAjsWunGpjXHVAVJGZjyYbkOzI1fuFZs',NULL,'141.101.98.113','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36','ZXlKcGRpSTZJbmt4U2xOQlRuQlNiSGxDZW5jMFdIRnJiWGM0ZEdjOVBTSXNJblpoYkhWbElqb2lhR3haUmtGdlNHcFBPREZQUnpsUVNtNUtUbUZoUm5SdFdUVkxjbFJDWVZkUmFWY3JWelV4Y1ROTlZFMXJhMngzVFdacVpGcFphM2gwVG5GNE56QXdOWFpRTkdOSlowdDBObXcwUjNsMGQwODJTRU5pUTB4Y0wxcHpObEJUVjNCMlFWaFNXWEkyVlcxelJuQk5SV0pTVm05S1JuaEJTMXd2T1d0T1JVNVhNRlo0UlZVNFJuWlROVWhuTm5oTVMzZ3hRVGhuU2x3dlZtRlRhMFF4U1dwUmVubzBlRTlpY3pSUE4ybG1SVzVUTjNONVdGVm9hMFJ6VG5aSlNIWnBUSEZrV0V4aGRYbElTbXRYZVZSbmFpdFJOMFZZTW5Fd01YQmphbkpWTjNScWNrbFBRU3RrWTFkTVVrUXlRVkptZW5oTU1uVlNlVUpSVDNGcmVXOXZORkkyTTJWU1hDOUdTV00wTjAwcmMyMWlkRVJSWjBwYWFVOHliMmhVVTFRNVN6bGlPR05xVDFwcVVsTnRabmhLVjJWd2RXeGhiMUoyUkdwbU9HaFNaMjFUV25oVmJXaEhJaXdpYldGaklqb2lZV1ExTnpRek1EaGlaRFk1WTJJd1pqRTNZakUwTkdZellXRm1abVk1WVdFME9HWTRZelppTURZeU5UaGlNVGc1WmpWbE1EVXpOekUwTjJNd1pEVmlaQ0o5',1516723646),
	('dO3JIlnhwhN3KLx3rnN69pLXHetgwb0MiYdOtsI8',NULL,'172.69.62.119','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/600.1.25 (KHTML, like Gecko) Version/8.0 Safari/600.1.25','ZXlKcGRpSTZJa2xPUkc1UmFrVlRNSFJ0Y25SNGFHRnZVRFUxSzBFOVBTSXNJblpoYkhWbElqb2lRakZ5YzA5RFlqRXlUemMyYzFsTVFuSlVabk15Tm1GbmJWbFVkbkl3UVRkUWNUbDBkMnhXTjFwRE1FVTFibTFFYmpWMVVqaDVNRFZJYlc5V00wMXVhMnhwV1dOS2NuUlVhSEZMYVhReE0yNUhiMUp3U0hoMVVDdFdOV2hJWEM5MmVYcDVWekpuV2tGNU5UUmNMMmxZTWpZeU5WQjRUbnBMUm05aWVGRlNWblpWVFhWRFlWaE5OR3RCWTJ4VGJWUm1kV042ZUVwMU5UZGhUelJ0ZG1WUk9XMXhTRmQwTXpKV1FVODVlVzUwWWx3dmRYRXdkbGxwTnpsUE9Wd3ZXQ3R2VUVkdlMwZFNVWE50U3pZeWFtTnpLMXAyUm1SbVlVWkRkblV5TkdNeWJqSkZLM0pOVTBOR2EzQjBlVmh2Y1doR05VdFFObko2ZEhBd2Vsd3ZTRE5GZVRKUGRUQkNhbEp2TkRKeFFVRm9jekZhYWprNWNVOXpUMEZJUkVSQk1Xc3laRmR2Y1V4TFRGWXpkbVIwZFZBek9DdEJPVlpxVkhvd09IbzFaVGhRU1hWMWVEaFNZMmgyVW1jd1ZqZ3hTRk5wWTJKUFdXRjZNVFJ3WjI1alMxVjZWRzluTjFKM1MwMVlXbEYxWlRWTlQwZEROaXMyVms1UVRHNDFSVmRuV2x3dldYSnRUR3gxWjFWTk5VWkdhV05IT0ZwVFpHbHpjaXRuT0ZkV09VZzNaR0l4YkdsTWRHaFdYQzk1WVdvd2RUQXdTM1ZJY3pKWU5HRldhMmhuSzFZelJqSmhRMFYwZVVZeFRsaEtabE5xSzNkcGEzSnZSekZRZGtsNVdIWlJQVDBpTENKdFlXTWlPaUpoTnpkbE9XVXpZVEJtWWpsaU16UTFNek5oTm1Rek16TmlZekU0T1RSbFpHSTVaR1k1T0dZeVlUTTJNemhpTldSaE1EZzVOemMwTnpoaFpETmxaVEEySW4wPQ==',1516719372),
	('EbNFIErCtbvuxL3s2MSdNuPYqk7s9fv84xOWgSM7',NULL,'108.162.245.59','Mozilla/5.0 (X11; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0','ZXlKcGRpSTZJa1J3VEZZMVIwbENObnB1UlRWY0wxZzNNR3BzVUVSQlBUMGlMQ0oyWVd4MVpTSTZJbVpzTlVWaVFtOUhla05QY2pGNVdYcERZMnhSYUhRMFQycEdTRGh1WVdoYU1tSkdSMGROSzI0d05uTk1WVmhtYjBoMlNEWnNXbFF5WldKRllUTTBTbTFzUXpsUlJVaFRVMFprVDJWblRWd3ZWM1JKY21RelZrMHlOMmxrUVdNeWN6ZzNhMXd2VmtKRVNsRmxURkJPYjNkS04yaFJjVE50VEVwdE0ya3djVkJtYm5WRlRWaGpZblJYZGxGd04yczJkVGd4VTFGd2RURnhObWRqUzFSeU0wWlNaWGhQVW5WTFZGd3ZSRTluVEdRM1ZtbFhiVXRoT1d4aFZ6YzRlR1ZySzIxcFZGUm1Sbk53WEM5RVptSjVhMjEzTmtvMFpHWllURll5U0c4d1NWd3ZUV1kxVEdSYVQycERSRTR6T1RsQmRrUmxSWGh5VVdSak0wcFRObkJ2YTFRMVRGZ3hha1ExVldKRFZVWlpWamMwV2t0dmJrOVNkRmRTVjNjOVBTSXNJbTFoWXlJNklqQTJOakppTWpWaU5UZzFNV1kzWWpGak5HTmhPVGs1WlRCbFltWTBNV1UzTmpZMU5HUTFOV1JrTm1GaE5XUmxOakE0TkdabU1qWTNPRFZoWWpWaU1XRWlmUT09',1516744598),
	('fU1tk6CgqQyXA3OQ8tiN7MtZEidSeUuDUzJkHs59',NULL,'172.69.62.119','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/600.1.25 (KHTML, like Gecko) Version/8.0 Safari/600.1.25','ZXlKcGRpSTZJbTlsU3pjd04wTk5aR0l3UlRGR1RuZHBiVU5PUldjOVBTSXNJblpoYkhWbElqb2liVXRpWmtaR2QwbG5Vek56U1Vob1JEaExVemh0YW5wd1pHaDRSMHRrWnpkME1YZHBRM1phVjAxa09UTkxNMUZtVVhwNVZEWkdNV0ZMVGtsNmExTXpTWEE1TldwdmRYWk9TM0ZpZVVSdFFrRnRVVFpNYWpWUFFYZGtVMG8yWkZKYVFrVXJVamxFZFhJeE1XSnhVSE5VTkdSQ1YxVnRabXh6TWpoS1Jqa3dWMUJpSzJ4UEt5dFhOMVYzVURoalYxTlNkV28xTm1ScGFtUnpWWHBSUWl0cFJqWllhRUoxVHpKRFdqRXJTVFJQZEhad1NVeFpRemhvZVd0UFpYVlVNR1UwVkdKTlIxRXhUbXhSZVN0blJqUmlhRzVjTHpGWlJtdHJOVkZUWkRneVRrOUViMEUxVW1STWJrNUJkVTlTVlhacFVFWnFWR3BVY1c1cFhDOXBibVZuTlhWSGFrTXpTREZZTlZaTk1GVXJPVmxJVTB0QldFcHBaejA5SWl3aWJXRmpJam9pTVRFMVlXTXpaVGcwTmpWbU56Vm1OVGsxWkdJd04yRTRaRFJrWVdabU9XWTJOekV3TnpFeU9HUTNOakkzTm1SallUTmpOamt3WVRsbU9HUXpNemt5TXlKOQ==',1516719373),
	('hnd3QAtOgvjHAlvUMRbp3zR7xVcvoaNfvl3gBFfa',NULL,'172.69.62.47','Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online) AppleWebKit/534.34','ZXlKcGRpSTZJbW93ZEdWTVMzSkZORzhyUmxWTllUa3JSM0JrY0djOVBTSXNJblpoYkhWbElqb2lTRlJpWldwVFV6TkxSMVk0YVVONU5rSmtSbkUyZURsSWFtbExjV05NZEZCcVdVbEdNakJJUW5odFoycHBZM2hLZURFNU5DdEliM05tY0U1dVVqTTFOVGwyZVRkeEswTXJVMDUzTkd4VlFXbDVOalE1VGxaaU1IQkNhR2MxVkVaS2JVSnlWek5aVFhObk9WbElhWE5YWTNWVVdraHFTV2QyT1VGWlYyUmFUbWN3YzNWWGQyUlJValUyZFdOeGRsbE1UV05NY0d0d1ozVnBNRGxXZG1kVU5FWmpRM2hPZVhaSlQwNWhSRVJIVDJwU01uUXhkRFUyUjFaSE5VVTNkblJUUlcxNmJHaDFSamN5ZEVOaVIyd3dUMWhMVDJOSVdVWm1XRk5GVTBaSFFsSmFRbGhRVGtFclRqaHZaa2hzYjJ4VE5IZFRRblJFYUZSSVRUWnVhemRCV0VoSVlUbFhkWHB0YkhvclNtTTJXV2hZY2xRd2VFRTlQU0lzSW0xaFl5STZJamRqTTJVMk5tSTRaREV6T0RZMVpXSmlPRE5pTUdNME1qY3dORFF6TURoalpHRXlaVFl3WmpSbVltTmpNRGN4TWpCaE4yTXlOalk0WWpkak9EaGhZV1lpZlE9PQ==',1516735400),
	('kBddvnmOWTZWu7mviMg9G2YeMb7dz5QKFSuGh3Ys',NULL,'172.69.62.125','Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)','ZXlKcGRpSTZJazh6VVVWbU1UZEtVMXd2WTJGVU5VZHNja3RJY1VsQlBUMGlMQ0oyWVd4MVpTSTZJbFpJZW10WFQwOXRaRGgzZVVoWFNscG5Rbk51UVcxTU9EVmxaVmxYWjBNNFIxaFRZV2R1ZGtKU01rOWtjM2xxUXpoek9HOUxOMHQwWkUxNE4zZEtiMlpjTDFveFZIRTJRalZYYzBNNVRXcDBTRVlyZW01MVZVRnNiMUZSVUhoTk1XdHpaU3RpSzBGVlVIVjFhMkpaYVdONk5XaFdXU3R3T1hsRVkxVmxVVzQzTWpkVmJURTNjMUpuVVZsbk5IZGNMMmR0VkVoR0syODFNR3h1Tm5wWFpVTXpRak4yWjJoc1ozcHJlbHd2U1ZBMlZVeEZabE5wU1ZZMkt6QjRNbFJTYTNreVYwZFlObHB3U1RFMFhDOXljVkkwU2xOS1ptcHpTRkJMZEhsS1JXcHpSa1kyWW5CR1IwTk9UWG95VmtOUlVGRkpTRXhZUjBvMEsxRlhaVWx0ZW1GVWJsbDJPVnd2VlhoTFVXRmtibFp1VFhKUE4yeENTRkZRWkZ3dmNURTVWSEJRZURsbVFVd3lNMHhoV1dwNk1sRTFWRFpuTkhwNmVrNTZNM2xGUmpOVGF6a3pSRkZ1WWxobmNUSTFOMWRGYUZKSVFVbFZNamwzZWxwY0wyaHFVREUyUTBSTUswZFJiRm8yVTNGdVdYaDBkMnRIWEM5Vk0wMUVLMncwT1VKbkswOXRLMjVQZUd4SU1sTndhVkpJVGtGd2FHeFNVRGRpWW04NWFsd3Zaa1ZXVTBwNlNrZE1iR3cwWkhSR05IVlFXVzlQVlc1TE5GRTFjMGRZYkd0dmEzTnFWSFJwWjFCMmVEWlVTbTVqYkd0bE1XZDNibTlqTW1kaFVIRm1NMVJ0UkhZeVRHNVBUV3RVWVVab1VEaHFkbVJUYUd0blBTSXNJbTFoWXlJNkltUXdaREUyTVRCalpqQmtORFl4TnpWallUVmhNamcxTURnMk5XWmxPREk0WXpNeFkyRTRPV1F4T0RjNE9EbGhNV0prTURneU56WXlOV0UzTm1Fd01qSWlmUT09',1516722573),
	('Or4rVAKeuVxe6c3ypWRr8pHMIOwfujhzVkebGyh2',NULL,'172.69.22.75','Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Tablet PC 2.0)','ZXlKcGRpSTZJa1pMUkZkNVdYbFBYQzlxZUdsWWRtMUdWbE01Um1kUlBUMGlMQ0oyWVd4MVpTSTZJakZsUmpOak5FSTNLMlIwUVhKUlZUUXdOM05VU1VOa2RqUjVUSE13T1d4S1FXaHJZWFoyWW14U2NsWlJlV1IzVUhaRlUwZGpZVXRET0V4SmJIWlJkV1JZYVhGTGVXUjBUSFpPVEU1c1NsTXpjSFo2VjFGRFNWd3ZXakp5WW5oclVHRXhWVTUyVkdweWJsZEhWMVJhYzFwc2VEVmtlVnd2ZERsME5HZzVNRnBPY1ZaUFowUmlNSFpIV21SVGRuWk1lbU5vUkd4b2VHWjROVk5ySzBKR1dFUjRNRVF4T1ZWWmFrZEZZWHBIVVhkbVdrSkVPRXRYTUZaTVEzZHJiRXB0YVhWa2VFZHZjbGxGZG0xaVZVZ3pRbFZJTjJoWFlVSkNOSE0yYldJNU9XMWFTa2hQYmpKaVhDOVVNMmhwUWpkUk5reDNWamhTY0cxUVIxd3ZkMmxFVXl0aFRtNVRUbTFOYVdoWFdsaHBhalJITTJsbE5XVkpaMFY2WnowOUlpd2liV0ZqSWpvaU0yVmhZek5qWm1ObU9UUm1aR05rTW1ReU1HTTFPV0U0TTJZNU1HWmlZVE0zTlRReU1UY3dOR00wTnpsbE1qWTNOVGt5TnprMFpUSm1OV0l5TWpObU5TSjk=',1516773528),
	('PVqKIei6WOTp8nb3fnWGgtAmkdD96khZxt73EDFj',NULL,'162.158.106.43','Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)','ZXlKcGRpSTZJbFEwWkcxQmJuaEhNVmxXY0ZZMmNXTndXbXRyUzBFOVBTSXNJblpoYkhWbElqb2ljRE5JVDNOeFpsd3ZRME5KVm1kQ09URktWMk52Y25oblJIRnRhM05DWEM5QlJVaExhbGxSZVhGSlJTdDRRbWswZUdKSE0wdEZZWHBvUWpWc2JteHNLelY0YjIxMVVqSjFPVlV5UmtSQ2FuRkhjRlp1ZG1keksxRkNaRTl4ZFU5Q1NGazNhWE5UVFRCc2EwTkhkSGhUU2xKRVNXWXpUMkZ1U0VWSU5VOWNMMUoyWmx3dlZtNHpWMloxZFU0ck0yZDNPRXhxVjF3dmRIUm5PRE5TYnpCdldXaGtSR0V6UlRSRU9YUnNZV3R4UjBNek1YTlVXVzFKV0RFMFUxRnFNQ3RIVTI0MGJXbDNSRWxUZHpFd2RERkZaMjF1YUN0b1JXNVVVR3d4U1ZVclZEVkVWa0YxVlVOTWJsbFZaVnd2VkhaWlJUbHZZVGwwZVZVMldFVmxkVmsxZG1aTWJIUk1hWE1yY0RKRlMzbFVjbTl0UW1VMGMwa3hLMDlFTUdjOVBTSXNJbTFoWXlJNklqVXhZVFV6WW1Oak5HWTVZV1psWTJZek5qVmlZalEwTldNeU1HTmtaR1UzWXpjd1lqY3pZamd6TTJVMk1XRmlaR1V4WkdRM1lUYzFOV0ZtT1RObU9XWWlmUT09',1516787374),
	('R9xrCuAwQvOOACdtwXNdgezAF8colEroo3oqZ8km',NULL,'162.158.79.72','Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online) AppleWebKit/534.34','ZXlKcGRpSTZJaXRSWVRGVFEwMVNjbFZDWVRKY0x6aEZjRTh4YUhoUlBUMGlMQ0oyWVd4MVpTSTZJbUZtSzJ0WFpIZHpkREZsY2twUU4wTjZRa1pjTHpVd2VHTjZjRloyYUVReGNuRjRNRko0UzBGbVVtVXpkamxhZVc1cVJVNXZkM0U0UzJSdWFWZGNMMDloUmxOeVdIUkpSbEJFV25JMVVYRjFlVEE0VFRONWRuVnNORzFHUTFwdFlsd3ZSRXRrZEhneU9URnVibmszVEZ3dlpYUXpYQzh4VkhCU1Exd3ZURXBUTnpOemVGRTJNVWxMZW05TllVTktla0pGVVRoblp6RjRVMU5jTHpWTVhDOTFRbkJhU0ZoelpWRmxkVTE1VEVrclRuQlNlVkJyWjFOQ01FRTVjazg1UVRaWlUwdzNORmRaVjFOUmRETktTV3BjTDIxWVVYTkdWRGQxYUd3MlRrSlBUV0U0WTJkTFYzRlNTREZHVDBGUE9HVjFhbE5ZUlhnNU9FTnVjbXRRVURCa1prUnpUMUJVVlhaWmNDdFZOMGhHY1hkVlhDOWFNbHd2T0ZwU05rVkRUVkU5UFNJc0ltMWhZeUk2SW1Vd1lqZG1OalEwTlRobU56Y3pZekJsWW1NMk5EVTJNbU0xTTJVMllXWTNaR1l6T0RrNVlXVXhZamRrT0dNMU9HTmlOR1kwT1RaaE16Y3laV014TkdZaWZRPT0=',1516735403),
	('RF6DOyf2UFqp6nUPqHUqgV9CeCoHdjINNagZyZ36',NULL,'172.69.62.119','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/600.1.25 (KHTML, like Gecko) Version/8.0 Safari/600.1.25','ZXlKcGRpSTZJbXQ0YUZKelhDOUhjRnBSYjFCSU5EVTNlazQ0WVZSblBUMGlMQ0oyWVd4MVpTSTZJamxMYWtWRFdIVXJOMXB3YjJVd2NFdHpNRWRxUTFkRVkxaEVSRlo1V2t4d1NrNUlTVUpoVFhGbWJEVmthWFZTT0dWamVsbEZZbHd2Y2xoUmVEZGNMM2RKUTA1S2QyUnhjVEJEZEhsMVEyaHpVbWhVYjNKSlJIZDNPVkZ6UlhwQlNrZFdUM0JMUldSelVUTnBVRWxYTTB4bWMxVmlRVWxzYjJ4QlkxVnRNVGMxWkdaclIycDNSMU51WEM5VGJHaHBhM2x1ZDNwSU1FUlBaM05WYm5WMk5tNDNkMHhwUW5GRlJqQnVSVnAyZVU1eVZtMHhaR1U1WWsxSGVIaHdhREF5ZUhZMk5uUm9ZbVV3WkRSRGRXUndlVkpsVEhaUWIxZHNkRVp2TUVwWWFXMXBkMUp6YUVkeVNrdE5VWGM0YUVwV2NWUTRSblpGVDNkUlZrb3pkR2hDWldGSWRuRlJiazFjTDBaTWVqQlpYQzgxSzAxeGJIazRNMHgwZG5aQ2JESklUME5VVUhOdWNFMVNSVmhwT0hwSlpFVnRiMUZOZGtGTmNWaGpVRE5tU0U5b2FsWlhNWEU0WkhkVFoyOTNiV0ZTZVVWVVNFMW9kamRVT1U4MlZGVlBNMjFKYzBSeGNGd3ZjMUpXZVhCMVJGbDFTVFpvYzJWRU5Wd3ZPV1ozUWxwNUswWjBZV000VW1seFVYQjFkMmxoYm1oT2RVOU5XbnBpU0VOQ2FFNUhNbVZ1YldkaVdrOU5NRWhGWjJkR0sxWlBXVlpZTUZsVFJpc3JYQzl4UW1OaFNEbFBRWGxvVG5aWVdWbHFkRWNyVWtkUk5EZEVSV3hTZFhWNlNWRTVVM2M5UFNJc0ltMWhZeUk2SWpjM09EQTROMk5qWmpabE1qbGlZV1JpWldNeFpXSTFZVEUzTXpoa1lqSmxaVFF4T0dObVlUazVOemcwWW1JMVl6SmxZalkzTmpkak5HWXpaVFU1TXpRaWZRPT0=',1516719280),
	('SAWCG1mKpwhgb4rCMJrFe1JovGEoISIIi8SUlmF1',NULL,'162.158.106.43','Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)','ZXlKcGRpSTZJbXBTTjF3dlNIb3hYQzlMUTFZMmEwWm9hR0ZOU1ZBeVp6MDlJaXdpZG1Gc2RXVWlPaUkzYUhSUk9HZzRSMDFGSzNKUFpXWjVURUkwV1hwb2IzWmtjSHBZYzI5eFdERXdVRGxNWkVaY0wzZE5YQzlZTlVJd1owcDNibEpMYWtaRlNtNTVWMjUzYjJZeVJqRjFTV3hxTkRaUVZFRnhUVlJYUzJwYVNXUjNia2w2VTJKa09GRXJZbmRWUjBOQ2VXMXZiMlYwU1RWWlExZEVOa0pJZEZwbVRscFdhWE42YmpOeGRraFFSR2h2UWpscmIwcHdLMlF5WmxOc2JVNXJTVlZhU1dsMVRuQXpjM2hpYjJsSmEyNXlTVGRTYlUxclIyNXRNa1IzUld3MmVXWlVTM0JpZVc1WUsxVmtUMHN4UVdJMVVqRTBXSEJGUm10cU9YbG5WbFEyZFRCVGJGWnJYQzlFUkhoblRrWTFhRTVSYnpSb09WWkljVk5wUWs4M1NGd3ZWSHBUTUVRNVVGRTNlVUk0WlV4RmFFaHVjbmcyZWxwVFoxd3ZNM1Z1YzFKQlBUMGlMQ0p0WVdNaU9pSTROR05rTWprek9UWTVNMk5sWldVM01HRmpNR0ZrWldSaU5qSXlaVEF5TVdFNE5qTmxOVGRpTW1FeE1qTTNZalJpWVRSaE5XUTVZV000Wm1NMVlUWXhJbjA9',1516787364),
	('SSE8bISBM36WKjTb8bPBtePvT1B5EtbDkAOJKHaT',NULL,'172.69.22.153','Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online)','ZXlKcGRpSTZJbkJvUW1Sb2VHeDZWVnBpVm0xMU1FMW1kWEpNUldjOVBTSXNJblpoYkhWbElqb2lVM2QyTTNnclRrTmhjMk4wUkZOclUyVXlia0owTms0NVprTkZabGREWlc5cmNETlBjV3RsYTNOaVFVZG5jM2xFTjNoY0wydElabkpwVWxReFNUWkRTVWRMZW1SUVZVWlBYQzl2VFZ3dlprRnpZMUJwWlRKa1J6QllRbWRKWm1WSFpGZDNUREZXZUVGdmJGcG5TbkpJYVRGSE5GQkJXakJKZFhCQk9WRTJhWEJEZFRkeEswSkdZMlJyVTBsclUxd3ZTVkIzZEdGallYWlNOR1VyU25sVmNrVjNlVXRTVEZneVowMVpkbVUzUVQwaUxDSnRZV01pT2lJNU1EUXdNamt3WkdFMlpXVXlaVGt6TWpFMlpEQmpZbU01TlRka00yRm1OV0ZtWkRkaE1qVXdZamxrTm1FeU1EUTJNMkZsWTJFMVltSXpPVGhrWm1JM0luMD0=',1516735399),
	('UmPdEl4kQAEKehzs4yy5bja0LtQY1jhyajoxjovx',NULL,'172.69.62.125','Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)','ZXlKcGRpSTZJbThyZFRjeFdVWkhPR3AxVEVWd1RFeEtlbkpCYVZFOVBTSXNJblpoYkhWbElqb2lURkpYY3pOb2MwOUJibTlOU0ZNeVdsQjVjWEpwTm1GWlpHMVBURlJsVW5wb2VXdE5WVFl4WlU0clRUZ3laMWwzUVdOTlprRlViMjVpVFdWbWJscGphVU4zVW1wSlUzRk9URGhaYmpWamJVUktkVVE1WTAxc1ZGRlFZV1ZLSzNONldFeERXVmhTTm5relJWbDZiVWRLYjNGTmMycHFXalJaV0VJMGJscDJNbkExTkVkWmEyRkRWbXM0TmpKaFNGaGtZa1IwTUcxdFYwNU9OekZDZEd4bFRXdzJRa293T1ZaVGNWQktSVXhKZW5wRVZFbHZWVXhJWjJScmIxd3ZRV0U1T1hrck1XWkxhQ3RsTTNaRGFFRklibTl2VjB0TldtTTBaV3hLVjJOWE5EaE1TbXA2WkZNMmFWZFFSMU41VkdVeE0xSlpiVTlwYlU5bVdGZEpRbU0zUW1wNGNHeDJSblZjTHpKT1lYZFpkVmQwYTJkd1UxVk5RVDA5SWl3aWJXRmpJam9pWWpZME5qUTVZak0wT1RObFlXSXpNV00zWWpnM01tTmhNbVZsWVRjM04yTXlObU15WXpGaVpHUm1OemRtWW1aa05qUXpNMlEyWWpneU1qSm1aV00zTkNKOQ==',1516722573),
	('VEDXP2MyDLnEJwhvSfwNIZH0ROxvQEMW9rqHL4c4',NULL,'141.101.104.192','facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)','ZXlKcGRpSTZJbXhMWjJoalUxQklPVFJNZGtWVVJEQkRWVWd5UlVFOVBTSXNJblpoYkhWbElqb2llSEpNUm5OT1VraEdNbFZCUkVOa1YxSnBNV05vWjJ0aVhDODFRbnBuT1VwSlYxSTFWekF5VW14aFFURTBNM1Y2WmxaYU5WUkVNWGg0ZURORWVHZzNOMUpxTm5WWFRVUTFaR2RVT0ZwU2NHTjZkMGxaVEZWR1pUZE5iMjVoU1VSVVoydG5ZVEI0WjJSV1luWlhNMGhPV0hSTFhDOVlhbFZCYW1ZeFYwZEpiVnd2ZVU5cGVERktiVzUyTUdOUmVuaGxLMGRUUXpsUVdGVkRZak52YURORWQyazJOVzF3U0dwQ05XdHBNelZ1VmpsUVNUVXhTbXRETWl0dGFEQk9XRFoxYnpGTk9YaE9hMWcyUjI1b2JXUkdWV1pxUVZCaU5GWlBTa3RITTAxVWNFTjRWVWh5ZGxGTlowbHBlbEpOZVZodldFUk1iRzVGVVhCNFJsaEhOMmd6YUhBd01WQk1XbkZEUkZCaFZWZEdaa3B3ZFVwSlRGVmpSbWM5UFNJc0ltMWhZeUk2SWpVeE1EWmhPRGxqTWpBNU1UTTRPV05qTWpJMFl6VXlZemRoWkRVelpHTTVZelZoT0RabU9EazRaamhqTkRNd1pqVXpNV1kwTmpVMlpEVXlNemsyT0RVaWZRPT0=',1516740913),
	('X2rSiCq6a0QernH15LMHOhfO4VJi37EsC5MZ4FL4',8,'162.158.154.116','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0','ZXlKcGRpSTZJbEl6YjNoRVZVOTBkWFZTWm5Sb2MwTm5WakYzY2xFOVBTSXNJblpoYkhWbElqb2lVRU5NV1ROdGQwUmhSbU55TVdoTlJGZFlXRXBJUW1oUFl6QklURTA0T0dsMmMwRkxjRXR1ZURZeU5VcHZiWE50V1hCNFVGWjNWemw1V1hOTFZIaFJVbTgzWWxWdU0waFViMWxZZHlzclFteG1VRkZETm5adU9VWjNXV2hFYzFKaFJtVkhZMjFhTmpWUmVUbGpLMFZDYkRWSVJXcHNRVEYyZWtaNVVHUlJlaXN6Vm01b1NrczVjVkJMV1U5eGVDdG9VVFl3TTJrNWRsSnlUak5PUkVwd1hDOXFTbWRhZVhNNFEwSmFNREpoZWpsc1NGd3ZUblIxUVd4RlFtNTVVeXQxY0ZsU01WZEhlalZFYW5Fd2JHUkdZVGRQVjBVMldqSTRPVlF5VGt3eE9WUlJZWGRaYUc5dVUzbFFUM2RRWVV0aldubG9ObHBuT0ZSWVdHWnlXSGRwYVRZemEyNURaM1JjTDBwNVpWSnNVMGxEWjF3dmJsQm9VVlpGZUZKcUt6VnFYQzlDTkdSVlRrbE9WM1YzWm5oNGRqZ3dSRnBKWnpBeFpIVnhVbGQyT1ZWVFJqWkhLMlpvWkVaVFRXWTNlREZFYzA5S1pWSnlRMXBrYUU5UWJFUktibGswUlVodVZHeGtjRzlHVjAxbWIyaFVkVVpRSzIxRFdGZDBPRTByTm5WcVNuQklNMlJqTURoWlEyVm1hbTAwTXlzMVRrc3hXWGgzZDJkSmFUUXpUVGRWVjFaSGQwdzJjRUpEUTNZeGJXOXpTbkJwZFdOS0syVXpRM0ZsVVVwTE4yeGNMMmRGVkZwcVdYWkVSVEpXVFZCMmNVRnJZek56UmtWQ01GaFdSaXRxY25KSk9EUk5Nek0yWkcxTVpqSllhR0Z6YjNvd2RTdFVjbVkwVFhsd1VETktaV2x5ZUhrNVhDOU5ObXBMYmxSbVlWaHBTbkZZVWxKcU5GaFNRVDA5SWl3aWJXRmpJam9pTlRBMU5qazNaall6TVdRek16ZzFPV1V3WTJSaE1HTTROV0kxTXpJMk9EWmpZVEEyWkRWaU9EVmxZalkyWm1WaVpEVmtPR1UwTUROaFpXRTRPREExT0NKOQ==',1516716688),
	('XeUG4WmiwNVv9xvJV6kXZQIT4eALtzUUGoyrDEtZ',1,'141.101.98.113','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36','ZXlKcGRpSTZJbWsyVEdKSVoyVjVWRXBHUW5SaWRtbE1lWEZZYzNjOVBTSXNJblpoYkhWbElqb2lOMUpITVcxMU5qSTVhMngzU1VSQ1VFdEZaSEp2YjNSWlEzVlVXamMzVkRrd1JXRktURXBhTVRCTmFuTkRUa3RTTkRWRVZVNU5jbmhxUWtGV05YcHZhVzVqYkZKdVptOVBTWGx6WlZVMk0yWm5aazloS3poMWIwbHBiemhtTm1ocWJreGFTMVpzVkZkUWFWWTJYQzlLT1d4V1lqZE5TblZ0VlRoT1dVcGFjWGxpUVdsSGNHVmxTMkp0VmxWNFMzbDZNbFJEVG1wd1JrTXdZMnM0WTFsNVUzTlpZbEpRZDFCTE0zaGNMM1lyWTJ3MllqaDVRMUpUTkhSdWJucHdRbHBFU2tSUWJHcGxVM3BFV2tadU0wcHdVM0pTVVdVd2IwbERaVEpLVHpOV2FsZDZWRlo1V1RaV09UQkNSWEZqU21RMU5VTXhaM1JDUkdGVVIybFZTMUZEYW5kMFZHZFNWVFpKVXpGalNYUk1hMWxoUjF3dldrVTJZMjVjTDJFMmFVeEpaSHB6VlRCMVpYQkdiVzlIVUZkQ056SktjaXQ1U2xCVWJFMVZhVlJNUW1wd0swNTBOWEp0U2xGaU5rRTJibVpPYVVOT2VrcGxjbGN3TmpjMWVqVjRUME16Y1c5bGJsWmhUWEJ1TWs1WGNuRkljM1pHUjA1Rk1XUktWa0pHYld0NFJraEhaM3BrYXpOd1psQnlhMjlNVFZaeFRXaDZiblptZERVeVVXcGxZVk5LZFhCSVlsbHlaSFpWVFdGV2IxRk1TMU5sTjNrcmJrVnBPV2h3ZEhRMVdqRjVZMDFzUWtkS2JtcFlUVmxaTWs1bmRtWmpNVXhEVVV0UVYzTkRkbmhWZG1KS00xWjRTV2hyT0hoalprcEVSVFZxTjJOUGFXVlJlV1JWVlhSeGNIaHNWVFJMSWl3aWJXRmpJam9pTnpFMU9EQTJPRE0wTldGa05tWmxNRE5pWm1Fek1qazVNREF5WmpabFpUVTFOVGRqWlRRek1qUTVPV0U1TWpRMU9HUmlNemN5TkdReVpHUmpOalV6T1NKOQ==',1516726928),
	('z2BKw0tD02DiN3j9CxQuYZHClakY1aFN4KMwraaF',NULL,'172.69.62.95','Mozilla/5.0 (compatible; CloudFlare-AlwaysOnline/1.0; +http://www.cloudflare.com/always-online) AppleWebKit/534.34','ZXlKcGRpSTZJbVJTVTNGbk1IbExLMlkzUTA0MGJVbEtabnBXWW1jOVBTSXNJblpoYkhWbElqb2lha2xuVDNoU1R6SXljWFZuTlhGTVFYWTFVRWN6ZG5KaWFTdGFaVlpHYUVkdFZtZHdjMVpoTjBaVmRtTkJXbHBUYURkaE5XOVFkRlJUUm5JM1ZFNWlWMFk1VjJOcU1uZHZNSGh5VEVSTFprOWpTVGRWYldNNFJXMHhPRkVyTWxwUlFscE9lVVZtUmxwSU1rMTRSa0ZEUWpKUlVHRlVTRmxLVUVac2JsSmpNMVpjTDFsdGRVUnNORmM1V0U5Q2JtUnZZbmxRWlZZemRsQnJabUo1YjF3dmIzaFViRTl4UW10Q1NUbEplVTU1YVZKWlJITXhUMk0wVUN0QmVsWXllVlJTVG1GaWVqQjZOMXBRZVNzM1dEWk1VM1oxWm5Vd01VMVFOMlphS3lzM1pITlVTbXBIZFZkU1JXUXlTM0JsVlhSaGNsQkRaRTVYYlhReGNTczFZMlZGYzI1TmNIRTBibFIyV0RoS09FeHNZMHRNZVdGVVpEZEVkejA5SWl3aWJXRmpJam9pWmpsa1lqUTBNVE5rWVRabE1EVTBZamsxTm1SaVkyRmtaREF6T1RVME5HWTJNV1JrTTJNeVpUazRNamRrT0dJd1ltRXpOakZoWVRObVpUUmtNak0wTkNKOQ==',1516735403);

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
  `demo_mode` tinyint(1) NOT NULL DEFAULT '0',
  `enable_https` tinyint(1) NOT NULL DEFAULT '0',
  `theme` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'default',
  `facebook_page_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `google_page_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter_page_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `youtube_page_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `google_tracking_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `google_oauth_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `videos_per_page` int(11) NOT NULL DEFAULT '12',
  `posts_per_page` int(11) NOT NULL DEFAULT '12',
  `free_registration` tinyint(1) NOT NULL DEFAULT '0',
  `activation_email` tinyint(1) NOT NULL DEFAULT '0',
  `premium_upgrade` tinyint(1) NOT NULL DEFAULT '1',
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
  CONSTRAINT `tag_video_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `tag_video` WRITE;
/*!40000 ALTER TABLE `tag_video` DISABLE KEYS */;

INSERT INTO `tag_video` (`id`, `video_id`, `tag_id`)
VALUES
	(28,569,28);

/*!40000 ALTER TABLE `tag_video` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;

INSERT INTO `tags` (`id`, `name`, `created_at`, `updated_at`)
VALUES
	(28,'test','2018-01-22 16:20:56','2018-01-22 16:20:56');

/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;


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
  `active` tinyint(1) NOT NULL DEFAULT '0',
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
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `activation_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remember_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `stripe_active` tinyint(4) NOT NULL DEFAULT '0',
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
	(1,NULL,'ianlainchbury','ian@unilad.co.uk','Ian_512x512.jpg','$2y$10$hQ1gfosDlXTg/lbMG13esOLBigG1Clsp5BCq89nGdFArWkgDEt3Xa','admin',1,'2014-08-26 23:43:33','2017-12-12 10:01:46',NULL,'C3tZN1ov6GWR4dTtNKPIaC5HIZLMHC2sNFmHr5nXHXVC7ADg03VDoyaITgcN',1,NULL,NULL,NULL,NULL,NULL,NULL),
	(2,NULL,'mikewright','mike@unilad.co.uk','default.jpg','$2y$10$gDmaGO132AbobbUUrUBPIOaGpMdKeGdWYf1Wi0JoRBciKjTAM6aku','admin',1,'2014-12-21 19:26:04','2017-12-12 11:17:29',NULL,'BlF72t1AzDxbF5l5Kd8h0DnMHRF5OojPLqDJ6JfPWed5dbK51s614G38nqHt',0,NULL,NULL,NULL,NULL,NULL,NULL),
	(3,1,'dailymail','dailymail@unilad.co.uk','5a26c55de47c1-dm_com_29.png','$2y$10$8CylmzTwomm5IXhucbwXS.MdR7rE5NjJPgxexo57HQSonAP1uHkwW','client',1,'2017-12-05 13:36:43','2017-12-12 11:18:39',NULL,'nNq0g3fCXG6EYM4ZBH8z8d5DKEtOCWxvb9amXdIpdTAlMmPJDO8MRjbNMGiL',0,NULL,NULL,NULL,NULL,NULL,NULL),
	(4,NULL,'Manager','manager@unilad.co.uk','default.jpg','$2y$10$pNLwNXNeluGz03vVjEUAvO9zn6Dz/1VJ.OZqkx49efbKJYzLpdz2m','manager',1,'2017-12-12 11:31:08','2017-12-12 11:31:08',NULL,'',0,NULL,NULL,NULL,NULL,NULL,NULL),
	(5,NULL,'adambourne','adam.bourne@unilad.co.uk','default.jpg','$2y$10$0zFPsXpJYPz9zSUi0CqRVOn9lFMcmvBoB17ddUUlTGM/iSqfRCuzm','admin',1,'2018-01-09 12:23:59','2018-01-10 10:58:05',NULL,'uJYsXIWCY00bmzg1YQlAG7avQYQDHoGAPCN7bkD7ejBiK1bgLnDnKq8agH4e',0,NULL,NULL,NULL,NULL,NULL,NULL),
	(6,NULL,'adam','adam@unilad.co.uk','default.jpg','$2y$10$ytBxmWPFPJA0xQLX2XR1WOgt7rXWtozd7PcozP3DnQQ/q5E4NNIbK','admin',1,'2018-01-12 09:47:32','2018-01-12 09:47:32',NULL,'',0,NULL,NULL,NULL,NULL,NULL,NULL),
	(7,NULL,'mel','mel@unilad.co.uk','default.jpg','$2y$10$kUPNTJqQfRxLL5baoASyZu6.0yZ.J6Pfsf86.lGwGEgkB7HD1NgDq','admin',1,'2018-01-12 14:00:18','2018-01-12 14:03:40',NULL,'7S8fVFIFNYCe9YcNdlXTmI4Uhygm0CQHUIbNIvEOv3re83TvCgCssexKWN7w',0,NULL,NULL,NULL,NULL,NULL,NULL),
	(8,NULL,'ridgway','ridgway@unilad.co.uk','default.jpg','$2y$10$q7dJlRBx7P/okWYvbqq/..LW7JJ.X8UiuqG2yqwicSQCNHUToajri','admin',1,'2018-01-23 12:47:11','2018-01-23 12:50:32',NULL,'',0,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table video_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_categories`;

CREATE TABLE `video_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT '1',
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
  `order` int(11) NOT NULL DEFAULT '1',
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
  `order` int(11) NOT NULL DEFAULT '1',
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
  `alpha_id` varchar(10) CHARACTER SET utf8 DEFAULT '',
  `state` enum('new','accepted','rejected','inprogress','pending','licensed','restricted','problem','noresponse') CHARACTER SET utf8 DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `contact_id` int(11) unsigned DEFAULT NULL,
  `video_category_id` int(11) NOT NULL DEFAULT '0',
  `video_collection_id` int(11) NOT NULL DEFAULT '0',
  `video_shottype_id` int(11) NOT NULL DEFAULT '0',
  `title` text CHARACTER SET utf8mb4,
  `rights` varchar(255) CHARACTER SET utf8 DEFAULT '',
  `access` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT 'guest',
  `details` text CHARACTER SET utf8,
  `description` text CHARACTER SET utf8,
  `notes` text CHARACTER SET utf8,
  `referrer` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `credit` text CHARACTER SET utf8,
  `active` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `featured` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `views` int(11) unsigned NOT NULL DEFAULT '0',
  `image` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT 'placeholder.gif',
  `thumb` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `mime` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `ext` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `file` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `file_watermark` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `file_watermark_dirty` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `youtube_id` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `embed_code` text CHARACTER SET utf8,
  `duration` int(11) DEFAULT NULL,
  `date_filmed` date DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `source` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `more_details` tinyint(1) unsigned DEFAULT NULL,
  `more_details_sent` datetime DEFAULT NULL,
  `more_details_code` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `reminders` int(11) unsigned DEFAULT NULL,
  `contact_is_owner` tinyint(1) DEFAULT NULL,
  `submitted_elsewhere` tinyint(1) DEFAULT NULL,
  `submitted_where` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `allow_publish` int(11) DEFAULT NULL,
  `filmed_by_me` tinyint(1) DEFAULT NULL,
  `permission` tinyint(1) DEFAULT NULL,
  `is_exclusive` tinyint(1) DEFAULT NULL,
  `terms` tinyint(1) DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `licensed_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `alpha_id_2` (`alpha_id`),
  KEY `alpha_id` (`alpha_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;

INSERT INTO `videos` (`id`, `alpha_id`, `state`, `user_id`, `contact_id`, `video_category_id`, `video_collection_id`, `video_shottype_id`, `title`, `rights`, `access`, `details`, `description`, `notes`, `referrer`, `credit`, `active`, `featured`, `views`, `image`, `thumb`, `mime`, `ext`, `url`, `file`, `file_watermark`, `file_watermark_dirty`, `link`, `youtube_id`, `embed_code`, `duration`, `date_filmed`, `location`, `source`, `more_details`, `more_details_sent`, `more_details_code`, `reminders`, `contact_is_owner`, `submitted_elsewhere`, `submitted_where`, `allow_publish`, `filmed_by_me`, `permission`, `is_exclusive`, `terms`, `ip`, `licensed_at`, `deleted_at`, `updated_at`, `created_at`)
VALUES
	(1,'FhBcTXez6Q','restricted',NULL,NULL,0,1,0,'Owner stops petting dog','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.reddit.com/r/aww/comments/7d55y7/whenever_i_stop_petting_my_brittany/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(2,'kbfPJBsgTs','restricted',NULL,NULL,0,1,0,'starfish walking on the beach ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BMPONbjBYLc/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(3,'fv49jJN44R','restricted',NULL,NULL,0,1,0,'Dog chillin in hammock ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BYzFX1dDVMn/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(4,'ZE19Pt47SY','restricted',NULL,NULL,0,1,0,'Dachshund Mario Kart','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BbC_fm_nf-b/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(5,'6xvjqbfK6b','restricted',NULL,NULL,0,9,0,'Cross sfx make-up','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/UnusualHorror/videos/1575080745905101/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(6,'yDDVNtvdHd','restricted',NULL,NULL,0,5,0,'Daughter follows her Dad when he has food','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://twitter.com/_3Trinity/status/768577512112664580/video/1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(7,'BSJbtb6lgX','restricted',NULL,NULL,0,6,0,'Veteran reunited with dogs ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/ZombiexFace/videos/10206909930365566/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(8,'nxJS6QXBhe','restricted',NULL,NULL,0,9,0,'Interesting slo-mo on the road','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/8geuehYuMP0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(9,'TFEXJ8qqwq','restricted',NULL,NULL,0,1,0,'Bear Attack, Man is trying to run away from attacking Bear: GoPro','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=eK0pO79YkvY&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(10,'jYHcrXHnyI','restricted',NULL,NULL,0,1,0,'Albino alligator','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BbLPxSugJmq',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(11,'HPktrl281g','restricted',NULL,NULL,0,5,0,'Twins photo prank','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/8GvDudVgxCY',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(12,'p8C27INHLt','restricted',NULL,NULL,0,1,0,'Dog being dragged','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BUAo-_elt97/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(13,'gTr2lEhHc8','restricted',NULL,NULL,0,1,0,'Raccoon and his weekend plans ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BbmL1ChHzfN/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(14,'KpYVVeSLci','restricted',NULL,NULL,0,1,0,'Dog smiling when being stoked','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=hI_J8rK9jyw',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(15,'mlc5q4MYLm','restricted',NULL,NULL,0,1,0,'Dog in mucky pond:','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/uniladmag/videos/3761625000527198/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(16,'31KEf5llnJ','restricted',NULL,NULL,0,5,0,'Kid wants burger','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BaW7b-GBAM9/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(17,'jNZYYGSRjI','restricted',NULL,NULL,0,1,0,'Dog eating popcorn','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BT1bQr7jDI3/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(18,'jc32bEFj1N','restricted',NULL,NULL,0,5,0,'Wisdom tooth removal','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/BrrAFIcCZ48',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(19,'hFejQ5ZZWI','restricted',NULL,NULL,0,1,0,'Dog walking through barrier','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/Bb11ve1j-Fz/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(20,'giPLssTs6Z','restricted',NULL,NULL,0,9,0,'Syrma - Super Sport Concept - Amazing car','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=upCX1hYFgQg&t=9s',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(21,'w5BK3lrCPC','restricted',NULL,NULL,0,5,0,'Is something there Prank?!','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/5uMfr_5T9I4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(22,'WFrBSe9WTT','restricted',NULL,NULL,0,6,0,'little boy crying at wedding video','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/irishmirror/videos/1778105852229171/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(23,'s9h7cfLEqM','restricted',NULL,NULL,0,3,0,'Mind the gap','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcDSQmng_jS/?taken-by=animalsdoingthings',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(24,'8ECT1c5DSp','restricted',NULL,NULL,0,1,0,'Dog hugging owner\'s leg','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/upliftpost/videos/1554774621249610/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(25,'W1j9YCEELL','restricted',NULL,NULL,0,9,0,'Color change of molten bismuth surface by oxidation','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BbG5EyBHcBI/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(26,'b1gVTSbkCn','restricted',NULL,NULL,0,5,0,'Baby eating cheesecake video','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/tyguns.martel/videos/10154910885406744/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(27,'cibBMEPl5F','restricted',NULL,NULL,0,7,0,'Climbing wall workout','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcCzk6yBxuH/?taken-by=fanny_josefine',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(28,'cy6CQJf1j4','restricted',NULL,NULL,0,1,0,'When it\'s Friday and you\'re all dressed up with nowhere to go. ????????????','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/dogsandotherunsolicitedadvice/videos/1649160481782062/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(29,'LfcHMQbNp6','restricted',NULL,NULL,0,5,0,'guy dancing on trailer','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BcOIbyOl2LS/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(30,'NXwqq3xveG','restricted',NULL,NULL,0,5,0,'Dating 3 Months Vs Married 3 Years','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=ZxYb5j4M4VA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(31,'cFqK5MsF5X','restricted',NULL,NULL,0,1,0,'Corgi shakes off his pants ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BJjOS1Nh-Un/?taken-by=marty_party_thecorg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(32,'2cT8s5pXGK','restricted',NULL,NULL,0,5,0,'Stages of Drinking ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/lkLPIQNBW0A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(33,'mccxlMJHBh','restricted',NULL,NULL,0,5,0,'CRAZY GIRLFRIEND THROWS PS4 IN BATHTUB','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/iyyLWr3fpBk',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(34,'k4bEf7qKhL','restricted',NULL,NULL,0,1,0,'Guy rescues mole from dog','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/david.e.partain/videos/1647990178598053',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(35,'EZtwXxm4iP','restricted',NULL,NULL,0,9,0,'Revolution of Extreme Fluid Painting!!','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/DJW5W_Xu3xk',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(36,'BfzScV6YyD','restricted',NULL,NULL,0,5,0,'Santa on bike','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/uniladmag/videos/3980539185302444/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(37,'FmELpLSidN','restricted',NULL,NULL,0,3,0,'Guy falls over on ice','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/jeegcxatu20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(38,'I6j8FdSb3y','restricted',NULL,NULL,0,1,0,'Big dog hugs little dog','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BW-_KfcA5OO/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(39,'WrqsVhjy1l','restricted',NULL,NULL,0,5,0,'Fish Hand Gesture','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3893136815913159160/0B82D0D9-3EEE-49D2-BBFE-70231A6B1BA7.MOV',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(40,'V2drV4RsyQ','restricted',NULL,NULL,0,6,0,'Baby with her mittens','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://twitter.com/AleReyes10/status/938830145263165440',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(41,'7yp9IisTyY','restricted',NULL,NULL,0,9,0,'Cheese Fountain','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BLRKdt0Bspc/?r=wa1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(42,'IX771ReE7C','restricted',NULL,NULL,0,1,0,'Wrapping presents with puppy','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BctHyBVD1Y_/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(43,'dlGDZCez6x','restricted',NULL,NULL,0,6,0,'Daughter surpises mum with trip','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=qLZY8AuEvNE&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(44,'k4vB2cFnhN','restricted',NULL,NULL,0,1,0,'Dog is jealous of other dog being stroked','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3895124169019165529/IMG_8742.mp4-1.mov',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(45,'fNmy4TgJKK','restricted',NULL,NULL,0,1,0,'Beautiful eyes','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BchpP4GHO-E/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(46,'LR2cv2nCgJ','restricted',NULL,NULL,0,1,0,'Cat in onesie glass of milk','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BPeiDFkA-7U/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(47,'q4PhWihrR8','restricted',NULL,NULL,0,5,0,'This is how you get a GF','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BdO2S8EHgm_/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(48,'IpdNXxYkiJ','restricted',NULL,NULL,0,9,0,'Snow Cake Video','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/NishfjwwbiU',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(49,'pLTCfenwlh','restricted',NULL,NULL,0,5,0,'Twin tattoo prank','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/6HfXO75Uoxc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(50,'68eD5knNIp','restricted',NULL,NULL,0,9,0,'Rainbow dominoes','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=akbytifYZcQ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(51,'2zbcFxt2gc','restricted',NULL,NULL,0,9,0,'Rick And Morty dominoes','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=uH3j-__M41w',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(52,'3SZhhgJVNE','restricted',NULL,NULL,0,1,0,'Dog walking on two paws, looks like he\'s dancing','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BbABb9thfY9/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(53,'lKsemjQkDz','restricted',NULL,NULL,0,1,0,'Dog being dragged across floor on stomach','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BXwQZoNA9g7/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(54,'lDG6CP6hs7','restricted',NULL,NULL,0,6,0,'I\'m here for you - mental health','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/pbjvaillancourt/videos/1865793847075540/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(55,'Nglee2Cr1h','restricted',NULL,NULL,0,9,0,'Girl dancing in nappy','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=m-rWVMcSdIo&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(56,'n4gtimF1bK','restricted',NULL,NULL,0,9,0,'Costa Rica from above','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.dropbox.com/s/f4ag1kv9d1hgxq1/DroneCR.mp4?dl=0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(57,'ypnsqKwzqF','restricted',NULL,NULL,0,5,0,'Baby laughing at peas','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/kalee.cammack/videos/10154864203858344/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(58,'fsxZYJKBkR','restricted',NULL,NULL,0,9,0,'Bali','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=fUEi8i90w2U',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(59,'vE6nkyzBZw','restricted',NULL,NULL,0,7,0,'Handstand beach workout','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BaWZtRpFz0y/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(60,'pg6jiqYlEK','restricted',NULL,NULL,0,7,0,'Hanging from bar, leg workout','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BaGfgguFvwX/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(61,'wNKgrCzHlF','restricted',NULL,NULL,0,7,0,'Hanging from thing, ball workout','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BZ7k0cCFBUT/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(62,'QpgiKnc1X5','restricted',NULL,NULL,0,9,0,'Rare Vintage Pokemon Cards','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=AquPlXvX5yE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(63,'dpwd1Bi7sk','restricted',NULL,NULL,0,9,0,'Zimbabwe','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=1658080194213623&id=1649625125059130',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(64,'sNfKQQJVDM','restricted',NULL,NULL,0,9,0,'Greece','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/meanderingsbylaila/videos/1963382747266818/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(65,'JrY1XNZEr8','restricted',NULL,NULL,0,7,0,'Core session','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bai19Xhl-DR/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(66,'QdtfclKwle','restricted',NULL,NULL,0,7,0,'Beach workout','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BatVl4aF8MD/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(67,'YXeYFsCCp3','restricted',NULL,NULL,0,7,0,'Swiss Ball x Handstand Core Combo Workout','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Ba87R0mFh4u/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(68,'4P1SyplS3G','restricted',NULL,NULL,0,7,0,'Kettle Bell Handstand Workout','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BbFnWKoFOYM/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(69,'hQsz71Mqgt','restricted',NULL,NULL,0,7,0,'Med Ball Core Workout Crusher','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Ba_bYFZFJ9U/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(70,'MqJCMwnS8t','restricted',NULL,NULL,0,9,0,'Sleeping in hammocks hanging from a 60m cliff','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=BQc8_kxTjDU&lc=z225cvqjrt2qevshu04t1aokgdvyouatlucgnaq1afaurk0h00410',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(71,'DIpc2xzEy4','restricted',NULL,NULL,0,1,0,'Horse throws girl in water','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/t15oDi7M7eU',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(72,'TJ52gCjhYx','restricted',NULL,NULL,0,7,0,'Yoga in The Sky at Colony Square Midtown','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.dropbox.com/s/zjfyo2hu8i3hnlu/CS%20Rooftop%20Yoga%201.mp4?dl=0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(73,'L1WIbp796V','restricted',NULL,NULL,0,9,0,'Chasing the Northern Lights (4k)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=SMvIwXS_c54',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(74,'vrDEdBqKWY','restricted',NULL,NULL,0,5,0,'Girl gets road rage, skit','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BaVAZWSBMgm/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(75,'Bn8C1qjPbJ','restricted',NULL,NULL,0,5,0,'First date fail, farting. skit','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BZe1zaXh4Ar/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(76,'PBKvdjinX4','restricted',NULL,NULL,0,9,0,'Guys eat giat gelato sandwich','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=Ckj2aVlzLGg&t=28s',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(77,'wt3gSLBpJj','restricted',NULL,NULL,0,5,0,'Baby\'s shocked face when dad eats cucumber','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=10207169375591810&id=1805272647',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(78,'Qg6peweWVl','restricted',NULL,NULL,0,9,0,'Guy keeps getting double yolks','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=LczYaUco3sw&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(79,'bqwJSwqt3Z','restricted',NULL,NULL,0,1,0,'Dog and deer playing together','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/almresivail/videos/1356822164355284/?hc_ref=ARSPk6BLGCXX-eEmbhU6_QBlDnCLqX4zvD9JAV6ySQg42fcNr7Fs-Zbj2kvL4eYCEMU',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(80,'7g1ILq43B5','restricted',NULL,NULL,0,9,0,'Iceland','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/Xo35sxzeK14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(81,'DXSCKTCJpE','restricted',NULL,NULL,0,5,0,'Shining mirror on guy\'s face to help with selfie lighting','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/francisarev/videos/10208751220052656/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(82,'DgPq5QyhNc','restricted',NULL,NULL,0,9,0,'Mona Lisa speed paint','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=XuZCVo66tgc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(83,'4YmBZwzsE2','restricted',NULL,NULL,0,9,0,'Last Jedi Trailer in Lego','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=Bnyki66cAms',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(84,'6Y1VvbcNdL','restricted',NULL,NULL,0,9,0,'Hair replacement','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/wzyKgejhSjI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(85,'3Q94erIxYY','restricted',NULL,NULL,0,7,0,'Guy working out and it\'s bare cinematic','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/E1Wu6PxZ51Y',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(86,'Gp9bWfwC3q','restricted',NULL,NULL,0,9,0,'Titanic Investors Home Exploration (Abandoned?)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/xsgKKLBGKb8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(87,'QLg2YYw3Tb','restricted',NULL,NULL,0,0,0,'Painted on clothes','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/XmLIKLkrw4o',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(88,'JQqHl7V3Nn','restricted',NULL,NULL,0,1,0,'Dog getting face massage','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BbY5_NcBGOH/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(89,'ceC8lB7zK2','restricted',NULL,NULL,0,9,0,'Whitsunday islands','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/NmLfWvCrE9Y',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(90,'2miEqnF1Wz','restricted',NULL,NULL,0,1,0,'Baby lamb running around','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/cwegGTvJoQo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(91,'EGV79ysVy2','restricted',NULL,NULL,0,9,0,'Base jumping in Italy','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/michael.j.moran.79/videos/1693355824008541/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(92,'lqQxSLXjxc','restricted',NULL,NULL,0,0,0,'Yorkie dog trying to get food from owner','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/kevin.mccully/videos/10212259246507582/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(93,'1D3LdjjgwF','restricted',NULL,NULL,0,3,0,'Guy on mate\'s shoulders bangs his head on sign','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/matt.g.walmsley/videos/10155387784903743/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(94,'zgZ96sJ61R','restricted',NULL,NULL,0,9,0,'Humpback Whales spotted off of Bondi Beach','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/WebsterJ209/videos/1826994920925551/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(95,'GmIhIDjjwr','restricted',NULL,NULL,0,9,0,'Gaming whilst eating worlds hottest chili\'s','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/pBtkajGVfVc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(96,'XtDC8z9xxY','restricted',NULL,NULL,0,9,0,'Scrap metal demogorgon','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/vfLxyb0asxI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(97,'V8mvM1xdeq','restricted',NULL,NULL,0,7,0,'Scorpion handstand on a swiss ball','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BbulJQvlHSQ/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(98,'2p5ViBFfsG','restricted',NULL,NULL,0,7,0,'Doing a handstand and moving legs','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bbpj2SYldn4/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(99,'ryyZRkbyBE','restricted',NULL,NULL,0,9,0,'Guy makes teddybear cake','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=bKbuL2FyyXk',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(100,'r3TVgdDGVw','restricted',NULL,NULL,0,5,0,'Wooden spoon hit prank video','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/Joshua.Scott.7990/posts/10157699677830543',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(101,'hJ54RfkyGf','restricted',NULL,NULL,0,9,0,'Bathroom beats','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=0rxfvrYmpXE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(102,'VQx877W1Ix','restricted',NULL,NULL,0,9,0,'Quick scope COD WW2','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'	https://www.youtube.com/watch?v=HSIhMIgQ8pU&t=14s',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(103,'XxPryBRt5i','restricted',NULL,NULL,0,6,0,'Boy goes to meet his long lost biological father','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=XHkAjUVoQME',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(104,'c9GX5jPiKk','restricted',NULL,NULL,0,4,0,'Aftermath of motorcycle accident (man lost his leg, bit gory)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/bastek.trap/videos/953575978128656/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(105,'EH5JhGMPlQ','restricted',NULL,NULL,0,9,0,'Discover Guatemala','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/ramsvisionmedia/videos/1962371030696795/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(106,'LHx3VmNKn3','restricted',NULL,NULL,0,5,0,'9-5 workers vs shift workers','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/samblackerpage/videos/1869473500032848/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(107,'WDytx9ls8N','restricted',NULL,NULL,0,9,0,'VR gets scary','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.youtube.com/watch?v=MXAwNP9BD2g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(108,'CTGDPyvDSv','restricted',NULL,NULL,0,9,0,'The story of an elf assassin','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/SCt-i2BmghQ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(109,'LDnmNFe4HF','restricted',NULL,NULL,0,5,0,'Lasagna Rap Cooking Tutorial','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=sD1HvjgJvnU',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(110,'iczJXfWZYF','restricted',NULL,NULL,0,1,0,'2 dogs wont let go of same stick','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/LilytheLab2017/videos/1411309648981624/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(111,'SrYQMGfgGH','restricted',NULL,NULL,0,9,0,'Sweam\'s Smart Projector - Takes mobility to a higher level!','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/sweam/videos/1553661931390580/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(112,'xpeJevsxQ2','restricted',NULL,NULL,0,9,0,'Wallet made from leaves','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/zessoo/videos/513053905736608/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(113,'z6ezeMLR3d','restricted',NULL,NULL,0,1,0,'Hams on inflatable pool toy','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BYL-lxtgEcM/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(114,'HeH1pNkTq1','restricted',NULL,NULL,0,9,0,'Sound of rock on frozen lake','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=jENUxittVmg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(115,'nIygn4CFy5','restricted',NULL,NULL,0,1,0,'Dog really doesn\'t want to go for a shower (moans when owners say shower)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bb6nq7yFtbj/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(116,'4QzqMJDVYy','restricted',NULL,NULL,0,5,0,'Cillit Bang Bang Bang - guy does mock advert for cillit bang','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/D3VZxIiJmpQ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(117,'hKv84pEVLk','restricted',NULL,NULL,0,5,0,'Girl doesn\'t understand the concept of being British (family laugh at her)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/christine.martone.5/videos/10154710831147242/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(118,'NCBijeTegn','restricted',NULL,NULL,0,1,0,'Dog doesnt want to walk in snow (other dogs are walking fine)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/hgasiudsfyh98e/posts/1823182877712045',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(119,'E4jYX6dZyD','restricted',NULL,NULL,0,1,0,'Sleeping puppy being stroked','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=369531893393073&id=104919133187685',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(120,'1ge82tlZvD','restricted',NULL,NULL,0,5,0,'Boss blackmailing wages and jobs over holes in roof','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/pDogV9Jz16g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(121,'ZRPdDdl5eD','restricted',NULL,NULL,0,5,0,'Kid tries sour sweet for the first time - hilarious reaction','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=ogp13_GXM3E&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(122,'4mZwv7731L','restricted',NULL,NULL,0,5,0,'Guy bangs his head into locker','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://photos.app.goo.gl/EpNHRrMzRoyb3hiw2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(123,'vyskTGdS6r','restricted',NULL,NULL,0,1,0,'Pomsky wants to be stroked','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/purebredpomsky/videos/1555458061157537/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(124,'JBP8l6JJrc','restricted',NULL,NULL,0,9,0,'Guy launches Rocket Powerd RC Into The Sky','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=8wCYuqaU3iI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(125,'2pGCxCHxrv','restricted',NULL,NULL,0,5,0,'Guy at work gets oil all over himself','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=730534507137297&id=100005422636457',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(126,'3HdcMhgjJl','restricted',NULL,NULL,0,1,0,'Dog trying to get a kiss from her owner','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/aj.jermayne/posts/10215666270836608',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(127,'5hnCtiQKBV','restricted',NULL,NULL,0,9,0,'Really loud speakers','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/groups/IJustWannaBANG/permalink/710222685843094/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(128,'FnZzYLRtPT','restricted',NULL,NULL,0,9,0,'Nusa Penida','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/jatrilife/videos/555659454773681/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(129,'Vb4pDQPW2m','restricted',NULL,NULL,0,7,0,'When FIFA doesn\'t want you to score...','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://streamable.com/3qz83',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(130,'xLWEEg2dBZ','restricted',NULL,NULL,0,3,0,'Man trying to slide on ice falls','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=bGnYkpdK_iY',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(131,'3mLwBWgQhr','restricted',NULL,NULL,0,1,0,'US Soldier feeding squirrels','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=_4bM9XHuqmE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(132,'dIL7FhK1ER','restricted',NULL,NULL,0,9,0,'Gateway to Ile des deux Cocos, Mauritius','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BaeU-XogmuM/?taken-by=dimitri_rault',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(133,'6FT2wL4696','restricted',NULL,NULL,0,7,0,'Vsit','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bb9A-n-l4b0/?taken-by=leahkingsley',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(134,'FFjw2E5DKt','restricted',NULL,NULL,0,1,0,'Dog wants attention','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcCa8P0l6HL/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(135,'l1YCpLdTVb','restricted',NULL,NULL,0,1,0,'Hawk screaming on mans doorstep','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.dropbox.com/sh/afdns43glru4my9/AAAXRp-3IzmF9rJEMuD5khzna?dl=0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(136,'kbIpesGDjx','restricted',NULL,NULL,0,5,0,'Friends scare sleeping friend','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=10208840808972594&id=1685086569',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(137,'QvTLs9Ipml','restricted',NULL,NULL,0,9,0,'Nutella lasagne','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=pamCLo5rFA8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(138,'wqwHkltN1F','restricted',NULL,NULL,0,1,0,'Man frees tied up horses','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=Jj5oWanOacA&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(139,'9qhvcdXZXj','restricted',NULL,NULL,0,9,0,'First kebab in space','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=4ixmDWAfFGQ&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(140,'zJLyFhkK23','restricted',NULL,NULL,0,0,0,'Builders dancing whilst working','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/q7WEISG_Xpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(141,'CsSYTWNsJE','restricted',NULL,NULL,0,0,0,'Making of dessert with cotton candy - Xmas kurtos','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.dropbox.com/sh/fu4agoaku0ume91/AADei-3In0pLONUJ4CCKq5jDa?dl=0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(142,'i8sb7IqbTi','restricted',NULL,NULL,0,9,0,'Spider man make up','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=DbAqTJInm_s&t=15s',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(143,'ZTGLES14nK','restricted',NULL,NULL,0,9,0,'Hawai‘i - Lost in Paradise','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=OdTd0WOVm-w&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(144,'2m1sQq3DjR','restricted',NULL,NULL,0,0,0,'','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(145,'cQlnic7kjw','restricted',NULL,NULL,0,9,0,'Amazing Hokkaido, Japan','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/jatrilife/videos/565827403756886/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(146,'kItkgN6msh','restricted',NULL,NULL,0,1,0,'A very tired dog falling asleep on the couch','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'	https://www.youtube.com/watch?v=ufvbitkQp3c&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(147,'iWPyC2GVLl','restricted',NULL,NULL,0,5,0,'Plasterboard barry','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=CqD7LBiY8nk&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(148,'sfbYW8msHp','restricted',NULL,NULL,0,5,0,'Stand up about sexual life','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/DaneBaptistecomedy/videos/1548022881942010/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(149,'VESqsPjYzD','restricted',NULL,NULL,0,9,0,'Firework under frozen lake','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?sts=17492&t=6s&utcoffset=60&v=inyw3qnzfb4&has_verified=1&client=mv-google&layout=mobile&app=desktop',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(150,'2yPXyGQj1g','restricted',NULL,NULL,0,9,0,'Jumping down a waterfall','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=n9_ixciKqGE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(151,'By2CrSH3Zj','restricted',NULL,NULL,0,1,0,'Dogs trying to dig ice','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/sentientdogs/videos/1767463856657998/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(152,'pL9PeSEPcg','restricted',NULL,NULL,0,5,0,'Advent calendar hand gesture prank','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=HAr_eJxgFiU&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(153,'1LWN8WTskw','restricted',NULL,NULL,0,9,0,'Christmas rap','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://goo.gl/AmigKi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(154,'CP8HLqX6jY','restricted',NULL,NULL,0,1,0,'V. Loud kookaburra','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/Sc6cRojch9M',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(155,'K8vZQPxNi8','restricted',NULL,NULL,0,9,0,'Santa can lift','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcK3eRPBZl0/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(156,'pFbMfCvXjZ','restricted',NULL,NULL,0,1,0,'Dog has mud bath','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=NRQmd6077Ns',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(157,'vwDfpyzZr7','restricted',NULL,NULL,0,5,0,'Guy diving into pile of rubbish','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=YBCZNZlqMXg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(158,'jx48R7KpnX','restricted',NULL,NULL,0,9,0,'Beatboxing with a drill','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/MRMICOFFICIAL/videos/1545054585589251/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(159,'3ILFry7zgd','restricted',NULL,NULL,0,9,0,'Fidget spinners on car','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/4rvQYlVwj2w',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(160,'SxhcfxbNiz','restricted',NULL,NULL,0,9,0,'The Lion King spray painting art','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/vUy5_CSgNIc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(161,'ZxQtNNvXph','restricted',NULL,NULL,0,9,0,'Sombra PC Mod.','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=wAGbhywpS74',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(162,'I51NFVE8WC','restricted',NULL,NULL,0,1,0,'Dog dressed as santa licking baby\'s feet dressed as an elf','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BcNyIXtF20V/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(163,'GP1cPV6SwG','restricted',NULL,NULL,0,6,0,'Guy scaring his dad in car','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=XPmREO-bGBI&feature=share',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(164,'gRFfxjPC2w','restricted',NULL,NULL,0,6,0,'Photoshoot with triplets ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/lynchinnz/videos/796500003862302/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(165,'Sn9ki5Gp5n','restricted',NULL,NULL,0,1,0,' Tiny little pom crawling out of under the sofa','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=oS7p1LviNfE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(166,'Cz1ddvJcKl','restricted',NULL,NULL,0,6,0,'Guy gets corgi gift set and a corgi for christmas ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/hbrignoni/videos/vb.1023540077/3602013482003/?type=2&video_source=user_video_tab',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(167,'7MvWtBi8Mq','restricted',NULL,NULL,0,9,0,'Harry potter themed cafe','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=2RraIQHFEsk&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(168,'X6mpVC2Hgt','restricted',NULL,NULL,0,5,0,'Grandpa rapping proper music video','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=O75dgwLjEAg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(169,'bwYcievGeP','restricted',NULL,NULL,0,9,0,'CODFISH | NO DIGGITY beatbox (half a mil views on 19k page) ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=Ac23w_M-4As&lc=z22ivjm4rkmnh3kbu04t1aokgdc4uheqtf2t13rb0fpurk0h00410',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:43','2018-01-22 16:21:43'),
	(170,'Zg2Fq76DMp','restricted',NULL,NULL,0,1,0,'Woman calling all the chicks by shouting girlfriends','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/OldMcDarlingsFarm/videos/718927611638173/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(171,'YRYl2ghpGx','restricted',NULL,NULL,0,9,0,'Guy raps about weed stats','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/TellTyrik/videos/1611892085556309/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(172,'J8X8gfKIhZ','restricted',NULL,NULL,0,1,0,'Daschuand dog running','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BbSbx-Jh3D8/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(173,'HqrebNC6z3','restricted',NULL,NULL,0,1,0,'Daschuand dog playing with sausage dog toy','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Baj-cw5hsOt/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(174,'V6gkNhV3W7','restricted',NULL,NULL,0,1,0,'Dog running in snow in slow mo','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcPwk6-HvSM/?taken-by=axel_fluffypaws',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(175,'YP3Tz2SzmH','restricted',NULL,NULL,0,1,0,'Dog chasing after owner in snow in slow mo','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bb0vbEln2-d/?taken-by=axel_fluffypaws',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(176,'HxQQp2el5W','restricted',NULL,NULL,0,0,0,'','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/owen.smith.90/posts/1480875845366729',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(177,'BHEvDGkLJl','restricted',NULL,NULL,0,9,0,'VR drunken bar fight','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=jMSYJK9kzsM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(178,'hrpcpf3Wdx','restricted',NULL,NULL,0,9,0,'Toasted marshmellow shots','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/fooziebristol/videos/1699244840126081/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(179,'91CzEdqBXQ','restricted',NULL,NULL,0,5,0,'Kid is scared for his life after seeing three little elfs hanging from door ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=PcHe0AH1yeY&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(180,'fv3pHLwkz4','restricted',NULL,NULL,0,5,0,'Introducing the new baby to the family prank','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/LifeofPapaBear/videos/677105596010870/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(181,'wWsQlxePix','restricted',NULL,NULL,0,1,0,'Puppies viciously attack their owner','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/groups/305577729911968/permalink/339936233142784/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(182,'mWNeM2PcPq','restricted',NULL,NULL,0,9,0,'Spray paint art Star Wars Death Star','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=e_LQ99ghxQs&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(183,'bbxRSQyRvI','restricted',NULL,NULL,0,9,0,'Mother of 6 international DJ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/rockygmusic/videos/1634978526553822/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(184,'WX1IYVB64S','restricted',NULL,NULL,0,1,0,'Dog feeding a goat','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/melissa.conesbarboa/videos/1788760607809547/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(185,'djgrYZ59sH','restricted',NULL,NULL,0,6,0,'Man singing in underground to collect money for the homeless man','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/laura.arnold.3194/posts/10155434506211185',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(186,'htiG394v7V','restricted',NULL,NULL,0,5,0,'French journalist trying to do a piece to camera with football fans around','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=NAAaqSeNymI&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(187,'FJXtM6VQPC','restricted',NULL,NULL,0,1,0,'Bulldog with christmasy bed (I\'m sure we did a vid about his bed before)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcBbacklmZ6/?taken-by=eggnogthebulldog',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(188,'sVbkKX3ttS','restricted',NULL,NULL,0,5,0,'You laugh you lose ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=fmMEHs3iuVg&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(189,'H65h7ywB5N','restricted',NULL,NULL,0,9,0,'Iceland in 4k','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=nfEJxa5uhIw&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(190,'cgBMtb1HLT','restricted',NULL,NULL,0,5,0,'Christmas songs played by a dildo','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=6ItyhBWNKv0&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(191,'5MnrBF767X','restricted',NULL,NULL,0,6,0,'Little baby is obsessed with his reflection','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=CTFm89YSY-I&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(192,'zFPjbTS8Bm','restricted',NULL,NULL,0,1,0,'Pomsky puppy trying to reach toy','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BWc2tBVgdLj/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(193,'qJmMnmWNpv','restricted',NULL,NULL,0,9,0,'Cereal cocktail','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://business.facebook.com/barandbeyondnorwich/videos/1848806628482405/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(194,'DWLsNEmQyL','restricted',NULL,NULL,0,9,0,'Woman dancing on wire underwater','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://vimeo.com/170275830',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(195,'hiwTvdIQ3E','restricted',NULL,NULL,0,5,0,'Woman on vr, shark tank','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/vUlrkBNLDRE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(196,'w9cbhnpkYZ','restricted',NULL,NULL,0,9,0,'Chania Crete','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/a0Cly5grv1g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(197,'Ws1TS3DPID','restricted',NULL,NULL,0,9,0,'Smart wallet','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.kickstarter.com/projects/wooletco/woof-glow-the-minimalist-smart-wallet',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(198,'2hdJkv8fSy','restricted',NULL,NULL,0,0,0,'','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'VidTrim_5501.mp4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(199,'eTqXDsrRNR','restricted',NULL,NULL,0,1,0,'Bengal cat first snow day','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'20161226_123052.mp4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(200,'28kJbngB5M','restricted',NULL,NULL,0,9,0,'How to make a mega vape','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=_bJlYnOzgzg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(201,'WFvifNLLyz','restricted',NULL,NULL,0,6,0,'UK\'s first dementia friendly barber','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.youtube.com/watch?v=Pl3Q6DwJJ0A&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(202,'3T86s2nyD2','restricted',NULL,NULL,0,9,0,'This is how to Fortnite','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://xboxdvr.com/gamer/xUBGxANARCHYx/video/a8347011-5096-45f7-a60d-0f0ebf23e24c/534802d6-93cb-4b66-ab85-00dcf128cad60',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(203,'hlipEH5CFX','restricted',NULL,NULL,0,1,0,'Cat runs away in snow','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/paradise4cats/videos/1538558806193691/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(204,'ytGMN3SGBT','restricted',NULL,NULL,0,9,0,'Paintball tanks in snow','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=8Xb-va5oSJQ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(205,'EgzqP6ddkV','restricted',NULL,NULL,0,1,0,'Cute pomsky pups sleeping','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/purebredpomsky/videos/1570145926355417/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(206,'GsbPxkrFlW','restricted',NULL,NULL,0,1,0,'Cat on rowing surfboard with guy','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://vimeo.com/237214329',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(207,'B4bVzfFmgq','restricted',NULL,NULL,0,9,0,'Shoe cake','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/hdUAAkl2gfo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(208,'kZ6WmWn2Qg','restricted',NULL,NULL,0,9,0,'Raft, Kayak, Surf in Middle East','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=RSwinyIhF3A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(209,'N7zpnydjb4','restricted',NULL,NULL,0,9,0,'Rest day','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BF6dZEMJgAF/?hl=en&taken-by=efaay',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(210,'WvgWG9NwX1','restricted',NULL,NULL,0,5,0,'When your boss scares the life out of you','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/BEXX119/videos/vb.1027826712/10212406230403993/?type=3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(211,'wqr87vKHM7','restricted',NULL,NULL,0,9,0,'Eating Wings with North Koreans | Feasting with your former Enemy','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=3TQ8H5TgRzA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(212,'7f6SyNwXYY','restricted',NULL,NULL,0,9,0,'Life of a Tetris Brick','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/eliad84/videos/vb.533590123/10154904283105124/?type=2&video_source=user_video_tab',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(213,'1gcm4wSPlb','restricted',NULL,NULL,0,1,0,'Patient dog waits with donut in his mouth','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/madison.webb.7965/videos/1700751179945630/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(214,'NzkGYr8Kff','restricted',NULL,NULL,0,1,0,'Festive dogs','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'	https://m.facebook.com/story.php?story_fbid=1975338989159697&id=931514056875534',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(215,'VXnIcC4XIM','restricted',NULL,NULL,0,9,0,'Bali 2017 travel diaries video','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=D1hLuJI3ftY',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(216,'8C4dfkFsnt','restricted',NULL,NULL,0,9,0,'Surfing in Maldives','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=NdO5Y8Ysa4E',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(217,'ZWQnT9GB6r','restricted',NULL,NULL,0,4,0,'Woman exposing the truth about her unfaithful husband who gave her HIV','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/nona.thomas.528/videos/10155053532319811/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(218,'eHLkx7vBYX','restricted',NULL,NULL,0,9,0,'Scared to be lonely - martin garrix acoustic percussion','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/morfmusic/videos/10155439435212862/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(219,'ivP7Sx4IvJ','restricted',NULL,NULL,0,1,0,'Dog eating snow','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bccw636HaZS/?taken-by=axel_fluffypaws',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(220,'bCl1vKwczZ','restricted',NULL,NULL,0,1,0,'Puppy running around in the snow','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BchgqGjhCbs/?taken-by=rubyrosetheminidach',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(221,'qGFcCRkw1w','restricted',NULL,NULL,0,0,0,'','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BckgQD-lLL2/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(222,'LtKIbXcbEr','restricted',NULL,NULL,0,9,0,'Beautiful custom knife I made for my grandmother (prank)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/Rjjohnsonftw/videos/1599164686809995/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(223,'DJ5FW3cdyK','restricted',NULL,NULL,0,1,0,'Mouse standing up to a cat','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=Ydl4CRZqFrY&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(224,'vqCqGdcV7N','restricted',NULL,NULL,0,9,0,'Tank/machine that can drive on ice, snow, water, sand, swamp','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=DKAN5SZ9LLw',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(225,'btiCefJlvH','restricted',NULL,NULL,0,5,0,'Marriage Proposal joke sketch','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/Kiko.Co.Official/videos/534251446966514/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(226,'PsdHBZtiVD','restricted',NULL,NULL,0,9,0,'Cars wrapped with chrimstas wrapping paper and decorations','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=6tY26nRvTS8&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(227,'ReTkX1yg7b','restricted',NULL,NULL,0,0,0,'','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/3_SZg5FKogg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(228,'PbgJ2lhDkg','restricted',NULL,NULL,0,9,0,'New invention - brush your teeth in just 3 seconds','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.indiegogo.com/projects/unico-smartbrush--3#/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(229,'xKydkYXint','restricted',NULL,NULL,0,9,0,'Last man standing clever kill fortnite','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/EArzpQliL-w',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(230,'34nGhtGIhv','restricted',NULL,NULL,0,9,0,'Mario theme tune played with elecrtic and bass guitar','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/andrewfreedmusic/videos/300718787104470/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(231,'TTJH5VRqdx','restricted',NULL,NULL,0,5,0,'Man gets kebab for his birthday','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=-izvdIFjy7M&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(232,'cnWqMJ9Rk1','restricted',NULL,NULL,0,1,0,'Just a kitten and raccoon playing','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/centrerefugenymous/videos/2072310159681076/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(233,'qLl6xRLvXw','restricted',NULL,NULL,0,1,0,'Kittea Cat Cafe','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/ynF2NXEgM_A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(234,'F1syyzpbj4','restricted',NULL,NULL,0,1,0,'Dog winking ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcD0Zuojneq/?taken-by=goldenmase',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(235,'1m437kYeI3','restricted',NULL,NULL,0,9,0,'Iceland from above by a drone','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=ZaepK-d8JZg&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(236,'ImtMhJLTE6','restricted',NULL,NULL,0,5,0,'Empty pizza box prank on girl saved by her boyfriend','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/permalink.php?story_fbid=1570378556391483&id=100002580624002',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(237,'J1T7p2hXTP','restricted',NULL,NULL,0,1,0,'Dog thinks his cage door is closed and struggles to get out','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/NicoleemarieeK3/videos/10211108668691900/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(238,'3myxmzWznv','restricted',NULL,NULL,0,9,0,'Lebanon','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=coIXMyWzpAU',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(239,'D7qgz2q1jE','restricted',NULL,NULL,0,6,0,'Little girl is devestated because her little sister had a shot','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/jjg3684/videos/10105113415820592/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(240,'5XN5BXQW32','restricted',NULL,NULL,0,5,0,'Man can\'t hit the last note','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/MaoriWorldwide/videos/1614645498553360/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(241,'Kr3LWjZkvN','restricted',NULL,NULL,0,9,0,'POV of balancing along beam a hundred metres up from the ground','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=U6efG_48YJM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(242,'TzpDIgWeMR','restricted',NULL,NULL,0,0,0,'','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/saion.chan/posts/10100857877730792',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(243,'jGgdZ32Qx7','restricted',NULL,NULL,0,9,0,'Techo Autowater - Automate any faucet','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://vimeo.com/246950354',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(244,'weQgp1i6vz','restricted',NULL,NULL,0,0,0,'','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=bdvMKjnvKBE&app=desktop',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(245,'5SNbqmMHTJ','restricted',NULL,NULL,0,9,0,'NYC skyline in 4k by drone','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=527365244287977&id=267193980305106',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(246,'Qq8bTxMFlR','restricted',NULL,NULL,0,6,0,'Fathers last words to his dying son','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=C3hABRHmQoo&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(247,'dNvpBpErJs','restricted',NULL,NULL,0,5,0,'Having dinner for free at costco','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/pbjvaillancourt/videos/1987122188276038/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(248,'QFMmfyRSKq','restricted',NULL,NULL,0,1,0,'My dog is scared of the groomers so I got groomed too to make her feel better','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/TheAsherHouse/videos/1745312239104543/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(249,'5hRsn94hRS','restricted',NULL,NULL,0,9,0,'FRASER ISLAND ET RAINBOW BEACH','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/qEBnpcGie3g',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(250,'13Mmyp4bzI','restricted',NULL,NULL,0,1,0,'Decorating cats for christmas ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/1443530449231481/videos/1966297716954749/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(251,'9jcztETVFe','restricted',NULL,NULL,0,9,0,'Intimate Zombie Adventures','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=1o6o_msiDUI&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(252,'mrPjNWqclL','restricted',NULL,NULL,0,9,0,'Instant translator Tokyo','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=OCVpfNKA2ZM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(253,'qdFX6ltgqD','restricted',NULL,NULL,0,1,0,'Frenchies wearing christmas hats','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BcUghSAlNN9/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(254,'R33hxmekXV','restricted',NULL,NULL,0,5,0,'Christmas party dance moves','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/dave.doolan/posts/10155167344313803',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(255,'fZH1hSK6q7','restricted',NULL,NULL,0,1,0,'Working out with puppies','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcM8l5Tn-3R/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(256,'KVRNdlqzMF','restricted',NULL,NULL,0,5,0,'Grinch wishing kids a happy christmas','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/atomant99/posts/10213604653764610',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(257,'cTdb9BWiYy','restricted',NULL,NULL,0,0,0,'','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcFYYeYlEYC/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(258,'SDdR9WXwvL','restricted',NULL,NULL,0,5,0,'Gut hates christmas so he goes out on the streets to speak to people ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/thewindupmerchantz/videos/549812868702836/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(259,'4HNgcVeDbZ','restricted',NULL,NULL,0,1,0,'Pom with christmas lights','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bc7b130nCmr/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(261,'B7efjyCmZk','restricted',NULL,NULL,0,9,0,'$1,800,000 Watch','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=1541399195938553&id=1095018027243341',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(262,'gxwmy662bi','restricted',NULL,NULL,0,5,0,'Toddler tries sour gum for the first time','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=cPX2r-G_V5U&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(263,'KpIyQ8CbJI','restricted',NULL,NULL,0,5,0,'Kid gets really excited about climbing a mountain','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/112865396045093/videos/136962883635344/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(264,'Be6D2LzBLK','restricted',NULL,NULL,0,5,0,'Latte art hand gesture','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/yartynscott/videos/584131738645255/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(265,'k4L2QZCrPb','restricted',NULL,NULL,0,5,0,'Stranger things prank','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/raphaelmachomagic/videos/383027858811422/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(266,'S6vrCJECFL','restricted',NULL,NULL,0,9,0,'Pressure washing a driveway','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=mOvP-Sqwalc&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(267,'l6qCVRwH5y','restricted',NULL,NULL,0,5,0,'Metal kid rocking it to christmas song','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=hJE-Pvi_bR4&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(268,'B1sIESkn6M','restricted',NULL,NULL,0,6,0,'Children add family dog saying I love you to dog teddy gift to mum','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/courtney.lynn.1023/posts/153783675347226',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(269,'KxNY57CrJD','restricted',NULL,NULL,0,6,0,'Seaturtle rescue at Mora','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=yHjQAjt7o_I&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(270,'wCMXWvtsRY','restricted',NULL,NULL,0,1,0,'Dog chasing tail running around in circles zoomies','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=dNJOtJqakA4&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(271,'HFXS9fSRg2','restricted',NULL,NULL,0,6,0,'Kids get surprised with Christmas at Disneyland','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=LGULpRCYeh8&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(272,'bMgwvt6QvP','restricted',NULL,NULL,0,9,0,'CGI letter graphics','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://vimeo.com/246787020',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(273,'tzSFCncj12','restricted',NULL,NULL,0,1,0,'Hedgehog tug of warring a chocolate wrapper','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/snufflestheexplorer/videos/183413408915856/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(274,'C3458ZkJ4f','restricted',NULL,NULL,0,9,0,'Robot Christmas Wars','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=JJeIc3POAME&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(275,'PnKmZIJQXL','restricted',NULL,NULL,0,9,0,'Making a beer pong table','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/BeerPongBros/videos/876824825829989/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(276,'ydcNt3P6Fm','restricted',NULL,NULL,0,0,0,'','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/IslandXplorer/videos/937238739758986/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(277,'Hmxnx68LIr','restricted',NULL,NULL,0,9,0,'Green goblin glider','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/Qtrghmp50FY',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(278,'FTPp57mhV3','restricted',NULL,NULL,0,5,0,'Dad driving with son gets annoyed at a bus driver','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/JohnathanCuvelier/videos/10212335831043140/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(279,'YXLry6lnfq','restricted',NULL,NULL,0,5,0,'Impressions (cartoons and famous people)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/voicesbymyke/videos/551014148601876/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(280,'NiLnsBkQrN','restricted',NULL,NULL,0,5,0,'Circle game christmas present (44k views on personal fb)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/jeremynjamie.parker/posts/949652698521815',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(281,'2ERXI7zGGs','restricted',NULL,NULL,0,9,0,'Car in wrapping paper','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=6KY1-gjjkxw',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(282,'yL24d4mv6b','restricted',NULL,NULL,0,6,0,'Girl surprises family by going home for the first time in 3 years','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/natasha.puri.98/videos/10156146193249052/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(283,'Rjr3vtLkqL','restricted',NULL,NULL,0,9,0,'Lake District, UK','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://vimeo.com/248794569',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(284,'bEc2L5gkQc','restricted',NULL,NULL,0,9,0,'Aussie lads play PUBG','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=hRCtHWvaUHk',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(285,'rRcB2EF57Q','restricted',NULL,NULL,0,9,0,'Wire fairy timelapse','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/Fu5y8tZZa-w',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(286,'iDR8Q6byFK','restricted',NULL,NULL,0,4,0,'Biker medic gives first aid at crash scene and chases suspected runaway driver','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=8uJUrhRM_yo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(287,'eLXmgdMHFP','restricted',NULL,NULL,0,5,0,'When Two Christmas Games Are Combined','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/McAllensOfficial/videos/1732363816803438/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(288,'XxbvffBiRe','restricted',NULL,NULL,0,1,0,'Dog doesn\'t give salami back','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/elena.cphotos/posts/2035155500054306',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(289,'nwr7WvgK6D','restricted',NULL,NULL,0,1,0,'Dog spits out food','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/MrsMillsDogProducts/videos/900309566798042/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(290,'Vvtspd2MYz','restricted',NULL,NULL,0,5,0,'Funny hospital visit','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/rLCAy6Gvp40',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(291,'ICG6n8jD13','restricted',NULL,NULL,0,1,0,'Getting wild possum out of house','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=Kku2ErO6bUM&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(292,'9iGQtZ3VVh','restricted',NULL,NULL,0,1,0,'Cat hides underneath cabinet','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/mouadmaaloum1/videos/284814645368580/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(293,'KyDf1stK6F','restricted',NULL,NULL,0,9,0,'Pass the parcel game with mittens','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/OEeQFeuSkFQ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(294,'sd8EBj3v9Y','restricted',NULL,NULL,0,5,0,'Baby stops crying when doing squats','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=eM2GzrQnKWI&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(295,'xX7gVBlWtq','restricted',NULL,NULL,0,5,0,'Mindblowing questions sketch','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/BenMatiasTv/videos/1513563842094413/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(296,'WZtdyZ25GI','restricted',NULL,NULL,0,5,0,'It\'s coming\' short about the game tig/tag','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/kSMm2ONG16Y',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(297,'JMv9YVKMT1','restricted',NULL,NULL,0,9,0,'Baby gets face massge','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/_FAj1GCb8Vk',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(298,'31G4mgeNqk','restricted',NULL,NULL,0,9,0,'Great White Sea','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://vimeo.com/247720168',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(299,'xwjFbczJne','restricted',NULL,NULL,0,5,0,'Little boy does shot of blackcurrent juice to join in with adults','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BdSgMkqg96T/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(300,'9bpN4zZCy7','restricted',NULL,NULL,0,5,0,'Everyone on NYE Vs Me','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/JLouOfficial/videos/505565949828039/?hc_ref=ARTAurnieSRI-G_9iAD6x-jLKWT7eIAONUy6gt0xF9In0nDjY2hFKHWi-qNh60zo0hA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(301,'3xiPzczDt2','restricted',NULL,NULL,0,1,0,'Netherland bunny being rubbed','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/PD95Ayglqz8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(302,'HfYq1XngXE','restricted',NULL,NULL,0,1,0,'Dog wants attention from other dog','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/wanderingpawsofficial/videos/1544200115601312/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(303,'JexN74t8hE','restricted',NULL,NULL,0,1,0,'Dog plays dead for getting his ball back from owner','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/GeorgeTheStaffy/videos/337349230104207/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(304,'BC9rhLdrSE','restricted',NULL,NULL,0,3,0,'Cold car challenge','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=O2IuOVCipVo&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(305,'tSdKQVq94I','restricted',NULL,NULL,0,9,0,'Ice skating on lake','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=j5Ty7yCrfa0&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(306,'p78k6nJF4v','restricted',NULL,NULL,0,5,0,'Pie face cheating','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/tcJFo_CEu1w',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(307,'jMy42EKkjK','restricted',NULL,NULL,0,1,0,'Baby swans climbing aboard Mum! ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/_IxnBr9O5Ss',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(308,'hr8cIlvv13','restricted',NULL,NULL,0,1,0,'Dog takes himself for walk','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/uniladmag/videos/4107475549275473/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(309,'6NSXbRj1C3','restricted',NULL,NULL,0,5,0,'Dad v Kid Prank War episode 2 ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/nigelmunt01/videos/180541959355147/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(310,'GVpkrgj1tI','restricted',NULL,NULL,0,4,0,'Storm Eleanor in Salthill Galway','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3907813039124128606/899D05AD-2C71-4048-90D5-6D125C31429B.MOV',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(311,'HTftbMWcIG','restricted',NULL,NULL,0,5,0,'Fire Department New Year Ball Drop','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3907970840933311961/3B57FC33-15CB-49E6-9F8D-A9BB542A9815.MOV',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(312,'QZqV2J51y3','restricted',NULL,NULL,0,1,0,'Sasha the itty bitty pittie pup ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=1809009885806223&id=888659851174569',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(313,'mtcIHE1iEk','restricted',NULL,NULL,0,5,0,'Vape','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3898353319512022368/trim.E720B994-251A-446D-9ED7-3890802A269F.MOV',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(314,'Mp8bNhxBmC','restricted',NULL,NULL,0,1,0,'Cat says come here','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BciqkGxHRT6/?taken-by=tsuru.nyan',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(315,'BZck9kYQlr','restricted',NULL,NULL,0,5,0,'Pub dropkick','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://mobile.twitter.com/joedudgeonnn/status/945059741881061377',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(316,'ITcMEXNsSK','restricted',NULL,NULL,0,1,0,'Dog opens fridge and gets can of beer/drink out for owner','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/zandra.asenlund/videos/10154280632066810/?hc_ref=ARR8p_kjBymCb37SwCOl6AFwNtYw_sbnElbK2GG1xOkqQgZ0sDchXiJ2KI6daM42Eiw&hc_location=group',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(317,'bPgd77cjNJ','restricted',NULL,NULL,0,1,0,'Cat stealing chip','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BdiiFVBAWnt/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(318,'7hmVMx1p7B','restricted',NULL,NULL,0,1,0,'Dog snarling','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BddQ-8TnXmD/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(319,'yGSRz4VTKD','restricted',NULL,NULL,0,9,0,'Doughnut Bacon Cheese Burger','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BdS4D41HEXn/?taken-by=hungrygrl_bigcity',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(320,'XRrjsXXMKM','restricted',NULL,NULL,0,1,0,'Dog wants to go outside ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://twitter.com/villarlisa/status/946576687885455361',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(321,'I49mZC8V9F','restricted',NULL,NULL,0,1,0,'K9_jester police dog working undercover','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BdLCNA0Bj0d/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(322,'T7iwZEhSFf','restricted',NULL,NULL,0,5,0,'Woman freaks out after winning $11 on HQ Trivia','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/VYcR9IDeDWE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(323,'rD9E8iL9mF','restricted',NULL,NULL,0,5,0,'Mannequin people scare- Christmas Edition','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/HowAboutBeirut/videos/963179727162521/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(324,'lksPSV6iBf','restricted',NULL,NULL,0,9,0,'Surgeon Simulator VR','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/LADbible/videos/4362220157158474/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(325,'FbyGs34SCt','restricted',NULL,NULL,0,1,0,'Dogs dressed up in a car(1)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BdtHeB9Fc69/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(326,'HC97Kw9BRN','restricted',NULL,NULL,0,9,0,'Camembert Cheese','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BdDKoKCAgHj/?hl=en&taken-by=artsandfood_nyc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(327,'C8lPigIP6f','restricted',NULL,NULL,0,1,0,'Sphynx cat is a modern day  Ejyptian Pharaoh ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BbBEjXADQd-/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(328,'XGESvC8fZE','restricted',NULL,NULL,0,9,0,'Oddly satisfying power washing','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/9gag/videos/10156993934831840/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(329,'jEJnRqHBgz','restricted',NULL,NULL,0,4,0,'Police Kick Citizen out of Walmart for Helping Lady and Her Child','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/muhammad.elqasem/posts/10214983762204488?notif_id=1514675617764983&notif_t=feedback_reaction_generic',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(330,'VZl1bZ7Vrz','restricted',NULL,NULL,0,9,0,'Winter in Canada','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://vimeo.com/191072713',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(331,'ZfJlT66GP1','restricted',NULL,NULL,0,9,0,'Winter diamons (frozen trees/grass and etc.)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://vimeo.com/198527558',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(332,'YXb4frjziK','restricted',NULL,NULL,0,9,0,'Innocent bystanders incinerated by fireworks in germany','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/kristina.swafford.5/videos/1911506765529422/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(333,'k3eQzbkJZN','restricted',NULL,NULL,0,9,0,'Dune riding Geraldton Western Australia','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.dropbox.com/s/ozhu69yfj511n21/Drone%20Ride.mp4?dl=0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(334,'JXxMTzVrIt','restricted',NULL,NULL,0,9,0,'Guy playing drums on the street with buckets and tins','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=OOckT6PDXWo&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(335,'mE51EL95bP','restricted',NULL,NULL,0,1,0,'Tiny dog coming out of bed','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/BringRooToo/videos/1557305831055623/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(336,'R4mNQwfQ3E','restricted',NULL,NULL,0,5,0,'ASIA 4K video','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=1DJNHrRIf-0&t=2s&list=PLQ7wI4jrgV6qex8KS2zXkt78Z8uCQcPBA&index=2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(337,'egvIcKs4WW','restricted',NULL,NULL,0,9,0,'100kg homemade smoke bomb','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=xbjhFv6bRGw&lc=z23qcbiq5qewcdh0xacdp4320i1s0vqzpc3u2042xnlw03c010c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(338,'q9HNbN9gzw','restricted',NULL,NULL,0,5,0,'New year new me gone wrong (new years resolutions fail)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/samashleighk/videos/1675735815842345/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(339,'WvpEt4Fl8S','restricted',NULL,NULL,0,1,0,'Cat jumping fail','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=YNWUmxmU6ws&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(340,'mlJbJr4hqM','restricted',NULL,NULL,0,5,0,'Kids repeatedly saying oh bollocks','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/liam.gunner/videos/1388161067904381/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(341,'xy6lI3mRJ6','restricted',NULL,NULL,0,9,0,'Easiest way to solve a rubix cube','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/stevesworldtv/videos/544530015897520/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(342,'gD7ilPwYJH','restricted',NULL,NULL,0,9,0,'Amazing croatia ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=1600588420027273&id=100002283926212',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(343,'FWXj2jWM8H','restricted',NULL,NULL,0,5,0,'Mom Freaking Out Over A Spider','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=9WXllPFT6mw',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(344,'XmbnCNJjFM','restricted',NULL,NULL,0,9,0,'Islands in Thailand - the Ultimate Thailand Travel Guide','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=srNdY8b6x-o',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(345,'Bnkb3SIX4n','restricted',NULL,NULL,0,9,0,'Glitter latte','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BbZF8npF0u7/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(346,'MT9scMTkHW','restricted',NULL,NULL,0,9,0,'Real Color Changing Paramagnetic Paint Coating Proof','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://vimeo.com/249479989',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(347,'GzPHjsXnlS','restricted',NULL,NULL,0,9,0,'New years eve fireworks of a full city from above','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=5vL-IJlatwY',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(348,'n6JrYGdqCI','restricted',NULL,NULL,0,1,0,'Dog thinks owner drowning gets into pool to try and rescue him','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/6VWAX-JVQUfbVJ082J-pvFVJ7UrJSr38fi7N80/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(349,'MfGwbxbww9','restricted',NULL,NULL,0,9,0,'Realistic dog painting','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/Alipaintings/videos/1229236767177118/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(350,'rGH34MGZ9P','restricted',NULL,NULL,0,0,0,'Fingering grandmothers mouth','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=1970858926288292&id=100000926117213',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(351,'hHLZCDdslQ','restricted',NULL,NULL,0,5,0,'Singing dentist mans not hot','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/philendmusic/videos/o.1024350210964002/10155187450892129/?type=2&theater&notif_t=video_processed&notif_id=1515014526244307',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(352,'n2tPQrjnYH','restricted',NULL,NULL,0,9,0,'Lima Peru','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=N6Ll6qOwXQU&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(353,'lR8vtDIbJN','restricted',NULL,NULL,0,1,0,'Dogs lips are fopping in the wind','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=cFEZvJICmYA&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(354,'lQmGwjJfii','restricted',NULL,NULL,0,6,0,'Kid doesn\'t understand hide and seek','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=oQjYxepKu68&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(355,'P3zNESr326','restricted',NULL,NULL,0,6,0,'Little girls get taylor swift tickets, one cries','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/vIxaUSDvfqs',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(356,'XeeiFceHzx','restricted',NULL,NULL,0,9,0,'Casey neistat painting','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/-l_PbJ_Qeag',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(357,'LTDCXRqGqJ','restricted',NULL,NULL,0,1,0,'Pomsky dog trying to reach for toy','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BWc2tBVgdLj/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(358,'Dl2I26chTZ','restricted',NULL,NULL,0,9,0,'Caribbean','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/Ok1Av1BrH34',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(359,'v8jzFLfxKl','restricted',NULL,NULL,0,9,0,'Guy playing pool, gets all in in a row?','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/volosciuc.corneliu/videos/1308436342564888/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(360,'pbH2TdbLYT','restricted',NULL,NULL,0,6,0,'Little girl holding her baby sister','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/jessbkr/posts/10213207247830359',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(361,'PBtmJWwgg9','restricted',NULL,NULL,0,9,0,'Backflip trickshot basketball hoop','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcU_u0iHOcg/?taken-by=therealstreeter',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(362,'VbbCKPxgjF','restricted',NULL,NULL,0,5,0,'Pranking kids with fake mouse','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/realangrydad/videos/1983396801914212/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(363,'irfGv4JMh1','restricted',NULL,NULL,0,9,0,'Design a necklace with your voice','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.kickstarter.com/projects/harkstudios/hark-pendant-necklace-crafted-by-voice-for-someone?ref=7x6f2a',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(364,'s9nX711bix','restricted',NULL,NULL,0,5,0,'Girl in dentist chair after getting wisdom tooth removed','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/jacci.gray/posts/10155283537762685',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(365,'IzEG872JeZ','restricted',NULL,NULL,0,7,0,'Drift Trike Racing San Francisco','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=AjR_z6o5ZKI&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(366,'2JtjnL5Vv8','restricted',NULL,NULL,0,9,0,'ALIEN SPACESHIP CAPSULE HOTEL IN JAPAN','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=fSLSW80DpYY',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(367,'bj123nzRte','restricted',NULL,NULL,0,1,0,'Dog eating food with human hands','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BdUF0F_liHw/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(368,'RQckSkes17','restricted',NULL,NULL,0,9,0,'Kenton-on-sea - Incredible south africa','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=v7twHu5P4xM&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(369,'vSiKXplKWt','restricted',NULL,NULL,0,9,0,'Floor is lava game at home','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/matt.heason.5/videos/10155653781075342/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(370,'jsNfLWQdH4','restricted',NULL,NULL,0,1,0,'Sweetie The Dog doesn\'t like snow and cold weather','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/uniladmag/videos/4117641011592260/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(371,'JLWjrDtJMC','restricted',NULL,NULL,0,5,0,'Chinese girl \'when rice is life\'','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/JLouOfficial/videos/486832171701417/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(372,'viZ13jRmqh','restricted',NULL,NULL,0,1,0,'Lizard struggles to eat worm','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bdc_5DGBFnG/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(373,'e21XwRxbGr','restricted',NULL,NULL,0,9,0,'Frozen niagra falls','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=540920636265771&id=267193980305106',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(374,'QKkhndtEg4','restricted',NULL,NULL,0,9,0,'Solving 7 rubix cubes in one minute','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/BrundageMagic/videos/1801402099901383/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(375,'CBrjD75kYQ','restricted',NULL,NULL,0,9,0,'Girl cooking dancing','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/ardelean.alice/videos/vb.100000902239269/1322816137758448/?type=3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(376,'8IkMx2gesk','restricted',NULL,NULL,0,9,0,'Drifting around track (drone footage)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=c9wWi_DN_v0&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(377,'VVn3wvGlL4','restricted',NULL,NULL,0,9,0,' Zion National Park','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=AkdpK0vjL-0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(378,'WVlkKYVlvZ','restricted',NULL,NULL,0,4,0,'Robbery in progress gone wrong','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=8H_85c2VqoE&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(379,'kmPd7gxbbj','restricted',NULL,NULL,0,9,0,'Compilation of Kinetic Sand Cutting','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BdiOC7IAguY/?taken-by=sandsationofficial',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(380,'llfh2SxVxN','restricted',NULL,NULL,0,9,0,'Kinetik sand compilation','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=MemHy2UMbx8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(381,'sdW9dyXWPP','restricted',NULL,NULL,0,9,0,'Steam cleaning','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/Proteccarpetcleaning/videos/1551311351627343/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(382,'QxYPXw79xL','restricted',NULL,NULL,0,5,0,'David Brent lookalike at car agent','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/procaragent/videos/1496109490425938/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(383,'ekZEL8rdrx','restricted',NULL,NULL,0,1,0,'Small puppy is excited to make friends','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3829496876114286678/trim.A68F9D57-6682-4E14-9394-D5E8EEAE7AEF.MOV',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(384,'4h1qtDL2ZW','restricted',NULL,NULL,0,9,0,'fight club art','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=z0TayG3Gfhg&index=5&list=PLozsJDBi_AAczCxDsI__8QFjSIAR4ADax',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(385,'16dZ94p3MI','restricted',NULL,NULL,0,1,0,'Two golden retrieves walking them selves','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BQxkBFrh4lu/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(386,'mV18epxmlt','restricted',NULL,NULL,0,5,0,'Guy faking claim to pay for tuition fee','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3830959345616876968/61E321AB-01ED-4FF9-A09E-FE75F9F253FF.MOV',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(387,'SHVWXbwH6i','restricted',NULL,NULL,0,9,0,'Excavation video','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/david.grimes.524/videos/10210663810219673/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(388,'b5896LLLJS','restricted',NULL,NULL,0,1,0,'car full of dogs','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3913289149313543413/VID_20171231_133255.mp4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(389,'tKpxmLK9V2','restricted',NULL,NULL,0,5,0,'First time chest waxing','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/HelpfulLaughter/videos/617250048664836/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(390,'dykPKFbhpg','restricted',NULL,NULL,0,1,0,'Raccoon eating popcorn','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3914790424423897296/video-1515541342.mp4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(391,'jTrEFyv11n','restricted',NULL,NULL,0,5,0,'Water bottle prank on girlfriend','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=P-1MnUdYJ_c&feature=youtu.be',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(392,'cLRyHeEZcB','restricted',NULL,NULL,0,5,0,'Ambulance ER hand gesture','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/firedepartmentchronicles/videos/1462455683872508/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(393,'bmyB4ZFDyd','restricted',NULL,NULL,0,9,0,'Kyoto Highlights 4K','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=IA9yY6OM9lg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(394,'GIkQtjry5Y','restricted',NULL,NULL,0,9,0,'EPIC Drone Footage Of Rere Rockslide Of Gisborne,New Zealand','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=BMER3kXEHh0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(395,'PKD21J2v4j','restricted',NULL,NULL,0,3,0,'Snooker shot fail','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/nilis.daniel/videos/10214929660900877/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(396,'Denjzv7XP8','restricted',NULL,NULL,0,1,0,'Girl rescues sea turtle tangled in rope underwater','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/emmaarangio/videos/10155884212421550/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(397,'pGLfbMkntN','restricted',NULL,NULL,0,7,0,'GTFP7 amazing KO 18/11/2017','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=rQ8ifZkbAZo ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(398,'TWzmrdYpZj','restricted',NULL,NULL,0,1,0,'Christmas cat decorated ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=1959366854314502&id=1443530449231481 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(399,'YVEr1IeHky','restricted',NULL,NULL,0,3,0,'Diving flop','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://twitter.com/lesleygoynes/status/936999582839345152 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(400,'59yWCtww3Q','restricted',NULL,NULL,0,1,0,'Remi eating pasta with human hands ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BVYd4xIAKPD/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(401,'84N6yqq6mI','restricted',NULL,NULL,0,1,0,'Do you even lift? retook vid','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.dropbox.com/s/p89836888bwj4mo/mindy%20spin%20slow%20text.mp4?dl=0 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(402,'pX1YeQXnTs','restricted',NULL,NULL,0,9,0,'Nothing but a balancing act.','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcWQfPPlx-H/?hl=en&taken-by=blacksheepskid ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(403,'T1pKBQBhVp','restricted',NULL,NULL,0,1,0,'Dog eating banana','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BcYd_LTjdU0/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(404,'KimPE6xWmc','restricted',NULL,NULL,0,9,0,'Meltingcheeseburger','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/9gag/videos/10155628344766840/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(405,'ILfyDp7Ibh','restricted',NULL,NULL,0,1,0,'Puppy chasing dogs','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BcfdaRAASkR/?taken-by=animalsdoingthings ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(406,'fnGHLKFS5G','restricted',NULL,NULL,0,0,0,'Angry husky in snow ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://mail.google.com/mail/u/0/?ui=2&ik=701687be28&view=att&th=1604af99ed12d0a4&attid=0.1&disp=inline&safe=1&zw ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(407,'eRTn9tiwsV','restricted',NULL,NULL,0,1,0,'Dog christmas lights','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BcYzDAWgrJk/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(408,'tyxy8J7pLK','restricted',NULL,NULL,0,1,0,'K9 fast dog','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bc2ide-g04P/?taken-by=k9_jester ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(409,'KtHSlvfR53','restricted',NULL,NULL,0,1,0,'Sumba in the snow ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bc0Y1uqBjez/?taken-by=sumbapumba ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(410,'eJljFc2Qkp','restricted',NULL,NULL,0,9,0,'The Bob Ross Video Game','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=ZAGargyyIPQ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(411,'5NQyEzKpez','restricted',NULL,NULL,0,9,0,'Age reversing tape put on back of neck','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/JungleVT/videos/2102371583238006/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(412,'Ix1hJE84Hx','restricted',NULL,NULL,0,1,0,'Cat attacks owner because of dog filter','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BdK4P-6ntUV/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(413,'bITSC3n5Vk','restricted',NULL,NULL,0,5,0,'Grinch stole Christmas','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://twitter.com/vivsmedina/status/945465633147314176 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(414,'XDxJRyS29g','restricted',NULL,NULL,0,5,0,'Sister playing COD','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://twitter.com/natnoota/status/945552380539551745 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(415,'dVsDVvHbCj','restricted',NULL,NULL,0,1,0,'Sundy the husky loves peanutbutter jar????','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BEaR89Ogz4x/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(416,'JszJmlsrhP','restricted',NULL,NULL,0,4,0,'Tiger selfie exploitation ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3895973932016082765/F95C4E38-BD72-4677-B000-F37EB1BC989F.MOV ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(417,'hBknVS3lRC','restricted',NULL,NULL,0,1,0,'George trying to get through a door ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BcjyEjplY7J/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(418,'dBi1VSTChv','restricted',NULL,NULL,0,1,0,'dog in backpack video','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bc4eMahn9j0/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(419,'NWRPDd1EHl','restricted',NULL,NULL,0,9,0,'Frozen Beard','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BdgxCT9Fc0W/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(420,'7w4nZe4LZD','restricted',NULL,NULL,0,1,0,'Dog birtday party ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/Mindythesamoyed/videos/1789973617743678/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(421,'gm18nvcW3i','restricted',NULL,NULL,0,9,0,'Friday Written In Snow (USE ON FRIDAY)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BdTNhbsnlHe/?taken-by=raymawst ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(422,'Q1y2vVcvgl','restricted',NULL,NULL,0,1,0,'Kitten had milk','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/gangmeowoffice/videos/2018954671705200/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(423,'gxEFXFQsxV','restricted',NULL,NULL,0,1,0,'Dog with little legs on beach','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3910018664428677636/AB055DA8-85EB-44FF-AD70-A0FBCE149DFF.MOV ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(424,'ckQdlNlQmy','restricted',NULL,NULL,0,1,0,'Cat playing with ball toy','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Batm72eFaJP/?taken-by=thatcatconrad ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(425,'victMZ33it','restricted',NULL,NULL,0,9,0,'Introvert Cafe','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=5we38bD7xx0&t=1s ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(426,'smewfh3wKE','restricted',NULL,NULL,0,1,0,'the most beautiful kitten in the world','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BdiASmTnWbR/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(427,'l9mPGwe2Rt','restricted',NULL,NULL,0,5,0,'Kid Breaks Door','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://twitter.com/haroldhilton22/status/948789502545465345 \nhttps://twitter.com/haroldhilton22/status/948712244803616769   ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(428,'3ZHbi5sVd2','restricted',NULL,NULL,0,9,0,'Chip inn Double Decker kebab box ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3914183089469833244/20180106_171644.mp4 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(429,'l2j1J8nhlQ','restricted',NULL,NULL,0,1,0,'Sleepy dog','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/groups/DogspottingSociety/permalink/2258773884374814/?comment_id=2259154444336758¬if_id=1515757280470609¬if_t=group_comment ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(430,'T3JHK2TxYs','restricted',NULL,NULL,0,1,0,'cat playing with foot','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.reddit.com/r/StartledCats/comments/7pt67b/oh_thats_your_foot/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(431,'3Gd2y3hFTs','restricted',NULL,NULL,0,5,0,'Drinking water through mouthguard','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BdtoNa9nvmC/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(432,'wJkwghgcp7','restricted',NULL,NULL,0,5,0,'I pulled up to a red light turned to my right and kid was singing unwritten','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=8CoSAhMlba4 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(433,'GVg9mKXdpe','restricted',NULL,NULL,0,9,0,'Spray paint art on guitar','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=rDNUwHGchP0&t=42s',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(434,'vHIndCfYGl','restricted',NULL,NULL,0,9,0,'Meat on scewer','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BcxTBE6ACEQ/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(435,'vvcc6YkTbH','restricted',NULL,NULL,0,1,0,'Man finds brown snake in car','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.dailymail.co.uk/video/news/video-1604816/Worker-discovers-deadly-brown-snake-ute.html ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(436,'xYQydEqbw1','restricted',NULL,NULL,0,9,0,'Powerwash Timelapse','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/p2OfhqXiL1w ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(437,'yPDM4iFP4K','restricted',NULL,NULL,0,1,0,'Dog doesnt like salt and vinegar crisp','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3831939237013494454/CA3DAA90-CF33-4986-B599-83086944698C.MOV ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(438,'LGJmPMcYng','restricted',NULL,NULL,0,1,0,'Tiny puppy running after toes','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BZGpBwmF2Bl/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(439,'wikYdxnbVE','restricted',NULL,NULL,0,5,0,'This man is living in 3018','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=1539427556119806&id=1288219341240630 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(440,'lKkdKVQwhM','restricted',NULL,NULL,0,5,0,'I movie fight scene indian bodybuilders','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=byOw4AYd7-8 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(441,'LCXwpG1ZL1','restricted',NULL,NULL,0,1,0,'Cat waving for nuggets','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3834500729638900567/Rosie.MOV ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(442,'iNDGQrWeQw','restricted',NULL,NULL,0,9,0,'Full circle rainbow over the Forth Bridges','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.reddit.com/r/interestingasfuck/comments/7plw6v/full_circle_rainbow_on_the_bridge/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(443,'eVsxVjtQbJ','restricted',NULL,NULL,0,1,0,'Dog in drawer','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/puggysmallsofficial/videos/2005747816303852/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(444,'3bywDX8Xgn','restricted',NULL,NULL,0,6,0,'Dad and daughter beauty and the beast costume','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.facebook.com/irishmirror/posts/1749516775088079 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(445,'Ytk1fpcNxs','restricted',NULL,NULL,0,5,0,'Learning how to sing my heart will go on with a friend','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=luXavQCEeC0&feature=youtu.be ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(446,'73zVpkvg3l','restricted',NULL,NULL,0,5,0,'Home made painting robot is rubbish and then falls over and spills paint','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/Bd2tCsEHwJt/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(447,'MNYEypFS5P','restricted',NULL,NULL,0,9,0,'Forging A Scalpel From A Screw','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/inK854tb_G0 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(448,'9EhlR5TV6B','restricted',NULL,NULL,0,9,0,'1000 degree knife vs ball and other objects','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/lr1aoyBEv1Q ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(449,'SklipRZ466','restricted',NULL,NULL,0,9,0,'Rusty tool restoration','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=AyCeF7yqATM&feature=youtu.be ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(450,'F54x79JZzG','restricted',NULL,NULL,0,9,0,'Guy raps political stuff ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/McNxtgen/videos/10156138766029244/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(451,'FEZnsmMsvT','restricted',NULL,NULL,0,9,0,'Guy eats 18 burgers in one sitting','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=IOtMN20SDE0 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(452,'Z4nYFis8CL','restricted',NULL,NULL,0,9,0,'2 Metre pizza challenge','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=2UpABGq7ayA&t=73s ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(453,'LvR676ZYrV','restricted',NULL,NULL,0,9,0,'3kg bbq food challenge','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=EEcXnM9Rnv4 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(454,'2FnwMMFwRV','restricted',NULL,NULL,0,9,0,'KFC Family feast in less than 10 minutes','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=2vEwMQ7730U&t=5s ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(455,'qH139Pwh86','restricted',NULL,NULL,0,9,0,'15000 calorie burger','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=WxZ2_0WoGac&t=14s ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(456,'6C7kT2dtin','restricted',NULL,NULL,0,9,0,'Ultimate burger challenge','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=pbAM6xVh_Zc ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(457,'CezFi67bZL','restricted',NULL,NULL,0,9,0,'Unlocking phones with magic','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/z3vnqGhOc4I ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(458,'mQjtZ1C7Dd','restricted',NULL,NULL,0,5,0,'Hiring australian hitman','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/_-hu7F4spgE ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(459,'Tlm1qseIYm','restricted',NULL,NULL,0,1,0,'Dog falls asleep','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BdoutOWny1X/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(460,'tmBK6XpWgi','restricted',NULL,NULL,0,9,0,'Top 5 travel destinations to visit ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=RADbA4rfh_k ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(461,'RiQESgxmrF','restricted',NULL,NULL,0,1,0,'Man dancing with ostrich','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/5_Nkxdg5dkc ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(462,'gExbgZzSl9','restricted',NULL,NULL,0,3,0,'Trampoline jump flip fail','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BXi2XTwB8Kq/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(463,'CiiI2kL3eN','restricted',NULL,NULL,0,3,0,'toilet water floods the bathroom','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/lee.cookwanstall.5/posts/373723693000453 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(464,'rgRdBlL2Fg','restricted',NULL,NULL,0,5,0,'Christian school weather video about school being closed','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/jesusgoodshepherd.org/videos/744134062452317/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(465,'mSq1lgRJzw','restricted',NULL,NULL,0,1,0,'Dog looks like a Fluffy Cloud Bouncing','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/LumitheSamoyed/videos/560774124311861/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(466,'ZNmjR9tjJh','restricted',NULL,NULL,0,9,0,'Guy spinning stuff on fingers','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://vine.co/v/MZEIQArWevv/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(467,'RI6JDZLEfB','restricted',NULL,NULL,0,5,0,'Big Bird sesame street kicks door down mutter','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=ljihnZCinHc ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(468,'6zq8RFV3FK','restricted',NULL,NULL,0,5,0,'Husband Pregnant for a Day','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/kHJvtdDp6VM ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(469,'PMiZtsgvrM','restricted',NULL,NULL,0,1,0,'Raccoon Eating Crisps ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3919326136606733172/video-1515948810.mp4 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(470,'w6LRBDcSKz','restricted',NULL,NULL,0,1,0,'Cat wants to be brushed ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BZJwE_6niQX/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(471,'xXrs8Le6Rq','restricted',NULL,NULL,0,4,0,'2017 meme rap','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/BrentVS/videos/1753661641321984/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(472,'Ty3i81kyjF','restricted',NULL,NULL,0,5,0,'When you get a follow back on your crushes instagram','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BeBJckCg14D/?taken-by=drhobs ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(473,'gXMFieg5pZ','restricted',NULL,NULL,0,5,0,'Little kid thinks the flower girls at weddng is making a mess','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=NRfgU2m4r64&feature=youtu.be ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(474,'p4SEf8BbCp','restricted',NULL,NULL,0,9,0,'Bedjet have the bed temperature you want','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=L-XFxNLrZeQ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(475,'dY32GXY1TI','restricted',NULL,NULL,0,5,0,'Eating tide pods in public prank','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/LWosR6_b-fA ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(476,'c4bRfZcMTm','restricted',NULL,NULL,0,4,0,'Little kid with cancer crying due to chemo stops crying when Ed Sheeran plays ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/Love4LJD/videos/312053025950818/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(477,'dRTJ4qzcNY','restricted',NULL,NULL,0,1,0,'Dog walking funnily with boots on','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BJ_Lrf0j5GT/',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(478,'zjrknC5gSe','restricted',NULL,NULL,0,1,0,'Dog doing CPR to his owner','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BdQGcjXFJaJ/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(479,'DHlzlec4Zp','restricted',NULL,NULL,0,9,0,'Worlds biggest coastal gun','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=aTWZeTfBpjQ&feature=youtu.be ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(480,'Rci81FHZkI','restricted',NULL,NULL,0,5,0,'girl on girl prank','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/xogumbyy/videos/1703142979724579/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(481,'pVnqfpkv2y','restricted',NULL,NULL,0,5,0,'The Best Baby Announcement Ever','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/klarabelledesigns/videos/10155092648735009/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(482,'phFDJd2fQ4','restricted',NULL,NULL,0,1,0,'Albino orangutan','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/BOSFoundation/videos/1745083978887381/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(483,'j79JPsmxWc','restricted',NULL,NULL,0,6,0,'Guy makes living room in town centre for strangers','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=3mYPO1trpIs ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(484,'DjCRv5PTqI','restricted',NULL,NULL,0,1,0,'Dog being pampered ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3901924047911723053/Video 27-12-2017, 22 45 21.mov   ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(485,'gGtEWZ9ksq','restricted',NULL,NULL,0,9,0,'Taipei 101 New Years 2018 Fireworks','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=s563rYGUlU0 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(486,'feiKFzJTjy','restricted',NULL,NULL,0,9,0,'A Brain Cake. The Red Velvet Cake for Halloween (diff to precedent) ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/Tcekylox8S4 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(487,'IvXQmKEqXB','restricted',NULL,NULL,0,1,0,'Warning: extreme handsomeness (Dog) ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3918297859287360835/6CBBF31A-E00E-49E4-85F2-60F7E488D1F0.MOV ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(488,'dMkN9IjpEG','restricted',NULL,NULL,0,9,0,'Challange Mix Meat Box','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://m.facebook.com/story.php?story_fbid=754845028033402&id=430841013767140 ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(489,'msF13d4ghy','restricted',NULL,NULL,0,9,0,'Train drivers view','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://youtu.be/jRGva6G9Glc ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(490,'qvw2ypSMBj','restricted',NULL,NULL,0,9,0,'Santorini','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://instagram.com/p/BaCMkDqBYHQ/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(491,'ZJYPwBgtly','restricted',NULL,NULL,0,1,0,'Dogs lick peanut butter off each other’s noses ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'http://www.jotform.com/uploads/UNILADmag/71261764583360/3835482877912294581/3AC8A1B5-4D86-43F1-9D65-B787E11F21D9.MOV ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(492,'GdxKedh8Ed','restricted',NULL,NULL,0,1,0,'Cat next to bath leaves disappointed ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.instagram.com/p/BaK0Z2ZAGX6/?taken-by=animalsdoingthings ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(493,'Y6e4WXir7W','restricted',NULL,NULL,0,1,0,'Wild bunny crawled on hand','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://i.imgur.com/0PUNyBj.gifv ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(494,'GVY6FKNEmQ','restricted',NULL,NULL,0,9,0,'I fucking love you pillow (V Day)','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/missi.sales.98/videos/1960899407502964/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(495,'rj2kKHE3q7','restricted',NULL,NULL,0,5,0,'How to get a woman into bed ','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.facebook.com/itssophiecraig/videos/1700985709942961/ ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(496,'t2xrLVcvJx','restricted',NULL,NULL,0,9,0,'Smart lock','nonex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,NULL,NULL,'https://www.youtube.com/watch?v=8zBTYbBW5-A ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-22 16:21:44','2018-01-22 16:21:44'),
	(497,'fX2n6enJiT','accepted',NULL,1,0,0,0,'Grinchy','ex','guest',NULL,NULL,NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,'',NULL,'https://www.facebook.com/atomant99/videos/10213604653564605/','',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-23 17:02:08','0a8UGPVJPuq6uIhQ7Vqw8Qy3SEMel5',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-23 17:02:08','2018-01-23 12:15:06'),
	(498,'WYK9eMXe1w','pending',NULL,1,0,0,0,'Youtube test','ex','guest',NULL,'Funny story bro',NULL,NULL,NULL,1,0,0,'placeholder.gif',NULL,'',NULL,'https://www.youtube.com/watch?v=Sv2h-csnlps','',NULL,NULL,NULL,'',NULL,NULL,'2017-12-31','Murica',NULL,1,'2018-01-23 16:04:23','0ioAVb6IBum6KEd0jFd58KzbDTgxEF',NULL,1,0,NULL,1,NULL,1,1,NULL,NULL,NULL,NULL,'2018-01-23 16:07:26','2018-01-23 15:49:32');

/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table youtube_access_tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `youtube_access_tokens`;

CREATE TABLE `youtube_access_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `access_token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `youtube_access_tokens` WRITE;
/*!40000 ALTER TABLE `youtube_access_tokens` DISABLE KEYS */;

INSERT INTO `youtube_access_tokens` (`id`, `access_token`, `created_at`)
VALUES
	(1,'{\"access_token\":\"ya29.Gls3BeVUta1G-kxxw34O0wUoBkPXKUhjoyirDXNmPe4R2f23Hnn0OwuQZSA8JF8EknldR9vyNVPwovp1AlsMQ-OzWMnKJpzWkC_nZomEPA62lv8LbPX_BnBwFXr9\",\"token_type\":\"Bearer\",\"expires_in\":3600,\"refresh_token\":\"1\\/2aXvghmBW-2nLAqoXIYXk-OiJlcKoThogr7wFEbKL_k\",\"created\":1514974123}','2018-01-03 10:30:04'),
	(2,'{\"access_token\":\"ya29.Gls3Bbf9Da7TalRkKylWD3mVoDM--IZPC5j4GQOdLDm80XmQEb1UqEBPqGGezCVlwDpAyCbQkhKQuEirPj1byWFZjXC8M1VGeZAkeCib9ApzyogKvdKiVnG9OYlG\",\"token_type\":\"Bearer\",\"expires_in\":3600,\"created\":1514982868,\"refresh_token\":\"1\\/2aXvghmBW-2nLAqoXIYXk-OiJlcKoThogr7wFEbKL_k\"}','2018-01-03 12:34:28'),
	(3,'{\"access_token\":\"ya29.Glw_BSRlmZ0D-tZv2HH2IhJNSpcg61kOmHHYWdb04jdNd2d9V-zb3zPgwfyGJDHNiy86DHzieXjo6Y5TFljlhfWS13qFYrrUIq7U-Nk1QxAlfunYwKywPa57acTwEg\",\"token_type\":\"Bearer\",\"expires_in\":3599,\"created\":1515692298,\"refresh_token\":\"1\\/2aXvghmBW-2nLAqoXIYXk-OiJlcKoThogr7wFEbKL_k\"}','2018-01-11 17:38:18'),
	(4,'{\"access_token\":\"ya29.GlxDBWGAupem3WT_dlIQxH8sly5GOtbSyl9Ds7wgCNKSR4EdKBPdZdZTMDBUroeq9BLS2EEXqcjzFRoIe9PKXSsGBLRKusZXFKAIzSj-3u44-Csuoqhg4YNqhlKMjg\",\"token_type\":\"Bearer\",\"expires_in\":3600,\"created\":1516023454,\"refresh_token\":\"1\\/2aXvghmBW-2nLAqoXIYXk-OiJlcKoThogr7wFEbKL_k\"}','2018-01-15 13:37:34'),
	(5,'{\"access_token\":\"ya29.GlxEBd6v87vqNWGfgNGUQZchukLmpQCoEKLeocCFfPbBHxSiNX5Dc38K3ewBuHZy6SoUUqNWtYPOx-IIkQP79-dxw-RHOhA1JAmko40os_4i_shQceXYXbPEyp_0JA\",\"token_type\":\"Bearer\",\"expires_in\":3600,\"created\":1516100745,\"refresh_token\":\"1\\/2aXvghmBW-2nLAqoXIYXk-OiJlcKoThogr7wFEbKL_k\"}','2018-01-16 11:05:45'),
	(6,'{\"access_token\":\"ya29.GlxGBWCn_R5wxO8ebhSSzVALHzkC8jyoVSx6ntEyBYun4GAuddKktlDF_AvFEhDq7gG6DNN_9_PU-CWS3EaEToxT_AWUBYTBo33eYWlJhm6g3wXf5awoAPGOfTzJ-Q\",\"token_type\":\"Bearer\",\"expires_in\":3600,\"created\":1516274947,\"refresh_token\":\"1\\/2aXvghmBW-2nLAqoXIYXk-OiJlcKoThogr7wFEbKL_k\"}','2018-01-18 11:29:07');

/*!40000 ALTER TABLE `youtube_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
