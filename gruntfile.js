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
        browsers: ['Firefox', 'IE', 'Chrome']
      }
    }



  });

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['karma']);

};