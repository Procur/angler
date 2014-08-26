(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    '$rootScope',
    '_',
    'companyService',
    'USER_EVENTS',
    userService
  ];

  angular.module('pc.User')
    .factory('userService', definitions);

  function userService($window, $rootScope, _, company, USER_EVENTS) {
    var
      user,
      self;

    user = $window.pc.localData.user ? _.cloneDeep($window.pc.localData.user) : {};
    $window.pc.userModel = user;
    setInactiveMode();

    self = {
      get: get,
      set: set,
      setAll: setAll,
      setActiveMode: setActiveMode,
      toggleActiveMode: toggleActiveMode,
      isBuyerMode: isBuyerMode,
      isSupplierMode: isSupplierMode,
      activeMode: activeMode
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
      switch(mode) {
        case 'supplier':
          if (company.isSupplier()) {
            user.activeMode = mode;
            setInactiveMode();
          }
          break;
        case 'buyer':
          if (company.isBuyer()) {
            user.activeMode = mode;
            setInactiveMode();
          }
          break;
      }
    }

    function toggleActiveMode() {
      if (user.inactiveMode) {
        setActiveMode(user.inactiveMode);
        setInactiveMode();
        $rootScope.$broadcast(USER_EVENTS.ACTIVE_MODE_CHANGED, user.activeMode);
      }
    }

    function isBuyerMode() {
      return user.activeMode === 'buyer';
    }

    function isSupplierMode() {
      return user.activeMode === 'supplier';
    }

    function activeMode() {
      return user.activeMode;
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