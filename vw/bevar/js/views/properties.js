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
 
var propertiesView = BevarGenericView.extend({
	populate: function() {
		var properties = DataHolder.properties;
		var propertyStr = "";
		for (var key in properties) {
			propertyStr += "<li data-theme='c'><a class='property' property-id='" + properties[key].id + "'>" + properties[key].name + "</a></li>";
		}
		$("#property-list").append(propertyStr);		
	},
	events: {
		"click #back-from-properties": "navigateBack",
		"click .property": "selectProperty"
	},
	navigateBack: function() {
		BevarRouter.navigate("new-building");
	},
	selectProperty: function(ev) {		
		var propertyId = $(ev.currentTarget).attr("property-id");
		newBuildingView.propertyId = propertyId;
		BevarRouter.navigate("new-building");
	}
});
