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
                  dest: './dist/',
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
                  "./dist/styles/toolkit.min.css": "./src/styles/less/style.less"
              }
          }
      },
      concat: {
          dist: {
              src: ['./src/js/**/*.js'],
              dest: './dist/scripts/toolkit.min.js'
          }
      },
      jshint: {
          beforeconcat: ['./src/js/**/*.js'],
          afterconcat: ['./dist/scripts/toolkit.min.js']
      },
      copy: {
        main: {
          files: [
            // includes files within path
            {expand: true, src: ['.src/vendor/*'], dest: 'dest/vendor', filter: 'isFile'},
          ],
        },
      },
      watch: {
        templates: {
          files: ['./src/**/*.*'],
          tasks: ['assemble','less','concat','jshint','copy'],
          options: {
            spawn: false,
            livereload: 9091,
          },
        },
      },
      connect: {
        server: {
          options: {
            livereload:9091,
            port:9090,
            open: true,
            hostname:'localhost',
            base:'./dist/'
          }
        }
      }
    });

    // Load handlebars template compiler
    grunt.loadNpmTasks('assemble');
  	grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['assemble','less','concat','jshint','copy']);
    grunt.registerTask('preview', ['assemble','less','concat','jshint','copy','connect','watch']);

};