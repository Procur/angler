(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    '_',
    companyService
  ];

  angular.module('pc.Company')
    .factory('companyService', definitions);

  function companyService($window, _) {
    var
      company,
      self;

    company = $window.pc.localData.company ? _.cloneDeep($window.pc.localData.company) : {};

    self = {
      get: get,
      set: set,
      setAll: setAll,
      isBuyer: isBuyer,
      isSupplier: isSupplier,
      isBoth: isBoth
    };

    return self;

    function get(property) {
      return company[property];
    }

    function set(property, value) {
      company[property] = value;
    }

    function setAll(collection) {
      _.each(collection, function setAllCompany(val, key) { set(key, val); });
    }

    function isBuyer() {
      return !!company.buyer;
    }

    function isSupplier() {
      return !!company.supplier;
    }

    function isBoth() {
      return isSupplier() && isBuyer();
    }
  }

})(angular);