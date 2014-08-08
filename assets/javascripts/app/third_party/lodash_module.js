(function(angular) {

  var
    dependencies = [];

  angular.module('pc.third_party.LoDash', dependencies)
    .factory('_', lodashFactory);

  function lodashFactory() { return window._; }

})(angular);