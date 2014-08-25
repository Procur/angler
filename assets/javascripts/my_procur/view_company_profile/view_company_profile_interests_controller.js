(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    viewCompanyProfileInterestsController
  ];

  angular.module('pc.ViewCompanyProfile')
    .controller('viewCompanyProfileInterestsController', definitions);


  function viewCompanyProfileInterestsController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
  }








})(angular);
