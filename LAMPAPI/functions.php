<?php

	/**
	* A class to interact with the database via php
	*/
	class sql
	{
		// The internal conection to the database
		public $conn = null;

		/**
		* When an instance of this class is closed
		* end the connection with the database
		*/
		function __destruct()
		{
			if($this->conn != null)
			{
				$this->close();
			}
		}

		/**
		* Pull the json data from the api request
		* Returns a json object similer to python dictionaries 
		*/
		function getRequestInfo()
		{
			return json_decode(file_get_contents('php://input'), true);
		}

		/**
		* Connect to the specified sql server and database
		* Return a connection object
		*/
		function connect($server="localhost", $user="smallgro_Reia", $pass="8D^A9f7TxA4]", $db="smallgro_COP4331")
		{
			// Connect to the server
			$this->conn = new mysqli($server, $user, $pass, $db);
			
			// Check if a connection could be made and return an error if not
			if ($this->conn->connect_error) 
			{
				$this->returnWithError( $conn->connect_error );
				// return ;
			}
			return $this->conn;
		}

		/**
		* Return an error message if something goes wrong
		*/
		function returnWithError($err)
		{
			$retValue = '{"error":"' . $err . '"}';
			$this->sendResultInfoAsJson( $retValue );
		}

		/**
		* Adds result info to the console as json data
		* Used for errors
		*/
		function sendResultInfoAsJson( $obj )
		{
			header('Content-type: application/json');
			echo $obj;
		}

		/**
		* Add some data to a tabel
		* Argument examples:
		* 	$table_name: "users"
		* 	$cols: "UserName,Password"
		* 	$vals: "'ex_user','ex_pass'"
		* 	$conn: $conn
		*/
		function insertData($table_name, $cols, $vals)
		{
			// Generate an sql query to insert some data into its table
			$sql = "INSERT INTO $table_name ($cols) VALUES ($vals)";
			
			// Insert the data and return an error if it doesn't work
			if( $result = $this->conn->query($sql) != TRUE )
			{
				$this->returnWithError( $this->conn->error );
			}
		}

		/**
		*
		*/
		function login($user, $pass, $table_name="Users", $cols_request="ID, FirstName, LastName")
		{
		    if($this->conn->connect_error)
		    {
		        return 1;
		    }
			// Generate an sql query to login
			$sql = "SELECT $cols_request FROM $table_name where Login='$user' and Password='$pass'";
			
			// Login and fetch the users data
			$result = $this->conn->query($sql);
			
			if($result->num_rows > 0)
			{
				$row = $result->fetch_assoc();
				$retValue = '{"id":' . $row["ID"] . ',"firstName":"' . $row["FirstName"] . '","lastName":"' . $row["LastName"] . '","error":""}';
				$this->sendResultInfoAsJson($retValue);
			}
			else
			{
				$this->returnWithError( "No Records Found" );
			}
		}

		function search($req, $table_name="Contacts", $cols_request="ID, firstName, lastName", $search_col="FirstName")
		{
			// Generate an sql query to search a table
			$sql = "SELECT $cols_request FROM $table_name WHERE";
			if($req["exact"] != "true")
			{
			    $sql .=  " $search_col like '%" . $req["search"] . "%'";
			}
			if($uid = $req["userID"] == true and $req["exact"] != "true")
			{
			    $sql .= "and UserID=" . $req["userID"];
		    }
		    if($req["exact"] == "true")
		    {
		        $sql .= " $search_col=" . "'" . $req["search"] . "'";
		    }
			if($req["ID"] != "" and $req["exact"] != "true")
		    {
		        	$sql = "SELECT $cols_request FROM $table_name WHERE ID=" . $req["ID"];
		    }
			// Run the search
			$result = $this->conn->query($sql);
// 			$this->sendResultInfoAsJson($sql);

			return $result;
		}
		
		function sendSearchResult($result)
		{
			if($result->num_rows <= 0)
			{
				$this->returnWithError( "No Records Found" );
			}
		    
			// Return the search results
			else
			{
			    $i = 0;
			    $searchResults = "{";
				while($row = $result->fetch_assoc())
				{
					if( $i > 0 )
					{
						$searchResults .= ",";
					}
					$searchResults .= '"' . $i . '" : ' . json_encode($row);
					$i++;
				// 	$this->sendResultInfoAsJson(json_encode($row));
				}
				$searchResults .= "}";
			}
			$retValue = '{"results":[' . $searchResults . '],"error":""}';
			$this->sendResultInfoAsJson( $retValue );
		}
		

		/**
		*
		*/
		function delete($row_id, $table_name="Contacts")
		{
			// Generate an sql query to delete a row from a table
			$sql = "DELETE FROM $table_name WHERE ID=$row_id";
			// Delete the row
			$result = $this->conn->query($sql);

			if($result != true)
			{
				$this->returnWithError( "No Records Could Be Deleted" );
			}
		}
		
		function update($data, $table="Contacts")
		{
		    $sql = "UPDATE $table SET `FirstName` = '" . $data["firstName"] . "', `LastName` = '" . $data["lastName"] . "', `Email` = '" . $data["email"] . "', `Phone` = '" . $data["phone"] . "', `Address` = '" . $data["address"] . "', `City` = '" . $data["city"] . "', `State` = '" . $data["state"] . "', `ZIP_Code` = '" . $data["zip code"] . "', `Pronouns` = '" . $data["pronouns"] . "' WHERE `Contacts`.`ID` = " . $data["ID"];
		    
		    $result = $this->conn->query($sql);

			if($result != true)
			{
				$this->returnWithError( "No Records Could Be Updated" );
			}
		}

		/**
		* Close the connection to the database
		* Set $this->conn to null
		*/
		function close()
		{
			$this->conn->close();
			$this->conn = null;
		}
	}
?>
