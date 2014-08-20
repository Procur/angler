(function(angular) {

  var
  definitions;

  definitions = [
  validPassword
  ]; 

  angular.module('pc.Validation').directive('validPassword', definitions);

  var errorElement;

  function validPassword() {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        elm.on('blur keyup', function() {
          if (!ctrl.$error.required && !ctrl.$error.minlength && !ctrl.$error.maxlength && ctrl.$error.pattern && ctrl.$dirty) 
          {
            if (!errorElement) {
              errorElement = elm.after('<p class="error">Must contain one lower &amp; uppercase letter, and one non-alpha character (a number or a symbol.)</p>').next();
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