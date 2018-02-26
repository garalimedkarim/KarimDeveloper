
I- Premiers pas avec AngularJs
1.Introduction:
	Notre application etant en monopage, gestion de l historique pour manipuler les boutons precedent et avant du naviguateur.
	
2.Construction d une page web statique:

3.Inclusion de Angular pour dynamiser le contenu:
	JQuery: evenementiel,
	Angular: Declaratif,
	#DataBinding: mise à jour de la vue en fonction du modèle et vice versa

#part1:
	//*index.html: ajout de angular 1.0.3:
-    <body>
+    <body ng-app="WebMail" ng-controller="WebMailCtrl">
//------------------------------------------------------
+    <li class="nav-item" ng-repeat="dossier in dossiers">
+         <a class="nav-link" ng-class="{ 'active active2': dossier == dossierCourant }" ng-click="selectionDossier(dossier)">{{dossier.label}}</a>
	 </li>
//------------------------------------------------------
	 <tr class="clicable" ng-repeat="email in dossierCourant.emails">
+         <td>{{email.from}}</td>
+         <td>{{email.to}}</td>
+         <td>{{email.subject}}</td>
+         <td>{{email.date}}</td>
     </tr>

//------------------------------------------------------
+         <p class="alert alert-info"> Vous avez {{nbMails}} dans la boite</p>
+
+         <button ng-click="plusMail()">Increment</button>
//------------------------------------------------------
+        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.0.3/angular.min.js"></script>
+        <script type="text/javascript" src="app.js"></script>

	//*app.js: ajout angular model:
