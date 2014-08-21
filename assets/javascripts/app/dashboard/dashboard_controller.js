(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$filter',
    'userService',
    'companyService',
    'actionItemsService',
    dashboardController
  ];

  angular.module('pc.Dashboard')
    .controller('dashboardController', definitions);

  function dashboardController($scope, $filter, user, company, actionItems) {
    $scope.user = {
      firstName: user.get('firstName'),
      lastName: user.get('lastName'),
      image: user.get('image'),
      createdYear: $filter('date')(user.get('createdAt'), 'yyyy')
    };

    $scope.company = {
      name: company.get('name')
    };

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