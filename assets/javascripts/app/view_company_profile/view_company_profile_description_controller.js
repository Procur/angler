(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    viewCompanyProfileDescriptionController
  ];

  angular.module('pc.ViewCompanyProfile')
    .controller('viewCompanyProfileDescriptionController', definitions);


  function viewCompanyProfileDescriptionController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
  }








})(angular);
