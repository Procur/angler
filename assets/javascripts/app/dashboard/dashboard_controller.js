(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    'actionItemsService',
    dashboardController
  ];

  angular.module('pc.Dashboard')
    .controller('dashboardController', definitions);

  function dashboardController($scope, user, company, actionItems) {
    $scope.user = user;
    $scope.user.createdYear = new Date($scope.user.createdAt).getFullYear();

    $scope.company = company;

    $scope.actionItems = actionItems.get();
    $scope.activeModeFilter = actionItems.activeMode;
  }

})(angular);