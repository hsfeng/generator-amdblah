define(
		[ 'jquery', 'underscore', 'backbone', 'app/index/router'],
		function($, _, Backbone, Router) {
			'use strict';

			var initialize = function() {
				Router.initialize();
			};

			return {
				initialize : initialize
			};
		});
