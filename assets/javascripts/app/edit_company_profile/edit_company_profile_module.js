(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.FileUpload',
    'pc.Ajax',
    'pc.Snackbar',
    'pc.User',
    'pc.Company',
    'pc.BuyerSupplier'
  ];

  angular.module('pc.EditCompanyProfile', dependencies);

})(angular);