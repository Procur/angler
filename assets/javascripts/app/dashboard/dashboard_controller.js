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
    $scope.company = company;

    $scope.actionItems = actionItems.get();
    $scope.activeModeFilter = actionItems.activeMode;

    $scope.comingSoon = [
      {
        label: 'Company photos',
        icon: 'glyphicon-camera',
        alt: 'Coming soon'
      },
      {
        label: 'Supplier capabilities',
        icon: 'glyphicon-tags',
        alt: 'Coming soon'
      },
      {
        label: 'Downloadable files',
        icon: 'glyphicon-download-alt',
        alt: 'Coming soon'
      },
      {
        label: 'Community resources',
        icon: 'glyphicon-comment',
        alt: 'Coming soon'
      },
      {
        label: 'Product profiles',
        icon: 'glyphicon-picture',
        alt: 'Coming soon'
      },
    ];
  }

})(angular);