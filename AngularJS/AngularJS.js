

#ng-app directive:
	https://www.w3schools.com/angular/ng_ng-app.asp
	
	The ng-app directive tells AngularJS that this is the root element of the AngularJS application.
	Simply:
		The ng-app directive tells AngularJS library "here we are going to write AngularJS code".	
	All AngularJS applications must have a root element.

	Exple:
		<div ng-app="myApp" ng-controller="myCtrl">
			{{ firstName + " " + lastName }}
		</div>

		<script>
		var app = angular.module("myApp", []);
		app.controller("myCtrl", function($scope) {
			$scope.firstName = "John";
			$scope.lastName = "Doe";
		});
		</script>
		
#ng-model & #ng-bind
	https://www.w3schools.com/angular/angular_intro.asp
	
	The ng-model directive binds the value of HTML controls (input, select, textarea) to application data.
	The ng-bind directive binds application data to the HTML view.

	Exple:	
		<!DOCTYPE html>
		<html>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
		<body>

		<div ng-app="">
		  <p>Name: <input type="text" ng-model="name"></p>
		  <p ng-bind="name"></p>
		</div>

		</body>
		
	Exple2 (#ng-model with ng-controller)
		<div ng-app="myApp" ng-controller="myCtrl">
		  Name: <input ng-model="name">
		</div>

		<script>
		var app = angular.module('myApp', []);
		app.controller('myCtrl', function($scope) {
		  $scope.name = "John Doe";
		});
		</script>	
		
		
#ng-init vs data-ng-init:
	those 2 directives are used to initialize an AngularJS variable in the HTML directly.
	You can use data-ng-, instead of ng-, if you want to make your page HTML valid.
	HTML Validators will throw an error with property like ng-init, but if we give a prefix with data-(e.g: data-ng-init), HTML Validators accept it and it will be valid.
	
	
#AngularJS Expressions
	an expression is putted between {{ expression }}
	Exple 1
		<p>{{ 5 + 5 }}</p>
	Exple 2
		<div ng-app="" ng-init="myCol='lightblue'">
			<input style="background-color:{{myCol}}" ng-model="myCol">
		</div>
		
#AngularJS Modules
	An AngularJS module defines an application.
	A module is created by using the AngularJS function angular.module
	<div ng-app="myApp">...</div>

	<script>
		var app = angular.module("myApp", []); 
	</script>
	Now you can add controllers, directives, filters, and more, to your AngularJS application.

#Adding a Controller:
	Exple:
		<div ng-app="myApp" ng-controller="myCtrl">
		{{ firstName + " " + lastName }}
		</div>

		<script>

		var app = angular.module("myApp", []);

		app.controller("myCtrl", function($scope) {
		  $scope.firstName = "John";
		  $scope.lastName = "Doe";
		});

		</script>	

#Adding a Directive
	Exple:
		<div ng-app="myApp" w3-test-directive></div>

		<script> 
		var app = angular.module("myApp", []);

		app.directive("w3TestDirective", function() {
		  return {
			template : "I was made in a directive constructor!"
		  };
		});
		</script>	

#When to Load the Library
	https://www.w3schools.com/angular/angular_modules.asp
	
	Two-Way Binding Exple:
		<div ng-app="myApp" ng-controller="myCtrl">
		  Name: <input ng-model="name">
		  <h1>You entered: {{name}}</h1>
		</div>
		
	
#ng-model with forms:
	1)can provide type validation for application data (number, e-mail, required):
	Exple:
		<form ng-app="" name="myForm">
		  Email:
		  <input type="email" name="myAddress" ng-model="text">
		  <span ng-show="myForm.myAddress.$error.email">Not a valid e-mail address</span>
		</form>
		#ng-show: if true the div appears else not
	2)can provide status for application data (valid, dirty, touched, error):
	Exple:
	<form ng-app="" name="myForm" ng-init="myText = 'post@myweb.com'">
	  Email:
	  <input type="email" name="myAddress" ng-model="myText" required>
	  <h1>Status</h1>
	  {{myForm.myAddress.$valid}}
	  {{myForm.myAddress.$dirty}}
	  {{myForm.myAddress.$touched}}
	</form>
	
	The ng-model directive adds/removes the following classes, according to the status of the form field:
		ng-empty
		ng-not-empty
		ng-touched
		ng-untouched
		ng-valid
		ng-invalid
		ng-dirty
		ng-pending
		ng-pristine	
		
