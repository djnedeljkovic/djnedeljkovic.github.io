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
 
var projectView = BevarGenericView.extend({
	populate: function() {
		projectView.syncInProgress = false;
		var projectId = projectsView.currentProjectId;
		if (!projectId) {
			BevarRouter.navigate("start");
		}
		var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
		$("#project-name").html(project.name);
		//get type
		var projectType
		if (projectTypeView.projectTypeId) {
			projectType = DBUtil.getObjectWithId(DataHolder.projectTypes,projectTypeView.projectTypeId);
			$("#project-type span").html(projectType.name);
			$("#project-type").attr("projectTypeId",projectType.id);
			project.typeId = projectTypeView.projectTypeId;
			projectTypeView.projectTypeId = undefined;
			project.state = "changed";
		} else if (project.typeId) {
			projectType = DBUtil.getObjectWithId(DataHolder.projectTypes,project.typeId);
			if (projectType) {
				$("#project-type span").html(projectType.name);		
			}
		} else {
			$("#project-status").hide();
			$("#project-phase").hide();
		}
		
		this.checkProjectType(projectType);

		//get status
		if (project.statusId) {
			var status = DBUtil.getProjectStatusWithId(project.typeId, project.statusId);
			if (status) {
				$("#project-status span").html(status.name);				
			}
		}
		//get phase
		if (project.phaseId) {
			var phase = DBUtil.getObjectWithId(projectType.phases,project.phaseId);
			if (phase) {
				$("#project-phase span").html(phase.name);				
			}
		}
		
		//show note
		if (project.note) {
			$("#project-note-view").html(project.note);
		}
		
		if (!project.state) {
			//retrieve buildings for project
			$.serverCall({
				url: BevarConfig.serverUrl + '/projects/' + projectId + '/buildings',
				type:	'GET',
				loaderText: 'henter bygninger',
				success: function(data) {
					if (data) {
						project.buildings = data;				
					}
				},
				error: function(){
					alert('problemer med tilkobilng til server');
				}				
			});
			
			//retrieve contacts for project
			$.serverCall({
				url: BevarConfig.serverUrl + '/projects/' + projectId + '/contacts',
				type:	'GET',
				loaderText: 'henter kontakter',
				success: function(data) {
					if (data) {
						project.contacts = data;						
					}
				},
				error: function(){
					alert('problemer med tilkobilng til server');
				}			
			});		
			
			//retrieve project contact roles for project
			$.serverCall({
				url: BevarConfig.serverUrl + '/projects/' + projectId + '/roles',
				type:	'GET',
				loaderText: 'henter roller',
				success: function(data) {
					if (data) {
						project.roles = data;						
					}
				},
				error: function(){
					alert('problemer med tilkobilng til server');
				}			
			});		
			//retrieve images for project
			$.serverCall({
				url: BevarConfig.serverUrl + '/files/images/projects/' + projectId,
				type:	'GET',
				loaderText: 'henter bilder',
				success: function(data) {
					if (data) {
						project.images = data;
					}
				},
				error: function(){
					alert('Problem med tilkobling til server');
				}		
			});				
			project.state = 'full';
			DBUtil.saveProjects();
		}
		this.fillData(project);
		
	},
	checkProjectType: function(projectType) {
		if (projectType) {
			if (!(projectType.statuses && projectType.statuses.length > 0)) {
				$("#project-status").hide();
			};
			if (!(projectType.phases && projectType.phases.length > 0)) {
				$("#project-phase").hide();
			};			
		} else {
			$("#project-status").hide();
			$("#project-phase").hide();
		}
	},

	fillData: function(project) {
		//hide or show sync button
		if (project.state === "changed") {
			$("#synchronize").show();
		} else {
			$("#synchronize").hide();
		}
		
		var nbrImages = project.images ? project.images.length : 0;
		var nbrTempImages = project.tempImages ? project.tempImages.length : 0;
		$("#project-images span").html(nbrImages + nbrTempImages);		
		
		//fill buildings
		var buildingStr = "";
		var building;
		var data = project.buildings;
		if (data instanceof Array) {
			for (var key in data) {
				building = data[key];
				buildingStr += "<li data-theme='c'><a class='building' building-id='" + building.id + "'>" + building.name + "</a></li>";
			}
		}else if (data instanceof Object) {
			buildingStr = "<li data-theme='c'><a class='building' building-id='" + data.id + "'>" +data.name + "</a></li>";
		}		
		$("#building-list").append(buildingStr);	
		//fill contacts
		data = project.contacts;
		var roles = project.roles;
		var contactStr = "";
		var contact;
		if (data instanceof Array) {
			for (var key in data) {
				contact = data[key];
				var role = DBUtil.getRolesByContact(roles, contact.id);
				if (role) {
					role = "<span class='ui-li-count'>"+ role.name +"</span>";
				} else {
					role = "";
				}
				contactStr += "<li data-theme='c'><span class='contact' contact-id='" + contact.id + "'>" + contact.name + "</span>"+role+"</li>";
			}					
		}else if (data instanceof Object) {
			contactStr = "<li data-theme='c'><span class='contact' contact-id='" + data.id + "'>" + data.name + "</span></li>";
		}
		
		$("#contact-list").append(contactStr);			
	},
	events: {
		"click #back-to-projects-from-project": "navigateBack",
		"click #synchronize": "synchronize",
		"click #project-type": "changeType",
		"click #project-status": "changeStatus",
		"click #project-phase": "changePhase",
		"click .building": "navigateToBuilding",
		"click #new-contact":"navigateSelectContact",
		"click #new-building":"navigateNewBuilding",
		"click #project-images": "navigateToImages",
		"click #reset-project": "resetProject",
		"click #project-note-view": "editNote"
	},	
	navigateBack: function() {
		BevarRouter.navigate("projects");
	},
	navigateToImages: function() {
		BevarRouter.navigate("project-images");
	},
	resetProject: function() {
		var projectId = projectsView.currentProjectId;
		var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
		DBUtil.resetProject(project);
	},
	synchronize: function() {
		if (!projectView.syncInProgress) {
			projectView.syncInProgress = true;
			var projectId = projectsView.currentProjectId;
			var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
			if (project.state === "changed") {
				//count active server calls
				var activeServerCall = 0;
				var projectData = new Object();
				if (project.typeId) { projectData.typeid = project.typeId; }
				if (project.phaseId) { projectData.phaseid = project.phaseId; }
				if (project.statusId) { projectData.statusid = project.statusId; }
				if (project.note) { projectData.note = project.note; }
				//update project
				++activeServerCall;
				$.serverCall({
					url: BevarConfig.serverUrl + '/projects/' + projectId,
					type:	'PUT',
					loaderText: 'oppdaterer oppdragsdata',
					async: true,
					data: projectData,
					complete: function () {
						--activeServerCall;
					}				
				});	
				//upload project images
				if (project.tempImages && project.tempImages.length > 0) {
					Util.showLoader('uploading images for project: ' + project.name);
					var projectTempImages = project.tempImages;
					for (var imageKey in projectTempImages) {
						++activeServerCall;
						var imageURI = projectTempImages[imageKey];
						var success = function(response) {
							--activeServerCall;
						};
						//error handler
					    var error = function(error) {
					    	--activeServerCall;
					    	alert('Feil ved opplasting av fil: ' + imageURI + ': ' + error.code);
					    };
					      
						var options = new FileUploadOptions();
						options.fileKey = "file";
						options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
						options.chunkedMode = false;
						options.dataType = 'json';
						options.crossDomain = true;
						options.processData = false;
						options.contentType = false;
						options.headers =  {
							"Authorization": Util.makeBaseAuth()
						};
						var ft = new FileTransfer();	  
						ft.upload(imageURI, 
							    BevarConfig.serverUrl + "/files/images/projects/" + project.id + "/upload",
							  	success,	
							  	error,
					            options,
					            true); //this last true is important cause it means that in case of https connection we are accepting self signed certificates
						
					}
					project.tempImages = [];
					Util.hideLoader();
				}
				//delete project images
				if (project.deletedImages && project.deletedImages.length > 0) {
					var projectDeletedImages = project.deletedImages;
					for (var deletedProjectImageKey in projectDeletedImages) {
						var projectDeletedImage = projectDeletedImages[deletedProjectImageKey];
						++activeServerCall;
						$.serverCall({
							url: BevarConfig.serverUrl + '/files/images/' + projectDeletedImage.id,
							type:	'DELETE',
							loaderText: 'deleting project image',
							async: true,
							complete: function () {
								--activeServerCall;
							}				
						});						
					}
					project.deletedImages = [];
				}
			
				//update buildings
				var buildings = project.buildings;
				var building;
				for (var buildingKey in buildings) {
					building = buildings[buildingKey];
					if (building.state === "changed") {
						++activeServerCall;
						$.serverCall({
							url: BevarConfig.serverUrl + '/projects/' + projectId + '/buildings/' + building.id,
							type:	'PUT',
							loaderText: 'oppdaterer bygninger',
							async: true,
							data: {
								name : building.name,
								address: building.address,
								buildingtypeid: building.buildingTypeId
							},
							complete: function () {
								--activeServerCall;
							}
						});		
						buildingState = "full";
					}
					if (building.tempImages && building.tempImages.length > 0) {
						Util.showLoader('uploading images for building: ' + building.name);
						var buildingTempImages = building.tempImages;
						for (var imageKey in buildingTempImages) {
							++activeServerCall;
							var imageURI = buildingTempImages[imageKey];
							var success = function(response) {
								--activeServerCall;
							};
							//error handler
						    var error = function(error) {
						    	--activeServerCall;
						    	alert('Feil ved opplasting av fil: ' + imageURI + ': ' + error.code);
						    };
						      
							var options = new FileUploadOptions();
							options.fileKey = "file";
							options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
							options.chunkedMode = false;
							options.dataType = 'json';
							options.crossDomain = true;
							options.processData = false;
							options.contentType = false;
							options.headers =  {
								"Authorization": Util.makeBaseAuth()
							};
							var ft = new FileTransfer();	  
							ft.upload(imageURI, 
								    BevarConfig.serverUrl + "/files/images/buildings/" + building.propertyId + "/" + building.id + "/upload",
								  	success,	
								  	error,
						            options,
						            true); //this last true is important cause it means that in case of https connection we are accepting self signed certificates
							
						}
						building.tempImages = [];
						Util.hideLoader();
					} 
					//delete building images
					if (building.deletedImages && building.deletedImages.length > 0) {
						var buildingtDeletedImages = building.deletedImages;
						for (var deletedBuildingImageKey in buildingtDeletedImages) {
							var buildingDeletedImage = buildingtDeletedImages[deletedBuildingImageKey];
							++activeServerCall;
							$.serverCall({
								url: BevarConfig.serverUrl + '/files/images/' + buildingDeletedImage.id,
								type:	'DELETE',
								loaderText: 'deleting building image',
								async: true,
								complete: function () {
									--activeServerCall;
								}				
							});						
						}
						building.deletedImages = [];
					}
					
					//update objects 
					var areas = building.areas;
					var objects, deletedObjects;
					var area, object, deletedObject;
					for (var areaKey in areas) {
						area = areas[areaKey];
						
						//delete objects
						deletedObjects = area.deletedObjects;
						for (var deletedObjectKey in deletedObjects) {
							deletedObject = deletedObjects[deletedObjectKey];
							++activeServerCall;
							$.serverCall({
								url: BevarConfig.serverUrl + '/objects/' + deletedObject.id,
								type:	'DELETE',
								async: true,
								loaderText: 'deleting objects',
								complete: function () {
									--activeServerCall;
								}	
							});	
						}
						
						objects = area.objects;
						for (var objectKey in objects) {
							object = objects[objectKey];
							if (object.state === "changed") {
								++activeServerCall;
								$.serverCall({
									url: BevarConfig.serverUrl + '/objects/' + object.id,
									type:	'PUT',
									async: true,
									loaderText: 'oppdaterer objekter',
									data: {
										name : object.name,								
										amount: object.amount,
										unit: object.unit,
										conditionRate: object.conditionRating,
										conditionNote1: object.conditonNote1,
										conditionNote2: object.conditonNote2,
									},
									complete: function () {
										--activeServerCall;
									}
								});	
								object.state = "full";
							}
							if (object.tempImages && object.tempImages.length > 0) {
								Util.showLoader('uploading images for object: ' + object.name);
								var objectTempImages = object.tempImages;
								for (var imageKey in objectTempImages) {
									++activeServerCall;
									var imageURI = objectTempImages[imageKey];
									var success = function(response) {
										--activeServerCall;
									};
									//error handler
								    var error = function(error) {
								    	--activeServerCall;
								    	alert('Feil ved opplasting av fil: ' + imageURI + ': ' + error.code);
								    };
								      
									var options = new FileUploadOptions();
									options.fileKey = "file";
									options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
									options.chunkedMode = false;
									options.dataType = 'json';
									options.crossDomain = true;
									options.processData = false;
									options.contentType = false;
									options.headers =  {
										"Authorization": Util.makeBaseAuth()
									};
									var ft = new FileTransfer();	  
									ft.upload(imageURI, 
											BevarConfig.serverUrl + "/files/images/objects/" + object.id + "/upload",
										  	success,	
										  	error,
								            options,
								            true); //this last true is important cause it means that in case of https connection we are accepting self signed certificates
								}
								object.tempImages = [];
								Util.hideLoader();
							}
							//delete object images
							if (object.deletedImages && object.deletedImages.length > 0) {
								var objectDeletedImages = object.deletedImages;
								for (var deletedObjectImageKey in objectDeletedImages) {
									var objectDeletedImage = objectDeletedImages[deletedObjectImageKey];
									++activeServerCall;
									$.serverCall({
										url: BevarConfig.serverUrl + '/files/images/' + objectDeletedImage.id,
										type:	'DELETE',
										loaderText: 'deleting object image',
										async: true,
										complete: function () {
											--activeServerCall;
										}				
									});						
								}
								object.deletedImages = []
							}	
						}
					}
				}
			}
			var interval = setInterval(function() {
				if (activeServerCall === 0) {
					window.clearInterval(interval)
					DBUtil.resetProject(project);
				}		
			},500);
		}	
		
	},
	changeType: function() {
		projectTypeView.returnView = "project";
		BevarRouter.navigate("project-type");
	},	
	changeStatus: function() {
		BevarRouter.navigate("status");
	},
	changePhase: function() {
		BevarRouter.navigate("phase");
	},
	editNote: function() {
		BevarRouter.navigate("projectNote");
	},
	navigateToBuilding: function(ev) {
		var id = $(ev.currentTarget).attr("building-id");
		projectView.currentBuildingId = id;
		BevarRouter.navigate("building");
	},
	navigateSelectContact: function() {
		console.log('odoh');
		BevarRouter.navigate("select-contact");
	},
	navigateNewBuilding: function() {
		BevarRouter.navigate("new-building");
	}
});