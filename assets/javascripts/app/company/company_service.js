(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    companyService
  ];

  angular.module('pc.Company')
    .factory('companyService', definitions);

  function companyService($window) {
    var
      company;

    company = $window.pc.localData.company;

    return company;
  }

})(angular);