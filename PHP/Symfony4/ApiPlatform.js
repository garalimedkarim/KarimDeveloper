
I- Course Introduction:
	Postman / Sqlite Studio / VSC or PHP Storm
	VSC Extensions : php intelephense / php docblocker /
	
II- Getting Started:
1.Installing PHP a Composer:

III- Modern PHP:
1.Installing VSC
2.Namespaces
	use App\Format\{Class1,Class2,...}
3.Class Fields and methods
4.Method & Field Visibility:
5.Inheritance
6.Abstract Classes:
7.Interfaces
	PHP extends one class implements many interfaces
	get_class($object) //method returns class name
	
8.Typed Args & Function Return Types
	function func1(Interface $obj){...} //that's mean that the obj arg must implements that interface
	declare(strict_types=1); //autocast disable, if expect string doesn't accept number type 
9.Anonymous Functions (Closures)
	anonymous or inline functions ( closures )
10.Reflection API (Reverse Engineer Classes,Methods,Functions)
	- Class describe classes
	$class = new ReflectionClass(MyClass::class);
	var_dump($class->getConstructor);
11.Dependency Injection
	interface FormatInterface{
		public function convert():string;
		public function setData(array $data):void;
	}
	//defining classes which implements FormatInterfaces
	//class JSON, XML and YAML.
	class Serializer{
		private $format;
		public function __construct(FormatInterface $format){ //Where $format implements FormatInterface which containt
			$this->format = format;
		}
		public function serialize($data): string{
			$this->format->setData($data);
			return $this->format->convert();
		}
	}
12.Simple Service Container
13.Service Autowiring part1
14.Service Autowiring part2
// ...$array => converts $array to function args
15.Annotations and Kernel Part1
16.Annotations and Kernel Part1

IV- Symfony 4 Introduction
1.Create new Project
	composer create-project symfony/skeleton project
2.Routing annotations in controllers
	composer require annotations (flex)
	#config/routes/annotations.yaml
3.Routing -route parameter wildcards
	
4.Routing -default parameter values
	bin/console debug:router
5.Routing -generating urls using route names
	$this->generateUrl(....)
6.AbstractController, Request, Response
	
V- Database, Doctrine, Fixtures:
1.Installing ORM,maker,configuring database:
	> composer require orm
	> replace maker bundle into require-dev of composer.json
	> rm -rf vendor/
	> composer update
	#.env 
	//set DATABASE_URL
2.Generating first Entity
	> bin/console make:entity
	> bin/console make:migration
3.Entity explained
4.Migration-modifying database structure
	
5.Persisting entities and serializing data
	> composer require serializer
    /**
     * @Route("/add", name="blog_add", methods={"POST"})
     */
    public function add(Request $request){
        $serializer = $this->get('serializer');
        $blogPost = $serializer->deserialize($request->getContent(),BlogPost::class,'json');
        $em = $this->getDoctrine()->getManager();
        $em->persist($blogPost);
        $em->flush();
        return $this->json($blogPost);
    }	
6.Fetching objects using repositories
    /**
     * @Route("/list/{page}", name="blog_list", requirements={"page"="\d+"}, methods={"GET"})
     */
    public function list($page=1, Request $request){
        $repository = $this->getDoctrine()->getRepository(BlogPost::class);
        $items = $repository->findAll();
        return $this->json($items);
    }    
    /**
     * @Route("/{id}", name="blog_by_id", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function postById($id, Request $request){
        $repository = $this->getDoctrine()->getRepository(BlogPost::class);
        $items = $repository->findBy(['id'=>$id]);
        return $this->json($items);
    } 	
7.ParamConverter: type hinting actions for automatic fetch of entities
	//We can replace this function using ParmaConverter like this:
    /**
     * @Route("/{id}", name="blog_by_id", requirements={"id"="\d+"}, methods={"GET"})
     * @ParamConverter("post",class="App:BlogPost" options={"mapping": {"id":"author"}} //will be searched as "author"
     */
    public function postById(BlogPost $post, Request $request){
        return $this->json($post);
    }	
8.Deleting entities
	/**
     * @Route("/{id}", name="blog_delete", requirements={"id"="\d+"}, methods={"DELETE"})
     */
	public function delete(BlogPost $post){
		$em = $this->getDoctrine()->getManager();
		$em->remove($post);
		$em->flush();
		return new JsonResponse(null,Response::HTTP_NO_CONTENT);
	}
9.Doctrine Fixtures - seeding fake data
	> composer require --dev doctrine/doctrine-fixtures-bundle
	#src/DataFixtures/AppFixtures.php
10.Admin panel introduction -EasyAdmin
	> composer require admin
	#config/packages/easy_admin.yaml

VI- API Platform - Introduction:
1.Install API Platform and create the first resource
	>composer require api
	//adding this annotation
	//navigate to localhost/api returns
	{
		"@context": "/api/contexts/Entrypoint",
		"@id": "/api",
		"@type": "Entrypoint",
		"blogPost": "/api/blog_posts"
	}
	//GET /api/blog_posts returns list
	//POST /api/blog_posts with the json body create a new post
	//PUT,DELETE works for /api/blog_posts/6 //id
	#src/Entity/BlogPost.php:
	+use ApiPlatform\Core\Annotation\ApiResource;
	 /**
	  * @ORM\Entity(repositoryClass="App\Repository\BlogPostRepository")
	+ * @ApiResource()
	  */
	class BlogPost{...}
	>bin/console router:debug //=> new api routes

