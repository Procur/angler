(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.Vendor.Moxie'
  ];

  angular.module('pc.FileUpload', dependencies)
    .constant('FILE_EVENTS', {
      SELECTED: 'SELECTED',
      DROPPED: 'DROPPED',
      INVALID_TYPE: 'INVALID_TYPE',
      INVALID_SIZE: 'INVALID_SIZE',
      INVALID_TYPE_SIZE: 'INVALID_TYPE_SIZE'
    });

})(angular);