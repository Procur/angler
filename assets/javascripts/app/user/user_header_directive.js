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
      user.init().then(resolveUserName);
      company.init().then(resolveCompanyName);

      function resolveUserName(userProfile) {
        $scope.user = {
          name: userProfile.first_name + ' ' + userProfile.last_name
        };
      }

      function resolveCompanyName(companyProfile) {
        $scope.company = {
          name: companyProfile.name
        };
      }
    }

  }

})(angular);