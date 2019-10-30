var DBUtil = {
	/**
	*Retriev universal object, not object from model
	*/
	getObjectWithId: function(holder,id) {
		if (typeof id == 'string' || id instanceof String) {
			id = +id;
		}
		if (holder) {
			for (var key in holder) {
				if (holder[key].id === id) {
					return holder[key];
				}
			}
		}
	},
	getRolesByContact: function(roles, id) {
		if (typeof id == 'string' || id instanceof String) {
			id = +id;
		}
		if (roles) {
			for (var key in roles) {
				if (roles[key].contactid === id) {
					return DBUtil.getObjectWithId(DataHolder.projectRoles, roles[key].roleid);
				}
			}
		}
	},
	getRolesByProjectType: function(roles, id) {
		var rolesByType = new Array();
		if (typeof id == 'string' || id instanceof String) {
			id = +id;
		}
		if (roles) {
			for (var key in roles) {
				if (roles[key].typeId === id) {
					rolesByType.push(roles[key]);
				}
			}
		}
		return rolesByType;
	},
	getBuildingWithId: function(projectId, buildingId) {
		var project = DBUtil.getObjectWithId(DataHolder.projects, projectId);
		if (project) {
			return DBUtil.getObjectWithId(project.buildings, buildingId);
		}
	},
	getAreaWithId: function(projectId, buildingId, areaId) {
		var building = DBUtil.getBuildingWithId(projectId, buildingId);
		if (building) {
			return DBUtil.getObjectWithId(building.areas, areaId);
		}
	},
	/**
	* Used to retrieve object from model
	*/
	getStuffWithId: function(projectId, buildingId, areaId, objectId) {
		var area = DBUtil.getAreaWithId(projectId, buildingId, areaId);
		if (area) {
			return DBUtil.getObjectWithId(area.objects, objectId);
		}
	},		
	getProjectStatusWithId: function(typeId, id) {
		if (typeof id == 'string' || id instanceof String) {
			id = +id;
		}
		if (typeId && id) {
			var projectType = DBUtil.getObjectWithId(DataHolder.projectTypes, typeId);
			var statuses = projectType.statuses;
			for (var key in statuses) {
				if (statuses[key].id === id) return statuses[key];
			}
		}
	},
	createProject: function(id, name, createdById, statusId, phaseId){
		var project = new Object();
		project.id = id;
		project.name = name;
		project.createdById = createdById;
		project.statusId = statusId;
		project.phaseId = phaseId;
		return project;
	},
	createBuilding: function(id, projectId, name, latitude, longitude, buildingTypeId) {
		var building = new Object();
		building.id = id;
		building.projectId = projectId;
		building.name = name;
		building.longitude = longitude;
		building.latitude = latitude;
		building.buildingTypeId = buildingTypeId;
		return building;
	},
	getBuildingsByProjectId: function(projectId){
		projectId = parseInt(projectId);
		var buildings = DataHolder.buildings;
		var returnValue = [];
		for(key in buildings) {
			if (buildings[key].projectId === projectId) {
				returnValue.push(buildings[key]);
			}
		}
		return returnValue;
	},
	saveProjects: function() {
		store.set("projects", DataHolder.projects);
	},
	resetProject: function(project) {				
		project.buildings = undefined;
		project.contacts = undefined;
		project.images = undefined;
		project.tempImages = undefined;
		project.state = undefined;
		project.roles = undefined;
		Util.refreshPage("project");
	}
}