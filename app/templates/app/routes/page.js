'use strict';

module.exports = function (app) {
	
	/*
	 * GET home page.
	 */
	app.get('', function(req, res) {
		res.render('home',{rendered : false});
	});
	
	/*
	 * GET welcome page.
	 */
	app.get('welcome', function(req, res) {
		
		res.render('welcome', {
			renderTime: new Date().getTime()
		});
	
	});
	
};
