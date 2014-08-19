(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    'FILE_EVENTS',
    registrationStepController
  ];

  angular.module('pc.Registration')
    .controller('registrationStepController', definitions);

  function registrationStepController($scope, $state, FILE_EVENTS) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.$on(FILE_EVENTS.SELECTED, onImageSelected);

    function onImageSelected(e, file, dataUrl) {
      $scope.companyLogo = {
        file: file,
        base64Url: dataUrl
      };

      $scope.$digest();
    }

  }

})(angular);