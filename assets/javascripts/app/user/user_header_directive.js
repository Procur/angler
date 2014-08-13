(function(angular) {

  var
    definitions;

  definitions = [
    userHeaderDirective
  ];

  angular.module('pc.User')
    .directive('pcUserHeader', definitions);

  function userHeaderDirective() {
    var
      definitions;

    definitions = [
      '$scope',
      'userService',
      'companyService',
      controller
    ];

    return {
      restrict: 'AC',
      controller: definitions,
      templateUrl: 'user_header.html',
      scope: {}
    };

    function controller($scope, user, company) {
      user().then(resolveUser);
      company().then(resolveCompany);

      function resolveUser(userProfile) {
        $scope.user = userProfile;
      }

      function resolveCompany(companyProfile) {
        $scope.company = companyProfile;
      }
    }

  }

})(angular);