<?php

	session_start();
	include_once("schema_connect.php");

	$username = $_POST["username"];
	$moviename = $_POST["moviename"];
	$movierating = $_POST["movierating"];
	$review = $_POST["review"];
	
	if ( !in_array($movierating, array(1,2,3,4,5)) ){
		echo "Ratings must be between 1 - 5!";
		exit;
	}
	
	$result= $db->query("SELECT username, moviename FROM user_rating WHERE username='$username' and moviename='$moviename'");
	if($result->num_rows > 0){
        echo "Review for movie already exsist!";     
        exit;
    }
	
	
	$success = $db->query( "INSERT INTO user_rating (username, moviename, movierating, moviereview, date_added) VALUES ('$username', '$moviename', '$movierating', '$review', NOW())");
	
	
	if(!$success)
		echo "failure";
	else
		echo "success";

?>