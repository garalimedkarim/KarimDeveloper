#Typing Vs Casting
Typing:
obj: Ingrediant[];
#Casting an obj to another Type:
	var myObject: TypeA;
	var otherObject: any;
	// values are assigned to them, and...
	myObject = <TypeA> otherObject;     // using <>
	myObject = otherObject as TypeA;    // using as keyword