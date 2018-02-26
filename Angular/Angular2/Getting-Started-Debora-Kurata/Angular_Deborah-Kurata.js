I-Course Overview:

II-Introduction:
1.Introduction:
2.Anatomy of an Angular Application:
	App = [components,services across components]
	Component = View:Template + Associated Code:Class(props+methodes) + Additional Data:Metadata
	Root Angular Module <=> Components
	Root Angular Module <=> (Feature Angular Modules <=> Components	)

3.Get the Most from this Course:
4.Sample App:
5.Course Outline:

III-First Things First:
1.Introduction:
2.Selecting a Language:
	We don't use native Js with Angular dev (recommended)
	Js language specification standard = ECMAscript (ES):
	ES3 : supported by older browsers
	ES5 : supported by modern browsers
	ES6 : not yet supported by all browsers
	=> ES6 must be compiled to ES5 by a tool
	TypeScript: most used
	
	TypeScript:
		Open source language
		superset of JS
		transpile to JS
		Strongly typed
			type defintion files : *.d.ts
		Implements ES 2015 class-based Object
		Implements classes, interfaces, and inheritance
		Ref: www.typescriptlang.org/Playground/:
			running live TypeScript

3.Selecting an Editor:
4.Setting up Our Environment:
	npm
	Set up the Angular application
5.Setting up an Angular App:
	1 create app Folder
	2 add package defintions and config files
	3 Install the packages
	4 create the app Root Module
	5 create main.ts file // to load Angular modules.
	6 Create the host Web page: index.html
	
	We can generate this step with:
	1 Manual perform each step (not recommended)
	2 Download the result of theses steps
	3 Angular CLI : github/angular/angular-cli
	4 Download her project :
		https://github.com/DeborahK/Angular-GettingStarted
		
6.Installing an Angular App:
	src/app: src files specific for our app
	./files : boilerplate files : config + setup files
7.Runngin an Angular App:
	npm start : run the script start in package.json
	serve : build the app and starts a web server.
	serve -o : open the url in our default browser
	
	app.component.html

8.About Modules:
	Angular JS Modules resolve Namespaces + Code organization problems
	ES 2015: a module is a file and a file is a module
	TypeScript Modules, ES2015 Modules, Angular Modules
	
	//*ES 2015 Modules: 
		Create Module product def:
			#product.ts
				export class Product{...}
		Import the module
			#product-list.ts
				import { Product } from "./product"
	//*Angular Modules: 
		at lest one module by convention called	 : @module
		
	//ES Modules Vs Angular Modules : organize code files Vs organize Application

9.Summary:
	We Select the Language : TypeScript which use ES 2015
	
	
IV- Introduction to Components:
1. Introduction:
2. What is a Component:
	1Template : View (HTML including binding+directives)
	2Class : Support View (TypeScript including properties:data + methods)
	3Metadata: 

3. Creating the Component Class:
	
4. Defining the MetaData with a Decorator
	a class become a component when defing the Decorator @Component({Object})
	@Component({
		selector : 'pm-root', // if we plan to reference the Component in any HTML we specify a selector, it define the Directive name = custom HTML Tag
		template : '<div></div>',
	})

5. Importing What We Need:
	import => impl in TypeScript
	we can importe an Angular Modules
		list angular modules: www.npmjs.com/~angular
		exple
		import { Component } from '@angular/core';
	
6. Demo Creating the App Component
	Root Component : app.component.ts (convention TS)
7. Demo Creating the App Component
	import { Component } from '@angular/core';

	@Component({
	  selector: 'pm-root',
	  template: `
		<div> 
		  <h1> {{pageTitle}} </h1>
		  <div> my first Compenent </div>
		</div>  
	  `
	  // templateUrl: './app.component.html',
	  // styleUrls: ['./app.component.css']
	})

	export class AppComponent {
	  pageTitle: string =	  'Acme Product Manager';
	}

