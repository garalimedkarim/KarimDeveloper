
https://www.learnrxjs.io/operators/creation/range.html

#Obserbable
	// Create simple observable that emits three values
	const myObservable = of(1, 2, 3);
	 
	// Create observer object with its three methods
	const myObserver = {
	  next: x => console.log('Observer got a next value: ' + x),
	  error: err => console.error('Observer got an error: ' + err),
	  complete: () => console.log('Observer got a complete notification'), //if observable know no more value or when doing unsubscribe.
	};
	 
	// Execute with the observer object
	myObservable.subscribe(myObserver);
	
#Subject
	Exple1:
		#Pure TS exemple
		var clickEmitted = new Rx.Subject();
		var button = document.querySelector('button');
		var div = document.querySelector('div');
		
		button.addEventListener('click', ()=>{
			clickEmitted.next('Clicked!');
		});
		
		clickEmitted.subscribe(
			(value) => div.textContent = value;
		);
		
	Exple2
		var subject = new Rx.Subject();

		subject.subscribe({
			next: function(value) {
			console.log(value);
		  },
		  error: function(error) {
			console.log(error);
		  },
		  complete: function() {
			console.log('Complete');
		  }
		});

		subject.subscribe({
			next: function(value) {
			console.log(value);
		  }
		});

		subject.next('A new data piece'); //output: "A new data piece" twice
		subject.complete();
		subject.next('New value');	//no output because already completed in the previous line.

#From
	=> Convert Arrray to Observable
	const source = from([1, 2, 3, 4, 5]);
	
#Of
	// RxJS v6+
	import { of } from 'rxjs';
	//emits any number of provided values in sequence
	const source = of(1, 2, 3, 4, 5);
	//output: 1,2,3,4,5
	const subscribe = source.subscribe(val => console.log(val));


#Range:
		const source = range(1, 10);
	//output: 1,2,3,4,5,6,7,8,9,10

#Map
	Exple1:
		const source = from([1, 2, 3, 4, 5]);
		//add 10 to each value
		const example = source.pipe(map(val => val + 10));
		//output: 11,12,13,14,15
		const subscribe = example.subscribe(val => console.log(val));	
		
	Exple2:
		const source = from([
		  { name: 'Joe', age: 30 },
		  { name: 'Frank', age: 20 },
		  { name: 'Ryan', age: 50 }
		]);
		//grab each persons name, could also use pluck for this scenario
		const example = source.pipe(map(({ name }) => name));
		//output: "Joe","Frank","Ryan"
		const subscribe = example.subscribe(val => console.log(val));	

#Take
	Take n value and complete observation
	take from array n first values before converting to Observable
	Exple:
		//emit value every 1s
		const interval$ = interval(1000);
		//take the first 5 emitted values
		const example = interval$.pipe(take(5));
		//output: 0,1,2,3,4
		const subscribe = example.subscribe(val => console.log(val));
		
#SwitchMap
	return Observable
	Exple
		var button = document.querySelector('button');

		var obs1 = Rx.Observable.fromEvent(button, 'click');
		var obs2 = Rx.Observable.interval(2000);

		obs1.switchMap(
			event => {
			return obs2
		  }
		)
		.subscribe(
		 (value) => console.log(value)
		);	
