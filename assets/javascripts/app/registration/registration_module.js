(function(angular) {

  var
    dependencies;

  dependencies = [
    'ui.router',
    'pc.ThirdParty.LoDash',
    'pc.Ajax',
    'pc.FileUpload',
    'pc.Snackbar',
    'pc.User',
    'pc.Company'
  ];

  angular.module('pc.Registration', dependencies);

})(angular);