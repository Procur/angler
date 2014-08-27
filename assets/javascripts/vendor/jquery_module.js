(function(angular) {

  var
    dependencies = [],
    factoryDefinition;

  factoryDefinition = [
    '$window',
    jquery
  ];

  angular.module('pc.Vendor.Jquery', dependencies)
    .factory('$', factoryDefinition);

  function jquery($window) { return $window.$; }

})(angular);