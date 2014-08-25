(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    'ajaxService',
    'companyService',
    'FILE_EVENTS',
    companyInformationController
  ];

  angular.module('pc.Wizard')
    .controller('companyInformationController', definitions);

  function companyInformationController($scope, $state, ajax, company, FILE_EVENTS) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.companyInformation = initCompanyInformation();

    $scope.isSupplier = company.isSupplier();

    $scope.$on(FILE_EVENTS.SELECTED, onImageSelected);

    $scope.submitCompanyInformation = submitCompanyInformation;

    function onImageSelected(e, file, dataUrl) {
      $scope.companyInformation.logo.file = file;
      $scope.companyInformation.logo.url = dataUrl;
      $scope.$digest();
    }

    function submitCompanyInformation() {
      if (isFormValid()) {
        ajax.post('/api/company', $scope.companyInformation)
          .then(company.setAll)
          .then(goToEmailVerification)
          ['catch'](ajax.handleError);
      }

      function isFormValid() {
        return $scope.companyInformationForm.$valid &&
               $scope.agreeTerms &&
               $scope.agreeAuthorized;
      }
    }

    function goToEmailVerification() {
      $state.go('registration.email_verification');
    }

    function initCompanyInformation() {
      return {
        name: company.get('name'),
        email: company.get('email'),
        buyer: company.get('buyer'),
        supplier: company.get('supplier'),
        phoneNumberCountryCode: company.get('phoneNumberCountryCode'),
        phoneNumber: company.get('phoneNumber'),
        type: company.get('type'),
        location: company.get('location'),
        primaryLanguage: company.get('primaryLanguage'),
        website: company.get('website'),
        logo: company.get('logo') || {},
        dba: company.get('dba'),
        industry: company.get('industry'),
        annualSales: company.get('annualSales'),
        productSpecialties: company.get('productSpecialties') || []
      };
    }

  }

})(angular);