<?php

	include 'functions.php';
	$sql = new sql();

	$inData = $sql->getRequestInfo();

	$sql->connect();
	
	$search = array("search" => $inData["login"], "exact" => "true");

	$result = $sql->search($search, "Users", $cols_request="*", $search_col="Login");
	
// 	$sql->sendSearchResult($result);
	if($result->num_rows <= 0)
	{
	    $vals = "'" . $inData["firstName"] . "','" . $inData["lastName"] . "','" . $inData["login"] . "','" . $inData["password"] . "'";

    	$sql->insertData("Users", "FirstName,LastName,Login,Password", $vals);
    	
    	$result = $sql->search($search, "Users", $cols_request="*", $search_col="Login");
    	
    	$retValue = '{"userID":"' . $result->fetch_assoc()["ID"] . '","firstName":"' . $inData["firstName"] . '","lastName":"' . $inData["lastName"] . '","error":""}';
    	
    	$sql->sendResultInfoAsJson($retValue);
        $sql->close();
	}
	else
	{
	    $sql->returnWithError("Invaid UserName, Try again.");
	}

?>