8. Bootstrapping Our App Component:
	SPA : Single Page Application
	We identify the class as angular module by attaching the NgModule decorator and passing Metadata defining the details of this angular module

	import {NgModule} from '@angular/core';
	import {BrowserModule} from '@angular/platform-browser';
	import {AppComponent} from './app.component';
	
	@NgModule({
		imports : [BrowserModule], //external modules that we want to be available to all component that belong to this Angular module. external module can be Angular's module, a third party or our own Angualr modules
		delaration : [AppComponent], //we define which of our components belong(appartient) to this module, by convention AppModule is the root module so we declare it here	
		bootstrap : [AppComponent], //define the startup component of the application
	})
	
	export class AppModule { }
	
9. Demo: Bootstrapping Our App
	@NgModule({
		declarations: [AppComponent], //so that Angular can locate its selector
		imports: [BrowserModule], //so that the app run correctly in the browser
		providers : [], //for services
		bootstrap : [AppCompoent],
	})

10. Checklists ans Summary:
	
V- Templates, Interpolation and Directives:
1.Introduction
2.Building a template:
	modified:   src/index.html //setting basic template of bootstrap4
	src/app/products/products-list.component.html //setting html of the template
	
3.Building the component:
	//src/app/products/products-list.component.ts:
	import { Component } from '@angular/core';

	@Component({
		selector: 'pm-products',
		templateUrl: './products-list.component.html'
	})

	export class ProductsListComponent {
		pageTitle : string = "Product List";
	}
4.Using a component as a directive:
	Two ways to get a directive of a component in our module:
		1) delcare its component in our component //declaration
		2) import a moudle that contains this module like we have done with //BrowserModule
	modified:   src/app/app.component.html : moving the template to this file
	modified:   src/app/app.component.ts : 
		-  tempalte : ``
		+  templateUrl: './app.component.html',
		+  styleUrls: ['./app.component.css']

	modified:   src/app/app.module.ts:	
		+import { ProductsListComponent } from './products/products-list.component';
		...
		//adding ProductsListComponent in the declarations array:
		 @NgModule({ declarations: [ AppComponent , ProductsListComponent ] , 

5.Binding with interpolation:
	Template(events) <=binding=> Class(props,methods)
	intropolation = One way Binding Class => Template
	<h1>{{var}}</h1> equivalent to <h1 innerText={{var}}></h1>
	
	#products-list.component.ts:
		pageTitle : string = "Product List";
	#products-list.component.html:
		{{pageTitle}}
	
6.Adding Logic with directives : *ngIf
	Angular built-in directives :
		Structural directives: *ngIf,*ngFor
		[BrowserModule] exposes those directives
	#products-list.component.ts:*
		+products : any[];
	#products-list.component.html:
		+<table class="table table-hover" *ngIf="products && products.length" >
		
7.Adding Logic with directives : *ngFor
	1) creating file products.ts containing some products to test:
	#products.ts:
	export const PRODUCTS: any[] = [{ product1 },{ product2 },...];
	2) importing it in the model: 
	#products-list.component.ts:
	+import { PRODUCTS } from './products';
	...
	+    products : any[] = PRODUCTS ; 
	#products-list.component.html:
		<tr *ngFor='let product of products'> //Angular selected to use "of" in the *ngFor expressions
		//let .. in = return index Vs let .. of return value
			<td> {{product.productName}} </td>
			<td> {{product.productCode}} </td>
			...
		</tr>	
   
8.Checklist and Summary:
Inline template/ Linked template(templateUrl:"")
Use a compoenent as a directive (<pm-products>)
Binding with interpolation
Adding logic with directives


VI- Data Binding & Pipes
1.Introdcution:
2.Property binding:
	when the interpolation is in the tag attribute, we call this "property binding":
	<img [src]='product.imageUrl'> === <img src={{product.imageUrl}}>

	modified:   src/app/products/products-list.component.ts:
		+    imageWidth: number=50;
	modified:   src/app/products/products-list.component.html:
		-    <td></td>
		+    <td> <img src={{product.imageUrl}} [title]='product.productName' [style.width.px]='imageWidth'> </td>

