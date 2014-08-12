
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
      company;

    return {
      init: init,
      get: get,
      update: update
    };

    function init() {
      if (!company) {
        return ajax.get('/views/api/company.json')
          .then(function resolveCompany(data) {
            company = data;
            return get();
          });
      }
      return get();
    }

    function get(field) {
      if (field) {
        return company[field];
      }
      return company;
    }

    function update(field, value) {
      if (field && value !== null && value !== undefined) {
        company[field] = value;
        return true;
      }
      return false;
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
      user.init().then(resolveUserName);
      company.init().then(resolveCompanyName);

      function resolveUserName(userProfile) {
        $scope.user = {
          name: userProfile.first_name + ' ' + userProfile.last_name
        };
      }

      function resolveCompanyName(companyProfile) {
        $scope.company = {
          name: companyProfile.name
        };
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

    return {
      init: init,
      get: get,
      update: update
    };

    function init() {
      if (!deferredUser) {
        deferredUser = ajax.get('/views/api/user.json')
          .then(function resolveProfile(data) {
            user = data.profile;
            return get();
          });
        return deferredUser;
      }
      return deferredUser;
    }

    function get(field) {
      if (field) {
        return user[field];
      }
      return user;
    }

    function update(field, value) {
      if (field && value !== null && value !== undefined) {
        user[field] = value;
        return true;
      }
      return false;
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
    $scope.user.createdYear = new Date($scope.user.createdDT).getFullYear();

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
      return user.init();
    }

    function resolveCompany(company) {
      return company.init();
    }

  }

})(angular);

// assets/javascripts/app/templates_module.js
angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row\"><div class=\"col-xs-5\"><div class=\"col-xs-4 user-profile\"><img ng-src=\"{{user.image}}\"></div><div class=\"col-xs-8\"><h3 class=\"text-muted profile-name\">{{user.first_name}} {{user.last_name}}</h3><h4 class=\"company-name\">{{company.name}}</h4><h5><strong>PROCUR MEMBER SINCE {{user.createdYear}}</strong></h5></div></div><div class=\"col-xs-5\"></div><div class=\"col-xs-2\"></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"\"><a ui-sref=\"#\">View Company Profile</a></li><li pc-nav=\"\"><a ui-sref=\"#\">Edit Company Profile</a></li><li pc-nav=\"\"><a ui-sref=\"#\">User Account Settings</a></li></ul></div><div class=\"navbar-header\"><span class=\"navbar-brand\">My Procur:</span></div></div></nav>"
  );


  $templateCache.put('user_header.html',
    "<div class=\"user-header row\"><div class=\"user-header-left\"><div class=\"col-md-1 user-header-item\"><a ui-sref=\"dashboard\"><img src=\"/assets/images/procur.png\" class=\"procur-logo\"></a></div><div class=\"col-md-1 user-header-item\"><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Early Access</a></div><div class=\"col-md-4 user-header-item\"><p class=\"text-lowercase\">{{user.name}}</p><p>·</p><p>{{company.name}}</p></div></div><div class=\"user-header-right\"><div class=\"col-md-1 user-header-item\"><a ui-sref=\"dashboard\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></div></div></div>"
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
    'pc.Dashboard'
  ];

  angular.module('pc.Main', dependencies);

})(angular);