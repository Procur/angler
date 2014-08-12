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

    return {
      init: init,
      get: get,
      update: update
    };

    function init() {
      if (!deferredUser) {
        deferredUser = ajax.get('/views/api/user.json')
          .then(function resolveProfile(data) {
            user = data.profile;
            return get();
          });
        return deferredUser;
      }
      return deferredUser;
    }

    function get(field) {
      if (field) {
        return user[field];
      }
      return user;
    }

    function update(field, value) {
      if (field && value !== null && value !== undefined) {
        user[field] = value;
        return true;
      }
      return false;
    }
  }

})(angular);