
I- Getting Started:
1. Course Introduction
2. What is Angular ?
3. AngularJs Vs Angular2+
4. CLI deep dive & Troubleshooting
	[sudo] npm uninstall -g angular-cli @angular/cli 
	npm cache clean 
	[sudo] npm install -g @angular/cli 
5. Project Setup & First App:
	sudo npm i -g npm //update npm
	sudo npm install -g @angular/cli //update angular/cli
	ng new my-first-app // create new project
	cd my-first-app/
	ng serve
	git init
	git add .
	git commit -m"git init"
	
6. Editing the First App:
	DataBinding : app.component.ts => app.component.html
	Angular = at least one Module: AppModule
	AppModule contains at least one Component: AppComponent
	Component is characterized by : selector/templateUrl/styleUrls
	The AppComponent Selector is putted in index.html
	Other Component Selector is putted on any other x.component.html 

7. The Course Structure:
8. How to get the most out of the course:
9. What is typescript ?
	superset of JavaScript, it offers more features then Vanilla JavaScript like Classes,Interfaces,strong Typing,...
	Compiled to JS in the end (the compilation is handled by the CLI)
10. A Basic Project Setup Using Bootstrap for styling:
	//src/style.css //global css file
	Methode 0 (not used in this project): Inconvenient: JS bootstrap file can cause problems because it requires also to integrate JQuery but Jquery vs Angular have different philosophies.
		#angular.json:
		1) install bootstrap & Jquery using bower
            "styles": [
              "bower_components/bootstrap4/dist/css/bootstrap.min.css",
              "src/styles.css"
            ],
            "scripts": [
              "bower_components/.../jquery",
              "bower_components/bootstrap4/dist/js/bootstrap.min.js"
            ]	
	
	Methode 1 (used in this project): ng-bootstrap //Bootstrap 4.0.0 made for Angular 5+
		https://ng-bootstrap.github.io/#/getting-started
		0) npm install --save @ng-bootstrap/ng-bootstrap
		1) bower install bootstrap#4.0.0
		2) configure to take bootstrap
		#angular.json:
			"styles": [ //Configuration : setting global css files for the App:
			  "src/styles.css",
			  "bower_components/bootstrap4/dist/css/bootstrap.min.css"
			  // OR "node_modules/bootstrap/dist/css/bootstrap.min.css" 
			],
		#app.module.ts:
			import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

			@NgModule({
			  declarations: [AppComponent, ...],
			  imports: [NgbModule.forRoot(), ...],
			  bootstrap: [AppComponent]
			})
			export class AppModule {
			}		
		#Other modules in your application can simply import NgbModule:
			import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

			@NgModule({
			  declarations: [OtherComponent, ...],
			  imports: [NgbModule, ...]
			})
			export class OtherModule {
			}
		3)Integring some ng-bootstrap components in app.component.html + app.component.ts		
		
		4) Using FontAwesome:
		#index.html:
			   <meta name="viewport" content="width=device-width, initial-scale=1">
			   <link rel="icon" type="image/x-icon" href="favicon.ico">
			+  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">


11. Where to find the Course Source Code:

II- The Basics:
12. Module Introduction
13. How an Angular App gets Loaded and Started
	#index.html: //doesn t contain js file, so that from where the js files are load ? => //main.ts 
	#main.ts: //bootstraps AppModule which bootstrap AppComponent
14. Components are Important!
	Angular in the end is a JS framework, changing your DOM at runtime.
	=> that s why when we put <app-root>Value</app-root>, the Value is remplaced at runtime
	Component is a class + decorator @Component({configs}) //configs = selector,template,templateUrl,etc.. 
	Component is declared in a Module.
	Component can recognize only other components which are declared in its module.
15. Creating a New Component
	Module = class + decorator @NgModule({configs}) //configs = declarations,imports,exports,providers,bootstrap,..
		declarations = declare componenets
		imports = import other modules to use its components
16. Understanding the Role of AppModule and Component Declaration
17. Using Custom Components
18. Creating Components with the CLI & Nesting Components
	ng -h
	ng generate -h
	ng g c service
