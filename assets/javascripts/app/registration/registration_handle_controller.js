(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    'ajaxService',
    'companyService',
    registrationHandleController
  ];

  angular.module('pc.Registration')
    .controller('registrationHandleController', definitions);

  function registrationHandleController($scope, $state, ajax, company) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.setHandle = setHandle;

    function setHandle() {
      ajax.put('/views/api/set_company_handle.json', { handle: $scope.handle })
        .then(company.setAll)
        .then(function() { $state.go('dashboard'); })
        ['catch'](ajax.handleError);
    }

  }

})(angular);