<?php

	session_start();
	include_once("schema_connect.php");
	
    $rating_list= array();
	
	$result= $db->query("SELECT Distinct moviename FROM user_rating");
	foreach($result as $row){
	    (float)$totalrating = 0.00;
	    $ratingnumber = 0;
	    $moviename= $row['moviename'];
	    $result2= $db->query("SELECT movierating FROM user_rating WHERE moviename= '$moviename'");
	    foreach ($result2 as $row2) {
	        $rating= $row2['movierating'];
	        $totalrating += $rating;
	        $ratingnumber += 1;
	    }
	    (float)$average_rating= number_format((float)$totalrating/$ratingnumber, 2, '.', '');
	    $rating_list[$moviename]= $average_rating;
	}
	
	array_multisort($rating_list,SORT_DESC);
	foreach($rating_list as $movie=>$rating)
    	{
    	    if ($rating > 2){
    	        echo '<ul>';
                echo '<p class="hotmovie" id="'.$movie.'">'.'Movie Name:'. $movie . ' -------     ' .'Movie Rating:'. $rating .'</p>';
                echo '</ul>';   
    	    }
    	}
	
	
?>