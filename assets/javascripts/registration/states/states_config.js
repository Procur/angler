(function(angular) {
  var
    definition;

  definition = [
    '$stateProvider',
    '$urlRouterProvider',
    statesConfig
  ];

  angular.module('pc.Registration.States')
    .config(definition);

  function statesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/type')
      .rule(registrationWizardRule);

    $stateProvider
      .state('wizard',  {
        url: '',
        abstract: true,
        views: {
          '': {
            templateUrl: 'wizard.html',
            controller: 'wizardController'
          },
          'header': {
            templateUrl: 'wizard_header.html'
          }
        }
      })
      .state('wizard.type', {
        url: '/type',
        templateUrl: 'type.html',
        controller: 'typeController',
        data: {
          leadText: 'Welcome to Procur. Let\'s get started.',
          progressStep: 0
        }
      })
      .state('wizard.finished_product', {
        url: '/supplier/finished_product',
        templateUrl: 'finished_product.html',
        controller: 'wizardStepController',
        data: {
          leadText: 'One quick question before we get started.',
          progressStep: 0
        }
      })
      .state('wizard.finished_product_confirmation', {
        url: '/supplier/finished_product/confirmation',
        templateUrl: 'finished_product_confirmation.html',
        controller: 'wizardStepController',
        data: {
          leadText: 'Procur may not be right for you.',
          progressStep: 0
        }
      })
      .state('wizard.company_information', {
        url: '/company_information',
        templateUrl: 'company_information.html',
        controller: 'companyInformationController',
        data: {
          leadText: 'Excellent. Let\'s start with some basic information.',
          progressStep: 1
        }
      })
      .state('wizard.email_verification', {
        url: '/email_verification',
        templateUrl: 'email_verification.html',
        controller: 'emailVerificationController',
        data: {
          leadText: 'Have you checked your email lately?',
          progressStep: 2
        }
      })
      .state('wizard.handle', {
        url: '/handle',
        templateUrl: 'company_handle.html',
        controller: 'companyHandleController',
        data: {
          leadText: 'Set your custom link',
          progressStep: 3
        }
      });

    function registrationWizardRule($injector, $location) {
      var
        company = $injector.get('companyService');

      if (!company.isBuyer() && !company.isSupplier()) {
        $location.path('/type').replace();
      }
    }

  }


})(angular);