3.Handling events with event binding:
	<tag (target-event)>
	DOM valid events : https://developer.mozilla.org/en-US/docs/Web/Events
	
	#products-list.component.ts:
    showImages:boolean = false;
    toggleImage():void{
        this.showImages = !this.showImages;
    }
	#products-list.component.html:
	<button class="btn btn-primary" (click)="toggleImage()">
		{{showImages? 'Hide' : 'Show' }} Images
	</button>
	...
	<td> <img src={{product.imageUrl}} [title]='product.productName' [style.width.px]='imageWidth' *ngIf="showImages"> </td>
	
		
4.Handling input with two way binding:
		delcarations : directives,components and pipes
		imports : other ressource such Angular its self and third parties are defined in external Angular module
	#modified:   src/app/app.module.ts: //import ngModel ressource:
		+import { FormsModule } from '@angular/forms';
		...
		imports: [
			BrowserModule,
		+	FormsModule,
		],
	
	#modified:   src/app/products/products-list.component.html:
+       <input type="text" [(ngModel)]="listFilter"/>
...
+       <h3>Filtred by: {{listFilter}}</h3>

	#modified:   src/app/products/products-list.component.ts
+    listFilter :string = 'cart';

5.Transforming Data with pipes:
	Angular provides some build-in pipes (date,number,decimal,percent,currency,slice &&forObjects:json,...)
	#modified:   src/app/products/products-list.component.html:
		<td>{{product.productCode | lowercase }}</td>
		<td>{{product.price | currency:'USD':true:'1.2-2' }}</td>
	
6.Checklists and Summary:
	There is 4 Data Binding types:
		Interpolation: {{pageTitle}}
		Property Binding: <img [src]="product.imageUrl">
		Two-way Binding: <input type="text" [(ngModel)]="listFilter"/> //requires an import "FormsModule"
		Event Binding: <button class="btn btn-primary" (click)="toggleImage()">

	delcarations in a module => that module tells this is my children they can have all my imports
	
	Pipes:
		{{product.price | currency:'USD':true:'1.2-2' }} //  separator ":" the params
		
VII- More on Components:
1.Introduction:
	Defining Interfaces => strongly type our objects
	Encapsulating Component Styles => 	
	Using Lifecycle Hooks
	Building Custom Pipes
	
