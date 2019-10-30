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
 
var BevarGenericView = Backbone.View.extend({
	render: function() {
		$(this.el).html(BevarView.getTemplate(this.options.htmlTemplate));
		this.populate();
		$(this.el).trigger( 'pagecreate' );
		FastClick.attach(this.el);
		
		return this;
	},
	// function to override
	populate: function() {},
});
