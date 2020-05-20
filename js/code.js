var urlBase = 'https://COP4331.xyz/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

// Mode variables
var darkModeToggle = true;
var darkMode = './css/darkMode.css';
var lightMode = './css/lightMode.css';

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

		userId = jsonObject.id;

		if( userId < 1 )
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
		//document.getElementById("loginResult").innerHTML = err.message;
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

		if( userId < 1 )
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

function changeStyle()
{
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
	document.getElementById('mode').setAttribute('href', path);
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
	replace('addContactsDiv', 'searchContactsDiv');
	
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
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId +  ",darkModeToggle=" + darkModeToggle +";expires=" + date.toGMTString();
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
		else if( tokens[0] == "darkModeToggle" )
		{
			darkModeToggle = tokens[1];
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

	var ContactsList = "";

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
					ContactsList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						ContactsList += "<br />\r\n";
					}
				}

				document.getElementsByID("contactsList")[0].innerHTML = ContactsList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("ContactsSearchResult").innerHTML = err.message;
	}

}