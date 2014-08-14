(function(angular) {

  var
    definitions;

  definitions = [
    navDirective
  ];

  angular.module('pc.Nav')
    .directive('pcNav', definitions);

  function navDirective() {

    return {
      restrict: 'AC',
      replace: false,
      link: linker,
      scope: {
        state: '@pcNav'
      }
    };

    function linker(scope, element, attrs) {
      scope.$on('$stateChangeSuccess', setActiveNav);

      function setActiveNav(event, toState, toParams, fromState, fromParams) {
        if (toState.name.indexOf(scope.state) >= 0) {
          element.addClass('active');
        }
        else {
          element.removeClass('active');
        }
      }
    }

  }

})(angular);