19. Working with Component Templates
	when the component template is very short we can integrate it directly in the component.ts replacing templateUrl by:
	template: `<component-x></component-x>` // make sure to use `` which allow you to return to line without js problems 
	
20. Working with Component Styles
	#app.component.css : //global css
	when css is very short in a component we can replace styleUrls by:
	styles: [`
		h3{
			color:blue;
		}
	`]
21. Fully Understanding the Component Selector
	there is types of selector:
	1) selector : '[app-server]' => <div app-server></div>
	2) selector : '.app-server   => <div class="app-server"></div>
Exercice 1: Practicing Components
22. What is Databinding?
	Databingin = Communication between ts and html component's files
	1)Output Data:
	There is 2 ways of Databinding :
		String Interpolation : {{data}}  // in general cases
		Property Binding : [property]="data" // for angular properties 
	2)React to User Events:
		Event Binding ( (event)="expression" )
	3)Combination of Both:
		Two ways binding:
			[(NgModel)]="data"
		
23. String Interpolation
	{{ type script expression }} //variable or function of our class ts ,if,for,concatenation,etc...
24. Property Binding
	#servers.component.html:
		+<button class="btn btn-priamry" [disabled]="!allowNewServer">Add Server</button>
	#servers.component.ts:
		+  allowNewServer:boolean = false;

		+  constructor() { 
		+    setTimeout( ()=>{
		+      this.allowNewServer = true;
		+    },1500);
		+  }
	
25. Property Binding vs String Interpolation:
	Two Equivalent Expressions:
		<p>{{allowNewServer}}</p> //String Interpolation 
		<p [innerText]="allowNewServer"></p> //Proeperty Binding
26. Event Binding
	#servers.component.html:
		+<button class="btn btn-primary" [disabled]="!allowNewServer" (click)="onServerCreate()">Add Server</button>
		+{{serverCreated}}

	#servers.component.ts:
		+  serverCreated:string = "Server is not Created";

	
		+  onServerCreate(){
		+    this.serverCreated = " Server is created.";
		+  }
		
27. Bindable Properties and Events
	google It
28. Passing and Using Data with Event Binding
	#servers.component.ts
		+  serverName = '';

		+  onUpdateServerName(event: any){
		+    console.log(event);
		+    this.serverName = event.target.value;
		+    
		+  }
	#servers.component.html
		+<input type="text" class="form-control" (input)="onUpdateServerName($event)">
		+
		+<p>{{serverName}}</p>

29. Important: FormsModule is Required for Two-Way-Binding!
30. Two-Way-Databinding
	Requires import FormsModule in current Module
	#servers.component.html:
		+<input type="text" class="form-control" [(ngModel)]="serverName">

31. Combining all Forms of Databinding
Exercice 2: Practicing Databinding

32. Understanding Directives
	selector : '[appDirective]' //create directive 
	<p appDirective></p>	//use directive
	
33. Using ngIf to Output Data Conditionally
	*ngIf : not hidden but remove and add the element to the DOM
		* this star means that because it is a structural directive which mean it change the structure.
	<p *ngIf="booleanVar | function | typescript_expression"> content </p>
34. Enhancing ngIf with an Else Condition
	<p *ngIf="serverCreated; else noServer"></p>
	<ng-template #noServer>
		<p> No server was created! </p>
	</ng-template>
	
35. Styling Elements Dynamically with ngStyle
	this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
	<p [ngStyle]="{'background-color':getColor()}"> content </p>
	<p [ngStyle]="{'backgroundColor':getColor()}"> content </p>
	getColor(){ ... }
	
36. Applying CSS Classes Dynamically with ngClass
	<p [ngClass]="{class1 : serverCreated === false}"> content </p>
37. Outputting Lists with ngFor
Exercice 3: Practicing Directives:
(click)="showSecret = !showScret" //toggle showSecret
38. Getting the Index when using ngFor
	*ngFor="let item of items; let i = index"
	
III- Course Project - The Basics:

