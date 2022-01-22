<?php

PHP GET STARTED (PluralSight):
I-What is PHP:
	XAMPP INSTALL (from apache friends):
		ENABLE LOCALHOST in Network Tab of XAMPP
			localhost:8080/
			localhost:8080/phpmyadmin

		ACCES TO ROOT FOLDER:
			EXPLORE FILES: 
				VIA XAMP INTERFACE VOLUME Mount >> In the Finder we have a new mounted Volume callad "192,168,*,*"
			SHELL: 
				/Users/kanou/.bitnami/stackman/machines/xampp/volumes/root/htdocs/PHP
			Create a "PHP" folder under httdocs:
				localhost:8080/PHP/karim.php
		
		phpinfo(); // PHP version, infos about the system, configuration of Apache, PHP extensions installed, 

		 $_GET, $_POST, $_COOKIE, $_SERVER, $_FILES, $_ENV, $_REQUEST, and $_SESSION.

		

II-Working with Forms:
Escaping Form Output:
	htmlspecialchars(string) // echo htmlspecialchars("<strong>Karim</strong><br>"); => <strong>Karim</strong><br> //ignore HTML compilation	
	-> when entring <i>hi</i> doesnt exec html.
	-> used only when outputting in HTML.
Validating the Form:
	
Validation With Regular Expression:
	preg_match($regex, $)


III-Database
mysqli_real_escape_string() //avoid SQL INJECTION 
close connection after any operation to free Ressource

Inserting Data
Updating Data
	ctype_digit($id); //boolean 00012450
	header('Location: select.php');

IV-Conclusion
	Creating a Common Navigation
		readfile('nav.tmpl.php'); //this file contains nav with links to insert.php, etc...

	Hashing password 
		password_hash($password, PASSWORD_DEFAULT); //default 
		password_verify($password1,$password2);

	State Management and Sessions
		SESSION : uses cookies with a unique ID to identify/remeber Users
		SESSION is by default enabled but sending the cookie is done by this command
			session_start()
		COOKIE -> HTTP HEADER


Learn PHP 5 In Arabic (ElZero Web) 
	https://www.youtube.com/watch?v=-u9_T_CLZHY&list=PLDoPjvoNmBAzH72MTPuAAaYfReraNlQgM&index=1
1.Introduction:
2.What I Need:
	Apache : Web Server 
	PHP : need a Web Server to run into it.
	Software Facilating download of PHP + Apache + MySql : XAMPP,LAMP,MAMP,WampServer.
	IDE : Integrated Develop Env as SublimeText,NetBeans,etc...
3.Setup & Configure XAMPP
4.Syntax
5.Output(echo/print)
6.Variables
7.Concatination 
8.Comments 
9.Data Type 
	get_type($var1);
	var_dump($var1);
	NULL,integer,double,string,boolean,array,object,Ressource.
	float point number : double : real numbers : (10.5)
	NULL 
	object
	$var8 = fopen('karim.txt','r'); get_type($var8); // resource if it exists and boolean false if not
    
10.Constants
	can not redefined => when redefined => ERROR.
	Declaration
		define(CONST_NAME,"value",opt :true or false); //by default false => exact Name
		const CONST_NAME = "value";
	Exple of Predefined Csts:
		echo CONST_NAME; //without $
		echo __FILE__;
		echo __DIR__;
		echo PHP_INT_MAX;

11.If/Else
12.Operators
	Arithmetic Operators: + - * / % 
13.Assignment Operators: .=,+=,-=,*=
14.Comparaison Operators: ==, ===, !=, !==
15.Increment/Decrement Operators: 
	PreIncrement: Increment before interpreting the code line: --$i , ++$i;
	PostIncrement : $i++;+$i--;
16.Logical Operators: &&,xor,or,!,
17.Error Control Operator:
	$file = @fopen('file.txt','r'); or die('error'); // doesn't print if there is error, takelha w t3addiha fel or testsarref fiha.
	(@include("include.php")) or die("This File is not Here");
