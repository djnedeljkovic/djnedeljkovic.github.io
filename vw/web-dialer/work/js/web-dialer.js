$(document).ready(function(){
 
    $('.dialer-holder').hide();
 
    $('.show-hide').click(function(){
		$('.dialer-holder').slideToggle();
    });
	
	$('.call-service').click(function(){
		$('#loading-popup').show();
    });
	
	$('#one').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#one').addClass('clicked');
		type("1");
		setTimeout(function() {
			$('#one').removeClass('clicked');
		}, 300);		
	});
	$('#two').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#two').addClass('clicked');
		type("2");
		setTimeout(function() {
			$('#two').removeClass('clicked');
		}, 300);			
	});
	$('#three').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#three').addClass('clicked');
		type("3");
		setTimeout(function() {
			$('#three').removeClass('clicked');
		}, 300);			
	});
	$('#four').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#four').addClass('clicked');
		type("4");
		setTimeout(function() {
			$('#four').removeClass('clicked');
		}, 300);		
	});	
	$('#five').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#five').addClass('clicked');
		type("5");
		setTimeout(function() {
			$('#five').removeClass('clicked');
		}, 300);		
	});	
	$('#six').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#six').addClass('clicked');
		type("6");
		setTimeout(function() {
			$('#six').removeClass('clicked');
		}, 300);		
	});	
	$('#seven').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#seven').addClass('clicked');
		type("7");
		setTimeout(function() {
			$('#seven').removeClass('clicked');
		}, 300);		
	});	
	$('#eight').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#eight').addClass('clicked');
		type("8");
		setTimeout(function() {
			$('#eight').removeClass('clicked');
		}, 300);		
	});	
	$('#nine').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#nine').addClass('clicked');
		type("9");
		setTimeout(function() {
			$('#nine').removeClass('clicked');
		}, 300);		
	});	
	$('#asterisk').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#asterisk').addClass('clicked');
		type("*");
		setTimeout(function() {
			$('#asterisk').removeClass('clicked');
		}, 300);		
	});	
	$('#zero').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#zero').addClass('clicked');
		type("0");
		setTimeout(function() {
			$('#zero').removeClass('clicked');
		}, 300);		
	});	
	$('#sharp').click(function(){
		//remove from all 
		$('.dialer-number').removeClass('clicked');
		$('#sharp').addClass('clicked');
		type("#");
		setTimeout(function() {
			$('#sharp').removeClass('clicked');
		}, 300);		
	});	
	function type(number) {
		$(".dialer-holder #header").append(number);
	}
});