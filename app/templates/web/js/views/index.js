define(['jquery', 'underscore', 'backbone', 'hbs!templates/welcome'], function(
	$, _, Backbone, welcomeTmpl) {
	'use strict';

	var IndexView = Backbone.Marionette.ItemView.extend({

		template: welcomeTmpl,

		events: {

		},

		onRender: function() {
			console.log('index view is rendering.');
		},

		serializeData: function() {
			return {
				renderTime: new Date().getTime()
			};
		}
	});

	return IndexView;
});
