(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    wizardStepController
  ];

  angular.module('pc.Wizard')
    .controller('wizardStepController', definitions);

  function wizardStepController($scope, $state) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);

  }

})(angular);