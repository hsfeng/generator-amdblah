define(['jquery', 'underscore', 'backbone', 'hbs!templates/welcome'], function($, _, Backbone, welcomeTmpl) {'use strict';

	var IndexView = Backbone.View.extend({

		el : '.container',

		events : {

		},

		initialize : function() {
			if(_.isBoolean(this.$el.data('rendered'))?!this.$el.data('rendered'):true){
				console.log('render index view');
				this.render();
			}
		},
		render : function() {
			var self = this;
			this.$el.html(welcomeTmpl({
				renderTime : new Date().getTime()
			}));
		}
	});

	return IndexView;
});