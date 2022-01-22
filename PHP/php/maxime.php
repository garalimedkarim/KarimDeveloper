<?php 

echo "Bonjour Maxime <br> <br>";

$cookie = "SMFCookie89=a%3A4%3A%7Bi%3A0%3Bs%3A5%3A%2288714%22%3Bi%3A1%3Bs%3A40%3A%22b0f025c765239dd8079ce32efdc578198bb494e7%22%3Bi%3A2%3Bi%3A1573392143%3Bi%3A3%3Bi%3A0%3B%7D";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://www.newbiecontest.org/epreuves/prog/prog6.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: ".$cookie));
$result = curl_exec($ch);

if (!strpos($result,"x²")){
	echo "ce n'est pas un équation de second degré";
}else{
	echo "Equation de second degré confirmé. <br><br>";
}


$eliminatedText = explode(":", $result);
echo $eliminatedText[1]."<br><br>";
$eliminatedEqual = explode("=", $eliminatedText[1])[0];
$equation = str_replace("<br />","",$eliminatedEqual);
// $equation = "3x² + 3x - 7"; echo $equation."<br>";
$equationMembers = explode(" ", $equation);
// print_r($equationMembers);

//get Equation Parameters
$a = 0;
$b = 0;
$c = 0;
foreach ($equationMembers as $key => $value) {
	if(strpos($value,"x²") !== false){
		$a = getParamValue($equationMembers,$value,$key,"x²");
		// echo "AAAAA".$a;
	}elseif(strpos($value,"x") !== false){
		$b = getParamValue($equationMembers,$value,$key,"x");
		// echo "BBBBB".$b;
	}elseif(is_numeric($value)){
		$c = getParamValue($equationMembers,$value,$key,"");
		// echo "CCCCC".$c;
	}
}

//Calculate Delta:
echo "<br> a / b / c <br>".$a." / ".$b." / ".$c . "<br>";
$delta = pow($b,2)-4*$a*$c;
echo "delta =" .$delta."<br>";

$s1 = $s2 = null;
if ($delta > 0){
	$s1 = (-1*$b - sqrt($delta)) / (2*$a);
	$s2 = (-1*$b + sqrt($delta)) / (2*$a);
}elseif ($delta == 0){
	$s1 = $s2 = -1*$b / 2*$a;
}

echo "solutions: ".$s1." / ".$s2."<br>";
$return = null;
if($s1)
	$return = ($s1 > $s2 ? $s1 : $s2);
else
	$return ="";

echo "RESULT=".floor_prec($return,2)."<br><br><br>";


$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://www.newbiecontest.org/epreuves/prog/verifpr6.php?solution='.floor_prec($return,2));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Cookie: ".$cookie));
$res = curl_exec($ch);
var_dump($res);


function getParamValue($equationMembers,$value,$key,$coef){

	$value = str_replace($coef,"",$value);
	if ($value == ""){
		$value = "1";
	}

	if($key == 0){
		return intval($value);
	}else{
		if ($equationMembers[$key - 1] == "-"){
			return intval($value) * -1;
		}else{
			return intval($value);
		}
	}
}

function floor_prec($x, $prec) {
   return floor($x*pow(10,$prec))/pow(10,$prec);
}

?>


