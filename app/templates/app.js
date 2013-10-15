'use strict';
/**
 * Module dependencies.
 */
var _ = require('underscore'),
	express = require('express'),
	requireAll = require('require-all'),
	http = require('http'),
	path = require('path'),
	exphbs  = require('express3-handlebars'),
	Backbone = require('backbone'),
	LayoutManager = require('backbone.layoutmanager'),
	i18next = require('i18next'),
	moment = require('moment'),
	app = express(),
	Handlebars = require('handlebars'),
	hbs,
	clientDir = 'web',
	templateDir = 'web/templates',
	layoutsDir = 'web/templates',
	fetchTemplate = function(path) {
		// To put this method into async-mode, simply call `async` and store the
		// return value (callback function).
		var done = this.async();
		// Asynchronously fetch the path in `template` and compile the contents
		// into a template.
		hbs.loadTemplate(path, {cache : true, precompiled: false}, function(err, tmpl){
			done(tmpl);
		});
	};

// register hbs helpers
require('amdblah-hbs-helpers');

app.configure('production', function() {
	clientDir = 'public';
	layoutsDir = 'public/templates';
	//load precompiled templates
	var templates = require('./app/templates/all')(Handlebars);
	fetchTemplate = function(path) {
		return templates[path];
	};
});

// init express3.handlebars
hbs = exphbs.create({
		handlebars: Handlebars,
		extname : '.html',
		layoutsDir : layoutsDir,
		partialsDir : templateDir,
		defaultLayout: '../index'
});

app.configure(function() {
	// Main config for backbone.layoutmanager
	LayoutManager.configure({
		manage: true,
		prefix: 'web/templates/',
		html: function($root, contents){
			$root.attr('data-rendered',true);
			$root.html(contents);
		},
		insert : function($root, $el){
			$root.attr('data-rendered',true);
			$root.append($el);
		},
		fetchTemplate: fetchTemplate,
		renderTemplate: function(template, context){
			return template(context);
		}
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
		resGetPath : clientDir + '/bundle/__ns_____lng__.json'
	});
	
	i18next.registerAppHelper(app);
	
	app.set('views', path.join(__dirname, templateDir));
	app.set('port', process.env.PORT || 3000);
	//app.engine('html', hbs.engine);
    app.engine('html', function(path, options, fn) {
		if(options.views){
			hbs.engine(path, options, function(a, content){
				var key, layoutView;
				
				for(key in options.views) {
				   if (options.views.hasOwnProperty(key)) {
				       options.views[key].options =  _.extend(options,options.views[key].options);
				   }
				}
				
				layoutView = new Backbone.Layout({
					views: options.views
					//template : hbs.compiled[path]
				});
				
				layoutView.$el.html(content);
				
				layoutView.render().promise().then(function() {
					fn(a, layoutView.$el.html());
				});
			});
		}else{
			hbs.engine(path, options,fn);
		}
    });
	app.set('view engine', 'html');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(i18next.handle);
	
	//register moment handler
	app.use(function(req, res, next) {
		
		res.locals({ 'moment': {
			'obj' : moment ,
			'lang' : req.lng.toLowerCase()
			}
		});
		next();
	});
	
	app.use(app.router);
	app.use(express.static(path.join(__dirname, clientDir)));
	
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

//register Pages router
require('./app/routes/page')(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
	console.log('Load templates from ' + templateDir);
	console.log('Starting the application in ' + app.get('env') + ' mode...');
});
