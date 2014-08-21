(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'FILE_EVENTS',
    userUpdateSettingsController
  ];

  angular.module('pc.UserAccountSettings')
    .controller('userUpdateSettingsController', definitions);

  function userUpdateSettingsController($scope, user, FILE_EVENTS) {
    $scope.user = {
      firstName: user.get('firstName'),
      lastName: user.get('lastName'),
      email: user.get('email'),
      jobTitle: user.get('jobTitle'),
      image: user.get('image')
    };

    $scope.$on(FILE_EVENTS.SELECTED, onImageSelected);

    function onImageSelected(e, file, dataUrl) {
      $scope.newProfilePicture = {
        file: file,
        base64Url: dataUrl
      };

      $scope.$digest();
    }


  }

})(angular);