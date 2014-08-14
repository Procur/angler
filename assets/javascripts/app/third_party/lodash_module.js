(function(angular) {

  var
    dependencies = [];

  angular.module('pc.ThirdParty.LoDash', dependencies)
    .factory('_', lodashFactory);

  function lodashFactory() { return window._; }

})(angular);