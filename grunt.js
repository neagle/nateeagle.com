/*global module:false, require:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    // Grunt's default server
    // Redefined as a custom one below so it can have dev or prod versions
    //server: {
      //port: 8000,
      //base: './dev'
    //},

    pkg: '<json:nateeagle.json>',

    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd, h:MMTT Z") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'
    },

    /* NB: Running jekyll blows away everything in the source directory
     * initially. This is fine, as long as everything else we want gets put
     * into the output directories *after* Jekyll is done.
     */
    jekyll: {

      dev: {
        src: 'templates',
        dest: 'dev',
        permalink: 'pretty',
        pygments: true
      },

      prod: {
        src: 'templates',
        dest: 'prod',
        permalink: 'pretty',
        pygments: true
      }

    },

    compass: {

      dev: {
        src: 'assets/scss',
        dest: 'dev/css',
        linecomments: true,
        forcecompile: true,
        debugsass: true,
        relativeassets: true,
        images: 'assets/images',
        require: 'susy'
      },

      prod: {
        src: 'assets/scss',
        dest: 'prod/css',
        outputstyle: 'compressed',
        linecomments: false,
        forcecompile: true,
        debugsass: false,
        relativeassets: true,
        images: 'assets/images',
        require: 'susy'
      }

    },

    // Combine JS files for dev
    concat: {
      dev: {
        src: [ 'lib/jquery/jquery-1.8.2.js', 'assets/js/**/*.js' ],
        dest: 'dev/js/<%= pkg.name %>.js'
      }
    },

    // Minify JS files for prod
    min: {
      prod: {
        src: ['<banner:meta.banner>', '<config:concat.dev.dest>'],
        dest: 'prod/js/<%= pkg.name %>.min.js'
      }
    },

    lint: {
      files: ['grunt.js', 'assets/js/**/*.js']
    },

    jshint: {
      // Specifying a jshint file will be possible in Grunt soon
      options: {
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "sub": true,
        "undef": true,
        "boss": true,
        "eqnull": true,
        "browser": true,
        "white": true,
        "devel": true,
        "indent": 2,
        "jquery": true
      },
      globals: {
        jQuery: true
      }
    },

    watch: {

      // Separating files and tasks into separate objects means not everything
      // has to build when certain sets of files are touched

      jekyll: {
        files: ['templates/**/*'],
        // When jekyll builds, EVERYTHING has to rebuild
        // TODO: Is there a more elegant way of specifying that?
        tasks: ['jekyll:dev', 'concat', 'compass:dev']
      },

      js: {
        files: ['<config:lint.files>'],
        tasks: ['concat']
      },

      compass: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['compass:dev']
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-compass');

  // Create a custom server
  // The "connect" Npm module must be installed locally for this to work. Since
  // it's listed in package.json, just type 'npm install' in the project root.
  var connect = require('connect');

  // Redefining the "server" task for this project. Note that the output
  // displayed by --help will reflect the new task description.
  grunt.registerTask('server', 'Start a custom static web server.', function () {
    grunt.log.writeln('Starting static web server in "dev" on port 8000.');
    connect(connect['static']('dev')).listen(8000);
  });

  grunt.registerTask("watch-serve", "server watch");

  // Default task.
  // NB: Jekyll must come before other file generation tasks.
  grunt.registerTask('default', 'lint jekyll compass concat min');
};
