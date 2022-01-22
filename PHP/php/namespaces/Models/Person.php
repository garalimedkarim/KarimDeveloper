<?php

namespace Models;

class Person{
	private $name;

	function __construct($name){
		$this->name = $name;
	}


	function prnt(){
		echo "my name is ".$this->name;
	}

}