+angular.module("WebMail",[])
+
+.controller("WebMailCtrl",function($scope){
+    $scope.nbMails = 5;
+    $scope.plusMail = function(){
+        $scope.nbMails++;
+    }
+
+    $scope.dossiers = [{...},{...}]; //a long json table
+	
+    $scope.dossierCourant = null;
+    $scope.selectionDossier = function(dossier){
+        $scope.dossierCourant = dossier;
+    }

#part2:
	*Ajout de sanitize et utilisation de ng-bind-html pour afficher les balises html du contenu du mail.
	*Adaptation de la vue avec les deux variables emailSelectionne et dossierCourant.

	
	//*index.html:
-                <table id="messagerie" class="table table-light">
+                <table id="messagerie" class="table table-light" ng-show="dossi
erCourant != null &amp;&amp; emailSelectionne == null">

<tr class="clicable" ng-repeat="email in dossierCourant.emails">
+                        <tr class="clicable" ng-repeat="email in dossierCourant.emails" ng-click="selectionEmail(email)">
	
-                <p class="alert alert-info"> Vous avez {{nbMails}} dans la boit
e</p>
+                <p class="alert alert-info"> Vous avez {{dossierCourant.emails.length}} dans la boite</p>

+                <div class="jumbotron py-2" ng-show="emailSelectionne != null">
+                    <h3>{{emailSelectionne.subject}}</h3>
+                    <p><label>De :</label> <span>{{emailSelectionne.from}}</span></p>
+                    <p><label>&Agrave; :</label> <span>{{emailSelectionne.to}}</span></p>
+                    <p><label>Date :</label> <span>{{emailSelectionne.date}}</span></p>
+                    <p class="mt-2 mail" ng-bind-html="emailSelectionne.content"></p>

+        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.0.3/angular-sanitize.min.js"></script>

	//*app.js:
+angular.module("WebMail",["ngSanitize"])

     $scope.dossierCourant = null;
+    $scope.emailSelectionne = null;
     $scope.selectionDossier = function(dossier){
         $scope.dossierCourant = dossier;
+        $scope.emailSelectionne = null;
+    }
+    $scope.selectionEmail = function(email){
+        $scope.emailSelectionne = email;

4.Gestion de l historique de naviguation:

	//*index.html
+    <a class="nav-link" ng-class="{ 'act
ive active2': dossier == dossierCourant }" href="#{{dossier.v
alue}}">{{dossier.label}}</a>

+	<tr class="clicable" ng-repeat="emai
l in dossierCourant.emails" ng-click="versEmail(dossierCourant,email)">


	//*app.js
-.controller("WebMailCtrl",function($scope){
+.controller("WebMailCtrl",function($scope,$location){

+    $scope.versEmail = function(dossier,idEmail){
+        $location.path(dossier.value+'/'+idEmail.id);
+    }
+
+    $scope.$watch( function(){
+        return $location.path();
+    },function(newPath){
+        var tabPath = newPath.split("/");
+        if(tabPath.length > 1){
+            var valDossier = tabPath[1];
+            $scope.dossiers.forEach(function(item) { 
+                if(item.value == valDossier)
+                    $scope.selectionDossier(item);
+            });
+        }
+        if(tabPath.length > 2){
+            var idMail = tabPath[2];
+			 $scope.dossierCourant.emails.forEach(function(item){                
+                if(item.id == idMail)
+                    $scope.selectionEmail(item);
+            });
+        }    
+    });

I.Quiz:
	On peut récupérer l''objet "event" JavaScript issu de l''évènement click depuis ng-click en passant l''objet $event en paramètre de la fonction de callback (ex. ng-click="clic(monParam, $event)" ) 

	
II- Tri, mise en forme et recherche avec des filtres AngularJS:
1.Introduction:
2.Tri des mails (filtre orderby):

#Gestion des filtres emails :
//*app.js:

    $scope.champTri = false;
    $scope.triDescendant = false;
    $scope.triEmails = function(champ){
        if($scope.champTri == champ)
            $scope.triDescendant = !$scope.triDescendant;
        else{
            $scope.champTri = champ;
            $scope.triDescendant = false;
        }
    }
    $scope.iconeChampTri = function(champ){
        return {'fa': $scope.champTri == champ, 'fa-sort-alpha-desc': $scope.champTri == champ && $scope.triDescendant , 
'fa-sort-alpha-asc': $scope.champTri == champ && !$scope.triDescendant };
    }
//*index.html:
	#Actions sur les entetes du tableau de mails:
                            <th class="colDe" scope="col">
                            <th class="colDe" scope="col">
                                <a ng-click="triEmails('from')">De</a>
                                <span class="fa float-right" 
                                    ng-class="iconeChampTri('from')">
                                </span>
                            </th>
                            <th class="colA" scope="col">
                                <a ng-click="triEmails('to')">&Agrave;</a>
                                <span class="fa float-right" ng-class="iconeChampTri('to')">
                            </span>                            
                            </th>
                            <th class="colObject" scope="col">
                                <a ng-click="triEmails('subject')">Objet</a>
                                <span class="fa float-right" ng-class="iconeChampTri('subject')">
                            </th>
                            <th class="colDate" scope="col">
                                    <a ng-click="triEmails('date')">Date</a>
                                    <span class="fa float-right" ng-class="iconeChampTri('date')">
                            </th
	#filtre sur le table body sur le ng-repeat:
                        <tr class="clicable" ng-repeat="email in dossierCourant.emails | orderBy:champTri:triDescendant" ng-click="versEmail(dossierCourant,email)">
							
							
3.Mise en forme des date (filtre date):
	Le filtre sur la date est actuellement se fait comme etant sur chaine de caracteres.
	Solution:
	1) le tableau json doit delarer les dates :new Date(2014, 2, 20, 15, 30)
	2) Ajout du filtre sur date : <td> {{email.date | date:'short'}} </td>
	=> affichage des dates : 3/20/14 3:30 PM

	Resolution du probleme du format date:
	Solution 1: introduire la local angular notre pays (france) : 
		<script type="text/javascript" src="http://code.angularjs.org/1.2.29/i18n/angular-locale_fr-fr.js"></script>
	Solution 2:
		{{email.date | date:'dd/MM/yyyy HH:mm'}}
	
4.Recherche des mails (filtre mail):
	//ng-model => id
	1) add ng-model to input search:
		<input type="text" placeholder="Rechercher un email ..." class="form-control" ng-model="rechercheEmail">
	2) ajouter un filter simple sur un input caractérisé par son ng-model :
		<tr class="clicable" ng-repeat="email in dossierCourant.emails | filter:rechercheEmail | orderBy:champTri:triDescendant" ng-click="versEmail(dossierCourant,email)">
	2) Amelioration transmettre le filtre dossierCourant.emails | filter:rechercheEmail dans le model angular (ds le js file):
		2.1) remplacer dossierCourant.emails | filter:rechercheEmail par une methode getDossiersFiltres() cela devient:
			<tr class="clicable" ng-repeat="email in getDossiersFiltres() | orderBy:champTri:triDescendant" ng-click="versEmail(dossierCourant,email)">
		2.2) dans le controlleur angular ajout du service filter:
			.controller("WebMailCtrl",function($scope,$location,$filter){
		2.3) application du filtre:
			$scope.getDossiersFiltres = function(){
				return $filter("filter")($scope.dossierCourant.emails,$scope.rechercheEmail);
			}
	>>>part2:
	Probleme : getDossiersFiltres est convoqué deux fois (performance) (convoqué aussi pour afficher le nb de mails)
	Solution:
		Creer une variable au fure et a musure dans le dev:
			<tr class="clicable" ng-repeat="email in emailsFiltres=(dossierCourant.emails| filter:rechercheEmail) | orderBy:champTri:triDescendant" ng-click="versEmail(dossierCourant,email)">
		Utiliser la variable cree emailsFiltres dans la vue:
			Vous avez {{emailsFiltres.length}} dans la boite.

5.Creation d un filtre personalisé - Mise en forme des resultat de recherche
	5.1) creation filtre dans app.js:
	.controller("CtrlX",function(){...})
	.filter("surbrillanceRecherche",function(){
		return function(input,recherche){
			if(recherche)
				return input.replace( new RegExp("("+recherche+")","gi") ,"<span class='surbrillanceRecherche'>$1</span>");

			return input;
		}
	});
	5.2) ajout des filtres sur les td:
		<tr class="clicable" ng-repeat="email in emailsFiltres=(dossierCourant.emails| filter:rechercheEmail) | orderBy:champTri:triDescendant" ng-click="versEmail(dossierCourant,email)">
			<td ng-bind-html="email.from | surbrillanceRecherche:rechercheEmail"></td>
			<td ng-bind-html="email.to | surbrillanceRecherche:rechercheEmail"></td>
			<td ng-bind-html="email.subject | surbrillanceRecherche:rechercheEmail"></td>
			<td>{{email.date | date:'dd/MM/yyyy HH:mm'}}</td>
		</tr>							   
								   	
