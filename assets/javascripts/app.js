
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

// assets/javascripts/app/nav/user_header_directive.js
(function(angular) {

  var
    definitions;

  definitions = [
    userHeaderDirective
  ];

  angular.module('pc.Nav')
    .directive('pcUserHeader', definitions);

  function userHeaderDirective() {
    var
      definitions;

    definitions = [
      '$scope',
      controller
    ];

    return {
      restrict: 'AC',
      controller: definitions,
      templateUrl: 'user_header.html'
    };

    function controller($scope) {
      $scope.user = {
        name: 'Chris Hourihan'
      };

      $scope.company = {
        name: 'Chris-test'
      };
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

// assets/javascripts/app/user_account_settings/user_account_settings_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [];

  angular.module('pc.UserAccountSettings', dependencies);

})(angular);

// assets/javascripts/app/user_account_settings/user_account_settings_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    userAccountSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userAccountSettingsController', definitions);

  function userAccountSettingsController($scope) {
  }

})(angular);

// assets/javascripts/app/user_account_settings/user_update_password_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    userUpdatePassword
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdatePassword', definitions);

  function userUpdatePassword($scope) {
    
  }

})(angular);

// assets/javascripts/app/user_account_settings/user_update_settings_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    userUpdateSettings
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdateSettings', definitions);

  function userUpdateSettings($scope) {
    
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

// assets/javascripts/app/templates_module.js
angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row\"><div class=\"col-xs-5\"><div class=\"col-xs-4 user-profile\"><img ng-src=\"{{user.profile.image}}\"></div><div class=\"col-xs-8\"><h3 class=\"text-muted profile-name\">{{user.profile.name}}</h3><h4 class=\"company-name\">{{company.name}}</h4><h5><strong>PROCUR MEMBER SINCE {{user.profile.createdYear}}</strong></h5></div></div><div class=\"col-xs-5\"></div><div class=\"col-xs-2\"></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"\"><a ui-sref=\"#\">View Company Profile</a></li><li pc-nav=\"\"><a ui-sref=\"#\">Edit Company Profile</a></li><li pc-nav=\"user_account_settings.update_settings\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li></ul></div><div class=\"navbar-header\"><span class=\"navbar-brand\">My Procur:</span></div></div></nav>"
  );


  $templateCache.put('user_header.html',
    "<div class=\"user-header row\"><div class=\"user-header-left\"><div class=\"col-md-1 user-header-item\"><a ui-sref=\"dashboard\"><img src=\"/assets/images/procur.png\" class=\"procur-logo\"></a></div><div class=\"col-md-1 user-header-item\"><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Early Access</a></div><div class=\"col-md-2 user-header-item\"><p class=\"text-lowercase\">{{user.name}}</p><p>·</p><p>{{company.name}}</p></div></div><div class=\"user-header-right\"><div class=\"col-md-1 user-header-item\"><a ui-sref=\"dashboard\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></div></div></div>"
  );


  $templateCache.put('user_account_settings.html',
    "<div id=\"user_account_settings\"><div class=\"row main_row\"><div class=\"col-sm-4 navPanel\"><ul><li><div class=\"rightSecBox\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"user_account_settings.update_settings\">Update Settings</a></li><li><div class=\"rightSecBox\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"user_account_settings.update_password\">Change Password</a></li></ul></div><div ui-view=\"\"></div></div></div>"
  );


  $templateCache.put('user_update_password.html',
    "<div class=\"col-sm-8\"><div class=\"row headerRow\"><h4>Update Password</h4></div><div class=\"row updateForm\"><div class=\"col-md-6\"><h5>Enter New Password</h5><input type=\"text\" placeholder=\"First\"><br></div><div class=\"col-md-6\"><h5>Confirm New Password</h5><input type=\"text\" placeholder=\"Job Title\"><br></div></div></div>"
  );


  $templateCache.put('user_update_settings.html',
    "<div class=\"col-sm-8 pcUpdateForm\"><div class=\"row headerRow\"><h4>Contact Information</h4></div><div class=\"row updateForm\"><div class=\"col-md-6\"><h5>Contact Name*</h5><input type=\"text\" placeholder=\"First\"> <input type=\"text\" placeholder=\"Last\"><br><h5>Current Email Address</h5><input type=\"text\" placeholder=\"Current Email\"><br><h5>Update Email Address</h5><input type=\"text\" placeholder=\"Enter New Address\"> <input type=\"text\" placeholder=\"Confirm New Address\"><br></div><div class=\"col-md-6\"><h5>Job Title</h5><input type=\"text\" placeholder=\"Job Title\"><br><h5>Update Profile Picture</h5><input type=\"file\"></div></div><div class=\"row\"><button class=\"continueButton\" type=\"submit\">Save&nbsp;&nbsp; <span class=\"glyphicon glyphicon-ok\"></span></button></div></div>"
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