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
 
var contactRoleView = BevarGenericView.extend({
	populate: function() {
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects, projectId);
		var projectTypeId = project.typeId;
		if (project.typeId) {
			var projectRoles = DataHolder.projectRoles;
			var projectRoleStr = "";
			var projectRole;
			for(key in projectRoles) {
				projectRole = projectRoles[key];
				if (projectTypeId + '' === projectRole.typeId + '') {
					projectRoleStr += "<li class='contact-project-role' project-role-id='" + projectRole.id + "' data-theme='c'><a>" + projectRole.name +"</a></li>";
				}
			}
			$("#contact-role-list").append(projectRoleStr);			
		} else {
			alert('Det mangler kontakttype. Kan ikke legge til kontakt');
			BevarRouter.navigate("project");
		}

	},
	events: {
		"click #back-from-contactrole": "navigateBack",
		"click .contact-project-role": "selectRole"
	},		
	navigateBack: function() {
		BevarRouter.navigate("new-contact");
	},
	selectRole: function(ev) {
		var newContactRoleId = $(ev.currentTarget).attr("project-role-id");
		newContactView.roleId = newContactRoleId;
		BevarRouter.navigate("new-contact");
	}
});