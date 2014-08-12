(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.States',
    'pc.Templates',
    'pc.User',
    'pc.Nav',
    'pc.Dashboard'
  ];

  angular.module('pc.Main', dependencies);

})(angular);