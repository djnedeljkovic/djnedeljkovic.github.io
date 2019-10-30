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
 
var classificationLvl2View = BevarGenericView.extend({
	populate: function() {
		if (classificationLvl2View.parentId) {
			var parentClassification = DBUtil.getObjectWithId(DataHolder.classifications,classificationLvl2View.parentId);				
			$("#name").html(parentClassification.name);
			$("#number").html(parentClassification.number);
			var classifications = DataHolder.classifications;
			var classificationStr = "";
			for (var key in classifications) {
				classification = classifications[key];
				if (classification.parent + "" === classificationLvl2View.parentId) {
					classificationStr += "<li data-theme='c'><a class='classification-lvl2' classification-id='" + classification.id + "'>" + classification.name + "<span class='ui-li-count'>" + classification.number + "</span></a></li>";
				}
			}
			$("#classification-list").append(classificationStr);		
		} else {
			alert('Feil. Mangler nivået over i klassifikasjonen.');
			BevarRouter.navigate("start");
		}

	},
	events: {
		"click #back-from-lvl2": "navigateBack",
		"click #use-this": "useThis",
		"click .classification-lvl2": "selectClassification"
	},	
	navigateBack: function() {
		BevarRouter.navigate("classification-lvl1");
	},
	selectClassification: function(ev) {
		var classificationId = $(ev.currentTarget).attr("classification-id");
		classificationLvl3View.parentId = classificationId;
		BevarRouter.navigate("classification-lvl3");
	},
	useThis: function() {
		if (classificationLvl1View.returnView === "object") {			
			objectView.newClassificationId = classificationLvl2View.parentId;
			classificationLvl2View.parentId = undefined;
			classificationLvl3View.parentId = undefined;
			BevarRouter.navigate("object");
		}else if (classificationLvl1View.returnView === "new-object") {
			newObjectView.newClassificationId = classificationLvl2View.parentId;
			classificationLvl2View.parentId = undefined;
			classificationLvl3View.parentId = undefined;
			BevarRouter.navigate("new-object");
		}	
	}
});
