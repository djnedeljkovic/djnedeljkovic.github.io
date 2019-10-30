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
 
var classificationLvl1View = BevarGenericView.extend({
	populate: function() {
		var classifications = DataHolder.classifications;
		var classificationStr = "";
		for (var key in classifications) {
			classification = classifications[key];
			if (classification.parent === null) {
				classificationStr += "<li data-theme='c'><a class='classification-lvl1' classification-id='" + classification.id + "' data-transition='slide'>" + classification.name + "</a></li>";
			}
		}
		$("#classification-list").append(classificationStr);
	},
	events: {
		"click #back-from-lvl1": "navigateBack",
		"click .classification-lvl1": "selectClassification"
	},	
	navigateBack: function() {
		if (classificationLvl1View.returnView === "object") {
			BevarRouter.navigate("object");
		}else if (classificationLvl1View.returnView === "new-object") {
			BevarRouter.navigate("new-object");
		}
	},
	selectClassification: function(ev) {
		var classificationId = $(ev.currentTarget).attr("classification-id");
		classificationLvl2View.parentId = classificationId;
		BevarRouter.navigate("classification-lvl2");
	}
});
