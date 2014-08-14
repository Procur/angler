(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    supplierService
  ];

  angular.module('pc.BuyerSupplier')
    .factory('supplierService', definitions);

  function supplierService($window) {
    var
      supplier;

    supplier = $window.pc.localData.supplier || {};

    return supplier;

  }

})(angular);