
Learn Good Practises : 
	https://angular.io/guide/styleguide

Quick Start: https://angular.io/guide/quickstart:

npm install -g @angular/cli
ng new my-app
cd my-app
ng serve --open

The first file you should check out is README.md. It has some basic information on how to use CLI commands. Whenever you want to know more about how Angular CLI works make sure to visit the Angular CLI repository and Wiki:
	https://github.com/angular/angular-cli
	https://github.com/angular/angular-cli/wiki

Project file review:
	src/ :
		Your app lives in the src folder. All Angular components, templates, styles, images, and anything else your app needs go here. Any files outside of this folder are meant to support building your app.
		src/app/app.component.{ts,html,css,spec.ts}:
			Defines the root component of the app : AppComponent
			.spec.ts for unit test
		app/app.module.ts:
			Defines AppModule, the root module that tells Angular how to assemble the application. Right now it declares only the AppComponent. 
		assets/
		environments/:
			This folder contains one file for each of your destination environments
		index.html
			The main HTML page that is served when someone visits your site. Most of the time you'll never need to edit it. The CLI automatically adds all js and css files when building your app so you never need to add any <script> or <link> tags here manually.
		main.ts
			The main entry point for your app. Compiles the application with the JIT compiler and bootstraps the application's root module (AppModule) to run in the browser. You can also use the AOT compiler without changing any code by appending the--aot flag to the ng build and ng serve commands.
		polyfills.ts
			Different browsers have different levels of support of the web standards. Polyfills help normalize those differences. You should be pretty safe with core-js and zone.js, but be sure to check out the Browser Support guide for more information.
		styles.css
			Your global styles go here. Most of the time you'll want to have local styles in your components for easier maintenance, but styles that affect all of your app need to be in a central place.
		test.ts
			This is the main entry point for your unit tests. It has some custom configuration that might be unfamiliar, but it's not something you'll need to edit.
		tsconfig.{app|spec}.json
			TypeScript compiler configuration for the Angular app (tsconfig.app.json) and for the unit tests (tsconfig.spec.json).
		
	e2e/
		Inside e2e/ live the end-to-end tests. They shouldn't be inside src/ because e2e tests are really a separate app that just so happens to test your main app. That's also why they have their own tsconfig.e2e.json.

	.angular-cli.json
		Configuration for Angular CLI. In this file you can set several defaults and also configure what files are included when your project is built. Check out the official documentation if you want to know more.

	.editorconfig
		Simple configuration for your editor to make sure everyone that uses your project has the same basic configuration. Most editors support an .editorconfig file. See http://editorconfig.org for more information.

	karma.conf.js
		Unit test configuration for the Karma test runner, used when running ng test.

	protractor.conf.js
		End-to-end test configuration for Protractor, used when running ng e2e.

	README.md
		Basic documentation for your project, pre-filled with CLI command information. Make sure to enhance it with project documentation so that anyone checking out the repo can build your app!

	tsconfig.json
		TypeScript compiler configuration for your IDE to pick up and give you helpful tooling.

	tslint.json
		Linting configuration for TSLint together with Codelyzer, used when running ng lint. Linting helps keep your code style consistent.


Tutorial : https://angular.io/tutorial :
	By the end of the tutorial you will be able to do the following:

	* Use built-in Angular directives to show and hide elements and display lists of hero data.
	* Create Angular components to display hero details and show an array of heroes.
	* Use one-way data binding for read-only data.
	* Add editable fields to update a model with two-way data binding.
	* Bind component methods to user events, like keystrokes and clicks.
	* Enable users to select a hero from a master list and edit that hero in the details view.
	* Format data with pipes.
	* Create a shared service to assemble the heroes.
	* Use routing to navigate among different views and their components.
	* You'll learn enough Angular to get started and gain confidence that Angular can do whatever you need it to do.

	After completing all tutorial steps, the final app will look like this live example / download example.

I-Introduction:
	ng new angular-tour-of-heroes
	cd angular-tour-of-heroes
	ng serve --open 

II-The Application Shell:
	1.Modifiying template
	2.Modifiying title value
	3.Putting global CSS
	modified:   src/app/app.component.html
	modified:   src/app/app.component.ts
	modified:   src/styles.css
	
