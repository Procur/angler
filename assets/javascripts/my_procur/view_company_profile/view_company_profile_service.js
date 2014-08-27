(function(angular) {

  var
    definitions;

  definitions = [
    'userService',
    'companyService',
    'buyerService',
    'supplierService',
    'locationService',
    viewCompanyProfileService
  ];

  angular.module('pc.ViewCompanyProfile')
    .factory('viewCompanyProfileService', definitions);

  function viewCompanyProfileService(user, company, buyer, supplier, location) {
    return {
      get: get,
      activeMode: activeMode
    };

    function get() {
      var
        activeItems;

      actionItems = [
        {
          action: location.companyIsHq.addressLine1,
          actionNotHq: location.companyNotHq.addressLine1,
          complete: !!location.companyIsHq.addressLine1,
          completeNotHq: !!location.companyNotHq.addressLine1
        },
        {
          action: location.companyIsHq.addressLine2,
          actionNotHq: location.companyNotHq.addressLine2,
          complete: !!location.companyIsHq.addressLine2,
          completeNotHq: !!location.companyNotHq.addressLine2
        },
        {
          action: location.companyIsHq.city,
          actionNotHq: location.companyNotHq.city,
          complete: !!location.companyIsHq.city,
          completeNotHq: !!location.companyNotHq.city
        },
        {
          action: location.companyIsHq.province,
          actionNotHq: location.companyNotHq.province,
          complete: !!location.companyIsHq.province,
          completeNotHq: !!location.companyNotHq.province
        },
        {
          action: location.companyIsHq.country,
          actionNotHq: location.companyNotHq.country,
          complete: !!location.companyIsHq.country,
          completeNotHq: !!location.companyNotHq.country
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
