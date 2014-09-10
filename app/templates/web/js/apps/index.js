define(
		[ 'jquery', 'underscore', 'backbone', 'apps/index/router', 'ctls/defaultcontroller'],
		function($, _, Backbone, Router, DefaultController) {
			'use strict';

			var app, initialize = function() {

				app = new Backbone.Marionette.Application();

				app.addRegions({
					mainRegion: '#main-container',
				});

				app.addInitializer(function() {
					Router.initialize(new DefaultController(app));
				});

				app.start();
			};

			return {
				initialize : initialize,
				get : function(){
					return app;
				}
			};
		});
