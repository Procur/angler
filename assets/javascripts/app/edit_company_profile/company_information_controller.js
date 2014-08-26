(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    companyInformationController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('companyInformationController', definitions);

  function companyInformationController($scope, user, company) {
    $scope.user = initUserInformation();
    $scope.company = initCompanyInformation();

    function initUserInformation() {
      return {
        firstName: user.get('firstName'),
        lastName: user.get('lastName')
      };
    }

    function initCompanyInformation() {
      return {
        name: company.get('name'),
        buyer: company.get('buyer'),
        supplier: company.get('supplier')
      };
    }
  }

})(angular);