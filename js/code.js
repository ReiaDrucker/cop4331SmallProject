var urlBase = 'http://COP4331.xyz/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
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
	
		window.location.href = "Contacts.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doSignup()
{
	// TODO - will add new user to the database and sign them into their new account (so that they don't login after signing up)
	document.getElementById("signupResult").innerHTML = "Register - button click!"; // DEBUG
}

function changeStyle()
{
	// TODO - will change from light to dark mode
	document.getElementById("signupResult").innerHTML = "Light / Dark Mode - button click!"; // DEBUG
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
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
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
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					ContactsList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						ContactsList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = ContactsList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("ContactsSearchResult").innerHTML = err.message;
	}
	
}
