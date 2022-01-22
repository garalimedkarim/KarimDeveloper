http://dvwa.co.uk/

www.owasp.org

#CSRF:
CSRF - or Cross-site request forgery - is a method by which a malicious user attempts to make your legitimate users unknowingly submit data that they dont intend to submit by opening a mail containing an image src="site.com/transaction?amount=5000&to=QS121Sa" or submit in background.

Forge a request from a different Web site

* somebody sends you a link and you click on it
* The link ends up sending an HTTP request to the site under attack containing all the cookies linked to the site
* And if you were logged into the site this means the Cookie containing our JWT bearer token will be forwarded too, this is done automatically by the browser
* The server receives a valid JWT, so there is no way for the server to distinguish this attack from a valid request


<!DOCTYPE html>
<html>
<body>

<h2>HTML Forms</h2>

<form action="http://localhost/php/csrf.php" method="GET">
  First name:<br>
  <input type="text" name="firstname" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form> 

<p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>

</body>
</html>

#CORS:
CORS = cross origin resource sharing
	When the domain in client and the api domain is different => cross origin request
	By Default Browser require header("Access-Control-Allow-Origin: *") to exec Cross origin request:
		Error Msg in console: 
			Access to XMLHttpRequest at 'http://localhost/index2.php' from origin 'https://www.w3schools.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
	Solution: 
		The server has to set the header:
			header("Access-Control-Allow-Origin: *");
		More specefic:
			header("Access-Control-Allow-Origin: https://www.w3schools.com");
	Modern browsers use CORS in APIs such as XMLHttpRequest or Fetch to mitigate the risks of cross-origin HTTP requests.
	
	The browser sends an OPTIONS request to check permission on methods and headers allowed :
		header("Access-Control-Allow-Methods: OPTIONS,GET,POST");
		header("Access-Control-Allow-Headers: X-PINGOTHER, Content-Type");

# Multiple origins:
	// $http_origin = $_SERVER['HTTP_ORIGIN'];

	// if ($http_origin == "http://www.domain1.com" || $http_origin == "http://www.domain2.com" || $http_origin == "http://www.domain3.com")
	// {  
	//     header("Access-Control-Allow-Origin: $http_origin");
	// }

#CSRF Vs CORS:
	By default, Server doesn't care about CORS or CSRF token
	CORS is handled by Browser convention, but in postman doesnt speack about POST.
	CSRF must be handled by Server.
