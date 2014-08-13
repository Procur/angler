(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.States',
    'pc.Templates',
    'pc.User',
    'pc.Company',
    'pc.Nav',
    'pc.Dashboard',
    'pc.UserAccountSettings',
    'pc.EditCompanyProfile'
  ];

  angular.module('pc.Main', dependencies);

})(angular);