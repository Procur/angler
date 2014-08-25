(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'progressService',
    wizardController
  ];

  angular.module('pc.Wizard')
    .controller('wizardController', definitions);

  function wizardController($scope, progressBar) {
    $scope.wizard = {
      leadText: 'Welcome to Procur.',
      progressBar: progressBar
    };
  }

})(angular);