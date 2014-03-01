![Grunt](http://gruntjs.com/img/grunt-logo.svg)

Pré-requis
==========

L'installation de Grunt nécessite [NodeJS](http://nodejs.org/)

Installation
============

Créer un répertoire et exécuter la commande suivante en vous plaçant dans le répertoire

```javascript
npm install grunt-cli -g
```

Créer ensuite un fichier __package.json__ en utilisant la commande

```javascript
npm init
```

Ce fichier décrit votre projet (nom, version, description, license ...).

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

Installer ensuite grunt

```javascript
npm install grunt --save-dev
```

le paramètre __--save-dev__ permet d'ajouter la dépendance dans le fichier package.json

Démarrage
=========

L'exécution de la commande __grunt__, conduit à une erreur.

```javascript
> grunt
A valid Gruntfile could not be found.
```

Vous devez créer un fichier __Gruntfile.js__ qui va lister les tâches disponibles ainsi que leurs paramétrages.

```javascript
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.registerTask('default', []);
}
```

L'exécution de la commande __grunt__ est maintenant un succès.

```javascript
> grunt

Done, without errors.
```

Plugins
=======

Grunt possède beaucoup de [plugins](http://gruntjs.com/plugins).

Chaque plugin permet de répondre à une tâche bien précise, ils peuvent être combiner.

grunt-contrib-connect
---------------------

Ce plugin permet de démarrer un serveur web en local.

```javascript
npm install grunt-contrib-connect --save-dev
```

Si vous regardez le fichier __package.json__ vous pouvez voir qu'une dépendance a été ajoutée.

```javascript
"devDependencies": {
    "grunt": "^0.4.2",
    "grunt-contrib-connect": "^0.7.1"
  }
```

Rajouter maintenant la configuration du plugin __contrib-connect___

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

Exécuter __grunt__, le serveur web est démarré.

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

Modifier ensuite le fichier __gruntfile.js__ pour exécuter les tâches __jshint__ et __csslint__

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

Exécuter grunt

```javascript
$ grunt
Running "jshint:all" (jshint) task
>> 1 file lint free

Running "csslint:all" (csslint) task
>> 1 file lint free

Done, without errors
```

les fichiers JS et CSS ont été vérifiés.


grunt-contrib-watch
-------------------

L'objectif de ce plugin est d'automatiser l'éxécution des tâches dès que vos fichiers sont modifiés.

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

Exécuter grunt

```javascript
$ grunt
Running "watch" task
waiting...
```

Si vous modifiez un fichier JS, la tâche __jshint__ sera exécutée automatiquement.
Si vous modifiez un fichier CSS, la tâche __csslint__ sera exécutée automatiquement.

Vous commencez à comprendre l'intérêt de grunt... ;)

LiveReload
==========

Voici la configuration __gruntfile.js__

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

PS: n'oublier pas de désactiver le __livereload__ de connect, c'est la tâche watch qui va se charger de faire le travail.

Ajouter ensuite dans votre page, le code de la websocket qui va permettre de notifier le navigateur lorsque votre code a changé.

```javascript
<script>document.write('<script src="//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
```

Exécuter grunt

```javascript
$ grunt
Running "watch" task
waiting...
```

Connecter vous à l'adresse http://127.0.0.1:7000

Changer ensuite votre feuille de style.

La page du navigateur se raffraichit automatiquement, c'est magique ;)