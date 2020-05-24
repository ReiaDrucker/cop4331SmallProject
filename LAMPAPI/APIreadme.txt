SearchContacts.php:
	input:
		{
		"ID" : "contact id number"
		}
		or
		{
		"search" : "search term",
		"userID" : "userID"
		}
	output:
		{
		"error":"No Records Found"
		}
		or
		{
		"results":[
			{
			"0" : 
				{
				"ID":"1",
				"firstName":"Michael",
				"lastName":"Rogatinsky",
				"email":"michaelrogatinsky@gmail.com",
				"phone":"(954)881-0970",
				"date created":"2020-05-21 11:14:53",
				"address":"3640 north 54th ave",
				"city":"hollywood",
				"state":"Florida",
				"zip code":"33021",
				"pronouns":"he,him,his",
				"userID":"3"
				},
			"1" : 
				{
				"ID":"3",
				"firstName":"random",
				"lastName":"garbled",
				"email":"nonsense",
				"phone":"some",
				"date created":"2020-05-22 10:52:01",
				"address":"something",
				"city":"thing",
				"state":"Florida",
				"zip code":"33021",
				"pronouns":"he,her,they",
				"userID":""
				},
			"2" : 
				{
				"ID":"12",
				"firstName":"Reia",
				"lastName":"Drucker",
				"email":"newContactsEmail",
				"phone":"newContactsPhone",
				"date created":"2020-05-24 12:49:48",
				"address":"newContactsAddress",
				"city":"newContactsCity",
				"state":"newContactsState",
				"zip code":"newContactsZIPCode",
				"pronouns":"newContactsPronouns",
				"userID":"27"
				},
			"3" : 
				{
				"ID":"21",
				"firstName":"q",
				"lastName":"w",
				"email":"e",
				"phone":"r",
				"date created":"2020-05-24 13:53:31",
				"address":"t",
				"city":"y",
				"state":"u",
				"zip code":"i",
				"pronouns":"o",
				"userID":"27"
				}
			}
		],
		"error":""
		}

updateContact.php:
	input:
		{
		"firstName" : "random",
		"lastName" : "garbled",
		"email" : "nonsense",
		"phone" : "some",
		"address" : "something",
		"city" : "thing",
		"state" : "Florida",
		"zip code" : "33021",
		"pronouns" : "he,her,they",
		"ID" : "contact id"
		}
	output:
		{
		"error":"No Records Could Be Updated"
		}
		or
		returns nothing if update succeded

Delete.php:
	input:
		{
		"ID" : "contact id"
		}
	output:
		{
		"error":"No Records Could Be Deleted"
		}
		or
		returns nothing if delete succeded

AddContacts.php:
	input:
		{
		"firstName" : "random",
		"lastName" : "garbled",
		"email" : "nonsense",
		"phone" : "some",
		"address" : "something",
		"city" : "thing",
		"state" : "Florida",
		"zip code" : "33021",
		"pronouns" : "he,her,they",
		"userID" : "user id"
		}
	output:
		{
		"error":"No Records Could Be Added"
		}
		or
		returns nothing if update succeded

Signup.php:
	input:
		{
		"firstName" : "name",
		"lastName" : "name",
		"login" : "user login",
		"password" : "hashed password"
		}
	output:
		{
		"userID":"99",
		"firstName":"Michael",
		"lastName":"Rogatinsk",
		"error":""
		}
		or
		{
		"error":"Invaid UserName, Try again."
		}
Login.php:
	input:
		{
		"login" : "username",
		"password" : "hashed password"
		}
	output:
		{
		"userID":3,
		"firstName":"Michael",
		"lastName":"Rogatinsky",
		"error":""
		}
		or
		{
		"error":"No Records Found"
		}
