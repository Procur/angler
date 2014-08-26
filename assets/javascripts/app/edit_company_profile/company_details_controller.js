(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'companyService',
    companyDetailsController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('companyDetailsController', definitions);

  function companyDetailsController($scope, company) {
    $scope.company = initCompanyInformation();

    function initCompanyInformation() {
      return {
        name: company.get('name'),
        phoneNumberCountryCode: company.get('phoneNumberCountryCode'),
        phoneNumber: company.get('phoneNumber'),
        phoneExtension: company.get('phoneExtension'),
        faxCountryCode: company.get('faxCountryCode'),
        faxNumber: company.get('faxNumber'),
        faxExtension: company.get('faxExtension'),
        email: company.get('email'),
        website: company.get('website')
      };
    }
  }

})(angular);