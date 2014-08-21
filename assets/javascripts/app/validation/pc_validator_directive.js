(function(angular) {

  var
  definitions;

  definitions = [
  pcValidator
  ]; 

  angular.module('pc.Validation').directive('pcValidator', definitions);

  

  function pcValidator() {

    return {
      require: 'ngModel',
      scope: {
        validationType: '@pcValidator'
      },
      link: function (scope, elm, attrs, ctrl) {
        var errorElement;
        //email regex
        var reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var reUrl = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;
        var rePassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/;
        var passMin = 8;
        var passMax = 20;

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
            ctrl.$setValidity('pcPassword', rePassword.test(elm.val()));

            if (ctrl.$error.pcPassword && ctrl.$dirty && elm.val()) {
              if (!errorElement) {
                errorElement = elm.after('<p class="error">Must contain one lower &amp; uppercase letter, and one non-alpha character (a number or a symbol.)</p>').next();
              }
            }  else {
              if (errorElement) {
                errorElement.remove();
                errorElement = null;
              }
            }
            if (!ctrl.$error.required && (ctrl.$error.minlength || ctrl.$error.maxlength) && ctrl.$dirty) {
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
