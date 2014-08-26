(function(angular) {

  var
    definitions;

  definitions = [
    '$scope',
    'userService',
    'companyService',
    'locationService',
    'supplierService',
    'buyerService',
    'viewCompanyProfileService',
    viewCompanyProfileController
  ];

  angular.module('pc.ViewCompanyProfile')
    .controller('viewCompanyProfileController', definitions);


  function viewCompanyProfileController($scope, user, company, location, supplier, buyer, actionItems) {


    $scope.user = { activeMode: user.get("activeMode"),
                    isBuyerMode: user.isBuyerMode,
                    isSupplierMode: user.isSupplierMode};

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

    $scope.supplier = { duns: supplier.get('duns'),
                        companyType: supplier.get('companyType'),
                        languages: supplier.get('languages'),
                        productCategories: supplier.get('productCategories')};

    $scope.buyer = { duns: buyer.get('duns'),
                     companyType: buyer.get('companyType'),
                     languages: buyer.get('languages'),
                     productCategories: buyer.get('productCategories')};

    $scope.actionItems = actionItems.get();
    console.log($scope.user.activeMode);
  }

})(angular);
