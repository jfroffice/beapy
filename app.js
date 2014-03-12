var express = require('express'),
	http = require('http'),
	data = require('./service/data'),
	marked = require('marked'),
	path = require('path'),
	fs = require('fs'),
	DIR = __dirname + '/public/md/',
	app = express(),
	TRANSLATE = {
		fr: {
			'subtitle': 'Ce blog est propulsé par ',
			'disqus': 'commentaires propulsé par '
		},
		en: {
			'subtitle': 'This blog is powered by ',
			'disqus': 'comments powered by '
		}
	};

marked.setOptions({
	langPrefix: 'language-'
});

app.set('port', process.env.PORT || 6002);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(null));
app.use(express.compress());
app.use(express.logger('dev'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

if ('development' === app.get('env')) {
	app.use(express.errorHandler());
	app.use(express.static(path.join(__dirname, 'public')));
} else {
	app.use(express.static(path.join(__dirname, 'public'), { maxAge: 30 * 86400000 }));
}

function isFr(req) {
    var headers = req.headers['accept-language'];
    if (headers) {
        var lang = headers.split(',');
        if (lang && lang.length > 0) {
            if (lang[0].indexOf('fr') !== -1) {
                return true;
            }
        }
    }

    return false;
}

function setCache(res, hour) {
	res.header('Cache-Control', 'max-age=' + hour * 3600 + ', must-revalidate'); // 12 * 60 * 60
}

app.get('/', function(req, res) {

	setCache(res, 12);

	var lang = isFr(req) ? 'fr' : 'en';

	data.getFiles(function(files) {
		res.render('index', {
			env: app.get('env'),
			lang: lang,
			files: files,
			t: TRANSLATE[lang]
		});
	});
});

app.get('/md/:file', function(req, res) {

	setCache(res, 12);

	var file = req.params.file,
		ext = isFr(req) ? '.md' : '.en.md',
		path = DIR + file + ext,
		data;

	if (fs.existsSync(path)) {
		data = fs.readFileSync(path).toString();
	}

	res.set('Content-Type', 'text/html');

	if ('development' == app.get('env')) {
		res.set('Cache-Control', 'no-cache');
	}

	if (data) {
		res.send(marked(data));
	} else {
		res.send(404, 'Sorry, we cannot find that!')
	}
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port') + ' in ' + app.get('env'));
});