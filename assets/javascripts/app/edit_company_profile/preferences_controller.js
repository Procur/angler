(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'buyerService',
    'supplierService',
    preferencesController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('preferencesController', definitions);

  function preferencesController($scope, user, buyer, supplier) {
    $scope.user = initUserInformation();
    $scope.buyer = initBuyerInformation();
    $scope.supplier = initSupplierInformation();

    function initUserInformation() {
      return {
        activeMode: user.get('activeMode'),
        isSupplierMode: user.get('isSupplierMode'),
        isBuyerMode: user.get('isBuyerMode')
      };
    }
    function initBuyerInformation() {
      return {
        preferredType: buyer.get('socialMedia.preferredSupplierType'),
        preferredLanguage: buyer.get('socialMedia.preferredSupplierLanguage'),
        preferredLocation: buyer.get('socialMedia.preferredSupplierLocation')
      };
    }
    function initSupplierInformation() {
      return {
        preferredType: supplier.get('socialMedia.preferredBuyerType'),
        preferredLanguage: supplier.get('socialMedia.preferredBuyerLanguage'),
        preferredLocation: supplier.get('socialMedia.preferredBuyerLocation')
      };
    }
  }

})(angular);