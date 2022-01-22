
sudo npm install -g ionic cordova 
ionic serve --lab // show in diffrent platforms

ionic cordova platform add ios
ionic cordova build ios
ionic cordova emulate ios
ionic cordova run ios

Ionic Pro is a powerful set of services and features built on top of the flagship Ionic Framework that brings a totally new level of app development agility to mobile dev teams.
Ionic Pro has several core services that help you through the full app lifecycle, including

    Deploy: Update your app remotely in real-time without app store delays.
    Package: Build app binaries in the cloud for iOS and Android.
    Monitoring: Track runtime errors in production back to your original TypeScript

Ionic Pro Documentation
	https://ionic.zendesk.com/hc/en-us/articles/360006712113-Ionic-Pro-Introduction-Overview

	Integring GitHub with Ionic Pro
		https://ionic.zendesk.com/hc/en-us/articles/360006139713-Getting-your-App-into-Ionic-Pro

Styling Transitions
	https://ionicframework.com/docs/api/config/Config/

config.xml
	PROD => change <widget id="myownPackage.x.x" 
			AppName,Author,etc... 

Book:

Ionic Architecture:
www:
	This directory contains the index.html that will bootstrap our Ionic application with the transpiled output from the app director
config.xml
	Used by Cordova to define various app-specific elements.
ionic.config.json
	Used by the Ionic CLI to define various settings when executing commands.

Define Your Build Platforms
	ionic cordova platform add ios
	ionic cordova platform add android
	ionic cordova platform add windows
	ionic cordova platform remove ios

Managing Cordova Plugins
	ionic cordova plugin add [plugin id]
	ionic cordova plugin rm [plugin id]
	ionic cordova plugin ls
	
Ionic Generator
	ionic g [page|component|directive|pipe|provider|tabs] [element name]

Previewing Your Application
	ionic serve
	ionic serve --lab
	ionic serve --address 112.365.365.321
	
Emulating Your Ionic App
	ionic cordova emulate android

Emulating iOS Devices
	npm install -g ios-sim
	ios-sim showdevicetypes

Running Ionic App on a Device
	ionic cordova run [platform name]
	npm install -g ios-deploy

CLI Info
	ionic info
	
ionic --help

Angular/TypeScript
Promise

Observables
	Many  services  with  Angular  use  Observables  instead  of  Promises.  Observables  are
	implemented through the use of the 
	RxJS library. Unlike a Promise, which resolves to
	a  single  value  asynchronously,  an  observable  resolves  to  (or  emits)  multiple  values
	asynchronously (over time).
	In  addition,  Observables  are  cancellable  and  can  be  retried  using  one  of  the  retry
	operators  provided  by  the  API,  such  as retry and retry When.  Promises  require  the
	caller  to  have  access  to  the  original  function  that  returned  the  Promise  in  order  to have a retry capability.

Arrow Functions
	var multiply = (x, y) => { return x * y };	

Special Types
Beyond the primitive types, there are a few types that have special meaning in Type‐
Script. These are any, null, undefined, and void


Tuto Youtube Mohamed Youssfi Ionic 3 Cordova:
App1:
	onSearch(){
		this.http.get(url:"https/pixabay.com/api/?key=4545454&q="+this.motCle+"&per_page=10&page=1")
		.map(resp => resp.json())
		.subscribe(data =>{
			this.image = data;
		},error =>{
			console.log(error);
		})
	}

Local Storage:
	https://www.youtube.com/watch?v=2_xpwdoMLAg&index=19&list=PLiPB5iCKp3cvelTG5M0jpOO5cSQpa6nUt
	JSON.parse Vs JSON.stringify

Passing Object by Value:
	JSON.parse(JSON.stringify(this.originalRecipe))

Don t Use Alert To Debug Asynchronous Code

