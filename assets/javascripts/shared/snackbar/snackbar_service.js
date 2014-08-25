(function(angular) {

  var
    definitions;

  definitions = [
    '$document',
    '$rootScope',
    '$templateCache',
    '$compile',
    '$timeout',
    '$animate',
    '_',
    'POSITIONS',
    'POSITION_CLASSES',
    'SNACKBAR_COLORS',
    snackbarService
  ];

  angular.module('pc.Snackbar')
    .factory('snackbarService', definitions);

  function snackbarService($document, $rootScope, $templateCache, $compile, $timeout, $animate, _, POSITIONS, POSITION_CLASSES, COLORS) {
    var
      templateUrl = 'snackbar.html',
      template = $templateCache.get(templateUrl),
      scope = $rootScope.$new(),
      body = $document.find('body'),
      POP_UP = 'snackbar-pop-up',
      POP_OUT = 'snackbar-pop-out',
      POP_OUT_TIMEOUT = 4000,
      REMOVE_TIMEOUT = 4200,
      stack = [];

    return {
      success: success,
      error: error,
      notice: notice
    };

    function success(message) {
      var
        successConfig;

      successConfig = {
        'background-color': COLORS.SUCCESS
      };

      notice(message, successConfig);
    }

    function error(message) {
      var
        errorConfig;

      errorConfig = {
        'background-color': COLORS.ERROR
      };

      notice(message, errorConfig);
    }

    function notice(message, config) {
      var
        snackbar,
        styles,
        position;

      config = config || {};

      if (message) {
        styles = getStyles();
        position = getPosition();

        scope.message = message;
        scope.styles = styles;
        scope.position = position;

        snackbar = $compile(template)(scope);

        if (stack.length) {
          _.each(stack, clearSnackbar);
        }

        insertSnackbar();
        snackbar.timeout = {
          pop_out: $timeout(snackbarPopOut, POP_OUT_TIMEOUT),
          remove: $timeout(removeSnackbar, REMOVE_TIMEOUT)
        };
      }

      function insertSnackbar() {
        $animate.enter(snackbar, body, null, snackbarPopIn);
        stack.push(snackbar);
      }

      function removeSnackbar() {
        $animate.leave(snackbar);
        stack.shift();
      }

      function snackbarPopIn() {
        $timeout(function snackbarPopInTimeout() {
          snackbar.addClass(POP_UP);
        }, 0);
      }

      function snackbarPopOut() {
        snackbar
          .addClass(POP_OUT)
          .removeClass(POP_UP);
      }

      function clearSnackbar(item, index) {
        $timeout.cancel(item.timeout.pop_out);
        $timeout.cancel(item.timeout.remove);
        $animate.leave(item);
        stack.splice(index, 1);
      }

      function getStyles() {
        return {
          wrapper: {
            'background-color': config['background-color'] || COLORS.DEFAULT,
          },
          message: {
            'color': config.color || '#FFF'
          }
        };
      }

      function getPosition() {
        var
          position = POSITIONS[config.position];

        return position ? POSITION_CLASSES[position] : POSITION_CLASSES.BOTTOM_LEFT;
      }
    }
  }

})(angular);