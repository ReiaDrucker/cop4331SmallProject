<?php

	include 'functions.php';
	$sql = new sql();

	$inData = $sql->getRequestInfo();

	$sql->connect();
	
	$vals = "'" . $inData["firstName"] . "','" . $inData["lastName"] . "','" . $inData["login"] . "','" . $inData["password"] . "'";

	$sql->insertData("Users", "FirstName,LastName,Login,Password", $vals);
    $sql->close();


?>