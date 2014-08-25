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