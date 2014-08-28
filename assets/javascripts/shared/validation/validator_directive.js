(function(angular) {

  var
  definitions;

  definitions = [
    '_',
    'validatorService',
    'VALIDATION_MESSAGE',
    'VALIDATION_ERROR',
    'VALIDATION_EVENT',
    pcValidator
  ];

  angular.module('pc.Validation')
    .directive('pcValidator', definitions);

  function pcValidator(_, validatorService, VALIDATION_MESSAGE, VALIDATION_ERROR, VALIDATION_EVENT) {

    return {
      require: 'ngModel',
      scope: {
        validationType: '@pcValidator',
        field: '=pcConfirm'
      },
      link: link
    };

    function link(scope, elm, attrs, ngModel) {
      var
        errorElement,
        validationTypes = scope.validationType.split(' ');

      elm.on('blur keyup', doValidations);
      scope.$on(VALIDATION_EVENT.VALIDATE, doValidations);

      function doValidations() {
        _.each(validationTypes, doValidation);

        function doValidation(type) {
          if (validatorService[type]) {
            if (!validatorService[type](ngModel.$viewValue, scope.field)) {
              ngModel.$setValidity(VALIDATION_ERROR[type.toUpperCase()], false);
              decorate(type.toUpperCase());
              return false;
            }
            else {
              ngModel.$setValidity(VALIDATION_ERROR[type.toUpperCase()], true);
              clearDecoration();
            }
          }
        }
      }

      function decorate(type) {
        if (!errorElement) {
          errorElement = elm.after('<p class="error">' + VALIDATION_MESSAGE[type] + '</p>').next();
        }
      }

      function clearDecoration() {
        if (errorElement) {
          errorElement.remove();
          errorElement = null;
        }
      }

    }
  }
}) (angular);
