module.exports = {
  dist: {
    options: {
      sourceMap: true,
      sourceMapName: 'dist/javascripts/build.map',
      compress: {
        drop_console: true
      }
    },
    files: {
      'dist/javascripts/build.min.js': ['dist/javascripts/build.js']
    }
  }
};