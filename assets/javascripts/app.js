
// assets/javascripts/app/third_party/lodash_module.js
(function(angular) {

  var
    dependencies = [],
    factoryDefinition;

  factoryDefinition = [
    '$window',
    lodash
  ];

  angular.module('pc.ThirdParty.LoDash', dependencies)
    .factory('_', factoryDefinition);

  function lodash($window) { return $window._; }

})(angular);

// assets/javascripts/app/third_party/moxie_module.js
(function(angular) {
  /**
  * mOxie provides a polyfill for doing XHR and File uploads that is cross-browser (read IE9 and below) compatible
  * https://github.com/moxiecode/moxie/wiki/API
  */


  var
    dependencies = [],
    moxieDefinition,
    fileInputDefinition,
    fileDropDefinition,
    fileReaderDefinition,
    formDataDefinition,
    xhrDefinition;

  moxieDefinition = [
    '$window',
    moxie
  ];

  fileInputDefinition = [
    'moxie',
    fileInput
  ];

  fileDropDefinition = [
    'moxie',
    fileDrop
  ];

  fileReaderDefinition = [
    'moxie',
    fileReader
  ];

  formDataDefinition = [
    'moxie',
    formData
  ];

  xhrDefinition = [
    'moxie',
    xhr
  ];

  angular.module('pc.ThirdParty.Moxie', dependencies)
    .factory('moxie', moxieDefinition)
    .factory('FileInput', fileInputDefinition)
    .factory('FileDrop', fileDropDefinition)
    .factory('FileReader', fileReaderDefinition)
    .factory('FormData', formDataDefinition)
    .factory('Xhr', xhrDefinition);

  function moxie($window) {
    $window.mOxie.Env.swf_url = './Moxie.swf';
    $window.mOxie.Env.xap_url = './Moxie.xap';

    return $window.mOxie;
  }

  function fileInput(moxie) { return moxie.FileInput; }
  function fileDrop(moxie) { return moxie.FileDrop; }
  function fileReader(moxie) { return moxie.FileReader; }
  function formData(moxie) { return moxie.FormData; }
  function xhr(moxie) { return moxie.XMLHttpRequest; }

})(angular);

// assets/javascripts/app/third_party/plupload_module.js
(function(angular) {

  var
    dependencies = [],
    factoryDefinition;

  factoryDefinition = [
    '$window',
    plupload
  ];

  angular.module('pc.ThirdParty.Plupload', dependencies)
    .factory('plupload', factoryDefinition);

  function plupload($window) { return $window.plupload; }

})(angular);

// assets/javascripts/app/ajax/ajax_module.js
(function(global, angular) {

  var
    dependencies;

  dependencies = [
    'pc.ThirdParty.LoDash',
    'pc.ThirdParty.Moxie'
  ];

  angular.module('pc.Ajax', dependencies)
    .constant('XHR_METHOD', {
      POST: 'POST',
      GET: 'GET',
      PUT: 'PUT',
      DELETE: 'DELETE'
    });

})(window, angular);

// assets/javascripts/app/ajax/ajax_service.js
(function(angular) {
  var
    definition;

  definition = [
    '$q',
    '_',
    'FormData',
    'Xhr',
    'XHR_METHOD',
    ajaxService
  ];

  angular.module('pc.Ajax')
    .factory('ajaxService', definition);

  function ajaxService($q, _, FormData, Xhr, XHR_METHOD) {
    return {
      get: get,
      post: post,
      put: put,
      destroy: destroy
    };

    function get(endpoint) {
      return ajax(XHR_METHOD.GET, endpoint)
        .catch(onXhrError);
    }

    function post(endpoint, postData) {
      return ajax(XHR_METHOD.POST, endpoint, postData)
        .catch(onXhrError);
    }

    function put(endpoint, putData) {
      return ajax(XHR_METHOD.PUT, endpoint, putData)
        .catch(onXhrError);
    }

    function destroy(endpoint) {
      return ajax(XHR_METHOD.DELETE, endpoint)
        .catch(onXhrError);
    }

    function ajax(method, endpoint, data) {
      var
        deferred = $q.defer(),
        xhr = new Xhr(),
        formData = new FormData();

      xhr.bind('load', onComplete);
      xhr.bind('error', onComplete);

      if (data && method !== XHR_METHOD.GET) {
        _.each(data, addDataParam);
      }

      xhr.open(method, endpoint, true);
      xhr.send(formData);

      return deferred.promise;

      function addDataParam(val, key) {
        formData.append(key, val);
      }

      function onComplete(data) {
        var
          request = data.target;

        console.log(data);
        if (request.status === 200 || request.status === 201) {
          deferred.resolve(JSON.parse(request.responseText));
        }
        else {
          deferred.reject(request.responseText);
        }
      }
    }

    function onXhrError(err) {
      // TODO: Need to pass this to an error handling and notification service.
      console.log(err);
    }

  }

})(angular);

// assets/javascripts/app/file_upload/file_upload_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.ThirdParty.Moxie'
  ];

  angular.module('pc.FileUpload', dependencies)
    .constant('FILE_EVENTS', {
      SELECTED: 'SELECTED',
      DROPPED: 'DROPPED'
    });

})(angular);

// assets/javascripts/app/file_upload/image_drop_directive.js
(function(angular) {

  var
    defintitions;

  defintitions = [
    '$document',
    'FileDrop',
    'FileReader',
    'FILE_EVENTS',
    pcImageDrop
  ];

  angular.module('pc.FileUpload')
    .directive('pcImageDrop', defintitions);

  function pcImageDrop($document, FileDrop, FileReader, FILE_EVENTS) {
    var
      file;

    return {
      restrict: 'AC',
      replace: false,
      link: link,
      scope: {}
    };

    function link(scope, elem, attrs) {
      var
        drop,
        reader,
        settings;

      settings = {
        drop_zone: elem[0],
        accept: [
          {
            title: 'Image files',
            extensions: 'jpg,jpeg,svg,png'
          }
        ]
      };

      drop = new FileDrop(settings);
      drop.bind('drop', onDrop);
      drop.init();

      reader = new FileReader();
      reader.bind('loadend', onLoadEnd);

      function onDrop(e) {
        if (e.target.files.length) {
          file = e.target.files[0];
          reader.readAsDataURL(file);
        }
      }

      function onLoadEnd() {
        scope.$emit(FILE_EVENTS.SELECTED, file, reader.result);
      }
    }

  }

})(angular);

