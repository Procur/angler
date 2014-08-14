(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    userAccountSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userAccountSettingsController', definitions);

  function userAccountSettingsController($scope, userService) {
    $scope.user = userService;
  }

})(angular);