(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$window',
    '$cookies',
    'ajaxService',
    'snackbarService',
    'VALIDATION_EVENT',
    formHandlerController
  ];

  angular.module('pc.FormHandler')
    .controller('formHandlerController', definitions);

  function formHandlerController($scope, $window, $cookies, ajax, snackbar, VALIDATION_EVENT) {
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

      if (res.apitoken) {
        $cookies['pc.token'] = res.apitoken;
      }

      if (res.redirect) {
        $window.location.assign(res.redirect);
      }
    }
  }

})(angular);