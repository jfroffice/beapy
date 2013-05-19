var path = require("path"),
	readdirp = require('readdirp');

exports.list = function(req, res) {
	var files = [];
	readdirp({
		root: path.join(__dirname, '../public/md'),
		fileFilter: '*.json'
	}).on('data', function(data) {
		files.push({
			name: data.name
		});
	}).on('end', function() {
		res.send({
			files: files
		});
	});
};