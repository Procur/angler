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
      setAll: setAll
    };

    return self;

    function get(property) {
      return company[property];
    }

    function set(property, value) {
      company[property] = value;
    }

    function setAll(collection) {
      _.each(collection, function(val, key) { set(key, val); });
    }
  }

})(angular);