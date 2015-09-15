'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AmdblahGenerator = module.exports = function AmdblahGenerator(args, options,
    config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function() {
        var cb = function(err) {
            console.log('hello error:' + err);
        };
        this.installDependencies({
            bower: false,
            skipInstall: options['skip-install'],
            callback: function() {
                this.spawnCommand('grunt', [
                    'bower-install'
                ]);
            }.bind(this)
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname,
        '../package.json')));
};

util.inherits(AmdblahGenerator, yeoman.generators.Base);

AmdblahGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);
    var appName = this._.slugify(this.appname);

    var prompts = [{
        name: 'appName',
        message: 'What\'s the name of your project?',
        "default": appName
    }];

    this.prompt(prompts, function(props) {
        this.appName = props.appName;

        cb();
    }.bind(this));
};

AmdblahGenerator.prototype.app = function app() {
    this.directory('app', 'app', true);
    this.directory('test', 'test', true);
    this.directory('web', 'web', true);

    this.copy('app.js', 'app.js');
    this.copy('bower.json', 'bower.json');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('package.json', 'package.json');
    this.copy('r.build.js', 'r.build.js');
};

AmdblahGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_bowerrc', '.bowerrc');
    this.copy('_gitattributes', '.gitattributes');
    this.copy('_gitignore', '.gitignore');
    this.copy('_jshintrc', '.jshintrc');

};
