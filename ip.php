<?php 
	if ( ($_GET['website'] != '') && ($_GET['text'] != '') && ($_GET['newText'] != '') ){
		$url = $_GET['website'];
		$cText = $_GET['text'];
		$nText = $_GET['newText'];
	
		$page = file_get_contents($url);
		$page = str_replace($cText, $nText ,$page);
		
		$page = str_replace("./",$url."/",$page);
		$page = str_replace("\"/","\"".$url."/",$page);
		
		echo $page;	
		die();	
	}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">


<!-- 
################################ DO NOT REMOVE ################################

WEB TEMPLATE CREATED BY IRON SPIDER - http://www.ironspider.ca/
COPYRIGHT © Robert Darrell 2008 - All rights reserved.

THE DISTRIBUTION, SALE OR LEASE OF THIS WEB TEMPLATE
AND/OR THE ASSOCIATED BACKGROUND IMAGES IS STRICTLY PROHIBITED.

################################ DO NOT REMOVE ################################
-->


<html>

<head>
    <title>Djordje Nedeljkovic random</title>
    <meta name="description" content="Djordje Nedeljkovic contact page ">
    <meta name="keywords" content="djordje nedeljkovic contact, contact">
    <meta name="copyright" content="djordjenedeljkovic.info">
    <meta name="author" content="Djordje Nedeljkovic">
    <meta name="email" content="djordje@djordjenedeljkovic.info">
    <meta name="Charset" content="UTF-8">
    <meta name="Distribution" content="Global">
    <meta name="Rating" content="General">
    <meta name="Robots" content="INDEX,FOLLOW">

<META http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="stylesheet" type="text/css" href="main.css">

</head>

<body>

<div class="twitter" >
<script src="http://widgets.twimg.com/j/2/widget.js"></script>
<script src="./js/twitter.js"></script>
</div>

<div class="Wrapper">

<table class="Global" cellpadding="0" cellspacing="0" border="0">

<!-- Spacer -->
<tr><td height="30" colspan="2">&nbsp;</td></tr>

<tr><td height="100" colspan="2">

<!-- ============ Header Image ============== -->
<table class="Header" cellspacing="0" border="0"><tr>

<!-- ============ Logo ============== -->
<td width="100%" align="left"><div style="display: table; margin-left: 20px; margin-top: 20px; color: aliceblue; font-family: tahoma; font-size: 36px; font-style: italic;">&nbsp;</div></td>

</tr></table>

</td></tr>

<!-- ============ COLUMNS SECTION ============== -->
<tr>

<!-- ============ Menu Column ============== -->
<td class="MenuColTD" align="center">

<!-- ============ Site Menu ============== -->

<div class="Menu">
<a href="index.html">About Me</a>
<a href="cv.html">Curriculum Vitae</a>
<a href="pics.html">Photos</a>
<a href="links.html">Links</a>
<a href="letter_bomb.html">Game</a>
<a href="contact.php">Contact</a>
<a href="fakepage.php">Fake page</a>
<a href="random.php">Random page</a>
</div>

</td>


<!-- ============ Content Column ============== -->
<td class="Content Padded">

<!-- ============ Page Heading ============== -->
<h1 class="HeadingStyle">Provera IPa </h1>

<!-- ============ Begin Content ============== -->
<?php

$country = '';
$IP = $_SERVER['REMOTE_ADDR'];

if (!empty($IP)) {
$country = file_get_contents('http://api.hostip.info/country.php?ip='.$IP);
echo $country;
}
?>
<br />
<!-- ============ End Content ============== -->
</td>


</tr>

<!-- ============ Footer ============== -->
<tr><td colspan="2" class="Footer">

<div class="FooterWrap">

<div class="Copyright">Copyright &copy; Djordje Nedeljkovic

</div>

</td></tr></table>

</div><!-- End Wrapper -->
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-10988703-2");
pageTracker._trackPageview();
} catch(err) {}</script>
</body>

</html>
