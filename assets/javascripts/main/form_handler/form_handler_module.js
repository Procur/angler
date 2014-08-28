(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.FormHandler.Templates',
    'pc.Ajax',
    'pc.Snackbar',
    'pc.Validation'
  ];

  angular.module('pc.FormHandler', dependencies);

})(angular);