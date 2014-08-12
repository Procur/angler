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
      company;

    return {
      init: init,
      get: get,
      update: update
    };

    function init() {
      if (!company) {
        return ajax.get('/views/api/company.json')
          .then(function resolveCompany(data) {
            company = data;
            return get();
          });
      }
      return get();
    }

    function get(field) {
      if (field) {
        return company[field];
      }
      return company;
    }

    function update(field, value) {
      if (field && value !== null && value !== undefined) {
        company[field] = value;
        return true;
      }
      return false;
    }
  }

})(angular);