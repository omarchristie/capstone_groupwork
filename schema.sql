DROP DATABASE IF EXISTS IMovie;
CREATE DATABASE IMovie;
USE IMovie;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`firstname` varchar(20) NOT NULL,
	`lastname` varchar(20) NOT NULL,
	`username` varchar(16) NOT NULL,
	`password` varchar(32) NOT NULL,
	UNIQUE (`username`)
); 


INSERT INTO `user` VALUES (NULL, 'Admin', 'Admin', 'admin', 'bdc87b9c894da5168059e00ebffb9077');/*password1234*/
INSERT INTO `user` VALUES (NULL, 'Omar', 'Christie', 'ochristie', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'Leeza', 'Smith', 'lsmith', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'Sashana', 'Ramsey', 'sramsey', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'stephanie', 'Ramsey', 'stramsey', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'Patella', 'Portundo', 'pportundo', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'Kimari', 'Nelson', 'knelson', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/

DROP TABLE IF EXISTS `user_rating`;
CREATE TABLE `user_rating` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`username` varchar(16) NOT NULL,
	`moviename` varchar(32) NOT NULL,
	`movierating` varchar(1) NOT NULL,
	`moviereview` mediumtext NOT NULL,
	`date_added` datetime NOT NULL
); 

INSERT INTO `user_rating` VALUES (NULL, 'ochristie', 'Titan', '3.0', 'not bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'ochristie', 'Avatar', '4.0', 'not tooo bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'ochristie', 'Rambo', '5.0', 'The best story', NOW());

INSERT INTO `user_rating` VALUES (NULL, 'lsmith', 'Titan', '4.0', 'very good show', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'lsmith', 'Avatar', '4.0', 'the best', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'lsmith', 'Rambo', '5.0', 'rambo not bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'lsmith', 'Rockey', '5.0', ' rockey not bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'lsmith', 'Gorden', '2.0', 'gorden not bad', NOW());

INSERT INTO `user_rating` VALUES (NULL, 'stramsey', 'Thor', '3.0', 'thor not that bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'stramsey', 'Avatar', '2.0', 'user thinksS bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'stramsey', 'Rambo', '3.0', 'rambo could develope more', NOW());

INSERT INTO `user_rating` VALUES (NULL, 'sramsey', 'Avatar', '3.0', 'avatar not bad', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'sramsey', 'Thor', '4.0', 'Thor not bad', NOW());

INSERT INTO `user_rating` VALUES (NULL, 'pportundo', 'Gorden State', '4.0', 'Gordon State was more develope', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'pportundo', 'Before Sunset', '2.0', 'Hardly like', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'pportundo', 'Training Day', '3.0', 'Average', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'pportundo', 'Dance Floor', '4.0', 'good but not great', NOW());

INSERT INTO `user_rating` VALUES (NULL, 'knelson', 'Gorden State', '3.0', 'Gordon State was not more develope', NOW());
INSERT INTO `user_rating` VALUES (NULL, 'knelson', 'Training Day', '4.0', 'Apart from minor, liked a lot', NOW());



