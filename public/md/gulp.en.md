![Gulp](md/img/gulp.png)

__Gulp__ is inspired by [Grunt](http://blog.jfroffice.me/#grunt).

It allows to run tasks such as concatenation, the __ linting__ source files, minification and optimization of web resources like images cascading stream form.

Why streaming ?
===============

Interest is increasing rapidly : what a factor especially when development environment is talking about.

__Gulp__ prevents maximum disks access and improve processing speed access.

Performance oriented
===================

Rather than workflow like that.

![woStreaming](http://i.imgur.com/oeCGJUS.png)

__Gulp__ proposed to process by stream.

![wStreaming](http://i.imgur.com/B0B77QN.png)

Gulp.js are you ready?
=====================

We must distinguish Dev-time and Build-Time. They does not even has the same issues.

Currently covered by the scope __ Gulp__ well below __ Grunt__ , but growing rapidly.

For Dev-time , we can consider that it is widely available.

For Build-time , it is not quite.

Possible Solution
=================

It is possible to integrate __Grunt__ and __Gulp__.

At Dev-time :

```javascript
# gulp
```

At Build-time :

```javascript
# grunt
```

Have a look on this project [Gulp-Grunt](https://github.com/gratimax/gulp-grunt) and you could do instead.
```javascript
# gulp dist
```

Start-up
========

Gulp is easy to install :

```javascript
# npm install -g gulp
```

Below is a small example to implement your environment without too much difficulties.

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

Attempts to run usemin__ __ and __ useminprepare__ resulted in failure :(

A Follow...
===========

Experts [Yeoman]( http://yeoman.io/ ) are already working on a unified specification [Node Task]( https://github.com/node-task/spec ) to overcome the shortcomings of __Grunt__ by compared to __ Gulp__.

Right now, __ Gulp__ is ready for Dev Env.

Sources:
--------
- [Gulp vs Grunt](http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt/)
- [Grunt support Stream](https://github.com/gruntjs/grunt/issues/1000)