<?php

	session_start();
	include_once("schema_connect.php");
	
    $rating_list= array();
	
	$result= $db->query("SELECT Distinct movieid FROM user_rating");
	foreach($result as $row){
	    (float)$totalrating = 0.00;
	    $ratingnumber = 0;
	    $movieid= $row['movieid'];
	    $result2= $db->query("SELECT movierating FROM user_rating WHERE movieid= '$movieid'");
	    foreach ($result2 as $row2) {
	        $rating= $row2['movierating'];
	        $totalrating += $rating;
	        $ratingnumber += 1;
	    }
	    (float)$average_rating= number_format((float)$totalrating/$ratingnumber, 2, '.', '');
	    $rating_list[$movieid]= $average_rating;
	}
	
	array_multisort($rating_list,SORT_DESC);
	foreach($rating_list as $movie=>$rating)
    	{
    	    if ($rating > 2){
    	    	$movienames= $db->query("SELECT DISTINCT moviename FROM user_rating WHERE movieid='$movie'");
    	        $moviename=array();
    	        $moviename=mysqli_fetch_array($movienames);
    	        echo '<ul>';
                echo '<p class="hotmovie" id="'.$movie.'">'.'Movie Name:'. $moviename[0] . ' -------     ' .'Movie Rating:'. $rating .'</p>';
                echo '</ul>';   
    	    }
    	}
	
	
?>