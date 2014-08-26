(function(angular) {

  var
    definitions;

  definitions = [
    '$rootScope',
    '$scope',
    'userService',
    'buyerService',
    'supplierService',
    socialMediaController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('socialMediaController', definitions);

  function socialMediaController($rootScope, $scope, user, buyer, supplier) {
    var
      role;

    $scope.user = {
      activeMode: user.activeMode,
      isBuyerMode: user.isBuyerMode,
      isSupplierMode: user.isSupplierMode
    };

    $rootScope.$on('activeModeChanged', changeRole);

    function changeRole(event, data) {
      if (data === 'buyer') {
        role = buyer;
        getAttributes(role);
      }
      else {
        role = supplier;
        getAttributes(role);
      }
    }

    function getAttributes(role) {
      $scope.actor = {
        dba: role.get('dba'),
        facebook: role.get('socialMedia.facebook'),
        google: role.get('socialMedia.google+'),
        instagram: role.get('socialMedia.instagram'),
        linkedin: role.get('socialMedia.linkedin'),
        pinterest: role.get('socialMedia.pinterest'),
        twitter: role.get('socialMedia.twitter'),
        tumblr: role.get('socialMedia.tumblr')
      }
    }

  }

})(angular);