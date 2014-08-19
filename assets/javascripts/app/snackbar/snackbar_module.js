(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.ThirdParty.LoDash'
  ];

  angular.module('pc.Snackbar', dependencies)
    .constant('POSITIONS', {
      'TOP_LEFT': 'TOP_LEFT',
      'BOTTOM_RIGHT': 'BOTTOM_RIGHT',
      'TOP_RIGHT': 'TOP_RIGHT',
      'BOTTOM_LEFT': 'BOTTOM_LEFT'
    })
    .constant('POSITION_CLASSES', {
      'TOP_LEFT': 'snackbar-top-left',
      'BOTTOM_RIGHT': 'snackbar-bottom-right',
      'TOP_RIGHT': 'snackbar-top-right',
      'BOTTOM_LEFT': 'snackbar-bottom-left'
    });

})(angular);