6.Avantages & limites des filtres AngularJS:
		

III- Formulaires et validations:
1.Introduction:			
2.Creation d un formulaire:
	//*app.js:
	1) lors d un seclectionDossier nouveauEmail <= null
		$scope.selectionDossier = function(dossier){
			$scope.dossierCourant = dossier;
			$scope.emailSelectionne = null;
			if (dossier)
				$scope.nouveauEmail = null;
		}
	2) Traitement du location:
		if(tabPath.length > 1){
					if(tabPath[1] == "nouveauMail"){
						$scope.razEmail();
						$scope.selectionDossier(null);
					}else{
						// ancien traitement 
					}
		 }
	3) Les fonctions + les variables assoicié au Mail:
		$scope.nouveauEmail = null;
		$scope.razEmail = function(){
			$scope.nouveauEmail = {
				to: "",
				from: "Rudy",
				date: new Date(),
			};
		}

		$scope.idEmail = 12;
		$scope.envoiEmail = function(){
			$scope.nouveauEmail.id = $scope.idEmail++;
			$scope.dossiers.forEach(function(item){
				if(item.value == "ENVOYES"){
					item.emails.push($scope.nouveauEmail);
					$scope.nouveauEmail = null;
					$location.path("/");
				}
			});
		}
	
	//*index.html:
	#button new mail:
	<ul class="nav nav-tabs float-right">
		<li class="nav-item" >
			<a href="#/nouveauMail" class="nav-link" ng-class="{'active active2': nouveauEmail != null}">
				<i class="fa fa-pencil" aria-hidden="true"></i>
			</a>
		</li>
	</ul>		
	#form nouveau email:
	<form name="formNouveauEmail">
			<div class="form-group">
					<label for="exampleFormControlInput1">Email address</label>
					<input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" ng-model="nouveauEmail.to">
			</div>
			<div class="form-group">
					<label for="exampleFormControlInput2">Subject</label>
					<input type="text" class="form-control" id="exampleFormControlInput2" ng-model="nouveauEmail.subject">
			</div>                            
			<div class="form-group">
				<label for="exampleFormControlTextarea1">Example textarea</label>
				<textarea class="form-control" id="exampleFormControlTextarea1" rows="7" ng-model="nouveauEmail.content"></textarea>
			</div>
			<button type="submit" class="btn btn-primary float-left" ng-click="envoiEmail()">Send</button>   
			<button class="btn btn-secondary float-right" ng-click="razEmail()">Clear</button>
			<div class="clear-both"></div>                  
	</form>
	#le reste c'est des ng-show=""
				
