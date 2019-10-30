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
 
var statusView = BevarGenericView.extend({
	populate: function() {
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
		var currentProjectStatusId = project.statusId;
		var projectType = DBUtil.getObjectWithId(DataHolder.projectTypes,project.typeId);
		var statuses = projectType.statuses;
		var statusesStr = "";
		var theme, status;
		for(key in statuses) {
			status = statuses[key];
			if (status.id + "" === currentProjectStatusId + "") {
				theme = "a";
			} else {
				theme = "c";
			}
			statusesStr += "<li class='status' status-id='" + status.id + "' data-theme='" + theme + "'><a>" + status.name +"</a></li>"
		}
		$("#status-list").append(statusesStr);
	},
	events: {
		"click .status": "changeStatus",
		"click #back-from-status": "navigateBack"
	},	
	navigateBack: function() {
		BevarRouter.navigate("project");
	},
	changeStatus: function(ev) {
		var newStatusId = $(ev.currentTarget).attr("status-id");
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
		project.statusId = newStatusId;
		project.state = "changed";
		BevarRouter.navigate("project");
	}
});
