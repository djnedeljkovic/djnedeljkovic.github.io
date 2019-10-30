var Util = {
	getCurrentDate: function() {
		var d = new Date();
		var curr_year = d.getFullYear();
		var curr_month = d.getMonth() + 1;
		var curr_date = d.getDate();
		return curr_year + "." + curr_month + "." + curr_date;
	},
	makeBaseAuth: function() {
	  var tok = store.get('username') + ':' + store.get('password');
	  var hash = btoa(tok);
	  return "Basic " + hash;
	},
	showLoader: function(text) {
		$.mobile.loading( 'show', {
			text: text,
			textVisible: true,
			theme: 'a',			
		});		
	},
	hideLoader: function() {
		$.mobile.loading( 'hide');
	},
	refreshPage: function(route) {
	    var newFragment = Backbone.history.getFragment(route);
	    if (Backbone.history.fragment == newFragment) {
	        // need to null out Backbone.history.fragement because 
	        // navigate method will ignore when it is the same as newFragment
	        Backbone.history.fragment = null;
	        Backbone.history.navigate(newFragment, true);
	    }		
	}
}