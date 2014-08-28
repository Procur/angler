angular.module('pc.FormHandler.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('snackbar.html',
    "<div class=\"snackbar\" role=\"alert\" ng-style=\"styles.wrapper\" ng-class=\"position\"><p class=\"snackbar-message\" ng-style=\"styles.message\">{{message}}</p></div>"
  );

}]);
