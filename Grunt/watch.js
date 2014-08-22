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
      '!<%= cssPath %>/**/styles.css',
    ],
    tasks: ['sass:dev', 'sass:dist', 'copy:styles']
  },
  templates:  {
    files: [
      '<%= htmlPath %>/**/*.html'
    ],
    tasks: ['ngtemplates:dev']
  }
};