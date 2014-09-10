define(
		[ 'jquery', 'underscore', 'backbone', 'apps/404/router'],
		function($, _, Backbone, Router) {
			'use strict';

			var initialize = function() {
					Router.initialize();
			};

			return {
				initialize : initialize
			};
		});
