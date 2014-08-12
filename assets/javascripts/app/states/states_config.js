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
      .state('user_account_settings', {
        url: '/user_account_settings',
        templateUrl: 'user_account_settings.html',
        controller: 'userAccountSettingsController',
        abstract: true
      })
      .state('user_account_settings.update_settings', {
        url: '/update_settings',
        templateUrl: 'user_update_settings.html',
        controller: 'userUpdateSettings'
      })
      .state('user_account_settings.update_password', {
        url: '/update_password',
        templateUrl: 'user_update_password.html',
        controller: 'userUpdatePassword'
      });
  }


})(angular);