18.String Operators
19.All Operators
20.For Loop
21.For Loop Advanced
22.While Loop
23.Do, While Loop
24.Foreach Loop
25.All Loop Practice
26.Function Intro
27.Function With Arguments
28.Function With Return
29.Function Return vs Echo
30.Function Advanced
31.Array Intro
32.Array Indexed
33.Array Associative
34.Array Multidimensional
35.Array Practice
	see Array functions in the Officiel Doc.
36.Array Methods - Search
	in_array(); //3rd arg opt = true => Identical
	array_key_exists(key, array)
37.Array Methods - Add Items
	array_push(array, var1, var2, ...); // push in the end
	array_unshift(array, var1, var2, ...); // push in the beginning
38.Array Methods - Remove Items
	array_shift(array); // remove first 
	array_pop(array); // remove last
39.Array Methods - Sort Indexed Array
	sort(array,opt); //SORT_REGULAR default
	rsort(array,opt); //reverse sort = same as sort but DESC, sort : ASC
40.Sort Associative Array
	asort(array,opt); //associative sort, save the keys 
	arsort(array,opt); //associative reverse sort, save the keys
	ksort(array,opt); //keys sort
	krsort(array,opt); 
41.Array Methods - Shuffle, Reverse
	array_reverse(array,optPerserveIndex=false); // reverse the array
	shuffle(array); // machki array randomly
42.Array Fill
	array_fill(start_index, number, value); // fill the array with the same value.
43.Array Methods - Array Sum
	array_sum(array);
44.Array Rand
	array_rand(array,n); // get random n elements from the array
45.Array Unique
	array_unique(array,opt); //opt = Regular or 
46.String Functions - Explode
	explode(delimiter, string, limitOpt);
47.String Functions - Implode
	implode(separator, array)
48.String Functions - Str_Split, Chunk_Split
	str_split(string,length); //from string to array of "length" chars
	chunk_split(body) // I ignored it
49.Str_Replace
	str_replace(search, replace, string, $returnedInt); // returnedInt how many replace It have done with this function
	str_replace(array("-","+","="), " ", $string);
	str_replace(array("-","+","="), array("--","++"), $string); //not matched takes ""
50.String Functions - Str_[Repeat, Shuffle], StrLen
	str_repeat(string, n);
	str_shuffle(str); // machki el 7ourouf
	strlen(string) // length
51.String Functions - AddSlashes, Strip_Tags
	strip_tags(str,"<i><b>"); // remove all html tags but allow i and b tags
	addslashes(str); //add splashes to special chars as ' or " or / before saving in the DB.
	stripslashes(str); //remove slashes after getting from DB.
52.String Functions - strtolower, strtoupper
	strtolower/strtoupper/lcfirst/ucfirst(str)/ucwords(str)
53.String Functions - Trim
	trim(string,charList); //chars to trim from the string from right and left (not from center)
	\n New line
	\t Tab
	\0 NULL
	\r carriage return
	\x0B
	" "
	https://stackoverflow.com/questions/3091524/what-are-carriage-return-linefeed-and-form-feed
	ltrim(str,"I love"); // remove from left
	rtrim(str, " "); // remove spaces from right only
54.String Functions - Str_Word_Count
	str_word_count(string); // return words number in the string
55.String Functions - Nl2br, Parse_Str
	parse_str(url); //url?var1=val&var2=val2
	=> generate $var1 and $var2 automatically
	parse_str(str,opt:Array); //array contains all variables
	nl2br(string); //transform /n to <br> in the String
56.String Functions - StrPos, StriPos, StrrPos
	strpos(string,"I Love",OptOffset); // return the pos of I Love existing after OptOffset
	stripos(haystack, needle)
	strrpos(haystack, needle)
	strripos(haystack, needle)
57.String Functions - StrStr, StriStr, StrChr
	strchr alias of strstr(string, search_str, optBoolean); //return a string from search_str to the last or to the first according to the optBoolean
	stristr(haystack, needle)
