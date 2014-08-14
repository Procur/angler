(function(angular) {
  var
    dependencies;

  dependencies = [
    'pc.ThirdParty.LoDash',
    'pc.Company',
    'pc.BuyerSupplier'
  ];

  angular.module('pc.User', dependencies);

})(angular);