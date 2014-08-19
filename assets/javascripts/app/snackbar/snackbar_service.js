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
    snackbarService
  ];

  angular.module('pc.Snackbar')
    .factory('snackbarService', definitions);

  function snackbarService($document, $rootScope, $templateCache, $compile, $timeout, $animate, _, POSITIONS, POSITION_CLASSES) {
    var
      templateUrl = 'snackbar.html',
      template = $templateCache.get(templateUrl),
      scope = $rootScope.$new(),
      body = $document.find('body'),
      queue = [];

    return {
      success: success,
      error: error,
      notice: notice
    };

    function success(message) {
      var
        successConfig;

      successConfig = {
        'background-color': '#5cc672'
      };

      notice(message, successConfig);
    }

    function error(message) {
      var
        errorConfig;

      errorConfig = {
        'background-color': '#FF5A5A'
      };

      notice(message, errorConfig);
    }

    function notice(message, config) {
      var
        snackbar,
        styles,
        position;

      if (message) {
        styles = getStyles(config);
        position = getPosition(config);
        snackbar = $compile(template)(scope)
          .addClass(position)
          .css(styles.wrapper);
        snackbar.find('p')
          .css(styles.message)
          .html(message);

        if (queue.length) {
          _.each(queue, clearSnackbar);
        }

        insertSnackbar();
        snackbar.timeout = {
          popout: $timeout(snackbarPopOut, 4000),
          remove: $timeout(removeSnackbar, 4200)
        };
      }

      function insertSnackbar() {
        $animate.enter(snackbar, body, null, snackbarPopIn);
        queue.push(snackbar);
      }

      function removeSnackbar() {
        $animate.leave(snackbar);
        queue.shift();
      }

      function snackbarPopIn() {
        snackbar.addClass('pop-up');
      }

      function snackbarPopOut() {
        snackbar
          .addClass('pop-out')
          .removeClass('pop-up');
      }

      function clearSnackbar(item, index) {
        $timeout.cancel(item.timeout.popout);
        $timeout.cancel(item.timeout.remove);
        $animate.leave(item);
        queue.splice(index, 1);
      }

      /**
      * Commenting this out for now in preference to clearing out since
      * clearing is more mobile friendly
      **
      function stackSnackbar(item) {
        if (item.hasClass(POSITION_CLASSES.TOP_LEFT) || item.hasClass(POSITION_CLASSES.TOP_RIGHT)) {
          item.css('top', getStackHeight('top') + 'px');
        }
        else {
          item.css('bottom', getStackHeight('bottom') + 'px');
        }

        function getStackHeight(topOrBottom) {
          var
            stackMargin = 24,
            stackbarHeight = 30,
            currentMargin = parseInt(item.css(topOrBottom), 10),
            fontSize = parseInt(item.children().css('font-size'), 10);

          return (currentMargin || stackMargin) +
            (stackbarHeight + fontSize + stackMargin);
        }
      }
      */

    }

    function getStyles(config) {
      config = config || {};

      return {
        wrapper: {
          'background-color': config['background-color'] || '#333132',
        },
        message: {
          'font-size': config['font-size'] || '14px',
          'font-weight': '300',
          'color': config.color || '#fff'
        }
      };
    }

    function getPosition(config) {
      var
        position;

      config = config || {};
      position = POSITIONS[config.position];
      return position ? POSITION_CLASSES[position] : POSITION_CLASSES.BOTTOM_LEFT;
    }
  }

})(angular);