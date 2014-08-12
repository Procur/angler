(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'user',
    userAccountSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userAccountSettingsController', definitions);

  function userAccountSettingsController($scope, user) {
    $scope.user = user;

  }

})(angular);