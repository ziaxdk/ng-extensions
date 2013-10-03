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
        reporters: ['progress']
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
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['karma:unit']);
  grunt.registerTask('build', ['clean', 'concat', 'uglify']);
  grunt.registerTask('dev', ['karma:dev']);
};