3.Integration d un composant de texte riche(TinyMCE):
	

4.Validation de donnees avec AngularJS:
form : ng-model-controlleur
$prestine => true => form intouché 
$dirty => false => form touché
=> exclusive toujours 
$valid
$invalid

$setPrestine => etat 0 du formulaire => $prestine: true & $dirty=false.

	1) if formulaire formnNouveauEmail est valid :
		if($scope.formNouveauEmail.$valid){ ... }

	2) form clear status:
		$scope.formNouveauEmail.$setPristine();

	3) button raz disabled when form est déja clear:
	<button class="btn btn-secondary float-right" ng-click="razEmail()" ng-disabled="formNouveauEmail.$pristine">Clear 		 </button>

5.Validation de donnees manuelle:
	1) Enlever required et type="mail" des inputs
	2) implementer la validation manuelle :
		var regExpValidEmail = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "gi");

		if (!$scope.nouveauEmail.to || !$scope.nouveauEmail.to.match(regExpValidEmail)) {
			   window.alert("Erreur\n\nMerci de vérifier l'adresse e-mail saisie.");
			   return;
		}

		if (!$scope.nouveauEmail.subject) {
			   if (!window.confirm("Confirmation\n\nÊtes-vous certain de vouloir envoyer un mail sans objet ?")) {
					   return;
			   }
		}
	3) intervention bas niveau sur tinymce:
	   if (tinyMCE.activeEditor) {
			   tinyMCE.activeEditor.setContent("");
	   } 										   
										   

