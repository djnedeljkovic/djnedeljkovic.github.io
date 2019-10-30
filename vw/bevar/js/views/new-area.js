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
 
var newAreaView = BevarGenericView.extend({
	populate: function() {		
	},
	events: {
		"click #back-to-building": "navigateBack",
		"click #create-area": "createArea"
	},		
	navigateBack: function() {
		BevarRouter.navigate("building");
	},
	createArea: function() {
		var projectId = projectsView.currentProjectId;
		var currentBuildingId = projectView.currentBuildingId;
		var building = DBUtil.getBuildingWithId(projectId,currentBuildingId);	
		var areaName = $("#name").val();
		if (areaName.length > 0) {
			$.serverCall({
				url : BevarConfig.serverUrl + '/projects/' + projectId + '/buildings/' + currentBuildingId + '/tags/',
				type:	'POST',
				loaderText: 'creating area',
				data: {
					name: areaName,
					typeid: 0,
				},
				success : function(data) {
					var area = new Object();
					area.id = data.id;
					area.name = areaName;
					if (building.areas === undefined) {
						building.areas = [];
					}
					building.areas.push(area);
					DBUtil.saveProjects();
					BevarRouter.navigate("building");
				},
				error : function(data) {
					alert('Feil ved opprettelse av område');
				}	
			});	
		} else {
			alert('Oppgi navn på område');
		}
	}
});
