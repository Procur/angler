
// assets/javascripts/app/third_party/lodash_module.js
(function(angular) {

  var
    dependencies = [];

  angular.module('pc.ThirdParty.LoDash', dependencies)
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

  ];

  angular.module('pc.Company', dependencies);

})(angular);

// assets/javascripts/app/company/company_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    companyService
  ];

  angular.module('pc.Company')
    .factory('companyService', definitions);

  function companyService($window) {
    var
      company;

    company = $window.pc.localData.company;

    return company;
  }

})(angular);

// assets/javascripts/app/buyer_supplier/buyer_supplier_module.js
(function(angular) {

  var
    dependencies = [];

  angular.module('pc.BuyerSupplier', dependencies);

})(angular);

// assets/javascripts/app/buyer_supplier/buyer_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    buyerService
  ];

  angular.module('pc.BuyerSupplier')
    .factory('buyerService', definitions);

  function buyerService($window) {
    var
      buyer;

    buyer = $window.pc.localData.buyer || {};

    return buyer;

  }

})(angular);

// assets/javascripts/app/buyer_supplier/supplier_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    supplierService
  ];

  angular.module('pc.BuyerSupplier')
    .factory('supplierService', definitions);

  function supplierService($window) {
    var
      supplier;

    supplier = $window.pc.localData.supplier || {};

    return supplier;

  }

})(angular);

// assets/javascripts/app/user/user_module.js
(function(angular) {
  var
    dependencies;

  dependencies = [
    'pc.ThirdParty.LoDash',
    'pc.Company',
    'pc.BuyerSupplier'
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
      $scope.user = user;
      $scope.company = company;
    }

  }

})(angular);

// assets/javascripts/app/user/user_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    'companyService',
    'buyerService',
    'supplierService',
    userService
  ];

  angular.module('pc.User')
    .factory('userService', definitions);

  function userService($window) {
    var
      user;

    user = $window.pc.localData.user;

    user.inactiveMode = setInactiveMode();
    user.toggleActiveMode = toggleActiveMode;
    user.isBuyerMode = isBuyerMode;
    user.isSupplierMode = isSupplierMode;

    return user;

    function toggleActiveMode() {
      var
        active = user.activeMode,
        inactive = user.inactiveMode;

      user.activeMode = inactive;
      user.inactiveMode = active;
    }

    function isBuyerMode() {
      return user.activeMode === 'buyer';
    }

    function isSupplierMode() {
      return user.activeMode === 'supplier';
    }

    function setInactiveMode() {
      if (user.activeMode === 'buyer') {
        return 'supplier';
      }
      else if (user.activeMode === 'supplier') {
        return 'buyer';
      }
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
    'pc.User',
    'pc.Company',
    'pc.BuyerSupplier'
  ];

  angular.module('pc.Dashboard', dependencies);

})(angular);

