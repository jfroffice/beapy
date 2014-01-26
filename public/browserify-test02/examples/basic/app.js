var express = require('express');
var enchilada = require('enchilada');

var app = express();

app.use(enchilada({
	src: __dirname + '/public',
	debug: true
}));

app.use('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(7002);

