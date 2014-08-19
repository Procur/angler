module.exports = gruntConfig;

function gruntConfig(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    jsPath: 'assets/javascripts',
    componentsPath: 'assets/components',
    cssPath: 'assets/stylesheets',
    htmlPath: 'assets/templates',
    imagePath: 'assets/images',

    concat: require('./grunt/concat'),
    watch: require('./grunt/watch'),
    copy: require('./grunt/copy'),
    sass: require('./grunt/sass'),
    ngtemplates: require('./grunt/ngtemplates'),
    uglify: require('./grunt/uglify'),
    bgShell: require('./grunt/bgShell'),
    karma: require('./grunt/karma')

  });

  for (var task in pkg.devDependencies) {
    if (task !== 'grunt' && !task.indexOf('grunt')) {
      grunt.loadNpmTasks(task);
    }
  }

  grunt.registerTask('build:dev', ['concat:components', 'ngtemplates:dev', 'concat:dev', 'sass:dev']);
  grunt.registerTask('build:dist', ['build:dev', 'concat:dist', 'uglify:dist', 'copy:styles', 'sass:dist', 'copy:assets']);
  grunt.registerTask('server', ['bgShell:server']);
  grunt.registerTask('protractor', ['bgShell:protractor']);
  grunt.registerTask('test:dev', ['build:dev', 'karma:dev', 'protractor']);
  grunt.registerTask('default', ['build:dev', 'server']);
}