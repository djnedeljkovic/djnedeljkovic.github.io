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
 
var projectsView = BevarGenericView.extend({
	self: null,
	populate: function() {
		projectsView.self = this;
		if (!DataHolder.projects) {
			$.serverCall({
				url: BevarConfig.serverUrl + '/projects/',
				type:	'GET',		
				async: true,
				loaderText: 'henter oppdrag',				
				success: function(data) {					
					//if project retrieved has type == null set it to 4 (vedlikeholdsoppdrag)
					for (var key in data) {
						if (data[key].typeId === null || data[key].typeId === undefined) {
							data[key].typeId = 4;
						}
					}					
					DataHolder.projects = data;
					store.set("projects",data);
					projectsView.self.fillData();
					$("#project-list").listview('refresh');		
				},
				error: function(){
					alert('Problemer med tilkobling til server');
				}				
			});
		} else {
			projectsView.self.fillData();
		}				
	},
	fillData: function() {
		var projectStr = "";
		var data = DataHolder.projects;
		if (data instanceof Array) {
			for (var key in data) {
				projectStr += "<li data-theme='c'><a class='project' project-id='" + data[key].id + "'>" + data[key].name + "</a></li>";
			}
		}else if (data instanceof Object) {
			projectStr = "<li data-theme='c'><a class='project' project-id='" + data.id + "'>" +data.name + "</a></li>";
		}
		$("#project-list").append(projectStr);
	},
	events: {
		"click #back-from-projects": "navigateBack",
		"click .project": "navigateToProject",
		"click #newProject": "navigateNewProject"
		
	},	
	navigateBack: function() {
		BevarRouter.navigate("start");
	},
	navigateToProject: function(ev) {
		var id = $(ev.currentTarget).attr("project-id");
		projectsView.currentProjectId = id;
		BevarRouter.navigate("project");
	},
	navigateNewProject: function() {
		BevarRouter.navigate("new-project");
	}
});