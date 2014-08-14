(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'ajaxService',
    'FILE_EVENTS',
    userUpdateSettings
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdateSettings', definitions);

  function userUpdateSettings($scope, ajax, FILE_EVENTS) {

    $scope.$on(FILE_EVENTS.SELECTED, function(e, file, dataUrl) {
      $scope.userProfile = {
        file: file,
        base64Url: dataUrl
      };

      console.log($scope.userProfile);
      $scope.$apply();
    });

    $scope.saveProfile = function() {
      ajax.put('/views/api/update_user.json', {profile: $scope.userProfile})
        .then(function(res) {
          console.log(res);
        });
    };
  }

})(angular);