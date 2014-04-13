![Gulp](md/img/gulp.png)

Gulp est inspiré de [Grunt](http://blog.jfroffice.me/#grunt).

Il permet de lancer des tâches comme la concaténation, le __linting__ de fichiers sources, la minification et l'optimisation de ressources web comme les images en cascade sous forme de stream.

Intéret du Streaming
====================

L'intérêt est une rapidité accrue: ce qui un facteur déterminant surtout quand on parle d'environnement de développement.

__Gulp__ permet ainsi d'éviter au maximum les accès disques et d'améliorer la vitesse de traitement.

Orienté Performance
===================

Plutôt que de fonctionner comme ça.

![woStreaming](http://i.imgur.com/oeCGJUS.png)

__Gulp__ propose de fonctionner ainsi.

![wStreaming](http://i.imgur.com/B0B77QN.png)

Gulp.js est t'il prêt ?
==================

Il faut distinguer le Dev-time et le Build-Time qui ne présente pas même les mêmes enjeux.

Pour le moment le périmètre couvert par __Gulp__ est bien inférieur à __Grunt__, mais il progresse rapidement.

Pour le Dev-time, on peut largement considérer qu'il est prêt.

Pour le Build-time, il ne l'est pas tout à fait.

Solution Possible
=================

Il est possible de faire cohabiter __Grunt__ et __Gulp__.

au Dev-time

```javascript
# gulp
```

au Build-time

```javascript
# grunt
```

Regardez le project [Gulp-Grunt](https://github.com/gratimax/gulp-grunt), il pourrait bien vous permettre de faire.
```javascript
# gulp dist
```

Démarrage
=========

Gulp s'installe facilement :

```javascript
# npm install -g gulp
```

Ci-dessous un petit exemple permettant de mettre en oeuvre votre environnement sans trop de difficulté.
[Gulp Boilerplate](https://github.com/jfroffice/gulp-boilerplate)
```javascript
# git clone https://github.com/jfroffice/gulp-boilerplate
```

```javascript
# npm install
```
```javascript
# gulp
```

Les tentatives de faire fonctionner __usemin__ et __useminprepare__ se sont soldées par un échec.

A Suivre...
===========

Les experts de [Yeoman](http://yeoman.io/) travaillent déjà sur une spécification unifiée [Node-Task](https://github.com/node-task/spec) permettant de palier aux lacunes de __Grunt__ par rapport à __Gulp__.

Dans l'immédiat __Gulp__ est déjà Dev Ready.

Sources:
--------
- [Gulp vs Grunt](http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt/)
- [Grunt support Stream](https://github.com/gruntjs/grunt/issues/1000)