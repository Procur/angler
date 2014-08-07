(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'user',
    'company',
    dashboardController
  ];

  angular.module('pc.Dashboard')
    .controller('dashboardController', definitions);

  function dashboardController($scope, user, company) {
    $scope.user = user;
    $scope.user.profile.createdYear = new Date(user.profile.createdDT).getFullYear();
    $scope.company = company;
  }

})(angular);