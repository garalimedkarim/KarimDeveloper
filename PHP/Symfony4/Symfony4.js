


> composer create-project symfony/skeleton quick_tour
> composer require --dev server
> php bin/console server:start
//without server routing not works correctly
> composer install annotations
> composer install sec-checker
> bin/console security:check
//res: no packages have known vulnerabilities
//symfony recipes repository:
https://flex.symfony.com/
//The Twig recipe
>composer require twig
>composer require profiler --dev
=> the magic dump() function in controller and in twig to debug.
>composer require debug --dev
>composer unpack debug // to unpack package dependencices in package.json to control there version.
>composer require asset
//put css in public/
//reference it:
	<link rel="stylesheet" href="{{ asset('css/font-awesome.css') }}">
	<link rel="stylesheet" href="{{ asset('css/styles.css') }}">
//GENERATING ROUTES
> bin/console debug:router
href="{{ path('app_article_homepage') }}"
@Route("/news/{slug}", name="article_show")
<a href="{{ path('article_show', {slug: 'why-asteroids-taste-like-bacon'}) }}">
//JS ASSETS
{% block javascripts %}
    {{ parent() }}
    <script src="{{ asset('js/article_show.js') }}"></script>
{% endblock %}
//AJAX CALL
    /**
     * @Route("/news/{slug}/heart", name="article_toggle_heart", methods={"POST"})
     */
    public function toggleArticleHeart($slug)
    {
... lines 42 - 44
//there is a solution FOSJsRoutingBundle to generate routing in JS But Now:

//SERVICES
//Logger Service:
    public function toggleArticleHeart($slug, LoggerInterface $logger)
    {
        // TODO - actually heart/unheart the article!
        $logger->info('Article is being hearted!');
... lines 47 - 48
    }
//To Use the logger we just add it as arg with its type-hint => this is called autowiring
> bin/console debug:autowiring // to know type-hints

Exple:
bin/console debug:autowiring | grep "twig"
//res: Twig\Environment (twig)
use Twig\Environment;
class ArticleController extends AbstractController
{
... lines 14 - 24
    public function show($slug, Environment $twigEnvironment)
    {
... lines 27 - 32
        $html = $twigEnvironment->render('article/show.html.twig', [
            'title' => ucwords(str_replace('-', ' ', $slug)),
            'slug' => $slug,
            'comments' => $comments,
        ]);
        return new Response($html);
    }
... lines 41 - 52

//ChapII: Symfony4 Fundamentals:
//1.Bundles give u services:
bin/console debug:autowiring | grep "logger"
Psr\Log\LoggerInterface (monolog.logger) //this service is provided by monolog.

//2.KnpMarkdownBundle & its Services
this bundle has a service which transform 
So here is our first big lesson:
Everything in Symfony is done by a service
Bundles give us these services... and installing new bundles gives us more services.
And 3, Twig clearly gets its hair done by a professional.

//3.The Cache Service:
Pools in profiler are different cache system running in the App.
We are using "cache.app"
https://symfonycasts.com/screencast/symfony-fundamentals/caching#play
#Controller:
+    public function show($slug, MarkdownInterface $markdown, AdapterInterface $cache)
...
+        $item = $cache->getItem('markdown_'.md5($articleContent));
+        if (!$item->isHit()) {
+            $item->set($markdown->transform($articleContent));
+            $cache->save($item);
+        }
+        $articleContent = $item->get();

//4.Configuring a Bundle
dump($markdown);die;
//Sol2:
Dumping Bundle Configuration
And there's an awesome way to find out all of the configuration options for a bundle without reading the documentation:
>bin/console config:dump KnpMarkdownBundle

//Configuring the Parser
To prove we can do it, let's try to change to the "light" parser. According to the docs, we can do that by using the knp_markdown, parser, service config and setting its value to markdown.parser.light.
where should this config live? Move over to your project and look in the config/ directory and then packages/. Create a new file called knp_markdown.yaml. Then, copy the configuration, paste it here and change the service to the one from the docs: markdown.parser.light:

Ok! But... where should this config live? Move over to your project and look in the config/ directory and then packages/. Create a new file called knp_markdown.yaml. Then, copy the configuration, paste it here and change the service to the one from the docs: markdown.parser.light:
config/packages/knp_markdown.yaml
knp_markdown:
    parser:
        service: markdown.parser.light

>bin/console cache:clear
# displays all config values
>bin/console config:dump TwigBundle
Or:
>bin/console config:dump twig
# displays the default config values defined by Symfony
 php bin/console config:dump-reference twig
# displays the actual config values used by your application
 php bin/console debug:config twig

//5.debug:container & Cache Config:
When we configure a bundle in .yml, it changes also in:
> bin/console debug:autowiring
But to show the full list of services:
> bin/console debug:container --show-private
But the services we will use 99% of the time show up in debug:autowiring and are easy to access.
dump($cache); //dump($service)
the cache service come with framework bundle.
>bin/console config:dump framework
>bin/console debug:config framework

//6.Explore! Environments & Config Files
Symfony comes with 3 env (dev,prod,test) and we can create more ..

We are going to explore the config directory with all its secrets.
Symfony is just a set of routes and a set of services.
=> in Kernel.php (configureContainer for services, configureRoutes for routes)

Setting config files for dev under config/packages/dev/, it overrides the config files under config/packages/
To verify the actual configuration of the bundle:
> bin/console debug:config framework


//7.Leveraging the prod Environment
//set prod env:
# .env file:

# ...
APP_ENV=prod
AND run: //because the internal Symfony cache is not automatically rebuilt for prod.
> bin/console cache:clear
but running this is better //recreate the files that Symfony needs instead of creating them when u refresh page
> bin/console cache:warmup

//if we want to configure a service in the dev different to prod we copy its config file into config/packages/dev:
#config/packages/dev/framework.yaml:

//8.Creating Services:
Create src/Service/MarkdownHelper.php
<?php 
namespace App\Service;
class MarkdownHelper{
	public function parse(string $source){
	}
}
Add Construct to this class to inject services and get their "use" from:

there is 2 aliases for cache.app
> bin/console debug:autowiring cache
Solution tape:
> bin/console debug:container cache.app

//9.Using Non-Standard Services: Logger Channels
	$this->logger->info('Markdown parse called');
	to see logs go to profiler > logs

The debug:container command displays all configured public services: 
   > php bin/console debug:container  
  To get specific information about a service, specify its name: 
   > php bin/console debug:container logger

	packages/dev/monolog.yml
	
	Complex configuration for logger //a revoir a la demande

//10.services.yaml & the Amazing bind
#services.yaml:
services:
... lines 6 - 25
	//here we add the services that we want to configure:
    App\Service\MarkdownHelper: //service id = class Name thnks to service auto-registration. 
        arguments:
            $logger: '@monolog.logger.markdown'
//We can replace it by auto-binding:
		services:
			# default configuration for services in *this* file
			_defaults:
		... lines 8 - 13
				# setup special, global autowiring rules
				bind:
					$markdownLogger: '@monolog.logger.markdown'
//If you find any argument named $markdownLogger, pass this service to it.

//11.Config Parameters:
bundleName:
	serviceName: service.type.config1
#framework.yaml:
parameters:
    cache_adapter: 'cache.adapter.apcu'
cache:
... lines 21 - 31
        # APCu (not recommended with heavy random-write workloads as memory fragmentation can cause perf issues)
        app: '%cache_adapter%'   

like this we play in variables between prod and dev
	#packages/dev/service.yaml:
		parameters:
			cache_adapter: 'cache.adapter.filesystem'
load order:
1) #packages/
2) #packages/dev //override previous
3) #config/services.yml //override previous (all)

