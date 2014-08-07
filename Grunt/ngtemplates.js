module.exports = {
  dev: {
    src: [
      '<%= htmlPath %>/**/*.html'
    ],
    dest: '<%= jsPath %>/app/templates_module.js',
    options: {
      module: 'pc.Templates',
      standalone: true,
      htmlmin: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true
      },
      url: function(url) {
        var
          urlArr = url.split('/');

        return urlArr[urlArr.length-1];
      }
    }
  }
};