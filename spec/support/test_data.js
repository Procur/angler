(function() {
  if (module && exports) {
    exports.user = getUser();
    exports.company = getCompany();
    exports.buyer = getBuyer();
    exports.supplier = getSupplier();
  }
  else if (window) {
    window.user = getUser();
    window.company = getCompany();
    window.buyer = getBuyer();
    window.supplier = getSupplier();
  }

  function getSupplier() {
    return {
      'contact': {
        'name': 'Iam Developer',
        'position': 'Purchasing Manager',
        'email': 'ideveloper@acme.com',
      },
      'createdAt': '2014-07-12T17:35:20.780Z',
      'updatedAt': '2014-07-12T17:35:21.314Z',
      'company': '53c16e2b186bbc0800ff2c03',
      'companyType': 'Association',
      'dba': 'ACME Systems',
      'logo': '53c16e2b186bbc0800edcd',
      'duns': '123489589',
      'acceptedCurrencies': [ 'USD' ],
      'acceptedPaymentTerms': [ 'MoneyGram' ],
      'active': true,
      'tradePreferences': {
          'preferredBuyerLanguage': 'Chinese (Jin)',
          'preferredBuyerLocation': 'Algeria',
          'preferredBuyerType': 'Affiliate Merchant'
      },
      'languages': [ 'Chinese (Cantonese)' ],
      'locations': [ '53c16e2b186bbc3400ff2c60' ],
      'socialMedia': {
          'facebook': '100000126516331',
          'google+': '+ACMESystems',
          'instagram': 'ACMEPhotos',
          'linkedIn': 'acmesystems',
          'pinterest': 'acmepins',
          'twitter': '@acmesystems',
          'tumblr': 'ACMESystems'
      },
      'profileLink': {
          'title': 'Supplier Trade Kit',
          'url': 'https://www.acme.com/supplierkit.html'
      },
      'companyDescription': 'Lorem ipsum...',
      'productDescription': 'Ipsum lorem...',
      'assets': [ '241b530a1fc356bf826c7589610cb928' ],
      'photos': [ 'http://res.cloudinary.com/huewqecyr/image/upload/v1407765461/pv7ubw6hlfyrrra3hcjy.jpg' ],
      'responsibilityStatements': {
          'environmentalSustainability': 'Lorem ipsum...',
          'qualitySourcing': 'Lorem ipsum...',
          'workplaceSafety': 'Lorem ipsum...',
          'laborEducationTraining': 'Lorem ipsum...',
          'reinvestment': 'Lorem ipsum...'
      }
    };
  }

  function getBuyer() {
    return {
      'contact': {
        'name': 'Iam Developer',
        'position': 'Purchasing Manager',
        'email': 'ideveloper@acme.com',
      },
      'createdAt': '2014-07-12T17:35:20.780Z',
      'updatedAt': '2014-07-12T17:35:21.314Z',
      'company': '53c16e2b186bbc0800ff2c03',
      'companyType': 'Association',
      'dba': 'ACME Systems',
      'logo': '53c16e2b186bbc0800edcd',
      'duns': '123489589',
      'acceptedCurrencies': [ 'USD' ],
      'acceptedPaymentTerms': [ 'MoneyGram' ],
      'active': true,
      'tradePreferences': {
          'preferredSupplierLanguage': 'Chinese (Jin)',
          'preferredSupplierLocation': 'Algeria',
          'preferredSupplierType': 'Affiliate Merchant'
      },
      'languages': [ 'Chinese (Cantonese)' ],
      'locations': [ '53c16e2b186bbc3400ff2c60' ],
      'socialMedia': {
          'facebook': '100000126516331',
          'google+': '+ACMESystems',
          'instagram': 'ACMEPhotos',
          'linkedIn': 'acmesystems',
          'pinterest': 'acmepins',
          'twitter': '@acmesystems',
          'tumblr': 'ACMESystems'
      },
      'profileLink': {
          'title': 'Supplier Trade Kit',
          'url': 'https://www.acme.com/supplierkit.html'
      },
      'companyDescription': 'Lorem ipsum...',
      'productDescription': 'Ipsum lorem...',
      'assets': [ '241b530a1fc356bf826c7589610cb928' ],
      'photos': [ 'bd8a7c51fcb4f9c3391e59e0c4efaf39' ],
      'responsibilityStatements': {
          'environmentalSustainability': 'Lorem ipsum...',
          'qualitySourcing': 'Lorem ipsum...',
          'workplaceSafety': 'Lorem ipsum...',
          'laborEducationTraining': 'Lorem ipsum...',
          'reinvestment': 'Lorem ipsum...'
      },
      'productCategories': [

      ]
    };
  }

  function getCompany() {
    return {
      'active': true,
      'buyer': true,
      'supplier': true,
      'name': 'wayne enterprises',
      'createdAt': '2014-08-07T02:15:42.447Z',
      'email': 'info@wayne.com',
      'employeeCount': '11 - 50',
      'website': 'http://www.wayneenterprises.com',
      'industry': 'technology',
      'faxCountryCode': '1',
      'faxExtension': '',
      'faxNumber': '5555555555',
      'phoneExtension': '',
      'phoneNumber': '4048499521',
      'phoneNumberCountryCode': '1',
      'location': {
        "showHq": true,
        "companyIsHq": {
          "addressLine1": "Address Line 1 Placeholder",
          "addressLine2": "Address Line 2 Placeholder",
          "city": "City Placeholder",
          "province": "Province Placeholder",
          "country": "Country Placeholder"
        },
        "companyNotHq": {
          "addressLine1": "HQ Address Line 1 Placeholder",
          "addressLine2": "HQ Address Line 2 Placeholder",
          "city": "HQ City Placeholder",
          "province": "HQ Province Placeholder",
          "country": "HQ Country Placeholder"
        }
      }
    };
  }

  function getUser() {
    return {
      'firstName': 'bruce',
      'lastName': 'wayne',
      'email': 'notBatman@wayne.com',
      'emailVerified': false,
      'profileComplete': false,
      'active': true,
      'activeMode': 'supplier',
      'image': 'http://static.comicvine.com/uploads/original/11116/111164870/3842465-1216439145-batma.png',
      'createdAt': '2014-08-07T02:15:42.447Z',
      'updatedAt': '2014-08-12T04:35:40.447Z',
      'jobTitle': 'philanthropist'
    };
  }

})();