39. Project Introduction
40. Planning the App
41. Installing Bootstrap Correctly
42. Setting up the Application
43. Creating the Components
	1)nesting HeaderComponent's selector in AppComponent
		#src/app/app.component.html 
		+<app-header></app-header>
		+
		+<div class="container">
		+
		+    <div class="jumbotron">
		+      <h1 class="display-4">Hello, world!</h1>
		+      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
		+      <hr class="my-4">
		+      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
		+      <p class="lead">
		+        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
		+      </p>
		+    </div>
	2)Creating many components:
		ng g c header
		ng g c recipes
		ng g c recipes/recipe-list
		ng g c recipes/recipe-detail
		ng g c recipes/recipe-list/recipe-item
		ng g c shopping-list
		ng g c shopping-list/shopping-edit
	
44. Using the Components: //Nesting Components and setting HTML Structure of the Site
#src/app/app.component.html:
	+    <div class="row">
	+      <div class="col-md-12">
	+        <recipes></recipes>
	+        <shopping-list></shopping-list>
	+      </div>
#src/app/recipes/recipes.component.html
	+<div class="row">
	+  <div class="col-md-5">
	+    <recipe-list></recipe-list>
	+  </div>
	+  <div class="col-md-5">
	+    <recipe-detail></recipe-detail>
	+  </div>
	+</div>
#src/app/shopping-list/shopping-list.component.html
	+<div class="row">
	+  <div class="col-10">
	+    <shopping-edit></shopping-edit>
	+    <hr>
	+    <p>The list</p>
	+  </div>
	+</div>
	
45. Adding a Navigation Bar: //finding solution for navbar with ng-bootstrap
	#src/app/header/header.component.html:
	  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
		  <a class="navbar-brand" href="#">Navbar</a>
		  <button (click)="isCollapsed = !isCollapsed" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
		
		  <div [ngbCollapse]="isCollapsed" class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
			  <li class="nav-item active">
				<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="#">Link</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link disabled" href="#">Disabled</a>
			  </li>
			</ul>
			
			<ul class="navbar-nav mr-0">
			  <li class="nav-item dropdown">
				<div ngbDropdown class="d-inline-block">
				  <a class="nav-link" id="dropdownBasic1" href="#" role="button" ngbDropdownToggle>Toggle dropdown</a>
				  <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
					<button class="dropdown-item" (click)="onClick()">Action - 1</button>
					<button class="dropdown-item">Another Action</button>
					<button class="dropdown-item">Something else</button>
				  </div>
				</div>
			  </li>  
			</ul>
		  </div>
		</nav>	
	#src/app/header/header.component.ts:
+		isCollapsed=true;
+
+		onClick(){
+			console.log("aaa");
+			alert('aaa');
+		}
	
