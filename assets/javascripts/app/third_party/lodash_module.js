(function(angular) {

  var
    dependencies = [];

  angular.module('pc.thirdParty.LoDash', dependencies)
    .factory('_', lodashFactory);

  function lodashFactory() { return window._; }

})(angular);