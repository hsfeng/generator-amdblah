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
	env = process.env.NODE_ENV || 'development',
	passError =
	function(callback) {
		return function(reason) {
			setImmediate(function() {
				callback(reason);
			});
		};
	},
	passValue =
	function(callback) {
		return function(value) {
			setImmediate(function() {
				callback(null, value);
			});
		};
	};

if ('production' === env) {
	htdocs = 'public';
	templateDir = 'public/templates';
}

// init express3.handlebars
hbs = exphbs.create({
	handlebars: Handlebars,
	helpers: helpers,
	extname: '.html',
	layoutsDir: htdocs,
	partialsDir: templateDir,
	defaultLayout: 'index'
});

//configure i18next
i18next.init({
	ns: 'messages',
	detectLngQS: 'lang',
	cookieName: 'lang',
	useCookie: true,
	defaultNs: 'messages',
	fallbackLng: 'en',
	fallbackToDefaultNS: true,
	resGetPath: htdocs + '/bundle/__ns_____lng__.json'
});

i18next.registerAppHelper(app);

app.set('views', path.join(__dirname, templateDir));
app.set('port', process.env.PORT || 3000);
//app.engine('html', hbs.engine);

app.engine('html', function(path, options, fn) {

	//override hbs.renderView method
	var context = options,
		data = options.data,
		helpers = _.extend({}, hbs.handlebars.helpers, hbs.helpers, options.helpers);

	// Pluck-out ExpressHandlebars-specific options.
	options = {
		cache: options.cache,
		layout: options.layout ? options.layout : hbs.defaultLayout,
		precompiled: false
	};

	// Extend `options` with Handlebars-specific rendering options.
	_.extend(options, {
		data: data,
		helpers: helpers,
		partials: hbs.getPartials(options)
	});

	hbs.render(path, context, options)
		.then(function(body) {
			var layoutPath = hbs._resolveLayoutPath(options.layout);
			body = '<div>' + body + '</div>';
			if (layoutPath) {
				context = _.extend({}, context, {
					body: body
				});
				return hbs.render(layoutPath, context, options);
			}
			return body;

		}.bind(hbs))
		.then(passValue(fn))
		.catch(passError(fn));

});
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.static(path.join(__dirname, htdocs), {
	index: 'default.htm'
}));

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride());
app.use(i18next.handle);

//register moment handler & server-side rendering
app.use(function(req, res, next) {
	res.locals({
		rendered: true,
		pushState: true,
		'moment': {
			'obj': moment,
			'lang': req.lng.toLowerCase()
		}
	});

	next();
});

app.use(app.router);

if ('development' === env) {
	app.use(express.errorHandler());
}

//register Pages router
app.namespace('/', function() {
	require('./app/routes/page')(app);
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
	console.log('Load templates from ' + templateDir);
	console.log('Starting the application in ' + app.get('env') + ' mode...');
});
