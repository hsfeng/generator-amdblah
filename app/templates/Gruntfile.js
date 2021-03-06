'use strict';

var mountFolder = function(connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	var path = require('path');

	// configurable paths
	var yeomanConfig = {
		app: 'web',
		dist: 'public',
		server: 'app'
	};

	var rjsOptions = require('./r.build')(yeomanConfig);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		yeoman: yeomanConfig,
		express: {
			options: {
				port: 3000
			},
			development: {
				options: {
					script: 'app.js',
					node_env: 'development'
				}
			},
			production: {
				options: {
					script: 'app.js',
					node_env: 'production'
				}
			}
		},
		watch: {
			express: {
				files: [
					'app.js',
					'<%= yeoman.server %>/**/*.js'
				],
				tasks: ['express:development', 'delayed-livereload']
			},
			livereload: {
				files: [
					'<%= yeoman.app %>/*.html',
					'<%= yeoman.app %>/img/**/*.{png,jpg,jpeg,gif,webp}',
					'<%= yeoman.app %>/css/**/*.{less,css,png,jpg,jpeg,gif,webp}',
					'<%= yeoman.app %>/js/**/*.js'
				],
				options: {
					livereload: true
				}
			}
		},
		connect: {
			options: {
				port: 9000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			test: {
				options: {
					middleware: function(connect) {
						return [
							mountFolder(connect, 'test')
						];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://localhost:<%= express.options.port %>'
			}
		},
		clean: {
			dist: ['<%= yeoman.dist %>'],
			optimized: {
				expand: true,
				cwd: '<%= yeoman.dist %>',
				src: ['bower_components', 'build.txt', 'js/*.*', '!js/main.js',
					'js/libs/{,*/}*', '!js/libs/vendor/**',
					'js/apps/{,*/}*', '!js/apps/*.js',
					'js/views/{,*/}*', '!js/views/*.js',
					'js/models',
					'css/**/*.less'
				]
			},
			bower: ['<%= yeoman.app %>/bower_components',
				'<%= yeoman.app %>/css/libs/vendor', '<%= yeoman.app %>/js/libs/vendor'
			]
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			client: {
				expand: true,
				cwd: '<%=  yeoman.app %>',
				src: ['js/**/*.js', '!js/libs/vendor/**/*.js']
			},
			server: {
				expand: true,
				cwd: '.',
				src: ['app.js', 'app/**/*.js']
			}
		},
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://localhost:<%= connect.options.port %>/index.html']
				}
			}
		},
		requirejs: {
			dist: {
				// Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
				options: rjsOptions
			}
		},
		less: {
			production: {
				options: {
					paths: ['<%= yeoman.dist %>/css/libs/bootstrap',
						'<%= yeoman.dist %>/css'
					],
					compress: true,
					yuicompress: true,
					strictImports: true
				},

				files: [{
					// no need for files, the config below should work
					expand: true,
					cwd: "<%= yeoman.dist %>/css",
					src: ["*.less", '!_*.less'],
					ext: ".css",
					dest: '<%= yeoman.dist %>/css'
				}]

			}
		},

		processhtml: {
			options: {
				data: {
					version: '1.0.0.<%= gitinfo.local.branch.current.shortSHA %>',
				}
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: '*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: '<%= yeoman.dist %>/css/',
				src: ['libs/*/*.css',
					'libs/vendor/*/*.css', '!libs/vendor/**/*.min.css'
				],
				dest: '<%= yeoman.dist %>/css/'
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
						/*removeCommentsFromCDATA: true,
						// https://github.com/yeoman/grunt-usemin/issues/44
						//collapseWhitespace: true,
						collapseBooleanAttributes: true,
						removeAttributeQuotes: true,
						removeRedundantAttributes: true,
						useShortDoctype: true,
						removeEmptyAttributes: true,
						removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: '**/*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: ['img/**/*.{png,jpg,jpeg}',
						'css/**/*.{png,jpg,jpeg}'
					],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		gitinfo: {
			'local': {
				'branch': {
					'current': {
						'shortSHA': new Date().getTime()
					}
				}
			}
		},
		bower: {
			install: {
				options: {
					layout: function(type, component) {
						grunt.log.write('layout type:' + type + ' component:' + component +
							'\n');

						if (type.indexOf('css/') === 0) {
							var types = type.split('/');
							var newType = types[0];
							if (types.length < 3) {
								var subType = types[1];
								return path.join(newType, 'libs', 'vendor', component, subType);
							}
							var subType = types[types.length - 1];
							return path.join(newType, 'libs', 'vendor', subType);
						}

						return path.join(type, 'libs', 'vendor', component);
					},
					targetDir: '<%= yeoman.app %>',
					cleanTargetDir: false,
					cleanBowerDir: false,
					verbose: true
				}
			}
		}
	});

	grunt.registerTask('delayed-livereload', 'delayed livereload', function() {
		var done = this.async();
		setTimeout(function() {
			grunt.task.run('livereload');
			done();
		}, 500);
	});

	grunt.registerTask('serve', function(target) {

		grunt.task.run([
			'express:development',
			'open',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'connect:test',
		'mocha'
	]);

	grunt.registerTask('bower-install', ['clean:bower', 'bower:install']);

	grunt.registerTask('build', [
		'requirejs',
		'less:production',
		'clean:optimized',
		/*'gitinfo',*/
		'processhtml:dist',
		'htmlmin:dist',
		'cssmin:minify',
		'imagemin'
	]);

	grunt.registerTask('default', [
		'clean:dist',
		'bower-install',
		'jshint',
		'test',
		'build'
	]);
};
