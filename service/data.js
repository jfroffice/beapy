var path = require("path"),
	readdirp = require('readdirp'),
	_ = require('lodash'),
	root = path.join(__dirname, '../public/md'),
	files = [];

(function() {
	
	readdirp({
		root: root,
		fileFilter: '*.json'
	}).on('data', function(data) {
		files.push({
			name: data.name.replace('.json', '.md'),
			data: require(path.join(root, data.name))
		});
	}).on('end', function() {
		// filter on published state
		files = _.filter(files, function(e) {
			return e.data.state == 'published';
		});
	});

})();

exports.browse = function(req, res) {
	res.send(files);
};