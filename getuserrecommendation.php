<?php

	session_start();
	include_once("schema_connect.php");
	include("recommendation.php");
    $username = $_POST["username"];
    
    $movies= $db->query("select * from user_rating");
    $result = $db->query("SELECT * FROM user_rating WHERE username='$username'");
    
    if($result->num_rows == 0){
        echo "No movie recommendation";     
        exit;
    }

    $matrix=array();
    
    while($movie=mysqli_fetch_array($movies))
    {
    	$matrix[$movie['username']][$movie['movieid']]=$movie['movierating'];
    }
    /*echo "<pre>";
    print_r($matrix); 
    echo "</pre>";*/
    $recommedation=array();
    $recommedation=getRecommendation($matrix, $username);
    
    foreach($recommedation as $movie=>$rating)
    	{
    	    if ($rating > 2.5){
    	        $movienames= $db->query("SELECT DISTINCT moviename FROM user_rating WHERE movieid='$movie'");
    	        $moviename=array();
    	        $moviename=mysqli_fetch_array($movienames);
    	        echo '<ul>';
                echo '<p class="movierec" id="'.$movie.'">'.'Movie Name:'. $moviename[0] . ' -------     ' .'Movie Rating: '. round($rating, 1).'</p>';
                echo '</ul>';   
    	    }
    	}
    	
?>