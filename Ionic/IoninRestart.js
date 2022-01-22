	
sudo npm install -g npm@latest
sudo npm install -g ionic cordova

ionic start app0

How to check Angular Version for Ionic:
	Meth1:
		#package.json:
		  "dependencies": {
			"@angular/animations": "5.2.11",
			"@angular/common": "5.2.11",
			"@angular/compiler": "5.2.11",
			"@angular/compiler-cli": "5.2.11",
			"@angular/core": "5.2.11",
			"@angular/forms": "5.2.11",
			"@angular/http": "5.2.11",
			"@angular/platform-browser": "5.2.11",
			"@angular/platform-browser-dynamic": "5.2.11",			

	Meth2:
		Inspect F12 search "ng-version"
			<ion-app class="app-root app-root-md md platform-mobile platform-android platform-android4 platform-android4_0 platform-mobileweb" ng-version="5.2.11"><div app-viewport="">			
	

Ionic: NgBoostrap
	install NgBootstrap
	Include it in app.module.ts
	install bootstrap and do this job
		https://www.youtube.com/watch?v=eVdn8zd7eiA


Create Page
	> ionic generate page profile
	//Duplicate a hole directory page and adapting it with new name

Theming Mobile:
	16.Configuring Page Transitions:

	14.Adding Custom Styles:
	#modified:   src/pages/quotes/quotes.scss:
	.author{
		color:#ccc;
		text-align: right;
		text-transform: uppercase;
		margin: 0;
		padding: 0;
		
		&:before{
			content: '- ';
		}
	}
	30.Changing the overall App Theme:
	#modified:   src/theme/variables.scss:
		//Put Under //Shared variables:
		$content-padding:8px;
		
		+//  primary:    #488aff,
		+  primary:    #ffbb00,	

24.Passing Data from a Modal back to the Page:


4.Creating the required Pages
NavPush vs NavPop
<button ion-button [navPush]="pushPage" [navParams]="params">Go</button>
<button ion-button navPop>Go Back</button>

Open Select progmatically:

#set Root nav
  @ViewChild('nav') nav:NavController;
  isAuthenticated:boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl:MenuController,
              private authService: AuthService) {
    
    firebase.initializeApp({
      apiKey: "AIzaSyAUUzjPzbPxgPPrC09JabsSkdnQAQfmjAg",
      authDomain: "ionic3-recipebook-eb262.firebaseapp.com",
    });

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.isAuthenticated = true;
        this.nav.setRoot(this.rootPage);
      }else{
        this.isAuthenticated = false;
        this.nav.setRoot(this.signinPage);        
      }
    })
    
    
Popover positionning:
	https://stackoverflow.com/questions/40524197/how-to-position-a-popover-in-ionic-2


Observable:
	https://www.youtube.com/watch?v=Tux1nhBPl_w
	Observer subscribe to Observable = I am caring about you, I am listening you.
	Observer has three optional methods: next(),error(),complete()
	
	
Real Time Chat:
	https://www.youtube.com/watch?v=VUNkjQ_k2Uc&list=PLOGxpLgssNSg5fUZXyPzqEIY4obpij9j0  
	Min 29 => subscribe to the chat Object in database
	
msg = `The User ${this.username} hase left the room.`;
