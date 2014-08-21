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
        //email regex
        elm.on('blur keyup', function() {
          var isConfirm = scope.field === elm.val();
          if (!isConfirm) {
            if (!errorElement) {
              errorElement = elm.after('<p class="error">bebop</p>').next();
            }
          }  else {
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
