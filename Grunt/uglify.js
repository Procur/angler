module.exports = {
  dist: {
    options: {
      sourceMap: true,
      sourceMapName: '<%= pubJsPath %>/my_procur.map',
      compress: {
        drop_console: true
      }
    },
    files: {
      '<%= pubJsPath %>/components.min.js': ['<%= pubJsPath %>/components.js'],
      '<%= pubJsPath %>/my_procur.min.js': ['<%= pubJsPath %>/my_procur.js'],
      '<%= pubJsPath %>/registration.min.js': ['<%= pubJsPath %>/registration.js']
    }
  }
};