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
 
var selectRoleView = BevarGenericView.extend({
	populate: function() {		
		if (selectRoleView.contactId) {
			var contact = DBUtil.getObjectWithId(DataHolder.contacts,selectRoleView.contactId);
			$("#contact-name").html(contact.name);
			var project = DBUtil.getObjectWithId(DataHolder.projects, projectsView.currentProjectId);
			var data = DBUtil.getRolesByProjectType(DataHolder.projectRoles, project.typeId);
			var projectRolesStr = "";
			var projectRoleVar;
			if (data instanceof Array) {
				for (var key in data) {
					projectRoleVar = data[key];
					projectRolesStr += "<li data-theme='c'><a class='project-role' project-role-id='" + projectRoleVar.id + "'>" + projectRoleVar.name + "</a></li>";
				}					
			}else if (data instanceof Object) {
				projectRolesStr = "<li data-theme='c'><a class='project-role' project-role-id='" + data.id + "'>" + data.name + "</a></li>";
			}
			
			$("#project-role-list").append(projectRolesStr);			
		} else {
			alert('No contact selected');
			BevarRouter.navigate("select-contact");
		}
	},
	events: {
		"click #back-from-select-role": "navigateBack",
		"click .project-role": "selectRole",
	},	
	navigateBack: function() {
		BevarRouter.navigate("select-contact");
	},
	selectRole: function(ev) {
		var roleId = $(ev.currentTarget).attr("project-role-id");
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects, projectId);	
		var contact = DBUtil.getObjectWithId(DataHolder.contacts,selectRoleView.contactId);
		//add contact to project
		$.serverCall({
			url: BevarConfig.serverUrl + '/projects/' + projectId + '/contacts/',
			type:	'POST',
			async: true,
			loaderText: 'Legger kontakt til i oppdraget',
			data: {
				contactid: contact.id,
				roleid: roleId
			},
			success : function(data) {
				if (project.contacts === undefined) {
					project.contacts = [];
				}						
				project.contacts.push(contact);
				if (project.roles === undefined) {
					project.roles = [];
				}						
				project.roles.push({"contactid": contact.id, "projectid": projectId, "roleid": roleId});
				DBUtil.saveProjects();
				BevarRouter.navigate("project");
			},
			error : function(data) {
				alert('Feil med opprettelse av kontakt');
			}				
		});		
	}
});
