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
                    '/components/prism/prism.css'],
                dest: 'public/css/<%= pkg.name %>.css'
            },
            dist: {
                src: ['public/components/jquery/jquery.js',
                    'public/components/handlebars.js/dist/handlebars.js',
                    'public/components/marked/lib/marked.js',
                    'public/components/prism/prism.js',
                    'public/components/history.js/scripts/uncompressed/history.js',
                    'public/components/history.js/scripts/uncompressed/history.adapter.jquery.js',
                    'public/js/main.js'],
                dest: 'public/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/js/<%= pkg.name %>.min.js': ['public/js/<%= pkg.name %>.js']
                }
            }
        },
        cssmin: {
            css: {
                src: ['public/css/<%= pkg.name %>.css'],
                dest: 'public/css/<%= pkg.name %>.min.css'
            }
        },
        lint: {
            files: ['public/js/main.js']
        },
        jshint: {
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
            },
            globals: {
                exports: false,
                module: false,
                jQuery: true,
                Zepto: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task.
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};