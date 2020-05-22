<?php


	include 'functions.php';
	$sql = new sql();

	$inData = $sql->getRequestInfo();

	$sql->connect();
	
	
	$sql->update($inData);
	$sql->close();




?>