angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row\"><div class=\"col-xs-5\"><div class=\"col-xs-4 user-profile\"><img ng-src=\"{{user.image}}\"></div><div class=\"col-xs-8\"><h3 class=\"text-muted profile-name\">{{user.firstName}} {{user.lastName}}</h3><h4 class=\"company-name\">{{company.name}}</h4><h5><strong>PROCUR MEMBER SINCE {{user.createdYear}}</strong></h5></div></div><div class=\"col-xs-5\"></div><div class=\"col-xs-2\"></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"\"><a ui-sref=\"#\">View Company Profile</a></li><li pc-nav=\"\"><a ui-sref=\"#\">Edit Company Profile</a></li><li pc-nav=\"\"><a ui-sref=\"#\">User Account Settings</a></li></ul></div><div class=\"navbar-header\"><span class=\"navbar-brand\">My Procur:</span></div></div></nav>"
  );


  $templateCache.put('user_header.html',
    "<div class=\"user-header clearfix\"><ul class=\"user-header-left\"><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><img src=\"/assets/images/procur.png\" class=\"procur-logo\"></a></li><li class=\"user-header-item\"><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Early Access</a></li><li class=\"user-header-item\"><p class=\"text-lowercase\">{{user.firstName}} {{user.lastName}}</p><p>·</p><p>{{company.name}}</p></li></ul><ul class=\"user-header-right\"><li class=\"user-header-item\"><button class=\"btn btn-link buyer-supplier-switch\" ng-click=\"user.toggleActiveMode()\">Currently in {{user.activeMode}} mode <i class=\"glyphicon glyphicon-transfer\"></i> Switch to {{user.inactiveMode}}</button></li><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li></ul></div>"
  );

}]);
