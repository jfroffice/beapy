var path = require("path"),
	readdirp = require('readdirp'),
	root = path.join(__dirname, '../public/md');

exports.list = function(req, res) {
	var files = [];
	readdirp({
		root: root,
		fileFilter: '*.json'
	}).on('data', function(data) {
		files.push({
			name: data.name.replace('.json', '.md'),
			data: require(path.join(root, data.name))
		});
	}).on('end', function() {
		res.send({
			files: files
		});
	});
};