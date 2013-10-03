module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    karma: {
      unit: {
        configFile: 'karma.jasmine.conf',
        singleRun: true,
        browsers: ['Firefox', 'IE']
      },
      dev: {
        configFile: 'karma.jasmine.conf',
        reporters: ['progress']

      }/*,
      coverage: {
        configFile: 'karma.jasmine.conf',
        singleRun: true,
        browsers: ['Firefox'],
        files: [
          'src/directives/*.js'
        ],
      }*/
    },

    clean: ["dist"],

    concat: {
      dist: {
        options: {
          stripBanners: true,
          banner: '/*! <%=pkg.name %> by <%= pkg.author %> - build at: <%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.repository.url %> */\r\n' +
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
          'dist/ngx-ziax.js': ['src/directives/*.js']
        }
      }
    },

    uglify: {
      dist: {
        options: {
          banner: '/*! <%=pkg.name %> by <%= pkg.author %> - build at: <%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.repository.url %> */\r\n',
          report: 'gzip'
        },
        files: {
          'dist/ngx-ziax.min.js': ['dist/ngx-ziax.js']
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