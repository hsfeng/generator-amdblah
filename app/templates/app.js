'use strict';
/**
 * Module dependencies.
 */
var _ = require('underscore'),
	express = require('express'),
	ns = require('express-namespace'),
	http = require('http'),
	path = require('path'),
	Handlebars = require('handlebars'),
	exphbs = require('express-handlebars'),
	i18next = require('i18next'),
	moment = require('moment'),
	app = express(),
	hbs,
	htdocs = 'web',
	templateDir = 'web/templates/',
	helpers = require('amdblah-hbs-helpers'),
	methodOverride = require('method-override'),
	env = process.env.NODE_ENV || 'development';

if ('production' === env) {
	htdocs = 'public';
	templateDir = 'public/templates';
}

// init express3.handlebars
hbs = exphbs.create({
	handlebars : Handlebars,
	helpers : helpers,
	extname : '.html',
	layoutsDir : htdocs,
	partialsDir : templateDir,
	defaultLayout : 'index'
});

//configure i18next
i18next.init({
	ns : 'messages',
	detectLngQS : 'lang',
	cookieName : 'lang',
	useCookie : true,
	defaultNs : 'messages',
	fallbackLng : 'en',
	fallbackToDefaultNS : true,
	resGetPath : htdocs + '/bundle/__ns_____lng__.json'
});

i18next.registerAppHelper(app);

app.set('views', path.join(__dirname, templateDir));
app.set('port', process.env.PORT || 3000);
app.engine('html', hbs.engine);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.static(path.join(__dirname, htdocs),{index:'default.htm'}));

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride());
app.use(i18next.handle);

//register moment handler & server-side rendering
app.use(function(req, res, next) {
	res.locals({
		rendered : true,
		pushState : true,
		'moment' : {
			'obj' : moment,
			'lang' : req.lng.toLowerCase()
		}
	});

	next();
});

app.use(app.router);

if ('development' === env) {
	app.use(express.errorHandler());
}

//register Pages router
app.namespace('/', function(){
	require('./app/routes/page')(app);
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
	console.log('Load templates from ' + templateDir);
	console.log('Starting the application in ' + app.get('env') + ' mode...');
});
