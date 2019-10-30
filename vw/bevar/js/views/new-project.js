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
 

var newProjectView = BevarGenericView.extend({
	populate: function() {		
		if (projectTypeView.projectTypeId) {
			var projectType = DBUtil.getObjectWithId(DataHolder.projectTypes,projectTypeView.projectTypeId);
			$("#project-type span").html(projectType.name);
			$("#project-type").attr("projectTypeId",projectType.id);
			projectTypeView.projectTypeId = undefined;
		}
		if (projectTypeView.projectName) {
			$("#project-name").val(projectTypeView.projectName);
			projectTypeView.projectName = undefined;
		}
		if (projectTypeView.notes){
			$("#project-notes").val(projectTypeView.notes);		
			projectTypeView.notes = undefined;
		}
	},
	events: {
		"click #back-to-projects-from-newproject": "navigateBack",
		"click #project-type": "changeType",
		"click #save-project": "saveProject"
	},		
	navigateBack: function() {
		BevarRouter.navigate("projects");
	},
	changeType: function() {
		projectTypeView.projectName = $("#project-name").val();
		projectTypeView.notes = $("#project-notes").val();		
		projectTypeView.returnView = "new-project";
		BevarRouter.navigate("project-type");
	},
	saveProject: function() {
		var projectName = $("#project-name").val();
		var notes = $("#project-notes").val();
		var typeId = $("#project-type").attr("projectTypeId");
		if (projectName.length == 0) {
			alert("Vennligst oppgi oppdragsnavn");
			return;
		}
		if (!typeId || typeId.length == 0) {
			alert("Vennligst velg oppdragstype");
			return;
		}		
		$.serverCall({
			url: BevarConfig.serverUrl + '/projects/',			
			type : 'POST',
			loaderText: 'Oppretter prosjekt',
			data: {
				name: projectName,
				typeid: typeId,
				note: notes
			},
			success : function(data) {
				var project = new Object();
				project.id = data;
				project.type = typeId;
				project.state = "new";
				project.name = projectName;
				project.note = notes;
				DataHolder.projects.push(project);
				DBUtil.saveProjects();
				BevarRouter.navigate("projects");
			},
			error : function(data) {
				console.log("error");
			}			
		});		
	}
	
});