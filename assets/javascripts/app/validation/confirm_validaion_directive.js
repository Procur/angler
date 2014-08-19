(function(angular) {

  var
    definitions;

  definitions = [
    
  ]; 

  angular.module('pc.Validation').directive('passwordConfirmation', definitions);

  function passwordConfirmation() {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function (viewValue, $scope) {
            var noMatch = viewValue != scope.passForm.password.$viewValue
            ctrl.$setValidity('noMatch', !noMatch)
        });
      }
    }
  }

})(angular);