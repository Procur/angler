(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    productionDetailsController
  ];

  angular.module('pc.EditCompanyProfile')
    .controller('productionDetailsController', definitions);

  function productionDetailsController($scope) {

  }

})(angular);