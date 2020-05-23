<?php

	include 'functions.php';
	$sql = new sql();
	
	$inData = $sql->getRequestInfo();
	
	$sql->connect();
	
	$cols = "FirstName,LastName,Email,Phone,Address,City,State,ZIP_Code,Pronouns,UserID";
	
	$vals = "'" . $inData["firstName"] . "','" . $inData["lastName"] . "','" . $inData["email"] . "','" . $inData["phone"]  . "','" . $inData["address"] . "','" . $inData["city"] . "','" . $inData["state"] . "','" . $inData["zip code"] . "','" . $inData["pronouns"] . "','" . $inData["userID"] . "'";
	
	$sql->insertData("Contacts", $cols, $vals);
	
	$sql->close();
	

?>