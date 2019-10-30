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
 
var newPropertyView = BevarGenericView.extend({
	populate: function() {		
		
	},
	events: {
		"click #back-from-newproperty": "navigateBack",
		"click #create-property": "createProperty"
	},		
	navigateBack: function() {
		BevarRouter.navigate("building");
	},
	createProperty: function() {
		var name = $("#name").val();
		if (name.length > 0) {
			$.serverCall({
				url: BevarConfig.serverUrl + '/properties/',
				type:	'POST',
				loaderText: 'Oppretter eiendom',
				data: {
					name: name
				},
				success : function(data) {
					console.log(data);
					var property = new Object();
					property.id = data.id;
					property.name = data.name;
					if (DataHolder.properties === undefined) {
						DataHolder.properties = [];
					}	
					DataHolder.properties.push(property);
					store.set('properties',DataHolder.properties);
					BevarRouter.navigate("building");
				},
				error : function(data) {
					alert('Feil ved opprettelse av eiendom');
				}				
			});					
		} else {
			alert('Vennligst oppgi navn');
		}
	}
});
