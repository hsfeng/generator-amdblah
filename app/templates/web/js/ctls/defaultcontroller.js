define(['jquery', 'underscore', 'backbone'],
	function($, _, Backbone) {
		'use strict';

		var DefaultController = Backbone.Marionette.Controller.extend({

			initialize: function(app) {
				this.app = app;
			},

			stage: function(view, options) {
				var self = this,
					v;
				require([view], function(ViewClass) {
					if (self.app.mainRegion.$el.attr('data-rendered')) {
						if (!options) {
							options = {};
						}
						options.el = self.app.mainRegion.$el.children()[0];
						console.log('attach view...');
						v = new ViewClass(options);
						self.app.mainRegion.attachView(v);
						if (v.onShow) {
							v.onShow();
						}
					} else {
						console.log('show view');
						self.app.mainRegion.show(new ViewClass(options));
					}
					self.app.mainRegion.$el.removeAttr('data-rendered');
				});
			},

			welcome: function(params) {
				console.log('ctls welcome');
				this.stage('views/index');
			}
		});

		return DefaultController;
	});
