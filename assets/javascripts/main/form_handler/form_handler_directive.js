(function(angular) {

  var
    definitions;

  definitions = [
    'VALIDATION_EVENT',
    formHandlerDirective
  ];

  angular.module('pc.FormHandler')
    .directive('pcFormHandler', definitions);

  function formHandlerDirective(VALIDATION_EVENT) {

    return {
      restrict: 'AC',
      require: 'form',
      link: link,
      scope: false
    };

    function link(scope, elem, attrs, formCtrl) {
      elem.on('submit', handleSubmit);

      function handleSubmit(e) {
        scope.$broadcast(VALIDATION_EVENT.VALIDATE);
        if (formCtrl.$invalid) {
          e.preventDefault();
        }
      }
    }

  }

})(angular);