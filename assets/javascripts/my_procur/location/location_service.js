(function(angular) {

  var
    definitions;

  definitions = [
    '$window',
    locationService
  ];

  angular.module('pc.Location')
    .factory('locationService', definitions);

  function locationService($window) {
    var
      location;

    location = $window.pc.localData.location;

    return location;
  }

})(angular);
