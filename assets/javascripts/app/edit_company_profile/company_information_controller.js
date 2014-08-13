(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    companyInformation
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('companyInformation', definitions);

  function companyInformation($scope) {
    
  }

})(angular);