58.String Functions - Strcmp, StrnCmp, StrRev
	strcmp(str1, str2) // 0 => the 2 strings are equals.
	strncmp(str1, str2, n); //compare the first n chars
	strrev(string) //reverse string
59.String Functions - SubStr
	substr(string, start, OptionalnumberOfChars); // get a pieace from string, if opt not defined, to the last of string
	// if start and OptianlnumverOfChars are negatif it's possible
60.String Functions - Substr_[Compare, Count]
	substr_count(main_str, str,start,length); // count str occurences in string
	substr_compare(main_str, str, start_main, length, Case); //return 0 if equals
61.Control Structure - Include, Require
	require // fatal error when the file doesn't exist
	include // just Warning when the file doesn't exist
	=> require_once is what we must use usually to avoid unexistant files + to import the file once ("_once")
62.Control Structure - Switch
63.File System - Intro
	Officiel Doc: php filesystem : https://www.w3schools.com/php/php_ref_filesystem.asp

64.File System - File_Exists, Is_Writable
    echo __FILE__; echo "<br>"; // current file localtion
    echo dirname(__FILE__); // dirname of the currentfile, now __DIR__ do the same job;
    echo __DIR__; // dirname(__FILE__);
    if(	)
    file_put_contents(filename, data); //if the file !exists, it creates it
	is_writable(filename); //boolean
65.File System - MkDir, RmDir, Is_Dir
66.File System - Dirname, Basename
	dirname(__FILE__,2); // dirname/../../ (PHP7+)
	echo __FILE__; // C://Xampp/.../file.php
	basename(__FILE__); // manipulation of the file name (ext or not).
67.File System - Simple Training 1
68.File System - File Put Contents
	file_put_contents('filename.txt', 'data', FILE_APPEND ¶ LOCK_EX);
69.File System - File Get Contents
	file_get_contents('filename',false,NULL,14,9); // from pos 14 read 9 chars
70.File System - Rename, Copy
	copy(source, dest); // return boolean copied or failed to copy
	rename(oldname, newname); // file or dir same command
71.File System - Pathinfo
	print_r(pathinfo(__FILE__)); // return array(dirname,basename,extension,filename)	
72.File System - Unlink, RmDir + Examples
	unlink(filename); //remove file
	if filename readonly -> Error when unlinking
	rmdir(dirname); //remove directory
73.File System - Scandir
	scandir(directory,opt_sort,opt_contexte);
74.File System - Fopen
	https://www.youtube.com/watch?v=aPOyqxUvTKk&index=74&list=PLDoPjvoNmBAzH72MTPuAAaYfReraNlQgM
75.File System - Fread
76.File System - Fwrite
77.File System - Fseek
78.File System - Fclose + Training 2

79.Predefined Variables - Globals
	$name = "Ahmed"; // in principal script
	function testFunc(){
		echo $_GLOBALS['name'];
		$_GLOBALS['name2'] = "Karim"
	}
	echo $_GLOBALS['name2'];

80.Predefined Variables - Server
	$_SERVER['PHP_SELF'];
	$_SERVER['SERVER_NAME'];
	$_SERVER['QUERY_STRING'];
	$_SERVER['HTTP_REFERER']; // from what IP u are coming
	$_SERVER['SERVER_PORT'];
	$_SERVER['DOCUMENT_ROOT'];
81.Predefined Variables - Get
	$_GET['name']
	var_dump(parse_url($url)); //array of get parameters
82.Predefined Variables - Post
	$_POST['name'];
	$_REQUEST['REQUEST_METHOD']; // GET or POST
83.Predefined Variables - Request
	$_REQUEST = $_GET U $_POST 
84. Cookies - Check If Cookie Is Enabled
	$_COOKIE['name'];
	setcookie(name,value,time,"/");
	"/" // enable for all the website
	if (count($_COOKIE) > 0)//cookies are enabled 	
85.Cookies - Set Cookie + Examples
	setcookie ($name,$value,$expires,$pathInDomain,$domain,$secure,$httponly) : bool //secure = https, httponly = Javascript doesn't access to cookie
	setcookie("token","_dsqo44",time()+60,"/","klopup.com",true,true);
