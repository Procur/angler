(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    editCompanyProfileController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('editCompanyProfileController', definitions);

  function editCompanyProfileController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
  }

})(angular);