require.config({
	baseUrl : 'js',
	paths : {
		'jquery' : '../bower_components/jquery/dist/jquery',
		'backbone' : '../bower_components/backbone/backbone',
		'underscore' : '../bower_components/underscore/underscore',
		'modernizr' : '../bower_components/modernizr/modernizr',
		'templates' : '../templates',
		'bower' : '../bower_components',
		'hbs' : '../bower_components/hbs/hbs',
		'hbs.helpers' : '../bower_components/amdblah-hbs-helpers/dist',
		'text' : '../bower_components/requirejs-text/text',
		'domready' : '../bower_components/requirejs-domready/domReady',
		'underscore.string' : '../bower_components/underscore.string/dist/underscore.string.min',
		'backbone.super' : '../bower_components/backbone-super/backbone-super/backbone-super-min',
		'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap',
		'moment' : '../bower_components/moment/min/moment.min',
		'moment.langs' : 'libs/vendor/moment',
		'i18next' : '../bower_components/i18next/i18next.amd.withJQuery.min',

		'marionette' : '../bower_components/backbone.marionette/lib/core/backbone.marionette',
		'backbone.wreqr' : '../bower_components/backbone.wreqr/lib/backbone.wreqr',
		'backbone.babysitter' : '../bower_components/backbone.babysitter/lib/backbone.babysitter',
	},

	shim : {
		'modernizr' : {
			exports : 'Modernizr'
		},
		'backbone' : {
			deps : ['underscore', 'jquery'],
			exports : 'Backbone'
		},
		'underscore.string' : ['underscore'],
		'backbone.super' : ['backbone'],
		'bootstrap' : ['jquery']
	},

	'hbs' : {
		templateExtension : 'html',
		// if disableI18n is `true` it won't load locales and the i18n helper
		// won't work as well.
		i18n : false,
		helpers : true,
		helperDirectory : 'hbs.helpers/',
		partialsUrl : 'templates/'
	}
});

require(['jquery', 'underscore', 'backbone', 'domready', 'marionette', 'i18next', 'moment', 'modernizr', 'underscore.string', 'bootstrap'], function($, _, Backbone, domReady) {'use strict';
	domReady(function() {
		//init underscore.string
		_.mixin(_.str.exports());
		_.str.include('Underscore.string', 'string');

		// the startmodule is defined on the same script tag of data-main.
		// example: <script data-main="main.js" data-start="pagemodule/main" src="vendor/require.js"/>
		var startName = $('script[data-start]').attr('data-start');
		if (startName) {
			require([startName, 'models/lang'], function(startModule, lang) {
				$(function() {
					var fn = $.isFunction(startModule) ? startModule : startModule.initialize;
					if (fn) {
						fn();
					}
				});
			});
		}

	});
});
