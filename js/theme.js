var mode = false;

function readStyle()
{
    mode = (getCookie("mode") == "true");
}

function getCookie(cname)
{
  var name = cname + "=";
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
    document.cookie = "mode=" + (mode == false) + ";expires=" + date.toGMTString();
}
