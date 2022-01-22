Doc I : Firebase Realtime Database Officiel Documentation F
	https://firebase.google.com/docs/database/web/start

1.Getting Started:
	Structure Your Database
		How data is structured: it's a JSON tree
		Best practices for data structure
			Avoid nesting data
			Flatten data structures

2.Read and Write Data on the Web
	Get a database reference
		// Get a reference to the database service
		var database = firebase.database();
	Reading and writing data
		Basic write operations
			1-set
				function writeUserData(userId, name, email, imageUrl) {
				  firebase.database().ref('users/' + userId).set({
					username: name,
					email: email,
					profile_picture : imageUrl
				  });
				}
	Listen for value events
		To read data at a path and listen for changes, use the on() oronce() methods of firebase.database.Reference to observe events.
			var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
			starCountRef.on('value', function(snapshot) {
			  updateStarCount(postElement, snapshot.val());
			});
			
	Read data just once
		var userId = firebase.auth().currentUser.uid;
		return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
		  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
		  // ...
		});
	Updating or deleting data
		Update specific fields
			To simultaneously write to specific children of a node without overwriting other child nodes, use the update() method.
			function writeNewPost(uid, username, picture, title, body) {
			  // A post entry.
			  var postData = {
				author: username,
				uid: uid,
				body: body,
				title: title,
				starCount: 0,
				authorPic: picture
			  };

			  // Get a key for a new Post.
			  var newPostKey = firebase.database().ref().child('posts').push().key;

			  // Write the new post's data simultaneously in the posts list and the user's post list.
			  var updates = {};
			  updates['/posts/' + newPostKey] = postData;
			  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

			  return firebase.database().ref().update(updates);
			}			
			
	Add a Completion Callback
		If you want to know when your data has been committed, you can add a completion callback. Both set() and update() take an optional completion callback that is called when the write has been committed to the database. If the call was unsuccessful, the callback is passed an error object indicating why the failure occurred.

		  firebase.database().ref('users/' + userId).set({
			username: name,
			email: email,
			profile_picture : imageUrl
		  }, function(error) {
			if (error) {
			  // The write failed...
			} else {
			  // Data saved successfully!
			}
		  });
		}

	Delete data
		The simplest way to delete data is to call remove() on a reference to the location of that data.
	Receive a Promise
		To know when your data is committed to the Firebase Realtime Database server, you can use a Promise. Both set() and update() can return a Promise you can use to know when the write is committed to the database.
	Detach listeners
		Callbacks are removed by calling the off() method on your Firebase database reference.
	Save data as transactions
		function toggleStar(postRef, uid) {
		  postRef.transaction(function(post) {
			if (post) {
			  if (post.stars && post.stars[uid]) {
				post.starCount--;
				post.stars[uid] = null;
			  } else {
				post.starCount++;
				if (!post.stars) {
				  post.stars = {};
				}
				post.stars[uid] = true;
			  }
			}
			return post;
		  });
		}		
	Write data offline