// assets/javascripts/app/file_upload/image_select_directive.js
(function(angular) {

  var
    defintitions;

  defintitions = [
    '$document',
    'FileInput',
    'FileReader',
    'FILE_EVENTS',
    pcImageSelect
  ];

  angular.module('pc.FileUpload')
    .directive('pcImageSelect', defintitions);

  function pcImageSelect($document, FileInput, FileReader, FILE_EVENTS) {
    var
      file;

    return {
      restrict: 'AC',
      replace: false,
      link: link,
      scope: {}
    };

    function link(scope, elem, attrs) {
      var
        input,
        reader,
        settings;

      settings = {
        browse_button: elem[0],
        container: elem.parent()[0],
        accept: [
          {
            title: 'Image files',
            extensions: 'jpg,jpeg,svg,png'
          }
        ],
        multiple: false
      };

      input = new FileInput(settings);
      input.bind('change', onChange);
      input.init();

      reader = new FileReader();
      reader.bind('loadend', onLoadEnd);

      function onChange(e) {
        if (e.target.files.length) {
          file = e.target.files[0];
          reader.readAsDataURL(file);
        }
      }

      function onLoadEnd() {
        scope.$emit(FILE_EVENTS.SELECTED, file, reader.result);
      }
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

// assets/javascripts/app/validation/validation_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    
  ];

  

  angular.module('pc.Validation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.passForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})

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
      replace: false,
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

// assets/javascripts/app/registration/registration_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'ui.router',
    'pc.ThirdParty.LoDash',
    'pc.FileUpload'
  ];

  angular.module('pc.Registration', dependencies);

})(angular);

// assets/javascripts/app/registration/progress_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    '_',
    progressService
  ];

  angular.module('pc.Registration')
    .factory('progressService', definitions);

  function progressService(_) {
    var
      progressBar = init();

    progressBar.update = updateProgress;

    return progressBar;

    function init() {
      return [
        {
          label: 'Buyer or supplier selection',
          status: -1
        },
        {
          label: 'Company information',
          status: -1
        },
        {
          label: 'Verify email address',
          status: -1
        },
        {
          label: 'Select your custom link',
          status: -1
        }
      ];
    }

    function updateProgress(step) {
      _.each(progressBar, updateProgressItem);

      function updateProgressItem(item, index) {
        if (step > index) {
          item.status = 1;
        }
        else if (step === index) {
          item.status = 0;
        }
        else {
          item.status = -1;
        }
      }
    }
  }

})(angular);

// assets/javascripts/app/registration/registration_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'progressService',
    registrationController
  ];

  angular.module('pc.Registration')
    .controller('registrationController', definitions);

  function registrationController($scope, progressBar) {
    $scope.wizard = {
      leadText: 'Welcome to Procur.',
      progressBar: progressBar
    };
  }

})(angular);

// assets/javascripts/app/registration/registration_step_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    'FILE_EVENTS',
    registrationStepController
  ];

  angular.module('pc.Registration')
    .controller('registrationStepController', definitions);

  function registrationStepController($scope, $state, FILE_EVENTS) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.$on(FILE_EVENTS.SELECTED, onImageSelected);

    function onImageSelected(e, file, dataUrl) {
      $scope.companyLogo = {
        file: file,
        base64Url: dataUrl
      };

      $scope.$digest();
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


// assets/javascripts/app/view_company_profile/view_company_profile_description_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    viewCompanyProfileDescriptionController
  ];

  angular.module('pc.ViewCompanyProfile')
    .controller('viewCompanyProfileDescriptionController', definitions);


  function viewCompanyProfileDescriptionController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
  }








})(angular);


// assets/javascripts/app/view_company_profile/view_company_profile_interests_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    viewCompanyProfileInterestsController
  ];

  angular.module('pc.ViewCompanyProfile')
    .controller('viewCompanyProfileInterestsController', definitions);


  function viewCompanyProfileInterestsController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
  }








})(angular);


// assets/javascripts/app/user_account_settings/user_account_settings_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [

    'pc.FileUpload',
    'pc.Ajax',
    'pc.User',
    'pc.Validation'
  ];

  angular.module('pc.UserAccountSettings', dependencies);



})(angular);

// assets/javascripts/app/user_account_settings/user_account_settings_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    userAccountSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userAccountSettingsController', definitions);

  function userAccountSettingsController($scope, userService) {
    $scope.user = userService;
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
    'ajaxService',
    'FILE_EVENTS',
    'userService',
    userUpdateSettings
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdateSettings', definitions);

  function userUpdateSettings($scope, ajax, FILE_EVENTS, user) {
    $scope.user = user;

    $scope.$on(FILE_EVENTS.SELECTED, onImageSelected);

    /*$scope.saveProfile = function() {
      ajax.put('/views/api/update_user.json', {profile: $scope.userProfile})
        .then(function(res) {
          console.log(res);
        });
    };*/

    function onImageSelected(e, file, dataUrl) {
      $scope.newProfilePicture = {
        file: file,
        base64Url: dataUrl
      };

      $scope.$digest();
    }


  }

})(angular);

