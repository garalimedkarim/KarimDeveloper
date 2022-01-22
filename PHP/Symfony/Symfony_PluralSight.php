<?php

I-Building your first Symfony App:
1.Welcome to Symfony:
	new things in PHP: namespaces,composer
	Symfony Vs Silex: use them both because they use the same peaces.
	We can use a component from zend framework

2.Downloading & Configuration:
	Composer = PHP package manager
	>php composer.phar create-project symfony/framework-standard-edition starwarevents @stable
	vendor=a bunch thrid-party libraries
	>php app/console server:run

	First Problem:
	app/cache && app/log => We need to be writable by terminal user and web server user(like www-data)

	Bundles activated in AppKernel and configured in app/config/config.yml

	Delete the Acme Bundle repository + AppKernel line + routing

3.Bundles of Joy!:
	app/console generate:bundle	
	vendorName/BundleName

4.Routing: The URLs of the World:
	routing.yml:
	resource = include
	@bundle => short cut proposed by Symfony to make life easier
	path<=>pattern: /hello/{name}
	controller = function that builds a page

	Controller url params by name => order not problem but name must be the same in the route path and in the controller

	>app/console router:debug => see the url lists

5.Controllers: Get to Work!
	return JSON response:

	$response=new Response(json_encore($simpleArray));
	$response->headers->set('Content-type','application/json');
	browser:Network:Headers:ResponseHeaders

	Service = PHP Class
	Service container
	service access:
	$templating = $this->container->get('templating');
	//approach1:
	$content = $templating->render(
		'Bundle:Default:index.html.twig',
		array('name' => $name)
	);
	return new Response($content);
	//approach2
	$content = $templating->renderResponse(
		'Bundle:Default:index.html.twig',
		array('name' => $name)
	);
	//approach3:
	//you can open Controller source file:
	$this->render(
		'Bundle:Default:index.html.twig',
		array('name' => $name)
	);

	container:debug //to see every service

6.Twig:
	{##} 
	{{}} tag
	{%%} setting variable,looping
	Doc: Twig Docs (filters,tags,functions,operators,tests)

	BundleName:SubDirecory:template.html.twig
	for the base no bundle no subdirectory => ::template.html.twig
	=> app/ressources/views

7.Databases and Doctrine:
	Doc: doctrine

	doctrine:generate:entity

	//debugging trick: console.log response before its rendering
	1)cp web/app_dev.php to the root of the project with name play.php
	2)remove the IP protection
	3)delete three lines
	>php play.php

8.Inserting and Querying Data:
	#play.php:
	use namespaceOfEventEntity

	$event = new Event();
	$event->setX(Y);

	$em = $container->get('doctrine')->getManager();
	// inside a Controller we can do also: $this->getDoctrine->getManager(); 
	$em->persist($event);
	$em->flush();

	doctrine:database:create
	doctrine:schema:create
	doctrine:query:sql "select * from event"
	doctrine:schema:update 
	doctrine:schema:update --dump-sql
	doctrine:schema:update --force

	$repo = $em->getRepository('BundleName:repoName');
	$event = $repo->findOneBy(array('name'=>''));

	profiler=>number of req runned and what are them

9.Virtual Host Setup Extravaganza
10.Code Generation FTW!:
	doctrine:generate:crud
	router:debug

11. Less Ugly with CSS and JavaScript:
	+++toWatchLater+++

12.Friendly Links and Dates in Twig
13.Adding Outside Bundles with Composer
	knpbundles.com: => bundle list
	#composer.json:
	add to require :
	"doctrine/doctrine-fixtures-bundle":"dev-master",

	you can find any PHP library in packagist.org
	We used that to get the stable version for our new outside bundle, so finally we add to require :
	"doctrine/doctrine-fixtures-bundle":"~2.2.0",

	Composer/Doc/basic Usage/package versions: ~ means 2.2.*

	>php composer.phar update doctrine/doctrine-fixtures-bundle

	>composer update: 
		Reads composer.json and try to get the last version of library with ~ and finally generates composer.lock
	>composer install:
		ignore composer.json and read from the static file composer.lock
		
	So we use every time composer install 
	When we want to update some library we use composer update