#Data-Binding:
	<div ng-app="myApp" ng-controller="myCtrl">
	  <h1 ng-click="changeName()">{{firstname}}</h1>
	</div>

	<script>
	var app = angular.module('myApp', []);
	app.controller('myCtrl', function($scope) {
	  $scope.firstname = "John";
	  $scope.changeName = function() {
		$scope.firstname = "Nelly";
	  }
	});
	</script>
	
#ng-controller:
	Exple
		<div ng-app="myApp" ng-controller="personCtrl">

		First Name: <input type="text" ng-model="firstName"><br>
		Last Name: <input type="text" ng-model="lastName"><br>
		<br>
		Full Name: {{fullName()}}

		</div>

		<script>
		var app = angular.module('myApp', []);
		app.controller('personCtrl', function($scope) {
		  $scope.firstName = "John";
		  $scope.lastName = "Doe";
		  $scope.fullName = function() {
			return $scope.firstName + " " + $scope.lastName;
		  };
		});
		</script>	
	
	Exple2
		#external script file: namesController.js:
			angular.module('myApp', []).controller('namesCtrl', function($scope) {
			  $scope.names = [
				{name:'Jani',country:'Norway'},
				{name:'Hege',country:'Sweden'},
				{name:'Kai',country:'Denmark'}
			  ];
			});	
		#HTML:
			<div ng-app="myApp" ng-controller="namesCtrl">

			<ul>
			  <li ng-repeat="x in names">
				{{ x.name + ', ' + x.country }}
			  </li>
			</ul>

			</div>

			<script src="namesController.js"></script>	
			
#ng-repeat:
	<div ng-app="myApp" ng-controller="myCtrl">

	<ul>
	  <li ng-repeat="x in names">{{x}}</li>
	</ul>

	</div>

	<script>
	var app = angular.module('myApp', []);

	app.controller('myCtrl', function($scope) {
	  $scope.names = ["Emil", "Tobias", "Linus"];
	});
	</script>

#rootScope:
	The rootScope is available in the entire application.
	The rootScope < scope in its zone
		https://www.w3schools.com/angular/tryit.asp?filename=try_ng_scope_rootscope

#Filters:
	<p>The name is {{ lastName | uppercase }}</p>
	
	AngularJS provides filters to transform data:
		currency Format a number to a currency format.
		date Format a date to a specified format.
		filter Select a subset of items from an array.
		json Format an object to a JSON string.
		limitTo Limits an array/string, into a specified number of elements/characters.
		lowercase Format a string to lower case.
		number Format a number to a string.
		orderBy Orders an array by an expression.
		uppercase Format a string to upper case.
		
#ng-if vs ng-show // those 2 directives show and hides elements
	Both ng-show and ng-if receive a condition and hide from view the directive’s element in case the condition evaluates to false. The mechanics they use to hide the view, though, are different.
	ng-show (and its sibling ng-hide) toggle the appearance of the element by adding the CSS display: none style.
	ng-if, on the other hand, actually removes the element from the DOM when the condition is false and only adds the element back once the condition turns true.			


#select input
	<div ng-app="myApp" ng-controller="myCtrl">
		<select ng-model="selectedName" ng-options="x for x in names">
		</select>
	</div>

	<script>
		var app = angular.module('myApp', []);
		app.controller('myCtrl', function($scope) {
		  $scope.names = ["Emil", "Tobias", "Linus"];
		});
	</script>

#DOM:
	https://www.w3schools.com/angular/angular_htmldom.asp
	ng-disabled,
	
#Events:
	ng-blur
	ng-change
	ng-click
	ng-copy
	ng-cut
	ng-dblclick
	ng-focus
	ng-keydown
	ng-keypress
	ng-keyup
	ng-mousedown
	ng-mouseenter
	ng-mouseleave
	ng-mousemove
	ng-mouseover
	ng-mouseup
	ng-paste
	https://www.w3schools.com/angular/angular_events.asp
