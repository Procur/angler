(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.MyProcur.States',
    'pc.MyProcur.Templates',
    'pc.Nav',
    'pc.Header',
    'pc.Dashboard',
    'pc.UserAccountSettings',
    'pc.EditCompanyProfile',
    'pc.ViewCompanyProfile'
  ];

  angular.module('pc.MyProcur', dependencies);

})(angular);