2.Generate User and Comment entity
3.ManyToOne relation and migration
    /**
     * @ORM\ManyToOne(targetEntity="App/Entity/User")
     * @ORM\JoinColumn() //that means this current table must contain author field
     */
    private $author;
    
4.Fixtures with references (for relations)
	//loading fixtures
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $this->loadUsers($manager);
        $this->loadBlogPosts($manager);
    }

    public function loadBlogPosts(ObjectManager $manager){
        $user = $this->getReference("admin");
        $blogPost = new BlogPost();
        $blogPost->setTitle('Post1');
        $blogPost->setPublished(new \DateTime());
        $blogPost->setContent('loream upsom mouch 3adi!');

        $blogPost->setAuthor($user);
        $manager->persist($blogPost);

        $manager->flush();
    }

    public function loadUsers(ObjectManager $manager){
        $user = new User();
        $user->setUsername("admin");
        $user->setEmail('admin@gmail.com');
        $user->setName('Karim Garali');
        $user->setPassword("admin");
		//Fixture method
        $this->addReference("admin",$user);

        $manager->persist($user);
        $manager->flush();
    }	
5.Password encoding in fixtures
	#security.yaml
	security:
	+    encoders:
	+        App\Entity\User: bcrypt
	#App/Entity/User
	add User implements UserInterface
	//defined methods
+    public function getRoles()
+    {
+        return ['ROLE_USER'];
+    }
+    public function getSalt()
+    {
+        return null;
+    }
+    public function eraseCredentials()
+    {
+        // TODO: Implement eraseCredentials() method.
+    }
	#Fixture:
+    private $passwordEncoder;
+    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
+    {
+        $this->passwordEncoder = $passwordEncoder;
+    }
	 //Set password
	 $user->setPassword($this->passwordEncoder->encodePassword($user,"admin"));	 
6.Generate fake data in fixtures using Faker
	>composer require --dev fzaninotto/faker //this is a normal PHP package we instaniate it normally
+    private $faker;
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
+       $this->faker = \Faker\Factory::create();
    }
	//Faker is a good for fake data
	$this->fake->username, datetime, etc...

7.BlogPost with Comment relation and fixtures
	#Comment Entity:
+     * @ORM\ManyToOne(targetEntity="BlogPost", inversedBy="comments")
+     * @ORM\JoinColumn(nullable=false)
+     */
+    private $blogPost;
	#Fixtures:
	//adding comments to blogPost
	
VII- API Platform Operations (GET,POST,PUT,DELETE):
1.Built-in API Platform operations:
	>bin/console debug:router
	POSTMAN < http://127.0.0.1:9000/api/
	{
		"@context": "/api/contexts/Entrypoint",
		"@id": "/api",
		"@type": "Entrypoint",
		"user": "/api/users",
		"blogPost": "/api/blog_posts",
		"comment": "/api/comments"
	}

Problems in initial api:
1) GET returns all class attributes and I want that it returns salt for exemple.
2) PUT updates password field with plainPassword

2.Disabling operations:
//Enable only get operations
 * @ApiResource(
 *     itemOperations={"get"}, // GET,POST,DELETE,PUT
 *     collectionOperations={"get"} //GET,POST
 * )
3.Introduction to serializationdeserialization
	Serialization, converting PHP Object to Format (JSON,XML)
	Deserialization, the opposite
	Serialize = firt Normalize then Encode
	Normalize = Converting PHP Object to Array key value	
	Encode = Encoding Array to (JSON,XML)
	
	Deserizalize = Decode then Denormalize
	
	We can ignore properties or modify them during the normalization/denormalization process
	
