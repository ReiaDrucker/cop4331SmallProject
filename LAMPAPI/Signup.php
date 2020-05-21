<?php

	include 'functions.php';
	$sql = new sql();

	$inData = $sql->getRequestInfo();

	$sql->connect();
	
	$vals = "'" . $inData["firstName"] . "','" . $inData["lastName"] . "','" . $inData["login"] . "','" . $inData["password"] . "'";

	$sql->insertData("Users", "FirstName,LastName,Login,Password", $vals);
	
	$retValue = '{"firstName":"' . $inData["firstName"] . '","lastName":"' . $inData["lastName"] . '","error":""}';
	
	$sql->sendResultInfoAsJson($retValue);
    $sql->close();


?>
