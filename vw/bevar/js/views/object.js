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
 
var objectView = BevarGenericView.extend({
	populate: function() {		
		objectView.self = this;
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
		var buildingId = projectView.currentBuildingId;	
		var areaId = buildingView.currentAreaId;	
		var objectId = areaView.currentObjectId;
		var object = DBUtil.getStuffWithId(projectId, buildingId, areaId, objectId);
			
		if (!object.state) {
			//retrieve object
			$.serverCall({
				url: BevarConfig.serverUrl + '/objects/' + objectId,
				type:	'GET',
				loaderText: 'Henter objekter',
				success: function(data) {
					if (data) {
						object.name = data.name;
						object.amount = data.amount;
						object.unit = data.unit;
						object.conditionRating = data.conditionRating;
						object.conditionNote1 = data.conditionNote1;
						object.conditionNote2 = data.conditionNote2;						
					}
				},
				error: function(){
					alert('Problemer med tilkobling til server');
				}			
			});
			
			//retrieve images
			$.serverCall({
				url: BevarConfig.serverUrl + '/files/images/objects/' + objectId,
				type:	'GET',
				loaderText: 'Henter bilder',
				success: function(data) {
					if (data) {				
						object.images = data;
					}
				},
				error: function(){
					alert('Problemer med tilkobling til server');
				}		
			});
			object.state = "full";
			DBUtil.saveProjects();
		}
		
		var nbrImages = object.images ? object.images.length : 0;
		var nbrTempImages = object.tempImages ? object.tempImages.length : 0;
		$("#object-images span").html(nbrImages + nbrTempImages);
		
		if (objectView.newClassificationId) {
			object.classification = objectView.newClassificationId;
			project.state = "changed";
			object.state = "changed";
			DBUtil.saveProjects();
			objectView.newClassificationId = undefined;
		}
		
		var units = DataHolder.units;
		var unit;
		var unitStr = "";
		for(key in units) {
			unit = units[key];
			if (object.unit + "" === unit.id + ""){
				unitStr += "<option selected='selected' value='" + unit.id + "'>" + unit.name + "</option>"
			}else {
				unitStr += "<option value='" + unit.id + "'>" + unit.name + "</option>"
			}
		}
		$("#unit").append(unitStr);
		
		this.fillData(object);
	},
	fillData: function(object) {
		$("#name").val(object.name);
		$("#amount").val(object.amount);
		$('#conditionRating option:eq(' + object.conditionRating + ')').prop('selected', true);
		$("#conditionNote1").val(object.conditonNote1);
		$("#conditionNote2").val(object.conditonNote2);
		
		if (object.classification) {
			var classification = DBUtil.getObjectWithId(DataHolder.classifications,object.classification);				
			$("#classification-name").html(classification.name);
			$("#classification-number").html(classification.number);		
		}		
	},
	events: {
		"click #back-to-area-from-object": "navigateBack",
		"click #object-classification": "navigateClassification",
		"click #new-unit": "navigateToNewUnit",
		"click #save": "saveObject",
		"click #delete-object":"deleteObject",
		"click #object-images": "navigateToImages"
	},	
	navigateBack: function() {
		BevarRouter.navigate("area");
	},
	navigateToImages: function() {
		BevarRouter.navigate("object-images");
	},	
	navigateClassification: function() {
		var projectId = projectsView.currentProjectId;
		var buildingId = projectView.currentBuildingId;	
		var areaId = buildingView.currentAreaId;	
		var objectId = areaView.currentObjectId;
		var object = DBUtil.getStuffWithId(projectId, buildingId, areaId, objectId);		
		if (object.classification) {
			alert('Klassifikasjon kan ikke endres');
		} else {
			classificationLvl1View.returnView = "object";	
			BevarRouter.navigate("classification-lvl1");
		}
	},
	navigateToNewUnit: function() {
		BevarRouter.navigate("new-unit");
	},
	saveObject: function() {	
		var name = $("#name").val();
		var amount = $("#amount").val();		
		var unit = $("#unit").val();
		if (name.length > 0 && amount.length > 0) {
			var projectId = projectsView.currentProjectId;
			var buildingId = projectView.currentBuildingId;	
			var areaId = buildingView.currentAreaId;	
			var objectId = areaView.currentObjectId;
			var object = DBUtil.getStuffWithId(projectId, buildingId, areaId, objectId);		
			var projectId = projectsView.currentProjectId;
			var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);			
			object.name = name;
			object.amount = amount;
			object.unit = unit;
			object.conditionRating = $("#conditionRating").val();
			object.conditonNote1 = $("#conditionNote1").val();
			object.conditonNote2 = $("#conditionNote2").val();			
			project.state = "changed";
			object.state = "changed";
			DBUtil.saveProjects();
			BevarRouter.navigate("area");
		} else {
			alert('Vennligst oppgi navn og mengde');
		}
	},
	deleteObject: function() {
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
		var buildingId = projectView.currentBuildingId;	
		var areaId = buildingView.currentAreaId;	
		var area = DBUtil.getAreaWithId(projectId, buildingId, areaId);
		var objectId = areaView.currentObjectId;
		var object = DBUtil.getStuffWithId(projectId, buildingId, areaId, objectId);
		
		if (typeof area.deletedObjects === 'undefined') {
			area.deletedObjects = [];
		}
		var objects = area.objects
		objects.splice(objects.indexOf(object), 1);
		area.deletedObjects.push(object);
		project.state = "changed";	
		DBUtil.saveProjects();
		BevarRouter.navigate("area");
	}
});