4.Serialization groups (controlling which properties are serialize
	#User Entity:
	//this will return only read group attributes in get request
	 * @ApiResource(
	 *     itemOperations={"get"},
	 *     collectionOperations={"get"},
	+*     normalizationContext={
	+*          "groups"={"read"}
	+*     }
	 * )
	//...
	+ * @Groups({"read"})
	+ */
	private $id;

5.EventSubscriber:
	//enable POST
	collectionOperation = {"get","post"}
	//To encode password before post
	>mkdir src/EventSubscriber
	#src/EventSubscriber/PasswordHashSubscriber.php:
	class PasswordHashSubscriber implements EventSubscriberInterface
	{

		private $passwordEncoder;
		/**
		 * PasswordHashSubscriber constructor.
		 */
		public function __construct(UserPasswordEncoderInterface $passwordEncoder)
		{
			$this->passwordEncoder = $passwordEncoder;
		}

		public static function getSubscribedEvents()
		{
			return [
				KernelEvents::VIEW => ['hashPassword', EventPriorities::PRE_WRITE]
			];
		}

		public function hashPassword(ExceptionEvent $event){
			$user = $event->getControllerResult();
			$method = $event->getRequest()->getMethod();

			if (!$user instanceof User ||  Request::METHOD_POST !== $method){
				return;
			}

			$user->setPassword(
				$this->passwordEncoder->encodePassword($user,$user->getPassword())
			);
		}
	}

6.Validator and validation constraints:
	//Using @Assert\NotBlank() etc... in Entity classes

7.Validation using regular expressions
	//@Assert\Regex()
	//I skip this video (regular expression lesson)
8.Virtual property (not persisted to database)
	#Entity User:
	
	/**
	 * @Assert\Expression(
	 * "this.getPassword() === this.getRetypedPassword()",
	 * message="Passwords does not match"
	 * )
	 */
	private $retypedPassword;
	
9.Validation uniqueness of fields (username, email)
#User Entity:
 * @UniqueEntity(fields={"username","email"})
 */
//every field is unique solo => delcare it twice like this:
//@UniqueEntity("email)
//@UniqueEntity("username)
class User implements UserInterface{...}

VIII- API Platform - User Authentication and JWT tokens:
1.JWT Tokens introduction
	Token = eysdq.part2.part3
	Token = header.payload.signature
	Tokens are not encrypted, they are just encoded => no sensitive should be in payload
	You need a public/private key pair to sign the token => 3rd party cannot sign the modified token without public/private key pair.
	Payload can contan user_id, token expiry date, token issued date. and not (email, or credit card, or password)
	
2.Preparing JWT token library and keys:
	>composer require jwt
	>mkdir config/jwt
	//generate private key
	>openssl genrsa -out config/jwt/private.pem -aes256 4096
		>Enter pass phrase for config/jwt/private.pem: karimation
		>Verifying - Enter pass phrase for config/jwt/private.pem: karimation
	//generate public key from private key:
	>openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
		>Enter pass phrase for config/jwt/private.pem:
	>ls config/jwt/
		private.pem  
		public.pem
	#.env
	//set same passphrase
	JWT_PASSPHRASE=karimation
	
3.Configuring UserProvider
	#security.yaml
        database: //any name
            entity: //this is the provider type = entity = from database
                class: App\Entity\User
                property: username	
	#config/packages/lexi_jwt_authentication.yaml
		lexik_jwt_authentication:
			secret_key:       '%kernel.project_dir%/config/jwt/private.pem' # required for token creation
			public_key:       '%kernel.project_dir%/config/jwt/public.pem'  # required for token verification
			pass_phrase:      'your_secret_passphrase' # required for token creation, usage of an environment variable is recommended
+			token_ttl:        3600	

4.Firewall configuration
	//I debug all service using
	> bin/console container:debug
	> bin/console autowiring:debug // for most used services
	#security.yaml
	firewalls:
        api:
            pattern: ^/api
            stateless: true //no state kept in the session
            anonymous: true
            json_login:
                #here auth will happen (token generation)
                check_path: /api/login_check
                success_handler: lexik_jwt_authentication.handler.authentication_success
                failure_handler: lexik_jwt_authentication.handler.authentication_failure
            guard:
                authenticators:
                    - lexik_jwt_authentication.jwt_token_authenticator

    access_control:
        - { path: ^/api/login, roles: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/api,       roles: IS_AUTHENTICATED_FULLY }
                    
5.JSON login configuration and Guard Authentication explained:
//use debug:container serviceId to show service details
> bin/console debug:container lexik_jwt_authentication.handler.authentication_success

6.Authentication final configuration and first login using JWT token
	#config/routes/jwt.yaml (create this file)
	api_login_check:
		path: /api/login_check
	
IX- API Platform - Authorization, Data Validation, Serialization
1.Using is_granted() to control access to operations
	#User Entiy:
		 * @ApiResource(
		 *     itemOperations={
+		 *          "get"={"access_control"="is_granted('ROLE_ADMIN')"}
		 *     },
		 *     collectionOperations={
+		 *          "get"={"security"="is_granted('IS_AUTHENTICATED_FULLY')"}
		 *     ,"post"},
		 *     normalizationContext={
		 *          "groups"={"read"}
		 *     }
		 * )	
2.BlogPost validation on POST
	//may be to use @Assert/NotBlank we have to update framework.yaml:
	#framework.yaml
	#    validation: { enable_annotations: true }


	#BlogPost entity:
	//enable POST 
 *     collectionOperations={
 *          "get",
+*          "post"={"security"="is_granted('IS_AUTHENTICATED_FULLY')"}
	//Add asserts:
+     * @Assert\NotBlank()
+     * @Assert\Length(min="10",max="20")
      */
     private $title;


 	
	#POSTMAN post on /api/blog_posts
	header:
		Authorization : Bearer eyskqdlm...
	body:
	{
		"@context": "/api/contexts/BlogPost",
		"@id": "/api/blog_posts/11",
		"@type": "BlogPost",
		"id": 11,
		"title": "kamel ltaif",
		"published": "2019-12-12T00:00:00+01:00",
		"content": "arrestation de Kamel Ltaif",
		"author": "/api/users/1",
		"comments": []
	}
3.Setting author of BlogPost automatically (EventSubscriber)
	//create AuthoredEntitySubscriber:
	> bin/console make:subscriber
	> EventSubscriber
	//get current Token
	//get User By Token
	//setUser in BlogPost PRE::WRITE priority	
	#AuthoredEventSubscriber:
class AuthoredEntitySubscriber implements EventSubscriberInterface
{
    private $tokenStorage;
    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['getAuthenticatedUser', EventPriorities::PRE_WRITE]
            ],
        ];
    }

    public function getAuthenticatedUser(ViewEvent $event){
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        $user = $this->tokenStorage->getToken()->getUser();

        if ( !$entity instanceof BlogPost || !in_array($method, [Request::METHOD_POST,Request::METHOD_PUT]) ){
            return;
        }

        $entity->setAuthor($user);
    }