14.Fixtures: For some dumb dat
	Continue installing the bundle like Documentation in Knpbundles
	now we add it into AppKernel
	>php app/console doctrine:fixtures:load --help

	in our bundle:
	create #DataFixtures/ORM/LoadEvents.php
	copy content from documentation
	the function load(ObjectManager $manager) creates two events instances and persists them.

15.Autoloading: Where Did require/include Go?
	+++Rate+++

16.Do Less Work in the Controller
	//SensioFrameworkExtraBundle
	using @Template,@Route

17.Twig Mind Tricks
	super array:
	{{app.request.host}}
	app.session.get('some');

	check globalVariables
	{% if(block('title')) %}

	{{- var -}}: eliminate whitespaces

	II-Security, Registration and Forms:
	1.Introduction:
	Security/Forms/Doctrine

	2.Security Fundamentals:
	Security component very powerful : it s complex
	We can connect from FB,Twitter,anywhere

	Security is two parts : Authentification + Authorization
	1)Authentification:
		checks User s credentials : Identication informations
		it s job not to restrict access but just to know who you are
	=>Authentification = Proving who you are and getting a token.
	2)Authorization:
	Asking: hey system this is my token, do I have access in this room?
	Authorization: deciding no or yes!

	1)Authentification:
	the security config lives entierly in the app/config/security.yml which is imported by config.yml
	#app/config/security.yml:
	firewalls:
		//delete all other firewalls
		secured_area:
			//replace the pattern
			pattern: ^/
			form_login:
				check_path: _security_check
				login_path: _demo_login
			logout:
				path: _demo_logout
				target: _demo
			//uncomment:
			anonymous: ~

	Anonymous Users are now authenticated since they pass our firewall
	Toolbar app_dev.php : red=> not authenticated, green=>authenticated

	Firewall is about knowing who you are not denying access.

3.Authorization with Access Control:
	Before keep going with Authentification let try our first peace of Authorization and start denying access:
	The easiest way to deny access is via the access_control section:
	{path: ^/login, roles: IS_AUTHENTICATED_ANONYM, requires_channel:https},
	{path: ^/new, roles: ROLE_USER},
	So its redirects you to the login_path in secrity.yml

	Doc: Secrity: Access Control

4.Creating a Login Form (Part 1):
	We have to use FOS User Bundle but let s create our own authentication Bundle Manually:

	#UserBundle:
	#UserBundle/UserBundle.php
	#UserBundle/Controller/SecurityController.php:
		namespace Yoda\UserBundle\Controller
		use Symfony\...\Controller
		use Sensio\...\Route //SensioFrameworkExtraBundle by default preinstalled in our project
		
		class SecurityController extends Controller{
			/**
			 * @Route("/login",name="login_form")
			 */
			public function loginAction(){
				
			}
		}
	#routing global:
		user_controller:
			resource: "@UserBundle/Controller"
			prefix: /
			type: annotation

	Docs :Security: login form
	copy loginAction into our Controller and add import different use.
	use @Template() annotation and return just an array with vars to pass to the template the render is done automatically

5.Creating a Login Form (Part 2):
	#UserBundle/Ressources/views/Security/login.html.twig
	copy template from the docs also: login.html.twig

	#UserBundle/Controller/SecurityController.php:
	1)modify the 2 login url into security with name of our two routes url login and check
	//add the action url of login form:
		/*
		 * @Route("/login_check",name="login_check")
		 */
		public function loginCheckAction(){
			//will never be executed, Symfony intercept this URL
		}
	But how its connected:
		Actually the users are just being loaded directly from security.yml. (users in memory)

6.Logging out and Cleaning Up
	#security.yml
		logout:
			path: logout # route name
			target: event #homepage
	#UserBundle/Ressources/views/Security/login.html.twig:
		/*
		 * @Route("/logout",name="logout")
		 */
		public function logoutAction(){
			//will never be executed, Symfony intercept this URL
		}

	Translations:
	1)activate translations in app/config.yml:
		//uncomment it
	2)use trans filter:
		{{error.message|trans}}
	3)create translation file:
		#app/Ressources/translations/messages.en.yml:
		"Bad Credentials" : "Wrong password"

