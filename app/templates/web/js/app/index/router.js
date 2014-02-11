define(['jquery', 'underscore', 'backbone', 'module'], function($, _, Backbone, module) {'use strict';

	var AppRouter, initialize;

	AppRouter = Backbone.Router.extend({

		routes : {
			// Define some URL routes
			// Default
			'welcome' : 'welcome',
			'*actions' : 'defaultAction'
		},

		initialize : function(options) {
			console.log('init index router');
		},

		welcome : function() {
			console.log('route welcome');
			require(['views/index'], function(IndexView) {
				new IndexView();
			});
		},

		defaultAction : function(actions) {
			console.log('route default');
			Backbone.history.navigate('welcome', {
				trigger : true,
				replace : true
			});
		}
	});
	initialize = function() {
		new AppRouter();

		var pushState = false, pathParts = window.location.pathname.split('/');
		pathParts = pathParts.slice(0, pathParts.length - 1);

		if ('true' === module.config().pushState) {
			pushState = true;
		}

		Backbone.history.start({
			root : pathParts.join('/'),
			pushState : pushState
		});

		// All navigation that is relative should be passed through the navigate
		// method, to be processed by the router. If the link has a `data-bypass`
		// attribute, bypass the delegation completely.
		$(document).on('click', 'a[href]:not([data-bypass])', function(event) {
			// Get the absolute anchor href.
			// Get the anchor href and protcol
			var href = $(this).attr('href'), protocol = this.protocol + '//';

			// Ensure the protocol is not part of URL, meaning its relative.
			// Stop the event bubbling to ensure the link will not cause a page refresh.
			if (href.slice(protocol.length) !== protocol) {
				// Stop the default event to ensure the link will not cause a page
				// refresh.
				event.preventDefault();

				// `Backbone.history.navigate` is sufficient for all Routers and will
				// trigger the correct events. The Router's internal `navigate` method
				// calls this anyways.  The fragment is sliced from the root.
				Backbone.history.navigate(href.attr, true);
			}
		});
		// you can switch current panel of router by navigate function.
		// router.navigate("advanced", true);
	};
	return {
		initialize : initialize
	};
});
