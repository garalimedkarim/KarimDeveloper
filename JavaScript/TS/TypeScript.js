
Course: typescript handbook: https://www.typescriptlang.org/docs/handbook/basic-types.html
1.Basic Types:
any:
	let notSure: any = 4;
boolean: 
	let isDone: boolean = false;
number:
	let decimal: number = 6;
	let hex: number = 0xf00d;
	let binary: number = 0b1010;
	let octal: number = 0o744;
string:
	let color: string = "blue";
	let sentence: string = `Hello, my name is ${ fullName }.
Array:
	Array types can be written in one of two ways:
	let list: number[] = [1, 2, 3];
	The second way uses a generic array type, Array<elemType>:
	let list: Array<number> = [1, 2, 3];
Tuple
	// Declare a tuple type
	let x: [string, number];
	// Initialize it
	x = ["hello", 10]; // OK
	// Initialize it incorrectly
	x = [10, "hello"]; // Error
Enum
	enum Color {Red, Green, Blue}
	let c: Color = Color.Green;
void: //no returned value
	function warnUser(): void {
		console.log("This is my warning message");
	}
never:
	// Function returning never must have unreachable end point
	function infiniteLoop(): never {
		while (true) {
		}
	}
object:
	anything that is not number, string, boolean, symbol, null, or undefined.
Type assertions (casting)
2 ways:
	let someValue: any = "this is a string";
	1)let strLength: number = (<string>someValue).length;
	2)let strLength: number = (someValue as string).length;

2.Variable declarations:
	let vs var
	You should use let instead of var whenever possible. (ignored details)

3.Interfaces:
Optional Properties
	interface SquareConfig {
		color?: string; //optional parameter
		readonly x: number; //modifiable only when an object is first created
		greet(message: string): void; //typed function
	}

Using Interface:
	1)class Clock implements SquareConfig
	2)let clock = <SquareConfig>{};clock.color = 'red';

Hybrid Types
readonly vs const:
	Variables use const whereas properties use readonly

ReadonlyArray:
	let a: number[] = [1, 2, 3, 4];
	let ro: ReadonlyArray<number> = a;	

Indexable Types
	interface StringArray {
    [index: number]: string;
	}
	let myArray: StringArray;
	myArray = ["Bob", "Fred"];
	
Class Types
Implementing an interface
	interface ClockInterface {
		currentTime: Date;
		setTime(d: Date): void;
	}

	class Clock implements ClockInterface {
		currentTime: Date = new Date();
		setTime(d: Date) {
			this.currentTime = d;
		}
		constructor(h: number, m: number) { }
	}
Extending Interfaces

4.Classes:
Inheritance:
	class Animal {
		name: string;
		constructor(theName: string) { this.name = theName; }
		move(distanceInMeters: number = 0) {
			console.log(`${this.name} moved ${distanceInMeters}m.`);
		}
	}

	class Snake extends Animal {
		constructor(name: string) { super(name); }
		move(distanceInMeters = 5) {
			console.log("Slithering...");
			super.move(distanceInMeters);
		}
	}

	class Horse extends Animal {
		constructor(name: string) { super(name); }
		move(distanceInMeters = 45) {
			console.log("Galloping...");
			super.move(distanceInMeters);
		}
	}

	let sam = new Snake("Sammy the Python");
	let tom: Animal = new Horse("Tommy the Palomino");

	sam.move();
	tom.move(34);

Public, private, and protected modifiers
Public by default
Accessors

Readonly modifier
	Class A{
		readonly name: string; //Readonly properties must be initialized at their declaration or in the constructor.
	}
Static Properties
	class Grid {
		static origin = {x: 0, y: 0};	
	}
Abstract Classes
	Methods within an abstract class that are marked as abstract do not contain an implementation and must be implemented in derived classes.
	abstract class Animal {
		abstract makeSound(): void;
		move(): void {
			console.log("roaming the earth...");
		}
	}
Advanced Techniques
	Constructor functions

Using a class as an interface
	class Point {
		x: number;
		y: number;
	}

	interface Point3d extends Point {
		z: number;
	}

	let point3d: Point3d = {x: 1, y: 2, z: 3};

5.Functions:
Function Declaration: (2 ways)
	// Named function
	function add(x, y) {
		return x + y;
	}
	// Anonymous function
	let myAdd = function(x, y) { return x + y; };

Function Types
		let myAdd = function(x: number, y: number): number { return x + y; };
Writing the function type:
	A function’s type has the same two parts: the type of the arguments and the return type. When writing out the whole function type, both parts are required:
		let myAdd: (x: number, y: number) => number =
		function(x: number, y: number): number { return x + y; };

Optional and Default Parameters
	function buildName(firstName: string, lastName?: string, lastName = "Smith") { //Optional
	
Rest Parameters
	function buildName(firstName: string, ...restOfName: string[]) {
		return firstName + " " + restOfName.join(" ");
	}
	// employeeName will be "Joseph Samuel Lucas MacKinzie"
	let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");


9.Modules:
Export:
	export const numberRegexp = /^[0-9]+$/;

	export class ZipCodeValidator implements StringValidator {
		isAcceptable(s: string) {
			return s.length === 5 && numberRegexp.test(s);
		}
	}

Import:
	import { ZipCodeValidator as ZipCodeValidator2 } from "./ZipCodeValidator";
	let myValidator = new ZipCodeValidator2();


#Typing Vs Casting
Typing:
obj: Ingrediant[];
#Casting an obj to another Type:
	var myObject: TypeA;
	var otherObject: any;
	// values are assigned to them, and...
	myObject = <TypeA> otherObject;     // using <>
	myObject = otherObject as TypeA;    // using as keyword

//--
There are 4 possible convertion methods in TypeScript for arrays:
let x = []; //any[]

let y1 = x as number[];
let z1 = x as Array<number>;
let y2 = <number[]>x;
let z2 = <Array<number>>x;

//-- 

#Promise:
	new Promise(function(resolve, reject) {
	      if (false) {
	          var phone = {
	              brand: 'Samsung',
	              color: 'black'
	          };
	          resolve(phone); // fulfilled
	      } else {
	          var reason = new Error('mom is not happy');
	          reject(reason); // reject
	      }
	});

#Asynchronous:
	  test(){
	    alert('0');
	    new Promise(resolve => {
	      setTimeout(() => {
	        alert('1');
	        resolve();
	      },5000);
	    })
	    .then(()=>{
	      setTimeout(() => {
	        alert('2');
	      },2000);
	    });
	  }

#How to access the correct `this` inside a callback?
	https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback?noredirect=1&lq=1

#Async Functions
	//async function => return Promise
	function resolveAfter2Seconds() {
	  return new Promise(resolve => {
	    setTimeout(() => {
	      resolve('resolved');
	    }, 2000);
	  });
	}

	async function asyncCall() {
	  console.log('calling');
	  var result = await resolveAfter2Seconds();
	  console.log(result);
	  // expected output: 'resolved'
	}

	asyncCall();

	//OUTPUT:
		> "calling"
		> "resolved"
	//await is only valid in async function


#Recursive Promises:
1) Exple1:
	// Recurse on a given promise chain
	function recurse(amount) {
	  if (amount === 0) {
	    return Promise.resolve(amount);
	  }
	  out(amount - 1);

	  return Promise.resolve().then(function() {
	    return recurse(amount - 1);
	  })
	}

	function doTheThing() {
	  Promise.resolve(10).then(recurse)
	  .then(()=>{
	    out('end');
	  });
	}

2)Exple2:
	const aaa = async n =>
	  n < 100
	    ? driver (n) .then (aaa)
	    : n

	const driver = async n =>
	  n + 1

	aaa (0) .then
	  ( res => console .log ("res", res)
	  , err => console .error ("err", err)
	  )
	  // res 100

3)My Solution with editor warning:
	function aaa(index) {
	      console.log(index);
	      return Promise.resolve(index)
	            .then((index) => {
	                  driver(index)
	                        .then( index => {
	                              if (index < 100)
	                                    return aaa(index);
	                              else
	                                    return Promise.resolve(index);
	                        });
	            });
	}

	function driver(index) {
	      return new Promise(resolve => {
	            resolve(index + 1);
	      });
	}

	function doTheThing() {
	  Promise.resolve(0).then(aaa)
	  .then(()=>{
	    alert('end');
	  });
	}

	doTheThing();

4) my Clean Solution
	function aaa(index) {
	      return driver(index)
	      .then(index => {
	            if (index < 100)
	                  return aaa(index);
	            else {
	                  return Promise.resolve(index);
	                  console.log('finito' + index);
	            }     
	      })

	}

	function driver(index) {
	      return new Promise(resolve => {
	            resolve(index + 1);
	      });
	}

	aaa(0)
	.then(res => console.log("res", res));

	#for wait for async functions:
	Exple1:
		async function myFunction() {
		    for (let i = 0; i < 10; i++){
		        console.log("iii", i);
		        let j = await timed(i);
		        console.log("jjj", j);
		    }
		}

		function timed(j) {
		    // return ++j;
		    return new Promise(resolve => {
		        setTimeout(() => {
		            resolve(++j);
		        }, 1000);
		    });
		}

		myFunction();
	Exple2:
		var array = [1, 2, 3, 5, , 6, 7, 8, 9, 7];

		function timed(j) {
		    // return ++j;
		    return new Promise(resolve => {
		        setTimeout(() => {
		            resolve(++j);
		        }, 1000);
		    });
		}

		function retard(){
		    return new Promise(resolve => {
		        setTimeout(() => {
		            resolve('OK');
		        }, 1000);
		    });
		}

		async function myFunction2() {
		    return retard()
		    .then(async res => {
		        var result = 0;
		        console.log("res", res);
		        for (let i = 0; i < array.length; i++){
		            console.log("before", i);
		            var k = await timed(i);
		            result = result + +k;
		            console.log("resss", result);
		            console.log("after", k);
		        }
		        return result;
		    })

		}

		myFunction2()
		.then(res => console.log("resuuuuult", res) );

#Wait Until Condition:
	function delay(timer) {
	    return new Promise(resolve => {
	        timer = timer || 2000;
	        setTimeout(function () {
	            resolve();
	        }, timer);
	    });
	}

	var flag = false;

	//And define what ever you want with async fuction
	async function some() {
	    while (!flag) {
	        await delay(1000);
	        alert('call');
	    }
	    alert('end');
	};


	setTimeout(() => {
	    flag = true;
	}, 3000);

	some();
