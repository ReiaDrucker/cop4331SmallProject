<?php
	$inData = getRequestInfo();
	
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Email = $inData["Email"];
	$Phone = $inData["Phone"];
	$Address = $inData["Address"];
	$City = $inData["City"];
	$State = $inData["State"];
	$ZIPCode = $inData["ZIP Code"];
	$Pronouns = $inData["Pronouns"];
	

	$conn = new mysqli("localhost", "smallgro_Reia", "8D^A9f7TxA4]", "smallgro_COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "insert into Contacts (FirstName,LastName,Email,Phone,Address,City,State,ZIP Code,Pronouns) VALUES (" . $FirstName . ",'" . 
																														$LastName . ",'" . 
																														$Email . ",'" . 
																														$Phone . ",'" . 
																														$Address . ",'" . 
																														$City . ",'" . 
																														$State . ",'" . 
																														$ZIPCode . ",'" . 
																														$Pronouns . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>