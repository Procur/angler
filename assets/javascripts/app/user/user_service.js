(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    '_',
    'companyService',
    userService
  ];

  angular.module('pc.User')
    .factory('userService', definitions);

  function userService($window, _, company) {
    var
      user,
      self;

    user = $window.pc.localData.user ? _.cloneDeep($window.pc.localData.user) : {};
    setInactiveMode();

    self = {
      get: get,
      set: set,
      setAll: setAll,
      setActiveMode: setActiveMode,
      toggleActiveMode: toggleActiveMode,
      isBuyerMode: isBuyerMode,
      isSupplierMode: isSupplierMode,
    };

    return self;

    function get(property) {
      return user[property];
    }

    function set(property, value) {
      if (property !== 'inactiveMode' && property !== 'activeMode') {
        user[property] = value;
      }
    }

    function setAll(collection) {
      _.each(collection, function setAllUser(val, key) { set(key, val); });
    }

    function setActiveMode(mode) {
      if (mode === 'supplier' || mode === 'buyer') {
        user.activeMode = mode;
        setInactiveMode();
      }
    }

    function toggleActiveMode() {
      if (user.inactiveMode) {
        setActiveMode(user.inactiveMode);
        setInactiveMode();
      }
    }

    function isBuyerMode() {
      return user.activeMode === 'buyer';
    }

    function isSupplierMode() {
      return user.activeMode === 'supplier';
    }

    function setInactiveMode() {
      if (company.isBoth()) {
        if (user.activeMode === 'buyer') {
          user.inactiveMode = 'supplier';
        }
        else if (user.activeMode === 'supplier') {
          user.inactiveMode = 'buyer';
        }
      }
      else {
        user.inactiveMode = null;
      }
    }
  }

})(angular);