// Jaime Bohorquez
// Programmed using Atom + iTerm2 on Mac OS

// Manages cookie read and write for mode toggle.

var mode = false;

function readStyle()
{
    console.log('past' + mode);
    mode = (getCookie("mode") == "true");
    console.log('now' + mode);
    console.log('Done');
}

function getCookie(cookiename)
{
  var name = cookiename + "=";
  var decode = decodeURIComponent(document.cookie);
  var token = decode.split(';');
  for(var i = 0; i <token.length; i++)
  {
    var c = token[i];
    while (c.charAt(0) == ' ')
    {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0)
    {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function saveStyle()
{
    var minutes = 60;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie = "mode=" + (mode == false) + ";path=/" + ";expires=" + date.toGMTString();
}