IV- Services, depandances et directives avec AngularJS:
1. Introoduction
2. Services et dépandances:
provider ("monservice",function(){
// $get: function(){...}
});
service ("monservice",function(){
// Constructeur
});
factory ("monservice",function(){
// return service
});
value("monservice", { object });
constant("monservice", { object });
										   
	1) Implementation d un nouveau module contenant un service factory:
	angular.module("MailServiceMock",[])
	.factory("MailService",function(){ 
		var dossiers = [...];

		return{
			getDossiers: function(){
				return dossiers;
			},
			getDossier: function(valDossier){
				dossierTrouve = null
				if (valDossier){
					dossiers.forEach(function(dossier){
						if(dossier.value == valDossier){
							dossierTrouve = dossier;
						}
					});
				}    
				return dossierTrouve;
			},
			getMail: function(valDossier,idMail){
				var mailRecupere = null;
				var dossier = this.getDossier(valDossier);
				if (dossier)
					dossier.emails.forEach(function(mail){
						if(mail.id == idMail)
							mailRecupere = mail;
					});
				return mailRecupere;
			},
			envoiMail: function(mail){
				var eltsEnvoyes = this.getDossier("ENVOYES");
				var dernierId = 0;
				dossiers.forEach(function(dossier){
					dossier.emails.forEach(function(mail){
						if(mail.id > dernierId)
							dernierId = mail.id;
					});
				});

				mail.id = dernierId + 1;
				eltsEnvoyes.emails.push(mail);
			}
		}
	
	});
	
	2) integration du module et du service dans index + app
		//app.js
		-angular.module("WebMail",["ngSanitize","ui.tinymce"])
		+angular.module("WebMail",["ngSanitize","ui.tinymce","MailServiceMock"])

		-.controller("WebMailCtrl",function($scope,$location,$filter){
		+.controller("WebMailCtrl",function($scope,$location,$filter,MailService){
		//index.html	
+        <script type="text/javascript" src="MailServiceMock.js"></script>

			
	3) Exploitation du service:
		MailService.envoiMail($scope.nouveauEmail);


3. Ecriture de directives:
	Formes de directives:
		<div ma-directive="...">...</div>
		<ma-directive>...</ma-directive>
		<div class="ma-directive">...</div>
		<!-- directive:ma-directive ... -->
			
		scope : true | false |	
		scope:{
			email= "=" // =attribut || @String || &callback : ici on peut mettre = ou @
		}
	
	1) Isoler le filter dans un module à part :
	//mesFiltres.js:
		angular.module("MesFiltres",[])
		.filter("surbrillanceRecherche",function(){
			return function(input,recherche){
				if(recherche)
					return input.replace( new RegExp("("+recherche+")","gi") ,"<span class='surbrillanceRecherche'>$1</span>");

				return input;
			}
		});
	//app.js: call filter module + service:
		angular.module("WebMail",["ngSanitize","ui.tinymce","MailServiceMock","MesFiltres","MesDirectives"])
		.controller("WebMailCtrl",function($scope,$location,$filter,MailService){
		
	2) Creation d un nouvelle directive:
	//mesDirectitives.js:
		angular.module("MesDirectives",[])
		.directive("contenuMail",function(){
			return {
				restrict: "E",
				template:
					'<div class="jumbotron py-2 text-center mt-3">  \
						<h3>{{email.subject}}</h3> \
						<ul class="list-inline col-12"> \
							<li class="list-inline-item col-4 float-left text-left" > \
								<label>De :</label> <br> <span>{{email.from}}</span> \
							</li> \
							<li class="list-inline-item col-3 text-left" > \
								<label>&Agrave; :</label> <br> <span>{{email.to}}</span> \
							</li> \
							<li class="list-inline-item col-4 float-right text-left"> \
								<label>Date :</label> <br> <span>{{email.date | date:"dd/MM/yyyy HH:mm"}}</span> \
							</li> \
						</ul> \
						<p class="mt-2 p-2 mail" ng-bind-html="email.content"></p>  \
					</div> ',
				scope: {
					email: "="
				}

			}
		});
	//app.js : importer le module
		angular.module("WebMail",["ngSanitize","ui.tinymce","MailServiceMock","MesFiltres","MesDirectives"])
	//index.html:
		<contenu-mail email="emailSelectionne" ng-show="emailSelectionne != null">
		</contenu-mail>
        <script type="text/javascript" src="mesDirectives.js"></script>
		
	#part2:
	Implementation d une nouvelle directive: nouveauEmail:
	l objet nouveauMail est manipulé mtn dans la nouvelle directive donc le ng-show dans l index n aura plus l acces a cet objet => ng-show="afficherNouveauMail"
	
	creation de la directive "nouveauMail"
	
	deplacement de la methode razMail dans la directive nouveauMail
	
	//mesDirective.js: add new directive:
		.directive("nouveauMail",function(){
			return{
				restrict: "E",
				template:
					'<div>...</div>',
				scope: {
					envoiMail : "&",
				},

				controller: function($scope){
					$scope.razMail = function(){
						$scope.nouveauMail = {
							to: "",
							from: "Rudy",
							date: new Date(),
						};
						// if (tinyMCE.activeEditor) {
						//     tinyMCE.activeEditor.setContent("");
						// }        
						$scope.formNouveauMail.$setPristine();
					}

					$scope.envoiMailInterne = function(){
						var regExpValidMail = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "gi");

						if (!$scope.nouveauMail.to || !$scope.nouveauMail.to.match(regExpValidMail)) {
							window.alert("Erreur\n\nMerci de vérifier l'adresse e-mail saisie.");
							return;
						}

						if (!$scope.nouveauMail.subject) {
							if (!window.confirm("Confirmation\n\nÊtes-vous certain de vouloir envoyer un mail sans objet ?")) {
								return;
							}
						}

						$scope.envoiMail({ nouveauMail : $scope.nouveauMail});
					}

					$scope.optionsTinyMce = {
						language: "fr_FR",
						statusbar: false,
						menubar: false
					}; 

					$scope.$on("initFormNouveauMail", function(){
						$scope.razMail();
					});
				}

			};
		});	
	//app.js: 
		communiquer avec le controlleur de la directive:
			$scope.$broadcast("initFormNouveauMail");
		
	//nouveau Mail minimisé : les tests sont passé à la directive:
		$scope.envoiEmail = function(nouveauEmail){
			MailService.envoiMail(nouveauEmail);
			$location.path("/ENVOYES");
		 }
	
											   
4. Epurer le code de naviguation:
	Travailler avec vueCourante pour l affichage des differentes vues.		

V-Serveur Web & API RESTful Node.js:
1. Introduction:			
2. Presentation de NodeJs
3. Premiers pas avec NodeJs:
	NodeJs = Serveur HTTP, Serveru FTP, ...
	req.url
	req.method
	req.headers
	res.writeHead(200,{"Content-type",: typeMime});  // typeMime: text/html, 
	app.use(function(req,res,next){
	if (capable de resoudre )
		trait
	else
		next(); // hey next middleware take this req and resolve it 
	});
	favicon middleware		
4. Servir des ressources web statique
	
5. Simplifier le serveur avec Connect
	
6. Creation d un module RESTful avec le framework Express:
	app.use(bodyParser.json()); // => req : Content-Type : application/json
	app.use(bodyParser(urlencoded)); // cle : valeur
			
	on peut créer un sous module API:
			const app = express();
			const api = express();

			api.use(bodyParser.json());
			api.post("/envoiMail",function(req,res){
				res.send("aaaa");
			});

			app.use("/api",api);
7. Ecriture d un module Node-Generation des mails
			Tuto5

VI- Requetes HTTP Asynchrones et promesses:
1. Introduction:
	Communiquer Angular ave Node : $http,$ressource, api cue.

2. Requete Asynchrones et promesse:
	Deux services permettant de faire des requetes asynchrones:
		$http: Service le plus général : URL + method + params => req HTTP
			repose sur le service $httpBackend et $q
		$ressource: Service Mappeur RESTful (spécifique) :
			repose sur le service $http et $q
			
		var promesse = $q.all( [promesse1,promesse2,...] ); // resolue si tout les promesseX sont résolus ( si une promesse erreur ou rejeté, notre promesse sera erreur ou rejeté )
	
	Synchrone Vs Asynchrone:
		#Synchrone:				
			try{
				action1();
				action2();
				console.log("OK");
			}catch(erreur){
				console.log("KO");
			}
		#Asynchrone:
			var action1 = $q.defer();
			var action2 = $q.defer();
			var promesse = $q.all([
				action1.promise,
				action2.promise,
			]);
			promesse.then(function(resultat){
				console.log("OK");
			},function(erreur){
				console.log("KO");
			});
			
3. Service $http:
	Toute requete Asynchrone renvoie une promesse.
	put : MAJ complete
	patch MAJ partiel
	status response : 
		famille 200 => OK
		famille 300 => la ressource est dispo sur un autre emplacement
		famille 400 => erreur , 404 : ressource n'a pas été trouvé
		famille 500 => erreur serveur, 500 erreur interne au serveur
	Forme Standard:
		$http({ 	method: 'GET',
					url: 'www.exple.com/api/data',
					params: nomParam:valParam,
					data,headers,timeout, etc //doc Angular
			}).then(...);
	Forme Simplifié:
		$http.get(url,[config]);
		$http.post(url,data,[config]);
		
		$http.get(url,[config])
		.then(res=>{
			console.log(res.data);
		},function(err){
			console.log(err.status+err.statusText);
		});
	
	//Remplacer dans app, le module de services statique MailServiceMock par le nouveau module mailServiceHttp
	angular.module("WebMail",["ngSanitize","ui.tinymce","mailServiceHttp","MesFiltres","MesDirectives"])
	#Consommer les web services de l'API avec Angular:
	//creation fichier : js/mailServiceHttp.js:
		angular.module("mailServiceHttp",[])
	
		.factory("MailService",function($http){

			var URL_API = "http://localhost:5000/api/";

			return{
				getDossiers: function(){
					dossiers = [];
					var promesse = $http.get(URL_API+"dossiers");
					promesse.then(function(response){
						//console.log(response.data);
						angular.extend(dossiers,response.data);
					},function(erreur){
						console.log("getDossiers erreur famille" + erreur.status+" : "+erreur.data);
					});
					//console.log(dossiers);
					return dossiers;
				},
				getDossier: function(valDossier){
					dossierTrouve={};
					
					$http.get(URL_API+"dossiers/"+valDossier)
					.then(res=>{
						angular.extend(dossierTrouve,res.data);
					})
					.catch(erreur=>{
						console.log("getDossier erreur famille" + erreur.status+" : "+erreur.data);
					});
					//console.log(dossierTrouve);
					return dossierTrouve;
				},
				getMail: function(valDossier,idMail){
					var mailRecupere = {};
					
					$http.get(URL_API+"dossiers/"+valDossier+"/"+idMail)
					.then(res=>{
						angular.extend(mailRecupere,res.data);
					})
					.catch(erreur=>{
						console.log("getMail erreur famille" + erreur.status+" : "+erreur.data);
					});
					return mailRecupere;
				},
				envoiMail: function(mail){
					$http.post(URL_API+"envoi",mail)
					.then(res=>{

					})
					.catch(erreur=>{
						alert("probléme de l'envoi du mail");
						console.log("envoiMail erreur famille" + erreur.status+" : "+erreur.data);
					});
				}
			};
		});	
			
4. Service $ressource:
	*c'est un module ext =>
		1)Ajouter source: 
			<script type="text/javascript" src="lib/anuglar1.2.16/angular-resource.min.js"></script>
		2)Ajouter depandance module au depandance du module:
			angular.module("mailServiceHttp",["ngResource"])
		3)mentionner le nom du service à utliser dans factory
			angular.module("mailServiceHttp",["ngResource"])

			.factory("MailService",function($resource){
			});	
	* pour les services inclus dans le module par défaults, il suffit la 3) mentionner le nom du service à utiliser telque $scope,$location,$path,etc
	
	// mailServiceRest.js:
	angular.module("mailServiceRest",["ngResource"])

	.factory("MailService",function($resource){

		var URL_API = "http://localhost:5000/api/";

		var resourceRecupMail = $resource(URL_API + "dossiers/:idDossier/:idMail");
		var resourceEnvoiMail = $resource(URL_API + "envoi");
	 
		return{
			getDossiers: function(){
				return resourceRecupMail.query();
			},
			getDossier: function(valDossier){
				return resourceRecupMail.get({idDossier:valDossier});
			},
			getMail: function(valDossier,idMail){
				return resourceRecupMail.get({idDossier:valDossier,idMail:idMail});
			},
			envoiMail: function(mail){
				resourceEnvoiMail.save(mail,function(response){
					console.log("mail envoyé");
				},function(error){
					console.log("envoiMail erreur famille" + erreur.status+" : "+erreur.data);
				});
			}
		};
	});

