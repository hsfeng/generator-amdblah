define(['jquery', 'underscore', 'backbone', 'hbs!templates/welcome'], function($, _, Backbone, welcomeTmpl) {'use strict';

	var IndexView = Backbone.Marionette.ItemView.extend({

		template : welcomeTmpl,

		events : {

		},

		onRender : function() {
			console.log('index view is rendering.');
			this.$el = this.$el.children();
	        // Unwrap the element to prevent infinitely
	        // nesting elements during re-render.
	        this.$el.unwrap();
	        this.setElement(this.$el);
		},

		serializeData : function(){
			return {
				renderTime : new Date().getTime()
			};
		}
	});

	return IndexView;
});
