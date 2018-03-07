<?php

	session_start();
	include_once("schema_connect.php");
	$moviename = $_POST["movienamed"];
	
	$result = $db->query("SELECT * FROM user_rating WHERE moviename='$moviename' ORDER BY date_added DESC");
	if($result->num_rows > 0){
	    foreach ($result as $row) {
	    $username= $row['username'];
	    $result2 = $db->query("SELECT Distinct firstname, lastname FROM user WHERE username='$username'");
    	    foreach ($result2 as $row2) {
    	        echo '<ul>';
        	    echo '<h3>'."Date added: ". $row['date_added'] . '</h3>';
                echo '<h1>'."Movie Name: ". $row['moviename'] . '</h3>';
                echo '<h1>'."User Name: ". $row2['firstname'] . " ". $row2['lastname']. '</h1>';
                echo '<h1>'."Movie Rating: ". $row['movierating'] . '</h3>';
                echo '<h3>'."Review: " . '</h3>';
                echo '<p>'. $row['moviereview'] . '</p>';
                echo '</ul>';
    	    }
	    }
	}else{
	    echo ("Nothing return from table");
	}
	
	
?>