3.Reading and writing lists
	Append to a list of data
		Use the push() method to append data to a list in multiuser applications. The push() method generates a unique key every time a new child is added to the specified Firebase reference.
			// Create a new post reference with an auto-generated id
			var newPostRef = postListRef.push();
			newPostRef.set({
				// ...
			});
	
	Listen for child events
		child_added	Retrieve lists of items or listen for additions to a list of items. This event is triggered once for each existing child and then again every time a new child is added to the specified path. The listener is passed a snapshot containing the new child's data.
		child_changed	Listen for changes to the items in a list. This event is triggered any time a child node is modified. This includes any modifications to descendants of the child node. The snapshot passed to the event listener contains the updated data for the child.
		child_removed	Listen for items being removed from a list. This event is triggered when an immediate child is removed.The snapshot passed to the callback block contains the data for the removed child.
		child_moved	Listen for changes to the order of items in an ordered list. child_moved events always follow the child_changed event that caused the item's order to change (based on your current order-by method).
		
		var commentsRef = firebase.database().ref('post-comments/' + postId);
		commentsRef.on('child_added', function(data) {
		  addCommentElement(postElement, data.key, data.val().text, data.val().author);
		});

		commentsRef.on('child_changed', function(data) {
		  setCommentValues(postElement, data.key, data.val().text, data.val().author);
		});

		commentsRef.on('child_removed', function(data) {
		  deleteComment(postElement, data.key);
		});	

	Listen for value events
		While listening for child events is the recommended way to read lists of data, there are situations listening for value events on a list reference is useful.
		
		ref.once('value', function(snapshot) {
		  snapshot.forEach(function(childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			// ...
		  });
		});
		
	Sorting and filtering data
		Note: Filtering and sorting can be expensive, especially when done on the client. If your app uses queries, define the .indexOn rule to index those keys on the server and improve query performance as described in Indexing Your Data.
		
	Sort data
		To retrieve sorted data, start by specifying one of the order-by methods to determine how results are ordered:
			orderByChild()	Order results by the value of a specified child key or nested child path.
			orderByKey()	Order results by child keys.
			orderByValue()	Order results by child values.
	
		The following example demonstrates how you could retrieve a list of a user's top posts sorted by their star count:
			var myUserId = firebase.auth().currentUser.uid;
			var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');

	Filtering data
		To filter data, you can combine any of the limit or range methods with an order-by method when constructing a query.

		Method	Usage
		limitToFirst()	Sets the maximum number of items to return from the beginning of the ordered list of results.
		limitToLast()	Sets the maximum number of items to return from the end of the ordered list of results.
		startAt()	Return items greater than or equal to the specified key or value, depending on the order-by method chosen.
		endAt()	Return items less than or equal to the specified key or value, depending on the order-by method chosen.
		equalTo()	Return items equal to the specified key or value, depending on the order-by method chosen.
	
	How query data is ordered
		orderByChild
		orderByKey
		orderByValue

	Detach listeners
		Callbacks are removed by calling the off() method on your Firebase database reference.

4.Enabling Offline Capabilities in JavaScript
	Managing Presence
		var presenceRef = firebase.database().ref("disconnectmessage");
		// Write a string when this client loses connection
		presenceRef.onDisconnect().set("I disconnected!");

	How onDisconnect Works
		When you establish an onDisconnect() operation, the operation lives on the Firebase Realtime Database server. The server checks security to make sure the user can perform the write event requested, and informs the your app if it is invalid. The server then monitors the connection. If at any point the connection times out, or is actively closed by the Realtime Database client, the server checks security a second time (to make sure the operation is still valid) and then invokes the event.

		Your app can use the callback on the write operation to ensure the onDisconnect was correctly attached:

		presenceRef.onDisconnect().remove(function(err) {
		  if (err) {
			console.error('could not establish onDisconnect event', err);
		  }
		});
		An onDisconnect event can also be canceled by calling .cancel():

		var onDisconnectRef = presenceRef.onDisconnect();
		onDisconnectRef.set('I disconnected');
		// some time later when we change our minds
		onDisconnectRef.cancel();

	Detecting Connection State
		For many presence-related features, it is useful for your app to know when it is online or offline. Firebase Realtime Database provides a special location at /.info/connected which is updated every time the Firebase Realtime Database client's connection state changes. Here is an example:

		var connectedRef = firebase.database().ref(".info/connected");
		connectedRef.on("value", function(snap) {
		  if (snap.val() === true) {
			alert("connected");
		  } else {
			alert("not connected");
		  }
		});

	Handling Latency
		Server Timestamps
			The Firebase Realtime Database servers provide a mechanism to insert timestamps generated on the server as data. This feature, combined with onDisconnect, provides an easy way to reliably make note of the time at which a Realtime Database client disconnected:

			var userLastOnlineRef = firebase.database().ref("users/joe/lastOnline");
			userLastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);

	Clock Skew
		var offsetRef = firebase.database().ref(".info/serverTimeOffset");
		offsetRef.on("value", function(snap) {
		  var offset = snap.val();
		  var estimatedServerTimeMs = new Date().getTime() + offset;
		});
		
	Sample Presence App
		Here is a simple user presence system:

		// since I can connect from multiple devices or browser tabs, we store each connection instance separately
		// any time that connectionsRef's value is null (i.e. has no children) I am offline
		var myConnectionsRef = firebase.database().ref('users/joe/connections');

		// stores the timestamp of my last disconnect (the last time I was seen online)
		var lastOnlineRef = firebase.database().ref('users/joe/lastOnline');

		var connectedRef = firebase.database().ref('.info/connected');
		connectedRef.on('value', function(snap) {
		  if (snap.val() === true) {
			// We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
			var con = myConnectionsRef.push();

			// When I disconnect, remove this device
			con.onDisconnect().remove();

			// Add this device to my connections list
			// this value could contain info about the device or a timestamp too
			con.set(true);

			// When I disconnect, update the last time I was seen online
			lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
		  }
		});

