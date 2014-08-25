(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    'ajaxService',
    'companyService',
    companyHandleController
  ];

  angular.module('pc.Wizard')
    .controller('companyHandleController', definitions);

  function companyHandleController($scope, $state, ajax, company) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.setHandle = setHandle;

    function setHandle() {
      ajax.put('/api/company', { handle: $scope.handle })
        .then(company.setAll)
        .then(function() { $state.go('dashboard'); })
        ['catch'](ajax.handleError);
    }

  }

})(angular);