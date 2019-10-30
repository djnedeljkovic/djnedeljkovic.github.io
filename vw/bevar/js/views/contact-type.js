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
 
var contactTypeView = BevarGenericView.extend({
	populate: function() {
		var contactTypes = DataHolder.contactTypes;
		var contactTypeStr = "";
		var contactType;
		for(key in contactTypes) {
			contactType = contactTypes[key];
			contactTypeStr += "<li class='contact-type' contact-type-id='" + contactType.id + "' data-theme='c'><a>" + contactType.name +"</a></li>"
		}
		$("#contact-type-list").append(contactTypeStr);	
	},
	events: {
		"click #back-from-contacttype": "navigateBack",
		"click .contact-type": "selectType"
	},		
	navigateBack: function() {
		BevarRouter.navigate("new-contact");
	},
	selectType: function(ev) {
		var newContactTypeId = $(ev.currentTarget).attr("contact-type-id");
		newContactView.typeId = newContactTypeId;
		BevarRouter.navigate("new-contact");
	}
});
