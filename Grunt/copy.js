module.exports = {
  styles: {
    expand: true,
    src: '<%= cssPath %>/styles.css',
    dest: 'dist/stylesheets/',
    flatten: true,
    filter: 'isFile'
  },
};