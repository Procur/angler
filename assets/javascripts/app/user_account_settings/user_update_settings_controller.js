(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'ajaxService',
    'FILE_EVENTS',
    'userService',
    userUpdateSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdateSettingsController', definitions);

  function userUpdateSettingsController($scope, ajax, FILE_EVENTS, user) {
    $scope.user = user;

    $scope.$on(FILE_EVENTS.SELECTED, onImageSelected);

    /*$scope.saveProfile = function() {
      ajax.put('/views/api/update_user.json', {profile: $scope.userProfile})
        .then(function(res) {
          console.log(res);
        });
    };*/

    function onImageSelected(e, file, dataUrl) {
      $scope.newProfilePicture = {
        file: file,
        base64Url: dataUrl
      };

      $scope.$digest();
    }


  }

})(angular);