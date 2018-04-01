<?php

	session_start();
	include_once("schema_connect.php");
	$username = $_POST["username"];
	$subject = $_POST["subject"];
	
	$result2 = $db->query("SELECT * FROM user_rating WHERE username='$username' ORDER BY date_added DESC LIMIT 20");
    foreach ($result2 as $row) {
        if($row['movieid'] == $subject){
            echo '<h6>'."Date added: ". $row['date_added'] . '</h6>';
            echo '<h4>'."Movie Name: ". $row['moviename'] . '</h4>';
            echo '<h5>'."Movie Rating: ". $row['movierating'] . '</h5>';
            echo '<h5>'."Review: " . '</h5>';
            echo '<p>'. $row['moviereview'] . '</p>';
            echo '<button class= "delete" id="'.$row['id'].'">Delete</button></br>';
            echo '<button id="return">Return</button>';
        }
    }
	
	
?>