III-The Hero Editor:
	#Part1:
	>ng generate component heroes
	Result:
		modified:   src/app/app.module.ts:
			import { NgModule } from '@angular/core';
			 
			 
			 import { AppComponent } from './app.component';
			+import { HeroesComponent } from './heroes/heroes.component';
			 
			 
			 @NgModule({
			   declarations: [
			     AppComponent,
			+    HeroesComponent
			   ],
			
		new : src/app/heroes/:
			src/app/heroes/heroes.component.css
			src/app/heroes/heroes.component.html
			src/app/heroes/heroes.component.spec.ts
			src/app/heroes/heroes.component.ts

			#/src/app/heroes/heroes.component.ts : 
			//You always import the Component symbol from the Angular core library and annotate the component class with @Component.	
			import { Component, OnInit } from '@angular/core';

			//@Component is a decorator function that specifies the Angular metadata for the component.
			@Component({
			  selector: 'app-heroes', //metadata propertie
			  templateUrl: './heroes.component.html', //metadata propertie
			  styleUrls: ['./heroes.component.css'] //metadata propertie
			})
			export class HeroesComponent implements OnInit {

			  constructor() { }

			  ngOnInit() {
			  }

			}
		
		Lifecycle Hooks of a component :
		ngOnInit,ngOnChanges,ngDoCheck,...
		Doc:
			https://angular.io/guide/lifecycle-hooks

	#Part2:
		modified:   src/app/app.component.html //add directive (tag)
		modified:   src/app/app.module.ts	// import NgModel
		modified:   src/app/heroes/heroes.component.html	//input NgModel
		modified:   src/app/heroes/heroes.component.ts	//importing Hero Class
		src/app/hero.ts	// Model Class Hero
	
	0) #app.component.html
		+<app-heroes></app-heroes>
	
	1) create src/app/hero.ts:
		export class Hero{
			id:number;
			name:string;
		}
	2) Model heroes : //heroes.component.ts:
		//import Hero and create new Hero
		import { Hero } from '../hero';
		...
		  hero: Hero = {
			id: 1,
			name: 'Karim'
		  };
		  constructor() { }		
	
	3) Vue heroes: //heroes.component.html:	
		<h2>{{ hero.name | uppercase }} Details</h2>
		<div><span>id: </span>{{hero.id}}</div>
		<div><span>name: </span>{{hero.name}}</div>

		<div>
		  <label>name:
			<input [(ngModel)]="hero.name" placeholder="name">
		  </label>
		</div>
		
		Docs:
			One Way Binding:
				<input value="{{hero.name}}" placeholder="name">		
			Two-way binding:
				<input [(ngModel)]="hero.name" placeholder="name">
		
			[(ngModel)] is Angular's two-way data binding syntax.			
			Although ngModel is a valid Angular directive, it isn't available by default.
			It belongs to the optional FormsModule and you must opt-in to using it.

	
	4) Importing NgModel directive (|module) in the //app.module.ts:
	#app.module.ts: //importing NgModel in the app:
	Delcare a Component + import a module:
+		import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

		@NgModule({
		  declarations: [
			AppComponent,
			HeroesComponent
		  ],
		  imports: [
			BrowserModule,
+			FormsModule
		  ],
	
IV-Displaying a List:
	modified:   src/app/heroes/heroes.component.css
	modified:   src/app/heroes/heroes.component.html
	modified:   src/app/heroes/heroes.component.ts
	src/app/mock-heroes.ts
	
	src/app/mock-heroes.ts:
		import { Hero } from './hero';

		export const HEROES: Hero[] = [
		  { id: 11, name: 'Mr. Nice' },
		  { id: 12, name: 'Narco' },
		];	
	
	modified:   src/app/heroes/heroes.component.ts:
		+import { HEROES } from '../mock-heroes';
		...
		+  heroes = HEROES;
		+
		+  selectedHero: Hero;
		+
		+  onSelect(hero: Hero): void {
		+    this.selectedHero = hero;
		+  }

	modified:   src/app/heroes/heroes.component.html:
		//modify in div show Hero:
		//hero by selectedHero and cond of existance to avoid error undefined
		<div *ngIf="selectedHero">
		  <h2>{{ selectedHero.name | uppercase }} Details</h2>
		  <div><span>id: </span>{{selectedHero.id}}</div>
		  <div><span>name: </span>{{selectedHero.name}}</div>


		  <div>
			<label>name:
			  <input [(ngModel)]="selectedHero.name" placeholder="name">
			</label>
		  </div>
		</div>
		//list of heroes:
		+<h2>My Heroes</h2>
		+<ul class="heroes">
		+  <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
		+    <span class="badge">{{hero.id}}</span> {{hero.name}}
		+  </li>
		+</ul>
	
	modified:   src/app/heroes/heroes.component.css
		+.selected{
		+    background-color: forestgreen;
		+    color: blanchedalmond;
		+}

V-Master/Detail Components:
#part1:
	>ng generate component hero-detail

#part2:
	modified:   src/app/hero-detail/hero-detail.component.html : Moving show div from heros.component to this component and changing selectedHero by hero
	modified:   src/app/hero-detail/hero-detail.component.ts : preparing the model to receive an input hero from the parent component 
	modified:   src/app/heroes/heroes.component.html : replacing the div show by the directive <app-hero-detail>
	
	#src/app/heroes/heroes.component.html:
		+<app-hero-detail [hero]="selectedHero"></app-hero-detail>

	#src/app/hero-detail/hero-detail.component.ts:		
		-import { Component, OnInit } from '@angular/core';
		+import { Component, OnInit, Input } from '@angular/core';
		+
		+import { Hero } from '../hero';
		...
		+  @Input() hero: Hero; 
		   constructor() { }
	#src/app/heroes/heroes.component.html:	
		-<div>...</div> //div show hero moved to the hero detail template 
		+<app-hero-detail [hero]="selectedHero"></app-hero-detail>
		
VI-Services:
#part1:
	> ng generate service hero --module=app

	modified:   src/app/app.module.ts
	src/app/hero.service.spec.ts
	src/app/hero.service.ts
	
	//src/app/app.module.ts:
	+import { HeroService } from './hero.service';
	...
	-  providers: [],
	+  providers: [HeroService],
	
	Doc:
		The providers array tells Angular to create a single, shared instance of HeroService and inject into any class that asks for it.
	
#part2: implement simple service
	1) implement simple service:
	#src/app/hero.service.ts:
	+import { Hero } from './hero';
	+import { HEROES } from './mock-heroes';
	...
	   constructor() { }
	+  getHeroes(): Hero[] {
	+    return HEROES;
	+  }
	
	2) Injecting the service in the component:
	#src/app/heroes/heroes.component.ts:
	+import { HeroService } from '../hero.service';
	+
	 import { Hero } from '../hero';
	-import { HEROES } from '../mock-heroes';
	...
	+  heroes :Hero[];
	+  constructor(private heroService: HeroService) { //Injection 
	+
	+  }
	+  getHeroes(): void {
	+    this.heroes = this.heroService.getHeroes();
	+  }
	   ngOnInit() {
	+    this.getHeroes();
	   }
	
