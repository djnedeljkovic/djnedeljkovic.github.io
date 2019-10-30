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
 
var settingsView = BevarGenericView.extend({
	populate: function() {
		var username = store.get("username");
		if (username) {
			$("#username").val(username);
		}	
		var password = store.get("password");
		if (password) {
			$("#password").val(password);
		}			
	},
	events: {
		"click #back-from-settings": "navigateBack",
		"click #save": "saveSettings"
	},	
	navigateBack: function() {
		BevarRouter.navigate("start");
	},
	saveSettings: function() {
		var username = $("#username").val();
		if (username) {
			store.set("username", username);
		}
		var password = $("#password").val();
		if (password) {
			store.set("password", password);
		}
		//clear previous user data
		store.remove('projects');
		DataHolder.projects = undefined;
		DataHolder.initData();
	}		
});
