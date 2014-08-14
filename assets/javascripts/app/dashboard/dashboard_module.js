(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.User',
    'pc.Company',
    'pc.BuyerSupplier'
  ];

  angular.module('pc.Dashboard', dependencies);

})(angular);