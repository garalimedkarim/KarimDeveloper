
Doc:
	https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/annotations-reference.html

#Then doctrine only will flush $entity, ignoring any other.
	$em->flush($entity);


** QuiryBuilder getType :
	$qb = $em->createQueryBuilder();
	echo $qb->getType(); // Prints: 0
	There’re currently 3 possible return values for getType():

	QueryBuilder::SELECT, which returns value 0
	QueryBuilder::DELETE, returning value 1
	QueryBuilder::UPDATE, which returns value 2


** findBy :
	$listAdverts = $repository->findBy(
	  array('author' => 'Alexandre'), // Critere
	  array('date' => 'desc'),        // Tri
	  5,                              // Limite
	  0                               // Offset
	);

	foreach ($listAdverts as $advert) {
	  // $advert est une instance de Advert
	 echo $advert->getContent();
	}

** Binding Parameters to my query :
	methode 1 :
	// $qb instanceof QueryBuilder

	$qb->select('u')
	   ->from('User', 'u')
	   ->where('u.id = ?1')
	   ->orderBy('u.name', 'ASC');

	$qb->setParameter(1, 100); // Sets ?1 to 100, and thus we will fetch a user with u.id = 100
	You are not forced to enumerate your placeholders as the alternative syntax is available:

	methode 2:
	// $qb instanceof QueryBuilder

	$qb->select('u')
	   ->from('User', 'u')
	   ->where('u.id = :identifier')
	   ->orderBy('u.name', 'ASC');
	 
	$qb->setParameter('identifier', 100); // Sets :identifier to 100, and thus we will fetch a user with u.id = 100

	PS : To safely work with the QueryBuilder you should NEVER pass user input to any of the methods of the QueryBuilder and use the placeholder ? or :name syntax in combination with $queryBuilder->setParameter($placeholder, $value) instead.


Association Mapping : 
http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/reference/association-mapping.html

Query Builder :
http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/reference/query-builder.html
http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/query-builder.html

* * *

4.4. Doctrine Mapping Types :

The type option used in the @Column accepts any of the existing Doctrine types or even your own custom types. A Doctrine type defines the conversion between PHP and SQL types, independent from the database vendor you are using. All Mapping Types that ship with Doctrine are fully portable between the supported database systems.

As an example, the Doctrine Mapping Type string defines the mapping from a PHP string to a SQL VARCHAR (or VARCHAR2 etc. depending on the RDBMS brand). Here is a quick overview of the built-in mapping types:

string: Type that maps a SQL VARCHAR to a PHP string.
integer: Type that maps a SQL INT to a PHP integer.
smallint: Type that maps a database SMALLINT to a PHP integer.
bigint: Type that maps a database BIGINT to a PHP string.
boolean: Type that maps a SQL boolean or equivalent (TINYINT) to a PHP boolean.
decimal: Type that maps a SQL DECIMAL to a PHP string.
date: Type that maps a SQL DATETIME to a PHP DateTime object.
time: Type that maps a SQL TIME to a PHP DateTime object.
datetime: Type that maps a SQL DATETIME/TIMESTAMP to a PHP DateTime object.
datetimetz: Type that maps a SQL DATETIME/TIMESTAMP to a PHP DateTime object with timezone.
text: Type that maps a SQL CLOB to a PHP string.
object: Type that maps a SQL CLOB to a PHP object using serialize() and unserialize()
array: Type that maps a SQL CLOB to a PHP array using serialize() and unserialize()
simple_array: Type that maps a SQL CLOB to a PHP array using implode() and explode(), with a comma as delimiter. IMPORTANT Only use this type if you are sure that your values cannot contain a ”,”.
json_array: Type that maps a SQL CLOB to a PHP array using json_encode() and json_decode()
float: Type that maps a SQL Float (Double Precision) to a PHP double. IMPORTANT: Works only with locale settings that use decimal points as separator.
guid: Type that maps a database GUID/UUID to a PHP string. Defaults to varchar but uses a specific type if the platform supports it.
blob: Type that maps a SQL BLOB to a PHP resource stream
A cookbook article shows how to define your own custom mapping types.

DateTime and Object types are compared by reference, not by value. Doctrine updates this values if the reference changes and therefore behaves as if these objects are immutable value objects.
All Date types assume that you are exclusively using the default timezone set by date_default_timezone_set() or by the php.ini configuration date.timezone. Working with different timezones will cause troubles and unexpected behavior.
If you need specific timezone handling you have to handle this in your domain, converting all the values back and forth from UTC. There is also a cookbook entry on working with datetimes that gives hints for implementing multi timezone applications.

* * *