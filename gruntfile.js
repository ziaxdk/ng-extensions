module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({


    tests: {
      jquery: 'karma.jasmine.conf'
    },

    karma: {
      unit: {
        configFile: 'karma.jasmine.conf',
        singleRun: true,
        browsers: ['Firefox']
      },
      coverage: {
        configFile: 'karma.jasmine.conf',
        singleRun: true,
        browsers: ['Firefox'],
        files: [
          'src/directives/*.js'
        ],
      }
    }



  });

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['karma:unit']);

};