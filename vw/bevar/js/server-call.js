(function($) {
	$.extend($, {
		serverCall: function(options) {
			options.data = options.data || {};			

			options.beforeSend = function() {
				Util.showLoader(options.loaderText || '');
			};
			var complete = options.complete;
			options.complete = function(data) {
				try {
					if (typeof(complete) == "function") {
						complete(data);
					}
				} catch (e) {
				}				
				Util.hideLoader();
			}
					
			options.dataType = 'json';
			if (options.async) {
				options.async = true;
			} else {
				options.async = false;
			}
			
			options.headers =  {
				"Authorization": Util.makeBaseAuth()
			};
			
			var success = options.success;
			options.success = function(data) {
				try {
					if (typeof(success) == "function") {
						success(data);
					}
				} catch (e) {
					console.log('exception in handler for ' + options.url);
					console.log('exception: ' + e);
				}
			}

			// error handler;
			// note that this kind of errors are happening due to network failure or server side errors
			// any error handler defined in view is wrapped in this one, so we can clean up stuff 
			var errorCallBack = options.error;
			options.error = function(xhr, status, error) {	
				if (error == 'Not Acceptable' && xhr.responseText === 'Invalid credentials') {
					alert('Feil brukernavn eller passord');
					BevarRouter.navigate("start");	
				} else if (error == 'Forbidden') {
					if (options.url.indexOf("login") >= 0) {
						alert('Denne brukeren har ikke tilgang til mobilapplikasjonen');
						BevarRouter.navigate("start");
					} else {
						//
					}
				} else if (typeof errorCallBack === 'function') {
					errorCallBack();
				} else {
					alert('Problem med tilkobling til server.'); //Server side error have happened or network failure.
				}
				console.log(error);
				//TODO maybe we could report error to another web service which will log that error
			};

			options.complete = options.complete || function(context, xhr, status) {
				if (xhr === 'timeout') {
					console.log('timeout happened!!!');
				}
			};

			try {
				$.ajax(options);
			} catch (e) {
				console.log('$.ajax exception');
				console.log(e);				
			}
		}

	});
})($);
