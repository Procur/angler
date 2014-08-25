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
          complete: !!user.get('image'),
          type: {
            buyer: true,
            supplier: true
          },
          link: 'user_account_settings'
        },
        {
          action: 'Update your job title',
          complete: !!user.get('jobTitle'),
          type: {
            buyer: true,
            supplier: true
          },
          link: 'user_account_settings'
        },
        {
          action: 'Add your company website',
          complete: !!company.get('website'),
          type: {
            buyer: true,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your company description',
          complete: user.isBuyerMode() ? !!buyer.get('companyDescription') : !!supplier.get('companyDescription'),
          type: {
            buyer: true,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your company\'s Statements of Responsibility',
          complete: user.isBuyerMode() ?
            !!(buyer.get('responsibilityStatements') &&
              buyer.get('responsibilityStatements').environmentalSustainability &&
              buyer.get('responsibilityStatements').qualitySourcing &&
              buyer.get('responsibilityStatements').workplaceSafety &&
              buyer.get('responsibilityStatements').laborEducationTraining &&
              buyer.get('responsibilityStatements').reinvestment) :
            !!(supplier.get('responsibilityStatements') &&
              supplier.get('responsibilityStatements').environmentalSustainability &&
              supplier.get('responsibilityStatements').qualitySourcing &&
              supplier.get('responsibilityStatements').workplaceSafety &&
              supplier.get('responsibilityStatements').laborEducationTraining &&
              supplier.get('responsibilityStatements').reinvestment),
          type: {
            buyer: true,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your preferred buyer type',
          complete: !!supplier.get('tradePreferences') && !!supplier.get('tradePreferences').preferredBuyerType,
          type: {
            buyer: false,
            supplier: true
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your preferred supplier type',
          complete: !!buyer.get('tradePreferences') && !!buyer.get('tradePreferences').preferredSupplierType,
          type: {
            buyer: true,
            supplier: false
          },
          link: 'edit_company_profile'
        },
        {
          action: 'Add your products of interest',
          complete: !!buyer.get('productCategories') && !!buyer.get('productCategories').length,
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
        return actionItem.type[user.get('activeMode')];
      }
    }
  }
})(angular);