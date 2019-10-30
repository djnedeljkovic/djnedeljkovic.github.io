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
 
 var newObjectView = BevarGenericView.extend({
 	populate: function() {		
		var projectId = projectsView.currentProjectId;
		var buildingId = projectView.currentBuildingId;	
		var areaId = buildingView.currentAreaId;
			
		if (newObjectView.newClassificationId) {			
			var classification = DBUtil.getObjectWithId(DataHolder.classifications,newObjectView.newClassificationId);				
			$("#classification-name").html(classification.name);
			$("#classification-number").html(classification.number);
		}
		
		var units = DataHolder.units;
		var unit;
		var unitStr = "";
		for(key in units) {
			unit = units[key];
			unitStr += "<option value='" + unit.id + "'>" + unit.name + "</option>"
		}
		$("#unit").append(unitStr);
		
		if (newObjectView.objectName) {
			$("#name").val(newObjectView.objectName);
			newObjectView.objectName = undefined;
		}
		if (newObjectView.amount) {
			$("#amount").val(newObjectView.amount);
			newObjectView.amount = undefined;
		}
		if (newObjectView.unit) {
			$("#unit").val(newObjectView.unit);
			newObjectView.unit = undefined;
		}
		if (newObjectView.conditionRate) {
			$("#conditionRate").val(newObjectView.conditionRate);
			newObjectView.conditionRate = undefined;
		}
		if (newObjectView.conditionNote1) {
			$("#conditionNote1").val(newObjectView.conditionNote1);
			newObjectView.conditionNote1 = undefined;
		}
		if (newObjectView.conditionNote2) {
			$("#conditionNote2").val(newObjectView.conditionNote2);
			newObjectView.conditionNote2 = undefined;
		}
	},
	events: {
		"click #back-to-area-from-newobject": "navigateBack",
		"click #new-object-classification": "navigateClassification",		
		"click #create-object": "createObject"
	},	
	navigateBack: function() {
		BevarRouter.navigate("area");
	},
	navigateClassification: function() {
		newObjectView.objectName = $("#name").val();
		newObjectView.amount = $("#amount").val();		
		newObjectView.unit = $("#unit").val();
		newObjectView.conditionRate = $("#conditionRate").val();
		newObjectView.conditionNote1 = $("#conditionNote1").val();
		newObjectView.conditionNote2 = $("#conditionNote2").val();		
		classificationLvl1View.returnView = "new-object";
		BevarRouter.navigate("classification-lvl1");
	},
	createObject: function() {
		var name = $("#name").val();
		var amount = $("#amount").val();		
		var unit = $("#unit").val();
		var projectId = projectsView.currentProjectId;
		var buildingId = projectView.currentBuildingId;	
		var areaId = buildingView.currentAreaId;
		var area = DBUtil.getAreaWithId(projectId, buildingId, areaId);
		var classification = newObjectView.newClassificationId;
		newObjectView.newClassificationId = undefined;
		var conditionRate = $("#conditionRate").val();
		var conditionNote1 = $("#conditionNote1").val();
		var conditionNote2 = $("#conditionNote2").val();
		if (name.length > 0 && amount.length > 0) {
			$.serverCall({
				url: BevarConfig.serverUrl + '/tags/' + areaId + '/building/' + buildingId + '/objects',
				type:	'POST',
				loaderText: 'Oppretter objekt',
				data: {
					buildingid: buildingId,
					classificationid: classification,
					name: name,
					amount: amount,
					unitid: unit,
					conditionRate: conditionRate,
					conditionNote1: conditionNote1,
					conditionNote2: conditionNote2
				},	
				success: function(data) {
					if (data) {
						var object = new Object();
						object.id = data.id;
						object.name = name;
						object.amount = amount;
						object.unit = unit;
						object.classification = classification;	
						object.conditionRating = conditionRate;
						object.conditonNote1 = conditionNote1;
						object.conditonNote2 = conditionNote2;
						if (area.objects === undefined) {
							area.objects = [];
						}						
						area.objects.push(object);
						DBUtil.saveProjects();
						BevarRouter.navigate("area");
					}
				},
				error: function(){
					alert('Problem med tilkobling til server');
				}				
			});
		} else {
			alert('Oppgi navn, mengde, enhet og NS3451 kode');
		}		
	}
});