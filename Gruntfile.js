module.exports = gruntConfig;

function gruntConfig(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    jsPath: 'assets/javascripts',
    componentsPath: 'assets/components',
    cssPath: 'assets/stylesheets',
    htmlPath: 'assets/templates',

    concat: require('./grunt/concat'),
    //copy: require('./grunt/copy'),
    sass: require('./grunt/sass'),
    ngtemplates: require('./grunt/ngtemplates'),
    bgShell: require('./grunt/bgShell')

  });

  for(var task in pkg.devDependencies) {
    if (task !== 'grunt' && !task.indexOf('grunt')) {
      grunt.loadNpmTasks(task);
    }
  }

  grunt.registerTask('build', ['concat:components', 'ngtemplates:dev', 'concat:dev', 'sass:dev']);
  grunt.registerTask('server', ['bgShell:server']);
  grunt.registerTask('default', ['build', 'server']);
}