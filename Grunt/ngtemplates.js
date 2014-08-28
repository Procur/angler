module.exports = {
  my_procur: {
    src: [
      '<%= htmlPath %>/my_procur/**/*.html',
      '<%= htmlPath %>/shared/**/*.html'
    ],
    dest: '<%= jsPath %>/my_procur/templates_module.js',
    options: {
      module: 'pc.MyProcur.Templates',
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
  },
  registration: {
    src: [
      '<%= htmlPath %>/registration/**/*.html',
      '<%= htmlPath %>/shared/**/*.html'
    ],
    dest: '<%= jsPath %>/registration/templates_module.js',
    options: {
      module: 'pc.Registration.Templates',
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
  },
  form_handler: {
    src: [
      '<%= htmlPath %>/shared/snackbar/snackbar.html',
    ],
    dest: '<%= jsPath %>/main/form_handler/templates_module.js',
    options: {
      module: 'pc.FormHandler.Templates',
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