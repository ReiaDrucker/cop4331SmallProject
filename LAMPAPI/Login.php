<?php

	include 'functions.php';
	$sql = new sql();

	$inData = $sql->getRequestInfo();

	$sql->connect();

	$sql->login($inData["login"], $inData["password"]);
    $sql->close();


?>