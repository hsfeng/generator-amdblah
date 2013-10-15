define(['jquery', 'underscore', 'backbone', 'hbs!templates/welcome'], function($, _, Backbone, welcomeTmpl) {'use strict';

	var IndexView = Backbone.View.extend({

		el : '.container',

		events : {

		},

		initialize : function() {
			if(!this.$el.data('rendered')){
				this.render();
			}
		},
		render : function() {
			this.$el.html(welcomeTmpl({
				renderTime : new Date().getTime()
			}));
		}
	});

	return IndexView;
});