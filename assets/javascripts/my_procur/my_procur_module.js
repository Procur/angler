(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.States',
    'pc.Templates',
    'pc.Nav',
    'pc.Header',
    'pc.Registration',
    'pc.Dashboard',
    'pc.UserAccountSettings',
    'pc.EditCompanyProfile',
    'pc.ViewCompanyProfile'
  ];

  angular.module('pc.MyProcur', dependencies);

})(angular);
