<?php

	session_start();
	include_once("schema_connect.php");
	$subject = $_POST["subject"];


if($subject == "all"){
       	// get messages for specified recipient
    $result = $db->query("SELECT * FROM message ORDER BY date_sent DESC");
    
    if($result->num_rows > 0){
        echo '<ul>';
    foreach ($result as $row) {
      //echo '<li>' . $row['name'] . ' is ruled by ' . $row['head_of_state'] . '</li>';
      $mes_id= $row['id'];
      $result2 = $db->query("SELECT * FROM message_read WHERE message_id= '$mes_id'");//should be message id
      foreach ($result2 as $row2) {
          $date_read= $row2['date'];
      }
      if($result2->num_rows > 0){
      	echo '<p class="messages" id="'.$row['id'].'">'. $row['username'] . ' -------     ' . $row['movieid'] . '----'.$row['date_sent']. "----" .'Date read: '.$date_read .'</p>';
      }else{
      	echo '<p class="messages" id="'.$row['id'].'">'.'<b>' . $row['username'] . ' ------- '     . $row['movieid'] .'----'. $row['date_sent'] . '</b>'.'</p>';
      }
    }
    echo '</ul>';
    }else{
        echo ("No Message");
    } 
}else{
    $result = $db->query("SELECT * FROM message WHERE id='$subject' ORDER BY date_sent DESC");
    
    foreach ($result as $row) {
       if($row['id'] == $subject){
            echo '<h6>'."Date Sent: ". $row['date_sent'] . '</h6>';
            echo '<h4>'."User Name: ". $row['username'] . '</h4>';
            echo '<h4>'."Movie ID: ". $row['movieid'] . '</h4>';
            echo '<h6>'."Reason: " . '</h6>';
            echo '<p>'. $row['subject'] . '</p>';
            echo '<button class= "view '.$row['username'].'" id="'.$row['movieid'].'">VIEW</button><button class= "delete" id="'.$row['id'].'">Delete</button></br>';
            echo '<button id="return">Return to inbox</button>';
            
        }  
    }
    
}

?>
