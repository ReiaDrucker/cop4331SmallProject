var urlBase = 'https://COP4331.xyz/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

// Mode variables
var darkModeToggle = true;
var darkMode = '/css/darkMode.css';
var lightMode = '/css/lightMode.css';

// Editing / Deletion variables
var idToEdit = "";
var idToDelete = "";

function doLogin()
{
	// Reset variables to clear past login attempts
	userId = 0;
	firstName = "";
	lastName = "";

	// Grab the data we need from the HTML fields
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	//Build our json payload
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';

	//used for plaintext password
	//var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';


	var url = urlBase + '/Login.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

        userID = jsonObject.userID;
		error = jsonObject.error;

        // If error is not empty
		if( error !== "" )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();

        window.location.href = "contacts.html";
		
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
	document.getElementById('userName').innerHTML = "Welcome, " + firstName + " " + lastName + "!";
}

// TODO - will add new user to the database and sign them into their new account (so that they don't login after signing up)
function doSignup()
{
	userId = 0;
	firstName = "";
	lastName = "";

	firstName = document.getElementById("signupFirstName").value;
	lastName = document.getElementById("signupLastName").value;

	var login = document.getElementById("signupUserName").value;
	var password = document.getElementById("signupPassword").value;
	var confirmPassword = document.getElementById("signupPasswordConfirm").value;
	var hash = md5( password );

	document.getElementById("signupResult").innerHTML = ""; // DEBUG

	// check if confirmPassword matches password
	if (password !== confirmPassword)
		{
			document.getElementById("signupResult").innerHTML = "Passwords do not match";
			return;
		}
	
	// check for invalid password
	if (password === "" || password === null)
		{
			document.getElementById("signupResult").innerHTML = "Invalid password";
			return;
		}
	
	// check for invalid username
	if (login === "" || login === null)
		{
			document.getElementById("signupResult").innerHTML = "Invalid username";
			return;
		}
	
	var jsonPayload = '{ "firstName" : "' + firstName
					+ '", "lastName" : "' + lastName
					+ '", "login" : "'    + login
					+ '", "password" : "' + hash + '" }';

	var url = urlBase + '/Signup.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

		// If error is not empty
		if( error !== "" )
		{
			document.getElementById("signupResult").innerHTML = "Sign Up Failed";
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();

		window.location.href = "contacts.html";
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}
	
	document.getElementById('userName').innerHTML = "Welcome, " + firstName + " " + lastName + "!";
}

function changeStyle(number)
{
	var pathDepth;
	// This is the depth the file is in relation to the root.
	// Example:
	// root
	// |->index.html
	// |->html |
	//         |->about.html
	// this file is one layer deep in the root
	if (number == 0)
		pathDepth = ".";
	else if (number == 1)
		pathDepth = "..";
	else if (number == 2)
		pathDepth = "../..";
	// TODO: remember mode state when moving pages
	console.log('Press recorded!');
	var mode;
	var path;

	if (darkModeToggle)
	{
		mode = 'Dark Mode';
		path = lightMode;
	}
	else
	{
		mode = 'Light Mode';
		path = darkMode;
	}
	document.getElementById('mode').setAttribute('href', pathDepth + path);
	document.getElementById('modeDisplay').innerHTML = mode;

	darkModeToggle = !darkModeToggle;
}

function goToAddContacts()
{
	replace('logoutButton', 'cancelAddContactButton');
	replace('goToAddContactsButton', 'addContactsButton');
	replace('searchContactsDiv', 'addContactsDiv');
	
	document.getElementById('userName').innerHTML = "Please add your contact's information below";
}

function goToSearchContacts()
{
	replace('cancelAddContactButton', 'logoutButton');
	replace('addContactsButton', 'goToAddContactsButton');
	replace('confirmEditButton', 'goToAddContactsButton');
	replace('addContactsDiv', 'searchContactsDiv');
	
	// if edit was cancelled
	idToEdit = "";
	
	document.getElementById('userName').innerHTML = "Welcome, " + firstName + " " + lastName + "!";
}


