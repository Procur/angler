(function(angular) {

  var
    definitions;

  definitions = [
    '_',
    progressService
  ];

  angular.module('pc.Wizard')
    .factory('progressService', definitions);

  function progressService(_) {
    var
      progressBar = init();

    progressBar.update = updateProgress;

    return progressBar;

    function init() {
      return [
        {
          label: 'Buyer or supplier selection',
          status: -1
        },
        {
          label: 'Company information',
          status: -1
        },
        {
          label: 'Verify email address',
          status: -1
        },
        {
          label: 'Select your custom link',
          status: -1
        }
      ];
    }

    function updateProgress(step) {
      _.each(progressBar, updateProgressItem);

      function updateProgressItem(item, index) {
        if (step > index) {
          item.status = 1;
        }
        else if (step === index) {
          item.status = 0;
        }
        else {
          item.status = -1;
        }
      }
    }
  }

})(angular);