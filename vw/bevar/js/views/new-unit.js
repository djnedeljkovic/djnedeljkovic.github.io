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
 
var newUnitView = BevarGenericView.extend({
	populate: function() {		
	},
	events: {
		"click #back-from-newunit": "navigateBack",
		"click #create": "createUnit"
	},		
	navigateBack: function() {
		BevarRouter.navigate("object");
	},
	createUnit: function() {
		var unitName = $("#name").val();
		if (DataHolder.units === undefined) {
			DataHolder.units = [];
		}			
		var units = DataHolder.units;
		if (unitName.length > 0) {
			$.serverCall({
				url: BevarConfig.serverUrl + '/units/',
				type:	'POST',
				loaderText: 'Oppretter enhet',
				data: {
					unit: unitName					
				},
				success : function(data) {
					var unit = new Object();
					unit.id = data.id;
					unit.name = unitName;
					units.push(unit); 
					store.set('units',units);
					BevarRouter.navigate("object");
				},
				error : function(data) {
					alert('Feil ved opprettelse av enhet');
				}			
			});
		} else {
			alert('Vennligst oppgi navn');
		}
	}
});
