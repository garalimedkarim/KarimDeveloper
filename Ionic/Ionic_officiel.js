
Ionic Official:

Get Started : Ionic Crash Course (2.x and above) : youtube:

Ionic overview:
	Ionic CLI
	Ionic Creator (UI without coding)
	Cloud services: auth,DB,push,deploy,package. 
		things like User auth and push notification
	Ionic Native : Camera,Bluetooth,OAuth,Touch ID
	Ionic View App: share & test

First App:
>sudo npm install -g codova ionic 
>ionic start helloWorld --v2
>cd helloworld
#test:
>ionic lab

#Ionic Structure
>hooks : scripts that run before,during and after building and testing your app 
>node_modules : Js dependecicies
>platforms : where Cordova generates plateforms-specific code: for IOs, we have objective C, we can test our app directly from this folder
>plugins: where Cordova stores native plugin code (Camera plugin,bluetooth plugin, ...)
>ressources: icons,splash screen 
>src:
    >app: runs bascically the initial code that jump starts your app bootstraps your app 
	app_component.ts: our app is a tree structure of components and there must be a the root component
	app.html: template: (generally this is the root component)
		<ion-nav [root]="rootPage"></ion-nav> : a nav controller that let you push and pop pages to naviguate between them
	app.modules.ts: here we define our ng modules declaration, list out all the components that we are using, import the ionic module and we specify some other entries and providers
	app.scss: global CSS SASS
	main.ts: small entry point for the app that tells angular to bootstrap and run the app using the app module(app.modules.ts)
    >assets: static assets like images
    >pages: this is where the code for every single one of our pages live(home,about,etc)
    >theme: 
	variables.scss: css global variables
    declaration.d.ts: a file that typescript uses to type external modules that don't
    index.html: the root index html file that gets put into www
    manifest.json: this is a progressive web app file as a standalone app for chrome in mobile web browsers that support it.
    servie-worker.js: same thing, feature for progressive web apps
	

>www: static output folder for app, every time ionic builds our app and generates it that code goes into this directory => avoid putting files in the assets and build directory because ionic overrides them when building the app
.editorconfig : to help you better format your code using ionic code standards
.gitignore
config.xml : a configuration file for Cordova that let you configure the actual quarter of app
ionic_config.json : store some config that ionic reads => you don't need to mess with this
package.json
tsconfig.json: specify some config for type script, you shouldn't modify this file
tslint.js: linter rule and linters are bascically tools that help format your code or tell you about code that's not properly formatted, this helps work with other team members( standarinsing tab, etc)



