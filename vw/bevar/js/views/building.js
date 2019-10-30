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
 
var buildingView = BevarGenericView.extend({
	populate: function() {
		var projectId = projectsView.currentProjectId;
		var currentBuildingId = projectView.currentBuildingId;
		var building = DBUtil.getBuildingWithId(projectId,currentBuildingId);				
		if (!building.state){
			//retrieve areas for building
			$.serverCall({
				url: BevarConfig.serverUrl + '/projects/' + projectId + '/buildings/' + currentBuildingId + '/tags/',
				type:	'GET',
				loaderText: 'Henter områder',
				success: function(data) {
					if (data) {
						building.areas = data;							
					}
				},
				error: function(){
					alert('Problem med tilkobling til server');
				}			
			});			
			//retrieve images for building
			$.serverCall({
				url: BevarConfig.serverUrl + '/files/images/buildings/' + building.propertyId + "/" + currentBuildingId,
				type:	'GET',
				loaderText: 'loading images',
				success: function(data) {
					if (data) {
						building.images = data;
					}
				},
				error: function(){
					alert('Problem med tilkobling til server');
				}		
			});						
			building.state = 'full';
			DBUtil.saveProjects();
		}
		this.fillData(building);
	},
	fillData: function(building) {
		var buildingType = DBUtil.getObjectWithId(DataHolder.buildingTypes,building.buildingTypeId);
		if (buildingType) {
			$("#building-type span").html(buildingType.name);
		}
		if (building.address) {
			$("#address").html(building.address);
			var address = building.address.replace(/\s/g, "+");
			var src = "http://maps.googleapis.com/maps/api/staticmap?center=" + address + "&zoom=16&size=288x150&markers=" + address + "&sensor=false";
			$("#google-map").attr("src", src);
		}
		var nbrImages = building.images ? building.images.length : 0;
		var nbrTempImages = building.tempImages ? building.tempImages.length : 0;
		$("#images span").html(nbrImages + nbrTempImages);
		var data = building.areas;
		var areaStr = "";
		var area;
		var areaObjects = "";
		if (data instanceof Array) {
			for (var key in data) {
				area = data[key];
				if (area.objects) {
					areaObjects = area.objects.length
				} else {
					areaObjects = "";
				}
				areaStr += "<li data-theme='c'><a class='area' area-id='" + area.id + "'>" + area.name + "<span class='ui-li-count'>" + areaObjects + "</span></a></li>";
			}					
		}else if (data instanceof Object) {
			areaStr = "<li data-theme='c'><a class='area' area-id='" + data.id + "'>" + data.name + "</a></li>";
		}
		
		$("#area-list").append(areaStr);					
	},
	events: {
		"click #back-from-building": "navigateBack",
		"click #building-type": "changeType",
		"click #images": "navigateToImages",
		"click .area": "navigateArea",
		"click #new-area": "navigateNewArea",
		"click #new-property": "navigateNewProperty"
	},	
	navigateBack: function() {
		BevarRouter.navigate("project");
	},
	changeType: function() {
		buildingTypeView.returnView = 'building';
		BevarRouter.navigate("building-type");
	},
	navigateToImages: function() {
		BevarRouter.navigate("building-images");
	},
	navigateArea: function(ev) {
		var id = $(ev.currentTarget).attr("area-id");
		buildingView.currentAreaId = id;
		BevarRouter.navigate("area");
	},
	navigateNewArea: function() {
		BevarRouter.navigate("new-area");
	},
	navigateNewProperty: function() {
		BevarRouter.navigate("new-property");
	}	
});
