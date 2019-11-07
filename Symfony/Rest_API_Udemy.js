

I-Introduction

II-What is a REST API and what makes a good one
1.REST API and RPC - what is the difference:
	Web API is not only REST (SOAP,XML-RPC,JSON-RPC,RESTful)
	RPC = Stands for Remote Procedure Call 
		RPC is about actions (addMovie,changeMovie,getMovie,deleteMovie,etc ... ) => (the URI contains a verb).

	REST = stands for Representational State Transfer
		Server Side data is represented as ressources or collection of ressources
		Actions on ressources are modeled by HTTP methods ( GET(READ),POST(CREATE),PATCH/PUT(update),DELETE ).
		REST is ressource based.
		Ressource are identified by URIs (xxxx/movie/3)
		Each ressource representation is described with enough infos for client to process it (content-type header)
		REST is STATELESS (no client session between two requests)
		Satelessness helps with better scalability, makes caching and load balancing easier.
		REST is cache able (client side)
			that is done using response headers
			safe HTTP methods = do not modify the ressource = GET,HEAD 
			unsafe HTTP methods = POST,PUT,PATCH,DELETE.
		UNIFORM INTERFACE
			HTTP response contains the representation,links,cache-ability(status code,body,headers)
		LAYERED SYSYEM
			Any intermediate server may stand along the way, like a load balancer,caching proxy, or a gateway.
			Any intermediate server may enfore security policies along the way.

2.What your great REST API needs:
	Ressource URIs
		an URI points to one ressource but many URIs can point to the same ressource
	HTTP Methods AND STATUS CODE 
		we are using HTTP methods to denote an action (POST=> create,PATCH=> modify, etc)
		STATUS CODE
			200 = success message = ressource is found and was returned
			201 = ressource created successfully
			204 = no content to delete (only for DELETE method)
			400 = request incorrect (exple invalid data for POST)
			401 = the request require an authorization
			403 = Your authorization is not enough for this ressource
			404 = ressource not found or not exists
			409 = conflict (exple create a ressource already existing)
			500 = generic server error
	REQUEST HEADERS 
		might be used to specify the format of request body (JSON or XML)
		might contain authorization credentials.
		Some Headers:
			Accept Header = specify the expected format of response body (the client want JSON format) and to specify also the version of the API (optionally)
				exple: Accept:application/json
				exple: Accept:application/json;version=1.2
			Content-type = tells the server what is the format of request body (request POST for exple)
			Authorization header = used to exchange username and password for a token 
				exple: Authorization:Basic username:password // where they are encoded base64
				exple: Authorization:Bearer API_TOKEN
	RESPONSE HEADERS
		Cache-control = the cache policy defined by the server for the response that can be stored by the client for a specific time.
			exple: Cache-Control: max-age=3600 => the ressource could be cached for 1 hour.
			exple: Cache-Control:no-cache,no-store => the response shall not be cached at all.
		Content-Type: indicate what is the response body format
			exple: Content-Type: application/json
		Age = specifies how old is the response and how long ago it was generated (used by intermediate caching systems only (like Varnish))
		Vary = those request will be cached separetly based on the Vary value.
	HYPERMEDIA IN RESPONSE BODY
		links in the response body implement the HAL specification (Hypertext application Language)
		_links,_embedded, ,,self/,,first/,,last/,,next

	SUMMARY
		REST URI CONVENSION:
			/movies/3/ratings with POST => add a ratings
		RPC 
			/movies/3/rate => verb => RPC

III-Environment Setup and Getting Started
5. Setting Up VirtualBox and Vagrant on Windows
6. Setting Up VirtualBox and Vagrant on Linux
	vagrant box add laravel/homestead //to remove just replace add by remove
	~/homestead

7. Setting Up VirtualBox and Vagrant on MacOS
8. Starting the Virtual Machine, Configuring the Project and Database 
	add plugin 
	vim homestead.yml

IV-Basic REST Operations : Creating Database Models, Migrations and Fixtures:
9. Creating Database Models and Migrations
10. More Database Models, Migrations and Creating Data Fixtures 
11. The View layer concept of FOSRestBundle (Important!) 
	Advantages of FOSRestBundle:
		write one controller to render HTML,XML and JSON
			output is generated using Twig or Serializer (Symfony or JMS Serializer)
	DIFFERENCE FROM THE USUAL SYMFONY RESPONSE
		USUAL RESPONSE: HTML PAGE or JSON data
		HERE: handled View Object Instance (processed by the View Handler)
		View CLass is modeled after the symfony Response 
		it also has data,headers and status code
		The ViewHandler is a Class that will handle seralization or templating to create the output
		Two Ways to Specify the response format:
			1) /movies/3.json
			2) Header: Accept: application/json
	WE WILL USE DIFFRENT LISTENERS
		Body LISTENER : bind JSON => ENTITY
		Format LISTENER : deteremine the correct Format
		View response LISTENER : automatically concert returned objectes (Entity,Collection or array) into JSON.
		@View()
		// continue this 2 min I'm tired



	VIEW AND VIEWHANDLER


12. Displaying the list of resources using GET 
	composer require friendsofsymfony/rest-bundle
	composer require jms/serializer-bundle
	register in Kernel serializer-bundle before rest-bundle
	
13. Adding new resources with POST method 
14. Deleting resources 
15. Returning a single resource 