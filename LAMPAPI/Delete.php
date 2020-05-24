<?php


	include 'functions.php';
	$sql = new sql();

	$inData = $sql->getRequestInfo();

	$sql->connect();
	
	
	$sql->delete($inData["ID"]);
	$sql->close();




?>