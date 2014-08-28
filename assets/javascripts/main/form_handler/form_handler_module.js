(function(angular) {

  var
    dependencies;

  dependencies = [
    'ngCookies',
    'pc.FormHandler.Templates',
    'pc.Ajax',
    'pc.Snackbar',
    'pc.Validation'
  ];

  angular.module('pc.FormHandler', dependencies);

})(angular);