define(
		[ 'jquery', 'underscore', 'backbone', 'app/404/router'],
		function($, _, Backbone, Router) {
			'use strict';

			var initialize = function() {
					Router.initialize();
			};

			return {
				initialize : initialize
			};
		});
