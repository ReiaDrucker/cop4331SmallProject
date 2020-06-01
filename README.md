# Contact Manager ![](https://raw.githubusercontent.com/ReiaDrucker/cop4331SmallProject/master/images/favicon.ico)
### Description
> Contact Manager is a web application that allows users to store, retreive, edit,
> and delete contact information given by the user.

Link to web application: https://cop4331.xyz

# Authors
 - Jaime Bohorquez
 - Reia Drucker
 - Mary McIntosh
 - Michael Rogantinsky
 - Jaron Wilson

# Features

| Feature | Description |
| ------ | ------ |
| Add | A first name for the new contact must be given, the other fields are optional.|
| | Fields include pronoun, address, phone number, and email. |
| Edit | Edit has all of the functionality of the add feature. Edits allow the removal|
| | of non-required data such as email, phone number, etc. |
| Search | The search function searches contacts by first name. If there are multiple contacts |
| |  with the first name, or with the same prefix, a list of contacts is returned.
| Theme | There are two themes available, dark and light theme. First time users are  |
| | defaulted to the light theme and theme preference is stored on a cookie. |
| Remove | This function deletes the whole contact from the database. |


# Languages and Technologies
>Stack used: LAMP
#### Front end
 - HTML
 - JavaScript
 - CSS
#### Back end
 - PHP
 - cPanel
 - Linux
 - Apache 2.0
 - MySQL Server
#### Other
 - Git
 - GitHub

# Local Testing
To test locally make sure you have installed PHP.
> Note: Testing locally with this method gives limited functionality.
This should be used mainly to test the user interface (UI).

After checking to make sure it is installed, download or clone this repository.

Once cloned, open your favorite Terminal and run the following commands.

```sh
$ cd <pathToRepository>
$ php -S localhost:8000
```
This should initialize a local PHP web server on your machine.
Next, open your browser and type localhost:8000 to load the main page.

## Testing on other devices
To test on other devices on your network, find your local IP address.

Open the browser in the external device and type the IP address that was found earlier, right next to the IP, type a colon followed by the number 8000 (the port number).

If the local IP of the machine running the server was 192.168.0.10, the request would look like this:
```arm
192.168.0.10:8000
```
If this does not work make sure you still have the local server running and try again.

## Powered by LAMP
![](https://raw.githubusercontent.com/ReiaDrucker/cop4331SmallProject/master/images/lamp.png)
