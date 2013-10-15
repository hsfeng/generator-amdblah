module.exports = {
	
	appDir : "<%= yeoman.app %>",
	baseUrl : 'js',
	dir : "<%= yeoman.dist %>",
	optimize : 'uglify',
	optimizeCss : 'none',
	optimizeAllPluginResources : false,
	findNestedDependencies : true,
	// TODO: Figure out how to make sourcemaps work with grunt-usemin
	// https://github.com/yeoman/grunt-usemin/issues/30
	//generateSourceMaps: true,
	// required to support SourceMaps
	// http://requirejs.org/docs/errors.html#sourcemapcomments
	//preserveLicenseComments: false,
	//useStrict: true,
	//wrap: true,
	skipDirOptimize : true,

	inlineText : true,

	pragmasOnSave : {
		//removes Handlebars.Parser code (used to compile template strings) set
		//it to `false` if you need to parse template strings even after build
		excludeHbsParser : true,
		// kills the entire plugin set once it's built.
		excludeHbs : true,
		// removes i18n precompiler, handlebars and json2
		excludeAfterBuild : true
	},

	mainConfigFile : '<%= yeoman.app %>/js/main.js',
	modules : [
	{ 
		name : 'main',
		include : ['models/lang']
	},
	{
		name : "app/index",
		exclude : ['jquery', 'underscore', 'backbone', 'domready', 'underscore.string', 'jquery.migrate', 'bootstrap','log4javascript','models/lang']
	}, {
		name : "app/404",
		exclude : ['jquery', 'underscore', 'backbone', 'domready', 'underscore.string', 'jquery.migrate', 'bootstrap','log4javascript','models/lang']
	}
	/*
	,{
		name : "app/yourapp",
		exclude : ['jquery', 'underscore', 'backbone', 'domready', 'underscore.string', 'jquery.migrate', 'bootstrap','log4javascript']
	}
	*/
	]
}; 