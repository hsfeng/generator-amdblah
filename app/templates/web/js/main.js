require.config({
	baseUrl : 'js',
	paths : {
		'jquery' : '../bower_components/jquery/jquery',
		'backbone' : '../bower_components/backbone/backbone',
		'underscore' : '../bower_components/underscore-amd/underscore',
		'modernizr' : '../bower_components/modernizr/modernizr',
		'templates' : '../templates',
		'hbs' : '../bower_components/hbs/hbs',
		'Handlebars' : '../bower_components/hbs/Handlebars',
		'i18nprecompile' : '../bower_components/hbs/hbs/i18nprecompile',
		'json2' : '../bower_components/hbs/hbs/json2',
		'hbs.helpers' : '../bower_components/amdblah-hbs-helpers/dist',
		'text' : '../bower_components/requirejs-text/text',
		'domready' : '../bower_components/requirejs-domready/domReady',
		'underscore.string' : '../bower_components/underscore.string/dist/underscore.string.min',
		'backbone.super' : '../bower_components/backbone-super/backbone-super/backbone-super-min',
		'bootstrap' : '../bower_components/bootstrap/docs/assets/js/bootstrap',
		'log4javascript' : '../bower_components/log4javascript/log4javascript',
		'jquery.migrate' : '../bower_components/jquery/jquery-migrate',
		'moment' : '../bower_components/moment/min/moment.min',
		'moment.langs' : 'libs/vendor/moment',
		'i18next' : '../bower_components/i18next/release/i18next.amd.withJQuery-1.6.3.min'
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
		'bootstrap' : ['jquery'],
		'jquery.migrate' : ['jquery'],
		'log4javascript' : {
			deps : ['jquery'],
			exports : 'log4javascript'
		}
	},

	'hbs' : {
		templateExtension : 'html',
		// if disableI18n is `true` it won't load locales and the i18n helper
		// won't work as well.
		disableI18n : true,
		disableHelpers : false,
		helperDirectory : 'hbs.helpers/'
	}
});

require(['jquery', 'underscore', 'backbone', 'domready', 'i18next', 'moment', 'modernizr', 'underscore.string', 'jquery.migrate', 'bootstrap', 'log4javascript'], function($, _, Backbone, domReady) {'use strict';
	domReady(function() {
		//init underscore.string
		_.mixin(_.str.exports());
		_.str.include('Underscore.string', 'string');
		
		// the startmodule is defined on the same script tag of data-main.
		// example: <script data-main="main.js" data-start="pagemodule/main" src="vendor/require.js"/>
		var startName = $('script[data-main][data-start]').attr('data-start');
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
