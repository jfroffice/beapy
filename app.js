var express = require('express'),
	http = require('http'),
	data = require('./service/data'),
	marked = require('marked'),
	path = require('path'),
	fs = require('fs'),
	app = express(),
	maxAge;

marked.setOptions({
	langPrefix: 'language-'
});

if ('development' == app.get('env')) {
	maxAge = 1000;
} else {
    maxAge = 2592000000; //30 * 24 * 60 * 60 * 1000;
}

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

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	res.render('index', {
		env: app.get('env')
	});
});

app.get('/data', data.browse);

app.get('/md/:file', function(req, res) {
	var data = fs.readFileSync(__dirname + '/public/md/' + req.params.file).toString();
	res.set('Content-Type', 'text/html');
	res.send(marked(data));	
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port') + ' in ' + app.get('env'));
});

module.exports = app;