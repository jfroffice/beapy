module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %>' + '<%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        concat: {
            css: {
                src: ['public/css/style.css',
                    'public/components/prism/themes/prism.css'],
                dest: 'public/dist/<%= pkg.name %>.css'
            },
            dist: {
                src: ['public/components/marked/lib/marked.js',
                    'public/components/prism/prism.js',
                    'public/js/main.js'],
                dest: 'public/dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/dist/<%= pkg.name %>.min.js': ['public/dist/<%= pkg.name %>.js']
                }
            }
        },
        cssmin: {
            css: {
                src: ['public/dist/<%= pkg.name %>.css'],
                dest: 'public/dist/<%= pkg.name %>.min.css'
            }
        },
        jshint: {
            all: ['public/js/main.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            }
        },
        jsbeautifier: {
          files : ['public/js/*.js']
        },
        express: {
            server: 'app'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-express');

    // Default task.
    grunt.registerTask('format', ['jshint', 'jsbeautifier']);

    grunt.registerTask('default', ['format', 'concat', 'uglify', 'cssmin']);

    grunt.registerTask('server', ['express']);
};