2.Defining Interfaces:
	TypeScript => Strongly type (every property,method,method's parameter has a type)
	products : any[] ; // no type
	Interface : a specification identifying a related set of properties and method.
	ES5 and ES2015 don't support interfaces but TypeScrit does.
	
	If a class don't contain method => Interface is better.
	either we can emplement a class from an interface :
	
	export class Prouct implements IProduct{
		constructor(public productId:number,
					public productName:string,
					...,
					)
		{ ... }
		
		calculate(percent: number):number{
			return ...;
		}			
	}
	
	#src/app/products/iproduct.ts:
		export interface IProduct {
			productId : number,
			productName: string,
			productCode: string,
			releaseDate: string,
			description: string,
			price: number,
			starRating: number,
			imageUrl: string,
		}
	#src/app/products/products-list.component.ts:
	+import { IProduct } from './iproduct';
	...
	+    products : IProduct[] = PRODUCTS ;
	
3.Encapsulation Component Style: //Adding a css file to the component:
	#modified:   src/app/products/products-list.component.ts:
		+    styleUrls: ['./products-list.component.css'],
	#src/app/products/products-list.component.css:
		thead {
			color: rgb(43, 122, 226);
		}		

4.Using Lifecycle Hooks:
	OnInit: Perform component initialization, retrieve data,
	OnChanges: Perform action after change to input properties,
	OnDestroy: Perform cleanup
	We need to import every cycle hook we want to implement in the class(Angular 2 only)
		import {OnInit, Component} from '@angular/core';
		export class X implments OnInit{
			//...
			ngOnInit(): void{
				console.log("onInit");
			}
		}
		
5.Building Custom pipes:
	#src/app/shared/convert-to-spaces.pipe.ts
	import { Pipe, PipeTransform} from '@angular/core';
	@Pipe({
		name: 'convertToSpaces'
	})
	export class ConvertToSpacesPipe implements PipeTransform {
		transform(value:string,character:string) {
			return value.replace(character,'--');
			//return value.replace(new RegExp(character, 'g'),'/');
		}
	}
	#src/app/products/products-list.component.html:
	+<td>{{product.productCode | lowercase | convertToSpaces:"-" }}</td>
	
	#src/app/app.module.ts:
	+import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
	...
	+    ConvertToSpacesPipe,
	
6.Filtering a List:
	#modified:   src/app/products/products-list.component.html:
		-<tr *ngFor='let product of products'>
		+<tr *ngFor='let product of filtredProducts'>	
	#modified:   src/app/products/products-list.component.ts:
    constructor(){
        this.filtredProducts = this.products;
        this.listFilter = 'cart';
    }
    
    filtredProducts : IProduct[];
----listFilter :string = 'cart'; //deleted
    _listFilter :string ;
    get listFilter():string {
        return this._listFilter;
    }
    set listFilter(value:string) {
        this._listFilter = value;
        this.filtredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    performFilter(filtredBy:string): IProduct[]{
        filtredBy = filtredBy.toLocaleLowerCase();
        return this.products.filter( (product:IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filtredBy) !== -1 
        );
    }

7.Checklists and Summary:

VIII- Building Nested Components:
1.Introduction:
	
2.Builiding a Nested Component:
3.Using a Nested Component:
(2+3):
	#modified:   src/app/app.module.ts:
		+import { StarComponent } from './shared/star.component';
		...
		+    StarComponent,
	#modified:   src/app/products/products-list.component.html:
		+    <td> <pm-star></pm-star></td>
	#src/app/shared/star.component.ts:
	import { Component, OnChanges } from '@angular/core';

	@Component({
		selector: 'pm-star',
		templateUrl: './star.component.html',
		styleUrls: ['./star.component.css'],
	})

	export class StarComponent implements OnChanges{
		rating:number = 4;
		starWidth:number;

		ngOnChanges():void { //not fired until now
			this.starWidth = this.rating * 86/5;
		}
	}		
4.Passing Data to a Nested Component:
	to pass a property to the child component:
		[childProperty]="product.property"
	#products-list.component.html:
-    	<td> <pm-star></pm-star></td>
+    	<td> <pm-star [rating]="product.starRating"></pm-star></td>		
	#star.component.ts:
	+import { Component, OnChanges, Input } from '@angular/core'; //Input added
	...
	-    rating:number = 4;
	+    @Input() rating:number;

5.Passing Data from a Component:
	#star.component.html:
		<div class="crop" [style.width.px]="starWidth" [title]="rating" 
			(click)="onClick()">
	#star.component.ts:
		+import { Component, OnChanges, Input, ++EventEmitter++,++Output++} from '@angular/core';
		...
		@Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

		onClick():void{
			this.ratingClicked.emit(`The rating ${this.rating} was clicked`)
		}
	#products-list.component.html:
		<td> <pm-star [rating]="product.starRating" (ratingClicked)='onRatingClicked($event)'></pm-star></td>	
	#products-list.component.ts:
		onRatingClicked(message:string):void{
			this.pageTitle = 'Product List: ' + message;
		}
	
6.Checklists and Summary:
	pass data to the nested component : property binding [property]=
	pass data to the container component : event binding (event)=
IX- Services and Dependency Injection:
1.Introduction:
	A service is a Class with a focused purpose
	A service is independent for any component
	provides shared data across components	
2.How does it work:
	There are 2 ways a component can work with services:
		1) create an instance of the service class:
			let service = new FirstService(); //=> local to the component
		2) We can register this service	with Angular => Angular then create a singleton
			Angular provides a built-in injector to register our services (container of created services instances)
			if a component need a service it just define it as a dependency (Dependency Injection)
		
		Dependency Injection
			A coding pattern, a class receives the instances of objects it needs (called dependencies) from an external source rather than creating then itself.
			Angular : external source => Angular Injector
			