7.Twig Security and IS_AUTHENTICATED_FULLY:
	{% if is_granted('IS_AUTHENTICATED_REMEMBERED') %}
		<a class="link" href="{{path("logout")}}">Logout</a>
	{% endif %}

	Symfony has 3 Security Checks:
	1.IS_AUTHENTICATED_REMEMBERED: 
		All users already logged in
		They may logged in during the session or by having a remember me cookie
	2.IS_AUTHENTICATED_FULLY: 
		Only users logged in during this session
	3.IS_AUTHENTICATED_ANONYMOSLY: 
		gived for all users even if you are not logged in
	{% if is_granted('IS_AUTHENTICATED_REMEMBERED') %}
		<a class="link" href="{{path("logout")}}">Logout</a>
	{% else %}
		<a class="link" href="{{path("login_form")}}">Login</a>
	{% endif %}

8.Denying Access: AccessDeniedException:
	in access control:
		//change roles of /new to ROLE_ADMIN
		- {path: ^/new, roles:ROLE_ADMIN}
	=> Access Denied page, we are authenticated but not authorizated to this url

	//commenting access control in security.yml
	We are going to put security in the controller class instead:

	public function newAction(){
		$this->enforceUserSecurity();
		//trait
	}

	private function enforceUserSecurity(){
		$securityCotnext = $this->get("security.context");
		if(! $securityCotnext->isGranted("ROLE_ADMIN") )
			throw new AccessDeniedException('Need Admin Role');
	}

	#DOC: Authentificate Users by API keys

9.Entity Security:
	lets load users from the database instead of the list in security.yml
	1)create User Entity in UserBundle:
		generate User entity:
			>doctrine:generate:entity 
		usename,password
	2)class User implements UserInteface{
		//this interface requires 5 methods:
			getUsername
			getPassword
			getRoles(){
				return array('ROLE_USER');
			}
			eraseCredentials(){
				//
			}
			getSalt(){
				return null
			}
	3) doctrine:schema:update --force
	4) #security.yml
		security:
			encoders:
				Yoda\UserBundle\Entity\User: bcrypt
				//if PHP lower then 5.4 : > composer require ircmaxell/password-compat
				//composer update
				
			providers:
				our_db_users:
					entity: { class: UserBundle: User, property: username }
					
10.Saving Users:
	1)Copy DataFixtures folder in UserBundle:
	#DataFixtures/ORM/LoadUsers.php:
	class LoadUsers implements FixtureInterface{
		public function load(ObjectManager $manager){
			//creation d'un nouveau user + flush
			//just for the pwd:
			$user->setPassword($this->encodePassword($user,'0000');
		}
	} 
	2)injecting container in the LoadUsers Class:
	just make the class implements also ContainerAwareInterface
	and add function setContainer(ContainerInterface $container= null)
		$this->container = $container;
	>app/console container:debug 

	3)create a helper function encodePassword(){
		$encoder=$this->container->get('security.encoder_factory')->getEncoder($user);
		return $encoder->encodePassword($plainPassword,$user->getSalt())
		
	>app/console doctrine:fixtures:load
	>app/console doctrine:query:sql "Select * from User"
	
11.Adding Dynamic Roles to Each User:
	1)add field to UserEntity:
	/*
	 * @ORM\Column(name="roles",type="json_array")
	 */
	private $roles=array();
	//---
	public getRoles(){
		return $this->roles
	}
	public setRoles(){
		$this->roles = $roles;
		return $this;
	}
	>doctrine:schema:update --force
	2)DataFixture
	create a second user and setRoles(array('ROLE_ADMIN')
	app/consle doctrine:fixtures:load
	3)add field to UserEntity:
	/*
	 * @ORM\Column(name="is_acive",type="boolean")
	 */
	private $isActive = true;
	4)implements AdvancedUserInterface instead of UserInterface to make isActive works 
	AdvancedUserInterface requires 4 additional methods:
	isAccountNonLocked
		return true
	isAccountNonExpired
		return true
	isCredentialsNonExpired
		return true
	isEnabled
		//return true
		return $this->getIsActive();