4.Making sure only owner of BlogPost can modify if (PUT)
	//enable put in itemOperations
 *     itemOperations={
 *          "get",
 *          "put"= {
 *              "security"="is_granted('IS_AUTHENTICATED_FULLY') and object.getAuthor() == user"
 *          }
 *      },

5.Controlling which properties can be changed
	#User Entity:
	//change group "read" to "get" 
-     * @Groups({"read"})
+     * @Groups({"get"})
      */
     private $id;
	
	//move normalizationContext inside get method :
	//normatizationContext inside get become "normalization_context"
	//add normalization_context for get
	//add denormalization_context for put
	/**
	 * @ApiResource(
	 *     itemOperations={
	 *          "get"={
	 *              "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
	 *               "normalization_context"={
	 *                  "groups"={"get"}
	 *              }
	 *          },
	 *          "put"= {
	 *              "security"="is_granted('IS_AUTHENTICATED_FULLY') and object.getAuthor() == user",
	 *              "denormalization_context"={
	 *                  "groups"={"put"}
	 *              }
	 *          }
	 *     },
	 *     collectionOperations={
	 *          "get"={"security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"},
	 *          "post"={
	 *              "denormalization_context"={
	 *                  "groups"={"post"}
	 *              }
	 *          }
	 *      }
	 * )
	 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
	 *
	 * @UniqueEntity(fields={"username","email"})
	 */

	 #BlogPost Entity:
	 //adding put method to itemOperations:
- *     itemOperations={"get"},
+ *     itemOperations={
+ *          "get",
+ *          "put"= {
+ *              "security"="is_granted('IS_AUTHENTICATED_FULLY') and obje
ct.getAuthor() == user"
+ *          }
+ *      },

