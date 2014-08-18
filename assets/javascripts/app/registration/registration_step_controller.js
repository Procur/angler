(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',

    registrationStepController
  ];

  angular.module('pc.Registration')
    .controller('registrationStepController', definitions);

  function registrationStepController($scope, $state) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);
  }

})(angular);