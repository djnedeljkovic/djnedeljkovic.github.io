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
 
var BevarRouter = Backbone.Router.extend({
	navigate: function(fragment, options) {
		Backbone.history.navigate(fragment, typeof options === 'undefined' ? true : options);
	},

	routes: {
		// Define some URL routes
		'settings': 'showSettings',
		'projects': 'showProjects',
		'new-project': 'showNewProject',
		'project': 'showProject',
		'status': 'showStatus',
		'phase': 'showPhase',
		'projectNote': 'showProjectNote',
		'building': 'showBuilding',
		'building-type': 'showBuildingType',
		'new-building': 'showNewBuilding',
		'project-type': 'showProjectType',
		'area': 'showArea',
		'object': 'showObject',
		'new-area': 'showNewArea',
		'properties': 'showProperties',
		'building-images': 'showBuildingImages',
		'object-images': 'showObjectImages',
		'project-images': 'showProjectImages',
		'classification-lvl1': 'showClassificationLvl1',
		'classification-lvl2': 'showClassificationLvl2',
		'classification-lvl3': 'showClassificationLvl3',
		'new-contact': 'showNewContact',
		'contact-type': 'showContactType',
		'contact-role': 'showContactRole',
		'new-unit': 'showNewUnit',
		'new-object': 'showNewObject',
		'new-property': 'showNewProperty',
		'select-contact': 'showSelectContact',
		'select-role': 'showSelectRole',
		'image-load': 'showImageLoad',
		'single-image': 'showSingleImage',
		// Default
		'*actions': 'defaultAction'
	},
	showSettings: function() {
		BevarView.getView('settings').render();
	},
	showProjects: function() {
		BevarView.getView('projects').render();
	},	
	showProject: function() {
		BevarView.getView('project').render();
	},		
	showNewProject: function() {
		BevarView.getView('newProject').render();
	},
	showStatus: function() {
		BevarView.getView('status').render();
	},
	showPhase: function() {
		BevarView.getView('phase').render();
	},	
	showProjectNote: function() {
		BevarView.getView('projectNote').render();
	},	
	showBuilding: function() {
		BevarView.getView('building').render();
	},
	showBuildingType: function() {
		BevarView.getView('buildingType').render();
	},
	showNewBuilding: function() {
		BevarView.getView('newBuilding').render();
	},
	showProjectType: function() {
		BevarView.getView('projectType').render();
	},
	showArea: function() {
		BevarView.getView('area').render();
	},	
	showObject: function() {
		BevarView.getView('object').render();
	},	
	showNewArea: function() {
		BevarView.getView('newArea').render();
	},
	showProperties: function() {
		BevarView.getView('properties').render();
	},
	showBuildingImages: function() {
		BevarView.getView('buildingImages').render();
	},
	showObjectImages: function() {
		BevarView.getView('objectImages').render();
	},
	showProjectImages: function() {
		BevarView.getView('projectImages').render();
	},
	showClassificationLvl1: function() {
		BevarView.getView('classificationLvl1').render();
	},
	showClassificationLvl2: function() {
		BevarView.getView('classificationLvl2').render();
	},
	showClassificationLvl3: function() {
		BevarView.getView('classificationLvl3').render();
	},
	showNewContact: function() {
		BevarView.getView('newContact').render();
	},
	showContactType: function() {
		BevarView.getView('contactType').render();
	},
	showContactRole: function() {
		BevarView.getView('contactRole').render();
	},	
	showNewUnit: function() {
		BevarView.getView('newUnit').render();
	},
	showNewObject: function() {
		BevarView.getView('newObject').render();
	},	
	showNewProperty: function() {
		BevarView.getView('newProperty').render();
	},
	showSelectContact: function() {
		BevarView.getView('selectContact').render();
	},
	showSelectRole: function() {
		BevarView.getView('selectRole').render();
	},
	showImageLoad: function() {
		BevarView.getView('imageLoad').render();
	},
	showSingleImage: function() {
		BevarView.getView('singleImage').render();
	},
	defaultAction: function(actions) {
		// We have no matching route, lets display the home page
		BevarView.getView('start').render();
	}
});
