(function(angular) {

  var
  definitions;

  definitions = [
  minMaxLength
  ]; 

  angular.module('pc.Validation').directive('minMaxLength', definitions);

  

  function minMaxLength() {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        var errorElement;
        elm.on('blur keyup', function() {
          if (!ctrl.$error.required && (ctrl.$error.minlength || ctrl.$error.maxlength) && ctrl.$dirty) 
          {
            if (!errorElement) {
              errorElement = elm.after('<p class="error">Passwords must be between 8 and 20 characters.</p>').next();
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