var utils = require('./grunt-ngx-extensions');


module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    hash: utils.getHash(),

    karma: {
      unit: {
        configFile: 'karma.jasmine.conf',
        singleRun: true,
        browsers: ['Firefox', 'IE']
      },
      dev: {
        configFile: 'karma.jasmine.conf',
        browsers: ['PhantomJS'],
        reporters: ['progress']
      },
      e2e: {
        configFile: 'karma.e2e.conf',
        reporters: ['progress'],
        singleRun: true,
        browsers: ['Firefox']
      }
    },

    clean: {
      dist: ["dist"]
    },

    concat: {
      dist: {
        options: {
          stripBanners: true,
          banner: '/*! <%=pkg.name %> by <%= pkg.author %> - build at: <%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.repository.url %> (<%= hash %>) */\r\n' +
            '(function () {\r\n  var module = angular.module(\'ngxExtensions\', []);\r\n',
          footer: '}());',
          process: function (src, filePath) {
            var elements = src.split('\r\n');
            var finals = elements.splice(4, elements.length - 5);
            return finals.join('\r\n');
            //return src;
          }
        },
        files: {
          'dist/<%= pkg.name %>.js': ['src/directives/*.js']
        }
      }
    },

    uglify: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> by <%= pkg.author %> - build at: <%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.repository.url %> (<%= hash %>) */\r\n',
          report: 'gzip'
        },
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    },

    connect: {
      testserver: {
        options: {
          base: __dirname + '/test/directives',
          port: 9001,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test:unit', ['karma:unit']);
  grunt.registerTask('test:e2e', ['connect:testserver', 'karma:e2e']);
  grunt.registerTask('build', ['clean', 'concat', 'uglify']);
  grunt.registerTask('dev', ['karma:dev']);
  //grunt.registerTask('default', ['express']);

  grunt.registerTask('custom', function () {
    grunt.log.writeln('custom task, code goes here');
  });
};