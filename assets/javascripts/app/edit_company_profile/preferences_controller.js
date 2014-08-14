(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    preferencesController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('preferencesController', definitions);

  function preferencesController($scope) {

  }

})(angular);