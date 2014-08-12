(function(angular) {

  var
    definitions;

  definitions = [
    userHeaderDirective
  ];

  angular.module('pc.Nav')
    .directive('pcUserHeader', definitions);

  function userHeaderDirective() {
    var
      definitions;

    definitions = [
      '$scope',
      controller
    ];

    return {
      restrict: 'AC',
      controller: definitions,
      templateUrl: 'user_header.html'
    };

    function controller($scope) {
      $scope.user = {
        name: 'Chris Hourihan'
      };

      $scope.company = {
        name: 'Chris-test'
      };
    }

  }

})(angular);