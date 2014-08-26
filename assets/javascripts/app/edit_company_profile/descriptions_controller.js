(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'buyerService',
    'supplierService',
    descriptionsController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('descriptionsController', definitions);

  function descriptionsController($scope, buyer, supplier) {
    $scope.buyer = initBuyerInformation();
    $scope.supplier = initSupplierInformation();

    function initBuyerInformation() {
      return {
        dba: buyer.get('dba')
      };
    }
    function initSupplierInformation() {
      return {
        dba: supplier.get('dba')
      };
    }
  }

})(angular);