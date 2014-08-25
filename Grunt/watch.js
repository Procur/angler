module.exports = {
  scripts: {
    files: ['<%= jsPath %>/my_procur/**/*.js'],
    tasks: ['concat:my_procur'],
    options: {

    }
  },
  styles: {
    files: [
      '<%= cssPath %>/**/*.scss',
      '!<%= cssPath %>/**/my_procur.css',
      '!<%= cssPath %>/**/main.css'
    ],
    tasks: ['sass:my_procur_dev', 'sass:main_dev']
  },
  templates:  {
    files: [
      '<%= htmlPath %>/**/*.html'
    ],
    tasks: ['ngtemplates:my_procur']
  }
};