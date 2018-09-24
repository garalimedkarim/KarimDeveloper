Architecture:
*How to Override Symfony's default Directory Structure:
	https://symfony.com/doc/3.4/configuration/override_dir_structure.html#override-web-dir



<?php

$I_Install_PHP
$II_Install_Composer: (directly from the website : getcomposer)
	install locally or globally => locally for each project we have to go get composer and tape the 4 commands to get it in our Directory.
	
$III_Install_Symfony_Installer: (compatible only with symfony2/3, for symfony4 we use composer to create our projects)
	symfony.com/download
	shoose symfony3
	=>"First, install the Symfony Installer" link to symfony installer

	>symfony new my_project 3.4
	Test:
	>php bin/console server:start
	
$IV_Deploy_on_Heroku:
	#Install Heroku:
		https://devcenter.heroku.com/articles/getting-started-with-php#set-up
	#Deploy Symfony on heroku:
		https://devcenter.heroku.com/articles/getting-started-with-symfony
		https://symfony.com/doc/3.4/deployment/heroku.html

//--- 

#Traversy Media Youtube Tutorial:


#Course1: Udemy : Learn Symfony 3 framework by practical examples :
I-Introduction:
1.Tools and requirements:
2.Introduction:

II-Introduction to Symfony:
1.Installing and Configuring the framework:

2.Build-in web-server:
	php/bin console server:start => PHP Build-in server starts
3.Web server configuration:
  //Create Symfony Directory under /var/www
    sudo mkdir /var/www/html/Symfony
  //Create a symbolic link to Desktop project:
	//ln -s <real folder> <link folder>
    sudo ln -s /home/karimengineer/Desktop/Symfony/tutoSymfony/ .
  //Install apache2
    sudo apt-get install apache2
    Test: browser link localhost => apache default page => OK
  //Create a Virtual Host:
  1) sudo vi /etc/hosts
	  127.0.0.1		iheb.system
	  =>Test sur browser iheb.system => apache2 default page.
  2) create virtaul host file: 
	cd /etc/apache2/sites-available/
	sudo cp 000-default.conf iheb.system.conf
	sudo vi iheb.system.conf
		<VirtualHost *:80>
			ServerName www.iheb.system
			ServerAlias iheb.system
			ServerAdmin webmaster@localhost
			DocumentRoot /var/www/html/Symfony/tutoSymfony/web


			ErrorLog ${APACHE_LOG_DIR}/iheb_error.log
			CustomLog ${APACHE_LOG_DIR}/iheb_access.log combined
		</VirtualHost>
  3) Enable virtual host
	sudo a2ensite iheb.system.conf
  4) Reload Apache
	sudo service apache2 restart
	
  5) Test:
    browser : iheb.system => OK
  
  6) Recommendation:
		test iheb.system/config.php to see errors:
		Red errors must been resolved before starting development
		Green are just recommendations
		
Bugs:
Symfony 3.4: 
	#app_dev.php & app.php: comment this line
		//$kernel->loadClassCache(); 

	#var/logs => problem
		chmod -R 777 var/ (my solution)

4.Directory Structure:
  app/ => contains all configurations
	config/ => routing,services & security configuration 
    Ressources/ => views & assets
    .htaccess
    AppCache.php
    AppKernel.php => register bundles + we can customise rootDir,cacheDir,logDir
    autoload.php
  bin/
	console
	symfony_requirements => run this script => check symfony is ready to run projects
  src/
    AppBundle/
    .htaccess
  tests/
  var/
    cache/
    logs/
    sessions/
  vendor/
  web/ => our server points to here
    bundles/ => bundles assets
    .htaccess
    app.php
    app_dev.php
    config.php => check the configuration of your setup
  .gitignore
  composer.json => used when running composer update
  composer.lock => used when running composer install
  
5.Application environments:
  Symfony have three pre-defined environnements => dev,prod & test
  => config/config_dev.yml, config_prod.yml, config_test.yml
  => config/routing.yml , routing_dev.yml
  => web/app.php & app_dev.php
  app_dev.php => accessible only from the localhost
  
  
6.Request and Response objects:

7.Symfony console:
  php bin/console 
  php bin/console cache:clear --help => options

