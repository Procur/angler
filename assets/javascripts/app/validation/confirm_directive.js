(function(angular) {

  var
  definitions;

  definitions = [
  minMaxLength
  ]; 

  angular.module('pc.Validation').directive('minMaxLength', definitions);

  var errorElement;

  function minMaxLength() {
    return {
      require: 'ngModel',
      scope: {
        password: '@'
      },
      link: function (scope, elm, attrs, ctrl) {
        elm.on('blur keyup', function() {
          if (!ctrl.$error.required && (ctrl.$error.minlength || ctrl.$error.maxlength) && ctrl.$dirty) 
          {
            if (!errorElement) {
              errorElement = elm.after('<p class="error">required</p>').next();
            }
          } 
          else {
            if (errorElement) {
              errorElement.remove();
              errorElement = null;
            }
          }
        });




      }
    }
  }

})(angular);