function replace(hide, show)
{
	// hides / shows a set of divs
	document.getElementById(hide).style.display="none";
	document.getElementById(show).style.display="block";
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Welcome, " + firstName + " " + lastName + "!";
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContacts()
{
	var newContactsFirstName = document.getElementById("ContactsFirstNameText").value;
	var newContactsLastName = document.getElementById("ContactsLastNameText").value;
	var newContactsEmail = document.getElementById("ContactsEmailText").value;
	var newContactsPhone = document.getElementById("ContactsPhoneText").value;
	var newContactsAddress = document.getElementById("ContactsAddressText").value;
	var newContactsCity = document.getElementById("ContactsCityText").value;
	var newContactsState = document.getElementById("ContactsStateText").value;
	var newContactsZIPCode = document.getElementById("ContactsZIPCodeText").value;
	var newContactsPronouns = document.getElementById("ContactsPronounsText").value;




	document.getElementById("ContactsAddResult").innerHTML = "";

	var jsonPayload = '{"FirstName" : "' + newContactsFirstName +
						'", "LastName" : ' + newContactsLastName +
						'", "Email" : ' + newContactsEmail +
						'", "Phone" : ' + newContactsPhone +
						'", "Address" : ' + newContactsAddress +
						'", "City" : ' + newContactsCity +
						'", "State" : ' + newContactsState +
						'", "ZIP Code" : ' + newContactsZIPCode +
						'", "Pronouns" : ' + newContactsPronouns + '}';



	var url = urlBase + '/AddContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("ContactsAddResult").innerHTML = "Contacts has been added";
				// go back to search after successfully adding
				goToSearchContacts();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("ContactsAddResult").innerHTML = err.message;
	}
}

function searchContacts()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("ContactsSearchResult").innerHTML = "";
	
	// TODO - not 100% sure if this is necessary, I have it implemented to remove the old contact elements before the new ones are added
	while (document.getElementById("ContactsList").hasChildNodes()) 
	{
    	document.getElementById("ContactsList").removeChild(document.getElementById("ContactsList").lastChild);
	}
	

	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("ContactsSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );

				// go through array of contacts
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					// make new button for the collapsable component, and give it an ID that corresponds to the ID # of the contact in the database ("#-coll")
					var collButton = document.createElement("button");
					collButton.className = "collapsible";
					collButton.innerHTML = jsonObject.results[i].firstName + " " + jsonObject.results[i].lastName;
					collButton.id = jsonObject.results[i].id + "-coll";
					
					// make new div for the content, and give it an ID the corresponds to the contact's ID in the database ("#")
					var contentDiv = document.createElement("div");
					contentDiv.className = "content";
					contentDiv.id = "" + jsonObject.results[i].id;
					
					// create the <p> for the content div
					var pronounP = document.createElement("p");
					var emailPhoneP = document.createElement("p");
					var addressP = document.createElement("p");
					var cityStateZipP = document.createElement("p");
					
					// fill <p>s with content from json
					pronounP.innerHTML = "Pronouns: " + jsonObject.results[i].pronouns;
					emailPhoneP.innerHTML = "Email: " + jsonObject.results[i].email + "   Phone: " + jsonObject.results[i].phone;
					addressP.innerHTML = "Address: " + jsonObject.results[i].address;
					cityStateZipP.innerHTML = jsonObject.results[i].city + ", " + jsonObject.results[i].state + " " + jsonObject.results[i].ZIP;
					
					// add the <p>s to the content div
					contentDiv.appendChild(pronounP);
					contentDiv.appendChild(emailPhoneP);
					contentDiv.appendChild(addressP);
					contentDiv.appendChild(cityStateZipP);
					
					// create edit and delete buttons
					var editButton = document.createElement("button");
					editButton.type = "button";
					editButton.class = "gotoEditButton";
					editButton.onclick = "gotoEditContact(this);";
					editButton.innerHTML = "Edit";
					var deleteButton = document.createElement("button");
					deleteButton.type = "button";
					deleteButton.class = "gotoDeleteButton";
					deleteButton.onclick = "gotoDeleteContact(this);";
					deleteButton.innerHTML = "Delete";
					
					
					// add buttons to the content div
					contentDiv.appendChild(editButton);
					contentDiv.appendChild(deleteButton);
					
					
					// add collbutton and contentDiv to the contactsList
					document.getElementById("ContactsList").appendChild(collButton);
					document.getElementById("ContactsList").appendChild(contentDiv);
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("ContactsSearchResult").innerHTML = err.message;
	}

}

