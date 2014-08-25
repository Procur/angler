module.exports = {
  scripts: {
    files: ['<%= jsPath %>/my_procur/**/*.js'],
    tasks: ['concat:my_procur'],
    options: {

    }
  },
  styles: {
    files: [
      '<%= cssPath %>/**/*.scss'
    ],
    tasks: ['sass:my_procur_dev', 'sass:main_dev', 'sass:auth_dev']
  },
  templates:  {
    files: [
      '<%= htmlPath %>/**/*.html'
    ],
    tasks: ['ngtemplates:my_procur']
  }
};