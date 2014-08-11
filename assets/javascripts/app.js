
// assets/javascripts/app/third_party/lodash_module.js
(function(angular) {

  var
    dependencies = [];

  angular.module('pc.third_party.LoDash', dependencies)
    .factory('_', lodashFactory);

  function lodashFactory() { return window._; }

})(angular);

// assets/javascripts/app/nav/nav_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [];

   angular.module('pc.Nav', dependencies);

})(angular);

// assets/javascripts/app/nav/nav_directive.js
(function(angular) {

  var
    definitions;

  definitions = [
    navDirective
  ];

  angular.module('pc.Nav')
    .directive('pcNav', definitions);

  function navDirective() {

    return {
      restrict: 'AC',
      link: linker,
      scope: {
        state: '@pcNav'
      }
    };

    function linker(scope, element, attrs) {
      scope.$on('$stateChangeSuccess', setActiveNav);

      function setActiveNav(event, toState, toParams, fromState, fromParams) {
        if (toState.name === scope.state) {
          element.addClass('active');
        }
        else {
          element.removeClass('active');
        }
      }
    }

  }

})(angular);

// assets/javascripts/app/dashboard/dashboard_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [];

  angular.module('pc.Dashboard', dependencies);

})(angular);

// assets/javascripts/app/dashboard/dashboard_controller.js
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

// assets/javascripts/app/userAccountSettings/userAccountSettings_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [];

  angular.module('pc.UserAccountSettings', dependencies);

})(angular);

// assets/javascripts/app/userAccountSettings/userAccountSettings_controller.js
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

// assets/javascripts/app/states/states_module.js
(function(angular) {
  var
    dependencies;

  dependencies = [
    'ui.router'
  ];

  angular.module('pc.States', dependencies);

})(angular);

// assets/javascripts/app/states/states_config.js
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
        controller: 'userAccountSettingsController'
      });
  }

})(angular);

// assets/javascripts/app/templates_module.js
angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row\"><div class=\"col-xs-5\"><div class=\"col-xs-4 user-profile\"><img ng-src=\"{{user.profile.image}}\"></div><div class=\"col-xs-8\"><h3 class=\"text-muted profile-name\">{{user.profile.name}}</h3><h4 class=\"company-name\">{{company.name}}</h4><h5><strong>PROCUR MEMBER SINCE {{user.profile.createdYear}}</strong></h5></div></div><div class=\"col-xs-5\"></div><div class=\"col-xs-2\"></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\">My Procur</a></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"\"><a ui-sref=\"#\">View Company Profile</a></li><li pc-nav=\"\"><a ui-sref=\"#\">Edit Company Profile</a></li><li pc-nav=\"userAccountSettings\"><a ui-sref=\"userAccountSettings\">User Account Settings</a></li></ul></div></div></nav>"
  );


  $templateCache.put('userAccountSettings.html',
    "<div class=\"row\"><div class=\"col-sm-4\"><ul class=\"ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\" role=\"tablist\"><li>Update Settings</li><li>Change Password</li></ul></div><div class=\"col-sm-8\"><div class=\"row\">Contact Information</div><div class=\"row\"><div class=\"col-md-6\"><h4>Contact Name*</h4><input> <input><h4>Current Email Address</h4><input><h4>Update Email Address</h4><input> <input></div><div class=\"col-md-6\"><h4>Job Title</h4><input><h4>Update Profile Picture</h4><input type=\"file\"></div></div></div></div>"
  );

}]);


// assets/javascripts/app/main_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.States',
    'pc.Templates',
    'pc.Nav',
    'pc.Dashboard',
    'pc.UserAccountSettings'
  ];

  angular.module('pc.Main', dependencies);

})(angular);