define(['jquery', 'underscore', 'backbone','log4javascript'], function($, _, Backbone,log4javascript) {'use strict';

	var AppRouter, initialize;
	AppRouter = Backbone.Router.extend({

		routes : {
			// Define some URL routes
			// Default
			'*actions' : 'defaultAction'
		},

		initialize : function(options) {
		},

		defaultAction : function(actions) {
			var logger = log4javascript.getRootLogger(),
				consoleAppender = new log4javascript.BrowserConsoleAppender(),
				patternLayout = new log4javascript.PatternLayout('%d{HH:mm:ss} %-5p -[%c] %m');
			consoleAppender.setLayout(patternLayout);
			logger.addAppender(consoleAppender);
			logger.info('hello 404 router');
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
