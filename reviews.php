<?php

	session_start();
	include_once("schema_connect.php");
	$moviename = $_POST["movieid"];
	
	$result = $db->query("SELECT * FROM user_rating WHERE movieid='$moviename' ORDER BY date_added DESC");
	if($result->num_rows > 0){
	    foreach ($result as $row) {
	    $username= $row['username'];
	    $result2 = $db->query("SELECT Distinct firstname, lastname FROM user WHERE username='$username'");
    	    foreach ($result2 as $row2) {
    	        echo '<ul>';
        	echo '<h6>'."Date added: ". $row['date_added'] . '</h6>';
                echo '<h4>'."Movie Name: ". $row['moviename'] . '</h4>';
                echo '<h5>'."User Name: ". $row2['firstname'] . " ". $row2['lastname']. '</h5>';
                echo '<h5>'."Movie Rating: ". $row['movierating'] . '</h5>';
                echo '<h5>'."Review: " . '</h5>';
                echo '<p>'. $row['moviereview'] . '</p>';
                echo '<button type="button" class="report '. $row['username'].'" id="'. $row['movieid'].'">Report!</button>';
                echo '</ul>';
                
    	    }
	    }
	}else{
	    echo ("Nothing return from table");
	}
	
	
?>