default parameters:
>php bin/console debug:container --parameters

//12.Constructors for your Controller:
//13.Installing Bundles with Average Docs:
//14.Autowiring Aliases:
	using a Symfony 3 service in Symfony 4.
//15.Env Variables
//16.Env Var Tricks & on Production




//Security :
1.Security & the User Class:
	> composer require security //to allow maker bundle to exec: bin/console make:user
	//> composer update symfony/maker-bundle
	> composer require  symfony/maker-bundle
	> composer require orm 
	> bin/console make:user

2.All about User Class:
	#security.yaml:
		security:
			# https://symfony.com/doc/current/security.html#where-do-users-come-from-user-providers
			providers:
				# used to reload user from session & other features (e.g. switch_user)
				app_user_provider:
					id: App\Security\UserProvider	
3.Customizing the User Entity:
	> bin/console make:entity // to update User Entity by adding fields
	//Doctrine:
	doctrine:
		dbal:
	... lines 10 - 11
			server_version: '5.7' //MySQL 5.7
	>php bin/console make:migration
	//res under src/Migration
	>php bin/console doctrine:migrations:migrate
	> composer require orm-fixtures --dev
	> bin/console make:fixtures
	//exploiting BaseFixture to generate Users.
	>php bin/console doctrine:fixtures:load

4.The Login Form:
	>bin/console make:controller
	google search symfony login form
	copy paste controller + view

5.Firewalls & Authenticator
	*At the beginning of any request Symfony calls a set of authentication listeners (authenticators)
	*Authenticator role is to controler submitted email&password or authorization token, etc...
	*If So, the authenticator tries to log the user with those credentials.
	*There is Authentication & Authorization.
	*The Job of firewall is to authenticate you. 
	*The Job of acces control is the Authorization.
	>bin/console make:auth
		>0
		>LoginFormAuthenticator
	#security.yaml:
         main:
             anonymous: true