// will bring up the screen so that the contact can be edited, contact is a reference to the specific edit button that was clicked
function gotoEditContact(contact)
{
	// switch view
	replace('logoutButton', 'cancelAddContactButton');
	replace('goToAddContactsButton', 'confirmEditButton');
	replace('searchContactsDiv', 'addContactsDiv');
	document.getElementById('userName').innerHTML = "Please edit your contact's information below";
	
	// get id so that this specific contact can be accessed later
	idToEdit = contact.parentNode.id;
	
	// search by id
	var jsonPayload = '{"search" : "' + idToEdit + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
				{
					var jsonObject = JSON.parse( xhr.responseText );
					
					// put current contact info into the form for ease of access
					document.getElementById("ContactsFirstNameText").value = jsonObject.result[0].firstName;
					document.getElementById("ContactsLastNameText").value = jsonObject.result[0].lastName;
					document.getElementById("ContactsEmailText").value = jsonObject.result[0].email;
					document.getElementById("ContactsPhoneText").value = jsonObject.result[0].phone;
					document.getElementById("ContactsAddressText").value = jsonObject.result[0].address;
					document.getElementById("ContactsCityText").value = jsonObject.result[0].city;
					document.getElementById("ContactsStateText").value = jsonObject.result[0].state;
					document.getElementById("ContactsZIPCodeText").value = jsonObject.result[0].ZIP;
					document.getElementById("ContactsPronounsText").value = jsonObject.result[0].pronouns;	
				}
		};
		xhr.send(jsonPayload);	
	}
	catch(err)
	{
		document.getElementById("userName").innerHTML = err.message;
	}
	// this method is done, now we just wait for user click of the confirmEditButton then we run commitEditContact()
}

// TODO - will actually commit the edit
function commitEditContact()
{
	// commit the changes to the contact referenced by idToEdit
	var newContactsFirstName = document.getElementById("ContactsFirstNameText").value;
	var newContactsLastName = document.getElementById("ContactsLastNameText").value;
	var newContactsEmail = document.getElementById("ContactsEmailText").value;
	var newContactsPhone = document.getElementById("ContactsPhoneText").value;
	var newContactsAddress = document.getElementById("ContactsAddressText").value;
	var newContactsCity = document.getElementById("ContactsCityText").value;
	var newContactsState = document.getElementById("ContactsStateText").value;
	var newContactsZIPCode = document.getElementById("ContactsZIPCodeText").value;
	var newContactsPronouns = document.getElementById("ContactsPronounsText").value;

	document.getElementById("ContactsAddResult").innerHTML = "";

	var jsonPayload = '{"FirstName" : "' + newContactsFirstName +
						'", "LastName" : ' + newContactsLastName +
						'", "Email" : ' + newContactsEmail +
						'", "Phone" : ' + newContactsPhone +
						'", "Address" : ' + newContactsAddress +
						'", "City" : ' + newContactsCity +
						'", "State" : ' + newContactsState +
						'", "ZIP Code" : ' + newContactsZIPCode +
						'", "Pronouns" : ' + newContactsPronouns +
						'", "ID" : ' + idToEdit + '}';



	var url = urlBase + '/updateContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("ContactsAddResult").innerHTML = "Contacts has been updated";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("ContactsAddResult").innerHTML = err.message;
	}
	
	// go back to search contacts
	// TODO - should we clear contacts list before returning?
	goToSearchContacts();
}


// TODO - will bring up pop-up to confirm deletion
function gotoDeleteContact(contact)
{
	
}
// TODO - will actually commit the delete
function commitDeleteContact()
{
	
}