12.Repository Security
	lets have our users	provides an email and let them login using it or username
	1)add field to UserEntiy:
	//@ORM\Column(name="email",type="string",length=255)
	$private email;
	generate getter & setter with : >doctrine:generate:entities --no-backup
	update schema
	2)We have fixed the property to login user on security.yml to username
	but we can make it more flexible in Repository level:
	#UserRepository:
	where the findUser live ? in EntityRepository which is extended by repositories
	repository is mentionned in the top of the entity with repositoryClass=""
	All our query logic should live inside repositories.

13.Doctrine s QueryBuilder
	1)add to UserRepository a custom function
	public function findOneByUsernameOrEmail($username){
		//$dql = "SELECT u FROM UserBundle:User u";
		return $this->createQueryBuilder('u')
			->andWhere('u.username= :username OR u.email :email')
			->setParameter('username',$username)
			->setParameter('email',$username)
			->getQuery()
			->getOneOrNullResult();
			
	}

14.The UserProvider: Custom Logic to Load Security Users
	1)lets remove the username from #security.xml providers:...
	=> login try: Error : UserRepository must implement UserProviderInterface:
	2)class UserRepository extends EntityRepository implements UserProviderInterface{
	//this interface requires 3 methods:
	refreshUser
	supportsClass
	loadUserByUsername //Symfony call it when logging
	copy them from the Docs	
	}
	function loadUserByUsername($username){
		$user = $this->findOneByUsernameOrEmail($username);
		if(!$user)
			throw new UsernameNotFoundException('No User found '.$username);
	}

15.User Serialization
1)make UserEntity implments \Serialize:
//this interface requires 2 methods:
serialize()
	return serailize(array(
		$this->id,
		$this->username,
		$this->password
	));
unserialize($serialized)	
	return list(
		$this->id,
		$this->username,
		$this->password
	) = unserialize($serialized);

Serialization: convert object to stream
Deserialization: reconstructing an object that has been serialized before

16.Registration Form
	1)Create new Controller/RegisterController.php

	class RegisterController extends Controller{
		/*
		 * @Route("/register",name="user_register")
		 * @Template()
		 */ 
		public registerAction(){
			//create a form by form builder
			$form = $this->createFormBuilder()
				->add("username",'text')
				->add('email','text')
				->add(//pwd
				->getForm();
				
			return array('form' => $form);
		}
	}

17.Form Rendering

CSRF attacks

18.Using More Fields: email and repeated:
Repeatpassword field using repeated

19.Handling Form Submissions
20.Form: Default Data
	$form = $this->createFormBuilder(null,array('data_class' => 'Yoda\UserBundle\Entity\USer'));
	//this allow us to do when the form is submitted:
	$user = $form->getData();
	#error : null must be also a user instance so finally
	//create a user and pass it to :
	$form = $this->createFormBuilder($user,array('data_class' => 'Yoda\UserBundle\Entity\USer'));
	
21.Cleaning up with a plainPassword Field:
	good practise to create a plainPassword var without having to persist in the DB: temporairy variable for registration:
	private $plainPassword;
	//getter and setter
	//updating one of our methods:
	eraseCredentials()
		$this->setPlainPassword(null);
	//update the form from password to plainPassword
	//also in the template

22.Using an External Form Type Class:
create a separate form builder:
#Form/RegisterFormType.php:
class RegisterFormType extends AbstractType
	getName()
		return 'user_register'; //returned in the form
	buildForm(FormBuilderInterface $builder, array $options)
		$builder->add
	setDefaultOptions(OptionsResolverInterface $resolver)
		$resolver->setDefaults(array(
			'data_class' => 'Yoda\UserBundle\Entity\USer'	
		));
#RegisterController.php
$form = $this->createForm(new RegisterFormType(),$user);		

23.Field Options HTLM5
<form novalidate="novalidate"></form>

24.Registration Validation
Form validation annotations
Callback Constraint: allows you to create a method inside your class that called during validation

25.Adding a Flash Message:
flash message, flashbag
//twig
	{% for msg in app.session.flashbag.get('success') %}
		{{msg}}
	{%endfor%}
	
III-Doctrine Relationships & the Dependency Injection Container:
1.Intro
	ManyToOne
	ManyToMany
	Life Cycle Callback
	Event Listeners

2.Doctrine Relationship
	Many Event to One User
	1) Add field to EventEntity: 
	/*
	 * @ORM\ManyToOne(targetEntity="Yoda\UserBundle\Entity\User")
	 */
	private $owner
	//getter and setter
	>doctrine:schema:update --dump-sql //to see changes before updating DB 
	2)Optionnaly we can add JoinColumn to control some DB options
	/*
	 * @ORM\ManyToOne(targetEntity="Yoda\UserBundle\Entity\User")  
	 * @ORM\JoinColumn(onDelete="CASCADE") //when delete User delte all his events
	 */ 
	3)option in opposite directon: just for information not apply it in our situation
	 * @ORM\ManyToOne(targetEntity="Yoda\UserBundle\Entity\User", cascade={'remove'})  //when delete event it delete its owner User on cascade which is not our bihaviour
	>doctrine:schema:update --dump-sql //to see changes before updating DB 
	>doctrine:query:sql "select * from event"

