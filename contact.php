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
    <title>Djordje Nedeljkovic contact</title>
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
<script language="JavaScript1.2">
/*
Advanced Email Check
By Website Abstraction (http://www.wsabstract.com) and
Java-Scripts.net (http://www.java-scripts.net)
Over 200+ free scripts here!
*/

var testresults

function checkemail(){
 var str=document.form1.email.value
 var filter=/^.+@.+\..{2,3}$/

 if (filter.test(str))
    testresults=true
 else {
    alert("Please input a valid email address!")
    testresults=false
}
 return (testresults)
}
</script>


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
<?php include('sitemenu.html'); ?>

</td>


<!-- ============ Content Column ============== -->
<td class="Content Padded">

<!-- ============ Page Heading ============== -->
<h1 class="HeadingStyle">Contact</h1>

<!-- ============ Begin Content ============== -->
		<div>
			<?php 
				if ($_GET)
				if ($_GET["ok"] ==yes)
					echo '<br/><p style="font-size: 14px; font-weight: bold; color: green;">Your message is successfully sent</p><br/>';
				else
					echo '<br/><p style="font-size: 14px; font-weight: bold; color: red;">Error, your message is not sent. Please, try later.</p><br/>';
			?>
			

              <form id="form1" name="form1" method="post" action="./sendcontact.php" onSubmit="return checkemail()">
              <table width="645" height="178" border="0" cellspacing="10">
                <tr>
                  <td height="32">Your email</td>
                  <td>
                    <input name="email" type="text" id="email" tabindex="1" size="50" maxlength="50" />
                 </td>
                </tr>
                <tr>
                  <td height="32">Your name</td>
                  <td><input name="ime" type="text" id="ime" tabindex="2" size="50" maxlength="50" /></td>
                </tr>
                <tr>
                  <td height="32" valign="top">Note</td>
                  <td><textarea name="text" cols="50" rows="10" id="text" tabindex="3"></textarea></td>
                </tr>
                <tr>
                  <td height="32" valign="top">&nbsp;</td>
                  <td><input type="submit" name="posalji" id="posalji" value="Send" /></td>
                </tr>
              </table>
              </form> 
              </div>
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
