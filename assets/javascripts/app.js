
// assets/javascripts/app/third_party/lodash_module.js
(function(angular) {

  var
    dependencies = [];

  angular.module('pc.thirdParty.LoDash', dependencies)
    .factory('_', lodashFactory);

  function lodashFactory() { return window._; }

})(angular);

// assets/javascripts/app/ajax/ajax_module.js
(function(global, angular) {

  var
    dependencies;

  dependencies = [];

  angular.module('pc.Ajax', dependencies);

})(window, angular);

// assets/javascripts/app/ajax/ajax_service.js
(function(angular) {
  var
    definition;

  definition = [
    '$http',
    ajaxService
  ];

  angular.module('pc.Ajax')
    .factory('ajaxService', definition);

  function ajaxService($http) {
    return {
      get: get,
      post: post,
      put: put,
      destroy: destroy
    };

    function get(endpoint) {
      return $http.get(endpoint)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function post(endpoint, data) {
      return $http.post(endpoint, data)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function put(endpoint, data) {
      return $http.put(endpoint, data)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function destroy(endpoint) {
      return $http['delete'](endpoint)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function resolveResponse(response) {
      return response.data;
    }

    function handleError(err) {
      console.log('There was an error!', err);
    }
  }

})(angular);

// assets/javascripts/app/company/company_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.Ajax'
  ];

  angular.module('pc.Company', dependencies);

})(angular);

// assets/javascripts/app/company/company_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    'ajaxService',
    companyService
  ];

  angular.module('pc.Company')
    .factory('companyService', definitions);

  function companyService(ajax) {
    var
      deferredCompany,
      company;

    return init;

    function init() {
      if (!deferredCompany) {
        deferredCompany = ajax.get('/views/api/company.json')
          .then(resolveCompany);
      }
      return deferredCompany;

      function resolveCompany(data) {
        company = data;
        return company;
      }
    }
  }

})(angular);

// assets/javascripts/app/user/user_module.js
(function(angular) {
  var
    dependencies;

  dependencies = [
    'pc.Ajax',
    'pc.Company'
  ];

  angular.module('pc.User', dependencies);

})(angular);

// assets/javascripts/app/user/user_header_directive.js
(function(angular) {

  var
    definitions;

  definitions = [
    userHeaderDirective
  ];

  angular.module('pc.User')
    .directive('pcUserHeader', definitions);

  function userHeaderDirective() {
    var
      definitions;

    definitions = [
      '$scope',
      'userService',
      'companyService',
      controller
    ];

    return {
      restrict: 'AC',
      controller: definitions,
      templateUrl: 'user_header.html',
      scope: {}
    };

    function controller($scope, user, company) {
      user().then(resolveUser);
      company().then(resolveCompany);

      function resolveUser(userProfile) {
        $scope.user = userProfile;
      }

      function resolveCompany(companyProfile) {
        $scope.company = companyProfile;
      }
    }

  }

})(angular);

// assets/javascripts/app/user/user_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    'ajaxService',
    userService
  ];

  angular.module('pc.User')
    .factory('userService', definitions);

  function userService(ajax) {
    var
      deferredUser,
      user;

    return init;

    function init() {
      if (!deferredUser) {
        deferredUser = ajax.get('/views/api/user.json')
          .then(resolveProfile);
      }
      return deferredUser;

      function resolveProfile(data) {
        user = data;

        if (user.activeMode === 'buyer') {
          user.inactiveMode = 'supplier';
        }
        else if (user.activeMode === 'supplier') {
          user.inactiveMode = 'buyer';
        }

        user.toggleActiveMode = toggleActiveMode;
        return user;
      }
    }

    function toggleActiveMode() {
      var
        active = user.activeMode,
        inactive = user.inactiveMode;

      user.activeMode = inactive;
      user.inactiveMode = active;
    }
  }

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
        if (toState.name.indexOf(scope.state) >= 0) {
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

  dependencies = [
    'pc.User'
  ];

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
    $scope.user.createdYear = new Date($scope.user.createdAt).getFullYear();

    $scope.company = company;
  }

})(angular);

// assets/javascripts/app/user_account_settings/user_account_settings_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.User'
  ];

  angular.module('pc.UserAccountSettings', dependencies);

})(angular);

// assets/javascripts/app/user_account_settings/user_account_settings_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'user',
    userAccountSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userAccountSettingsController', definitions);

  function userAccountSettingsController($scope, user) {
    $scope.user = user;

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
      })
      .state('user_account_settings', {
        url: '/user_account_settings',
        templateUrl: 'user_account_settings.html',
        controller: 'userAccountSettingsController',
        resolve: {
          user: user
        },
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

    function resolveUser(user) {
      return user();
    }

    function resolveCompany(company) {
      return company();
    }

  }


})(angular);