+            guard:
+                authenticators:
+                    - App\Security\LoginFormAuthenticator
	#src/Security/LoginFormAuthenticator.php:
		-class LoginFormAuthenticator extends AbstractGuardAuthentica
		tor{
		+class LoginFormAuthenticator extends AbstractFormLoginAuthen
		ticator{
	
6.Login Form Authenticator:
	Now that we've added our authenticator under the authenticators key,Symfony calls its supports() method at the beginning of every request, which is why we see this little die statement.
	if supports method returns true, getCredentials method will be called which calls getUser() which calls checkCredentials() which calls finally onAuthenticationSuccess() or onAuthenticationFailre().
	dump($var); die; === dd($var);
	dd($request->request->all());
	
	#LoginFormAuthenticator.php:
	use Symfony\Component\Routing\RouterInterface;
	use App\Repository\UserRepository;

	class LoginFormAuthenticator extends AbstractFormLoginAuthenticator
	{
		private $userRepository;
		private $router;

		public function __construct(UserRepository $userRepository, RouterInterface $router)
		{
			$this->userRepository = $userRepository;
			$this->router = $router;
		}

		protected function getLoginUrl(){

		}

		public function supports(Request $request)
		{
			// do your work when we're POSTing to the login page
			return $request->attributes->get('_route') === 'login'
				&& $request->isMethod('POST');
		}

		public function getCredentials(Request $request)
		{
			// dd($request->request->all());
			return [
				'email' => $request->request->get('email'),
				'password' => $request->request->get('password'),
			];        
		}

		public function getUser($credentials, UserProviderInterface $userProvider)
		{
			// dd($credentials);
			return $this->userRepository->findOneBy(['email' => $credentials['email']]);
		}

		public function checkCredentials($credentials, UserInterface $user)
		{
			// dd($user);
			// only needed if we need to check a password - we'll do that later!
			return true;        
		}

		// public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
		// {
		//     // todo
		// }

		public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
		{
			// todo
			// dd('success');
			echo "Authentication Success";
			return new RedirectResponse($this->router->generate('home'));
		}
		
7.Redirecting on Success & the User Provider:
	So, that's the job of the user provider. When we refresh, the user provider takes the User object from the session and uses its id to query for a fresh User object.	
	
	//modification done with the previous code section.
	
8.Authentication Errors
	//setting LastUSername Called in SecurityController to the right username field:
     public function getCredentials(Request $request)
     {
         // dd($request->request->all());
-        return [
+        $credentials = [
             'email' => $request->request->get('email'),
             'password' => $request->request->get('password'),
         ];        
+
+        $request->getSession()->set(
+            Security::LAST_USERNAME,
+            $credentials['email']
+        );
+
+        return $credentials;
	
9.Customizing Errors & Logout
	//create security.en.yaml because "security" is in:
		{{ error.messageKey|trans(error.messageData, 'security') }}
	#translations/security.en.yaml:
		"Username could not be found.": "Email doesn't exist."
	//adding logout:
	#security.yaml:
    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false
        main:
            anonymous: true
            guard:
                authenticators:
                    - App\Security\LoginFormAuthenticator
+           logout:
+               path: app_logout 	

	#SecurityController:
    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('Will be intercepted before getting here');
    }
    
10.CSRF Protection
	//https://symfony.com/doc/current/security/csrf.html
	#login.html.twig:
		 <input type="hidden" name="_csrf_token" value="{{ csrf_token('authenticate') }}"
		 >
	#authenticator:
         $credentials = [
             'email' => $request->request->get('email'),
             'password' => $request->request->get('password'),
+            'csrf_token' => $request->request->get('_csrf_token'),
         ];
	
		public function checkCredentials($credentials, UserInterface $user)		
			 {
		+        $token = new CsrfToken('authenticate', $credentials['csrf_token']);
		+        if (!$this->csrfTokenManager->isTokenValid($token)) {
		+            throw new InvalidCsrfTokenException();
		+        }
		+
				 return true;        
			 }
			 
11.Adding Remember Me

#login.html.twig:
	<label>
		<input type="checkbox" name="_remember_me"> Remember me
	</label>
>php bin/console debug:container --parameters
#security.yaml
main:
            remember_me:
                secret:   '%kernel.secret%'
                lifetime: 2592000 # 30 days in seconds		

12.Adding & Checking the User's Password
	//add password propertie to User entity:
	> b/c make:entity
	> b/c make:migration
	> b/c doctrine:migrations:migrate
	//set User encoder
	#security.yaml
	+    encoders:
	+            App\Entity\User:
	+                algorithm: bcrypt	
	> b/c php bin/console debug:autowiring password
	
#UserFixtures.php:
	public function __construct(UserPasswordEncoderInterface $passwordEncorder){
		$this->passwordEncorder = $passwordEncorder;
	}
		
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
    	$user = new User();
    	$user->setEmail('garalimedkarim4@gmail.com');
    	$user->setPassword($this->passwordEncorder->encodePassword($user,"0000"));
    	$manager->persist($user);
        $manager->flush();
    }		
	#Authenticator:
    public function checkCredentials($credentials, UserInterface $user)
    {
        // dd($user);
        // only needed if we need to check a password - we'll do that later!
        $token = new CsrfToken('authenticate', $credentials['csrf_token']);
        if (!$this->csrfTokenManager->isTokenValid($token)) {
            throw new InvalidCsrfTokenException();
        }

        // return true;
        return $this->passwordEncorder->isPasswordValid($user, $credentials['password']);     
    }
    
	> bin/console doctrine:fixtures:load
	> php bin/console doctrine:query:sql 'SELECT * FROM user'
	
13.access_control Authorization & Roles
	>b/c debug:router
	=> access denied for some routes that require admin role.
	
	security:
		# ...
		access_control:
			- { path: ^/admin, roles: ROLE_USER }
			
14.Target Path: Redirecting an Anonymous User
	//adding this make a redirection to login for anonymous users:
		- { path: ^/$, roles: ROLE_USER }
	//this logic came from our Authenticator in method start() ( parent of our authenticator implement it == it's called ENTRY POINT)
	
	//when a route require authentication (at least ROLE_USER) => redirect to Login, but after login we have to redirect to this route:
	
	#Authenticator:
	class LoginFormAuthenticator extends AbstractFormLoginAuthenticator
	{
		use TargetPathTrait;
		//---		
		public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
		{
			$targetPath = $this->getTargetPath($request->getSession(), $providerKey);
			if ($targetPath) {
				return new RedirectResponse($targetPath);
			}

			return new RedirectResponse($this->router->generate('home'));
		}

15.Deny Access in the Controller
    /**
     * @Route("/route", name="route")
     */
    public function route()
    {
    	// $this->denyAccessUnlessGranted('ROLE_USER');
	    // or add an optional message - seen by developers
	    $this->denyAccessUnlessGranted('ROLE_USER', null, 'User tried to access a page without having ROLE_ADMIN');
	 //Or Simply by Annotation
		 * @IsGranted("ROLE_ADMIN", message="ADMIN ROLE IS REQURED")
		// We can put this annotation under the hole Controller to be able on all it's actions.
	
16.Dynamic Roles:
	//to check if User is connected in a controller 2 ways:
	1) check for the ROLE_USER (easy)
	2) in the next section 17.

	#UserFixture.php:
		public function load(ObjectManager $manager)
		{
			// $product = new Product();
			// $manager->persist($product);
			$user = new User();
			$user->setEmail('garalimedkarim4@gmail.com');
			$user->setPassword($this->passwordEncorder->encodePassword($user,"0000"));
			$manager->persist($user);

			$userAdmin = new User();
			$userAdmin->setEmail('garalimedkarim5@gmail.com');
			$userAdmin->setPassword($this->passwordEncorder->encodePassword($userAdmin,"0000"));
			$userAdmin->setRoles(['ROLE_ADMIN']);
			$manager->persist($userAdmin);

			$manager->flush();
		}
	
	#base.html.twig:
		{% if is_granted('ROLE_USER') %}
		+            <a class="dropdown-item" href="{{ path('app_logout') }}">Logout</a>
		+        {% endif %} 	

17.IS_AUTHENTICATED_ & Protecting All URLs
	//When most of the page requires authentification unless someones like login in this exple
    access_control: //executed one by one.
        # but, definitely allow /login to be accessible anonymously
        - { path: ^/login, roles: IS_AUTHENTICATED_ANONYMOUSLY }
        # if you wanted to force EVERY URL to be protected 
        - { path: ^/, roles: IS_AUTHENTICATED_FULLY }
        #
     
     //IS_AUTHENTICATED_FULLY => login in this session
	 IS_AUTHENTICATED_REMEBRED => login in this session or remembred
	 IS_AUTHENTICATED_ANONYMOUSLY => not authenticated
	 
18.Fetch the User Object
	#in Controller:
		dd($this->getUser());
	#in twig
		{{app.user}} //there is also {{app.session}}

	//Override default Controller:
	//Every Controller have to extend this Controller:
	namespace App\Controller;

	use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
	use App\Entity\User;

	abstract class BaseController extends AbstractController
	{
		protected function getUser(): User //this Controller is made only for this typing : User
		{
			return parent::getUser();
		}		
	}
	
19.Custom User Method:
	//just add a method to user getAvatarUser

20.Fetching the User In a Service
	//We know how to get the user in a template and in a Controller
	//We get user in a service by injecting another service Security
	//contains only getUser() and isGranted()
	use Symfony\Component\Security\Core\Security;
    private $security;
    public function __construct(AdapterInterface $cache, MarkdownInterface $markdown, LoggerInterface $markdownLogger, bool $isDebug, Security $security)
    {
        $this->security = $security;
    }
    //---
		$this->logger->info('They are talking about bacon again!', [
			'user' => $this->security->getUser()
		]);
	
21.Role Hierarchy
	// BEST PRACTISE EVERY ACTION HAVE ITS ROLE, AND THEN REGROUP ROLES in role_hierarchy IN security.yaml:
	#security.yaml
		security:
			role_hierarchy:
				ROLE_ADMIN: [ROLE_ADMIN_COMMENT, ROLE_ADMIN_ARTICLE]	
	
22.Impersonation (switch_user)
#security.yaml
    firewalls:
        main:
            switch_user: true
            
	//the switch_user feature requires you to have a special role called ROLE_ALLOWED_TO_SWITCH
	role_hierarchy:
			ROLE_ADMIN: [ROLE_ADMIN_COMMENT, ROLE_ADMIN_ARTICLE, ROLE_ALLOWED_TO_SWITCH]
	//to switch
	?_switch_user=garalimedkarim4@gmail.com
	//to exit switch
	?_switch_user=_exit
	#twig:
        {% if is_granted('ROLE_PREVIOUS_ADMIN') %}
            <div class="alert alert-warning" style="margin-bottom: 0;">
                You are currently switched to this user.
                <a href="{{ path('app_homepage', {'_switch_user': '_exit'}) }}">Exit Impersonation</a>
            </div>
        {% endif %}	
      
23.Serializer & API Endpoint
return $this->json($user);
//json_encode($user) encodes only the public properties on that class. And because we have no public properties, we get back nothing!
//=> The Role of Serializer
> composer require serializer
//directly take effect
//now we want to serialize only some properites of User and ignore others:
//add Group annotation to User properties:
    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups("mainUserGroup")
     */
    private $email;
//then:
    /**
     * @Route("/api/account", name="api_account")
     */
    public function accountApi()
    {
        $user = $this->getUser();
        return $this->json($user, 200, [], [
            'groups' => ['mainUserGroup'],
        ]);
    }

24.API Auth: Do you Need it? And its Parts
	//IF we are using our JS, We don't need to create API.
	API TOKEN AUTHENTICATION SYSTEM has two parts:
	1) how the app processes an existing=> API Token and logs in the user ?
		API Token = String affected to the user in the system.
		=> the client that makes the request sets the token string on the header and then he become authenticated as that User.
		*Designe ur app to read API tokens from an API request.
		*use the token to find the correct User and authenticate him.
	2) how these API token are created and distrubted ?
	=>	API endpoint receive username/password and return token => bad idea for the third-party (like phone) because the username/password will be sended to the server.
	=> SOLUTION: OAUTH2 (secure but complex)
	
25.ApiToken Entity
	> bin/console make:entity
	#Entity\ApiToken.php:
	class ApiToken
	{
		/**
		 * @ORM\Id()
		 * @ORM\GeneratedValue()
		 * @ORM\Column(type="integer")
		 */
		private $id;

		/**
		 * @ORM\Column(type="string", length=255)
		 */
		private $token;

		/**
		 * @ORM\Column(type="datetime")
		 */
		private $expiresAt;

		/**
		 * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="apiTokens")
		 * @ORM\JoinColumn(nullable=false)
		 */
		private $user;

		public function __construct(User $user)
		{
			$this->token = bin2hex(random_bytes(60));
			$this->user = $user;
			$this->expiresAt = new \DateTime('+1 hour');
		}

		public function getId(): ?int
		{
			return $this->id;
		}

		public function getToken(): ?string
		{
			return $this->token;
		}

		public function getExpiresAt(): ?\DateTimeInterface
		{
			return $this->expiresAt;
		}

		public function getUser(): ?User
		{
			return $this->user;
		}

	}

	#UserFixtures:
	+        $apiToken1 = new ApiToken($user);
	+        $apiToken2 = new ApiToken($userAdmin);
	+        $manager->persist($apiToken1);
	+        $manager->persist($apiToken2);


26.Entry Point: Helping Users Authenticate
	> b/c make:auth
	ApiTokenAuthenticator.php
	=>Now we have 2 authenticators in the firewall, So we have to shoose an entry_point:
	>LoginFormAuthenticator //first Authenticator
	#security.yaml
		main:
			anonymous: true
			guard:
				authenticators:
					- App\Security\LoginFormAuthenticator
					- App\Security\ApiTokenAuthenticator
				entry_point: App\Security\LoginFormAuthenticator
	
27.API Token Authenticator
	#/src/Security/ApiTokenAuthenticator.php:
		class ApiTokenAuthenticator extends AbstractGuardAuthenticator
		{
			private $apiTokenRepo;
			public function __construct(ApiTokenRepository $apiTokenRepo)
			{
				$this->apiTokenRepo = $apiTokenRepo;
			}

			public function supports(Request $request)
			{
				// die('authenticator 2');
				// look for header "Authorization: Bearer <token>"
				return $request->headers->has('Authorization')
					&& 0 === strpos($request->headers->get('Authorization'), 'Bearer ');        
			}

			public function getCredentials(Request $request)
			{
				$authorizationHeader = $request->headers->get('Authorization');
				// skip beyond "Bearer "    
				return substr($authorizationHeader, 7);        
			}

			public function getUser($credentials, UserProviderInterface $userProvider)
			{
				$token = $this->apiTokenRepo->findOneBy([
					'token' => $credentials
				]);
				if (!$token) {
					return;
				}
				return $token->getUser();

			}

			public function checkCredentials($credentials, UserInterface $user)
			{
				dd('checking credentials');
			}	
	
28.API Token Authenticator Part 2!
	#Entity\ApiToken.php:
	+    public function isExpired(): bool
	+    {
	+        return $this->getExpiresAt() <= new \DateTime();
	+    }
	
	#Security/ApiTokenAuthenticator.php:
		private $apiTokenRepo;
		public function __construct(ApiTokenRepository $apiTokenRepo)
		{
			$this->apiTokenRepo = $apiTokenRepo;
		}

		public function supports(Request $request)
		{
			// die('authenticator 2');
			// look for header "Authorization: Bearer <token>"
			return $request->headers->has('Authorization')
				&& 0 === strpos($request->headers->get('Authorization'), 'Bearer ');        
		}

		public function getCredentials(Request $request)
		{
			$authorizationHeader = $request->headers->get('Authorization');
			// skip beyond "Bearer "    
			return substr($authorizationHeader, 7);        
		}

		public function getUser($credentials, UserProviderInterface $userProvider)
		{
			$token = $this->apiTokenRepo->findOneBy([
				'token' => $credentials
			]);
			if (!$token) {
				throw new CustomUserMessageAuthenticationException(
					'Invalid API Token'
				);
			}

			if ($token->isExpired()) {
				throw new CustomUserMessageAuthenticationException(
					'Token expired'
				);
			}

			return $token->getUser();

		}

		public function checkCredentials($credentials, UserInterface $user)
		{
			// dd('checking credentials');
			return true;
		}

		public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
		{
			return new JsonResponse([
				'message' => $exception->getMessageKey()
			], 401);
		}

		public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
		{
			// allow the authentication to continue
		}

		public function start(Request $request, AuthenticationException $authException = null)
		{
			throw new \Exception('Not used: entry_point from other authentication is used');
		}

		public function supportsRememberMe()
		{
			return false;
		}	
	
29.Manual Authentication / Registration



Chapter : Symfony 4 Forms: Build, Render & Conquer!
1.Form Type Class
>composer require form validator
>create a new form file : 
#src/Form/articleFormType:
>render form:
    /**
     * @Route("/admin/article/new", name="admin_article_new")
     */
    //     * @IsGranted("ROLE_ADMIN_ARTICLE")
    public function new(EntityManagerInterface $em)
    {
        $form = $this->createForm(ArticleFormType::class);

        return $this->render('article_admin/new.html.twig', [
            'articleForm' => $form->createView()
        ]);
    }
>create a template:
	templates/article_admin/new.html.twig
2.Handling the Form Submit
	handleRequest works only when POST request
	$data = $form->getData();
	dd($data);
3.Success (Flash) Messages
	{{ app.session.flashbag.peek('success')|length > 0 ? '' : 'mb-5' }}">
4.Bind Your Form to a Class
	//how to control form rendred : via a method in FormType
	//Now, when the form is rendred it's go to show form's inputs.
	//Now also, form->getData() => Article Object.
	#ArticleFormType
	class ArticleFormType extends AbstractType
	{
	... lines 12 - 19
		public function configureOptions(OptionsResolver $resolver)
		{
			$resolver->setDefaults([
				'data_class' => Article::class
			]);
		}	

5.Field Types & Options
	Profiler > Form

6.DateTimeType & Data "Transforming"
	->add('publishedAt', null, [
		'widget' => 'single_text'
	])	
	//automatic datetime due to configureOptions Form's method which takes the ArticleClass.

7.EntityType: Drop-downs from the Database	
	->add('author', EntityType::class, [
			'class' => User::class,
			'choice_label' => function(User $user) {
				return sprintf('(%d) %s', $user->getId(), $user->getEmail());
			}
		])

8.EntityType: Custom Query

	->add('author', EntityType::class, [
			'class' => User::class,
			'choice_label' => function(User $user) {
				return sprintf('(%d) %s', $user->getId(), $user->getEmail());
+			'choices' => $this->userRepository->findAllEmailAlphabetical(),
			}
		])
#UserRepo:
    public function findAllEmailAlphabetical()
    {
        return $this->createQueryBuilder('u')
            ->orderBy('u.email', 'ASC')
            ->getQuery()
            ->execute()
        ;
    }

9.HTML5 & "Sanity" Validation
	>composer require validator
	Sanity Validation Vs Business Rule Validation
	HTML5: <form novalidate
	Sanity Validation: if we change the value of the dropdown id => Error (Sanity Validation):
	To Control error msg:
	->add('author', EntityType::class, [
... lines 35 - 40
		'invalid_message' => 'Symfony is too smart for your hacking!'
	]	

10.Validation Constraints with @Assert
//Custom Validation:
    /**
     * @Assert\Callback
     */
	public function validate(ExecutionContextInterface $context, $payload)
    {
        if (stripos($this->getTitle(), 'the borg') !== false) {
            $context->buildViolation('Um.. the Bork kinda makes us nervous')
                ->atPath('title')
                ->addViolation();
        }
    }
    
11.Form Rendering Functions: form_*
    {{ form_start(articleForm) }}
        {{ form_row(articleForm.title) }}
        {{ form_row(articleForm.author) }}
        {{ form_row(articleForm.content) }}
        {{ form_row(articleForm.publishedAt) }}
    {{ form_end(articleForm) }}
    
12.Form Rendering Variables
	{{ form_label(articleForm.title, 'Article title') }}
	{{ form_errors(articleForm.title) }}
	{{ form_widget(articleForm.title) }}
	{{ form_help(articleForm.title) }}
	// Vs
	{{ form_row(articleForm.title, {
		label: 'Article title'
	}) }}        
    
13.The Edit Form
	
14.Registration Form
	>bin/console make:form
	>UserRegistrationFormType

15.Adding Extra "Unmapped" Fields
	//make form field totally separated from the entity
	->add('plainPassword',null,[
		'mapped' => false,
	])
	//recuperation:
	dd($form['plainPassword']->getData());
	
16.UniqueEntity & Validation Directly on Form Fields
//Validation de Email : Unique dans la BD
	#src/Entity/User:
	 * @UniqueEntity(
	 *     fields={"email"},
	 *     message="I think you're already registered!"
	 * )
	 */
	class User implements UserInterface{
		//...
		 * @Assert\NotBlank()
		 * @Assert\Email()
		 */
		private $email;
//Validation in form level:
		#UserFormType:
		->add('plainPassword', PasswordType::class, [
			'mapped' => false,
			'constraints' => [
				new NotBlank([
					'message' => 'Choose a password!'
				]),
				new Length([
					'min' => 5,
					'minMessage' => 'Come on, you can think of a password longer than that!'
				])
			]
		]);		

17.Agree to Terms Database Field
	> bin/console make:entity
	> User
	> agreedTersAt
	// modify migration file before migrate
			$this->addSql('ALTER TABLE user ADD agreed_terms_at DATETIME DEFAULT NULL');
			$this->addSql('UPDATE user SET agreed_terms_at = NOW()');
	
18.Agree to Terms Checkbox Field
	->add('agreeTerms', CheckboxType::class, [
		'mapped' => false,
		'constraints' => [
			new IsTrue([
				'message' => 'I know, it\'s silly, but you must agree to our terms.'
			])
		]
	])
	
19.All about Form Themes
	//form_start(view,variables)
	{{ form_start(registrationForm, {
		'attr': {'class': 'form-signin'}
	}) }}
	<h1 class="h3 mb-3 font-weight-normal">Register</h1>
	
20.Form Theme Block Naming & Creating our Theme!
	Creating our Form Theme
	Extended themes:
		bootstrap_4_layout.html.twig
		form_div_layout.html.twig
	1. add to your template:	
	{% form_theme registrationForm _self %}
	2. copy {%- block form_row -%} from form_div_layout.html.twig because it's simplier and modify it.
	
21.Form Theming & Variables
	{% block form_row %}
	... lines 5 - 9
		{{ dump() }}
	... lines 11 - 14
	{% endblock %}
	
	{% block form_row %}
	... lines 5 - 9
		{{- form_label(form, null, {
				label_attr: { class: 'sr-only' }
		}) -}}
	... lines 13 - 15
	{% endblock %}	
	
	{{ form_start(registrationForm, {
		... lines 31 - 33
		{{ form_row(registrationForm.email, {
			attr: { placeholder: 'Email' }
		}) }}
		{{ form_row(registrationForm.plainPassword, {
			attr: { placeholder: 'Password' }
		}) }}
		{{ form_row(registrationForm.agreeTerms) }}
		... lines 41 - 44
	{{ form_end(registrationForm) }}
	
22.Form Theming a Single Field
	{% block _user_registration_form_agreeTerms_row %}
		<div class="checkbox mb-3">
			{{ form_errors(form) }}
			<label>
				<input type="checkbox" name="{{ full_name }}" required> Agree to terms I for sure read
			</label>
		</div>
	{% endblock %}
	
23.Custom Field Type
	Creating the Custom Form Type
	class UserSelectTextType extends AbstractType
	{
		public function getParent()
		{
			return TextType::class;
		}
	}	
24.Data Transformer
	https://symfonycasts.com/screencast/symfony-forms/data-transformer#play
25.Custom Field: configureOptions() & Allowing Empty Input
26.Leveraging Custom Field Options
	 when we instantiate EmailToUserTransformer, the second argument would be the callback that we passed from ArticleFormType
	 ->add('author', UserSelectTextType::class,[
			'finder_callback' => function(UserRepository $userRepository, string $email) {
                return $userRepository->findOneBy(['email' => $email]);
            }	
	 ])

27.Autocomplete JavaScript
	JS library
28.Autocomplete Endpoint & Serialization Group
	create Api that return json of users ( serialize only some properties by group )
    public function getUsersApi(UserRepository $userRepository)
    {
... lines 18 - 19
        return $this->json([
            'users' => $users
        ], 200, [], ['groups' => ['main']]);
    }	
29.Hooking up the AJAX Autocomplete
	query repository by keyword: autocomplete by keyword

30.The buildView() Method
	#UserSelectTextType.php
	buildView override method
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
... line 51
        $class = isset($attr['class']) ? $attr['class'].' ' : '';
        $class .= 'js-user-autocomplete';
        $attr['class'] = $class;
... lines 56 - 57
    }

31.Form Type Extension
	Create a special TextArea Type with special behaviour.
	Automatically set attr for any textarea in the App => possible
	create #Form/TypeExtension/TextareaSizeExtension:
	csrfToken story
	
32.	Tweak your Form based on the Underlying Data
	Disable a form field in a template
class ArticleFormType extends AbstractType
{
... lines 17 - 23
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        dd($options);
... lines 27 - 38
    }

class ArticleAdminController extends AbstractController
{
... lines 17 - 46
    public function edit(Article $article, Request $request, EntityManagerInterface $em)
    {
        $form = $this->createForm(ArticleFormType::class, $article, [
            'include_published_at' => true
        ]);
... lines 52 - 67
    }
... lines 69 - 80
}
    
class ArticleFormType extends AbstractType
{
... lines 17 - 47
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
... line 51
            'include_published_at' => false,
        ]);
    }    	

33.Form Model Classes
	create:
	#Form/Model/UserRegistrationFormModel:
	class UserRegistrationFormModel
	{
		public $email;
		public $plainPassword;
		public $agreeTerms;
	}
	Models are called data transfer objects:

	#src/Form/UserRegistrationFormType.php
	... lines 1 - 15
	class UserRegistrationFormType extends AbstractType
	{
	... lines 18 - 44
		public function configureOptions(OptionsResolver $resolver)
		{
			$resolver->setDefaults([
				'data_class' => UserRegistrationFormModel::class
			]);
		}
	}

	src/Controller/SecurityController.php
	... lines 1 - 15
	class SecurityController extends AbstractController
	{
	... lines 18 - 45
		public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, LoginFormAuthenticator $formAuthenticator)
		{
	... lines 48 - 50
			if ($form->isSubmitted() && $form->isValid()) {
				/** @var UserRegistrationFormModel $userModel */
				$userModel = $form->getData();
	... lines 54 - 72
			}

	Validation Constraints
	class UserRegistrationFormModel
	{
		/**
		 * @Assert\NotBlank(message="Please enter an email")
		 * @Assert\Email()
		 */
		public $email;
		
	#src/Form/Model/UserRegistrationFormModel.php
	... lines 1 - 4
	use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
	... lines 6 - 7
	/**
	 * @UniqueEntity( //ERROOOOOOOOR because this class is not entity ,Solution: custom validator next.
	 *     fields={"email"},
	 *     message="I think you're already registered!"
	 * )
	 */
	class UserRegistrationFormModel

34.Custom Validator
	php bin/console make:validator
	#src/Validator/UniqueUser.php
	... lines 1 - 6
	/**
	 * @Annotation
	 */
	class UniqueUser extends Constraint
	{
		/*
		 * Any public properties become valid options for the annotation.
		 * Then, use these in your validator class.
		 */
		public $message = 'The value "{{ value }}" is not valid.';
	}
	#src/Validator/UniqueUserValidator.php
	... lines 1 - 7
	class UniqueUserValidator extends ConstraintValidator
	{
		public function validate($value, Constraint $constraint)
		{
			/* @var $constraint App\Validator\UniqueUser */
			$this->context->buildViolation($constraint->message)
				->setParameter('{{ value }}', $value)
				->addViolation();
		}
	}
	#src/Form/Model/UserRegistrationFormModel.php
	... lines 1 - 4
	use App\Validator\UniqueUser;
	... lines 6 - 7
	class UserRegistrationFormModel
	{
		/**
	... lines 11 - 12
		 * @UniqueUser()
		 */
		public $email;
	... lines 16 - 26
	}
	# src/Validator/UniqueUser.php
	... lines 1 - 6
	/**
	... line 8
	 * @Target({"PROPERTY", "ANNOTATION"})
	 */
	class UniqueUser extends Constraint
	
35.Setup: For Dependent Select Fields
	This is called a "dependent form field"
	
36.Form Events & Dynamic ChoiceType choices
	#src/Form/ArticleFormType.php
	... lines 1 - 24
		public function buildForm(FormBuilderInterface $builder, array $options)
		{
	... lines 27 - 52
			if ($location) {
				$builder->add('specificLocationName', ChoiceType::class, [
					'placeholder' => 'Where exactly?',
					'choices' => $this->getLocationNameChoices($location),
					'required' => false,
				]);
			}
	... lines 60 - 65
		}
	#templates/article_admin/_form.html.twig
	{{ form_start(articleForm) }}
	... lines 2 - 6
		{%  if articleForm.specificLocationName is defined %}
			{{ form_row(articleForm.specificLocationName) }}
		{% endif %}
	... lines 10 - 15
	{{ form_end(articleForm) }}

37.Dynamic Form Events
38.PRE_SET_DATA: Data-based Dynamic Fields
39.
40.
41.


III-Doctrine & the Database
1.Installig doctrine
	> composer require doctrine
	> php bin/console doctrine:database:create
2.Creating an Entity Class
	ORM = Object Relational Mapper
	> php bin/console make:entity
	google : doctrine annotations reference : all annotations
3.Database Migrations
	> php bin/console make:migration
	> php bin/console doctrine:migrations:status
	* @ORM\Column(type="string", length=100, unique=true)
4.Saving Entities
	> php bin/console debug:autowiring // to search entity manager
	> php bin/console doctrine:query:sql "SELECT * FROM article"
5.Querying for Data!
	findAll
	findBy
	findOneBy
	$article = $repository->findOneBy(['slug' => $slug]);
	if (!$article) {
		throw $this->createNotFoundException(sprintf('No article for slug "%s"', $slug));
	}
6.Fun with Twig Extensions!
	I'll call it AppExtension because I typically create just one extension class that will hold all of the custom Twig functions and filters that I need for my entire project.	
	php bin/console make:twig-extension
	class AppExtension extends AbstractExtension
	{
		public function getFilters(): array
		{
			return [
				new TwigFilter('cached_markdown', [$this, 'processMarkdown'], ['is_safe' => ['html']]), // when you say is_safe set to html: It tells Twig that the result of this filter should not be escaped through htmlentities().
			];
		}
	... lines 17 - 21
	}	
7.ago Filter with KnpTimeBundle
	>composer require knplabs/knp-time-bundle
	{{ article.publishedAt ? article.publishedAt|ago : 'unpublished' }}
8.Service Subscriber: Lazy Performance
Instead adding the service in construct for performance we can do this:
	#src/Twig/AppExtension.php
	... lines 1 - 4
	use App\Service\MarkdownHelper;
	... lines 6 - 11
	class AppExtension extends AbstractExtension implements ServiceSubscriberInterface
	{
	... lines 14 - 34
		public static function getSubscribedServices()
		{
			return [
				MarkdownHelper::class,
			];
		}
		public function processMarkdown($value)
		{
			return $this->container
				->get(MarkdownHelper::class)
				->parse($value);
			
		}
  // we can also alias the service	
		public static function getSubscribedServices()
		{
			return [
				'foo' => MarkdownHelper::class,
			];
		}
9.All about Entity Repositories
	#Controller:
	class ArticleController extends AbstractController
	{
	... lines 18 - 30
		public function homepage(EntityManagerInterface $em)
		{
			$repository = $em->getRepository(Article::class);
			$articles = $repository->findAll();
	... lines 35 - 38
	
	$articles = $repository->findBy([], ['publishedAt' => 'DESC']);
	#Repository:
	class ArticleRepository extends ServiceEntityRepository
	{
	... lines 17 - 21
	//    /**
	//     * @return Article[] Returns an array of Article objects
	//     */
		/*
		public function findByExampleField($value)
		{
			return $this->createQueryBuilder('a')
				->andWhere('a.exampleField = :val')
				->setParameter('val', $value)
				->orderBy('a.id', 'ASC')
				->setMaxResults(10)
				->getQuery()
				->getResult()
			;
		}
		*/
		/*
		public function findOneBySomeField($value): ?Article
		{
			return $this->createQueryBuilder('a')
				->andWhere('a.exampleField = :val')
				->setParameter('val', $value)
				->getQuery()
				->getOneOrNullResult()
			;
		}
		*/

10.Custom Queries
	I recommend andWhere(), because where() will remove any previous where clauses you may have added
	Oh, and what the heck does the a mean? Think of this as the table alias for Article in the query - just like how you can say SELECT a.* FROM article AS a.
	
    public function findAllPublishedOrderedByNewest()
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.publishedAt IS NOT NULL')
            ->orderBy('a.publishedAt', 'DESC')
... lines 30 - 31
        ;
    }
//To get result:
	->getQuery()
	->getResult() OR ->getOneOrNullResult()    
//call:
	class ArticleController extends AbstractController
	... lines 18 - 31
		public function homepage(ArticleRepository $repository)
		{
			$articles = $repository->findAllPublishedOrderedByNewest();

//This works for a simple reason: all of your repositories are automatically registered as services in the container. So you can autowire them like anything else. This is how I actually code when I need a repository.

11.Query Logic Re-use & Shortcuts
	//add to query builder
    private function addIsPublishedQueryBuilder(QueryBuilder $qb)
    {
        return $qb->andWhere('a.publishedAt IS NOT NULL');
    }
    //
    public function show(Article $article, SlackClient $slack)
    //In other words, to use this trick, your routing wildcard must be named the same as the property on your entity, which is usually how I do things anyways. It executes the exact same query that we were doing before by hand! If there is not a slug that matches this, it also automatically throws a 404, before the controller is ever called.
	//I didn't read this:
	In fact, try that - put in a bad slug. Yep, error! Something about the Article object not found by the @ParamConverter annotation. So, that's not a great error message - it makes more sense if you know that the name of this feature internally is ParamConverter.

	So... yea! If you organize your route wildcards to match the property on your entity, which is a good idea anyways, then you can use this trick. If you need a more complex query, no problem! You can't use this shortcut, but it's still simple enough: autowire the ArticleRepository, and then call whatever method you need.	
12.Updating an Entity with New Fields
	php bin/console make:entity
	php bin/console make:migration
	php bin/console doctrine:migrations:migrate
13.Updating an Entity
	//ajax call to api
	$(document).ready(function() {
		$('.js-like-article').on('click', function(e) {
			e.preventDefault();
			var $link = $(e.currentTarget);
			$link.toggleClass('fa-heart-o').toggleClass('fa-heart');
			$.ajax({
				method: 'POST',
				url: $link.attr('href')
			}).done(function(data) {
				$('.js-like-article-count').html(data.hearts);
			})
		});
	});	
14.Fixtures: Seeding Dummy Data!
	>composer require orm-fixtures:3.0.2 --dev
	>php bin/console make:fixtures
	>ArticleFixtures

	class ArticleFixtures extends Fixture
	{
		public function load(ObjectManager $manager)
		{
			$article = new Article();
			$article->setTitle('Why Asteroids Taste Like Bacon')
				->setSlug('why-asteroids-taste-like-bacon-'.rand(100, 999))
				->setContent(<<<EOF
	Spicy **jalapeno bacon** ipsum dolor amet veniam shank in dolore. Ham hock nisi landjaeger cow,
	EOF
			);
			// publish most articles
			if (rand(1, 10) > 2) {
				$article->setPublishedAt(new \DateTime(sprintf('-%d days', rand(1, 100))));
			}
			$article->setAuthor('Mike Ferengi')
				->setHeartCount(rand(5, 100))
				->setImageFilename('asteroid.jpeg')
			;
			$manager->persist($article);
			$manager->flush();
		}
	}
	
	>php bin/console doctrine:fixtures:load

	Adding the createMany Method to Fixtures: class FixtureBase abstract extends Fixture ...
	https://symfonycasts.com/screencast/symfony-doctrine/fixtures#play
	
15.Using Faker for Seeding Data
	//generating data with special bundle called "faker"
	> composer require fzaninotto/faker --dev
	
16.Sluggable & other Wonderful Behaviors
	But, really, shouldn't the slug be generated from the title?
	>composer require stof/doctrine-extensions-bundle
	Doc : https://github.com/Atlantic18/DoctrineExtensions/tree/v2.4.x/doc
	Contrib Recipes
		But! It says that the recipe for this package comes from the "contrib" repository, which is open to community contributions. Symfony has two recipe repositories. The main repository is closely controlled for quality. The second - the "contrib" repository - has some basic checks, but the community can freely contribute recipes. For security reasons, when you download a package that installs a recipe from that repository, it will ask you first before installing it. And, there's a link if you want to review the recipe.	
	#packages/stof_doctrine_extensions.yaml:
		stof_doctrine_extensions:
			default_locale: en_US
			orm:
				default:
					sluggable: true	
	#src/Entity/Article.php
	... lines 1 - 5
	use Gedmo\Mapping\Annotation as Gedmo;
	... lines 7 - 10
	class Article
	{
	... lines 13 - 24
		/**
	... line 26
		 * @Gedmo\Slug(fields={"title"})
		 */
		private $slug;
	>php bin/console doctrine:fixtures:load // reset slugs
	Hello Doctrine Events
		 the sluggable features works by adding an event listener that is called right before saving, or "flushing", any entity.

17.When Migrations Fail
	$this->addSql('UPDATE article SET created_at = NOW(), updated_at = NOW()');
	php bin/console doctrine:database:drop --force
18.Activating Timestampable
	When using datetime and migration fails and we want to automatise 17.When Migration Fail, we use a doctrine fixture: 
		https://symfonycasts.com/screencast/symfony-doctrine/timestampable#play
