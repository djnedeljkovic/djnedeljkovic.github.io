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
 
var phaseView = BevarGenericView.extend({
	populate: function() {
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
		var currentProjectPhaseId = DBUtil.getObjectWithId(DataHolder.projects, projectId).phaseId;
		var projectType = DBUtil.getObjectWithId(DataHolder.projectTypes,project.typeId);
		var phases = projectType.phases;
		var phasesStr = "";
		var theme, phase;
		for(key in phases) {
			phase = phases[key];
			if (phase.id + "" === currentProjectPhaseId + "") {
				theme = "a";
			}else {
				theme = "c";
			}
			phasesStr += "<li class='phase' phase-id='" + phase.id + "' data-theme='" + theme + "'><a>" + phase.name +"</a></li>"
		}
		$("#phase-list").append(phasesStr);
	},
	events: {
		"click .phase": "changePhase",
		"click #back-from-phaselist": "navigateBack"
	},
	navigateBack: function() {
		BevarRouter.navigate("project");
	},
	changePhase: function(ev) {
		var newPhaseId = $(ev.currentTarget).attr("phase-id");
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects, projectId);
		project.phaseId = newPhaseId;
		project.state = "changed";
		BevarRouter.navigate("project");
	}
});