3.Building a service:
	1)Define service class
	2)Define metadata with decorator
	3)Import what we need, Inject it

	#src/app/products/products.service.ts:
		import { Injectable } from '@angular/core';
		import { IProduct } from './iproduct';

		import { PRODUCTS } from './products';

		@Injectable()
		export class ProductService{

			getProducts(): IProduct[] {
				return PRODUCTS;
			}
		}

4.Registring the service:
	We register the service with an Angular injector
	And the Injector provides the service instance to any class that defines it as a dependency

	1)Register a provider:
		provider: Code that can create or return a service
		=> define in component or Angular Metadata
	Register in component : available for its children	
	Register in module : available everywhere
	
	#modified:   src/app/app.component.ts:
		   styleUrls: ['./app.component.css'],
		+  providers: [ProductService],

5.Injecting the service:
	How do we do dependecy injection in Angular
	=> How do we do dependecy injection in TypeScript
	=> in the constructor
	
	//The Constructor is executed before the NgOnInit
	constructor(private _productService: ProductService){
	} //=> productService initialisated (TypeScript simplification)
	
	#products-list.component.ts:
		+import { ProductService } from './products.service';
		...
		-    products : IProduct[] = PRODUCTS ;
		+    products : IProduct[];
		...
		-    constructor(){
		-        this.filtredProducts = this.products;
		-        this.listFilter = 'cart';
		-	 }
		+    constructor(private _productService:ProductService){
			 }
		+
		+    ngOnInit(): void {
		+        this.products = this._productService.getProducts();
		+        this.filtredProducts = this.products;
		+    } 		
				
6.Checklists and Summary:
//+TO FINISH LATER+

X- Retrieving Data Using HTTP:
1.Introduction:
2.Observables and Reactive extensions:
	Observable proposed feature for ES2016
	Observable help manage async data (such data coming from a backend service)
	
	Reactive Extensions(RxJS)
	
	Observable are used within Angular itself including 
	
	//+TO FINISH LATER+
	
3.Sending an HTTP Request:
Theoric:
	#product.service.ts:
		+import { HttpClient } from '@angular/core';
		//...
		private _productUrl = 'www.webservice.com/api/products';
		constructor(private _http: HttpClient){}
		
		getProducts(): Observable<IProduct[]> {
			return this._http.get<IProduct[]>(this._productUrl);
		}
	#app.module.ts:
		+import { HttpClientModule } from '@angular/common/http';
		imports: [ //imports array is for pulling external modules
			//... ,
			HttpClientModule,
		]
