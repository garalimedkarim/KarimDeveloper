<?php 

Apprendre Laravel 5.0.X (Grafikart):
	https://www.youtube.com/watch?v=WWfIDrGaFIw&list=PLjwdMgw5TTLUCpXVEehCHs99N7IWByS3i
	
1.Pourquoi laravel:
	Route::get("/",'WelcomeController@index');
2.Installation:
	composer create-project laravel/laravel --prefer-dist tuto-laravel



Mohamed Ibrahim:

4.Routing:
#routes/web.php:
	Route::get("/",'WelcomeController@index');
	Route::get("/",function(){
		echo "Je suis Karim";
	});
	
5.Controller:
	php artisan make:controller TestController
#app/Http/Controllers:

6.Migrations:
	php artisan make:migration migration1 --create=contact
	php artisan migrate

7.Models
	php artisan make:model Contact //don't add attributes
	//Controller:
	public function newContact(){
		$newContact = new Contact();
		$newContact->name = "XD";
		$newContact->save();
	}
	
	public function listContacts(){
		$contacts = Contact::all();
		dd($contacts);
		
	}
	
8.View:
	return view ("contacts", [
			'contacts' => $contacts
		];
		
9.Architecture
10.Authentification:
	php artisan make:auth
	
11.Master page (layout):
	#ressources/views/layouts/master.blade.php
	header
		@yield('content')
	footer

	#ressource/views/home.blade.php
	@extends('layouts.master')
	
	@section('content')
	
	@endsection
	
	url("home")
	asset('assets/sss')
	dd($var);
	
12.new Module

13.create and store methods

	form :
		{{ csrf_field() }}
	
	public function store(Request $request){
		$cv = new Cv();
		$cv->titre = $request->input('titre');
		$cv->save();
	}

14. index:
	$cvs = Cv::all();
	//redirection
	return redirect('cvs');
	
15. edit and update:
	function edit($id){
		$cv = Cv::find($id);
		return view('cv.edit', [
			'cv' => $cv
		];
	}

16.Delete 

	{{ csrf_field() }}
	{{ method_field('DELETE') }}
	
	Cv::find($id)->delete();
	
17.Systeme de validation
	php artisan make:request cvRequest
	#app/Http/Request
		cvRequest.php
			function authorize(){
				return true;
			}
			
			function rules(){
				return [
					'name' => 'required',
					'presentation' => 'required'
				];
			}
		
		value="{{ old('titre') }}"

20.flash messages:
	session->flash('succes','le cv a été bien');
	
	@if(session->has('success'))
		{{session->get('success')}}
	@endif
	
21.Middleware Auth:
	//in the controller 
	__construct (){
		$this->middleware('auth');
	}
	#app/Http/Middleware
	//Define a middelware in #app/Http/Kernel.php

22.Relationships:
	php artisan make:migration add_column --table=cvs
	#database/migrations/2019_12_12_add_column:
		
	#app/Http/Controller:
	use Auth;
	//get user id
	$cv->user_id = Auth::user()->id();
	//close where
	$listCv = Cv::where('user_id', Auth::user()->id)->get();
	#app/User.php:
		public function cvs(){
			return $this->hasMany('App\Cv');
		}
	#app/Cv.php
		public function user(){
			return $this->belongsTo('App\User');
		}
	//replace
	Cv:all();
	Auth:user()->cvs

23.theme avec bootswatch
	@include('partials.menu');

	Bootswatch provide free bootstrap themes
	
24.storage method:
	#config/filesystem.php:
	#storage/app/public:
	#Http/Controller/XConroller.php:
		public function index(Request $req){
			if($req->hasFile('photo')
				$cv->photo = $req->photo->store('image');
		}
	php artisan storage:link
		<img src="{{asset('storage/'.$cv->photo)}}" alt="">

25.norme Restfull | route de type ressource:
	//norme à la place de 7 routes on mets:
	Route::ressource('cvs','CvController');
	
26.systeme d authorization ac la technique de Policy:
	php make:policy CvPolicy --model=Cv
	#app/Policies/CvPolicy.php
	
	#app/Providers/AuthServiceProvider.php:
		//attribute policy to its location
	#app/Http/Controller
		$this->authorize('update',$cv); //403 if not verified
		
	//customize error page
		#ressource/view/errors/403.blade.php
	
27.Policy avancé admin et user
	//add is_admin field
	Auth::user()->is_admin
	#app/Policies/CvPolicy:
		public function before($user,$ability){
			if ($user->is_admin and $ability != "delete"){
				return true;
			}
		}
	
28.Policy avec @Can
	@can('delete',$cv)
		
	@endcan
	
29.laravel et vusjs

