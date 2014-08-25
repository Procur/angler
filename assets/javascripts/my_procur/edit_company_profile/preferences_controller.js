(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    preferencesController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('preferencesController', definitions);

  function preferencesController($scope, user) {
    $scope.user = {
      activeMode: user.activeMode,
      isSupplierMode: user.isSupplierMode,
      isBuyerMode: user.isBuyerMode
    };
  }

})(angular);