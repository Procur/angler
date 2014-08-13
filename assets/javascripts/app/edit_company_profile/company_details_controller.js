(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    companyDetails
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('companyDetails', definitions);

  function companyDetails($scope) {
    
  }

})(angular);