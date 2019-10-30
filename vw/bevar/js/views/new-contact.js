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
 
var newContactView = BevarGenericView.extend({
	populate: function() {
		if (newContactView.typeId) {
			var contactType = DBUtil.getObjectWithId(DataHolder.contactTypes, newContactView.typeId);
			$("#type-name").html(contactType.name);
		}
		if (newContactView.roleId) {
			var contactRole = DBUtil.getObjectWithId(DataHolder.projectRoles, newContactView.roleId);
			$("#role-name").html(contactRole.name);
		}	
		if (newContactView.firstname) {
			$("#firstname").val(newContactView.firstname);
			newContactView.firstname = undefined;
		}
		if (newContactView.lastname) {
			$("#lastname").val(newContactView.lastname);
			newContactView.lastname = undefined;
		}
		if (newContactView.email) {
			$("#email").val(newContactView.email);
			newContactView.email = undefined;
		}
		if (newContactView.mobile) {
			$("#mobile").val(newContactView.mobile);			
			newContactView.mobile = undefined;
		}
	},
	events: {
		"click #back-from-newcontact": "navigateBack",
		"click #contact-type": "selectType",
		"click #contact-role": "selectRole",
		"click #create-contact": "createContact"
	},		
	navigateBack: function() {
		BevarRouter.navigate("select-contact");
	},
	selectType: function() {
		newContactView.firstname = $("#firstname").val();
		newContactView.lastname = $("#lastname").val();
		newContactView.email = $("#email").val();
		newContactView.mobile = $("#mobile").val();	
		BevarRouter.navigate("contact-type");
	},
	selectRole: function() {
		newContactView.firstname = $("#firstname").val();
		newContactView.lastname = $("#lastname").val();
		newContactView.email = $("#email").val();
		newContactView.mobile = $("#mobile").val();		
		BevarRouter.navigate("contact-role");
	},	
	createContact: function() {
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects, projectId);
		
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		var email = $("#email").val();
		var mobile = $("#mobile").val();
		var name = $("#firstname").val() + " " + $("#lastname").val();
		if (newContactView.typeId && firstname.length > 0 && lastname.length > 0 && email.length > 0 && mobile.length > 0) {
			//create contact
			$.serverCall({
				url : BevarConfig.serverUrl + '/contacts',
				type : 'POST',
				async: true,
				loaderText: 'Oppretter kontakt',
				data: {
					name: name,
					email: email,
					mobile: mobile,
					typeid: newContactView.typeId
				},
				success : function(data) {
					var contact = new Object();
					contact.id = data.id;
					contact.name = name;
					//add contact to project
					$.serverCall({
						url: BevarConfig.serverUrl + '/projects/' + projectId + '/contacts/',
						type:	'POST',
						async: true,
						loaderText: 'legger kontakt til i oppdrag',
						data: {
							contactid: contact.id,
							roleid: newContactView.roleId
						},
						success : function(data) {
							if (project.contacts === undefined) {
								project.contacts = [];
							}						
							project.contacts.push(contact);
							if (project.roles === undefined) {
								project.roles = [];
							}
							project.roles.push({"contactid": contact.id, "projectid": projectId, "roleid": newContactView.roleId});
							DBUtil.saveProjects();
							BevarRouter.navigate("project");
						},
						error : function(data) {
							alert('Feil med opprettelse av kontakt');
						}				
					});
				},
				error : function(data) {
					alert('Feil med opprettelse av kontakt');
				}			
			});
		} else {
			alert('Alle felter må fylles ut');
		}
	}
});