III-Bundles:
1.AppBundle:
2.Generate and wire a custom bundle:
  php bin/console generate:bundle
  shared option => You want to use this bundle in other Applications ? default no.
  BundleName: CarBundle
  Directory: src/
  Config format: annotation
  
  #Bug correction:
	$this->render('@Car/Default/index.html.twig');
  #Bung 2: //autoload:
    // modifyin psr-4 to this: 
	"autoload": {
	"psr-4": {
		"": "src/"
	},

3.Third party bundle
  php composer.phar require knplabs/knp-menu-bundle "^2.0"
  #Bug Composer:
	sudo chown -R karimengineer /home/karimengineer/.composer/cache/files/
	sudo chown -R karimengineer /home/karimengineer/.composer
	php composer.phar require knplabs/knp-menu-bundle "^2.0"
	
IV-Lets code:
1.Use bootstrap as main theme:

2.Controllers and template inheritance:

3.View, layout and blocks:

4.Twig:

5.Connect the View with Controller:

V-Databases & Doctrine:
1.Configure and create database:
  app/config/parameters.yml
  app/config/config.yml
  doctrine:database:create
  doctrine:database:drop

2.What is an Entity:

3.Generate Entity:
  doctrine:generate:entity
  doctrine:schema:update --force
  
4.What is a Repository:
  class CarRepository extends \Doctrine\ORM\EntityRepository
5.Get some data from database:
	+        $carRepo = $this->getDoctrine()->getRepository('CarBundle:Car');
	+        $cars = $carRepo->findAll();
	//--
	+        $carRepo = $this->getDoctrine()->getRepository('CarBundle:Car');
	+        $car = $carRepo->find($id);
	//--
	<a href="{{ url("car_show",{id:car.id}) }}">

6.Extend and update existing Entity:
	bin/console doctrine:generate:entities -h
	bin/console doctrine:generate:entities CarBundle:Car
	doctrine:schema:update --force
	
7.Define One To Many Relation:

8.Lazy Loading and Proxy objects:
	Doctrine is using lazy loading by default.
	
9.Query profilling - create custom queries with join clause:
	Query Build
	Profile queries : show queries executed using profile
	use Repository with custom query defintion
	use joins in Doctrine queries
	
	class CarRepository extends \Doctrine\ORM\EntityRepository
	{
		public function findCarsWithDetails(){
			$qb = $this->createQueryBuilder('c');
			$qb->select('c','mark','model');
			$qb->join('c.mark', 'mark');
			$qb->join('c.model', 'model');
			return $qb->getQuery()->getResult();
		}

		public function findCarWithDetailsById($id){
			$qb = $this->createQueryBuilder('c');
			$qb->select('c','mark','model');
			$qb->join('c.mark', 'mark');
			$qb->join('c.model', 'model');
			$qb->where('c.id = :id');
			$qb->setParameter('id',$id);
			return $qb->getQuery()->getSingleResult();
		}

	}
	
	
V-Form Basics:
1. Create simple Form
2. Submit and validate a format
3. Generate Form for entity
	doctrine:generate:form
4. Handle CRUD operations for entity
doctrine:generate:crud
@Template()
implement __toString
5. Customize Form and add Validation rules


VI-Service Container:
1.How To define a service:
	locally|globally:
	How to create service
	How to use it
	Flash message
	
2.How to pass a configuration parameter to the service:
	arguments
	
3.How to depend on antoher service:
	Inject a service in a service
	

VII-Console commands:
1.Generate console command:
	bin/console generate:command
	bin/console => see generated command
2.Access Service container in console command
	like in controller
	write output
3.Display progress of the command
	progress bar
	time left argument
4.How to define console command as a service:
	make command works like as a command and as service in the same time.

VIII-Testing your App

IX-Doctrine Fixtures:
1.Configure fixtures:
	install doctrine fixture bundle
	
2.Load Data
3.Sharing objects between fixtures:

#Course2: Symfony 3 : Acquérir les fondamentaux

I-Presentation de la Formation:
 PSR = BONNE PRATIQUE ET NORMALISATION
 PHP Avancee = systeme des classes
 Composer = gestionnaire de package et dependance pour PHP

II-Rappels sur PHP:
1-Types de Classes:
1.1 classe abstraite et classe final:
	Une classe abstraite est une classe contenant au moins une methode abstraite et ses Classes fille doivenet obligatoirement definir cette methode abstraite
	 
	abstract class Document{
		abstract public function getDatePublication();
	}
	
	Une classe final est une classe qui ne permet pas l heritage
	final class Numero{
	//---
	}
1.2 Interface
	Interface = ensemble de constantes + des methodes non defini mais non abstraite aussi
	PHP permet seulement l heritage d une seule classe = heritage simple 
	=> on peut implementer plusieurs interfaces.
	
	interface UserInterface{
		const APP_USER = true;
		public function login($id,$password);
	}
	
	class Personne implements UserInterface{
		
	}
	
	Une classe qui implemente une interface doit implementer tout ses fonctions
	
	How to acceed to Interface constant :
		echo UserInterface::APP_USER
	
1.3 Trait
	Trait = ensemble de fonctions definis deja qui peuvent etre utiliser dans le corps des class via use nomTrait1, nomTrait2
	
	trait Hello{
		public function sayHello(){
			echo 'Hello';
		}
	}
	
	class X{
		use Hello;
	}
	
	$c = new X();
	X->sayHello();
	
	Trait plus prioritaire que extends donc la methode de Trait surcharge la methode de extends sans erreurs par contre 2 methodes du meme nom dans deux trait déja on use provoque une erreur.
	Conclusion principe de SURCHARGE: 
		methode extends < methode trait < methode defini dans la class directement

2.Les methodes magiques:
	methodes __set($name,$value) et __get($name)
	permettent de declarer des nouveaux proprietes de façon fictif dans une instance d object
	$c->nouveauChamp = "nouveau"; //method __set est convoque
	echo $c->nouveauChamp; // method __get est convoque
	
	methodes __isset($name) et __unset($name)
	travaillent sur les proprietes de __set et __get.
	
	methode  __call($name,$arg) et static __callStatic($name,$arg)
	
	methode __sleep() et __wakeup() => serialization et deserialization
		$obj->serialize => call __sleep()
		$obj->deserialize => call _wakeup()
		
	methode clone()
		$obj = 	clone $obj; 
		//limitation clone ne fait pas la copie des propriete de type objet donc il faut les dupliquer manuellement dans le corps de clone sinon l'objet clone prendra les reference de l'objet initial comme ceci: 
		function __clone(){
			 $this->proprieteObjet1 = clone $this->proprieteObjet1;
			 $this->proprieteObjet2 = clone $this->proprieteObjet2;
		}

3.Les espaces de noms:
	namespace App\Dossier\sousDossier;
	un namespace par fichier
	namespace App\Dossier\sousDossier\Classe as C1;
	__NAMESPACE__ => variable PHP retourne le namespace actuel.
	apres avoir declarer le namespace :
		echo get_class($myClassInstance) //=> retourne le namespace\myClass
		
	namespace relatif vs absolu
		relatif doesn t begin with \ => 
			$c = new Tuto\Dossier1\Class1();
		absolu begin with \ =>
			$c = new \Tuto\Dossier1\Class2();
	
	dans le debut de l App la methode magique __autoload()
	Symfony n utilise pas cette fonction mail elle a developpé son propre composant autoload

4. PHP et PSR-x:
	PSR = PHP STANDARD RECOMMENDATION
	PHP-FIG = Framework Interop Group

	PSR-4 :
		namespace doit correspondre exactement a l arboresence de la Classe etc
	
	Symfony respect  PSR-0...12
	Doc PSR-x
		site www.php-fig.org/psr/psr-4

5. PHP et MVC:

III-Composer:
	Role: verifier recursivement que tout les dependances soit installé
	mv composer.phar /usr/local/bin/composer => globally
	composer install => travaille sur le fichier composer.json
	#composer.json minimal:
	{
		"require":{
			"monolog/monolog" : "1.0.*"
		}
	}

	nom du package : vendor/nomProjet
	
	composer install //=> composer.lock if exists else composer.json
	composer update //=> composer.json et genere composer.lock
	composer.lock //=> etat exacte des dependances actuellement
	
	installation d un package soit par composer require ou par composer update => mise du packet dans autoload section du composer.json
	
IV-Decouvrir Symfony:
1.Installation de Symfony
	#symfony_requirements script:
	Apres l installation executer le script symfony_requirements to see if symfony is correctly installed in my machien
	#php.ini & setting timezone:
	vi /etc/php7/cli/php.ini
		date.timezone = Europe/Paris
	#problem de privilege
		ls -al
		chown -Rv www-data:www-data myProject/

2.Architecture d un projet Symfony 3:

3.De Symfony 2 à Symfony 3:

V-Les Bundle:
1.Creer des modules fonctionnels pour Symfony:
	Bundle = unite fonctionnel





#---
#Integration de FOS User Bundle:

# Symfony security Component (security.yml) :
	providers => where to find user (memory,db,many db,etc ...) 
		 //How to Use multiple User Providers
	firewalls: main: => how the login should be asken ? (form,http basic,etc ...)
	encoders: which method to decrypt password, options
		Symfony\Component\Security\Core\User\User: plaintext // plain text => no decrypt
		FOS\UserBundle\Model\UserInterface: bcrypt // FOS USER BUNDLE method

	role_hierarchy: // => Inheritance between roles
		ROLE_ADMIN: ROLE_USER
		ROLE_SUPER_ADMIN: [ROLE_ADMIN,ROLE_ALLOWED_TO_SWITCH]
	
	Doc:
		https://symfony.com/doc/3.4/security.html
		
	The firewalls key is the heart of your security configuration.
		security:
			firewalls: ...
			dev: ...
	The dev firewall isn t important, it just makes sure that Symfony s development tools - which live under URLs like /_profiler and /_wdt aren t blocked by your security.
	
	//How to Restrict Firewalls to a Specific Request

	//Configuring how your Users will Authenticate (providers)
		The main job of a firewall is to configure how your users will authenticate. Will they use a login form? HTTP basic authentication? An API token? All of the above?
		1.HTTP basic authentication (the old-school prompt):
			firewalls:
				main:
					anonymous: ~
					http_basic: ~
	
	php bin/console doctrine:migrations:diff
	php bin/console doctrine:migrations:migrate


#Send Mail with Symfony with GMAIL:
	In my account Gmail : allow less secure apps to access your Gmail account.
	//parameters.yml:
		mailer_transport: gmail
	#    mailer_host: smtp.gmail.com
	#    mailer_port: 587
		mailer_user: tunisiewebpro@gmail.com
		mailer_password: KarimMahdi2017
	
	//config.yml:
		# Swiftmailer Configuration
		swiftmailer:
			transport: '%mailer_transport%'
		#    host: '%mailer_host%'
		#    port: '%mailer_port%'
			username: '%mailer_user%'
			password: '%mailer_password%'
		#    spool: { type: memory }	

	# FOS USER BUNDLE
	fos_user:
		db_driver: orm # other valid values are 'mongodb', 'couchdb' and 'propel'
		firewall_name: main
		user_class: AppBundle\Entity\User
		from_email:
			address: "%mailer_user%"
			sender_name: "%mailer_user%"
		service:                               # this lines
			mailer: fos_user.mailer.twig_swift # this lines
		registration:
			confirmation:
				enabled: true
		resetting:
			email:
				from_email:
					address:        %mailer_user%
					sender_name:    Demo Resetting

#Bug generate:bundle: ClassNotFoundException: Attempted to load class "MyVendorFOSUserBundle" from namespace "MyVendorFOSUserBundle" :
     "autoload": {
         "psr-4": {
-            "AppBundle\\": "src/AppBundle"
+            "AppBundle\\": "src/AppBundle",
+            "MyVendorFOSUserBundle\\": "src/MyVendor/MyVendo
rFOSUserBundle"
         },

#new Route:
+fos_user_security_login_override:
+    path: /login
+    defaults: { _controller: MyVendorFOSUserBundle:Security:login }


#Graphicard: Champ Imbriqué:
Definir __toString dans FormType permettra d eviter un bug

On peut ajouter à un formulaire un champ non mapé en mettant mapped => false


#Symfony 3.4 : Embed Collection of Forms persistence issue : Integrity constraint violation: 1048 Column 'arrivage_id' cannot be nullSymfony 3 : Embed Collection of Forms persistence issue : Integrity constraint violation: 1048 Column 'arrivage_id' cannot be null
		stacked: https://stackoverflow.com/questions/50194747/symfony-3-embed-collection-of-forms-persistence-issue-integrity-constraint-v
		Solution: //Manually setArrivage:
		    //Added Block Begiiiiiiin
			$elementArrivages = $arrivage->getElementArrivages();
			foreach( $elementArrivages as $elementArrivage){
			  $elementArrivage->setArrivage($arrivage);
			}
			//Added Block Ennnnnd
