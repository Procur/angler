(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'progressService',
    registrationController
  ];

  angular.module('pc.Registration')
    .controller('registrationController', definitions);

  function registrationController($scope, progressBar) {
    $scope.wizard = {
      leadText: 'Welcome to Procur.',
      progressBar: progressBar
    };
  }

})(angular);