5.Security & Rules:
	Understand Firebase Realtime Database Rules
		Rule Types
			.read	Describes if and when data is allowed to be read by users.
			.write	Describes if and when data is allowed to be written.
			.validate	Defines what a correctly formatted value will look like, whether it has child attributes, and the data type.
			.indexOn	Specifies a child to index to support ordering and querying.		
			
		Realtime Database security overview
			The Firebase Realtime Database provides a full set of tools for managing the security of your app. These tools make it easy to authenticate your users, enforce user permissions, and validate inputs.

		Authentication
			A common first step in securing your app is identifying your users.
		Authorization
			{
			  "rules": {
				"foo": {
				  ".read": true,
				  ".write": false
				}
			  }
			}
			.read and .write rules cascade, so this ruleset grants read access to any data at path /foo/ as well as any deeper paths such as /foo/bar/baz.
			{
			  "rules": {
				"users": {
				  "$uid": {
					".write": "$uid === auth.uid"
				  }
				}
			  }
			}
		Data validation
			{
			  "rules": {
				"foo": {
				  ".validate": "newData.isString() && newData.val().length < 100"
				}
			  }
			}
		Defining database indexes
			{
			  "rules": {
				"dinosaurs": {
				  ".indexOn": ["height", "length"]
				}
			  }
			}
	Get Started
	Secure Data
	Secure User Data
	Resolve Insecurities
	Test Security Rules
	Index Data
		https://firebase.google.com/docs/database/security/securing-data


