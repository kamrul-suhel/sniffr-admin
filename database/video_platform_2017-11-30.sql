# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.2.10-MariaDB)
# Database: video_platform
# Generation Time: 2017-11-30 11:57:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


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
	(1,2,'Thirsty Moments','thirsty-moments',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56');

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
	(1,'Daily Mail','daily-mail',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
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
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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

INSERT INTO `contacts` (`id`, `first_name`, `last_name`, `email`, `tel`, `language`, `location`, `facebook`, `youtube`, `instagram`, `twitter`, `other`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(1,'Heloise','Heaney','zdaugherty@bode.info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(2,'Kara','Gleason','monica.hilpert@toy.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(3,'Elfrieda','Terry','shawn87@mitchell.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(4,'Kirstin','Altenwerth','durgan.americo@champlin.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(5,'Chadd','Pfeffer','omoore@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(6,'Tania','VonRueden','sbednar@gusikowski.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(7,'Jordyn','Armstrong','cleo.langosh@deckow.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(8,'Rebeka','Cremin','osinski.callie@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(9,'Nellie','Erdman','oliver.erdman@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(10,'Miguel','Schmidt','zhackett@balistreri.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(11,'Abner','McCullough','amely46@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(12,'Hailee','Hand','klocko.earnestine@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(13,'Rosalind','Lemke','tomas.ernser@dooley.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(14,'Meghan','Crist','nickolas.schaefer@kemmer.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(15,'Alfred','Schmeler','dkirlin@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(16,'Kristian','Johnston','streich.alphonso@hauck.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(17,'Anibal','Braun','howe.sylvester@weissnat.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(18,'Deshaun','Cummings','hcarter@bergstrom.net',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(19,'Claude','Bauch','jmacejkovic@wehner.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(20,'Andrew','Jacobi','bailey.bryce@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(21,'Doyle','Wiegand','raheem.cronin@toy.biz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(22,'Antwon','Cronin','annie46@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(23,'Leola','Daugherty','leslie64@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(24,'Melyna','Nicolas','isabel.langosh@reinger.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(25,'Brando','Considine','nzboncak@graham.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(26,'Sven','Kshlerin','edythe.rippin@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(27,'Gunnar','Langworth','barney.hettinger@bogan.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(28,'Paxton','Cormier','ibeahan@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(29,'Carlos','Labadie','ltromp@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(30,'Amya','Jacobs','mozell04@hansen.org',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56');

/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table likes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `likeable_id` int(11) NOT NULL,
  `likeable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
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
	(1,'2014_01_07_073615_create_tagged_table',1),
	(2,'2014_01_07_073615_create_tags_table',1),
	(3,'2014_10_12_000000_create_users_table',1),
	(4,'2014_10_12_100000_create_password_resets_table',1),
	(5,'2016_06_29_073615_create_tag_groups_table',1),
	(6,'2016_06_29_073615_update_tags_table',1),
	(7,'2017_09_11_160000_create_contacts_table',1),
	(8,'2017_09_11_160241_create_videos_table',1),
	(9,'2017_09_11_160424_create_comments_table',1),
	(10,'2017_09_11_162056_create_likes_table',1),
	(11,'2017_09_26_150714_create_verticals_table',1),
	(12,'2017_11_22_142723_create_clients_table',1),
	(13,'2017_11_22_155614_create_campaigns_table',1);

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table password_resets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table tagging_tag_groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tagging_tag_groups`;

CREATE TABLE `tagging_tag_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tagging_tag_groups_slug_index` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table tagging_tagged
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tagging_tagged`;

CREATE TABLE `tagging_tagged` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `taggable_id` int(10) unsigned NOT NULL,
  `taggable_type` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag_name` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag_slug` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tagging_tagged_taggable_id_index` (`taggable_id`),
  KEY `tagging_tagged_taggable_type_index` (`taggable_type`),
  KEY `tagging_tagged_tag_slug_index` (`tag_slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table tagging_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tagging_tags`;

CREATE TABLE `tagging_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag_group_id` int(10) unsigned DEFAULT NULL,
  `slug` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `suggest` tinyint(1) NOT NULL DEFAULT 0,
  `count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `tagging_tags_slug_index` (`slug`),
  KEY `tagging_tags_tag_group_id_foreign` (`tag_group_id`),
  CONSTRAINT `tagging_tags_tag_group_id_foreign` FOREIGN KEY (`tag_group_id`) REFERENCES `tagging_tag_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_level` int(10) unsigned NOT NULL DEFAULT 0,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `access_level`, `remember_token`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(1,'Ian Lainchbury','ian@unilad.co.uk','$2y$10$K1/qarPv2kkvAJv4DH.zue6N6EugzzOO80IyDEBu8BLNk0Cc4Odiu',100,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(2,'Mike Wright','mike@unilad.co.uk','$2y$10$EyRM7Ac7bN4TNvEf8zv/Uuk1BTdfqmB1xytMU5.AM3yK3qymZSfFC',100,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(3,'Manager','manager@unilad.co.uk','$2y$10$vdawx/97.uvsWjMVlFBBa.w4cOx97XQoLvZcSujuaqx.uAbMPaInq',50,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(4,'Client','client@unilad.co.uk','$2y$10$K9FCQSNFYxPf6kg9nYeJRumiKWi3K4/9e.j5h/7CVtx/8PReANS6m',25,NULL,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table verticals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `verticals`;

CREATE TABLE `verticals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `verticals` WRITE;
/*!40000 ALTER TABLE `verticals` DISABLE KEYS */;

INSERT INTO `verticals` (`id`, `name`, `slug`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(1,'UNILAD','unilad',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(2,'Tech','tech',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(3,'Gaming','gaming',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(4,'Adventure','adventure',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(5,'Sound','sound',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(6,'Fitness','fitness',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(7,'Grub','grub',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(8,'Film','film',NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56');

/*!40000 ALTER TABLE `verticals` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table videos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `state` enum('new','accepted','rejected','inprogress','pending','licensed','restricted','problem','noresponse') COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `vertical_id` int(10) unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `more_details` tinyint(1) NOT NULL DEFAULT 0,
  `more_details_sent` datetime DEFAULT NULL,
  `more_details_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reminders` int(10) unsigned DEFAULT NULL,
  `contact_is_owner` tinyint(1) DEFAULT NULL,
  `submitted_elsewhere` tinyint(1) DEFAULT NULL,
  `submitted_where` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `allow_publish` tinyint(1) DEFAULT NULL,
  `filmed_by_me` tinyint(1) DEFAULT NULL,
  `permission` tinyint(1) DEFAULT NULL,
  `is_exclusive` tinyint(1) DEFAULT NULL,
  `file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ext` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mime` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` int(10) unsigned DEFAULT NULL,
  `date` date DEFAULT NULL,
  `terms` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `videos_contact_id_foreign` (`contact_id`),
  CONSTRAINT `videos_contact_id_foreign` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;

INSERT INTO `videos` (`id`, `state`, `contact_id`, `vertical_id`, `title`, `url`, `description`, `more_details`, `more_details_sent`, `more_details_code`, `reminders`, `contact_is_owner`, `submitted_elsewhere`, `submitted_where`, `allow_publish`, `filmed_by_me`, `permission`, `is_exclusive`, `file`, `thumbnail`, `image`, `location`, `source`, `ext`, `mime`, `ip`, `views`, `date`, `terms`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(1,'accepted',1,3,'Velit ullam ab voluptatem rem sed.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Itaque et unde sit ut recusandae voluptatem. Ullam assumenda dicta sequi qui est eos. Aut quos et iusto suscipit tempora. Quod sed molestias blanditiis qui neque excepturi sit.',0,'2017-11-29 12:32:26','O38jvkXdiZLC4eskpIhr6QBeP38xUP',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Kansas',NULL,'mp4','video/mp4','101.158.107.78',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-29 12:32:28'),
	(2,'accepted',2,7,'Est sed voluptate nobis vero tempora sapiente.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Id odit quis et quia ea repellendus. Velit sunt voluptatem nam aut reprehenderit quia eligendi. Pariatur hic nam aspernatur eligendi neque a voluptatem. Fuga adipisci eveniet molestiae ipsa natus dolorem.',0,'2017-11-29 12:52:49','8fv8mvo8UN7CDeoqNUSXTiMqBu0uva',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Mississippi',NULL,'mp4','video/mp4','98.97.134.77',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-29 12:52:51'),
	(3,'pending',3,7,'Quod sed provident impedit est officia aut.','https://www.youtube.com/watch?v=YRWv4ybjBxY','SOmething',1,'2017-11-29 14:51:48','XYsl7AAO92h5nnyt1ZBuGAYLgzAf2e',1,1,0,'eqgq',1,NULL,1,1,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','London',NULL,'mp4','video/mp4','45.94.53.150',0,'2014-01-01',0,NULL,'2017-11-22 17:26:56','2017-11-29 14:52:09'),
	(4,'new',4,4,'Omnis ipsam non labore totam dignissimos aut architecto.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Optio sint placeat facere et eos. Ea recusandae sit doloribus provident et. Accusamus in similique cum et omnis culpa. Molestiae officia earum id consectetur hic laborum. Esse ratione omnis voluptas excepturi suscipit maiores.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Connecticut',NULL,'mp4','video/mp4','213.63.202.33',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(5,'new',5,1,'Corporis quis iste aperiam est et consequuntur tempora.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Sapiente dolorem aperiam ex rem amet. Qui excepturi qui sed iure enim. Deserunt deserunt consequatur perferendis beatae provident nemo totam voluptatem. Ratione odit enim hic sed et.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','New Hampshire',NULL,'mp4','video/mp4','76.80.19.185',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(6,'new',6,8,'Et rem aliquid qui beatae expedita.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Repellendus aspernatur ut est maiores non. Amet aspernatur aut voluptatem. Et eligendi inventore soluta quo. Eos qui quo soluta quasi est. Eveniet odio neque exercitationem eum sunt eveniet est. Ducimus sed in soluta quod et. Sed et iure deserunt delectus accusamus sapiente animi.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','New Hampshire',NULL,'mp4','video/mp4','83.1.107.22',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(7,'new',7,8,'Nisi sit dicta repellendus quisquam.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Quos odio tenetur qui in. Qui repudiandae est ut nemo impedit. Omnis atque ut voluptatem. Debitis neque quo in aut id. Laudantium ipsa sed earum molestiae nisi voluptas officia. Minus molestias saepe ipsa. Voluptas est cum sunt minima omnis.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','New York',NULL,'mp4','video/mp4','95.108.66.156',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(8,'new',8,2,'Reprehenderit non dolores in ipsum voluptatem nisi.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Aperiam qui minima consequatur accusamus aut enim. Eligendi id ut sit molestiae omnis perspiciatis aut. Enim culpa dignissimos officiis iusto consequatur hic eveniet.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Connecticut',NULL,'mp4','video/mp4','178.132.9.188',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(9,'new',9,1,'Est et totam reiciendis sunt.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Sed ea maxime ipsum quia hic. Alias vero provident sit consequatur excepturi dicta quasi. Et et quibusdam ut consectetur aut et. Repudiandae optio consequuntur in illum et non. Nulla dolores eum modi doloremque praesentium mollitia. Eos tempore omnis velit sit id aut.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Kentucky',NULL,'mp4','video/mp4','159.158.29.7',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(10,'new',10,6,'Fuga dolorum voluptatem a dolores excepturi.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Culpa omnis veritatis doloribus quia eligendi et. Velit recusandae fugiat esse quidem expedita nulla natus magnam. Quisquam consequuntur dolorum et ducimus id. Quia omnis ipsum rem assumenda accusamus non. Neque est soluta officia excepturi.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Mississippi',NULL,'mp4','video/mp4','126.93.104.241',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(11,'new',11,2,'Commodi ut reprehenderit accusamus explicabo modi qui illum non.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Accusantium accusantium natus earum eius itaque rerum quia enim. Sit praesentium sed quaerat id sint sint. Sed tempora modi perspiciatis aperiam asperiores cum.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Wisconsin',NULL,'mp4','video/mp4','13.172.66.68',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(12,'new',12,3,'Ut voluptas repellat et qui reiciendis reiciendis corporis.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Voluptatum nisi ea aliquam excepturi alias sit quibusdam sed. Consequatur pariatur perspiciatis voluptas consequuntur iure laborum commodi. Quia facere et repudiandae repellat qui exercitationem. Laborum dolor soluta ut et molestias voluptates.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','California',NULL,'mp4','video/mp4','40.195.32.106',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(13,'new',13,3,'Libero ea aut aut.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Eum accusantium iste eaque enim praesentium. Deserunt quo praesentium in quisquam qui deserunt perferendis. Dolore et quo voluptas quia. Consequuntur blanditiis quibusdam iste et aut consequatur repellendus eos.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Nevada',NULL,'mp4','video/mp4','193.21.99.167',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(14,'new',14,4,'Autem laudantium aliquid quos minima nulla.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Cupiditate et et et modi sequi. Ducimus aperiam in eum sed dolorem. Et ut facilis aliquam qui illum iusto. Et mollitia ea necessitatibus omnis.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Virginia',NULL,'mp4','video/mp4','166.80.184.206',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(15,'new',15,8,'Temporibus aliquid cupiditate voluptates quia voluptatem aspernatur id.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Cupiditate quam consectetur laboriosam aut minus. Et qui pariatur officia neque sed. Laboriosam tempora quibusdam consectetur. Odit exercitationem ducimus enim maxime.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','North Dakota',NULL,'mp4','video/mp4','122.46.8.156',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(16,'new',16,2,'Ut asperiores sed minus ut corporis natus.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Quo dolores autem omnis ab molestias ab praesentium. Eum non maxime eaque voluptas architecto. Dolores architecto hic aut. Mollitia a cumque maiores harum eos. Et doloribus ut autem tempora error ipsa quo. Voluptatibus ipsa temporibus impedit magni autem officia aliquam. Nesciunt rem autem est et.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Connecticut',NULL,'mp4','video/mp4','166.75.73.236',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(17,'new',17,1,'Consequuntur nulla nam aut ipsa odit.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Similique excepturi officiis animi ipsum. Modi dolores dolorum accusantium aperiam corrupti velit. Assumenda est eaque impedit aut aut. Sunt voluptates consequatur eum beatae ut voluptas non.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','North Carolina',NULL,'mp4','video/mp4','11.73.239.198',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(18,'new',18,3,'Qui voluptas illum tempore molestiae.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Saepe eaque enim nihil omnis. Et qui beatae odio et earum. Eaque id excepturi repellat culpa eum nesciunt consequuntur voluptatum. In id ut veniam et. Numquam dolores laboriosam id nostrum. Sint ea repellat tempora amet vel dolorem.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','New Mexico',NULL,'mp4','video/mp4','208.26.245.158',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(19,'new',19,2,'Sit atque magni veniam voluptatibus nam quia qui qui.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Aspernatur delectus provident quae assumenda sint quia. Aut porro aliquid quasi est eum veniam ab vel. Cum aut maxime voluptate cupiditate voluptas. Est eius totam in reiciendis qui. Accusamus optio maxime nobis dolore. Illo magni quibusdam soluta nobis ex quos.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Iowa',NULL,'mp4','video/mp4','151.124.38.43',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(20,'new',20,8,'Veritatis reiciendis fugiat quia aut voluptatem minima exercitationem sequi.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Laborum quibusdam a reprehenderit nisi aut consequatur. Aliquid quo animi aliquid. Iusto ducimus soluta aut tempore labore sunt.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Minnesota',NULL,'mp4','video/mp4','165.93.24.241',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(21,'new',21,7,'At commodi dolores nihil laborum ut enim.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Mollitia expedita tempore non quas accusantium. Non ut et velit voluptatibus. Alias neque omnis in eveniet voluptatem. Itaque consequuntur voluptate autem est. Et doloribus in possimus consectetur nihil. Porro iure deleniti ut qui.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Vermont',NULL,'mp4','video/mp4','143.1.36.57',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(22,'new',22,2,'Dolor est veritatis eveniet esse repellat ipsam odio.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Earum sequi in aliquid est eligendi vitae. Quisquam sit facere dolores exercitationem expedita quos. Quia neque omnis culpa.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Louisiana',NULL,'mp4','video/mp4','23.172.63.214',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(23,'new',23,7,'Maiores deleniti est ipsum ut minima.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Perspiciatis exercitationem quasi et tempore. Sed sed unde vel autem id id molestiae. Soluta quisquam aut impedit similique voluptas facilis animi voluptas.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Vermont',NULL,'mp4','video/mp4','68.176.114.163',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(24,'new',24,3,'Qui accusantium asperiores molestias tempore sit ut.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Expedita laboriosam a amet voluptas consequatur sed eaque. Qui autem et dolorem tempora accusantium ipsa reiciendis. Fugiat repellat quis accusantium molestiae impedit sunt dolor quo.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Minnesota',NULL,'mp4','video/mp4','247.109.167.194',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(25,'new',25,8,'Qui commodi perspiciatis ipsum mollitia autem odio dolores.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Provident qui ipsa quasi est ex quia. Sint est sed eum dolore. Possimus beatae facere nihil maxime.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Alaska',NULL,'mp4','video/mp4','1.70.158.135',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(26,'new',26,1,'Quis magnam quae hic fugiat tempora.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Voluptatem odio harum consequuntur dolor laborum voluptatem ipsa. Accusantium earum nisi temporibus. Autem ea voluptas corporis unde eius eos. Vel temporibus exercitationem est laboriosam tempora quos pariatur.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Minnesota',NULL,'mp4','video/mp4','84.110.246.130',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(27,'new',27,4,'Omnis accusamus voluptatem necessitatibus unde aliquid reiciendis.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Ipsa suscipit ea aut aut delectus. Molestias autem nisi praesentium ipsam. Veritatis dolores ducimus facere culpa molestiae id. Dolor soluta eaque repellendus sed. Esse autem est veritatis ea molestiae molestiae esse. Eius aut praesentium pariatur quia ut enim.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Maine',NULL,'mp4','video/mp4','30.236.12.27',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(28,'new',28,3,'Eveniet iusto facere enim quis.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Et nisi reiciendis assumenda. Fuga dolores vitae occaecati veritatis laborum est reiciendis. Neque ipsum nisi odio est. Natus dolorem dignissimos fuga. Dignissimos sit tempore veniam repudiandae. Error aut voluptate veritatis eveniet enim quas.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Indiana',NULL,'mp4','video/mp4','28.28.73.8',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(29,'new',29,7,'Cumque cupiditate non eius dolore.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Quibusdam corporis explicabo animi possimus culpa. Aut iure et ipsa dolorem praesentium. Culpa enim quia ex eaque. Quia ut maiores modi laboriosam repellendus consequatur.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','New Mexico',NULL,'mp4','video/mp4','132.167.155.96',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56'),
	(30,'new',30,8,'Dolorum voluptatum nulla autem ullam earum in eius dolorem.','https://www.youtube.com/watch?v=YRWv4ybjBxY','Similique ratione vitae vitae voluptatem repudiandae ipsam voluptas. Rerum voluptatem culpa aliquid et voluptatem molestias qui fugit. Delectus esse nulla odit. Qui dolore voluptate laborum occaecati quos animi voluptatem. Quisquam atque eaque et sunt. Asperiores deleniti voluptatem vel.',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'http://local.video-platform.dev/uploads/sample.mp4','http://local.video-platform.dev/uploads/320x180.png','http://local.video-platform.dev/uploads/1280x720.png','Maryland',NULL,'mp4','video/mp4','52.151.15.150',0,'2017-11-22',0,NULL,'2017-11-22 17:26:56','2017-11-22 17:26:56');

/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
