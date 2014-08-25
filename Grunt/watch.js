module.exports = {
  scripts: {
    files: ['<%= jsPath %>/**/*.js'],
    tasks: ['concat:my_procur', 'concat:registration'],
    options: {

    }
  },
  styles: {
    files: [
      '<%= cssPath %>/**/*.scss'
    ],
    tasks: ['sass:my_procur_dev', 'sass:main_dev', 'sass:auth_dev', 'sass:registration_dev']
  },
  templates:  {
    files: [
      '<%= htmlPath %>/**/*.html'
    ],
    tasks: ['ngtemplates:my_procur', 'ngtemplates:registration']
  }
};