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
 
var buildingTypeView = BevarGenericView.extend({
	populate: function() {
		if (buildingTypeView.returnView === 'building') {
			var projectId = projectsView.currentProjectId;
			var currentBuildingId = projectView.currentBuildingId;
			var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
			var building = DBUtil.getObjectWithId(project.buildings, currentBuildingId);
			var currentBuildingTypeId = building.buildingTypeId;
		}

		
		var buildingTypes = DataHolder.buildingTypes;
		var buildingTypesString = "";
		var theme, buildingType;
		for(key in buildingTypes) {
			buildingType = buildingTypes[key];
			if (currentBuildingTypeId) {
				if (buildingType.id + "" === currentBuildingTypeId + "") {
					theme = "a";
				}else {
					theme = "c";
				}
			} else {
				theme = "c";
			}
			buildingTypesString += "<li data-theme='c' class='building-type' building-type-id='" + buildingType.id + "' theme='" + theme + "'><a>" + buildingType.name +"</a></li>";
		}
		$("#building-type-list").append(buildingTypesString);			
	},
	events: {
		"click .building-type": "changeBuildingType",
		"click #back-from-building-type": "backFromBuildingType",
	},		
	backFromBuildingType: function() {
		if (buildingTypeView.returnView === 'building') {
			BevarRouter.navigate("building");
		} else if (buildingTypeView.returnView === 'new-building') {
			BevarRouter.navigate("new-building");
		}
	},
	changeBuildingType: function(ev) {
		var newBuildingTypeId = $(ev.currentTarget).attr("building-type-id");
		if (buildingTypeView.returnView === 'building') {
			var projectId = projectsView.currentProjectId;
			var currentBuildingId = projectView.currentBuildingId;
			var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
			var building = DBUtil.getObjectWithId(project.buildings, currentBuildingId);
			building.buildingTypeId = newBuildingTypeId;
			project.state = "changed";
			building.state = "changed";
			DBUtil.saveProjects();
			buildingTypeView.returnView = undefined;
			BevarRouter.navigate("building");
		}else if (buildingTypeView.returnView === 'new-building') {
			newBuildingView.buildingType = newBuildingTypeId;
			buildingTypeView.returnView = undefined;
			BevarRouter.navigate("new-building");
		}
	}
});
