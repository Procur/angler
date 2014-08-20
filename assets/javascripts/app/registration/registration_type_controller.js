

(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    'userService',
    'companyService',
    registrationTypeController
  ];

  angular.module('pc.Registration')
    .controller('registrationTypeController', definitions);

  function registrationTypeController($scope, $state, user, company) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.selectType = selectType;

    function selectType(type) {
      company.set(type, true);
      user.set('activeMode', type);

      if (type === 'supplier') {
        company.set('buyer', false);
        $state.go('registration.finished_product');
      }
      else {
        company.set('supplier', false);
        $state.go('registration.company_information');
      }
    }

  }

})(angular);