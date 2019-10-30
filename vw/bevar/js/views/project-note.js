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
 
var projectNoteView = BevarGenericView.extend({
	populate: function() {
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
		$("#project-note-edit").val(project.note);
	},
	events: {
		"click #save-note": "changeNote",
		"click #back-from-projectNote": "navigateBack"
	},
	navigateBack: function() {
		BevarRouter.navigate("project");
	},
	changeNote: function(ev) {
		var newNote = $("#project-note-edit").val();
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects, projectId);
		project.note = newNote;
		project.state = "changed";
		BevarRouter.navigate("project");
	}
});
