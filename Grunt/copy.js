module.exports = {
  moxie: {
    expand: true,
    src: [
      '<%= componentsPath %>/plupload/js/Moxie.swf',
      '<%= componentsPath %>/plupload/js/Moxie.xap'
    ],
    dest: '<%= jsPath %>/',
    flatten: true,
    filter: 'isFile'
  },
  moxieDist: {
    expand: true,
    src: [
      '<%= componentsPath %>/plupload/js/Moxie.swf',
      '<%= componentsPath %>/plupload/js/Moxie.xap'
    ],
    dest: 'dist/javascripts/',
    flatten: true,
    filter: 'isFile'
  },
  styles: {
    expand: true,
    src: '<%= cssPath %>/styles.css',
    dest: 'dist/stylesheets/',
    flatten: true,
    filter: 'isFile'
  },
  assets: {
    expand: true,
    src: '<%= imagePath %>/**/*.png',
    dest: 'dist/images/',
    flatten: true,
    filter: 'isFile'
  }
};