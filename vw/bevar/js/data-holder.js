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
 
var DataHolder = {
	currentUser: {},
	projects: {},
	classifications: {},
	buildingTypes: {},
	projectTypes: {},
	
	setDataFromStore: function() {
		DataHolder.classifications = store.get('classifications');
		DataHolder.projectRoles = store.get('projectRoles');
		DataHolder.contactTypes = store.get('contactTypes');
		DataHolder.units = store.get('units');
		DataHolder.buildingTypes = store.get('buildingTypes');
		DataHolder.projectTypes = store.get('projectTypes');
		DataHolder.properties = store.get('properties');		
		DataHolder.projects = store.get("projects");		
	},
	
	initData: function() {
		//init object classifications
		DataHolder.classifications = store.get('classifications');
		if (!DataHolder.classifications) {			
			$.serverCall({
				url: BevarConfig.serverUrl + '/classifications/',
				type:	'GET',
				async: true,
				loaderText: 'henter klassifikasjoner',
				success: function(data) {
					if (data) {
						DataHolder.classifications = data;
						store.set('classifications',data);
					}
				}			
			});
		}
		
		//init project roles
		DataHolder.projectRoles = store.get('projectRoles');
		if (!DataHolder.projectRoles) {
			$.serverCall({
				url: BevarConfig.serverUrl + '/projectroles/',
				type:	'GET',
				async: true,
				loaderText: 'henter prosjektroller',
				success: function(data) {
					if (data) {
						DataHolder.projectRoles = data;
						store.set('projectRoles',data);
					}
				}		
			});
		}
		
		//init contact types
		DataHolder.contactTypes = store.get('contactTypes');
		if (!DataHolder.contactTypes) {
			$.serverCall({
				url: BevarConfig.serverUrl + '/contacts/types/',
				type:	'GET',
				async: true,
				loaderText: 'henter kontakt typer',
				success: function(data) {
					if (data) {
						DataHolder.contactTypes = data;
						store.set('contactTypes',data);
					}
				}		
			});
		}
		
		//init units
		DataHolder.units = store.get('units');
		if (!DataHolder.units) {
			$.serverCall({
				url: BevarConfig.serverUrl + '/units/',
				type:	'GET',
				async: true,
				loaderText: 'henter enheter',
				success: function(data) {
					if (data) {
						DataHolder.units = data;
						store.set('units',data);
					}
				}	
			});
		}	
	
		//init building types
		DataHolder.buildingTypes = store.get('buildingTypes');
		if (!DataHolder.buildingTypes) {
			$.serverCall({
				url: BevarConfig.serverUrl + '/buildingtypes/',
				type:	'GET',
				async: true,
				loaderText: 'henter bygningstyper',
				success: function(data) {
					if (data) {
						DataHolder.buildingTypes = data;
						store.set('buildingTypes',data);
					}
				}
			});	
		}
		//init project types
		DataHolder.projectTypes = store.get('projectTypes');
		if (!DataHolder.projectTypes) {				
			$.serverCall({
				url: BevarConfig.serverUrl + '/projects/typeswithstatusandphase/',
				type:	'GET',	
				async: true,				
				loaderText: 'henter prosjekttyper',
				success: function(data) {
					if (data) {						
						DataHolder.projectTypes = data;
						store.set('projectTypes',data);
					}
				}
			});			
		}
		//init properties
		DataHolder.properties = store.get('properties');
		if (!DataHolder.properties) {			
			$.serverCall({
				url: BevarConfig.serverUrl + '/properties/',
				type:	'GET',
				async: true,
				loaderText: 'henter eiendommer',
				success: function(data) {
					if (data) {
						DataHolder.properties = data;
						store.set('properties',data);
					}
				}	
			});
		}				
	}
}