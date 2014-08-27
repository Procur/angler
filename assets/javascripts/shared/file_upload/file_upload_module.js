(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.Vendor.Moxie',
    'pc.Vendor.Jquery'
  ];

  angular.module('pc.FileUpload', dependencies)
    .constant('FILE_EVENTS', {
      SELECTED: 'SELECTED',
      DROPPED: 'DROPPED',
      HAS_IMAGE: 'HAS_IMAGE',
      INVALID_TYPE: 'INVALID_TYPE',
      INVALID_SIZE: 'INVALID_SIZE',
      INVALID_TYPE_SIZE: 'INVALID_TYPE_SIZE'
    });

})(angular);