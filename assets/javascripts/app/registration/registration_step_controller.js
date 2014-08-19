(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    'snackbarService',
    'FILE_EVENTS',
    registrationStepController
  ];

  angular.module('pc.Registration')
    .controller('registrationStepController', definitions);

  function registrationStepController($scope, $state, snackbar, FILE_EVENTS) {
    $scope.wizard.leadText = $state.current.data.leadText;

    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.sendEmailVerification = sendEmailVerification;

    $scope.$on(FILE_EVENTS.SELECTED, onImageSelected);

    function onImageSelected(e, file, dataUrl) {
      $scope.companyLogo = {
        file: file,
        base64Url: dataUrl
      };

      $scope.$digest();
    }

    function sendEmailVerification() {
      if (Math.round(Math.random())) {
        snackbar.success('Resent email verification!');
      }
      else {
        snackbar.error('There was an error sending the verification email. Please try again.');
      }
    }

  }

})(angular);