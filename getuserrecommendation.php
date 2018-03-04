<?php

	session_start();
	include_once("schema_connect.php");
	include("recommendation.php");
    $username = $_POST["username"];
    
    $movies= $db->query("select * from user_rating");

    $matrix=array();
    
    while($movie=mysqli_fetch_array($movies))
    {
    	$matrix[$movie['username']][$movie['moviename']]=$movie['movierating'];
    }
    /*echo "<pre>";
    print_r($matrix); 
    echo "</pre>";*/
    $recommedation=array();
    $recommedation=getRecommendation($matrix, $username);
    
    foreach($recommedation as $movie=>$rating)
    	{
    	    echo '<ul>';
            echo '<p class="movierec" id="'.$movie.'">'.'Movie Name:'. $movie . ' -------     ' .'Movie Rating:'. $rating .'</p>';
            echo '</ul>';
    	}
    
    /*if(empty($recommedation)){
        echo 'No Recommendation available';
    }else{
        foreach($recommedation as $movie=>$rating)
    	{
    	    echo '<ul>';
            echo '<p class="movierec" id="'.$movie.'">'.'Movie Name:'. $movie . ' -------     ' .'Movie Rating:'. $rating .'</p>';
            echo '</ul>';
    	}
    }
    */
    	
?>