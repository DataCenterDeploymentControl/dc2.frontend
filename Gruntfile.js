module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');

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
    less: {
      development: {
        options: {
          paths: [
            // 'app/bower_components/bootstrap/less/',
            'src/less/themes/slate/'
          ]
        },
        files: {
          "app/css/app.css": 'src/less/app.less'
        }
      },
      theme: {
        options: {
          paths: [
            'app/bower_components/bootstrap/less/'
          ]
        },
        files: {
          "app/css/slate.css": 'src/less/themes/slate/build.less'
        }
      }
    },
    concat: {
      build: {
        src: [
          'src/js/app.js',
          'src/js/constants.js',
          'src/js/controllers/module.js',
          'src/js/factories/module.js',
          'src/js/directives/module.js',
          'src/js/services/module.js',
          'src/js/factories/**/*.js',
          'src/js/controllers/**/*.js',
          'src/js/directives/**/*.js',
          'src/js/services/**/*.js'
        ],
        dest: 'app/js/app.js'
      },
      theme: {
        src: [
          'src/less/themes/slate/variables.less',
          'src/less/themes/slate/bootswatch.less'
        ],
        dest: 'src/less/themes/slate/build.less'
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          protocol: 'http',
          base: {
            path: 'app',
            options: {
              index: 'index.html'
            }
          }
        }
      }
    }
  })
  grunt.registerTask('prep', ['wiredep:prep']);
  grunt.registerTask('themes', ['less:theme']);
  grunt.registerTask('build', ['concat:build', 'less:development']);
}
