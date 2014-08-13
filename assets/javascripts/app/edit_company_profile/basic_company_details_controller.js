(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    basicCompanyDetails
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('basicCompanyDetails', definitions);

  function basicCompanyDetails($scope) {
    
  }

})(angular);