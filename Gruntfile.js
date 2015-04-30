module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bowerInstall: {
      target: {
        src: [
          'app/index.html'
        ],
        dependencies: true,
      }
    },
    concat: {
      dist: {
        src: [
          'src/app.js',
          'src/controllers/module.js',
          'src/factories/module.js',
          'src/factories/**/*.js',
          'src/controllers/**/*.js'
        ],
        dest: 'app/js/app.js'
      }
    }
  })
  grunt.registerTask('prep', ['bowerInstall']);
  grunt.registerTask('build', ['concat']);
}
