
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

// assets/javascripts/app/snackbar/snackbar_module.js
(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.ThirdParty.LoDash'
  ];

  angular.module('pc.Snackbar', dependencies)
    .constant('POSITIONS', {
      TOP_LEFT: 'TOP_LEFT',
      BOTTOM_RIGHT: 'BOTTOM_RIGHT',
      TOP_RIGHT: 'TOP_RIGHT',
      BOTTOM_LEFT: 'BOTTOM_LEFT'
    })
    .constant('POSITION_CLASSES', {
      TOP_LEFT: 'snackbar-top-left',
      BOTTOM_RIGHT: 'snackbar-bottom-right',
      TOP_RIGHT: 'snackbar-top-right',
      BOTTOM_LEFT: 'snackbar-bottom-left'
    })
    .constant('SNACKBAR_COLORS', {
      SUCCESS: '#5CC672',
      ERROR: '#FF5A5A',
      DEFAULT: '#333132'
    });

})(angular);

// assets/javascripts/app/snackbar/snackbar_service.js
(function(angular) {

  var
    definitions;

  definitions = [
    '$document',
    '$rootScope',
    '$templateCache',
    '$compile',
    '$timeout',
    '$animate',
    '_',
    'POSITIONS',
    'POSITION_CLASSES',
    'SNACKBAR_COLORS',
    snackbarService
  ];

  angular.module('pc.Snackbar')
    .factory('snackbarService', definitions);

  function snackbarService($document, $rootScope, $templateCache, $compile, $timeout, $animate, _, POSITIONS, POSITION_CLASSES, COLORS) {
    var
      templateUrl = 'snackbar.html',
      template = $templateCache.get(templateUrl),
      scope = $rootScope.$new(),
      body = $document.find('body'),
      POP_UP = 'snackbar-pop-up',
      POP_OUT = 'snackbar-pop-out',
      POP_OUT_TIMEOUT = 4000,
      REMOVE_TIMEOUT = 4200,
      stack = [];

    return {
      success: success,
      error: error,
      notice: notice
    };

    function success(message) {
      var
        successConfig;

      successConfig = {
        'background-color': COLORS.SUCCESS
      };

      notice(message, successConfig);
    }

    function error(message) {
      var
        errorConfig;

      errorConfig = {
        'background-color': COLORS.ERROR
      };

      notice(message, errorConfig);
    }

    function notice(message, config) {
      var
        snackbar,
        styles,
        position;

      config = config || {};

      if (message) {
        styles = getStyles();
        position = getPosition();

        scope.message = message;
        scope.styles = styles;
        scope.position = position;

        snackbar = $compile(template)(scope);

        if (stack.length) {
          _.each(stack, clearSnackbar);
        }

        insertSnackbar();
        snackbar.timeout = {
          pop_out: $timeout(snackbarPopOut, POP_OUT_TIMEOUT),
          remove: $timeout(removeSnackbar, REMOVE_TIMEOUT)
        };
      }

      function insertSnackbar() {
        $animate.enter(snackbar, body, null, snackbarPopIn);
        stack.push(snackbar);
      }

      function removeSnackbar() {
        $animate.leave(snackbar);
        stack.shift();
      }

      function snackbarPopIn() {
        snackbar.addClass(POP_UP);
      }

      function snackbarPopOut() {
        snackbar
          .addClass(POP_OUT)
          .removeClass(POP_UP);
      }

      function clearSnackbar(item, index) {
        $timeout.cancel(item.timeout.pop_out);
        $timeout.cancel(item.timeout.remove);
        $animate.leave(item);
        stack.splice(index, 1);
      }

      function getStyles() {
        return {
          wrapper: {
            'background-color': config['background-color'] || COLORS.DEFAULT,
          },
          message: {
            'font-size': config['font-size'] || '14px',
            'font-weight': '300',
            'color': config.color || '#FFF'
          }
        };
      }

      function getPosition() {
        var
          position = POSITIONS[config.position];

        return position ? POSITION_CLASSES[position] : POSITION_CLASSES.BOTTOM_LEFT;
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
    'pc.FileUpload',
    'pc.Snackbar'
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
    'snackbarService',
    'FILE_EVENTS',
    registrationStepController
  ];

  angular.module('pc.Registration')
    .controller('registrationStepController', definitions);

  function registrationStepController($scope, $state, snackbar, FILE_EVENTS) {
    $scope.wizard.leadText = $state.current.data.leadText;

    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.sendEmailVerification = sendEmailVerification;

    $scope.$on(FILE_EVENTS.SELECTED, onImageSelected);

    function onImageSelected(e, file, dataUrl) {
      $scope.companyLogo = {
        file: file,
        base64Url: dataUrl
      };

      $scope.$digest();
    }

    function sendEmailVerification() {
      if (Math.round(Math.random())) {
        snackbar.notice('Resent email verification!');
      }
      else {
        snackbar.error('There was an error sending the verification email. Please try again.');
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
    userUpdatePasswordController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdatePasswordController', definitions);

  function userUpdatePasswordController($scope) {

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
    userUpdateSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdateSettingsController', definitions);

  function userUpdateSettingsController($scope, ajax, FILE_EVENTS, user) {
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
      .state('registration.email_verification', {
        url: '/email_verification',
        templateUrl: 'registration_email_verification.html',
        controller: 'registrationStepController',
        data: {
          leadText: 'Have you checked your email lately?',
          progressStep: 2
        }
      })
      .state('registration.handle', {
        url: '/handle',
        templateUrl: 'registration_handle.html',
        controller: 'registrationStepController',
        data: {
          leadText: 'Set your custom link',
          progressStep: 3
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
        controller: 'userUpdateSettingsController'
      })
      .state('user_account_settings.update_password', {
        url: '/update_password',
        templateUrl: 'user_update_password.html',
        controller: 'userUpdatePasswordController'
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