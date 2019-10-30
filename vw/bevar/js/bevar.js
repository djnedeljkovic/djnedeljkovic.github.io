$(function() {
	BevarRouter = new BevarRouter;
	Backbone.history.start();
	
	DataHolder.setDataFromStore();
	
	/*
	window.addEventListener('load', function() {
	    FastClick.attach(document.body);
	}, false);	
	*/
	/*
	$(document).on('pageinit', '.ui-page', function (event, data)
		{
		    FastClick.attach(document.body);
		});
	*/	
	
});