6.Hashing password on User changes (PUT)- with Event
	#User Entity:
	//When we move normalzation_context inside get, the post returns JSON Object follwing the generalContext: so, we set back the general normalizationContext
 * @ApiResource(
+*      normalizationContext={
+*        "groups"={"get"}
+*      },
 *     itemOperations={
	 //We want different post and put returning, we just create "normalization_context" inside each method
 *          "post"={
 *              "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 *              "denormalization_context"={
 *                  "groups"={"post"}
 *              },
+*              "normalization_context"={
+*                  "groups"={"get"}
+*              }
 *          }	
	//Another Problem appears: when We update a User (put request), the token is expired automatically, So the User will be forsed to log in. 
	//=> ( The Solution Will be next)

	#src/EventSubscriber/PasswordHashSubscriber.php:
	//add PUT TO THE ARRAY of the EVENT SUBSCRIBER
	if (!$user instanceof User || !in_array($method,[Request::METHOD_POST,Request::METHOD_PUT]) ){
	
7.Comment resource operations (POST PUT)
	//duplicate BlogPost ApiResource config to Comment ApiResource config
	#Comment Entity:
	 * @ApiResource(
	 *     itemOperations={
	 *          "get",
	 *          "put"= {
	 *              "security"="is_granted('IS_AUTHENTICATED_FULLY') and object.getAuthor() == user"
	 *          }
	 *      },
	 *     collectionOperations={
	 *          "get",
	 *          "post"={"security"="is_granted('IS_AUTHENTICATED_FULLY')"}
	 *      }
	 * )
	 */
	class Comment
	
	//set Author Automatically Using AuthoredEventSubscriber
	#AuthoredEventSubscriber:
	//modify condition to not skip Comment
    public function getAuthenticatedUser(ViewEvent $event){
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        $user = $this->tokenStorage->getToken()->getUser();
		//modified
        if ( (!$entity instanceof BlogPost && !$entity instanceof Comment) || !in_array($method, [Request::METHOD_POST,Request::METHOD_PUT]) ){
            return;
        }

        $entity->setAuthor($user);
    }
	
	
X-API Platform - Subresources, relations, serialization depth:
1.More randomness in fixtures
	//generate users from Array
2.Setting Author automatically (Event Subscriber) using generic interface:
	//create a new Interface:
	#src/Intrefaces/AuthoredEntityInterface.php:
	namespace App\Interfaces;

	use Symfony\Component\Security\Core\User\UserInterface;
	interface AuthoredEntityInterface
	{
		public function setAuthor(UserInterface $user):AuthoredEntityInterface;
	}
	//modfiying BlogPost and Comment to implements AuthoredEntityInterface and correct setAuthor typage
	
	#src/Interfaces/PublishedDateEntityInterface.php
	namespace App\Interfaces;

	use Symfony\Component\Security\Core\User\UserInterface;
	interface PublishedDateEntityInterface
	{
        public function setPublished(\DateTimeInterface $user):PublishedDateEntityInterface;
	}
	//modfiying BlogPost and Comment to implements PublishedDateEntityInterface and correct setPuhlishedDate typage
	
3.Setting published date automatically (EventSubscriber)
//create a group "posted" for denormalization of post and put.
//this group does not contain puhlished, so when sending request post,put, the published field will ignored if sended,
//the event subscriber will set the published
#src/EventSubscriber/PublishedDateEntitySubscriber:
	class PublishedDateEntitySubscriber implements EventSubscriberInterface
	{
		public static function getSubscribedEvents()
		{
			return [
				KernelEvents::VIEW => [
					['setPublishedDate', EventPriorities::PRE_WRITE]
				],
			];
		}

		public function setPublishedDate(ViewEvent $event){
			$entity = $event->getControllerResult();
			$method = $event->getRequest()->getMethod();

			//we can put $entity instanceof PublishedDateEntityInterface
			if ( !$entity instanceof PublishedDateEntityInterface || !in_array($method, [Request::METHOD_POST,Request::METHOD_PUT]) ){
				return;
			}

			$entity->setPublished(new \DateTime());
		}

4.API subresources:
	//new url form blogPost's comments
	//bin/console router:debug | grep comments
	#BlogPost ENtity:
    /**
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="blogPost")
+    * @ApiSubresource()
     */
    private $comments;
	
    //We can send POST containing field toOne relation, by specifying the relative path to it; for exple: "author" : "/api/users/5",
    
5.Controlling how deep relations are serialized (subresource operations)
	//for an entity ApiResource we have also a property called subresourceOperations, which manage subresource coming to the entity "api_x_subresource" routes
	>bin/console debug:router | grep "subresource"
	#src/Entity/Comment.php:
	/**
	 * //....
	 *     denormalizationContext={
	 *          "groups" = {"posted"}
	 *     }, 
+	 *     subresourceOperations={
+	 *          "api_blog_posts_comments_get_subresource"={
+	 *               "normalization_context"={
+	 *                  "groups"={"get_comment_with_author"}
+	 *              }
+	 *           }
	 *     }
	 * )
	 */
	class Comment implements AuthoredEntityInterface,PublishedDateEntityInterface{
	//add get_comment_with_author to fields @Groups
	//For a relation field the "get_comment_with_author" will be propagated in the relation and search for the group "get_comment_with_author" in Author entity.
    /**
     * @ORM\ManyToOne(targetEntity="User",inversedBy="comments")
     * @ORM\JoinColumn()
     * @Groups({"get_comment_with_author"})
     */
    private $author;
	}

6.Embedding Author resource inside BlogPost //propagation
	//for embedded relations, we have to write it explicitly in itemOperations>get>normalization_group or collectionOperations>get>normalization_group
	//We can put this group in all entity embedded in this entity and it will get nested data using this group
	
	//Exple: embbeding BlogPost's comments embbeded author
	#BlogPost:
  *     collectionOperations={
- *          "get",
+ *          "get"= {
+ *              "normalization_context" = {
+ *                  "groups" = {"get_post_with_comments"}
+ *              }
+ *          },
//...
     /**
      * @ORM\OneToMany(targetEntity="Comment", mappedBy="blogPost")
      * @ApiSubresource()
+     * @Groups({"get_post_with_comments"})
      */
     private $comments;
     
     #Comment:
-     * @Groups({"get_comment_with_author"})
+     * @Groups({"get_comment_with_author","get_post_with_comments"})
      */
     private $id;

-     * @Groups({"posted","get_comment_with_author"})
+     * @Groups({"posted","get_comment_with_author","get_post_with_comments"})
      */
     private $content;

-     * @Groups({"get_comment_with_author"})
+     * @Groups({"get_comment_with_author","get_post_with_comments"})
      */
     private $author;

	#Author:
	/**
-     * @Groups({"get","get_comment_with_author"})
+     * @Groups({"get","get_comment_with_author","get_post_with_comments"})
      */
     private $id;

	/**
-     * @Groups({"get","post","get_comment_with_author"})
+     * @Groups({"get","post","get_comment_with_author","get_post_with_comments"})
      */
     private $username;
     
MyBonusTask:
//I save a user with its roles by setting an array of objects in roles
URL: POST > /api/users
body:
{
    "username": "salimgarali",
    "name": "Salim Garali",
    "email": "salim@gmail.com",
    "password": "admin",
    "retypedPassword": "admin",
    "roles": [
    	{"id":"4"}, {"id":"5"}
    ]
}

//User>collectionOperations>post>denormalization_context>groups
 *     collectionOperations={
 *          "get"={
 *              "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"
 *          },
 *          "post"={
 *              "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 *              "denormalization_context"={
 *                  "groups"={"user:post"}
 *              }
 *          }
 *      }
//Propagation:
//Role>id //I can post by setting id
+     * @Groups({"user:post"})
      */
     private $id;

     
     
XI- API Platform - Custom Serialization, User Roles:
//I start by installing profiler to see toolbar symfony in admin interface
>composer require --dev symfony/profiler-pack

1.Adding user role field with migration
	//commit: make:entity role + manyTomany with users
2.User role fixtures
	//create comments with users who have ROLE_COMMENTATOR and posts by users who have ROLE_EDITOR
3.Defining role hierarchy
	#security.yaml
	role_hierarchy:
		ROLE_WRITER: ROLE_COMMENTATOR
		ROLE_ADMIN: [ROLE_WRITER, ROLE_EDITOR]
		ROLE_SUPERADMIN: ROLE_ADMIN
4.Verifying only users with specific role can POST resources
	-"security"="is_granted('IS_AUTHENTICATED_FULLY')"
	+"security"="is_granted('ROLE_ADMIN') or is_granted('ROLE_EDITOR')"
5.Different User view for admins (different serialization of all User entitie
	Until now we only show or hide certain properties based on opearations (get,post,...) by configuring normalization and denormalization context.
	But What if we want show some properties based on User Role? //=> ContextBuilder
		https://api-platform.com/docs/core/serialization/#changing-the-serialization-context-dynamically
6.Verifying only admin can see all User's email
	//test on Postman
7.User can view his full profile (including email and roles) - custom normalizer
	//https://api-platform.com/docs/core/serialization/#changing-the-serialization-context-on-a-per-item-basis
8.Verifying only the profile owner can see all properties
	//test on Postman
	
XII- API Platform - Custom Operations (Password Reset)
1.Disabling password hashing for PUT operation
	//remove put group from User Properties but ItempOperations put stills
	//remove PUT method from PasswordHashSubscriber
2.Configuring custom operation for password reset in User
	https://api-platform.com/docs/core/controllers/
	//in User>apiResource>itemOperations> add operation "put-reset-password" after "put"
	"put-reset-password"={
		"security"="is_granted('X')",
		"method"="PUT",
		"controller"="ResetPasswordAction::class",
		"denormalization_context"="..."		
	}
3.Creation custom Action class
	//declared in Controller but not with Controller suffixe in name
	#src/Controller/ResetPasswordAction: 
	//inject ValidatorInterface $validator
	public function __invoke(User $user){
		$this->validator->validate($user);
		return $data;
	}
	
4.Implementing custom PasswordReset action
	#src/Controller/ResetPasswordAction: 
	//inject ValidatorInterface $validator
	+//inject userPasswordEncoder
	+//inject JWTTokenManagerInterface $tokenManager
	public function __invoke(User $user){
		$this->validator->validate($user);
		+ //encode passowrd
		+ $newPassword = $this->userPasswordEncoder(...);
		+ $user->setPassword($newPassword);
		+ $this->em->flush();
		//create User Token and persist it in the DB:
		$token = $this->tokenManager->create($user);
		return new JsonResponse(['token'=>$token]);
	}
	
5.invalidationg JWT tokens after password reset
	//When we create a new User token, the old Token stay valid
	//Token contain username encrypted by private  key
	//mkdir Security
	#src/Security/TokenAuthenticator.php:
	//extends JWTTokenAuthenticator:
	//override getUser 
	public function getUser($preAuthToken, UserProviderInterface $userProvider)
	{
		$user = parent::getUser($preAuthToken,$userProvider);

		if ( $user->getPasswordChangeDate() && $preAuthToken->getPayload()['iat'] < $user->getPasswordChangeDate() ){
			throw new ExpiredTokenException();
		}
		return $user;
	}
	#src/config/security.yaml:
	guard:
		authenticator:
			#- lexik_jwt_authentication.jwt_token_authenticator
		+	- App\Security\TokenAuthenticator
	
XIII. API Platform - Custom Resource, E-mail Sending (User Account Confirmation)
1.User enabled property migration and fixtures
	#src/Entity/User
	//add $enabled field
2.Implementing UserChecker to verify if account is enabled
	#security.yaml:
		 guard:
			 authenticators:
				 - lexik_jwt_authentication.jwt_token_authenticator
+        user_checker: App\Security\UserEnabledChecker
	#src/Security/UserEnabledChecker:
	class UserEnabledChecker implements UserCheckerInterface{
		public function checkPreAuth(UserInterface $user)
		{
			if (!$user instanceof User)
				return;
			if (!$user->getEnabled()){
				throw new DisabledException();
			}
		}

		public function checkPostAuth(UserInterface $user)
		{
			// TODO: Implement checkPostAuth() method.
		}
	}	
	
3.Secure confirmation token generation
	#src/Security/TokenGenerator:
	class TokenGenerator
	{
		private const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		public function getRandomSecureToken($length=30){
			$token = "";
			$max = strlen(self::ALPHABET);
			for ($i=0;$i<=$length;$i++){
				$token .= self::ALPHABET[random_int(0,$max-1)];
			}
			return $token;
		}
	}
	#src/Fixtures
	//$user->setConfirmationToken($this->tokenGenerator->getRandomSecureToken());
	
4.Generating confirmation token when user signs-up
	Duplicate passwordHashSubscriber to
	#src/EventSubscriber/UserRegistredSubscriber:
+        $user->setConfirmationToken(
+            $this->tokenGenerator->getRandomSecureToken()
+        );
	
5.UserConfirmation custom API Resource
	//create UserConfirmation Entity and remove ORM annotation
	#src/Entity/UserConfirmation:
	/**
	 * @ApiResource(
	 *      collectionOperations={
	 *          "post"={
	 *              "path"="/users/confirm"
	 *          }
	 *      },
	 *     itemOperations={}
	 * )
	 */
	class UserConfirmation
	{
		private $id;
		private $confirmationToken;

		public function getConfirmationToken(): ?string
		{
			return $this->confirmationToken;
		}

		public function setConfirmationToken(string $confirmationToken): self
		{
			$this->confirmationToken = $confirmationToken;

			return $this;
		}
	}
	
6.UserConfirmation EventSubscriber
	#src/EventSubscriber/UserConfirmationSubscriber.php:
    public function __construct(
        UserRepository $userRepository,
        EntityManagerInterface $entityManager
    )
    {
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['confirmUser', EventPriorities::PRE_WRITE]
        ];
    }

    public function confirmUser(ViewEvent $event){
        $req = $event->getRequest();

        if ( $req->get('_route') !== 'api_user_confirmations_post_collection' )
            return;

        $confirmationTokne = $event->getControllerResult();

        $user = $this->userRepository->findOneBy(['confirmationToken' => $confirmationTokne]);

        if (!$user){
            throw new NotFoundHttpException();
        }

        $user->setEnabled(true);
        $user->setConfirmationToken(null);
        $this->entityManager->flush($user);

        $event->setResponse(
            new JsonResponse(null,Response::HTTP_OK)
        );
    }	
7.Verifiying confirmation Token endpoint
	//Senario: Create new User
	//enabled by default = false
	//tokenValidation initialized
	//Now we must confirm from Mail by POST on UserConfirmation Entity api
	//the action of the API UserConfirmation is done by the Subscriber (see previous section)
	//the action = consume token by setting it null in user and enable user
8.Install and configure Swift Mailer
	> composer require symfony/switmailer-bundle
	//configure swiftmailer with gmail
	//in gmail account enable a specific option to allow Symfony
9.Sending a test e-mail through Gmail
	#UserRegisterSubscriber:
	//inject mailer and use it:
	$msg = (new Swift_Message('Subject'))
	->setFrom('mail')
	->setTo('mail2')
	->setBody('how are u?');
	
	$this->mailer->send($msg);
	
10.Refactoring UserConfirmation and Mailer into services
	//create new Service in new Directory:
	#src/Email/Mailer.php
	//inject mailer, twig
	//public function sendConfirmationEmail(User $user)
	//create twig template
	//send it in the body of the mail
	
	//create an new Service for code in UserRegisterSubscriber and clean the code
	#src/Security/UserConfirmationService
	//public function confirmUser(string $confirmationToken)
		//contains code of confirming mail from
		
	#UserRegisterSubscriber:
	//remove code and call to the new service UserConfirmationService by passing the token in the function confirmUser
	
11.Traditional (non API) Account confirmation route for email:
	//autoconfig + autowiring => inject dependencies in the constuctor for classes
	//for Controller we can even inject dependencies in methods
	//create an action in defaultController
	#DefaultController:
	/**
	 * @Route("/confirm-user/{token}", name="traditional_confirm_user")
	 */
	public function confirmUser(
		string $token, 
		UserConfirmationService $userConfirmationService){
		$userConfirmationService->confirmUser($token);
		
		return $this->redirectToRoute('default_index');
	}
	
	#confirm.html.twig
		//contains:
			{{ url('traditional_confirm_user', {'token':user.getConfirmationToken() } ) }}
		
12.Verifying confirmation link received in e-mail
	//test
	
XIV- API Platform - Uploading Files (Images):
1.Install and configure uploading library
	> composer require vich/uploader-bundle
	> mkdir public/images
	#packages/vich_uploader.yaml:
	vich_uploader:
		db_driver: orm

+		mappings:
+			products:
+				uri_prefix: /images
+				upload_destination: '%kernel.project_dir%/public/images'
+				#Option:
+				namer: Vich\UploaderBundle\Naming\SmartUniqueNamer

2.Image entity with migration and @Uploadable annotation
	>bc make:entity Image
	#Image:
	/**
	* @ORM\Entity(repositoryClass="App\Repository\ImageRepository")
	* @Vich\Uploadable()
	* @ApiResource(
	*
	* )
	*/
	class Image
	{
		/**
		* @ORM\Id()
		* @ORM\GeneratedValue()
		* @ORM\Column(type="integer")
		*/
		private $id;
	
		/**
		* @Vich\UploadableField(mapping="images", fileNameProperty="url")
		*/
		private $file;
	
		/**
		* @ORM\Column(type="string", length=255)
		*/
		private $url;
	//migrate

3.API Resource for Image entity
	//configure a custom operation POST for entity Image
	#Image:
	  * @ApiResource(
	- *
	+ *     collectionOperations={
	+ *          "get",
	+ *          "post"={
	+ *              "method"="POST",
	+ *              "path"="/images",
	+ *              "controller"=UploadImageAction::class,
	+ *              "read"=false	//bypass the automatic retrieval of the entity in your custom operation
	+ *          }
	+ *     }
	  * )
	//new empty Action in Controlller Directory: (must implement __invoke() to be used by API Platfor custom opertaion
	#src/Controller/UploadImageAction.php:
	
4.Implementing custom Action for upload
	#first method: https://api-platform.com/docs/core/file-upload/ (implemented => OK)
	#second method: the tutoriel method:
	
5.Creating For for file upload
6.Assigning Image to BlogPost (ManyToMany relation)
	//api can post in non ApiResource tagged entity:
	#Role:
	/**
	 * @ORM\Entity(repositoryClass="App\Repository\RoleRepository")
	 */
	class Role
	{
		/**
		 * @ORM\Id()
		 * @ORM\GeneratedValue()
		 * @ORM\Column(type="integer")
		 * @Groups({"user:post"})
		 */
		private $id;
		
	#User:
	 *     collectionOperations={
	 *          "get"={
	 *              "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"
	 *          },
	 *          "post"={
	 *              "security"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
	 *              "denormalization_context"={
	 *                  "groups"={"user:post"}
	 *              }
	 *          }
	 *      }
	 * )
	 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
	 *
	 * @UniqueEntity(fields={"username","email"})
	 *
	 * @ORM\HasLifecycleCallbacks()
	 *
	 */
	//@UniqueEntity("email)
	class  User implements UserInterface{
		/**
		 * @ORM\ManyToMany(targetEntity="Role", fetch="EAGER", cascade={"persist"})
		 * @Groups({"put","user:post"})
		 */
		private $rolesCollection;

7.Verifying assigning Image to BlogPost, embedding Image inside BlogPost

XV- API Platform - Collections Filtering & Sorting
1.Configuring default collection sorting order
2.search filter
3.Date filter
4.Range filter
5.Sorting filter
6.Filtering by nested properties
7.Property filter

XVI- API Platform - Collections Data Pagination
1.Configuring collection pagination
2.Configuring collection pagination part2
3.Partial pagination (performance gain)

XVII- API Platform - Error Handling, Logging:
1.Empty request body for POST,PUT request problem
	//debug in vendor
2.Handling empty request body
	//create new EventSubscriber for POST,PUT requests
	KernelEvents:REQUEST
	function handleEmptyBody(){
		$data = $event->getRequest()->get('data');
		if $data === null
			throw new EmptyBodyException();
	}
	//create new Execption 
	#src/Exception/EmptyBodyException
	
	#config/packages/api_platform.yaml
	exception_to_status:
		App\Exception\EmptyBodyException: 400
		
3.Fixing validation groups
	//Process of POST reuqest:
	1) Deserialization
	2) Validation
	3) ...
	//validation_groupe by operation:
	"post"={
		"normalization_contex":{ 
			"groups"={ "grp1",,"grp2" } 
		},
		"validation_groups": { "grp3","grp4"}
	}
	
4.Handling business logic exceptions
	//any exception throw have to be declarated with its status in:
	#config/packages/api_platform.yaml
	exception_to_status:
		App\Exception\EmptyBodyException: 400
		
5.Installing Monolog library for logging

6.Defining custom logging channel

7.Logging to separate files per channel

8.Production configuration for logger explained

XVIII- API Platform - 

Symfony Flex: Officiel Documentation 4.3
	- Plugin that modifies the composer behaviour of require,update and remove commands
	- Requires that the app have a certain directory structure (as Symfony 4 structure)
	- to install it in an existing project :
		>composer remove symfony/symfony //remove Symfony Standard Edition
		>composer require symfony/flex
		 add the symfony/symfony package to the conflict section composer.json file so that it will not be installed again:
			"require": {
				"symfony/flex": "^1.0",
		+     },
		+     "conflict": {
		+         "symfony/symfony": "*"
			}
	- make composer install to let flex generate config/ files
		 >rm -rf vendor/
		 >composer install
	- Generated Flex configs does not use suffixes in config files, so the old app/config/config_dev.yml goes to config/packages/dev/.yaml, etc.
	- We can customized directories used by Flex ( src, config, bin, var, public) by adding in composer.json:
		"extra": {
			"src-dir": "src/App"
		}	

Symfony Flex Recipes:
	Recipe containe #manifest.json = File or Folder to add in the project + script to run + aliases.
	Recipe enable the bundle in the project in #config/bundles.php
	Best Tuto: https://www.youtube.com/watch?v=GaAxxQNUI88


> composer create-project symfony/skeleton project_name
> php -S 127.0.0.1:8000 -t public
> composer require --dev doctrine/doctrine-fixtures-bundle

All API PLATFORM CONFIGS:
	https://api-platform.com/docs/core/configuration/
	bin/console debug:config ApiPlatformBundle
	bin/console debug:config //=> shows available bundles
	
DATA PERSISTER; encode password before persist:
	https://symfonycasts.com/screencast/api-platform-security/encode-user-password
	
REST security sheet:
	https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html
	
API PLATFORM EVENTS SYSTEM (IMPORTANT):
	https://api-platform.com/docs/core/events/

API PLATFORM: ERRORS HANDLING;
	https://api-platform.com/docs/core/errors/
	
API PLATFORM PUSH: to search

bin/console doctrine:migrations:migrate down | up
