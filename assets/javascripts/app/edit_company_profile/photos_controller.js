(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'supplierService',
    'snackbarService',
    'ajaxService',
    'FILE_EVENTS',
    photosController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('photosController', definitions);

  function photosController($scope, user, supplier, snackbar, ajax, FILE_EVENTS) {
    $scope.user = user;

    $scope.$on(FILE_EVENTS.SELECTED, onImageSelected);
    $scope.$on(FILE_EVENTS.INVALID_TYPE, invalidType);
    $scope.$on(FILE_EVENTS.INVALID_SIZE, invalidSize);
    $scope.$on(FILE_EVENTS.INVALID_TYPE_SIZE, invalidTypeAndSize);

    $scope.supplier = supplier;

    function onImageSelected(e, file, dataUrl) {
      $scope.newProfilePicture = {
        file: file,
        base64Url: dataUrl
      };

      $scope.$digest();
      $scope.$broadcast('imagePreviewHasImage');
    }

    function invalidType() {
      // TODO -- add better copy
      snackbar.error('Please choose a valid image type - jpg, jpeg, svg, or png.');
    }

    function invalidSize() {
      // TODO -- add better copy
      snackbar.error('Your image is larger than 20MB. Please choose another image.');
    }

    function invalidTypeAndSize() {
      // TODO -- add better copy
      snackbar.error('Please select an image.')
    }

  }

})(angular);