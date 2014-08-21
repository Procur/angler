(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.User',
    'pc.Company',
    'pc.FileUpload',
    'pc.Ajax',
    'pc.Snackbar'
  ];

  angular.module('pc.EditCompanyProfile', dependencies);

})(angular);