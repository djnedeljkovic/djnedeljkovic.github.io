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
 
var selectContactView = BevarGenericView.extend({
	populate: function() {	
		selectContactView.self = this;
		if (DataHolder.contacts) {
			selectContactView.self.fillData();
		} else {
			//retrieve contacts
			$.serverCall({
				url: BevarConfig.serverUrl + '/contacts',
				type:	'GET',
				async: true,
				loaderText: 'henter kontakter',
				success: function(data) {
					if (data) {				
						DataHolder.contacts = data;
						selectContactView.self.fillData();
						$("#contact-list").listview('refresh');	
					}
				}	
			});	
		}
	},
	fillData: function() {
		var data = DataHolder.contacts;
		var contactsStr = "";
		var contactVar;
		if (data instanceof Array) {
			for (var key in data) {
				contactVar = data[key];
				contactsStr += "<li data-theme='c'><a class='contact' contact-id='" + contactVar.id + "'>" + contactVar.name + "</a></li>";
			}					
		}else if (data instanceof Object) {
			contactsStr = "<li data-theme='c'><a class='contact' contact-id='" + data.id + "'>" + data.name + "</a></li>";
		}
		
		$("#contact-list").append(contactsStr);		
	},	
	events: {
		"click #back-from-select-contact": "navigateBack",
		"click #create-contact": "createContact",
		"click .contact": "navigateContact",
	},	
	navigateBack: function() {
		BevarRouter.navigate("project");
	},
	createContact: function() {
		BevarRouter.navigate("new-contact");
	},
	navigateContact: function(ev) {
		var contactId = $(ev.currentTarget).attr("contact-id");
		selectRoleView.contactId = contactId;
		BevarRouter.navigate("select-role");
	}
});