Practise:		
	#app.module.ts:
	+import { HttpClientModule } from '@angular/common/http';
	...
    imports: [
     BrowserModule,
     FormsModule,
+    HttpClientModule,
	]
	
	#product.service.ts:
	+import { HttpClient } from '@angular/common/http';
	+import { Observable } from 'rxjs/Observable';
	...
	@Injectable()
	 export class ProductService{
	+	private _productsUrl = './api/products/products.json';

	+	constructor(private _http: HttpClient){        
	+	}

	-   getProducts(): IProduct[] {
	-       return PRODUCTS;
	+	getProducts(): Observable<IProduct[]> {
	+		//return PRODUCTS;
	+		return this._http.get<IProduct[]>(this._productsUrl);
	+	}
	 }	
	
4.Exception handling: //Syntax error untill subscribing to the Observable
	#product.service.ts:
	+import { HttpClient, ++HttpErrorResponse++ } from '@angular/common/http';
	+import 'rxjs/add/observable/throw';
	+import 'rxjs/add/operator/catch';
	+import 'rxjs/add/operator/do';
	...
     getProducts(): Observable<IProduct[]> {
         //return PRODUCTS;
-        #return this._http.get<IProduct[]>(this._productsUrl);
+        return this._http.get<IProduct[]>(this._productsUrl)
+            .do(data => console.log('All: ' + JSON.stringify(data)))
+            .catch(this.handleError);
+    }
+
+    private handleError(err: HttpErrorResponse){
+        console.log(err.message);
+        return Observable.throw(err.message);
     }
	
5.Subscribing to an Observable:
x.then(valueFn, errorFn) //Promise
x.subscribe(valueFn, errorFn) //Observable
x.subscribe(valueFn, errorFn,completeFn)
let sub = x.subscribe(valueFn, errorFn,completeFn);

	#products-list.component.ts:
	+    errorMessage:string;
	...
		 ngOnInit(): void {
	-        this.products = this._productService.getProducts();
	-        this.filtredProducts = this.products;
	+        this._productService.getProducts()
	+            .subscribe( products => {
	+                this.products = products;
	+                this.filtredProducts = this.products;
	+            },
	+            error => this.errorMessage = <any>error); //casting to any
		 }
6.Checklists and Summary:
//+TO FINISH LATER+

XI- Navigation and Routing Basics:
1.Introduction:
	
2.Generating Code and Handling Undefined :
	1)generating new component:
		>ng g c products/product-details.component --flat //--flat = generate on the folder
	safe naviguation operator:
		product?.productName // to avoid error if product is not already loaded
		*)Commenting selector to avoid directive.
		*)adding property product: IProduct (importing interface)
	2)declaring WelcomeComponent in the app.module.ts

	modified:   src/app/app.module.ts
	src/app/products/product-details.component.css
	src/app/products/product-details.component.html
	src/app/products/product-details.component.spec.ts
	src/app/products/product-details.component.ts

3.How Routing Works:
	Local routing in HTML5 without # => We need to configure our web server to perform URL rewriting => that's depend of the web server: See the documentation
	Angular supports also hash style Routing : /#/products
	When you click on a link Routed routerLink, you will be routed to the template of the component which will be inserted in index.html within Routing directive <router-outlet></router-outlet>
	
4.Configuring Routes:
	Routing is component based => define a Route foreach one
	Router Module:
		Declares Router directive = routerLink and <router-outlet></router-outlet>
		Exposes configured routes
	
	To ensure that the routes are available to the app => we do this by passing the routes to the RouterModule
	#app.module.ts:
	imports[
		-RouterModule
		+RouterModule.forRoot([])
	]
	If we want to use hash Routes '#' instead of HTML5 style routes:
	imports[
		-RouterModule
		+RouterModule.forRoot([], {useHash:true} )
	]
	
Practise:
	#index.html:
		<base href="/"> //angular cli generate it for us in the purpose of Routing module
	#app.module.ts:
+import { RouterModule } from '@angular/router';
...
imports: [
	BrowserModule,
	FormsModule,
	HttpClientModule,
	RouterModule.forRoot([
	  { path: 'welcome', component: WelcomeComponent },
	  { path: 'products', component: ProductsListComponent },
	  { path: 'products/:id', component: ProductDetailsComponent },            
	  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
	  { path: '**', redirectTo: 'welcome', pathMatch: 'full'}      
	]), //this register the router service provider, declares the router directives and exposes the configured routes #. to knhow about our configured routes
],
5.Tying Routes to Actions:
	Modifying the app.component template by adding routes containing routerLink.
	#app.component.html:
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">AcmeProductManager</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item active">
					<a class="nav-link" [routerLink]="['/welcome']">Home <span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" [routerLink]="['/products']">Product List </a>
				</li>
			</ul>
			</div>
		</nav>
		
		-<div> 
		-    <h1> {{pageTitle}} </h1>
		-    <pm-products></pm-products>
		-</div> 		
		
		<div>
			<router-outlet></router-outlet>
		</div>
	</div>
	
