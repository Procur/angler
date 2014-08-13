(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    'companyService',
    'buyerService',
    'supplierService',
    userService
  ];

  angular.module('pc.User')
    .factory('userService', definitions);

  function userService($window) {
    var
      user;

    user = $window.pc.localData.user;

    user.inactiveMode = setInactiveMode();
    user.toggleActiveMode = toggleActiveMode;
    user.isBuyerMode = isBuyerMode;
    user.isSupplierMode = isSupplierMode;

    return user;

    function toggleActiveMode() {
      var
        active = user.activeMode,
        inactive = user.inactiveMode;

      user.activeMode = inactive;
      user.inactiveMode = active;
    }

    function isBuyerMode() {
      return user.activeMode === 'buyer';
    }

    function isSupplierMode() {
      return user.activeMode === 'supplier';
    }

    function setInactiveMode() {
      if (user.activeMode === 'buyer') {
        return 'supplier';
      }
      else if (user.activeMode === 'supplier') {
        return 'buyer';
      }
    }
  }

})(angular);