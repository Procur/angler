(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    viewCompanyProfileController
  ];

  angular.module('pc.ViewCompanyProfile')
    .controller('viewCompanyProfileController', definitions);


  function viewCompanyProfileController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
  }








})(angular);
