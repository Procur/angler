module.exports = {
  dist: {
    options: {
      sourceMap: true,
      sourceMapName: 'public/javascripts/build.map',
      compress: {
        drop_console: true
      }
    },
    files: {
      'public/javascripts/build.min.js': ['public/javascripts/build.js']
    }
  }
};