<?php

$email = $_POST["email"];
$ime = $_POST["ime"];
$text = $_POST["text"];

$to = "djolens@gmail.com";
$subject = "Kontakt " . $ime . " " . date("d/m/Y");
$body .= "Ime: " . $ime . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Tekst poruke: " . $text . "\n";


$headers = 'From: kontakt@djordjenedeljkovic.info' . "\r\n" . 'Reply-To: webmaster@djordjenedeljkovic.info' . "\r\n" . 'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $body, $headers)) {
	$URL="./contact.php?ok=yes"; 
	header ("Location: $URL");
 } else {
	$URL="./contact.php?ok=no"; 
	header ("Location: $URL");
 }

?>
