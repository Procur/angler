(function(angular) {

  var
  definitions;

  definitions = [
  fieldExist
  ]; 

  angular.module('pc.Validation').directive('fieldExist', definitions);

  

  function fieldExist() {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        var errorElement;
        elm.on('blur keyup', function() {
          if (ctrl.$error.required && ctrl.$dirty) 
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