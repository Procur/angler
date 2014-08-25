(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'supplierService',
    productionDetailsController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('productionDetailsController', definitions);

  function productionDetailsController($scope, supplier) {
    $scope.supplier = {};
  }

})(angular);