3.Sharing Data Fixtures
	User:Fixtures Class
	1)add OrdredFixtureInterface in implements
	//require one method getOrder
	getOrder()
		return 10

	Event:Fixtures Class
	2)add OrdredFixtureInterface in implements
	//require one method getOrder
	getOrder()
		return 20//runs second after User
	3)in Event:Fixture Class
	//load a User
	$karim = $manager->getRepository('UserBundle:User')->findOneByUsernameOrEmail('karim');
	//assign the User in the events created $event->setOwner($karim)
		>doctrine:query:sql "select * from event"

4.Event Edit Security
	#EventController
	private function enforceOwnerSecurity(Event $event){
		$user = $this->getUser();
		if( $user != $event->getOwner() ){
			throw new AccessDeniedException("You don't own this");
		}
	}
	//add it in edit delete actions

	#show.html.twig:
	{% if app.user == event.owner %}
		<a href="{{path('/{id}/edit',{'id':entity.id} )}}">edit</a>
	{% endif %}
	
5.Base Controller
	getting security.context service requires too much typing, so lets make some aprovements so we can get things done faster.

	create a file EventBundle/Controller/Controller.php
	#EventBundle/Controller/Controller.php:
	namespace Yoda/EventBundle/Controller; //like the rest of the Controllers
	use Symfony/Bundle/FrameworkBundle/Controller/Controller as BaseController; //to not confuse with our Classname

	class Controller extends BaseController{
		public function getSecurityContext(){
			return $this->container->get('security.context');
		}
	}

	Now delete the use Symfony/.../Controller from all the rest of controllers and since we created a Controller Class in this namespace so, it s available for all namespace s Classes.
	Now change $this->get('security.context') by $this->getSecurityContext()
	We can also use this Controller in other bundle by using it but we must make use in this case because we are not in the same namespace

6.PHPDoc Autocomplete
+++Raté+++

7.Doctrine Inverse Relation
	1)add field to User 
	/*
	 * ORM\OneToMany(targetEntity="Yoda\EventBundle\Entity\Event", mappedBy="owner")
	 */ 
	private $events
	//getter Only
	2) add inversedBy="events" above the $owner property into EventEntity.

	We will always need to specify the owning side of a relationship
	The OneToMany of relationship is always optional and use mappedBy
	the setEvents on the UserController is ignored when adding events (it s the optional side )
	
8.Doctrine Extensions
knpbundles:  We Install StofDoctrineExtensionsBundle:
Intall bundle always three steps: (look the doc of the bundle)
1)php composer require creator/library-name
2)add the bundle to the AppKernel like mentioned in the doc of the bundle
3)#config.yml: configure the bundle by reading the few lines of readme
stof_doctrine_extensions:
	orm:
		defaults: ~
		
---RATE---

9.Slug URL
--RATE---

10.Timestampable
--Rate---
