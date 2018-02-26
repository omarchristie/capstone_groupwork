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

DROP TABLE IF EXISTS `user_rating`;
CREATE TABLE `user_rating` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`username` varchar(16) NOT NULL,
	`moviename` varchar(32) NOT NULL,
	`movierating` varchar(1) NOT NULL,
	`moviereview` mediumtext NOT NULL,
	`date_added` datetime NOT NULL
); 