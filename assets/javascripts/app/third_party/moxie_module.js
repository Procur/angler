(function(angular) {

  var
    dependencies = [],
    factoryDefinition;

  factoryDefinition = [
    '$window',
    moxie
  ];

  angular.module('pc.ThirdParty.Moxie', dependencies)
    .factory('moxie', factoryDefinition);

  function moxie($window) { return $window.mOxie; }

})(angular);