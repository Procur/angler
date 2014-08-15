(function(angular) {

  var
    dependencies = [],
    factoryDefinition;

  factoryDefinition = [
    '$window',
    plupload
  ];

  angular.module('pc.ThirdParty.Plupload', dependencies)
    .factory('plupload', factoryDefinition);

  function plupload($window) { return $window.plupload; }

})(angular);