const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
      },
      main: {
        files: {
          'gruntDist/css/main.css': 'src/assets/styles/main.scss',
        },
      },
    },
    babel: {
      options: {
        presets: ['@babel/preset-env'],
      },
      main: {
        files: {
          'gruntDist/js/app.js': 'src/assets/scripts/main.js',
        },
      },
    },
    watch: {
      js: { files: ['src/assets/scripts/main.js'], tasks: ['babel'] },
      css: { files: ['src/assets/styles/main.scss'], tasks: ['sass'] },
    },
  });
  loadGruntTasks(grunt);
  grunt.registerTask('default', ['sass', 'babel', 'watch']);
};
