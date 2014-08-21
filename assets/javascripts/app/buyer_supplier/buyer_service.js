(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    '_',
    buyerService
  ];

  angular.module('pc.BuyerSupplier')
    .factory('buyerService', definitions);

  function buyerService($window, _) {
    var
      buyer,
      self;

    buyer = $window.pc.localData.buyer ? _.cloneDeep($window.pc.localData.buyer) : {};

    self = {
      get: get,
      set: set,
      setAll: setAll
    };

    return self;

    function get(property) {
      return buyer[property];
    }

    function set(property, value) {
      buyer[property] = value;
    }

    function setAll(collection) {
      _.each(collection, function setAllBuyer(val, key) { set(key, val); });
    }
  }

})(angular);