46. Alternative Non-Collapsable Navigation Bar
47. Creating a "Recipe" Model	
48. Adding Content to the Recipes Components
49. Outputting a List of Recipes with ngFor
47+48+49:
	#src/app/recipes/recipe.model.ts //create Model:
		export class Recipe{
			public name: string;
			public desc: string;
			public imgPath: string;

			constructor(name,desc,imgPath){
				this.name= name;
				this.desc = desc;
				this.imgPath = imgPath;
			}
		}
	#recipes/recipe-list/recipe-list.component.html: //using bootstrap to display list of recipes
		<div class="row">
		  <div class="col-10">
			<button class="btn btn-success">New Recipe</button>
		  </div>
		</div>
		<hr>
		<div class="row">
		  <div class="col-10">
			<a href="#" class="list-group-item clearfix mb-1" 
			*ngFor="let item of recipes">
			  <div class="float-left">
				<h4> {{item.name}} </h4>
				<p> {{item.desc}} </p>
			  </div>
			  <div class="float-right">
				<img [src]="item.imgPath" class="img-thumbnail" style="max-height:80px">
			  </div>
			</a>

			<!-- <recipe-item></recipe-item> -->
		  </div>
		</div>	
	#recipes/recipe-list/ecipe-list.component.ts
	export class RecipeListComponent implements OnInit {
	  recipes: Recipe[] = [
		new Recipe('recipe1','desc1','https://img.bestrecipes.com.au/rZFo7F8i/h300-w400-cscale-1495077669/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg'),
		new Recipe('recipe1','desc1','https://img.bestrecipes.com.au/rZFo7F8i/h300-w400-cscale-1495077669/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg'),
	  ];
	  constructor() { }	
	
50. Displaying Recipe Details //bootstrap work
#recipes/recipe-detail/recipe-detail.component.html:
	<div class="row">
	  <div class="col-12">
		<h1>Recipe Name</h1>
	  </div>
	</div>
	<div class="row">
	  <div class="col-12">
		<h1>Ingrediants</h1>
	  </div>
	</div>
	//...

51. Working on the ShoppingListComponent
#shopping-list.component.htmt:
+    <ul class="list-group">
+      <a class="list-group-item">Cras justo odio</a>
+      <a class="list-group-item">Dapibus ac facilisis in</a>
+      <a class="list-group-item">Morbi leo risus</a>
+      <a class="list-group-item">Porta ac consectetur ac</a>
+      <a class="list-group-item">Vestibulum at eros</a>
+    </ul>
52. Creating an "Ingredient" Model:
	#shared/ingrediant.model.ts:
	export class ingrediant{
		public name: string;
		public amount: string;

		constructor(name,amount){
			this.name = name;
			this.amount = amount;
		}
	}
	//NB we can do like this it will do same effect:
export class ingrediant{
    constructor(public name, public amount){
    }
}	
53. Creating and Outputting the Shopping List // create elt manually in the class + simple ngFor for display
	#modified:   src/app/shopping-list/shopping-list.component.html
	#modified:   src/app/shopping-list/shopping-list.component.ts
54. Adding a Shopping List Edit Section //bootstrap work create form edit for shopping list:
	<div class="row">
	  <div class="col-10">
		<form>
		  <div class="row">
			<div class="col-sm-5 form-group">
			  <label for="name">Name</label>
			  <input type="text" id="name" class="form-control">
			</div>
			<div class="col-sm-2 form-group">
			  <label for="amount">Amount</label>
			  <input type="number" id="amount" class="form-control">
			</div>
		  </div>
		  <div class="row">
			<div class="col-12">
			  <button class="btn btn-success mr-1" type="submit">Add</button>
			  <button class="btn btn-danger mr-1" type="button">Delete</button>
			  <button class="btn btn-primary" type="button">Clear</button>
			</div>
		  </div>
		</form>
	  </div>
	</div>

55. Wrap Up & Next Steps
//nothing


IV-Debugging:
56. Understanding Angular Error Messages
	F12: read error from console directly
	servers; //variable declared withou initializing = undefined
57. Debugging Code in the Browser Using Sourcemaps
	F12: open source>webpack>. directory
58. Using Augury to Dive into Angular Apps
	Chrome Extension : Augury
	
	
V-Components & Databinding Deep Dive
59. Module Introduction
60. Splitting Apps into Components
	//how to pass data between components ?
61. Property & Event Binding Overview
62. Binding to Custom Properties //passing an object from parent component to a child component:
	#app/app.component.ts:
		serverElements = [
			{type:"server", name:"server1", content:"content1"},
			{type:"server", name:"server2", content:"content2"},
		];
	#app/app.component.html:
		<app-server-element 
			*ngFor="let server of serverElements"
			[element]="server">
		</app-server-element>
		
	#app/server-element/server-element.component.ts:
	+import { Input } from '@angular/core';
	+  @Input() element : {type: string, name: string, content: string};

63. Assigning an Alias to Custom Properties
	//We Can Do
	[aliasElt]="server" <=> @Input('aliasElt') element
	
64. Binding to Custom Events: //passing an obj from child to parent component:
//app/cockpit/cockpit.component.html : not changed file but copied to explain the interactions
	<div class="row">
	  <div class="col-xs-12">
		<p>Add new Servers or blueprints!</p>
		<label>Server Name</label>
		<input type="text" class="form-control" [(ngModel)]="newServerName">
		<label>Server Content</label>
		<input type="text" class="form-control" [(ngModel)]="newServerContent">
		<br>
		<button
		  class="btn btn-primary"
		  (click)="onAddServer()">Add Server</button>
		<button
		  class="btn btn-primary"
		  (click)="onAddBlueprint()">Add Server Blueprint</button>
	  </div>
	</div>
#app/cockpit/cockpit.component.ts
	@Output() serverCreated = new EventEmitter<{name:string,content:string}>();
	@Output() bluePrintCreated = new EventEmitter<{name:string,content:string}>();
	constructor() { }
	
	onAddServer() {
		this.serverCreated.emit({name: this.newServerName, content: this.newServerContent});
	}
 
	onAddBlueprint() {
		this.bluePrintCreated.emit({name: this.newServerName, content: this.newServerContent});
	}


#app/app.component.html
	<app-cockpit 
		(serverCreated)="onServerAdded($event)"
		(bluePrintCreated)="onBlueServerAdded($event)"
    ></app-cockpit>
#app/app.component.ts
	onServerAdded( serverData: {name:string,content:string} ) 
	{
		this.serverElements.push({
		  type: 'server',
		  name: serverData.name,
		  content: serverData.content
		});
	}

	onBlueServerAdded( serverData: {name:string,content:string}) {
		this.serverElements.push({
		  type: 'blueprint',
		  name: serverData.name,
		  content: serverData.content
		});
	}
	
65. Assigning an Alias to Custom Events:
	As Input(); Output(); can have created by Alias too.
	See 63.Assigning an Alias to Custom Properties
	
66. Custom Property and Event Binding Summary
	Every component has each own css file ( angular gives an attribute to every element in the component which contains the css )
	
67. Understanding View Encapsulation
@Component({
	//...
	encapsulation: ViewEncapsulation.None, //angular doesn't give an attribute to every element in the component DOM. See pervious section 66. 
})

68. More on View Encapsulation
	#not seen
	
69. Using Local References in Templates
	Local reference = attribute putted in the element : <p #element></p>
	#html:
		<input #input1 ...>
		<button (click)="action(input1)"
	#ts:
		action(input){
			console.log(input.value);
		}
		
	#app/cockpit/cockpit.component.html
-    <input type="text" class="form-control" [(ngModel)]="newServerName">
+    <input type="text" class="form-control" #newServerName>

-      (click)="onAddServer()">Add Server</button>
+      (click)="onAddServer(newServerName)">Add Server</button>
	#app/cockpit/cockpit.component.ts
+  onAddServer(newServerName) {
+  		this.serverCreated.emit({name: newServerName.value, content: this.newServerContent});

70. Getting Access to the Template & DOM with @ViewChild
	#app/cockpit/cockpit.component.html
-    <input type="text" class="form-control" [(ngModel)]="newServerContent">
+    <input type="text" class="form-control" #newServerContent>
	#app/cockpit/cockpit.component.ts
-  newServerContent = '';
+  @ViewChild('newServerContent') newServerContent : ElementRef;
//---
   onAddServer(newServerName) {
-    this.serverCreated.emit({name: newServerName.value, content: this.newServerContent});
-  }
+    this.serverCreated.emit({name: newServerName.value, content: this.newServerContent.nativeElement.value});
+  } 

71. Projecting Content into Components with ng-content
	every content you put in <app-x> content </app-x> is lost by default (ovirreden by component's template)
	But when we put in our component:
	<ng-content></ng-content>
	The content putted in <app-x> content </app-x> will be redirected in <ng-content></ng-content> 
	So the component now can accept a content which is passed in its selector.
	
72. Understanding the Component Lifecycle
	ngOnInit: 		Called once the component is initialized (after constuctor)
	ngOnDestroy:	Called once the component is about to be destroyed //for exple when deleting an element from a list
	ngOnChanges: 	Called after a bound Input property changes (properties decorated with @Input() )
					Executed on the creation
	ngDoCheck: 		Called after any change of any property in the template I think also when clicking a button.
	ngAfterContentInit:		Called after content (ng-content) has been project in to view				
	ngAfterContentChecked:	
	ngAfterViewInit:	Called after component's view and child views has been initialized
	ngAfterViewChecked:
	
	
73. Seeing Lifecycle Hooks in Action
	ngOnChanges(changes: SimpleChanges){
		console.log(changes);
	}

74. Lifecycle Hooks and Template Access
	<div #div1> ... </div>
	@Input() div1;
	this.div1.nativeElement.textContent; //just to see you textContent property

75. Getting Access to ng-content with @ContentChild
	<ng-content> contains a content passed by the parent, so how to acces to its elements from the child: @ContentChild
	#childComponent:
	@ContentChild('contentChild') paragraph : ElementRef;
	//---
	this.paragraph.nativeElement.textContent
	
76. Wrap Up
Exercice 4: Practicing Property & Event Binding and View Encapsulation
	#chapitre5/cmp-databinding-assignment-solution

VI- Course Project - Components & Databinding:
77. Introduction
78. Adding Navigation with Event Binding and ngIf
	//creating navigation with tradional method:
	#src/app/app.component.html
	-<app-header></app-header>
	+<app-header (Navigate)="onNavigate($event)" ></app-header>
	//---
	-        <recipes></recipes>
	-        <shopping-list></shopping-list>
	+        <recipes *ngIf="navItem == 'recipes'"></recipes>
	+        <shopping-list *ngIf="navItem != 'recipes'"></shopping-list>
	#src/app/app.component.ts
	 export class AppComponent {
	+  navItem:string = "recipes";
	+
	+  onNavigate(navItem:string){
	+    this.navItem = navItem;
	+  }
	#app/header/header.component.html
	<li class="nav-item active">
		<a class="nav-link" href="#" (click)="onNavigate('recipes')" > Recipes <span class="sr-only">(current)</span></a>
	</li>
	<li class="nav-item active">
		<a class="nav-link" href="#" (click)="onNavigate('shoppingList')" > Shopping List <span class="sr-only">(current)</span></a>
	</li> 				
	#app/header/header.component.ts
	export class HeaderComponent implements OnInit {
	   isCollapsed=true;
	+  @Output() Navigate = new EventEmitter<string>();
	   constructor() { }

	+  onNavigate(feature:string){
	+    this.Navigate.emit(feature);
	+  }

79. Passing Recipe Data with Property Binding
	#src/app/recipes/recipe-list/recipe-item/recipe-item.component.html
	-<p>
	-  recipe-item works!
	-</p>
	+<a href="#" class="list-group-item clearfix mb-1" >
	+  <div class="float-left">
	+    <h4> {{recipe.name}} </h4>
	+    <p> {{recipe.desc}} </p>
	+  </div>
	+  <div class="float-right">
	+    <img [src]="recipe.imgPath" class="img-thumbnail" style=
	"max-height:80px">
	+  </div>
	+</a>

80. Passing Data with Event and Property Binding (Combined)
	//onclick on recipe => 	recipe-item emit recipe to recipe list
	//					   	recipe-list emit recipe to recipes 
	// In recipes:
	#recipes.component.html:
		<div class="row">
		  <div class="col-md-5">
			//direct assign
			<recipe-list (onSelectRecipe2)="selectedRecipe = $event"></recipe-list>
		  </div>
		  //ngIf else
		  <div class="col-md-5">
			<recipe-detail *ngIf="selectedRecipe; else infoText" 
			  [selectedRecipe]="selectedRecipe"></recipe-detail>
			  <ng-template #infoText>
				<p>Please select a recipe!</p>
			  </ng-template>
		  </div>
		</div>
	#recipes.component.ts:		
	+ selectedRecipe:Recipe;
	  constructor() { }

81. Allowing the User to Add Ingredients to the Shopping List
	#src/app/shopping-list/shopping-edit/shopping-edit.component.html
	<input #nameInput type="text" id="name" class="form-control">
	<input #amountInput type="number" id="amount" class="form-control">
	<button class="btn btn-success mr-1" type="button" (click)="onAddIngrediant()">Add</button>

	#src/app/shopping-list/shopping-edit/shopping-edit.component.ts
	+  @ViewChild('nameInput') nameInputRef: ElementRef;
	+  @ViewChild('amountInput') amountInputRef: ElementRef;
	+  @Output() ingredientAdded = new EventEmitter<Ingrediant>();
	//--
	+  onAddIngrediant(){
	+    let name = this.nameInputRef.nativeElement.value;
	+    let amount = this.amountInputRef.nativeElement.value;
	+    let newIngrediant = new Ingrediant(name,amount);
	+    this.ingredientAdded.emit(newIngrediant);
	+  }
	
	#src/app/shopping-list/shopping-list.component.html
	+    <shopping-edit (ingredientAdded)="onIngrediantAdded($event)"></shopping-edit>
	
	#src/app/shopping-list/shopping-list.component.ts
	+  onIngrediantAdded(ingrediant:Ingrediant){
	+    this.ingrediants.push(ingrediant);
	+  }
	
VII- Directives Deep Dive:
82. Module Introduction
	2 types of directives:
		Structural: 
			previoused by "*":  
			like *ngIf,*ngFor = remove,create elements in the DOM
		Attribute:	like [src] = only affect the current element
		
83. ngFor and ngIf Recap
84. ngClass and ngStyle Recap
	[ngClass]="{class1: cond1}"
	[ngStyle]="{backgroundColor: cond ? 'red' : 'blue' }"
	 
85. Creating a Basic Attribute Directive
	//this method is bad practise see next: 86.
	1) create file directive1.directive.ts:
		simple class + Decorator: @Directive + constructor(private elementRef: ElementRef)
	2) register it in app.module.ts in declarations array with other components
		
86. Using the Renderer to build a Better Attribute Directive
	ng g directive directive2
	constructor(private elRef: ElementRef, private render: Render2){
	}
	
	ngOnInit(){
		this.renderer.setStyle(this.elRef.nativeElement, 'color', 'red');
		
87. More about the Renderer
	Doc Renderer: https://angular.io/api/core/Renderer2
	
88. Using HostListener to Listen to Host Events
	//set style when mouse onhover:
	ngOnInit(){ ... }
	@HostListener('mouseenter') mouseover(eventData: Event){
		this.rendrer.setStyle(this.elRef.nativeElement, 'color', 'red');
	}
	@HostListener('mouseleave') mouseleave(eventData: Event){
		this.rendrer.setStyle(this.elRef.nativeElement, 'color', 'transparent');
	}		
	
89. Using HostBinding to Bind to Host Properties
	//more simple then rendrer but more limited:
	@HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
	constructor(private elRef: ElementRef, private render: Render2){
	}
	ngOnInit(){ ... }
	@HostListener('mouseenter') mouseover(eventData: Event){
		this.backgroundColor = 'blue';
	}
	@HostListener('mouseleave') mouseleave(eventData: Event){
		this.backgroundColor = 'transparent';
	}	
90. Binding to Directive Properties
	//reading the colors with Input:
	#directive
	@Input() defaultColor: string = 'transparent';
	@Input() highlightColor: string = 'blue';
	@HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
	constructor(private elRef: ElementRef, private render: Render2){
	}
	ngOnInit(){
		this.backgroundColor=this.defaultColor;
	}
	#html:
	<p directive1 [defaultColor]="'transparent'" [highlightColor]="'blue'"></p>
	//NB: "'transparent'" to read it as a string
91. What Happens behind the Scenes on Structural Directives
92. Building a Structural Directive
	#Raté
93. Understanding ngSwitch	
	<div [ngSwitch]="month">
		<p *ngSwitchCase="aout">Aout</p>
		<p *ngSwitchCase="july">July</p>
		<p *ngSwitchDefault>Other</p>
	</div>

VIII- Course Project - Directives
94. Building and Using a Dropdown Directive:
	//creation of new directive just onClick toggles class.open true/false
	
IX- Using Services & Dependency Injection:
1. Module Introduction:
	Duplication of code + Providing data are typical use case for a service.
2. Why would you need Services ?
	#SEE IT AGAIN
3. Creating a Logging Service
	
4. Injecting the Logging Service into Components
5. Creating a Data Service
6. Understanding the Hierarchical Injector
	When Declaring in providers of AppComponent => it's a singleton for this component and its childs.
	When Declaring in providers of a component => it's a singleton for this component and its childs ( PS : BUT not for other services )
	When Declaring in provider of AppModule => it's a singleton for all the app.
7. How many Instances of Service Should It Be?
	
8. Injecting Services into Services
	@Injectable()
9. Using Services for Cross-Component Communication
10. Exercice 5: Practicing Services
11. Services in Angular 6