// assets/javascripts/app/dashboard/action_items_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    'userService',
    'companyService',
    'buyerService',
    'supplierService',
    actionItemsService
  ];

  angular.module('pc.Dashboard')
    .factory('actionItemsService', definitions);

  function actionItemsService(user, company, buyer, supplier) {
    return {
      get: get,
      activeMode: activeMode
    };

    function get() {
      var
        actionItems;

      actionItems = [
        {
          action: 'Upload a user photo',
          complete: !!user.image,
          type: {
            buyer: true,
            supplier: true
          },
          link: 'user_account_settings'
        },
        {
          action: 'Update your job title',
          complete: !!user.jobTitle,
          type: {
            buyer: true,
            supplier: true
          },
          link: 'user_account_settings'
        },
        {
          action: 'Add your company website',
          complete: !!company.website,
          type: {
            buyer: true,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your company description',
          complete: user.isBuyerMode() ? !!buyer.companyDescription : !!supplier.companyDescription,
          type: {
            buyer: true,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your company\'s Statements of Responsibility',
          complete: user.isBuyerMode() ?
            !!(buyer.responsibilityStatements.environmentalSustainability && buyer.responsibilityStatements.qualitySourcing && buyer.responsibilityStatements.workplaceSafety && buyer.responsibilityStatements.laborEducationTraining && buyer.responsibilityStatements.reinvestment) :
            !!(supplier.responsibilityStatements.environmentalSustainability && supplier.responsibilityStatements.qualitySourcing && supplier.responsibilityStatements.workplaceSafety && supplier.responsibilityStatements.laborEducationTraining && supplier.responsibilityStatements.reinvestment),
          type: {
            buyer: true,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your preferred buyer type',
          complete: !!supplier.tradePreferences.preferredBuyerType,
          type: {
            buyer: false,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your preferred supplier type',
          complete: !!buyer.tradePreferences.preferredSupplierType,
          type: {
            buyer: true,
            supplier: false
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your products of interest',
          complete: !!buyer.productCategories.length,
          type: {
            buyer: true,
            supplier: false
          },
          link: 'edit_company_profile'
        }
      ];

      return actionItems;
    }

    function activeMode() {
      return filterActiveMode;

      function filterActiveMode(actionItem) {
        return actionItem.type[user.activeMode];
      }
    }
  }
})(angular);

// assets/javascripts/app/dashboard/dashboard_controller.js
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
    $scope.user.createdYear = new Date($scope.user.createdAt).getFullYear();

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

// assets/javascripts/app/view_company_profile/view_company_profile_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.User'
  ];

  angular.module('pc.ViewCompanyProfile', dependencies);

})(angular);


// assets/javascripts/app/view_company_profile/view_company_profile_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    viewCompanyProfileController
  ];

  angular.module('pc.ViewCompanyProfile')
    .controller('viewCompanyProfileController', definitions);


  function viewCompanyProfileController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
  }








})(angular);


// assets/javascripts/app/user_account_settings/user_account_settings_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
  ];

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

// assets/javascripts/app/edit_company_profile/edit_company_profile_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.User'
  ];

  angular.module('pc.EditCompanyProfile', dependencies);

})(angular);

// assets/javascripts/app/edit_company_profile/company_details_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    companyDetailsController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('companyDetailsController', definitions);

  function companyDetailsController($scope) {

  }

})(angular);

// assets/javascripts/app/edit_company_profile/company_information_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    companyInformationController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('companyInformationController', definitions);

  function companyInformationController($scope) {

  }

})(angular);

// assets/javascripts/app/edit_company_profile/descriptions_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    descriptionsController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('descriptionsController', definitions);

  function descriptionsController($scope) {

  }

})(angular);

// assets/javascripts/app/edit_company_profile/edit_company_profile_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    editCompanyProfileController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('editCompanyProfileController', definitions);

  function editCompanyProfileController($scope) {
  }

})(angular);

// assets/javascripts/app/edit_company_profile/photos_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    photosController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('photosController', definitions);

  function photosController($scope) {

  }

})(angular);

// assets/javascripts/app/edit_company_profile/preferences_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    preferencesController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('preferencesController', definitions);

  function preferencesController($scope) {

  }

})(angular);

// assets/javascripts/app/edit_company_profile/production_details_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    productionDetailsController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('productionDetailsController', definitions);

  function productionDetailsController($scope) {

  }

})(angular);

// assets/javascripts/app/edit_company_profile/social_media_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    socialMediaController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('socialMediaController', definitions);

  function socialMediaController($scope) {

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
    $urlRouterProvider
      .otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard.html',
        controller: 'dashboardController'
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
      })

      /*TREY LOOK HERE*/
      .state('view_company_profile', {
        url: '/view_company_profile',
        templateURL: 'view_company_profile.html',
        controller: 'viewCompanyProfileController'
      })

      .state('edit_company_profile', {
        url: '/edit_company_profile',
        templateUrl: 'edit_company_profile.html',
        controller: 'editCompanyProfileController',
        abstract: true
      })
      .state('edit_company_profile.company_details', {
        url: '/company_details',
        templateUrl: 'company_details.html',
        controller: 'companyDetailsController'
      })
      .state('edit_company_profile.company_information', {
        url: '/company_information',
        templateUrl: 'company_information.html',
        controller: 'companyInformationController'
      })
      .state('edit_company_profile.production_details', {
        url: '/production_details',
        templateUrl: 'production_details.html',
        controller: 'productionDetailsController'
      })
      .state('edit_company_profile.descriptions', {
        url: '/descriptions',
        templateUrl: 'descriptions.html',
        controller: 'descriptionsController'
      })
      .state('edit_company_profile.preferences', {
        url: '/preferences',
        templateUrl: 'preferences.html',
        controller: 'preferencesController'
      })
      .state('edit_company_profile.social_media', {
        url: '/social_media',
        templateUrl: 'social_media.html',
        controller: 'socialMediaController'
      })
      .state('edit_company_profile.photos', {
        url: '/photos',
        templateUrl: 'photos.html',
        controller: 'photosController'
      });

  }


})(angular);


