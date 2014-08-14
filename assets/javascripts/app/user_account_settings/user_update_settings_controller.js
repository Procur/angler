(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    userUpdateSettings
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdateSettings', definitions);

  function userUpdateSettings($scope) {
  }

})(angular);