// assets/javascripts/app/edit_company_profile/edit_company_profile_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.User',
    'pc.Company'
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
    'userService',
    'companyService',
    editCompanyProfileController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('editCompanyProfileController', definitions);

  function editCompanyProfileController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
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
      .otherwise('/welcome/type');

    $stateProvider
      .state('registration',  {
        url: '/welcome',
        abstract: true,
        views: {
          '': {
            templateUrl: 'registration.html',
            controller: 'registrationController'
          },
          'header': {
            templateUrl: 'registration_header.html'
          }
        }
      })
      .state('registration.type', {
        url: '/type',
        templateUrl: 'registration_type.html',
        controller: 'registrationStepController',
        data: {
          leadText: 'Welcome to Procur. Let\'s get started.',
          progressStep: 0
        }
      })
      .state('registration.finished_product', {
        url: '/supplier/finished_product',
        templateUrl: 'registration_finished_product.html',
        controller: 'registrationStepController',
        data: {
          leadText: 'One quick question before we get started.',
          progressStep: 0
        }
      })
      .state('registration.finished_product_confirmation', {
        url: '/supplier/finished_product/confirmation',
        templateUrl: 'registration_finished_product_confirmation.html',
        controller: 'registrationStepController',
        data: {
          leadText: 'Procur may not be right for you.',
          progressStep: 0
        }
      })
      .state('registration.company_information', {
        url: '/company_information',
        templateUrl: 'registration_company_information.html',
        controller: 'registrationStepController',
        data: {
          leadText: 'Excellent. Let\'s start with some basic information.',
          progressStep: 1
        }
      })

      .state('dashboard', {
        url: '/dashboard',
        views: {
          '': {
            templateUrl: 'dashboard.html',
            controller: 'dashboardController'
          },
          'header': {
            templateUrl: 'my_procur.html',
            controller: 'myProcurController'
          }
        }
      })

      /*TREY LOOK HERE*/
      .state('view_company_profile', {
        url: '/view_company_profile',
        views: {
          '': {
            templateUrl: 'view_company_profile.html',
            controller: 'viewCompanyProfileController',
            abstract: true
          },
          'header': {
            templateUrl: 'public_view.html',
            controller: 'myProcurController'
          }
        }
      })
      .state('view_company_profile.view_company_description', {
        url: '/view_company_description',
        templateUrl: 'view_company_profile_description.html',
        controller: 'viewCompanyProfileDescriptionController'
      })
      .state('view_company_profile.view-company_interests', {
        url: '/view_company_interests',
        templateUrl: 'view_company_profile_interests.html',
        controller: 'viewCompanyProfileInterestsController'
      })



      .state('user_account_settings', {
        url: '/user_account_settings',
        abstract: true,
        views: {
          '': {
            templateUrl: 'user_account_settings.html',
            controller: 'userAccountSettingsController'
          },
          'header': {
            templateUrl: 'my_procur.html',
            controller: 'myProcurController'
          }
        }
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

      .state('edit_company_profile', {
        url: '/edit_company_profile',
        abstract: true,
        views: {
          '': {
            templateUrl: 'edit_company_profile.html',
            controller: 'editCompanyProfileController'
          },
          header: {
            templateUrl: 'my_procur.html',
            controller: 'myProcurController'
          }
        }
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

  $templateCache.put('companyProfile.html',
    ""
  );


  $templateCache.put('dashboard.html',
    "<div class=\"row dashboard\"><div class=\"col-xs-4\"><div class=\"row user-profile\"><div class=\"col-xs-4\"><img ng-src=\"{{user.image}}\"></div><div class=\"col-xs-8\"><h4 class=\"text-muted profile-name\">{{user.firstName}} {{user.lastName}}</h4><h5 class=\"company-name\">{{company.name}}</h5><h6 class=\"member-since\">Procur member since {{user.createdAt | date: 'yyyy'}}</h6></div></div><div class=\"row\"><div class=\"col-xs-12 sub-nav\"><ul class=\"list-separator\"><li><a ui-sref=\"user_account_settings.update_settings\"><span class=\"glyphicon glyphicon-cog\"></span> Edit User Account Settings</a></li><li><a ui-sref=\"view_company_profile.view_company_description\"><span class=\"glyphicon glyphicon-user\"></span> View My Company Profile</a></li></ul></div></div><div class=\"row\"><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Company</li><li><a href=\"https://procur.com/earlyaccess\">Early Access</a></li><li><a href=\"https://procur.com/features\">Upcoming Features</a></li><li><a href=\"https://procur.com/pricing\">Membership & Pricing</a></li><li><a href=\"https://procur.com/about\">About Procur</a></li></ul></div><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Help & Support</li><li><a href=\"https://procur.com/faq\">FAQ</a></li><li><a href=\"https://procur.com/contact\">Contact Us</a></li><li><a href=\"https://procur.com/support\">Support Topics</a></li><li><a href=\"mailto:support@procur.com\">Email Support</a></li></ul></div></div></div><div class=\"col-xs-5\"><div class=\"panel-content action-items\"><div class=\"panel-heading\"><h5>My Procur Action Items</h5></div><div class=\"panel-body\"><p class=\"lead\">Welcome to Procur Early Access!</p><p>We're inviting select users to register with Procur before opening up our full platform later this summer. During Early Access, account holders will be able to create company profiles, organize products and RFQs, and start engaging with our online community. When we launch our full platform, Early Access suppliers will be the first to connect with global retailers, resellers and distributors looking to fill sourcing requirements.</p><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Learn more about early access</a></div><div class=\"panel-footer\"><ul class=\"list-checklist\"><li ng-repeat=\"item in actionItems | filter:activeModeFilter() track by $index\" ng-class=\"{complete: item.complete, incomplete: !item.complete}\"><span ng-switch=\"item.complete\"><span ng-switch-when=\"false\"><a ui-sref=\"{{item.link}}\"><span class=\"glyphicon glyphicon-unchecked\"></span><h5>{{item.action}}</h5></a></span> <span ng-switch-when=\"true\"><span class=\"glyphicon glyphicon-check\"></span><h5>{{item.action}}</h5></span></span></li></ul></div></div></div><div class=\"col-xs-3\"><h6 class=\"features-heading\">Currently Accessible:</h6><ul class=\"nav-panel\"><li><a ui-sref=\"edit_company_profile\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-user\"></span></div><h6>Company Profile</h6></a></li></ul><h6 class=\"features-heading\">Features coming soon:</h6><ul class=\"nav-panel\"><li ng-repeat=\"feature in comingSoon track by $index\" ng-mouseenter=\"feature.hover = true\" ng-mouseleave=\"feature.hover = false\"><a><div class=\"left-icon\"><span class=\"glyphicon {{feature.icon}}\"></span></div><h6>{{feature.hover ? feature.alt : feature.label}}</h6></a></li></ul></div></div>"
  );


  $templateCache.put('company_details.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Basic Company Details</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Company Name*</label><input type=\"text\" id=\"companyName\" placeholder=\"\" ng-model=\"company.name\"></div><div class=\"form-group\"><label for=\"\">Company Phone*</label><div class=\"row\"><div class=\"col-md-4\"><input type=\"text\" placeholder=\"Country Code*\" ng-model=\"company.phoneNumberCountryCode\"></div><div class=\"col-md-8\"><input type=\"text\" placeholder=\"Phone Number*\" ng-model=\"company.phoneNumber\"></div></div><div class=\"row\"><div class=\"col-md-8 col-md-offset-4\"><input type=\"text\" placeholder=\"Ext. Number\" ng-model=\"company.phoneExtension\"></div></div></div><div class=\"form-group\"><label for=\"\">Company Fax</label><div class=\"row\"><div class=\"col-md-4\"><input type=\"text\" placeholder=\"Country Code\" ng-model=\"company.faxCountryCode\"></div><div class=\"col-md-8\"><input type=\"text\" placeholder=\"Fax Number\" ng-model=\"company.faxNumber\"></div></div><div class=\"row\"><div class=\"col-md-8 col-md-offset-4\"><input type=\"text\" placeholder=\"Ext. Number\" ng-model=\"company.faxExtension\"></div></div></div><div class=\"form-group\"><label for=\"email\">Company Email Address*</label><input type=\"text\" id=\"email\" placeholder=\"info@mycompanyname.com\" ng-model=\"company.email\"></div><div class=\"form-group\"><label for=\"website\">Official Company Website</label><input type=\"text\" id=\"website\" placeholder=\"www.mycompanyname.com\" ng-model=\"company.website\"></div><div class=\"form-group\"><label for=\"industry\">Industry*</label><input type=\"text\" id=\"industry\" placeholder=\"dropdown!\" ng-model=\"\"><!-- change to dropdown --></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Official Business Address*</label><input type=\"text\" placeholder=\"Address Line #1\" ng-model=\"\"> <input type=\"text\" placeholder=\"Address Line #2\" ng-model=\"\"> <input type=\"text\" placeholder=\"Select Country\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" ng-model=\"\"><!-- change to dropdown --><div class=\"row\"><div class=\"col-md-4\"><input type=\"text\" placeholder=\"City\" ng-model=\"\"><!-- change to dropdown --></div><div class=\"col-md-8\"><input type=\"text\" placeholder=\"Postal Code\" ng-model=\"\"></div></div></div><div class=\"form-group\"><label for=\"\">Is the above address a headquarters?</label><label for=\"is-hq\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"is-hq\" placeholder=\"\" ng-model=\"\">Yes; please copy address below.</label></div><div class=\"form-group\"><label for=\"\">Company Headquarters Address*</label><input type=\"text\" placeholder=\"Address Line #1\" ng-model=\"\"> <input type=\"text\" placeholder=\"Address Line #2\" ng-model=\"\"> <input type=\"text\" placeholder=\"Select Country\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" ng-model=\"\"><!-- change to dropdown --><div class=\"row\"><div class=\"col-md-4\"><input type=\"text\" placeholder=\"City\" ng-model=\"\"><!-- change to dropdown --></div><div class=\"col-md-8\"><input type=\"text\" placeholder=\"Postal Code\" ng-model=\"\"></div></div></div><div class=\"form-group\"><label for=\"employeeCount\">Total Number of Employees*</label><input type=\"text\" id=\"employeeCount\" placeholder=\"dropdown!\" ng-model=\"\"><!-- change to dropdown --></div></div></div></form></div><button class=\"btn btn-continue\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div></div>"
  );


  $templateCache.put('company_information.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>[activeMode] Information</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Logo Image</label><img ng-src=\"http://res.cloudinary.com/huewqecyr/image/upload/v1404414400/dhemkcar246mvbm8wmcs.jpg\"> <input type=\"file\"> <input type=\"submit\" ng-model=\"Update Logo Image\"></div><div class=\"form-group\"><label for=\"\">Type of Company</label><input type=\"text\" placeholder=\"City\" ng-model=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Contact Name</label><input type=\"text\" id=\"\" placeholder=\"Contact Name\" ng-model=\"\"></div><div class=\"form-group\"><label for=\"\">Contact Position</label><input type=\"text\" id=\"\" placeholder=\"Contact Position\" ng-model=\"\"></div><div class=\"form-group\"><label for=\"\">Contact Email</label><input type=\"text\" id=\"\" placeholder=\"Contact Email\" ng-model=\"\"></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">Private Labeler</label><label for=\"private-labeler\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"private-labeler\" ng-model=\"\">Private labeling</label></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">GSA Approved Supplier</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">GSA Approved Supplier</label></div><div class=\"form-group\"><label for=\"\">DUNS Number</label><input type=\"text\" id=\"\" placeholder=\"DUNS Number\" ng-model=\"\"></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">CAGE Code</label><input type=\"text\" id=\"\" placeholder=\"CAGE Code\" ng-model=\"\"></div><div class=\"form-group\"><!-- BUYER ONLY --><label for=\"\">Secondary Location</label><input type=\"text\" placeholder=\"Location Title\" ng-model=\"\"> <input type=\"text\" placeholder=\"Select Location Type\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Country\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" ng-model=\"\"></div><div class=\"form-group\"><!-- BUYER ONLY --><label for=\"\">Nearest Port</label><input type=\"text\" placeholder=\"City\" ng-model=\"\"> <input type=\"text\" placeholder=\"Select Country\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" ng-model=\"\"><!-- change to dropdown --></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">DBA Name</label><input type=\"text\" placeholder=\"Alternate Company Name\" ng-model=\"\"></div><div class=\"form-group\"><label for=\"\">Language*</label><input type=\"text\" placeholder=\"Select Language\" ng-model=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Accepted Currencies*</label><div class=\"col-md-6\"><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">USD</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">JPY</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">AUD</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">CAD</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">CNY</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">SEK</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">HKD</label></div><div class=\"col-md-6\"><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">EUR</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">GBP</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">CHF</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">MXN</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">NZD</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">RUB</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">SGD</label></div></div><div class=\"form-group\"><label for=\"\">Accepted Payment Terms*</label><div class=\"col-md-6\"><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">MoneyGram</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">T/T</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">Escrow</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">D/P D/A</label></div><div class=\"col-md-6\"><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">Western Union</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">Credit Card</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">PayPal</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">Cash</label></div></div><div class=\"form-group\"><label for=\"\">Accepted Delivery Terms</label><div class=\"col-md-6\"><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">EXW</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">CPT</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">DAT</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">DDP</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">FOB</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">CIF</label></div><div class=\"col-md-6\"><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">FCA</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">CIP</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">DAP</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">FAS</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">CFR</label><label for=\"\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"\" ng-model=\"\">Custom</label></div></div></div><div class=\"col-md-12\"><div class=\"form-group\"><label for=\"\">Enter Product Categories of Interest</label><input type=\"text\" placeholder=\"Begin typing to search categories...\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Begin typing to search categories...\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Begin typing to search categories...\" ng-model=\"\"><!-- change to dropdown --></div></div></div></form></div></div><button class=\"btn btn-continue\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('descriptions.html',
    "<div class=\"col-sm-8 edit-company-descriptions\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Descriptions</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"form-group\"><label for=\"\">Company Description</label><textarea name=\"\" id=\"\" rows=\"5\">Company Description</textarea></div><div class=\"form-group\"><label for=\"\">Products Overview</label><textarea name=\"\" id=\"\" rows=\"5\">Products Overview</textarea></div><label>Statements of Responsibility</label><div class=\"form-group\"><label for=\"\">Environmental Sustainability</label><textarea name=\"\" id=\"\" rows=\"5\">Environmental Sustainability</textarea></div><div class=\"form-group\"><label for=\"\">Quality Sourcing</label><textarea name=\"\" id=\"\" rows=\"5\">Quality Sourcing</textarea></div><div class=\"form-group\"><label for=\"\">Workplace Safety</label><textarea name=\"\" id=\"\" rows=\"5\">Workplace Safety</textarea></div><div class=\"form-group\"><label for=\"\">Labor Education &amp; Training</label><textarea name=\"\" id=\"\" rows=\"5\">Labor Education &amp; Training</textarea></div><div class=\"form-group\"><label for=\"\">Community Reinvestment</label><textarea name=\"\" id=\"\" rows=\"5\">Community Reinvestment</textarea></div></div></form></div></div><button class=\"btn btn-continue\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('edit_company_profile.html',
    "<div class=\"row main-row\"><div class=\"col-sm-4\"><ul class=\"nav-panel\"><li pc-nav=\"company_details\"><a ui-sref=\"edit_company_profile.company_details\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-user\"></i></div><h6>Company Details</h6></a></li><li pc-nav=\"company_information\"><a ui-sref=\"edit_company_profile.company_information\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-info-sign\"></i></div><h6>[activeMode] Information</h6></a></li><li pc-nav=\"production_details\"><a ui-sref=\"edit_company_profile.production_details\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-wrench\"></i></div><h6>Production Details</h6></a></li><li pc-nav=\"descriptions\"><a ui-sref=\"edit_company_profile.descriptions\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-list-alt\"></i></div><h6>Descriptions</h6></a></li><li pc-nav=\"preferences\"><a ui-sref=\"edit_company_profile.preferences\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-cog\"></i></div><h6>Preferences</h6></a></li><li pc-nav=\"social_media\"><a ui-sref=\"edit_company_profile.social_media\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-thumbs-up\"></i></div><h6>Social Media</h6></a></li><li pc-nav=\"photos\"><a ui-sref=\"edit_company_profile.photos\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-picture\"></i></div><h6>[activeMode] Photos</h6></a></li></ul></div><div ui-view></div></div>"
  );


  $templateCache.put('photos.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Photos</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div><div class=\"panel-heading\"><h5>Your Photos</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"btn btn-continue\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('preferences.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Preferences</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Preferred [activeMode] Type*</label><input type=\"text\" placeholder=\"Preferred [activeMode] Type*\" ng-model=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Preferred [activeMode] Language</label><input type=\"text\" placeholder=\"Preferred [activeMode] Language\" ng-model=\"\"><!-- change to dropdown --></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Preferred [activeMode] Location</label><input type=\"text\" placeholder=\"Preferred [activeMode] Location\" ng-model=\"\"><!-- change to dropdown --></div></div></div></form></div></div><button class=\"btn btn-continue\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('production_details.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Production Details</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Annual Sales Value*</label><input type=\"text\" placeholder=\"Select Value\" ng-model=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Total Factory Size</label><input type=\"text\" placeholder=\"Select Factory Size\" ng-model=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Total Quality Control Staff</label><input type=\"text\" placeholder=\"Select Total Quality Control Staff\" ng-model=\"\"></div><div class=\"form-group\"><label for=\"\">Nearest Port</label><input type=\"text\" placeholder=\"City\" ng-model=\"\"> <input type=\"text\" placeholder=\"Select Country\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" ng-model=\"\"><!-- change to dropdown --></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Secondary Location</label><input type=\"text\" placeholder=\"Location Title\" ng-model=\"\"> <input type=\"text\" placeholder=\"Select Location Type\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Country\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" ng-model=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" ng-model=\"\"></div></div></div></form></div></div><button class=\"btn btn-continue\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('social_media.html',
    "<div class=\"col-sm-8 edit-social-media\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Social Outlets</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Facebook</label><div class=\"input-group\"><div class=\"input-group-addon\">facebook.com/<input type=\"text\" placeholder=\"Facebook\" ng-model=\"\"></div></div></div><div class=\"form-group\"><label for=\"\">Twitter</label><div class=\"input-group\"><div class=\"input-group-addon\">twitter.com/<input type=\"text\" placeholder=\"Twitter\" ng-model=\"\"></div></div></div><div class=\"form-group\"><label for=\"\">Google+</label><div class=\"input-group\"><div class=\"input-group-addon\">plus.google.com/+<input type=\"text\" placeholder=\"Google\" ng-model=\"\"></div></div></div><div class=\"form-group\"><label for=\"\">LinkedIn</label><div class=\"input-group\"><div class=\"input-group-addon\">linkedin.com/company/<input type=\"text\" placeholder=\"LinkedIn\" ng-model=\"\"></div></div></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Pinterest</label><div class=\"input-group\"><div class=\"input-group-addon\">pinterest.com/<input type=\"text\" placeholder=\"Pinterest\" ng-model=\"\"></div></div></div><div class=\"form-group\"><label for=\"\">Instagram</label><div class=\"input-group\"><div class=\"input-group-addon\">instagram.com/<input type=\"text\" placeholder=\"Instagram\" ng-model=\"\"></div></div></div><div class=\"form-group\"><label for=\"\">Tumblr</label><div class=\"input-group\"><div class=\"input-group-addon\">Tumblr<input type=\"text\" placeholder=\"Tumblr\" ng-model=\"\"></div></div></div></div></div></form></div></div><button class=\"btn btn-continue\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('my_procur.html',
    "<div class=\"user-header clearfix hidden-xs\"><ul class=\"user-header-left\"><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><img src=\"/assets/images/procur.png\" class=\"procur-logo\"></a></li><li class=\"user-header-item\"><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Early Access</a></li><li class=\"user-header-item\"><p class=\"text-lowercase\">{{user.firstName}} {{user.lastName}}</p><p>·</p><p>{{company.name}}</p></li></ul><ul class=\"user-header-right\"><li class=\"user-header-item\" ng-if=\"company.buyer && company.supplier\"><button class=\"btn btn-link buyer-supplier-switch\" ng-click=\"user.toggleActiveMode()\">Currently in {{user.activeMode}} mode <span class=\"glyphicon glyphicon-transfer\"></span> Switch to {{user.inactiveMode}}</button></li><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><span class=\"glyphicon glyphicon-log-out\"></span> Logout</a></li></ul></div><div id=\"mobile-nav\" class=\"mobile-header hidden-sm hidden-md hidden-lg\"><!-- Mobile --><nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#nav-links\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button><div class=\"ea-logo\"><a class=\"logo-image logo-mobile\" id=\"mobile-fix\" href=\"/\"><img src=\"/assets/images/procur.png\"></a> <a href=\"https://procur.com/earlyaccess\" class=\"early-access logo-mobile\">Early Access</a></div></div><div class=\"collapse navbar-collapse\" id=\"nav-links\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"fdf\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"dfd\"><a ui-sref=\"view_company_profile.view_company_description\">View Company Profile</a></li><li pc-nav=\"gg\"><a ui-sref=\"edit_company_profile.company_details\">Edit Company Profile</a></li><li pc-nav=\"dfd\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li><li class=\"divider\"></li><li class=\"divider\"></li><li><a ui-sref=\"dashboard\">LOGOUT</a></li></ul></div></div></nav></div><nav class=\"navbar navbar-default hidden-xs\" role=\"navigation\"><div class=\"container-fluid\"><div id=\"dash-nav\" class=\"collapse navbar-collapse hidden-sm hidden-md hidden-lg\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"dfd\"><a ui-sref=\"view_company_profile.view_company_description\">View Company Profile</a></li><li pc-nav=\"edit_company_profile\"><a ui-sref=\"edit_company_profile.company_details\">Edit Company Profile</a></li><li pc-nav=\"user_account_settings\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li></ul></div><div class=\"navbar-header\"><span class=\"navbar-brand\">My Procur:</span></div></div></nav>"
  );


  $templateCache.put('public_view.html',
    "<div id=\"public_view_header\"><nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#nav-links\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"/\"><img src=\"/assets/images/procur.png\"></a></div><div class=\"collapse navbar-collapse\" id=\"nav-links\"><ul class=\"nav navbar-nav navbar-right hidden-xs\"><li class=\"tri\"><a class=\"edit_profile_text\" ui-sref=\"edit_company_profile.company_details\">Edit Profile</a><div class=\"hoverTriContainer\"><div class=\"hoverTri\"></div></div></li><li class=\"tri\"><p class=\"navbar-text account-registration createPill\"><a ui-sref=\"dashboard\">Return to Dashboard</a></p><div class=\"hoverTriContainer\"><div class=\"hoverTri\"></div></div></li></ul><ul class=\"nav navbar-nav hidden-sm hidden-md hidden-lg\"><li class=\"tri\"><a ui-sref=\"edit_company_profile.company_details\">Edit Profile</a><div class=\"hoverTriContainer\"><div class=\"hoverTri\"></div></div></li><li class=\"tri\"><a ui-sref=\"dashboard\">Return to Dashboard</a><div class=\"hoverTriContainer\"><div class=\"hoverTri\"></div></div></li></ul></div></div></nav></div>"
  );


  $templateCache.put('registration_header.html',
    "<div class=\"container\"><nav class=\"navbar registration\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <img src=\"/assets/images/procur.png\" class=\"procur-logo\"></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li><span class=\"early-access\">Early Access</span></li><li><h6>Account Registration</h6></li></ul></div></div></nav></div>"
  );


  $templateCache.put('registration.html',
    "<div class=\"registration-wizard\"><div class=\"row\"><div class=\"col-xs-12\"><p class=\"lead text-center\">{{wizard.leadText}}</p></div></div><div class=\"row progress-tracker hidden-xs\"><div class=\"col-xs-10 col-xs-offset-1\"><ul class=\"list-inline\"><li ng-repeat=\"progress in wizard.progressBar track by $index\"><div ng-if=\"!$first\" class=\"progress-line progress-line-left\"></div><span class=\"progress-indicator\" ng-class=\"{'in-progress': progress.status === 0, 'not-started': progress.status === -1, 'completed': progress.status === 1}\"></span><p class=\"text-center\" ng-class=\"{active: progress.status === 0}\">{{progress.label}}</p><div ng-if=\"!$last\" class=\"progress-line progress-line-right\"></div></li></ul></div></div><br><br><div ui-view></div></div>"
  );


  $templateCache.put('registration_company_information.html',
    "<div class=\"row\"><div class=\"col-xs-8 col-xs-offset-2\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5 class=\"text-center\">Please fill out your company information</h5></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-xs-12\"><form class=\"form\" novalidate><div class=\"row\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"company-name\">Company Name*</label><input type=\"text\" id=\"company-name\" placeholder=\"Acme Co.\" required></div><div class=\"form-group\"><label for=\"company-email\">General Company Email*</label><input type=\"email\" id=\"company-email\" placeholder=\"info@company.com\" required></div><div class=\"form-group\"><label for=\"company-phone\">Company Phone*</label><div class=\"row\"><div class=\"col-md-4\"><input type=\"text\" placeholder=\"+\"></div><div class=\"col-md-8\"><input type=\"text\" id=\"company-phone\" placeholder=\"555-123-4567\" required></div></div></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"company-type\">Type of Company*</label><select id=\"company-type\"><option value=\"\">Select...</option></select></div><div class=\"form-group\"><label for=\"company-location\">Company Location*</label><select id=\"company-location\"><option value=\"\">Select...</option></select></div><div class=\"form-group\"><label for=\"primary-language\">Primary Language*</label><select id=\"primary-language\"><option value=\"\">Select...</option></select></div></div></div><div class=\"row separator\"><div class=\"col-md-12\"><h5 class=\"text-center\">Optional Information</h5></div></div><div class=\"row\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"company-website\">Company Website</label><input type=\"url\" id=\"company-website\" placeholder=\"http://www.company.com\"></div><div class=\"form-group\"><label for=\"company-logo\">Company Logo</label><div class=\"row\"><div class=\"col-md-4\"><button class=\"btn btn-default btn-sm\" pc-image-select>Choose Image</button></div><div class=\"col-md-8\" ng-switch=\"!!companyLogo.base64Url\"><div class=\"form-group profile-image\" ng-switch-when=\"true\"><img ng-src=\"{{companyLogo.base64Url}}\"></div><p class=\"no-file\" ng-switch-when=\"false\">No file chosen</p></div></div></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"company-dba\">DBA Name</label><input type=\"text\" id=\"company-dba\" placeholder=\"Alternate Business Name\"></div><div class=\"form-group\"><label for=\"industry\">Industry</label><select id=\"industry\"><option value=\"\">Select...</option></select></div><div class=\"form-group\"><label for=\"annual-sales\">Annual Sales</label><select id=\"annual-sales\"><option value=\"\">Select...</option></select></div></div></div><div class=\"row\"><div class=\"col-md-12\"><div class=\"form-group\"><label for=\"product-specialties\">Enter Product Specialties</label><input type=\"text\" id=\"product-specialties\" placeholder=\"Begin typing to search categories...\"> <input type=\"text\" id=\"product-specialties\" placeholder=\"Begin typing to search categories...\"> <input type=\"text\" id=\"product-specialties\" placeholder=\"Begin typing to search categories...\"></div></div></div><div class=\"row\"><div class=\"col-md-12\"><div class=\"form-group\"><label for=\"terms\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"terms\"> I have read and agree to the Terms of Service and Privacy Policy</label><label for=\"authorized-user\" class=\"checkbox-label\"><input type=\"checkbox\" id=\"authorized-user\"> I assert that I am authorized by the company I entered above to use Procur.com on their behalf in accordance with the Terms of Service and Privacy Policy.</label></div></div></div></form></div></div></div></div><button class=\"btn btn-continue\" type=\"button\">Continue <span class=\"glyphicon glyphicon-arrow-right\"></span></button></div></div>"
  );


  $templateCache.put('registration_finished_product.html',
    "<div class=\"row\"><div class=\"col-xs-8 col-xs-offset-2\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5 class=\"text-center\">Are you a consumer product company?</h5></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-xs-12\"><p class=\"text-center\">If you aren't sure if you are a consumer production supplier, read <a href=\"https://procur.com/faq\">What are some examples of consumer product companies</a> on our FAQ.</p></div></div><div class=\"row\"><div class=\"col-sm-6\"><a class=\"btn btn-lg btn-block btn-rounded btn-default\" ui-sref=\"registration.company_information\">Yes</a></div><div class=\"col-sm-6\"><a class=\"btn btn-lg btn-block btn-rounded btn-default\" ui-sref=\"registration.finished_product_confirmation\">No</a></div></div></div></div></div></div>"
  );


  $templateCache.put('registration_finished_product_confirmation.html',
    "<div class=\"row\"><div class=\"col-xs-8 col-xs-offset-2\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5 class=\"text-center\">You are not a consumer product company?</h5></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-xs-12\"><p class=\"text-center\">Procur helps consumer product companies sell products that are \"read for retail\".</p><p class=\"text-center\">If you aren't sure if you are a consumer production supplier, read <a href=\"https://procur.com/faq\">What are some examples of consumer product companies</a> on our FAQ.</p></div></div><div class=\"row\"><div class=\"col-sm-6\"><a class=\"btn btn-lg btn-block btn-rounded btn-default\" ui-sref=\"registration.company_information\">Wait - I am!</a></div><div class=\"col-sm-6\"><!-- TODO: Need to delete the session info when this link is clicked --><a class=\"btn btn-lg btn-block btn-rounded btn-default\" href=\"https://procur.com\">No, I'm not</a></div></div></div></div></div></div>"
  );


  $templateCache.put('registration_type.html',
    "<div class=\"row\"><div class=\"col-xs-8 col-xs-offset-2\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5 class=\"text-center\">Select your company type</h5></div><div class=\"panel-footer\"><div class=\"row\"><div class=\"col-sm-6\"><a class=\"btn btn-lg btn-block btn-rounded btn-default\" ui-sref=\"registration.company_information\">Buyer</a></div><div class=\"col-sm-6\"><a class=\"btn btn-lg btn-block btn-rounded btn-default\" ui-sref=\"registration.finished_product\">Supplier</a></div></div></div></div></div></div>"
  );


  $templateCache.put('user_account_settings.html',
    "<div id=\"user_account_settings\"><div class=\"row main-row\"><div class=\"col-sm-4\"><ul class=\"nav-panel\"><li pc-nav=\"update_settings\"><a ui-sref=\"user_account_settings.update_settings\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-cog\"></i></div><h6>Update settings</h6></a></li><li pc-nav=\"update_password\"><a ui-sref=\"user_account_settings.update_password\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-lock\"></i></div><h6>Change password</h6></a></li></ul></div><div ui-view></div></div></div>"
  );


  $templateCache.put('user_update_password.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Update Password</h5></div><div class=\"panel-body\"><form name=\"passForm\" class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"password\">Password</label><input type=\"password\" id=\"password\" name=\"password\" ng-model=\"formData.password\" ng-minlength=\"8\" ng-maxlength=\"20\" ng-pattern=\"/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/\" required><p class=\"error\" ng-show=\"passForm.password.$error.required && passForm.password.$dirty\">required</p><p class=\"error\" ng-show=\"!passForm.password.$error.required && (passForm.password.$error.minlength || passForm.password.$error.maxlength) && passForm.password.$dirty\">Passwords must be between 8 and 20 characters.</p><p class=\"error\" ng-show=\"!passForm.password.$error.required && !passForm.password.$error.minlength && !passForm.password.$error.maxlength && passForm.password.$error.pattern && passForm.password.$dirty\">Must contain one lower &amp; uppercase letter, and one non-alpha character (a number or a symbol.)</p><br></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"password_c\">Confirm Password</label><input type=\"password\" id=\"password_c\" name=\"password_c\" ng-model=\"formData.password_c\" valid-password-c required><p class=\"error\" ng-show=\"passForm.password_c.$error.required && passForm.password_c.$dirty\">Please confirm your password.</p><p class=\"error\" ng-show=\"!passForm.password_c.$error.required && passForm.password_c.$error.noMatch && passForm.password.$dirty\">Passwords do not match.</p></div></div></div></form></div><button class=\"btn-continue\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div></div>"
  );


  $templateCache.put('user_update_settings.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Contact Information</h5></div><div class=\"panel-body\"><form name=\"userForm\" class=\"form\" novalidate><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"firstName\">Contact Name*</label><input type=\"text\" name=\"firstName\" id=\"firstName\" placeholder=\"First\" ng-model=\"user.firstName\" required><p ng-show=\"userForm.firstName.$error.required\" class=\"error\">This field is required.</p><input type=\"text\" name=\"lastName\" id=\"lastName\" placeholder=\"Last\" ng-model=\"user.lastName\" required><p ng-show=\"userForm.lastName.$error.required\" class=\"error\">This field is required.</p></div><div class=\"form-group\"><label for=\"emailAddress\">Current Email Address</label><input id=\"emailAddress\" type=\"email\" placeholder=\"Current Email\" ng-model=\"user.email\" readonly></div><div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.email.$invalid && !userForm.email.$pristine }\"><label for=\"newEmailAddress\">Update Email Address</label><input type=\"email\" name=\"email\" ng-model=\"user.email\" placeholder=\"Enter new Email\"><p ng-show=\"userForm.email.$invalid && !userForm.email.$pristine\" class=\"error\">Enter a valid email.</p><input type=\"email\" placeholder=\"Confirm New Address\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"jobTitle\">Job Title</label><input id=\"jobTitle\" type=\"text\" placeholder=\"Job Title\" ng-model=\"user.jobTitle\"></div><div class=\"form-group profile-image\"><img ng-src=\"{{newProfilePicture.base64Url || user.image}}\"></div><div class=\"form-group\"><label>Update Profile Picture</label><button class=\"btn btn-default btn-sm\" pc-image-select>Choose Image</button></div></div></div></form></div></div><button class=\"btn btn-continue\" type=\"button\" ng-click=\"saveProfile()\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('view_company_profile.html',
    "<div class=\"row company-profile\"><div class=\"col-sm-12 col-md-4\"><!--IMAGE PLACEHOLDER--><div class=\"company-header\"><h2><span>{{user.activeMode}} profile</span></h2><h1>{{company.name}}</h1></div><div class=\"company-info-box company-business-address\"><h3><span class=\"glyphicon glyphicon-map-marker\"></span> <span class=\"info-title\">Official Business Address</span></h3><p>TODO</p><p>TODO</p><p>TODO</p><p>TODO</p></div><div class=\"company-info-box\"><h3><span class=\"glyphicon glyphicon-earphone\"></span> <span class=\"info-title\">Company Phone &amp; Fax</span></h3><p>Telephone: {{company.phoneNumber}}</p></div><div class=\"company-info-box\"><h3><span class=\"glyphicon glyphicon-send\"></span> <span class=\"info-title\">Company Email Address</span></h3><p>{{company.email}}</p></div><div class=\"company-info-box\"><h3><span class=\"glyphicon glyphicon-globe\"></span> <span class=\"info-title\">Company Website</span></h3><a href=\"{{company.website}}\">{{company.website}}</a></div><div class=\"company-detail-box\"><h3><span>Product Categories</span></h3><p>TODO</p></div><div class=\"company-detail-box company-two-col-box\"><h3><span>{{user.activeMode}} details</span></h3><div class=\"col-xs-12 col-sm-6 company-col-left\"><div class=\"company-col-detail\"><p class=\"detail-header\">Type of Company</p><p class=\"detail-body\">TODO</p></div><div class=\"company-col-detail\"><p class=\"detail-header\">Total # of Employees</p><p class=\"detail-body\">{{company.employeeCount}}</p></div><div class=\"company-col-detail\"><p class=\"detail-header\">Industry</p><p class=\"detail-body\">{{company.industry}}</p></div><div class=\"company-col-detail\"><p class=\"detail-header\">Languages</p><p class=\"detail-body\">TODO</p></div><div class=\"company-col-detail\"><p class=\"detail-header\">DUNS Number</p><p class=\"detail-body\">TODO</p></div></div><div class=\"col-xs-12 col-sm-6 company-col-right\"><div class=\"company-col-detail\"><p class=\"detail-header\">Links</p><a href=\"{{company.website}}\">Our Website</a></div></div></div></div><div class=\"col-sm-12 col-md-7 col-lg-8 pull-right hidden-xs\"><div class=\"profile-nav\"><ul><div class=\"nav-left\"><li>About</li></div><div class=\"nav-right\"><li><a ui-sref=\"view_company_profile.view_company_description\">Company Descriptions</a></li><li><a ui-sref=\"view_company_profile.view-company_interests\">Products of Interest</a></li></div></ul></div><div ui-view></div></div></div>"
  );


  $templateCache.put('view_company_profile_description.html',
    "<div class=\"hint\">Add company description in <a ui-sref=\"edit_company_profile.descriptions\">edit company profile > descriptions</a></div>"
  );


  $templateCache.put('view_company_profile_interests.html',
    "<div class=\"hint\">Add products of interest in <a ui-sref=\"edit_company_profile.descriptions\">edit company profile > descriptions</a></div>"
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
    'pc.Header',
    'pc.Registration',
    'pc.Dashboard',
    'pc.UserAccountSettings',
    'pc.EditCompanyProfile',
    'pc.ViewCompanyProfile'
  ];

  angular.module('pc.Main', dependencies);

})(angular);


// assets/javascripts/app/header/header_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [];

  angular.module('pc.Header', dependencies);

})(angular);

// assets/javascripts/app/header/my_procur_controller.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    myProcurController
  ];

  angular.module('pc.Header')
    .controller('myProcurController', definitions);

  function myProcurController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
  }

})(angular);