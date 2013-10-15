'use strict';

var Backbone = require('backbone'),
	LayoutManager = require('backbone.layoutmanager'),
	WelcomeView = Backbone.View.extend({
		el: false,
		template: 'welcome.html',
		serialize: function() {
			return this.options;
		}
	});

module.exports = function (app) {

	/*
	 * GET welcome page.
	 */
	app.get('/welcome', function(req, res) {
		
		var welcomeView = new WelcomeView({
			renderTime: new Date().getTime()
		});
		
		res.render('../index', {
			views : {
				'.container': welcomeView
			}
		});
	
	});
	
	/*
	 * GET home page.
	 */
	app.get('/', function(req, res) {
		res.render('../index');
	});
	
};
