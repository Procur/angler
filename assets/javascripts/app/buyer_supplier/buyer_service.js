(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    buyerService
  ];

  angular.module('pc.BuyerSupplier')
    .factory('buyerService', definitions);

  function buyerService($window) {
    var
      buyer;

    buyer = $window.pc.localData.buyer || {};

    return buyer;

  }

})(angular);