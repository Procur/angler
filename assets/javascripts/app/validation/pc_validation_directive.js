(function(angular) {

  var
  definitions;

  definitions = [
  pcValidation
  ]; 

  angular.module('pc.Validation').directive('pcValidation', definitions);

  

  function pcValidation() {

    return {
      require: 'ngModel',
      scope: {
        validationType: '@pcValidation'
      },
      link: function (scope, elm, attrs, ctrl) {
        var errorElement;
        //email regex
        var reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var reUrl = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;

        elm.on('blur keyup', function() {

          if (scope.validationType === 'required' ) {
            if (elm.val()) {
              ctrl.$setValidity('pcRequired', true);
            } else {
              ctrl.$setValidity('pcRequired', false);
            }

            if (ctrl.$error.pcRequired && ctrl.$dirty) {
              if (!errorElement) {
                errorElement = elm.after('<p class="error">required</p>').next();
              }
            }  else {
              if (errorElement) {
                errorElement.remove();
                errorElement = null;
              }
            }
          }
          
          if (scope.validationType === 'email') {
            ctrl.$setValidity('pcEmail', reEmail.test(elm.val()));

            if (ctrl.$error.pcEmail && ctrl.$dirty && elm.val()) {
              if (!errorElement) {
                errorElement = elm.after('<p class="error">Enter a Valid Email.</p>').next();
              }
            }  else {
              if (errorElement) {
                errorElement.remove();
                errorElement = null;
              }
            }
          }

          if (scope.validationType === 'password') {

          }

          if (scope.validationType === 'url') {
            ctrl.$setValidity('pcUrl', reUrl.test(elm.val()));

            if (ctrl.$error.pcUrl && ctrl.$dirty && elm.val()) {
              if (!errorElement) {
                errorElement = elm.after('<p class="error">Enter a Valid Url With http://.</p>').next();
              }
            }  else {
              if (errorElement) {
                errorElement.remove();
                errorElement = null;
              }
            }
          }


          

        });




      }
    }
  }

})(angular);
