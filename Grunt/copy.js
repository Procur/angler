module.exports = {
  moxie: {
    expand: true,
    src: [
      '<%= componentsPath %>/plupload/js/Moxie.swf',
      '<%= componentsPath %>/plupload/js/Moxie.xap'
    ],
    dest: '<%= pubJsPath %>/',
    flatten: true,
    filter: 'isFile'
  },
  assets: {
    expand: true,
    src: [
      '<%= imagePath %>/**/*.png',
      '<%= imagePath %>/**/*.jpg',
      '<%= imagePath %>/**/*.ico',
    ],
    dest: '<%= pubImagePath %>/',
    flatten: true,
    filter: 'isFile'
  }
};