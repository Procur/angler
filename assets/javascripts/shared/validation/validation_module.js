(function(angular) {

  var
    dependencies;

  dependencies = [
    'pc.Vendor.LoDash'
  ];

  angular.module('pc.Validation', dependencies)
    .constant('VALIDATION_TYPE', {
      DIGITS: 'digits',
      TEXT: 'text',
      REQUIRED: 'required',
      EMAIL: 'email',
      PASSWORD: 'password',
      PASSWORDLENGTH: 'passwordLength',
      URL: 'url',
      PHONENUMBER: 'phoneNumber',
      COUNTRYCODE: 'countryCode',
      CONFIRM: 'confirm'
    })
    .constant('VALIDATION_ERROR', {
      DIGITS: 'pcDigits',
      TEXT: 'pcText',
      REQUIRED: 'pcRequired',
      EMAIL: 'pcEmail',
      PASSWORD: 'pcPassword',
      PASSWORDLENGTH: 'pcPassword',
      URL: 'pcUrl',
      PHONENUMBER: 'pcPhoneNumber',
      COUNTRYCODE: 'pcCountryCode',
      CONFIRM: 'pcConfirm'
    })
    .constant('VALIDATION_MESSAGE', {
      DIGITS: 'Please only enter numbers',
      TEXT: 'Please only enter letters',
      REQUIRED: 'This field is required',
      EMAIL: 'Please enter a valid email',
      PASSWORD: 'Password must contain a number, a lowercase letter, and an uppercase letter',
      PASSWORDLENGTH: 'Password must be between 8 and 20 characters in length',
      URL: 'Please enter a valid url starting with http://',
      PHONENUMBER: 'Please enter a valid phone number',
      COUNTRYCODE: 'Please enter a valid country code',
      CONFIRM: 'Fields do not match'
    })
    .constant('VALIDATION_EVENT', {
      VALIDATE: 'VALIDATE'
    });

})(angular);