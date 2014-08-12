angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row\"><div class=\"col-xs-5\"><div class=\"col-xs-4 user-profile\"><img ng-src=\"{{user.image}}\"></div><div class=\"col-xs-8\"><h3 class=\"text-muted profile-name\">{{user.firstName}} {{user.lastName}}</h3><h4 class=\"company-name\">{{company.name}}</h4><h5><strong>PROCUR MEMBER SINCE {{user.createdYear}}</strong></h5></div></div><div class=\"col-xs-5\"></div><div class=\"col-xs-2\"></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"dfd\"><a ui-sref=\"fdf\">View Company Profile</a></li><li pc-nav=\"dfd\"><a ui-sref=\"dfd\">Edit Company Profile</a></li><li pc-nav=\"user_account_settings\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li></ul></div><div class=\"navbar-header\"><span class=\"navbar-brand\">My Procur:</span></div></div></nav>"
  );


  $templateCache.put('user_header.html',
    "<div class=\"user-header clearfix\"><ul class=\"user-header-left\"><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><img src=\"/assets/images/procur.png\" class=\"procur-logo\"></a></li><li class=\"user-header-item\"><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Early Access</a></li><li class=\"user-header-item\"><p class=\"text-lowercase\">{{user.firstName}} {{user.lastName}}</p><p>·</p><p>{{company.name}}</p></li></ul><ul class=\"user-header-right\"><li class=\"user-header-item\" ng-if=\"company.buyer && company.supplier\"><button class=\"btn btn-link buyer-supplier-switch\" ng-click=\"user.toggleActiveMode()\">Currently in {{user.activeMode}} mode <i class=\"glyphicon glyphicon-transfer\"></i> Switch to {{user.inactiveMode}}</button></li><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li></ul></div>"
  );


  $templateCache.put('user_account_settings.html',
    "<div class=\"pcUpdateUserCompany\" id=\"user_account_settings\"><div class=\"row main_row\"><div class=\"col-sm-4 navPanel\"><ul><li pc-nav=\"update_settings\"><div class=\"rightSecBox\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"user_account_settings.update_settings\">Update Settings</a></li><li pc-nav=\"update_password\"><div class=\"rightSecBox\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"user_account_settings.update_password\">Change Password</a></li></ul></div><div ui-view=\"\"></div></div></div>"
  );


  $templateCache.put('user_update_password.html',
    "<div class=\"col-sm-8\"><div class=\"row headerRow\"><h4>Update Password</h4></div><div class=\"row updateForm\"><div class=\"col-md-6\"><h5>Enter New Password</h5><input type=\"text\" placeholder=\"First\"><br></div><div class=\"col-md-6\"><h5>Confirm New Password</h5><input type=\"text\" placeholder=\"Job Title\"><br></div></div><div class=\"row\"><button class=\"continueButton\" type=\"submit\">Save&nbsp;&nbsp; <span class=\"glyphicon glyphicon-ok\"></span></button></div></div>"
  );


  $templateCache.put('user_update_settings.html',
    "<div class=\"col-sm-8\"><div class=\"row headerRow\"><h4>Contact Information</h4></div><div class=\"row updateForm\"><div class=\"col-md-6\"><h5>Contact Name*</h5><input type=\"text\" placeholder=\"First\" value=\"{{user.firstName}}\"> <input type=\"text\" placeholder=\"Last\"><br><h5>Current Email Address</h5><input type=\"text\" placeholder=\"Current Email\"><br><h5>Update Email Address</h5><input type=\"text\" placeholder=\"Enter New Address\"> <input type=\"text\" placeholder=\"Confirm New Address\"><br></div><div class=\"col-md-6\"><h5>Job Title</h5><input type=\"text\" placeholder=\"Job Title\"><br><h5>Update Profile Picture</h5><input type=\"file\"></div></div><div class=\"row\"><button class=\"continueButton\" type=\"submit\">Save&nbsp;&nbsp; <span class=\"glyphicon glyphicon-ok\"></span></button></div></div>"
  );

}]);
