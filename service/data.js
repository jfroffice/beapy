var path = require("path"),
	readdirp = require('readdirp'),
	_ = require('lodash'),
	root = path.join(__dirname, '../public/md');

function getFiles(cb) {
	var files = [];

	readdirp({
		root: root,
		fileFilter: '*.json'
	}).on('data', function(data) {
		files.push({
			name: data.name.replace('.json', ''),
			data: require(path.join(root, data.name))
		});
	}).on('end', function() {
		files = _.filter(files, function(e) {
			return e.data.state == 'published';
		});

		cb && cb(files);
	});	
}

exports.getFiles = getFiles;

exports.browse = function(req, res) {
	getFiles(function(files) {
		res.send(files);
	});	
};