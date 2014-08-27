(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'snackbarService',
    formHandlerController
  ];

  angular.module('pc.FormHandler')
    .controller('formHandlerController', definitions);

  function formHandlerController($scope, snackbar) {

  }

})(angular);