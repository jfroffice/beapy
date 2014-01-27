![Browserify!](https://github-camo.global.ssl.fastly.net/e19e230a9371a44a2eeb484b83ff4fcf8c824cf7/687474703a2f2f737562737461636b2e6e65742f696d616765732f62726f777365726966795f6c6f676f2e706e67)

Introduction
============
[Browserify](https://github.com/substack/node-browserify) permet d'utiliser dans le navigateur des modules dit [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1).

Les modules CommonJS permettent de résoudre les problématiques de dépendances Javascript.

Chaque module doit exporter explicitement les variables qu'il souhaite exposer.

Il doit également définir explicitement les dépendances qu'il souhaite utiliser.

Dans la pratique
================

__module.js__
```javascript
exports.doSomething = function(options) {
	console.log('doSomething');
};	
```

__main.js__
```javascript
var module = require('./module');
module.doSomething();	
```

Noter l'utilisation des mots-clefs __exports.__ pour exposer une variable et __require()__ pour importer une dépendance.

générer ensuite le fichier __bundle.js__ en utilisant la commande __browserify__.

```javascript
browserify main.js > bundle.js
```

Ce fichier est une "pseudo" concaténation des deux fichiers, vous pouvez l'inclure dans votre page.

__index.html__
```markup
<script src="js/bundle.js"></script>	
```

Voici le fichier qui a été généré.

__bundle.js__
```javascript
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var module = require('./module');

module.doSomething();



},{"./module":2}],2:[function(require,module,exports){
exports.doSomething = function() {
    console.log('doSomething');
};	
```

Le fichier est illisible et inexploitable pour le débogage. Mais browserify fait son travail, le code est fonctionnel !


Comment travailler avec Browserify ?
====================================

Il est difficile d'imaginer pour le moment qu'il faille relancer la compilation à chaque fois pour voir si notre code fonctionne.

1ère solution
=============

Utiliser la commander _--debug_ de browserify.

```javascript
browserify main.js --debug > bundle.js
```

Celle-ci va nous permettre de générer des meta-données dit "SourceMapping" qui vont référencer nos fichiers sources.

Les meta-données sont visibles en bas du fichier bundle.js.

__bundle.js__
```javascript
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNl
```

En activant les "JS SourceMap" dans Chrome, nous pouvons voir nos fichiers sources initiales.

![Utilisation des JS SourceMap dans Chrome](../md/img/browserify01.jpg)

Attention, ces données doivent rester accessibles exclusement pour le debug et non en production car elles contiennent le chemin absolut de vos fichiers.


2ème solution
=============

Utiliser un proxy qui va faire la conversion __browserify__ à la volée.

Les deux meilleurs protagonistes semblent être :

- [node-enchilada](https://github.com/defunctzombie/node-enchilada)

- [browserify-middleware](https://github.com/ForbesLindesay/browserify-middleware)

Il fonctionne tout les deux avec [ExpressJS](http://expressjs.com/).

__index.html__
```markup
<script src="bundle.js"></script>	
```

__app.js__
```javascript
var browserify = require('browserify-middleware');

app.get('/bundle.js', browserify(path.join(__dirname, 'public/js/bundle.js')));
```

Cela fonctionne bien la première fois.

Puis, lorsqu'on modifie un des fichiers sources, il n'est pas pris en compte.

Le cache ne semble pas être correctement géré. La même problématique est rencontrée avec 'node-enchilada'.

Cette 2éme solution est écartée.



3ème solution
=============

Utiliser [Grunt](http://gruntjs.com/) et son plugin [grunt-browserify](https://github.com/jmreidy/grunt-browserify) pour recompiler les fichiers à la volée.


__index.html__
```markup
<script src="dist/bundle.js"></script>	
```

__Gruntfile.js__
```javascript
module.exports = function(grunt) {
	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	browserify: {
	      './public/dist/bundle.js': ['./public/js/bundle.js']
	    },
	    watch: {
	      	files: ['public/js/**/*.js'],
	      	tasks: ['browserify']
	    }
  	})

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", ["watch"]);
};
```

Dès qu'un fichier est modifié dans le répertoire "public/js/**/*.js", la tâche "browserify", est executée.


Conclusion
==========

L'intégration de __browserify__ dans votre environnement de developpement peut être délicate mais elle est possible.

Retener l'utilisation du plugin __grunt-browserify__, qui simplifie son intégration.

N'attentez plus pour bénéficer des modules CommonJS et maîtriser vos dépendances JS.