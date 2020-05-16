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
				close();
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
			// Check if a connectoin could be made and return an eerror if not
			if ($this->conn->connect_error) 
			{
				returnWithError( $conn->connect_error );
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
			sendResultInfoAsJson( $retValue );
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
				returnWithError( $this->conn->error );
			}
		}

		/**
		*
		*/
		function login($user, $pass, $table_name="Users", $cols_request="ID, firstName, lastName")
		{
			// Generate an sql query to login
			$sql = "SELECT $cols_request FROM $table_name where Login='$user' and Password='$pass'";
			// Login and fetch the users data
			$result = $this->conn->query($sql);
			if($result->num_rows > 0)
			{
				$row = $result->fetch_assoc()
				$retValue = '{"id":' . $row["ID"] . ',"firstName":"' . $row["firstName"] . '","lastName":"' . $row["lastName"] . '","error":""}';
				sendResultInfoAsJson($retValue);
			}
			else
			{
				returnWithError( "No Records Found" );
			}
		}

		/**
		*
		*/
		function search($req, $table_name="Contacts", $cols_request="ID, firstName, lastName", $search_col="firstName")
		{
			// Generate an sql query to search a table
			$sql = "SELECT $cols_request FROM $table_name WHERE $search_col like %$req["search"]% and UserID=$req["userId"]";
			// Run the search
			$result = $this->conn->query($sql);

			$searchResults = "";
			$searchCount = 0;
			// Give an error if nothing was found
			if($result->num_rows <= 0)
			{
				returnWithError( "No Records Found" );
			}
			// Return the search results
			else
			{
				while($row = $result->fetch_assoc())
				{
					if( $searchCount > 0 )
					{
						$searchResults .= ",";
					}
					$searchCount++;
					$searchResults .= '"' . $row["Name"] . '"';
				}
			}
			$retValue = '{"results":[' . $searchResults . '],"error":""}';
			sendResultInfoAsJson( $retValue );
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
				returnWithError( "No Records Could Be Deleted" );
			}
		}

		/**
		* Close the connection to the database
		* Set $this->conn to null
		*/
		function close()
		{
			$this->conn->close();
			$this->conn = null
		}
	}
?>