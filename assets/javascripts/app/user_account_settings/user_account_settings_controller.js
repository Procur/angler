(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    userAccountSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userAccountSettingsController', definitions);

  function userAccountSettingsController($scope) {

  }

})(angular);