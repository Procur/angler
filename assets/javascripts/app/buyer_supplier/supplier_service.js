(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    '_',
    supplierService
  ];

  angular.module('pc.BuyerSupplier')
    .factory('supplierService', definitions);

  function supplierService($window, _) {
    var
      supplier,
      self;

    supplier = $window.pc.localData.supplier ? _.cloneDeep($window.pc.localData.supplier) : {};

    self = {
      get: get,
      set: set,
      setAll: setAll
    };

    return self;

    function get(property) {
      return supplier[property];
    }

    function set(property, value) {
      supplier[property] = value;
    }

    function setAll(collection) {
      _.each(collection, function setAllSupplier(val, key) { set(key, val); });
    }
  }

})(angular);