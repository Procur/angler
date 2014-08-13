angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row dashboard\"><div class=\"col-xs-4\"><div class=\"row user-profile\"><div class=\"col-xs-4\"><img ng-src=\"{{user.image}}\"></div><div class=\"col-xs-8\"><h4 class=\"text-muted profile-name\">{{user.firstName}} {{user.lastName}}</h4><h5 class=\"company-name\">{{company.name}}</h5><h6 class=\"member-since\">Procur member since {{user.createdYear}}</h6></div></div><div class=\"row\"><div class=\"col-xs-12 sub-nav\"><ul class=\"list-separator\"><li><a ui-sref=\"#\"><i class=\"glyphicon glyphicon-cog\"></i> Edit User Account Settings</a></li><li><a ui-sref=\"#\"><i class=\"glyphicon glyphicon-new-window\"></i> View My Company Profile</a></li></ul></div></div><div class=\"row\"><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Company</li><li><a href=\"https://procur.com/earlyaccess\">Early Access</a></li><li><a href=\"https://procur.com/features\">Upcoming Features</a></li><li><a href=\"https://procur.com/pricing\">Membership & Pricing</a></li><li><a href=\"https://procur.com/about\">About Procur</a></li></ul></div><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Help & Support</li><li><a href=\"https://procur.com/faq\">FAQ</a></li><li><a href=\"https://procur.com/contact\">Contact Us</a></li><li><a href=\"https://procur.com/support\">Support Topics</a></li><li><a href=\"mailto:support@procur.com\">Email Support</a></li></ul></div></div></div><div class=\"col-xs-5\"><div class=\"panel-content action-items\"><div class=\"panel-heading\"><h5>My Procur Action Items</h5></div><div class=\"panel-body\"><p class=\"lead\">Welcome to Procur Early Access!</p><p>We're inviting select users to register with Procur before opening up our full platform later this summer. During Early Access, account holders will be able to create company profiles, organize products and RFQs, and start engaging with our online community. When we launch our full platform, Early Access suppliers will be the first to connect with global retailers, resellers and distributors looking to fill sourcing requirements.</p><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Learn more about early access</a></div><div class=\"panel-footer\"></div></div></div><div class=\"col-xs-2\"></div></div>"
  );


  $templateCache.put('nav.html',
    "<nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"dfd\"><a ui-sref=\"fdf\">View Company Profile</a></li><li pc-nav=\"dfd\"><a ui-sref=\"dfd\">Edit Company Profile</a></li><li pc-nav=\"user_account_settings\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li></ul></div><div class=\"navbar-header\"><span class=\"navbar-brand\">My Procur:</span></div></div></nav>"
  );


  $templateCache.put('user_header.html',
    "<div class=\"user-header clearfix\"><ul class=\"user-header-left\"><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><img src=\"/assets/images/procur.png\" class=\"procur-logo\"></a></li><li class=\"user-header-item\"><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Early Access</a></li><li class=\"user-header-item\"><p class=\"text-lowercase\">{{user.firstName}} {{user.lastName}}</p><p>·</p><p>{{company.name}}</p></li></ul><ul class=\"user-header-right\"><li class=\"user-header-item\" ng-if=\"company.buyer && company.supplier\"><button class=\"btn btn-link buyer-supplier-switch\" ng-click=\"user.toggleActiveMode()\">Currently in {{user.activeMode}} mode <i class=\"glyphicon glyphicon-transfer\"></i> Switch to {{user.inactiveMode}}</button></li><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><i class=\"glyphicon glyphicon-log-out\"></i> Logout</a></li></ul></div>"
  );


  $templateCache.put('user_account_settings.html',
    "<div id=\"user_account_settings\"><div class=\"row main-row\"><div class=\"col-sm-4 nav-panel\"><ul><li pc-nav=\"update_settings\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"user_account_settings.update_settings\">Update Settings</a></li><li pc-nav=\"update_password\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-cog\"></span></div><a ui-sref=\"user_account_settings.update_password\">Change Password</a></li></ul></div><div ui-view=\"\"></div></div></div>"
  );


  $templateCache.put('user_update_password.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Update Password</h4></div><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label>Enter New Password</label><input type=\"text\" placeholder=\"First\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label>Confirm New Password</label><input type=\"text\" placeholder=\"Job Title\"></div></div></div><div class=\"row\"><button class=\"continue-button\" type=\"submit\">Save&nbsp;&nbsp; <span class=\"glyphicon glyphicon-ok\"></span></button></div></form></div>"
  );


  $templateCache.put('user_update_settings.html',
    "<div class=\"col-sm-8 form-panel\"><form class=\"form\"><div class=\"row header-row\"><h4>Contact Information</h4></div><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"name\">Contact Name*</label><input type=\"text\" id=\"firstName\" placeholder=\"First\" value=\"{{user.firstName}}\"> <input type=\"text\" id=\"lastName\" placeholder=\"Last\" value=\"{{user.lastName}}\"></div><div class=\"form-group\"><label>Current Email Address</label><input type=\"text\" placeholder=\"Current Email\" value=\"{{user.email}}\"></div><div class=\"form-group\"><label>Update Email Address</label><input type=\"text\" placeholder=\"Enter New Address\"> <input type=\"text\" placeholder=\"Confirm New Address\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label>Job Title</label><input type=\"text\" placeholder=\"Job Title\" value=\"{{user.jobTitle}}\"></div><div class=\"form-group\"><label>Update Profile Picture</label><input type=\"file\"></div></div></div><div class=\"row submit-button-row\"><button class=\"continue-button\" type=\"submit\">Save&nbsp;&nbsp; <span class=\"glyphicon glyphicon-ok\"></span></button></div></form></div>"
  );

}]);
