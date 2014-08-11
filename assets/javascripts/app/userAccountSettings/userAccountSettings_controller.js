(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'user',
    'company',
    userAccountSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userAccountSettingsController', definitions);

  function userAccountSettingsController($scope, user, company) {
    $scope.user = user;
    $scope.user.profile.createdYear = new Date(user.profile.createdDT).getFullYear();
    $scope.company = company;
  }

})(angular);