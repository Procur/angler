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
    var
      user;

    user = [
      'userService',
      resolveUser
    ];

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard.html',
        controller: 'dashboardController',
        resolve: {
          user: user,
          company: ['$http', function resolveCompany($http) {
            return $http.get('/views/api/company.json')
              .then(function(response) {
                return response.data;
              });
          }]
        }
      });

    function resolveUser(userService) {
      return userService.init();
    }

  }

})(angular);