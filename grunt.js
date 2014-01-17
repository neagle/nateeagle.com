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
        pygments: true,
        tag_page_layout: 'tag_page',
        tag_page_dir: 'tag'
      },

      prod: {
        src: 'templates',
        dest: 'prod',
        permalink: 'pretty',
        pygments: true,
        tag_page_layout: 'tag_page',
        tag_page_dir: 'tag'
      }

    },

    copy: {

      dev: {
        files: {
          'dev/images/': 'assets/images/**',
          'dev/fonts/': 'assets/fonts/**',
          'dev/js/': 'assets/js/**/*',
          'dev/sgf/': 'assets/sgf/**/*'
        }
      },

      prod: {
        files: {
          'prod/images/': 'assets/images/**',
          'prod/fonts/': 'assets/fonts/**',
          'prod/js/': 'assets/js/**/*',
          'prod/sgf/': 'assets/sgf/**/*'
        }
      }

      //modernizr: {
        //files: {
          //'dev/js/modernizr.js': 'lib/modernizr.js'
        //}
      //}

    },

    compass: {

      dev: {
        src: 'assets/scss',
        dest: 'dev/css',
        linecomments: true,
        forcecompile: true,
        debugsass: true,
        relativeassets: true,
        images: 'images',
        fonts: 'fonts',
        require: [
          'animation',
          'stitch'
        ]
      },

      prod: {
        src: 'assets/scss',
        dest: 'prod/css',
        outputstyle: 'compressed',
        linecomments: false,
        forcecompile: true,
        debugsass: false,
        relativeassets: true,
        images: 'images',
        fonts: 'fonts',
        require: [
          'animation',
          'stitch'
        ]
      }

    },

    // Combine JS files for dev
    //concat: {
      //dev: {
        //src: [
          //// All lib files
          //// TODO: How to make sure jQuery's first?
          ////'lib/jquery/jquery-1.8.2.js',
          //'lib/**/*.js',
          //'!lib/modernizr.js',
          //// All JS files in assets/js
          //'assets/js/**/*.js'
        //],
        //dest: 'dev/js/<%= pkg.name %>.js'
      //}
    //},

    // Minify JS files for prod
    //min: {
      //prod: {
        //src: ['<banner:meta.banner>', '<config:concat.dev.dest>'],
        //dest: 'prod/js/<%= pkg.name %>.min.js'
      //},
      //modernizr: {
        //src: ['lib/modernizr.js'],
        //dest: 'prod/js/modernizr.js'
      //}
    //},

    lint: {
      files: [
        'grunt.js',
        'assets/js/main.js',
        'assets/js/nae/**/*.js'
      ]
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
        jQuery: true,
        Modernizr: true,
        requirejs: true,
        define: true,
        require: true
      }
    },

    watch: {

      lint: {
        files: ['<config:lint.files>'],
        tasks: 'lint'
      },

      // Separating files and tasks into separate objects means not everything
      // has to build when certain sets of files are touched

      jekyll: {
        files: ['templates/**/*'],
        // When jekyll builds, EVERYTHING has to rebuild
        // TODO: Is there a more elegant way of specifying that?
        //tasks: ['jekyll:dev', 'copy:dev', 'concat', 'compass:dev']
        tasks: ['jekyll:dev', 'copy:dev', 'compass:dev']
      },

      copy: {
        files: [
          'assets/images/**',
          'assets/fonts/**',
          'assets/js/**/*.js',
          'assets/sgf/**'
        ],
        tasks: ['copy:dev']
      },

      //js: {
        //files: ['<config:lint.files>'],
        //tasks: ['concat']
      //},

      compass: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['compass:dev']
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib');
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

  grunt.registerTask('watch-serve', 'Run a local server and watch for file changes.', 'server watch');

  // Default task.
  // NB: Jekyll must come before other file generation tasks.
  //grunt.registerTask('default', 'lint jekyll copy compass concat min');
  grunt.registerTask('default', 'lint jekyll:dev copy:dev compass:dev');
  grunt.registerTask('prod', 'lint jekyll:prod copy:prod compass:prod');
};
