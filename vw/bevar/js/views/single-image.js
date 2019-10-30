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
 
 var singleImageView = BevarGenericView.extend({
	populate: function() {		
		if (singleImageView.imgSource) {
			$("img").attr("src", singleImageView.imgSource);
		} else {
			BevarRouter.navigate("start");
		}
	},
	events: {
		"click #back-from-single-image": "navigateBack",
		"click #delete-image": "deleteImage"
	},
	navigateBack: function() {
		if (singleImageView.returnView === 'project-images') {			
			BevarRouter.navigate("project-images");
		} else if (singleImageView.returnView === 'building-images') {
			BevarRouter.navigate("building-images");
		} else if (singleImageView.returnView === 'object-images') {
			BevarRouter.navigate("object-images");
		} else {
			BevarRouter.navigate("start");
		}
	},
	deleteImage: function() {
		if (singleImageView.returnView === 'project-images') {	
			var projectId = projectsView.currentProjectId;
			var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
			if (singleImageView.imageId) {				
				//normal image deletion
				var image = DBUtil.getObjectWithId(project.images, singleImageView.imageId);
				if (typeof project.deletedImages === 'undefined') {
					project.deletedImages = [];
				}
				var images = project.images;
				images.splice(images.indexOf(image), 1);
				project.deletedImages.push(image);
				project.state = "changed";	
				DBUtil.saveProjects();
			} else {
				//temp image deletion
				var images = project.tempImages;
				images.splice(images.indexOf(singleImageView.imgSource), 1);
				project.state = "changed";	
				DBUtil.saveProjects();
			}
			BevarRouter.navigate("project-images");
		} else if (singleImageView.returnView === 'building-images') {
			var projectId = projectsView.currentProjectId;
			var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
			var currentBuildingId = projectView.currentBuildingId;
			var building = DBUtil.getBuildingWithId(projectId,currentBuildingId);
			if (singleImageView.imageId) {				
				//normal image deletion
				var image = DBUtil.getObjectWithId(building.images, singleImageView.imageId);
				if (typeof building.deletedImages === 'undefined') {
					building.deletedImages = [];
				}
				var images = building.images;
				images.splice(images.indexOf(image), 1);
				building.deletedImages.push(image);
				project.state = "changed";	
				DBUtil.saveProjects();
			} else {
				//temp image deletion
				var images = building.tempImages;
				images.splice(images.indexOf(singleImageView.imgSource), 1);
				project.state = "changed";	
				DBUtil.saveProjects();
			}			
			BevarRouter.navigate("building-images");
		} else if (singleImageView.returnView === 'object-images') {
			var projectId = projectsView.currentProjectId;
			var project = DBUtil.getObjectWithId(DataHolder.projects,projectId);
			var buildingId = projectView.currentBuildingId;	
			var areaId = buildingView.currentAreaId;	
			var objectId = areaView.currentObjectId;
			var object = DBUtil.getStuffWithId(projectId, buildingId, areaId, objectId);
			if (singleImageView.imageId) {				
				//normal image deletion
				var image = DBUtil.getObjectWithId(object.images, singleImageView.imageId);
				if (typeof object.deletedImages === 'undefined') {
					object.deletedImages = [];
				}
				var images = object.images;
				images.splice(images.indexOf(image), 1);
				object.deletedImages.push(image);
				project.state = "changed";	
				DBUtil.saveProjects();
			} else {
				//temp image deletion
				var images = object.tempImages;
				images.splice(images.indexOf(singleImageView.imgSource), 1);
				project.state = "changed";	
				DBUtil.saveProjects();
			}				
			BevarRouter.navigate("object-images");
		} else {
			BevarRouter.navigate("start");
		}		
	}
});
