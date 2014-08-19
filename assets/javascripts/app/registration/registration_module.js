(function(angular) {

  var
    dependencies;

  dependencies = [
    'ui.router',
    'pc.ThirdParty.LoDash',
    'pc.FileUpload',
    'pc.Snackbar'
  ];

  angular.module('pc.Registration', dependencies);

})(angular);