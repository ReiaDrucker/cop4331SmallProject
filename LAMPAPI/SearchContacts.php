<?php

	include 'functions.php';
	$sql = new sql();
	
	$inData = $sql->getRequestInfo();
	
	$sql->connect();
	
	$cols = "*";
	
    // $sql->sendResultInfoAsJson(json_encode($inData));
	
	$result = $sql->search($inData, "Contacts", $cols_request=$cols, $search_col="FirstName");
	
	$sql->sendSearchResult($result);
	
	$sql->close();
	

?>