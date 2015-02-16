module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                layout: 'page.hbs',
                layoutdir: './src/templates/layouts',
                partials: './src/templates/partials/**/*.hbs',
                plugins: ['permalinks'],
                data: './src/data/testdata.json'
            },
            site: {
                files: [{
                    cwd: './src/views/',
                    dest: './build/',
                    expand: true,
                    src: '**/*.hbs'
                }]
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "./build/styles/toolkit-v1.0.css": "./src/styles/less/style.less"
                }
            }
        },
        concat: {
            dist: {
                src: ['./src/js/**/*.js'],
                dest: './build/scripts/toolkit-v1.0.js'
            }
        },
        jshint: {
            beforeconcat: ['./src/js/**/*.js'],
            afterconcat: ['./build/scripts/toolkit-v1.0.js']
        },
        watch: {
            scripts: {
                files: ['**/*.hbs'],
                tasks: ['assemble','less','concat','jshint'],
                options: {
                    spawn: false,
                },
            },
        },
	    serve: {
	        options: {
	            port: 9000,
			    'serve': {
			        'path': 'build/'
			    }
	        }
	    },
		connect: {
			server: {
				options: {
					port: 8001,
					hostname: 'localhost',
					base: '.'
				}
			},
			keepalive: true
		}
    });

    // Load handlebars template compiler
    grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['assemble','less','concat','jshint']);
    grunt.registerTask('preview', ['assemble','less','concat','jshint','serve']);

};