// assets/javascripts/app/templates_module.js
angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row dashboard\"><div class=\"col-xs-4\"><div class=\"row user-profile\"><div class=\"col-xs-4\"><img ng-src=\"{{user.image}}\"></div><div class=\"col-xs-8\"><h4 class=\"text-muted profile-name\">{{user.firstName}} {{user.lastName}}</h4><h5 class=\"company-name\">{{company.name}}</h5><h6 class=\"member-since\">Procur member since {{user.createdYear}}</h6></div></div><div class=\"row\"><div class=\"col-xs-12 sub-nav\"><ul class=\"list-separator\"><li><a ui-sref=\"#\"><i class=\"glyphicon glyphicon-cog\"></i> Edit User Account Settings</a></li><li><a ui-sref=\"#\"><i class=\"glyphicon glyphicon-new-window\"></i> View My Company Profile</a></li></ul></div></div><div class=\"row\"><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Company</li><li><a href=\"https://procur.com/earlyaccess\">Early Access</a></li><li><a href=\"https://procur.com/features\">Upcoming Features</a></li><li><a href=\"https://procur.com/pricing\">Membership & Pricing</a></li><li><a href=\"https://procur.com/about\">About Procur</a></li></ul></div><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Help & Support</li><li><a href=\"https://procur.com/faq\">FAQ</a></li><li><a href=\"https://procur.com/contact\">Contact Us</a></li><li><a href=\"https://procur.com/support\">Support Topics</a></li><li><a href=\"mailto:support@procur.com\">Email Support</a></li></ul></div></div></div><div class=\"col-xs-5\"><div class=\"panel-content action-items\"><div class=\"panel-heading\"><h5>My Procur Action Items</h5></div><div class=\"panel-body\"><p class=\"lead\">Welcome to Procur Early Access!</p><p>We're inviting select users to register with Procur before opening up our full platform later this summer. During Early Access, account holders will be able to create company profiles, organize products and RFQs, and start engaging with our online community. When we launch our full platform, Early Access suppliers will be the first to connect with global retailers, resellers and distributors looking to fill sourcing requirements.</p><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Learn more about early access</a></div><div class=\"panel-footer\"></div></div></div><div class=\"col-xs-2\"></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"dfd\"><a ui-sref=\"fdf\">View Company Profile</a></li><li pc-nav=\"dfd\"><a ui-sref=\"dfd\">Edit Company Profile</a></li><li pc-nav=\"user_account_settings\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li></ul></div><div class=\"navbar-header\"><span class=\"navbar-brand\">My Procur:</span></div></div></nav>"
  );


  $templateCache.put('user_header.html',
    "<div class=\"user-header clearfix\"><ul class=\"user-header-left\"><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><img src=\"/assets/images/procur.png\" class=\"procur-logo\"></a></li><li class=\"user-header-item\"><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Early Access</a></li><li class=\"user-header-item\"><p class=\"text-lowercase\">{{user.firstName}} {{user.lastName}}</p><p>·</p><p>{{company.name}}</p></li></ul><ul class=\"user-header-right\"><li class=\"user-header-item\" ng-if=\"company.buyer && company.supplier\"><button class=\"btn btn-link buyer-supplier-switch\" ng-click=\"user.toggleActiveMode()\">Currently in {{user.activeMode}} mode <i class=\"glyphicon glyphicon-transfer\"></i> Switch to {{user.inactiveMode}}</button></li><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li></ul></div>"
  );


  $templateCache.put('user_account_settings.html',
    "<div id=\"user_account_settings\"><div class=\"row main-row\"><div class=\"col-sm-4 nav-panel\"><ul><li pc-nav=\"update_settings\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"user_account_settings.update_settings\">Update Settings</a></li><li pc-nav=\"update_password\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"user_account_settings.update_password\">Change Password</a></li></ul></div><div ui-view=\"\"></div></div></div>"
  );


  $templateCache.put('user_update_password.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Update Password</h4></div><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label>Enter New Password</label><input type=\"text\" placeholder=\"First\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label>Confirm New Password</label><input type=\"text\" placeholder=\"Job Title\"></div></div></div><div class=\"row\"><button class=\"continue-button\" type=\"submit\">Save&nbsp;&nbsp; <span class=\"glyphicon glyphicon-ok\"></span></button></div></form></div>"
  );


  $templateCache.put('user_update_settings.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Contact Information</h4></div><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"name\">Contact Name*</label><input type=\"text\" id=\"firstName\" placeholder=\"First\" value=\"{{user.firstName}}\"> <input type=\"text\" id=\"lastName\" placeholder=\"Last\" value=\"{{user.lastName}}\"></div><div class=\"form-group\"><label>Current Email Address</label><input type=\"text\" placeholder=\"Current Email\" value=\"{{user.email}}\"></div><div class=\"form-group\"><label>Update Email Address</label><input type=\"text\" placeholder=\"Enter New Address\"> <input type=\"text\" placeholder=\"Confirm New Address\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label>Job Title</label><input type=\"text\" placeholder=\"Job Title\" value=\"{{user.jobTitle}}\"></div><div class=\"form-group\"><label>Update Profile Picture</label><input type=\"file\"></div></div></div><div class=\"row submit-button-row\"><button class=\"continue-button\" type=\"submit\">Save&nbsp;&nbsp; <span class=\"glyphicon glyphicon-ok\"></span></button></div></form></div>"
  );

}]);


// assets/javascripts/app/main_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.States',
    'pc.Templates',
    'pc.User',
    'pc.Company',
    'pc.Nav',
    'pc.Dashboard',
    'pc.UserAccountSettings'
  ];

  angular.module('pc.Main', dependencies);

})(angular);