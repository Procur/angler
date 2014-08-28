(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$window',
    'ajaxService',
    'snackbarService',
    'VALIDATION_EVENT',
    formHandlerController
  ];

  angular.module('pc.FormHandler')
    .controller('formHandlerController', definitions);

  function formHandlerController($scope, $window, ajax, snackbar, VALIDATION_EVENT) {
    if ($window.pc && $window.pc.localData && $window.pc.localData.error) {
      snackbar.error($window.pc.localData.error);
    }

    $scope.onSubmit = onSubmit;
    $scope.fields = {};

    function onSubmit(path) {
      $scope.$broadcast(VALIDATION_EVENT.VALIDATE);
      if ($scope.form.$valid) {
        ajax.post(null, path, $scope.fields)
          .then(handleResponse)
          ['catch'](ajax.handleError);
      }
    }

    function handleResponse(res) {
      if (res.message) {
        snackbar.success(res.message);
      }

      if (res.apiToken) {
        // TODO: store apiToken in session or Cookie store
      }

      if (res.redirect) {
        $window.location.assign(res.redirect);
      }
    }
  }

})(angular);