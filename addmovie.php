<?php

	session_start();
	include_once("schema_connect.php");

	$username = $_POST["username"];
	$moviename = $_POST["moviename"];
	$movierating = $_POST["movierating"];
	$review = $_POST["review"];
	
	$success = $db->query( "INSERT INTO user_rating (username, moviename, movierating, moviereview, date_added) VALUES ('$username', '$moviename', '$movierating', '$review', NOW())");
	
	
	if(!$success)
		echo "failure";
	else
		echo "success";

?>