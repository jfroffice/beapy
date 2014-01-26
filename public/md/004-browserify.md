Introduction
============
[Browserify](https://github.com/substack/node-browserify) permet d'utiliser dans le navigateur des modules [NodeJS](http://nodejs.org/) en utilisant la syntaxe [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1).

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

générer ensuite le fichier __bundle.js__

```javascript
browserify main.js > bundle.js
```

Ce fichier est une "pseudo" concaténation des deux fichiers, vous pourrez alors l'inclure l'inclure dans votre page en un seul appel.

__index.html__
```markup
<html>
<head></head>
<body></body>
<script src="js/bundle.js"></script>	
</html>
```

A titre de curiosité, voici le fichier qui a été généré.

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

Le fichier est du chinoix et totalement inexploitable pour le deboggage.


Comment travailler avec Browserify ?
====================================

Il est difficile d'imaginer pour le moment qu'il faille lancer la compilation à chaque fois pour voir si notre code fonctionne.

PS: c'est pourtant comme ça que CoffeeScript a perçé.


1ère solution
=============

Utilisons la commander --debug de browserify.

```javascript
browserify main.js --debug > bundle.js
```

Celle-ci va nous permettre de générer des fichiers .map qui vont référencer nos fichiers sources.

Voici ce qui a été rajouté dans le bas de notre fichier bundle.js : sourceMappingURL=data:application/json;base64

__bundle.js__
```javascript
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNl
```

En activant les JS SourceMap dans Chrome, nous pouvons voir nos fichiers sources initiales.

![Utilisation des JS SourceMap dans Chrome](../md/img/browserify01.jpg)

C'est très bien pour les opérations de debogage, mais lors du développement quand est'il ?

2ème solution
=============

__index.html__
```markup
<html>
<body>123</body>
<script src="js/module.js"></script>
<script src="js/main.js"></script>
</html>
```
