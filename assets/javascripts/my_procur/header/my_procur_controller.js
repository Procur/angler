(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    myProcurController
  ];

  angular.module('pc.Header')
    .controller('myProcurController', definitions);

  function myProcurController($scope, user, company) {
    $scope.user = user;
    $scope.company = company;
  }

})(angular);