module.exports = {
  scripts: {
    files: ['<%= jsPath %>/app/**/*.js'],
    tasks: ['concat:dev', 'concat:dist'],
    options: {

    }
  },
  styles: {
    files: [
      '<%= cssPath %>/**/*.scss',
      '!<%= cssPath %>/**/my_procur.css',
      '!<%= cssPath %>/**/main.css'
    ],
    tasks: ['sass:my_procur_dev', 'sass:my_procur_dist', 'sass:main_dev', 'sass:main_dist', 'copy:styles']
  },
  templates:  {
    files: [
      '<%= htmlPath %>/**/*.html'
    ],
    tasks: ['ngtemplates:dev']
  }
};