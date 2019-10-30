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
 
 var buildingImagesView = BevarGenericView.extend({
	populate: function() {		
		var projectId = projectsView.currentProjectId;
		var currentBuildingId = projectView.currentBuildingId;
		var building = DBUtil.getBuildingWithId(projectId,currentBuildingId);
		var images = building.images;
		var buildingTempimages = building.tempImages;
		var image, src;
		var imageStr = "";
		var counter = 0;
		var classLetter = 'a';
		for (var key in images) {
			if (counter % 2 == 0) {
				classLetter = "a";
			} else {
				classLetter = "b";
			}
			image = images[key];			
			src = BevarConfig.serverUrl + '/files/images/thumb/' + image.guid;
			imageStr += "<div img-id='" + image.id + "' class='ui-block-" + classLetter + " building-image'><img style='width: 100%;' src='" + src + "'></div>";
			counter++;
		}
		for (var key in buildingTempimages) {
			if (counter % 2 == 0) {
				classLetter = "a";
			} else {
				classLetter = "b";
			}
			image = buildingTempimages[key];			
			imageStr += "<div temp-img='" + image + "' class='ui-block-" + classLetter + " building-image'><img style='width: 100%;' src='" + image + "'></div>";
			counter++;
		}		
		$("#image-list").append(imageStr);
	},
	events: {
		"click #back-from-building-images": "navigateBack",
		"click #new-image": "addImage",
		"click .building-image": "selectImage"
	},
	navigateBack: function() {
		BevarRouter.navigate("building");
	},
	addImage: function() {
		// if photo is captured successfully, then upload to server:
		var onCaptureSuccess = function(imageURI) {
			var fsFail = function(error) {
				alert("failed to move image with error code: " + error.code);
			}
			var gotFileEntry = function(fileEntry) {
				var gotFileSystem = function(fileSystem) {
					function getDirSuccess(parent) {
						// copy the file
						var newName = "bevar_" + new Date().getTime() + ".jpg";
						fileEntry.moveTo(parent, newName, null, null);
						var projectId = projectsView.currentProjectId;
						var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
						var currentBuildingId = projectView.currentBuildingId;
						var building = DBUtil.getBuildingWithId(projectId,currentBuildingId);
						if (typeof building.tempImages === 'undefined') {
							building.tempImages = [];
						}
						building.tempImages.push(parent.toURL() + "/" + newName);
						project.state = "changed";	 
						DBUtil.saveProjects();	
						Util.refreshPage("building-images");
					}
					function getDirFail(error) {
					    alert("Unable to create new directory: " + error.code);
					}					
					fileSystem.root.getDirectory("bevar", { create: true, exclusive: false }, getDirSuccess, getDirFail);
				};
				// get file system to copy or move image file to
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						gotFileSystem, fsFail);
			};
			// resolve file system for image
			window.resolveLocalFileSystemURI(imageURI, gotFileEntry, fsFail);			
		};		
		// there was an error capturing the photo:
		var onCaptureFail = function(message) {
		  alert("Feil ved billedtaking: " + message);
		};
		
		navigator.camera.getPicture(onCaptureSuccess, onCaptureFail, BevarConfig.cameraOptions);		
	},
	selectImage: function(ev) {
		var temp = $(ev.currentTarget).attr("temp-img")
		if (temp) {	 
			singleImageView.imageId = undefined;
			singleImageView.imgSource = temp; 
 		} else {
 			singleImageView.imageId = $(ev.currentTarget).attr("img-id");			
 			singleImageView.imgSource = $(ev.currentTarget).find("img").attr("src");
 		}
		singleImageView.returnView = 'building-images';
		BevarRouter.navigate("single-image");
	}
});