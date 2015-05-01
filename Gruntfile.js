module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    wiredep: {
      prep: {
        src: [
          'app/index.html'
        ],
        dependencies: true,
      }
    },
    concat: {
      build: {
        src: [
          'src/js/app.js',
          'src/js/controllers/module.js',
          'src/js/factories/module.js',
          'src/js/directives/module.js',
          'src/js/factories/**/*.js',
          'src/js/controllers/**/*.js',
          'src/js/directives/**/*.js'
        ],
        dest: 'app/js/app.js'
      }
    }
  })
  grunt.registerTask('prep', ['wiredep:prep']);
  grunt.registerTask('build', ['concat:build']);
}
