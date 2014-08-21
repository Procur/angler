(function(angular) {

  var
  definitions;

  definitions = [
  pcConfirm
  ]; 

  angular.module('pc.Validation').directive('pcConfirm', definitions);

  

  function pcConfirm() {

    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        field: '=pcConfirm'
      },
      link: function (scope, elm, attrs, ctrl) {
        var 
        errorElement,
        isConfirm;
        
        elm.on('blur keyup', function() {
          console.log(scope.field);
        console.log(ctrl.$viewValue);
          var isConfirm = scope.field === ctrl.$viewValue;
          if (!isConfirm) {
            if (!errorElement) {
              errorElement = elm.after('<p class="error">Does not match.</p>').next();
            }
          }  else {
            console.log("removing");
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
