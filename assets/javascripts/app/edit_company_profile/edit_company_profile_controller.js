(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    editCompanyProfileController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('editCompanyProfileController', definitions);

  function editCompanyProfileController($scope) {
  }

})(angular);