(function(angular) {

  var
    definitions;

  definitions = [
    'ajaxService',
    userService
  ];

  angular.module('pc.User')
    .factory('userService', definitions);

  function userService(ajax) {
    var
      deferredUser,
      user;

    return init;

    function init() {
      if (!deferredUser) {
        deferredUser = ajax.get('/views/api/user.json')
          .then(resolveProfile);
      }
      return deferredUser;

      function resolveProfile(data) {
        user = data;

        if (user.activeMode === 'buyer') {
          user.inactiveMode = 'supplier';
        }
        else if (user.activeMode === 'supplier') {
          user.inactiveMode = 'buyer';
        }

        user.toggleActiveMode = toggleActiveMode;
        return user;
      }
    }

    function toggleActiveMode() {
      var
        active = user.activeMode,
        inactive = user.inactiveMode;

      user.activeMode = inactive;
      user.inactiveMode = active;
    }
  }

})(angular);