(function(angular) {

  var
    definitions;

  definitions = [
    '_',
    'VALIDATION_TYPE',
    validationService
  ];

  angular.module('pc.Validation')
    .factory('validatorService', definitions);

  function validationService(_, VALIDATION_TYPE) {
    var
      self = {},
      validDigits = (/^\d+$/),
      invalidText = (/\d/),
      validEmail = (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      validPassword = (/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/),
      validPasswordMin = 8,
      validPasswordMax = 20,
      validUrl = (/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/),
      validPhoneNumber = (/^\d{1}[-\.\u0020\d]{6,16}$/),
      validCountryCode = (/^\+[1-9]+\d{0,2}$/);

    self[VALIDATION_TYPE.DIGITS] = validateDigits;
    self[VALIDATION_TYPE.TEXT] = validateText;
    self[VALIDATION_TYPE.REQUIRED] = validateRequired;
    self[VALIDATION_TYPE.EMAIL] = validateEmail;
    self[VALIDATION_TYPE.PASSWORD] = validatePassword;
    self[VALIDATION_TYPE.PASSWORDLENGTH] = validatePasswordLength;
    self[VALIDATION_TYPE.URL] = validateUrl;
    self[VALIDATION_TYPE.PHONENUMBER] = validatePhoneNumber;
    self[VALIDATION_TYPE.COUNTRYCODE] = validateCountryCode;
    self[VALIDATION_TYPE.CONFIRM] = validateConfirm;

    return self;

    function validateDigits(value) {
      return validDigits.test(value);
    }

    function validateText(value) {
      return !!value && !invalidText.test(value);
    }

    function validateRequired(value) {
      return !!value;
    }

    function validateEmail(value) {
      return validEmail.test(value);
    }

    function validatePassword(value) {
      return validPassword.test(value);
    }

    function validatePasswordLength(value) {
      return !!value && value.length >= validPasswordMin && value.length <= validPasswordMax;
    }

    function validateUrl(value) {
      return validUrl.test(value);
    }

    function validatePhoneNumber(value) {
      return validPhoneNumber.test(value);
    }

    function validateCountryCode(value) {
      return validCountryCode.test(value);
    }

    function validateConfirm(value1, value2) {
      return (_.isEmpty(value1) && _.isEmpty(value2)) || value1 === value2;
    }

  }

})(angular);