(function(angular) {

  var
    definitions;

  definitions = [
    'ajaxService',
    companyService
  ];

  angular.module('pc.Company')
    .factory('companyService', definitions);

  function companyService(ajax) {
    var
      deferredCompany,
      company;

    return init;

    function init() {
      if (!deferredCompany) {
        return ajax.get('/views/api/company.json')
          .then(resolveCompany);
      }
      return deferredCompany();

      function resolveCompany(data) {
        company = data;
        return company;
      }
    }
  }

})(angular);