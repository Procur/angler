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