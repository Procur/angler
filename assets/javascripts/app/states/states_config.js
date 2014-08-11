(function(angular) {
  var
    definition;

  definition = [
    '$stateProvider',
    '$urlRouterProvider',
    statesConfig
  ];

  angular.module('pc.States')
    .config(definition);

  function statesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard.html',
        controller: 'dashboardController',
        resolve: {
          user: ['$http', function resolveUser($http) {
            return $http.get('/views/api/user.json')
              .then(function(response) {
                return response.data;
              });
          }],
          company: ['$http', function resolveCompany($http) {
            return $http.get('/views/api/company.json')
              .then(function(response) {
                return response.data;
              });
          }]
        }
      })
      .state('userAccountSettings', {
        url: '/userAccountSettings',
        templateUrl: 'userAccountSettings.html',
        controller: 'userAccountSettingsController',
        abstract: true
      })
      .state('userAccountSettings.updateSettings', {
        url: '/updateSettings',
        templateUrl: 'userUpdateSettings.html',
        controller: 'userUpdateSettings'
      })
      .state('userAccountSettings.updatePassword', {
        url: '/updatePassword',
        templateUrl: 'userUpdatePassword.html',
        controller: 'userUpdatePassword'
      });
  }

})(angular);