 // <copyright Catenda AS>
 // Copyright (c) 2013 All Right Reserved, http:catenda.no/

 // This source is owned by Catenda AS
 // Do not distribute, or use the code or products made with this code, 
 // without the written permission from Catenda.  All other rights reserved.

 // THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY 
 // KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 // IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
 // PARTICULAR PURPOSE.

 // </copyright>
 // <author>Djordje Nedeljkovic</author>
 
var startView = BevarGenericView.extend({
	populate: function() {
		var username = store.get("username");
		if (username) {
			$("#username").val(username);
		}	
		var password = store.get("password");
		if (password) {
			$("#password").val(password);
		}
		var revision = $("#revision").data("revision").split(" ")[1];
		//if (revision) {
		//	$("#revision").text("r"+revision);
		//}
		
	},
	events: {
		"click #login": "login",
		"click #logout": "logout"
	},	
	login: function() {
		var username = $("#username").val();
		var password = $("#password").val();

		//clear previous user data if different user
		if (username !== store.get("username")) {
			store.remove('projects');
			DataHolder.projects = undefined;
		}
	
		if (username) {
			store.set("username", username);
		}
		if (password) {
			store.set("password", password);
		}
		
		//test username and password
		$.serverCall({
			url: BevarConfig.serverUrl + '/users/login',
			type:	'GET',
			async: true,
			loaderText: 'logger inn',
			success: function() {
				DataHolder.initData();
				//navigate to projects
				BevarRouter.navigate("projects");
			}
		});	
		
	},
	logout: function() {
		store.remove('projects');
		DataHolder.projects = undefined;
		store.remove('username');
		store.remove('password');
		$("#username").val("");
		$("#password").val("");
		//TODO close app (can not be done on iPhone)
		if (navigator) {			
			navigator.app.exitApp();
		}
	}	
});