6.Placing the views:	
7.Checklists and Summary:
	//+TO FINISH LATER+

XII- Navigation and Routing Additional Techniques:
1.Introduction:
2.Passing Parameters to a Route:
	recuperate the Route parameter with snapshot/observable (static/dynamic)
	#app.module.ts:
    RouterModule.forRoot([
		//...
		{ path: 'products/:id', component: ProductDetailsComponent },  	
	]),
	#products-list.component.html:
		<td>
			<a [routerLink]="['/products',product.productId]">
				{{product.productName}}
			</a>
		</td>
	#product-details.component.ts:
	+import { ActivatedRoute } from '@angular/router';
	...
	//-  constructor() { }
	constructor(private _route:ActivatedRoute) { 
	}
	...
	ngOnInit() {
		let id = +this._route.snapshot.paramMap.get('id');
		this.pageTitle += `: ${id}`;
		this.product = MockProduct; 
	}	
	
3.Activating a Route with code:
	Adding a BACK button from product detail => product list:
	#product-details.component.html:
		<a class="btn btn-secondary"  (click)="onBack()" class="float-left">
			<button class="btn btn-default">Back</button>
		</a>		
	#product-details.component.ts:
	import { ActivatedRoute, Router } from '@angular/router';
	...
	constructor(private _route:ActivatedRoute,++++private _router: Router++++) { 
	}
	...
	onBack():void{
		this._router.navigate(['/products']);
	}

4.Protecting Routes with Guards:
	CanActivate: Guard naviguation to a route
	CanDesactivate: Guard naviguation from a route
 	Resolve: Pre-fetch data before activating a route
	CanLoad: Prevent async routing
	
	Guard to product details Route:
	1) create a simple service with CLI
	>ng g s products/product-guard.service -m app.module
	//-m register automatically in app.module : providers [ProductGuardService]
	2) Implement canActivate and integrate it in Routes array to protect some routes.
	#src/app/products/product-guard.service.ts:
		import { Injectable } from '@angular/core';
		import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

		@Injectable()
		export class ProductGuardService implements CanActivate {

		  constructor(private _router:Router) { }

		  canActivate(route:ActivatedRouteSnapshot):boolean{
			const id = +route.url[1].path;
			if (isNaN(id) || id < 1) {
			  alert('Invalid product Id');
			  this._router.navigate(['/products']);
			  return false;
			}
			return true;
		  }
		}
	#src/app/app.module.ts:
		{	path: 'products/:id', 
			canActivate:[ProductGuardService] ,
			component: ProductDetailsComponent 
		},	

5.Checklists and Summary:
	//+TO FINISH LATER+
XIII- Angular Modules:
1.Introduction:
2.What is an Angular Module:
	Angular Module = class with @NgModule decorator, 
		its purpose organize of our app
		Arrange them into blocks
		Extend our app with capabilities from ext libraries
		Provide a template resolution env
		Aggregate and re-export (BrowserModule,FormsModule,HttpModule,etc)
		
	Angular Module can be load eagrly when app starts or lazly async by the router(lazy not in this course)
	
	Angular Module:
		Delcares Components,Directives,Pipes (every of this must belong to a module)
		can export Components,Directives,Pipes
		can import other module to bring their exported functionalities
		can register service providers
	
	In the subdivision to module:
		The Star component must be available within the parent module OR declared within another module and the module must be imported to get his Star Component.
		
3.Bootstrap Array: //AppComponent
	The App Module bootstraps the AppComponent to provide the directive used in index.html
	The Bootstrap Array should only be used in the root application module AppModule.
	
4.Declarations Array: //Component,Directive and Pipe
	Every Component,Directive and Pipe we create is declared in a Module in the declarations Array.
	All delcarations are private by default, we share by exporting them.
	
