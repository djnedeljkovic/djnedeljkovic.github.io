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
 
var areaView = BevarGenericView.extend({
	populate: function() {		
		areaView.self = this;
		var projectId = projectsView.currentProjectId;
		var buildingId = projectView.currentBuildingId;	
		var areaId = buildingView.currentAreaId;
		var area = DBUtil.getAreaWithId(projectId, buildingId, areaId);
		if (!area.state) {
			//retrieve objects for area
			$.serverCall({
				url: BevarConfig.serverUrl + '/tags/' + areaId + '/building/' + buildingId + '/objects/',
				type:	'GET',
				async: true,
				loaderText: 'henter område',
				success: function(data) {
					if (data) {				
						area.objects = data;
						areaView.self.fillData(area);
						area.state = 'full';
						DBUtil.saveProjects();
						$("#object-list").listview('refresh');	
					}
				}	
			});			
		} else {
			areaView.self.fillData(area);
		}
		
	},
	fillData: function(area) {
		var data = area.objects;
		var objectStr = "";
		var objectVar;
		if (data instanceof Array) {
			for (var key in data) {
				objectVar = data[key];
				objectStr += "<li data-theme='c'><a class='object' object-id='" + objectVar.id + "'>" + objectVar.name + "</a></li>";
			}					
		}else if (data instanceof Object) {
			objectStr = "<li data-theme='c'><a class='object' object-id='" + data.id + "'>" + data.name + "</a></li>";
		}
		
		$("#object-list").append(objectStr);
		
		$("#name").text(area.name);
	},
	events: {
		"click #back": "navigateBack",
		"click .object": "navigateObject",
		"click #new-object": "navigateNewObject"
	},	
	navigateBack: function() {
		BevarRouter.navigate("building");
	},
	navigateObject: function(ev) {
		var id = $(ev.currentTarget).attr("object-id");
		areaView.currentObjectId = id;
		BevarRouter.navigate("object");
	},
	navigateNewObject: function() {
		BevarRouter.navigate("new-object");
	}
});
