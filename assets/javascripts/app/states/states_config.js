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
      user,
      company;

    user = [
      'userService',
      resolveUser
    ];

    company = [
      'companyService',
      resolveCompany
    ];

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard.html',
        controller: 'dashboardController',
        resolve: {
          user: user,
          company: company
        }
      });

    function resolveUser(user) {
      return user();
    }

    function resolveCompany(company) {
      return company();
    }

  }

})(angular);