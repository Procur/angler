(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    'locationService',
    'viewCompanyProfileService',
    viewCompanyProfileController
  ];

  angular.module('pc.ViewCompanyProfile')
    .controller('viewCompanyProfileController', definitions);


  function viewCompanyProfileController($scope, user, company, location, actionItems) {


    $scope.user = { activeMode: user.get("activeMode") };

    $scope.company = { name : company.get("name"),
                       phoneExtension: company.get("phoneExtension"),
                       phoneNumber: company.get("phoneNumber"),
                       faxExtension: company.get("faxExtension"),
                       faxNumber: company.get("faxNumber"),
                       email: company.get("email"),
                       website: company.get("website"),
                       employeeCount: company.get("employeeCount"),
                       industry: company.get("industry")};

    $scope.location = location;

    $scope.actionItems = actionItems.get();
    console.log(actionItems);
  }

})(angular);
