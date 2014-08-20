(function(angular) {

  var
  definitions;

  definitions = [
  fieldConfirm
  ]; 

  angular.module('pc.Validation').directive('fieldConfirm', definitions);

  var errorElement;

  function fieldConfirm() {

    return {
      require: 'ngModel',
      scope: {
        password: '@'
      },
      link: function (scope, elm, attrs, ctrl) {
        elm.on('blur keyup', function() {
          if (ctrl.$error.required && ctrl.$error.noMatch && password.value.length != 0) 
          {
            if (!errorElement) {
              errorElement = elm.after('<p class="error">Passwords do not match.</p>').next();
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