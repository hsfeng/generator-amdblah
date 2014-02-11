define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {'use strict';

	var AppRouter, initialize;
	AppRouter = Backbone.Router.extend({

		routes : {
			// Define some URL routes
			// Default
			'*actions' : 'defaultAction'
		},

		initialize : function(options) {
			console.log('init 404 router');
		},

		defaultAction : function(actions) {
			console.log('route default');
		}
	});
	initialize = function() {
		new AppRouter();
		Backbone.history.start();
		// you can switch current panel of router by navigate function.
		// router.navigate("advanced", true);
	};
	return {
		initialize : initialize
	};
});