6.Conferance Google Security & Rules:
		https://www.youtube.com/watch?v=PUBnlbjZFAI
	var app = firebase.initilizeApp({
		apiKey: "xxxx",
		authDomain: "________",
		databaseUrl :"https://_________",
	})
		Take all data if rules are true
			#Rules at the console firebase
				"rules":{
					".read": true,
					".write": true
				}
			#Client File:
				var rootRef = app.database().ref()
				return rootRef.once("value").then(function(snapshot){
					console.log("All ur data belong to me", snapshot.val() );
				}
		Solution:
			auth top level variable populated by the rules languge itself.
			#Rules at the console firebase
				"rules":{
					"games":{
						"-115541215144":{
							".read": "auth !== null",
							".write": "auth !== null",
						},
						"-587465465456"{
							".read": "auth !== null",		
							".write": "auth !== null",							
						}
					}
				}
		But
			app.auth().signInAnonymously().then(function(){
				var rootRef = app.database().ref();
				return rootRef.remove();	
			})
			.then( ()=>{
				console.log('All games are removed');
			});
		Solution 2: 
			allow anonymous to see only public games
			#Rules at the console firebase
				"-115541215144":{
					".read": "auth !== null || data.child('isPublic).val() === true",
					".write": "auth !== null || data.child('isPublic).val() === true",
				}
				
		Generic Name for all games: "$gameId"
			"rules":{
					"games":{
						"$gameId":{
							".read": "auth !== null || data.child('isPublic).val() === true",
							".write": "auth !== null || data.child('isPublic).val() === true",						}
					}
				}
		//Metadata for public fields
			"rules":{
					"games":{
						"$gameId":{
							"metadata" :{
								".read": true,
							},
							"gameContent":{ ... },
							"tickets":{ ... }
						}
					}
			}			
		Introducing admins and giving them write in $gameId.metada:
			"rules":{
				"admins":{
					"44564fs64ds" : {
						name: "Karim Garali",
					},	
					"9871fs5sqs4" : {
						name: "Mohmaed Chady",
					},
				},	
				"games":{
					"$gameId":{
						"metadata" :{
							".read": true,
						  ++".write": "root.child('admins').hasChild(auth.uid)",
						  ++".validate": "newData.hasChildren(['date', 'opponent'])",
							"date":{
						  ++	".validate" : "newData.matches(/^\\d{2}-\\d{2}-\\d{4}$/)"
							},
							"Opponent":{
						  ++	".validate" : "newData.isString()"
							},
							"isPublic":{
								".validate" : "newData.val().isBoolean()"							
							},
							"opponent":{
								".validate" : "newData.val().contains('s')",
							},							
						},
						"gameContent":{ ... },
						"tickets":{ ... }
					}
				}
			}
		Data must be a String (Validate):
			Validation is executed in && && && cascading
			"date":{
				".validate" : "newData.isString()"
			},
			"Opponent":{
				".validate" : "newData.isString()"
			}	
		
		Very Important
			if we have a rule inside an object its applied in all its fields
						
		Security for Firebase Storage:
			https://www.youtube.com/watch?v=PUBnlbjZFAI
			30min->43min
	
//-----------------------------------------------------------------

Doc 1.1 The Fire Database For SQL Developers
	https://www.youtube.com/watch?v=Idu9EJPSxiY&index=6&t=0s&list=PLl-K7zZEsYLlP-k-RKFa7RyNPa9_wCH2s
1.SQL DB and Firebase DB
2.Converting SQL Structures to Firebase Structures
3.Firebase DB Quering
4.Common SQL Queris converted for the firebase DB
5.Joins in the Firebase DB
6.Denormalization is normal with Firebase DB
	Denormalization is to modify DB structure by duplicating data in the purpose to reduce or simplify your queries, to eliminate the need of joins in your queries. => Read Performance.
	
7.Data Consistency with Multi-path updates
8.Securing your data structure with Security Rules

//------------------------------------------------------------------------

Doc 2: Cloud FireStore Officiel Documentation:
	https://firebase.google.com/docs/firestore/quickstart
	
	

//------------------------------------------------------------------------

Doc 3:	

II-

I-Overview:

II-Introduction

III-Firebase Basics
	every fied in the database has its unique Url
	FireBase = NoSql

IV-Introduction To AngularFire

V-Authentication

VI-Using firebaseObject
	
VII-Using firebaseArray


//------------------------------------------------------------------------		

Doc4- Building Apps with AngularFire2:
	https://app.pluralsight.com/player?course=angularfire2-building-apps&author=duncan-hunter&name=angularfire2-building-apps-m2&clip=4&mode=live

1-Course Overview

2-Course Introduction
	Why Learn AngularFire 2?
		Firebase gives u:
			realTime DB/ Hosting/ Authentification/ Google Cloud Storage/ Cloud Firebase Functions/ Cloud Messaging
		
3-Installation and Setup
	>ng --version
	>ng new angularfire
	>cd angularfire/
	>ng serve

	every field in the database is accessible via get request with the right path.
	if rules are not statisfied, the service return an object.error = "Permission denied". 

	click on overview in the console, there is web, android and iphone config.

	Start Work:
		Go To Officiel Documentation: AngularFire
			https://github.com/angular/angularfire2
		1.Install:
			>npm install firebase @angular/fire --save
		#app.module.ts
		+import { AngularFireModule } from '@angular/fire';
		+import {firebaseConfig} from './config';
		+import { AngularFireDatabaseModule } from '@angular/fire/database';
		//---
		   imports: [
			 BrowserModule,
		-    AppRoutingModule
		+    AppRoutingModule,
		+    AngularFireModule.initializeApp(firebaseConfig),
		+    AngularFireDatabaseModule
		   ],
		2.Retrieve Data Object:
		#app.component.ts
		+import { AngularFireDatabase } from '@angular/fire/database'
;
		+import { Observable } from 'rxjs';
		//---
		+  item: Observable<any>;
		+  constructor(private db: AngularFireDatabase) {    
		+    // setTimeout(()=>{
		+      db.object('connected').valueChanges()
		+      .subscribe(console.log);
		+    // },1000);    
		+  }
		
		3.Deploy Angular App to Firebase Hosting:
			1.Install
				>npm i firebase-tools -g 
				>firebase init
				//check your rules etc
				>ng build --prod
				>firebase deploy
				=> Hosting Url
					
4-Retrieving and Working with Firebase Objects
	RxJS = API for asynchronous programming with observable streams

    Introduction
    Brief Introduction to RxJS	
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
    Demo Introduction to RxJS
    
    Adding Angular Material
		>ng add @angular/material
		#create a proper module for Angular Material imports to keep clean our app.module.ts
    Retrieving Objects
    Saving Objects
    Updating Objects
    Removing Objects
    Error Handling with Promises and Observables
    Summary


Retrieving and Working with Firebase Lists

    Introduction
    Adding Routing
    Retrieving Lists
		.list()
			.push()
			.update()
			.remove()
			
		#Retrieve Data List with Key:
			this.companies$ = this.db.list('companies').snapshotChanges()
      
			  return this.companies$
			  .pipe(map(items => {          // <== new way of chaining
				return items.map(a => {
				  const data = a.payload.val();
				  const key = a.payload.key;
				  return {"key":key, "name":data.name, "fondator": data.fondator};         // or {key, ...data} in case data is Obj
				})
			  }));
			  
		#Retrieve company from list in edit-company
		SPINNER :
		>npm install ngx-spinner --save
		
    Saving and Updating Lists
    Saving Lists Starting with an Empty Observable
    Removing Items and Error Handling with Observables

6-Querying Firebase Lists With Observables
    Introduction
    Duplicating the Company Feature
    Relating Contacts to Companies
    Querying with Primitive Values
    Introduction to RxJS Subjects
		Subject = syncronizing two components via the service method they are using to get data.
		Same components duplicated also works with the same method.
    Querying with Observable Values
		Subject and Behaviour Subject
    Creating a Many to Many Relationship
		setting the id of this into this and vice versa
    Multipath Updates
		add a field contact.contactCompanies: [{"name":string}]
    Mutlipath Updates Demo
		editContact(contact:Contact){
			let updateContact = {};
			updateContact[`contacts/${contact.$key}`] = contact;
			Object.keys(contact.contactCompanies).forEach(companyKey =>{
				updateContact[`companyContacts/${companyKey}/${contact.$key}`] = true; 
			}
			
			return this.db.object('/').update(updateContact)
			.then(_ => console.log('succes'))
			.catch (err => console.log(err));
		}
		// setting a field to null => remove it 
    Firebase Joins
		#That's blocked me.
    Denormlaizing Data
    Summary

7-Authentication
    Introduction
    Logging in Users
		#app.module:
		+import { AngularFireAuthModule } from '@angular/fire/auth';
		//
		import [
			++AngularFireAuthModule
		]
			
    Enabling Signin Methods in Firebase
		From Authentication Interface in Firebase console enable Google Method
		// you can see phone sign in method
			Pricing: https://firebase.google.com/pricing/?authuser=0
    Using Angular Guards to Secure Routes
    7m 37s
    Summary
    0m 52s

8
AngularFire Extras
44m 59s

    Introduction
    0m 35s
    Firebase Storage
    6m 33s
    How to Use ngrx with AngularFire
    7m 33s
    ngrx with AngularFire Demo
    7m 18s
    Capturing All Firebase Events with ngrx
    2m 45s
    Setup Testing AngularFire
    8m 41s
    Testing AngularFire
    8m 15s
    Wrap Up
    3m 15s


Firebase Authentication
Firebase Cloud Firestore

Angular + Firebase PhoneNumber Authentication:
	https://blog.khophi.co/worldwide-phone-number-verification-via-firebase-auth-angular/


Firebase Cloud Functions (backend Server):
	https://www.youtube.com/watch?v=DYfP-UIKxH0&t=0s&index=2&list=PLl-K7zZEsYLkPZHe41m4jfAxUi0JjLgSM
