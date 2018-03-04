<?php

	session_start();
	include_once("schema_connect.php");
	$username = $_POST["username"];
	$subject = $_POST["subject"];

if($subject == "all"){
    $result = $db->query("SELECT * FROM user_rating WHERE username='$username' ORDER BY date_added DESC LIMIT 20");
    if($result->num_rows > 0){
        foreach ($result as $row) {
            echo '<ul>';
            echo '<p class="movie" id="'.$row['moviename'].'">'.'Movie Name:'. $row['moviename'] . ' -------     ' .'Movie Rating:'. $row['movierating'] . '----'.'Date Reviewed:'. $row['date_added'].'</p>';
            echo '</ul>';
        }
    }else{
        echo ("No Movie Rated");
    }
}else{
    $result2 = $db->query("SELECT * FROM user_rating WHERE username='$username' ORDER BY date_added DESC LIMIT 20");
    foreach ($result2 as $row) {
        if($row['moviename'] == $subject){
            echo '<h3>'."Date Sent: ". $row['date_added'] . '</h3>';
            echo '<h1>'."Movie Name: ". $row['moviename'] . '</h3>';
            echo '<h1>'."Movie Rating: ". $row['movierating'] . '</h3>';
            echo '<h3>'."Review: " . '</h3>';
            echo '<p>'. $row['moviereview'] . '</p>';
            echo '<button id="return">Return</button>';
        }
    }
}

?>
