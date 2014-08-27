(function(angular) {

  var
    dependencies;

  dependencies = [];

  angular.module('pc.Validation', dependencies)
    .constant('VALIDATION_TYPE', {
      DIGITS: 'digits',
      TEXT: 'text',
      REQUIRED: 'required',
      EMAIL: 'email',
      PASSWORD: 'password',
      URL: 'url'
    });

})(angular);