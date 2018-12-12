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