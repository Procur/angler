(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    editCompanyProfileController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('editCompanyProfileController', definitions);

  function editCompanyProfileController($scope, user) {
    $scope.user = {
      activeMode: user.activeMode,
      isSupplierMode: user.isSupplierMode,
      isBuyerMode: user.isBuyerMode
    };
  }

})(angular);