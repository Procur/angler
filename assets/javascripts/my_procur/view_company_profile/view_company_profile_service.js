(function(angular) {

  var
    definitions;

  definitions = [
    'userService',
    'companyService',
    'buyerService',
    'supplierService',
    viewCompanyProfileService
  ];

  angular.module('pc.ViewCompanyProfile')
    .factory('viewCompanyProfileService', definitions);

  function viewCompanyProfileService(user, company, buyer, supplier) {
    return {
      get: get,
      activeMode: activeMode
    };

    function get() {
      var
        activeItems;

      actionItems = [
        {
          action: company.get('location').companyIsHq.addressLine1,
          actionNotHq: company.get('location').companyNotHq.addressLine1,
          complete: !!company.get('location').companyIsHq.addressLine1,
          completeNotHq: !!company.get('location').companyNotHq.addressLine1
        },
        {
          action: company.get('location').companyIsHq.addressLine2,
          actionNotHq: company.get('location').companyNotHq.addressLine2,
          complete: !!company.get('location').companyIsHq.addressLine2,
          completeNotHq: !!company.get('location').companyNotHq.addressLine2
        },
        {
          action: company.get('location').companyIsHq.city,
          actionNotHq: company.get('location').companyNotHq.city,
          complete: !!company.get('location').companyIsHq.city,
          completeNotHq: !!company.get('location').companyNotHq.city
        },
        {
          action: company.get('location').companyIsHq.province,
          actionNotHq: company.get('location').companyNotHq.province,
          complete: !!company.get('location').companyIsHq.province,
          completeNotHq: !!company.get('location').companyNotHq.province
        },
        {
          action: company.get('location').companyIsHq.country,
          actionNotHq: company.get('location').companyNotHq.country,
          complete: !!company.get('location').companyIsHq.country,
          completeNotHq: !!company.get('location').companyNotHq.country
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
