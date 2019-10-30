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
 
var projectTypeView = BevarGenericView.extend({
	populate: function() {
		var projectTypes = DataHolder.projectTypes;
		var projecTypeStr = "";
		for (var key in projectTypes) {
			projecTypeStr += "<li data-theme='c'><a class='projectType' project-type-id='" + projectTypes[key].id + "'>" + projectTypes[key].name + "</a></li>";
		}
		$("#project-type-list").append(projecTypeStr);
	},
	events: {
		"click .projectType": "changeProjectType",
		"click #back-from-projecttype": "navigateBack"
	},	
	navigateBack: function() {
		if (projectTypeView.returnView === 'project') {
			BevarRouter.navigate("project");
		}else if (projectTypeView.returnView === 'new-project') {
			BevarRouter.navigate("new-project");
		}
	},
	changeProjectType: function(ev) {
		var newProjectTypeId = $(ev.currentTarget).attr("project-type-id");
		projectTypeView.projectTypeId = newProjectTypeId;
		if (projectTypeView.returnView === 'project') {
			projectTypeView.returnView = undefined;
			BevarRouter.navigate("project");
		}else if (projectTypeView.returnView === 'new-project') {
			projectTypeView.returnView = undefined;
			BevarRouter.navigate("new-project");
		}
		
	}
});
