var express = require('express'),
	http = require('http'),
	data = require('./service/data'),
	path = require('path'),
	app = express(),
	maxAge;

if ('development' == app.get('env')) {
	 maxAge = 1000;

	/*require('express-livereload')(app, {
		watchDir: __dirname + '/public'
	});*/
} else {
    maxAge = 30 * 24 * 60 * 60 * 1000;
}


// all environments
app.set('port', process.env.PORT || 6002);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(null));
app.use(express.compress());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')), { maxAge: maxAge });

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	res.render('index', {
		github: 'jfroffice',
		env: app.get('env')
	});
});

app.get('/data', data.browse);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port') + ' in ' + app.get('env'));
});

module.exports = app;