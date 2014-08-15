(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.ThirdParty.Moxie'
  ];

  angular.module('pc.FileUpload', dependencies)
    .constant('FILE_EVENTS', {
      SELECTED: 'SELECTED',
      DROPPED: 'DROPPED'
    });

})(angular);