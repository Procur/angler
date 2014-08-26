(function(angular) {
  var
    dependencies;

  dependencies = [
    'pc.Vendor.LoDash',
    'pc.Company'
  ];

  angular.module('pc.User', dependencies)
    .constant('USER_EVENTS', {
      ACTIVE_MODE_CHANGED: 'ACTIVE_MODE_CHANGED'
    });

})(angular);