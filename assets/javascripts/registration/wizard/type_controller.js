(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    '$state',
    'ajaxService',
    'userService',
    'companyService',
    typeController
  ];

  angular.module('pc.Wizard')
    .controller('typeController', definitions);

  function typeController($scope, $state, ajax, user, company) {
    $scope.wizard.leadText = $state.current.data.leadText;
    $scope.wizard.progressBar.update($state.current.data.progressStep);

    $scope.selectType = selectType;

    function selectType(type) {
      ajax.put(user.get('apiToken'), '/api/users', {activeMode: type, defaultMode: type})
        .then(function(response) {
          company.set(response.activeMode, true);
          user.setActiveMode(response.activeMode);

          if (response.activeMode === 'supplier') {
            company.set('buyer', false);
            $state.go('wizard.finished_product');
          }
          else {
            company.set('supplier', false);
            $state.go('wizard.company_information');
          }
        })
        ['catch'](ajax.handleError);
    }

  }

})(angular);