5.Exports Array:
	Allows us to share the module's components,directives,pipes, etc
	We can re-export system Angular modules such as FormsModule,BrowserModule.
	We can re-export third-party modules.
	We can re-export something without importing it first ##GHARIBA##
	Never export a service => service are already shared through their system
	
6.Imports Array:
	Importing a module makes available any exported component,directive and pipe from that module
	Imports are not inherited. Importing a module does not provide access to its imported modules.
	If the imported module re-exported FormsModule, then the FormsModule will be available to our module.
	
7.Providers Array:
	Allows us to register service providers at the module|component level.
	#app.module.ts
		providers: [ProductGuardService] //available in all the application : public
	#app.component.ts
		providers: [ProductService] //available in the component : private
		
	Any service provider added to the providers of a module Array is registred at the root of the app.
	Don't add services to the providers Array of a shared module
	Best Practise:
		Consider building a CoreModule for services and importing it once in the AppModule.
	Routing Guards must be added in module level (not in component level)
	
8.Feature Module:
	System Angular module : BrowserModule,FormsModule,HttpClientModule,RouterModule,...
	In our first App, we are mixing:
		Basic app features: WelcomeComponent
		Product features: ProductComponent
		Shared features: StarCompoent	
	=> Lets organize and refactor to break this into multiple Angular modules.
	
	ProductModule:
		import FormsModule,RouterModule,
		BrowserModule should only imported by the root app module AppModule
		Instead, we import CommonModule which will contain BrowserModule comp,directives and pipes.
		provide the ProductService and the ProductGuardService
	
9.Demo: Feature Module:
	>ng g m products/product --flat -m app.module
		--flat => not create a specific folder
		-m => import in app.module
	#modified:   src/app/app.module.ts:
		//add in Import Array ProductModule
	#src/app/products/product.module.ts: //generated automatically with this configuration
		import { NgModule } from '@angular/core';
		import { CommonModule } from '@angular/common';
		@NgModule({
		  imports: [
			CommonModule
		  ],
		  declarations: []
		})
		export class ProductModule { }		
	
	We add ProductListComponent,ProductDetailComponent,ConvertToSpacesPipe,StarComponent and removing them from the AppModule.
	
	#src/app/products/product.module.ts:
	//imports
	@NgModule({
	  imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
		  { path: 'products', component: ProductsListComponent },
		  { path: 'products/:id', 
			  canActivate:[ProductGuardService] ,
			  component: ProductDetailsComponent 
		  },      
		])
	  ],
	  declarations: [
		ProductsListComponent,
		ProductDetailsComponent,
		ConvertToSpacesPipe,
		StarComponent,
	  ],
	  providers: [
		ProductService,
		ProductGuardService,
	  ]
	})
	export class ProductModule { }
	#modified:   src/app/app.module.ts:
	//delete them from this module
10.Shared module:
	> ng g m shared/shared --flat -m products/product.module
	#modified:   product.module.ts:
		//add in Import Array SharedModule
		//delete them from this module
	#src/app/shared/shared.module.ts:
		import { NgModule } from '@angular/core';
		import { CommonModule } from '@angular/common';
		import { StarComponent } from './star.component';
		import { FormsModule } from '@angular/forms';

		@NgModule({
		  imports: [
			CommonModule,
		  ],
		  declarations: [
			StarComponent,
		  ],
		  exports:[
			StarComponent,
			CommonModule, //exported without imported
			FormsModule,  //exported without imported
		  ]
		})
		export class SharedModule { }		

11.Revisiting AppModule:
	Every app has a root application module : AppModule(convention)
	AppModule imports BrowserModule which import and export CommonModule to the other modules.
	notion : root module/feature module
	
	Separate Routing into its own module:
	In the Routing system the default or 404 must be the last path otherwise the next path will not be accessible.
	
12.Checklists and Summary:
	

XIV- Building, Testing and Deploying with the CLI:
