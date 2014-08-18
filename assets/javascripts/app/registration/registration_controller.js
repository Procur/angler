(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '_',
    registrationController
  ];

  angular.module('pc.Registration')
    .controller('registrationController', definitions);

  function registrationController($scope, _) {
    $scope.wizard = {};
    $scope.wizard.leadText = 'Welcome to Procur.';
    $scope.wizard.progressBar = [
      {
        label: 'Buyer or supplier selection',
        status: -1
      },
      {
        label: 'Company information',
        status: -1
      },
      {
        label: 'Verify email address',
        status: -1
      },
      {
        label: 'Select your custom link',
        status: -1
      }
    ];

    $scope.wizard.updateProgress = updateProgress;

    function updateProgress(step) {
      _.each($scope.wizard.progressBar, function(item, index) {
        if (step < index) {
          item.status = 1;
        }
        else if (step === index) {
          item.status = 0;
        }
        else {
          return false;
        }
      });
    }
  }

})(angular);