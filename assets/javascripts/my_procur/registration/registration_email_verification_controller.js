(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    'ajaxService',
    'userService',
    'snackbarService',
    registrationEmailVerificationController
  ];

  angular.module('pc.Registration')
    .controller('registrationEmailVerificationController', definitions);

  function registrationEmailVerificationController($scope, $state, ajax, user, snackbar) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.resendEmailVerification = resendEmailVerification;
    $scope.alreadyVerified = alreadyVerified;

    function resendEmailVerification() {
      ajax.get('/api/user/verify_email')
        .then(user.setAll)
        .then(function() { snackbar.success('Resent email verification!'); })
        ['catch'](ajax.handleError);
    }

    function alreadyVerified() {
      if (user.get('emailVerified')) {
        $state.go('registration.handle');
      }
      else {
        snackbar.error('Your email has not been verified. Please check your email or click to resend.');
      }
    }

  }

})(angular);