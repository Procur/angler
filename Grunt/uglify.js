module.exports = {
  dist: {
    options: {
      compress: {
        drop_console: true
      }
    },
    files: {
      '<%= pubJsPath %>/components.min.js': ['<%= pubJsPath %>/components.js'],
      '<%= pubJsPath %>/my_procur.min.js': ['<%= pubJsPath %>/my_procur.js'],
      '<%= pubJsPath %>/registration.min.js': ['<%= pubJsPath %>/registration.js'],
      '<%= pubJsPath %>/main.min.js': ['<%= pubJsPath %>/main.js']
    }
  }
};