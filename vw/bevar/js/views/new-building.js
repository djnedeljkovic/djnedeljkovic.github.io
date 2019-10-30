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
 
var newBuildingView = BevarGenericView.extend({
	populate: function() {
		if (newBuildingView.buildingType) {
			var buildingType = DBUtil.getObjectWithId(DataHolder.buildingTypes, newBuildingView.buildingType);
			$("#building-type span").html(buildingType.name);
		}
		if (newBuildingView.propertyId) {
			var property = DBUtil.getObjectWithId(DataHolder.properties, newBuildingView.propertyId);			
			$("#property span").html(property.name);
		}
		if (newBuildingView.buildingName) {
			$("#building-name").val(newBuildingView.buildingName);
			newBuildingView.buildingName = undefined;
		}
		if (newBuildingView.address) {
			$("#building-address").val(newBuildingView.address);
			newBuildingView.address = undefined;
		}
	},
	events: {
		"click #back-from-newbuilding": "navigateBack",
		"click #property": "changeProperty",
		"click #building-type": "changeBuildingType",
		"click #save-building": "saveBuilding"
	},
	navigateBack: function() {
		BevarRouter.navigate("project");
	},
	changeProperty: function() {
		newBuildingView.buildingName = $("#building-name").val();
		newBuildingView.address = $("#building-address").val();
		BevarRouter.navigate("properties");
	},
	changeBuildingType: function() {
		newBuildingView.buildingName = $("#building-name").val();
		newBuildingView.address = $("#building-address").val();
		buildingTypeView.returnView = 'new-building';
		BevarRouter.navigate("building-type");
	},
	saveBuilding: function() {
		var propertyId = newBuildingView.propertyId;
		var typeId = newBuildingView.buildingType;
		var name = $("#building-name").val();
		var address = $("#building-address").val();
		if (propertyId && typeId && name && address) {
			var projectId = projectsView.currentProjectId;
			var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
			$.serverCall({
				url: BevarConfig.serverUrl + '/projects/' + projectId + '/buildings',
				type:	'POST',
				loaderText: 'Oppretter bygning',
				data: {
					propertyid: propertyId,
					name: name,
					address: address,
					buildingtypeid: typeId 
				},
				success: function(data) {
					if (data) {
						var building = new Object();
						building.id = data.id;
						building.name = name;
						building.propertyId = propertyId;
						building.address = address;
						building.state = "new";
						building.buildingTypeId = typeId;
						if (project.buildings === undefined) {
							project.buildings = [];
						}
						project.buildings.push(building);
						DBUtil.saveProjects();
						BevarRouter.navigate("project");
					}
				},
				error: function(){
					alert('Problem med tilkobling til server');
				}				
			});			
		} else {
			alert('Alle felt må fylles ut');
		}
	}
});