5. Tuning de $http - Message de chargement:
	#Ajouter un loader:
	<div class="preloader" ng-show="chargementEnCours">
		<div class="msgPreloader">
			<h3>Chargement ...</h3>
			<div class="loader"></div>
		</div>
	</div> 	

	#Ajouter dans le module principale une configuration pour agir lors des requetes et lors des reponses:
	//rootScope le scope le plus globale du module,
	//scope => juste pour la div du controlleur
		angular.module("WebMail",["ngSanitize","ui.tinymce","mailServiceRest","MesFiltres","MesDirectives"])
		.config(function($httpProvider){
			$httpProvider.interceptors.push(function($q,$rootScope){
				
				var nbReqs = 0;
				return {
					request : function(config){
						nbReqs++;
						$rootScope.chargementEnCours = true;
						return config;
					},
					// erreur dans l'emission de la requete : pas utile dans notre cas
					// requestErrorfunction(motifRejet){
					//     return $q.reject(motifRejet);
					// },
					response(response){
						if (--nbReqs == 0) {
							$rootScope.chargementEnCours = false;
						}
						return response;
					},
					responseError(motifRejet){
						if (--nbReqs == 0) {
							$rootScope.chargementEnCours = false;
						}
						return $q.reject(motifRejet);
					}
				};
			});
		})

		.controller("WebMailCtrl",function($scope,$rootScope,$location,$filter,MailService){
	

VII- Communication avec un serveur de messagerie en NodeJs (via IMAP et SMTP):
1. Introduction:
IMAP : Récupération de mail
SMTP : Envoi de mail
2. Communication avec un serveur IMAP:
	Promise:
	.then(res=>{
		return res;
	})
	.catch()
	.then(resultat=>{
		})
	.catch();
3. Récupération et affichage des mails:
	res.status(500).send("KO");
	Style du mail HTML reçu a polué la page => le mettre dans un iframe
4. Envoi de mails via un serveur SMTP:
	
5. Refactoring des middlewares
6. Réutiliser la connexion IMAP
7. Rafraichissement en temps réel avec socket.io


Chapitre VII : code n'a pas été écrit ( vu seulement )
