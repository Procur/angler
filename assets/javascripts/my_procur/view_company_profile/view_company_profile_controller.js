(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    'locationService',
    viewCompanyProfileController
  ];

  angular.module('pc.ViewCompanyProfile')
    .controller('viewCompanyProfileController', definitions);


  function viewCompanyProfileController($scope, user, company, location) {


    $scope.user = user;
    $scope.company = company;
    $scope.location = location;
  }








})(angular);
