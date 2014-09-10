define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {'use strict';

	var DefaultController = Backbone.Marionette.Controller.extend({

		initialize : function(app) {
			this.app = app;
		},

		welcome : function(params) {
            console.log('ctls welcome');
            var self = this;
            require(['views/index'], function(IndexView) {
                if(_.isBoolean(self.app.mainRegion.$el.data('rendered'))?!self.app.mainRegion.$el.data('rendered'):true){
                    self.app.mainRegion.show(new IndexView());
                }
            });
		}
	});

	return DefaultController;
});
