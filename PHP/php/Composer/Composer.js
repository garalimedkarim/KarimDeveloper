
Install composer:

Install it from getcomposer.org => composer.phar in the current directory // php composer.phar works
> sudo mv composer.phar /user/bin/composer
> composer // works ( globally installed OK )

packagist.org

> composer require hautelook/phpass

> composer install ( install composer.lock dependencies )
> composer update ( install composer.json dependencies )

> composer require --dev 

> composer dumpautoload // generate composer/ autoload files

> composer remove hautelook/phpass

> composer create-project!!!!!



Namespaces are used with already included files
#test.php:
<?php
namespace A;
class Test{
   function __construct(){
	echo "Hi";
   }
}

#index.php:
<?php
include 'index2.php';
$test = new \A\Test;

Putting namespace encapsulate all classes in the file, to call DateTime for exple we have to call \DateTime or put "use DateTime";


#use namespace with autoloaded files:

#composer.json:
    "autoload": {
    	"files": [
			"app/functions.php" //this file will be autoloaded that's mean that this functions can be used directly in all Project files.
		], 
    	"classmap": [
			"app/classes", // this will load recursively all app/classes/* files and we are free to put namespace we want without respecting psr-4 or to not put namespace at all.
			// "app/" includes recursively all folder classes without organazation by namepsaces
		],
    	"psr-4": {
            "App\\" : "app" //this will load all files inside app folder after executing >composer dumpautoload
        }
    },

>composer dumpautoload // generate vendor/autoload.php à partir de composer.json autoload section

What are namespaces:
- We speack about namespace after including all files
- Now if we want to instantiate from a class but we have two included files defining this class, what is the solution?
- Namespaces are virtual organization system
- When we put "namespace X\Y;" on the top of a file, the classes contained on this file must be call with this namespace or put use X\Y\classname on the top of the calling file
- When we put "namespace X\Y;" on the top of a file, all classes instaniated in this file must be call with their namespaces either the predefined function as new \DateTime();
- We can use aliases when use X\Y as namaspace;


#What is Composer :
	- package manager
	- he have its autoloading system ("vendor/autoload.php");
	- composer.lock : actually installed versions
	- composer.json : specify your versions in this file
	- composer install takes composer.lock if not takes composer.json & generates composer.lock
	- composer update updates composer.lock from composer.json (try to get latest versions)
	
	
	
