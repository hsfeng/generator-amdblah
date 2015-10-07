# generator-amdblah

A [Yeoman](http://yeoman.io) generator for starting a project with Express, RequireJS, Backbone+Marionette, Handlebars both on server and client side, i18next, Moment.js and Bootstrap.


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo grunt-cli
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-amdblah from npm, run:

```
$ npm install -g generator-amdblah
```

Finally, initiate the generator:

```
$ yo amdblah
```

### Run Application

Run development server

```shell
$ grunt serve
```

### Build for production
```shell
$ grunt
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## Release History
 * 2015-10-07   v0.3.3   Patch released. Bug fixes, yeoman version compatibility
 * 2015-09-15   v0.3.2   Patch released. Bug fixes, Node v4.0.0 compatibility
 * 2014-12-16   v0.3.1   Update dependencies and refine client/server rendering
 * 2014-09-10   v0.3.0   Update dependencies and add Marionette to scaffolding
 * 2014-06-09   v0.2.1   Combines require.js into main.js and add resource cache-busting
 * 2014-02-11   v0.2.0   Remove backbone.layoutmanager in default scaffold
 * 2013-12-23   v0.1.0   Updating to support SlexAxton/require-handlebars-plugin v0.7.0.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
