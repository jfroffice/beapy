![Grunt](http://gruntjs.com/img/grunt-logo.svg)

Prerequisites
=============

Grunt requires [NodeJS](http://nodejs.org/)

Installation
============

Create a directory and run the following command inside 

```javascript
npm install grunt-cli -g
```

Then create a file __ package.json__ using the command 

```javascript
npm init
```

This file describes your project (name, version, description, license ...).

```javascript
{
  "name": "grunt01",
  "version": "0.0.0",
  "description": "",
  "main": "index.html",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT"
}
```

Next install Grunt

```javascript
npm install grunt --save-dev
```

parameter __ - save-dev__ adds the dependency in the file package.json

Starting
========

The execution of the command __ grunt__ leads to an error.

```javascript
> grunt
A valid Gruntfile could not be found.
```

You must create a file __ Gruntfile.js__ will list the available tasks and their settings.

```javascript
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.registerTask('default', []);
}
```

The command execution is now __ grunt__ success.

```javascript
> grunt

Done, without errors.
```

Plugins
=======

Grunt has many [plugins](http://gruntjs.com/plugins).

Each plugin can perform a specific task. These tasks can be combined. 

grunt-contrib-connect
---------------------

This plugin allows you to start a web server locally.

```javascript
npm install grunt-contrib-connect --save-dev
```

If you look at the file __ package.json__ you can see a dependency has been added. 

```javascript
"devDependencies": {
    "grunt": "^0.4.2",
    "grunt-contrib-connect": "^0.7.1"
  }
```

Now add the plugin configuration __ contrib-connect___

```javascript
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
		    	options: {
		        	port: 7000,
		        	keepalive: true
		      	}
		    }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect']);
}
```

Run __ grunt__, the web server is started.

```javascript
$ grunt
Running "connect:server" (connect) task
Waiting forever...
Started connect web server on http://0.0.0.0:7000
```

grunt-contrib-jshint et grunt-contrib-csslint
---------------------------------------------

```javascript
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-csslint --save-dev
```

Then edit the file __ gruntfile.js__ to perform the tasks jshint__ __ and __ csslint__

```javascript
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
            all: ['js/*.js'],
            options: {
			  "curly": true,
			  "eqnull": true,
			  "eqeqeq": true,
			  "undef": true,
			  "browser": true,
			  "globals": {
			    "jQuery": true
			  }
			}
        },
        csslint: {
        	all: ['css/*.css'],
        	options: {
				"box-sizing": false
        	}
        }
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	grunt.registerTask('default', ['jshint', 'csslint']);
}
```

Run grunt

```javascript
$ grunt
Running "jshint:all" (jshint) task
>> 1 file lint free

Running "csslint:all" (csslint) task
>> 1 file lint free

Done, without errors
```

JS and CSS files have been checked.


grunt-contrib-watch
-------------------

The purpose of this plugin is to automate the execution of tasks when files are modified.

```javascript
npm install grunt-contrib-watch --save-dev
```

```javascript
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
            all: ['js/*.js'],
            options: {
			  "curly": true,
			  "eqnull": true,
			  "eqeqeq": true,
			  "undef": true,
			  "browser": true,
			  "globals": {
			    "jQuery": true
			  }
			}
        },
        csslint: {
        	all: ['css/*.css'],
        	options: {
				"box-sizing": false
        	}
        },
        watch: {
        	js: {
        		files: ['js/*.js'],
        		tasks: ['jshint']
        	},
        	css: {
        		files: ['css/*.css'],
        		tasks: ['csslint']
        	}
        }
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'csslint', 'watch']);
}
```

Run grunt

```javascript
$ grunt
Running "watch" task
waiting...
```

If you change a JS file, the task will be executed automatically __ jshint__. 
If you change a CSS file, the task will be executed automatically __ csslint__. 

You begin to understand the value of grunt ... ;)

LiveReload
==========

Here is __gruntfile.js__ setting file.

```javascript
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
		    	options: {
		        	port: 7000
		      	}
		    }
		},
		jshint: {
            all: ['js/*.js'],
            options: {
			  "curly": true,
			  "eqnull": true,
			  "eqeqeq": true,
			  "undef": true,
			  "browser": true,
			  "globals": {
			    "jQuery": true
			  }
			}
        },
        csslint: {
        	all: ['css/*.css'],
        	options: {
				"box-sizing": false
        	}
        },
        watch: {
        	js: {
        		files: ['js/*.js'],
        		tasks: ['jshint'],
        		options: {
			      livereload: true,
			    }
        	},
        	css: {
        		files: ['css/*.css'],
        		tasks: ['csslint'],
        		options: {
			      livereload: true,
			    }
        	}
        }
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'csslint', 'connect', 'watch']);
}
```

Do not forget to disable __ livereload__ to connect, it is the task watch which will be responsible to do the work. 

Then add in your page, the code that will allow websocket manage livereload.

```javascript
<script>document.write('<script src="//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
```

Run grunt

```javascript
$ grunt
Running "watch" task
waiting...
```

Go to the following address: http://127.0.0.1:7000 

Then change your style sheet. 

Page automatically refreshes browser, it's magic;)