#part3: service return Observable instead of Array:
	
	#src/app/hero.service.ts:
	+import { Observable } from 'rxjs/Observable';
	+import { of } from 'rxjs/observable/of';
	..
	-  getHeroes(): Hero[] {
	-    return HEROES;
	+  getHeroes(): Observable<Hero[]> {
	+    return of(HEROES);
	   }

	#src/app/heroes/heroes.component.ts:
	   getHeroes(): void {
	-    this.heroes = this.heroService.getHeroes();
	+    this.heroService.getHeroes()
	+        .subscribe(heroes => this.heroes = heroes);
	   }
	   
#part4: 
	modified:   src/app/app.component.html
	modified:   src/app/app.module.ts
	modified:   src/app/hero.service.ts
	src/app/message.service.spec.ts
	src/app/message.service.ts
	src/app/messages/

	1) generating messages component + service message:

	> ng generate component messages
	> ng generate service message --module=app

		#/src/app/message.service.ts:
		import { Injectable } from '@angular/core';

		@Injectable()
		export class MessageService {
	+	  messages: string[] = [];

	+	  add(message: string) {
	+		this.messages.push(message);
	+	  }
	+
	+	  clear() {
	+		this.messages = [];
	+	  }
	+	}

		#/src/app/app.component.html:
		 <app-heroes></app-heroes>
		+<app-messages></app-messages>

	2) Injecting the message service into the hero service:
		#/src/app/hero.service.ts:
		+import { MessageService } from './message.service';
		...
		+constructor(private messageService: MessageService) { }
		...
		getHeroes(): Observable<Hero[]> {
		  // Todo: send the message _after_ fetching the heroes
		 +this.messageService.add('HeroService: fetched heroes');
		  return of(HEROES);
		}

	3) Inject Message service into Message component:
		#/src/app/messages/messages.component.ts:
		+import { MessageService } from '../message.service';
		...
		+constructor(public messageService: MessageService) {}
		
		#src/app/messages/messages.component.html:
		<div *ngIf="messageService.messages.length">

		  <h2>Messages</h2>
		  <button class="clear"
				  (click)="messageService.clear()">clear</button>
		  <div *ngFor='let message of messageService.messages'> {{message}} </div>

		</div>
		
VII-Routing:
An Angular best practice is to load and configure the router in a separate, top-level module that is dedicated to routing and imported by the root AppModule.

By convention, the module class name is AppRoutingModule and it belongs in the app-routing.module.ts in the src/app folder.

#part1 : generate the routing module:
>ng generate module app-routing --flat --module=app
--flat puts the file in src/app instead of its own folder.
--module=app tells the CLI to register it in the imports array of the AppModule.
//src/app/app.module.ts:
imports: [
     BrowserModule,
     FormsModule,
+    AppRoutingModule
],
#part2 : configure routing component:
//src/app/app-routing.module.ts:

 import { NgModule } from '@angular/core';
