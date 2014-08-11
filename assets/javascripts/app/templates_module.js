angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row\"><div class=\"col-xs-5\"><div class=\"col-xs-4 user-profile\"><img ng-src=\"{{user.profile.image}}\"></div><div class=\"col-xs-8\"><h3 class=\"text-muted profile-name\">{{user.profile.name}}</h3><h4 class=\"company-name\">{{company.name}}</h4><h5><strong>PROCUR MEMBER SINCE {{user.profile.createdYear}}</strong></h5></div></div><div class=\"col-xs-5\"></div><div class=\"col-xs-2\"></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\">My Procur</a></div><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"\"><a ui-sref=\"#\">View Company Profile</a></li><li pc-nav=\"\"><a ui-sref=\"#\">Edit Company Profile</a></li><li pc-nav=\"userAccountSettings.updateSettings\"><a ui-sref=\"userAccountSettings.updateSettings\">User Account Settings</a></li></ul></div></div></nav>"
  );


  $templateCache.put('userAccountSettings.html',
    "<div id=\"userAccountSettings\"><div class=\"row\"><div class=\"col-sm-4\"><ul><li><a ui-sref=\"userAccountSettings.updateSettings\">Update Settings</a></li><li><a ui-sref=\"userAccountSettings.updatePassword\">Change Password</a></li></ul></div><div ui-view=\"\"></div></div></div>"
  );


  $templateCache.put('userUpdatePassword.html',
    "<div class=\"col-sm-8\"><div class=\"row headerRow\"><h4>Update Password</h4></div><div class=\"row updateForm\"><div class=\"col-md-6\"><h5>Enter New Password</h5><input type=\"text\" placeholder=\"First\"><br></div><div class=\"col-md-6\"><h5>Confirm New Password</h5><input type=\"text\" placeholder=\"Job Title\"><br></div></div></div>"
  );


  $templateCache.put('userUpdateSettings.html',
    "<div class=\"col-sm-8\"><div class=\"row headerRow\"><h4>Contact Information</h4></div><div class=\"row updateForm\"><div class=\"col-md-6\"><h5>Contact Name*</h5><input type=\"text\" placeholder=\"First\"> <input type=\"text\" placeholder=\"Last\"><br><h5>Current Email Address</h5><input type=\"text\" placeholder=\"Current Email\"><br><h5>Update Email Address</h5><input type=\"text\" placeholder=\"Enter New Address\"> <input type=\"text\" placeholder=\"Confirm New Address\"><br></div><div class=\"col-md-6\"><h5>Job Title</h5><input type=\"text\" placeholder=\"Job Title\"><br><h5>Update Profile Picture</h5><input type=\"file\"></div></div></div>"
  );

}]);
