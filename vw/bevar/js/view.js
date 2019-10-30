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
 
BevarView = function() {
	var templateCache = [];
	var viewCache = [];
	return {
		getTemplate: function(url) {
			if (!templateCache[url]) {
				$.ajax({
					url: url,
					async: false,
					success: function(data) {
						templateCache[url] = data;
					}
				});
			}
			return templateCache[url];
		},	
		getView: function(name, options) {
			if (!viewCache[name]) {
				var viewConfig = ViewConfig[name];
				if (!viewConfig) {
					return null;
				}
				viewConfig.el = '.outer-content';
				if (typeof options === 'object') {
					$.extend(viewConfig, options);
				}
				var ctor = eval(viewConfig.ctor);
				if (typeof ctor === 'function') {
					viewCache[name] = new ctor(viewConfig);
				}
			}

			return viewCache[name];
		}
	};
}();