86.Modify, Delete Cookie + Training
	setcookie('background',$mainColor, time()+3600, '/');
	//to delete the cookie set it with time()-3600 //negative time => deleted cookie
87.Session - Start | Resume Session
	session_start(); //on the top of any file that wants to use SESSION
	$_SESSION['username'];
88.Session - Modify Session
89.Session - End | Destroy Session
	session_unset(); //just clears the $_SESSION variable. It’s equivalent to doing: $_SESSION = array(); // session still exist
	session_destroy(); // delete the whole session, we have to make a new start_session() to reuse $_SESSION
90.Session Training - Simple Counter
	opt:
		session_start([
		    'cookie_lifetime' => 86400,
		]);
	by default session in server doesnt start automatically.
91.Session Training - Simple Login
	//we have to prevent any other request method in login_check.php
	if ($_SERVER['REQUEST_METHOD'] == 'POST'){
		//login logic
	}
	header('REFRESH:5;URL=control.php');
92.Misc Functions - Sleep, uSleep + Examples
	sleep(5); //sleep 5s
	usleep(5000000) //sleep 5s (microsecond)
	time_sleep_until(time()+5); //timestamp arg

93. Misc Functions - Exit, Die + Examples
	//exit == die
94. Misc Functions - Uniqid + Examples
	//unique identifier
	$random = uniqid();
95.Filter - Whats Filter & Why To Use it
	foreach ($filter_list() as $filter) {
		echo $filter . '<br>';
	}
	filter_var($myVariable, FILTER_TYPE, options);
96.Filter - Filter_Var Basics
	//php type of filters:
	// * validate filters : boolean,number,etc..
	// * sanitize filters
	// * others
	// * flags
	if (filter_var(variable, FILTER_VALIDATE_INT)){
		// true
	}
	//FILTER_VALIDATE_IP
	cmd : > ping facebook.com //return the IP

97.Filter - Filter_Var Advanced
	$opt = array(
		'options' => array(
			'min_range' => 1,
			'max_range' => 999999,
		),
		'flags' => array(

		)
	filter_var(variable,filter_type,$opt)

	)
98.Filter - Validate vs Sanitize
	Validating data = Determine if the data is in proper form.

	Sanitizing data = Remove any illegal character from the data.
99.Date - Date Intro
	echo time(); //timestamp linux
	echo date('Y-m-d'); //
	//time depend on timezone
	echo date_default_timezone_get();
	//setTimeZone
	date_default_timezone_set('Asia/Riyadh');
	//liste of timezone PHP
	search google
	//time + month
	$nextWeek = time() + (30 * 24 * 60 *60);
	echo date ('Y-m-d h:i:s',$nextWeek);
100.Date - Date Advanced
101.Date - Strtotime
	$time = strtotime('now'); // +1 day, +2 day, etc... 
	//next Monday, last Friday, etc...

102. What s Php.ini File
	//php initilize
	error_reporting(0); //disable error in a page
	//to disable error in all pages
	//XAMP/php/php.ini
	//When modifiyin php.ini update, restart apache to take changes.
	max_execution_time = 
	/phpinfo.php
	asp_tags : <% %> instead of <?php ?>
103.


Apprendre PHP (Grafikart.fr)
	https://www.youtube.com/playlist?list=PLjwdMgw5TTLVDv-ceONHM_C19dPW1MAMD
	
38.Exercice : Tableau dynamique:
	http_build_query($array); // "p=a&q=3"


	
XSS Attack : cross-site Script Attack (injecting script in FORMS)
	prevent it by 
	<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = test_input($_POST["name"]);
  $email = test_input($_POST["email"]);
  $website = test_input($_POST["website"]);
  $comment = test_input($_POST["comment"]);
  $gender = test_input($_POST["gender"]);
}

#Track php_error_log file realtime like (ng serve):
> tail -f /opt/lampp/logs/php_error_log