-import { CommonModule } from '@angular/common';
+import { RouterModule, Routes } from '@angular/router';
+
+import { HeroesComponent }      from './heroes/heroes.component';
+
+const routes: Routes = [
+  { path: 'heroes', component: HeroesComponent }
+];
 
 @NgModule({
-  imports: [
-    CommonModule
-  ],
-  declarations: []
+  exports: [ RouterModule ]
 })
+
 export class AppRoutingModule { }
 
 #part3: enable routerLink directive:
 //src/app/app-routing.module.ts:
  @NgModule({
+  imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
 })
 //src/app/app.component.html: 
-<app-heroes></app-heroes>
+<nav>
+    <a routerLink="/heroes">Heroes</a>
+</nav>
+
+<router-outlet></router-outlet>
 <app-messages></app-messages>

#part4: generate dashbord component

#part5: develop dashbord component + integrating it in the routing:
1) dashbord component showing 4 heroes:
//src/app/dashboard/dashboard.component.ts:

+import { Hero } from '../hero';
+import { HeroService } from '../hero.service';
...
+  heroes: Hero[] = [];
-  constructor() { }
+  constructor(private heroService: HeroService) { }
...
   ngOnInit() {
+    this.getHeroes();
   }
+  getHeroes(): void {
+    this.heroService.getHeroes()
+      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
+  }

//src/app/dashboard/dashboard.component.html:
<h3>Top Heroes</h3>
<div class="grid grid-pad">
  <a *ngFor="let hero of heroes" class="col-1-4">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </a>
</div>

//src/app/dashboard/dashboard.component.css

2)adding dashbord route to our Routing:
//src/app/app-routing.module.ts:
+import { DashboardComponent }   from './dashboard/dashboard.component';
...
 const routes: Routes = [
   { path: 'heroes', component: HeroesComponent },
+  { path: 'dashboard', component: DashboardComponent },
+  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // setting default path
 ];
 
3) adding the dashbord route to the root component html
//src/app/app.component.html:
 <h1>{{title}}</h1> 
 <nav>
+    <a routerLink="/dashboard">Dashboard</a>
     <a routerLink="/heroes">Heroes</a>
 </nav>

#part6: routing hero detail:
1.path:
//src/app/app-routing.module.ts:
+import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
...
 const routes: Routes = [
   { path: 'heroes', component: HeroesComponent },
   { path: 'dashboard', component: DashboardComponent },
+  { path: 'detail/:id', component: HeroDetailComponent },
   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 ];
2.linking the two view list elements to that path
//src/app/dashboard/dashboard.component.html:
+<a *ngFor="let hero of heroes" class="col-1-4" routerLink="/detail/{{hero.id}}">

//src/app/heroes/heroes.component.html:
-<app-hero-detail [hero]="selectedHero"></app-hero-detail>
 <h2>My Heroes</h2>
 <ul class="heroes">
-  <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
-    <span class="badge">{{hero.id}}</span> {{hero.name}}
+  <!-- <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero" > -->
+  <li *ngFor="let hero of heroes">
+    <a routerLink="/detail/{{hero.id}}">
+      <span class="badge">{{hero.id}}</span> {{hero.name}}
+    </a>
   </li>
 </ul>
3.catching URL and getting id and getting hero by id from service hero
//src/app/hero-detail/hero-detail.component.ts:

+import { ActivatedRoute } from '@angular/router'; //holds information about the route
+import { Location } from '@angular/common'; //  an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here.
+
+import { HeroService }  from '../hero.service'; //getting hero by id
...
-  constructor() { }
+  constructor(
+    private route: ActivatedRoute,
+    private heroService: HeroService,
+    private location: Location
+  ) {}
+
+  ngOnInit(): void {
+    this.getHero();
+  }
+  getHero(): void {
+    const id = +this.route.snapshot.paramMap.get('id'); //+ before elt convert it to number
+    this.heroService.getHero(id)
+      .subscribe(hero => this.hero = hero);
   }

//src/app/hero.service.ts:
+  getHero(id: number): Observable<Hero> {
+    // Todo: send the message _after_ fetching the hero
+    this.messageService.add(`HeroService: fetched hero id=${id}`);
+    return of(HEROES.find(hero => hero.id === id));
+  }  
+
 
//src/app/heroes/heroes.component.ts: //commenting code
// selectedHero: Hero;
// onSelect(hero: Hero): void {
//   this.selectedHero = hero;
// } 

#part7: go button action + directive:
//hero-detail.component.html:
+<button (click)="goBack()">go back</button>
//src/app/hero-detail/hero-detail.component.ts:
+  goBack(): void {
+    this.location.back();
+  }


VIII-HTTP:
1.Simulate a data server using "In-memory Web API":
It may also be convenient in the early stages of your own app development when the server's web api is ill-defined or not yet implemented.
Important: the "In-memory Web API" module has nothing to do with HTTP in Angular.
>npm install angular-in-memory-web-api --save










		 
				

	
	

	




