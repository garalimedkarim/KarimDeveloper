<?php

//start at 6h43
chargeFile();


function chargeFile(){
	//get the file content from URL:
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://www.url_de_l_api.fr/get_xml');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$result = curl_exec($ch);

	//convert the result from XML to PHP Object
	$activites = new SimpleXMLElement($xmlstr);

	//test:
	// echo $activites->activite[0]->Nom;

	//DB connection:
	$dbh = null;
	try {
	    $dbh = new PDO('mysql:host=localhost;dbname=testalaxione', "test", "test66!");
	} catch (PDOException $e) {
	    print "Error!: " . $e->getMessage() . "<br/>";
	    die();
	}

	//Save data in the Database:
	$statement = $dbh->prepare('
		INSERT INTO ACTIVITIES ( nom, date_creation, date_modification)
		VALUES (:nom, :date_creation, :date_modification)
	');

	try {
		foreach ($activites->activite as $activite) {
			$statement->execute([
			    'nom' => $activite->Nom,
			    'date_creation' => date('Y-m-d H:i:s'),
			    'date_modification' => date('Y-m-d H:i:s'),
			]);
			// use exec() because no results are returned
			$conn->exec($sql);
			$statement->closeCursor();
		}
	}catch(PDOException $e) {
		echo $sql . "<br>" . $e->getMessage();
	}

	//Database deconnection:
	$dbh = null;
}

?>