// assets/javascripts/app/templates_module.js
angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row dashboard\"><div class=\"col-xs-4\"><div class=\"row user-profile\"><div class=\"col-xs-4\"><img ng-src=\"{{user.image}}\"></div><div class=\"col-xs-8\"><h4 class=\"text-muted profile-name\">{{user.firstName}} {{user.lastName}}</h4><h5 class=\"company-name\">{{company.name}}</h5><h6 class=\"member-since\">Procur member since {{user.createdYear}}</h6></div></div><div class=\"row\"><div class=\"col-xs-12 sub-nav\"><ul class=\"list-separator\"><li><a ui-sref=\"user_account_settings.update_settings\"><span class=\"glyphicon glyphicon-cog\"></span> Edit User Account Settings</a></li><li><a ui-sref=\"#\"><span class=\"glyphicon glyphicon-user\"></span> View My Company Profile</a></li></ul></div></div><div class=\"row\"><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Company</li><li><a href=\"https://procur.com/earlyaccess\">Early Access</a></li><li><a href=\"https://procur.com/features\">Upcoming Features</a></li><li><a href=\"https://procur.com/pricing\">Membership & Pricing</a></li><li><a href=\"https://procur.com/about\">About Procur</a></li></ul></div><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Help & Support</li><li><a href=\"https://procur.com/faq\">FAQ</a></li><li><a href=\"https://procur.com/contact\">Contact Us</a></li><li><a href=\"https://procur.com/support\">Support Topics</a></li><li><a href=\"mailto:support@procur.com\">Email Support</a></li></ul></div></div></div><div class=\"col-xs-5\"><div class=\"panel-content action-items\"><div class=\"panel-heading\"><h5>My Procur Action Items</h5></div><div class=\"panel-body\"><p class=\"lead\">Welcome to Procur Early Access!</p><p>We're inviting select users to register with Procur before opening up our full platform later this summer. During Early Access, account holders will be able to create company profiles, organize products and RFQs, and start engaging with our online community. When we launch our full platform, Early Access suppliers will be the first to connect with global retailers, resellers and distributors looking to fill sourcing requirements.</p><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Learn more about early access</a></div><div class=\"panel-footer\"><ul class=\"list-checklist\"><li ng-repeat=\"item in actionItems | filter:activeModeFilter()\" ng-class=\"{complete: item.complete, incomplete: !item.complete}\"><span ng-switch=\"item.complete\"><span ng-switch-when=\"false\"><a ui-sref=\"{{item.link}}\"><span class=\"glyphicon glyphicon-unchecked\"></span><h5>{{item.action}}</h5></a></span> <span ng-switch-when=\"true\"><span class=\"glyphicon glyphicon-check\"></span><h5>{{item.action}}</h5></span></span></li></ul></div></div></div><div class=\"col-xs-3\"><h6 class=\"features-heading\">Currently Accessible:</h6><ul class=\"nav-panel\"><li><a ui-sref=\"edit_company_profile\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-user\"></span></div><h6>Company Profile</h6></a></li></ul><h6 class=\"features-heading\">Features coming soon:</h6><ul class=\"nav-panel\"><li ng-repeat=\"feature in comingSoon\" ng-mouseenter=\"feature.hover = true\" ng-mouseleave=\"feature.hover = false\"><a><div class=\"left-icon\"><span class=\"glyphicon {{feature.icon}}\"></span></div><h6>{{feature.hover ? feature.alt : feature.label}}</h6></a></li></ul></div></div>"
  );


  $templateCache.put('company_details.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Basic Company Details</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Company Name*</label><input type=\"text\" id=\"companyName\" placeholder=\"Company Name\" value=\"{{company.name}}\"></div><div class=\"form-group\"><label for=\"\">Company Phone*</label><input type=\"text\" placeholder=\"Country Code*\" value=\"{{company.phone.countryCode}}\"> <input type=\"text\" placeholder=\"Phone Number*\" value=\"{{company.phone.number}}\"> <input type=\"text\" placeholder=\"Ext. Number\" value=\"{{company.phone.extension}}\"></div><div class=\"form-group\"><label for=\"\">Company Fax</label><input type=\"text\" placeholder=\"Country Code\" value=\"{{company.fax.countryCode}}\"> <input type=\"text\" placeholder=\"Fax Number\" value=\"{{company.fax.number}}\"> <input type=\"text\" placeholder=\"Ext. Number\" value=\"{{company.fax.extension}}\"></div><div class=\"form-group\"><label for=\"email\">Company Email Address*</label><input type=\"text\" id=\"email\" placeholder=\"info@mycompanyname.com\" value=\"{{company.email}}\"></div><div class=\"form-group\"><label for=\"website\">Official Company Website</label><input type=\"text\" id=\"website\" placeholder=\"www.mycompanyname.com\" value=\"{{company.website}}\"></div><div class=\"form-group\"><label for=\"industry\">Industry*</label><input type=\"text\" id=\"industry\" placeholder=\"dropdown!\" value=\"\"><!-- change to dropdown --></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Official Business Address*</label><input type=\"text\" placeholder=\"Address Line #1\" value=\"{{company.addresses.primary['address-1']}}\"> <input type=\"text\" placeholder=\"Address Line #2\" value=\"{{company.addresses.primary['address-2']}}\"> <input type=\"text\" placeholder=\"Select Country\" value=\"{{company.addresses.primary.country}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"{{company.addresses.primary.state}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" value=\"{{company.addresses.primary.city}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Postal Code\" value=\"{{company.addresses.primary.postalCode}}\"></div><div class=\"form-group\"><label for=\"\">Is the above address a headquarters?</label><input type=\"checkbox\" name=\"\"><span>Yes; please copy address below.</span></div><div class=\"form-group\"><label for=\"\">Company Headquarters Address*</label><input type=\"text\" placeholder=\"Address Line #1\" value=\"{{company.addresses.headquarters['address-1']}}\"> <input type=\"text\" placeholder=\"Address Line #2\" value=\"{{company.addresses.headquarters['address-2']}}\"> <input type=\"text\" placeholder=\"Select Country\" value=\"{{company.addresses.headquarters.country}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"{{company.addresses.headquarters.state}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" value=\"{{company.addresses.headquarters.city}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Postal Code\" value=\"{{company.addresses.headquarters.postalCode}}\"></div><div class=\"form-group\"><label for=\"employeeCount\">Total Number of Employees*</label><input type=\"text\" id=\"employeeCount\" placeholder=\"dropdown!\" value=\"\"><!-- change to dropdown --></div></div></div></form></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div></div>"
  );


  $templateCache.put('company_information.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>[activeMode] Information</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Logo Image</label><img ng-src=\"http://res.cloudinary.com/huewqecyr/image/upload/v1404414400/dhemkcar246mvbm8wmcs.jpg\"> <input type=\"file\"> <input type=\"submit\" value=\"Update Logo Image\"></div><div class=\"form-group\"><label for=\"\">Type of Company</label><input type=\"text\" placeholder=\"City\" value=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Contact Name</label><input type=\"text\" id=\"\" placeholder=\"Contact Name\" value=\"\"></div><div class=\"form-group\"><label for=\"\">Contact Position</label><input type=\"text\" id=\"\" placeholder=\"Contact Position\" value=\"\"></div><div class=\"form-group\"><label for=\"\">Contact Email</label><input type=\"text\" id=\"\" placeholder=\"Contact Email\" value=\"\"></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">Private Labeler</label><input type=\"checkbox\" id=\"\" placeholder=\"Private Labeler\" value=\"\"><span>Private labeling</span></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">GSA Approved Supplier</label><input type=\"checkbox\" id=\"\" placeholder=\"GSA Approved Supplier\" value=\"\"><span>GSA Approved Supplier</span></div><div class=\"form-group\"><label for=\"\">DUNS Number</label><input type=\"text\" id=\"\" placeholder=\"DUNS Number\" value=\"\"></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">CAGE Code</label><input type=\"text\" id=\"\" placeholder=\"CAGE Code\" value=\"\"></div><div class=\"form-group\"><!-- BUYER ONLY --><label for=\"\">Secondary Location</label><input type=\"text\" placeholder=\"Location Title\" value=\"\"> <input type=\"text\" placeholder=\"Select Location Type\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Country\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" value=\"\"></div><div class=\"form-group\"><!-- BUYER ONLY --><label for=\"\">Nearest Port</label><input type=\"text\" placeholder=\"City\" value=\"\"> <input type=\"text\" placeholder=\"Select Country\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"\"><!-- change to dropdown --></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">DBA Name</label><input type=\"text\" placeholder=\"Alternate Company Name\" value=\"\"></div><div class=\"form-group\"><label for=\"\">Language*</label><input type=\"text\" placeholder=\"Select Language\" value=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Accepted Currencies*</label><div class=\"col-md-6\"><input type=\"checkbox\"><span>USD</span> <input type=\"checkbox\"><span>JPY</span> <input type=\"checkbox\"><span>AUD</span> <input type=\"checkbox\"><span>CAD</span> <input type=\"checkbox\"><span>CNY</span> <input type=\"checkbox\"><span>SEK</span> <input type=\"checkbox\"><span>HKD</span></div><div class=\"col-md-6\"><input type=\"checkbox\"><span>EUR</span> <input type=\"checkbox\"><span>GBP</span> <input type=\"checkbox\"><span>CHF</span> <input type=\"checkbox\"><span>MXN</span> <input type=\"checkbox\"><span>NZD</span> <input type=\"checkbox\"><span>RUB</span> <input type=\"checkbox\"><span>SGD</span></div></div><div class=\"form-group\"><label for=\"\">Accepted Payment Terms*</label><div class=\"col-md-6\"><input type=\"checkbox\"><span>MoneyGram</span> <input type=\"checkbox\"><span>T/T</span> <input type=\"checkbox\"><span>Escrow</span> <input type=\"checkbox\"><span>D/P D/A</span></div><div class=\"col-md-6\"><input type=\"checkbox\"><span>Western Union</span> <input type=\"checkbox\"><span>Credit Card</span> <input type=\"checkbox\"><span>PayPal</span> <input type=\"checkbox\"><span>Cash</span></div></div><div class=\"form-group\"><label for=\"\">Accepted Delivery Terms</label><div class=\"col-md-6\"><input type=\"checkbox\"><span>EXW</span> <input type=\"checkbox\"><span>CPT</span> <input type=\"checkbox\"><span>DAT</span> <input type=\"checkbox\"><span>DDP</span> <input type=\"checkbox\"><span>FOB</span> <input type=\"checkbox\"><span>CIF</span></div><div class=\"col-md-6\"><input type=\"checkbox\"><span>FCA</span> <input type=\"checkbox\"><span>CIP</span> <input type=\"checkbox\"><span>DAP</span> <input type=\"checkbox\"><span>FAS</span> <input type=\"checkbox\"><span>CFR</span> <input type=\"checkbox\"><span>Custom</span></div></div></div><div class=\"col-md-12\"><div class=\"form-group\"><label for=\"\">Enter Product Categories of Interest</label><input type=\"text\" placeholder=\"Begin typing to search categories...\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Begin typing to search categories...\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Begin typing to search categories...\" value=\"\"><!-- change to dropdown --></div></div></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('descriptions.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Descriptions</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('edit_company_profile.html',
    "<div class=\"row main-row\"><div class=\"col-sm-4\"><ul class=\"nav-panel\"><li pc-nav=\"company_details\"><a ui-sref=\"edit_company_profile.company_details\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-user\"></i></div><h6>Company Details</h6></a></li><li pc-nav=\"company_information\"><a ui-sref=\"edit_company_profile.company_information\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-info-sign\"></i></div><h6>[activeMode] Information</h6></a></li><li pc-nav=\"production_details\"><a ui-sref=\"edit_company_profile.production_details\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-wrench\"></i></div><h6>Production Details</h6></a></li><li pc-nav=\"descriptions\"><a ui-sref=\"edit_company_profile.descriptions\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-list-alt\"></i></div><h6>Descriptions</h6></a></li><li pc-nav=\"preferences\"><a ui-sref=\"edit_company_profile.preferences\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-cog\"></i></div><h6>Preferences</h6></a></li><li pc-nav=\"social_media\"><a ui-sref=\"edit_company_profile.social_media\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-thumbs-up\"></i></div><h6>Social Media</h6></a></li><li pc-nav=\"photos\"><a ui-sref=\"edit_company_profile.photos\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-picture\"></i></div><h6>[activeMode] Photos</h6></a></li></ul></div><div ui-view></div></div>"
  );


  $templateCache.put('photos.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Photos</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('preferences.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Preferences</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('production_details.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Production Details</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('social_media.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Social Media</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('user_header.html',
    "<div class=\"user-header clearfix hidden-xs\"><ul class=\"user-header-left\"><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><img src=\"/assets/images/procur.png\" class=\"procur-logo\"></a></li><li class=\"user-header-item\"><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Early Access</a></li><li class=\"user-header-item\"><p class=\"text-lowercase\">{{user.firstName}} {{user.lastName}}</p><p>·</p><p>{{company.name}}</p></li></ul><ul class=\"user-header-right\"><li class=\"user-header-item\" ng-if=\"company.buyer && company.supplier\"><button class=\"btn btn-link buyer-supplier-switch\" ng-click=\"user.toggleActiveMode()\">Currently in {{user.activeMode}} mode <span class=\"glyphicon glyphicon-transfer\"></span> Switch to {{user.inactiveMode}}</button></li><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><span class=\"glyphicon glyphicon-log-out\"></span> Logout</a></li></ul></div><div id=\"mobile-nav\" class=\"mobile-header hidden-sm hidden-md hidden-lg\"><!-- Mobile --><nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#nav-links\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button><div class=\"ea-logo\"><a class=\"logo-image logo-mobile\" id=\"mobile-fix\" href=\"/\"><img src=\"/assets/images/procur.png\"></a> <a href=\"https://procur.com/earlyaccess\" class=\"early-access logo-mobile\">Early Access</a></div></div><div class=\"collapse navbar-collapse\" id=\"nav-links\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"fdf\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"dfd\"><a ui-sref=\"fdf\">View Company Profile</a></li><li pc-nav=\"gg\"><a ui-sref=\"edit_company_profile.company_details\">Edit Company Profile</a></li><li pc-nav=\"dfd\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li><li class=\"divider\"></li><li class=\"divider\"></li><li><a ui-sref=\"dashboard\">LOGOUT</a></li></ul></div></div></nav></div><nav class=\"navbar navbar-default hidden-xs\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"collapse navbar-collapse hidden-sm hidden-md hidden-lg\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"dfd\"><a ui-sref=\"fdf\">View Company Profile</a></li><li pc-nav=\"edit_company_profile\"><a ui-sref=\"edit_company_profile.company_details\">Edit Company Profile</a></li><li pc-nav=\"user_account_settings\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li></ul></div><div class=\"navbar-header\"><span class=\"navbar-brand\">My Procur:</span></div></div></nav>"
  );


  $templateCache.put('user_account_settings.html',
    "<div id=\"user_account_settings\"><div class=\"row main-row\"><div class=\"col-sm-4\"><ul class=\"nav-panel\"><li pc-nav=\"update_settings\"><a ui-sref=\"user_account_settings.update_settings\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-cog\"></i></div><h6>Update settings</h6></a></li><li pc-nav=\"update_password\"><a ui-sref=\"user_account_settings.update_password\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-lock\"></i></div><h6>Change password</h6></a></li></ul></div><div ui-view></div></div></div>"
  );


  $templateCache.put('user_update_password.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Update Password</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"password\">Enter New Password</label><input id=\"password\" type=\"password\" placeholder=\"New Password\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"confirmPassword\">Confirm New Password</label><input id=\"confimPassword\" type=\"password\" placeholder=\"Confirm Password\"></div></div></div></form></div></div><button class=\"btn continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('user_update_settings.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Contact Information</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"firstName\">Contact Name*</label><input type=\"text\" id=\"firstName\" placeholder=\"First\" ng-model=\"user.firstName\"> <input type=\"text\" id=\"lastName\" placeholder=\"Last\" ng-model=\"user.lastName\"></div><div class=\"form-group\"><label for=\"emailAddress\">Current Email Address</label><input for=\"emailAddress\" type=\"email\" placeholder=\"Current Email\" ng-model=\"user.email\"></div><div class=\"form-group\"><label for=\"newEmailAddress\">Update Email Address</label><input id=\"newEmailAddress\" type=\"email\" placeholder=\"Enter New Address\"> <input type=\"email\" placeholder=\"Confirm New Address\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"jobTitle\">Job Title</label><input id=\"jobTitle\" type=\"text\" placeholder=\"Job Title\" ng-model=\"user.jobTitle\"></div><div class=\"form-group\"><label>Update Profile Picture</label><input type=\"file\"></div></div></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('view_company_profile.html',
    "<div class=\"row company-profile\"><div class=\"col-sm-12 col-md-4\"><!--IMAGE PLACEHOLDER--><div class=\"company-header\"><h2><span>buyer or supplier...</span></h2><h1>company name...</h1></div><div class=\"company-info-box company-business-address\"><h3><i class=\"fa fa-fw fa-map-marker\"></i> <span class=\"info-title\">Official Business Address</span></h3><p>info...</p><p>info...</p><p>info...</p><p>info...</p><p>info...</p></div><div class=\"company-info-box\"><h3><i class=\"fa fa-fw fa-phone\"></i></h3><p>Telephone #...</p></div><div class=\"company-info-box\"><h3><i class=\"fa fa-fw fa-location-arrow\"></i> <span class=\"info-title\">Company Email Address</span></h3><p>Email...</p></div><div class=\"company-info-box\"><h3><i class=\"fa fa-fw fa-location-arrow\"></i> <span class=\"info-title\">Company Website</span></h3><p>Website...</p></div><div class=\"company-detail-box\"><h3><span>Product Categories</span></h3><p>Water Treatment</p></div><div class=\"company-two-col-box\"><h3><span>Buyer or Suppliear Deets.....</span></h3><div class=\"company-col-left\"><div class=\"company-col-detail\"><p class=\"detail-header\">Type of Company</p><p class=\"detail-body\">buyer or supplier...</p></div><div class=\"company-col-detail\"><p class=\"detail-header\">Total # of Employees</p><p class=\"detail-body\">number....</p></div><div class=\"company-col-detail\"><p class=\"detail-header\">Industry</p><p class=\"detail-body\">industry...</p></div><div class=\"company-col-detail\"><p class=\"detail-header\">Languages</p><p class=\"detail-body\">language.....</p></div><div class=\"company-col-detail\"><p class=\"detail-header\">DUNS Number</p><p class=\"detail-body\">number....</p></div></div><div class=\"company-col-right\"><div class=\"company-col-detail\"><p class=\"detail-header\">Links</p><p class=\"detail-body\">link to website...</p></div></div></div></div><div class=\"col-sm-12 col-md-7 col-lg-8 pull-right hidden-xs\"><div class=\"profile-nav\"><ul><div class=\"nav-left\"><li>About</li></div></ul></div><!--PLACEHOLDER for dynamic content--></div></div>"
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
    'pc.UserAccountSettings',
    'pc.EditCompanyProfile',
    'pc.ViewCompanyProfile'
  ];

  angular.module('pc.Main', dependencies);

})(angular);
