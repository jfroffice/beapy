var assert = require("assert"),
    path = require("path"),
    readdirp = require('readdirp');

describe('Readdirp', function() {
    describe('root:"./dir/ with filter *.md"', function() {
        it('should list all files in directory', function(done) {

            var files = [];

            readdirp({
                root: path.join(__dirname, '/dir'),
                fileFilter: '*.md'
            }).on('data', function(data) {
                files.push(data);
                /*assert.equal(-1, [1,2,3].indexOf(5));*/
            }).on('end', function(data) {
                assert.equal(2, files.length);
                assert.equal('01.md', files[0].name);
                assert.equal('02.md', files[1].name);
                done();
            });
        });
    });
});