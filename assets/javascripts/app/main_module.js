(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.States',
    'pc.Templates',
    'pc.Nav',
    'pc.Header',
    'pc.Dashboard',
    'pc.UserAccountSettings',
    'pc.EditCompanyProfile'
  ];

  angular.module('pc.Main', dependencies);

})(angular);