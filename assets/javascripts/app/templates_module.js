angular.module('pc.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dashboard.html',
    "<div class=\"row dashboard\"><div class=\"col-xs-4\"><div class=\"row user-profile\"><div class=\"col-xs-4\"><img ng-src=\"{{user.image}}\"></div><div class=\"col-xs-8\"><h4 class=\"text-muted profile-name\">{{user.firstName}} {{user.lastName}}</h4><h5 class=\"company-name\">{{company.name}}</h5><h6 class=\"member-since\">Procur member since {{user.createdYear}}</h6></div></div><div class=\"row\"><div class=\"col-xs-12 sub-nav\"><ul class=\"list-separator\"><li><a ui-sref=\"user_account_settings.update_settings\"><span class=\"glyphicon glyphicon-cog\"></span> Edit User Account Settings</a></li><li><a ui-sref=\"#\"><span class=\"glyphicon glyphicon-user\"></span> View My Company Profile</a></li></ul></div></div><div class=\"row\"><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Company</li><li><a href=\"https://procur.com/earlyaccess\">Early Access</a></li><li><a href=\"https://procur.com/features\">Upcoming Features</a></li><li><a href=\"https://procur.com/pricing\">Membership & Pricing</a></li><li><a href=\"https://procur.com/about\">About Procur</a></li></ul></div><div class=\"col-xs-6 external-links\"><ul class=\"list-titled\"><li class=\"list-title\">Help & Support</li><li><a href=\"https://procur.com/faq\">FAQ</a></li><li><a href=\"https://procur.com/contact\">Contact Us</a></li><li><a href=\"https://procur.com/support\">Support Topics</a></li><li><a href=\"mailto:support@procur.com\">Email Support</a></li></ul></div></div></div><div class=\"col-xs-5\"><div class=\"panel-content action-items\"><div class=\"panel-heading\"><h5>My Procur Action Items</h5></div><div class=\"panel-body\"><p class=\"lead\">Welcome to Procur Early Access!</p><p>We're inviting select users to register with Procur before opening up our full platform later this summer. During Early Access, account holders will be able to create company profiles, organize products and RFQs, and start engaging with our online community. When we launch our full platform, Early Access suppliers will be the first to connect with global retailers, resellers and distributors looking to fill sourcing requirements.</p><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Learn more about early access</a></div><div class=\"panel-footer\"><ul class=\"list-checklist\"><li ng-repeat=\"item in actionItems | filter:activeModeFilter()\" ng-class=\"{complete: item.complete, incomplete: !item.complete}\"><span ng-switch=\"item.complete\"><span ng-switch-when=\"false\"><a ui-sref=\"{{item.link}}\"><span class=\"glyphicon glyphicon-unchecked\"></span><h5>{{item.action}}</h5></a></span> <span ng-switch-when=\"true\"><span class=\"glyphicon glyphicon-check\"></span><h5>{{item.action}}</h5></span></span></li></ul></div></div></div><div class=\"col-xs-3\"><h6 class=\"features-heading\">Currently Accessible:</h6><ul class=\"nav-panel\"><li><a ui-sref=\"edit_company_profile\"><div class=\"left-icon\"><span class=\"glyphicon glyphicon-user\"></span></div><h6>Company Profile</h6></a></li></ul><h6 class=\"features-heading\">Features coming soon:</h6><ul class=\"nav-panel\"><li ng-repeat=\"feature in comingSoon\" ng-mouseenter=\"feature.hover = true\" ng-mouseleave=\"feature.hover = false\"><a><div class=\"left-icon\"><span class=\"glyphicon {{feature.icon}}\"></span></div><h6>{{feature.hover ? feature.alt : feature.label}}</h6></a></li></ul></div></div>"
  );


  $templateCache.put('company_details.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Basic Company Details</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Company Name*</label><input type=\"text\" id=\"companyName\" placeholder=\"Company Name\" value=\"{{company.name}}\"></div><div class=\"form-group\"><label for=\"\">Company Phone*</label><input type=\"text\" placeholder=\"Country Code*\" value=\"{{company.phone.countryCode}}\"> <input type=\"text\" placeholder=\"Phone Number*\" value=\"{{company.phone.number}}\"> <input type=\"text\" placeholder=\"Ext. Number\" value=\"{{company.phone.extension}}\"></div><div class=\"form-group\"><label for=\"\">Company Fax</label><input type=\"text\" placeholder=\"Country Code\" value=\"{{company.fax.countryCode}}\"> <input type=\"text\" placeholder=\"Fax Number\" value=\"{{company.fax.number}}\"> <input type=\"text\" placeholder=\"Ext. Number\" value=\"{{company.fax.extension}}\"></div><div class=\"form-group\"><label for=\"email\">Company Email Address*</label><input type=\"text\" id=\"email\" placeholder=\"info@mycompanyname.com\" value=\"{{company.email}}\"></div><div class=\"form-group\"><label for=\"website\">Official Company Website</label><input type=\"text\" id=\"website\" placeholder=\"www.mycompanyname.com\" value=\"{{company.website}}\"></div><div class=\"form-group\"><label for=\"industry\">Industry*</label><input type=\"text\" id=\"industry\" placeholder=\"dropdown!\" value=\"\"><!-- change to dropdown --></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Official Business Address*</label><input type=\"text\" placeholder=\"Address Line #1\" value=\"{{company.addresses.primary['address-1']}}\"> <input type=\"text\" placeholder=\"Address Line #2\" value=\"{{company.addresses.primary['address-2']}}\"> <input type=\"text\" placeholder=\"Select Country\" value=\"{{company.addresses.primary.country}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"{{company.addresses.primary.state}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" value=\"{{company.addresses.primary.city}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Postal Code\" value=\"{{company.addresses.primary.postalCode}}\"></div><div class=\"form-group\"><label for=\"\">Is the above address a headquarters?</label><input type=\"checkbox\" name=\"\"><span>Yes; please copy address below.</span></div><div class=\"form-group\"><label for=\"\">Company Headquarters Address*</label><input type=\"text\" placeholder=\"Address Line #1\" value=\"{{company.addresses.headquarters['address-1']}}\"> <input type=\"text\" placeholder=\"Address Line #2\" value=\"{{company.addresses.headquarters['address-2']}}\"> <input type=\"text\" placeholder=\"Select Country\" value=\"{{company.addresses.headquarters.country}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"{{company.addresses.headquarters.state}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" value=\"{{company.addresses.headquarters.city}}\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Postal Code\" value=\"{{company.addresses.headquarters.postalCode}}\"></div><div class=\"form-group\"><label for=\"employeeCount\">Total Number of Employees*</label><input type=\"text\" id=\"employeeCount\" placeholder=\"dropdown!\" value=\"\"><!-- change to dropdown --></div></div></div></form></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div></div>"
  );


  $templateCache.put('company_information.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>[activeMode] Information</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">Logo Image</label><img ng-src=\"http://res.cloudinary.com/huewqecyr/image/upload/v1404414400/dhemkcar246mvbm8wmcs.jpg\"> <input type=\"file\"> <input type=\"submit\" value=\"Update Logo Image\"></div><div class=\"form-group\"><label for=\"\">Type of Company</label><input type=\"text\" placeholder=\"City\" value=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Contact Name</label><input type=\"text\" id=\"\" placeholder=\"Contact Name\" value=\"\"></div><div class=\"form-group\"><label for=\"\">Contact Position</label><input type=\"text\" id=\"\" placeholder=\"Contact Position\" value=\"\"></div><div class=\"form-group\"><label for=\"\">Contact Email</label><input type=\"text\" id=\"\" placeholder=\"Contact Email\" value=\"\"></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">Private Labeler</label><input type=\"checkbox\" id=\"\" placeholder=\"Private Labeler\" value=\"\"><span>Private labeling</span></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">GSA Approved Supplier</label><input type=\"checkbox\" id=\"\" placeholder=\"GSA Approved Supplier\" value=\"\"><span>GSA Approved Supplier</span></div><div class=\"form-group\"><label for=\"\">DUNS Number</label><input type=\"text\" id=\"\" placeholder=\"DUNS Number\" value=\"\"></div><div class=\"form-group\"><!-- SUPPLIER ONLY --><label for=\"\">CAGE Code</label><input type=\"text\" id=\"\" placeholder=\"CAGE Code\" value=\"\"></div><div class=\"form-group\"><!-- BUYER ONLY --><label for=\"\">Secondary Location</label><input type=\"text\" placeholder=\"Location Title\" value=\"\"> <input type=\"text\" placeholder=\"Select Location Type\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Country\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"City\" value=\"\"></div><div class=\"form-group\"><!-- BUYER ONLY --><label for=\"\">Nearest Port</label><input type=\"text\" placeholder=\"City\" value=\"\"> <input type=\"text\" placeholder=\"Select Country\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Select Province/State\" value=\"\"><!-- change to dropdown --></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"\">DBA Name</label><input type=\"text\" placeholder=\"Alternate Company Name\" value=\"\"></div><div class=\"form-group\"><label for=\"\">Language*</label><input type=\"text\" placeholder=\"Select Language\" value=\"\"><!-- change to dropdown --></div><div class=\"form-group\"><label for=\"\">Accepted Currencies*</label><div class=\"col-md-6\"><input type=\"checkbox\"><span>USD</span> <input type=\"checkbox\"><span>JPY</span> <input type=\"checkbox\"><span>AUD</span> <input type=\"checkbox\"><span>CAD</span> <input type=\"checkbox\"><span>CNY</span> <input type=\"checkbox\"><span>SEK</span> <input type=\"checkbox\"><span>HKD</span></div><div class=\"col-md-6\"><input type=\"checkbox\"><span>EUR</span> <input type=\"checkbox\"><span>GBP</span> <input type=\"checkbox\"><span>CHF</span> <input type=\"checkbox\"><span>MXN</span> <input type=\"checkbox\"><span>NZD</span> <input type=\"checkbox\"><span>RUB</span> <input type=\"checkbox\"><span>SGD</span></div></div><div class=\"form-group\"><label for=\"\">Accepted Payment Terms*</label><div class=\"col-md-6\"><input type=\"checkbox\"><span>MoneyGram</span> <input type=\"checkbox\"><span>T/T</span> <input type=\"checkbox\"><span>Escrow</span> <input type=\"checkbox\"><span>D/P D/A</span></div><div class=\"col-md-6\"><input type=\"checkbox\"><span>Western Union</span> <input type=\"checkbox\"><span>Credit Card</span> <input type=\"checkbox\"><span>PayPal</span> <input type=\"checkbox\"><span>Cash</span></div></div><div class=\"form-group\"><label for=\"\">Accepted Delivery Terms</label><div class=\"col-md-6\"><input type=\"checkbox\"><span>EXW</span> <input type=\"checkbox\"><span>CPT</span> <input type=\"checkbox\"><span>DAT</span> <input type=\"checkbox\"><span>DDP</span> <input type=\"checkbox\"><span>FOB</span> <input type=\"checkbox\"><span>CIF</span></div><div class=\"col-md-6\"><input type=\"checkbox\"><span>FCA</span> <input type=\"checkbox\"><span>CIP</span> <input type=\"checkbox\"><span>DAP</span> <input type=\"checkbox\"><span>FAS</span> <input type=\"checkbox\"><span>CFR</span> <input type=\"checkbox\"><span>Custom</span></div></div></div><div class=\"col-md-12\"><div class=\"form-group\"><label for=\"\">Enter Product Categories of Interest</label><input type=\"text\" placeholder=\"Begin typing to search categories...\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Begin typing to search categories...\" value=\"\"><!-- change to dropdown --> <input type=\"text\" placeholder=\"Begin typing to search categories...\" value=\"\"><!-- change to dropdown --></div></div></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('descriptions.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Descriptions</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('edit_company_profile.html',
    "<div class=\"row main-row\"><div class=\"col-sm-4\"><ul class=\"nav-panel\"><li pc-nav=\"company_details\"><a ui-sref=\"edit_company_profile.company_details\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-user\"></i></div><h6>Company Details</h6></a></li><li pc-nav=\"company_information\"><a ui-sref=\"edit_company_profile.company_information\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-info-sign\"></i></div><h6>[activeMode] Information</h6></a></li><li pc-nav=\"production_details\"><a ui-sref=\"edit_company_profile.production_details\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-wrench\"></i></div><h6>Production Details</h6></a></li><li pc-nav=\"descriptions\"><a ui-sref=\"edit_company_profile.descriptions\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-list-alt\"></i></div><h6>Descriptions</h6></a></li><li pc-nav=\"preferences\"><a ui-sref=\"edit_company_profile.preferences\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-cog\"></i></div><h6>Preferences</h6></a></li><li pc-nav=\"social_media\"><a ui-sref=\"edit_company_profile.social_media\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-thumbs-up\"></i></div><h6>Social Media</h6></a></li><li pc-nav=\"photos\"><a ui-sref=\"edit_company_profile.photos\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-picture\"></i></div><h6>[activeMode] Photos</h6></a></li></ul></div><div ui-view></div></div>"
  );


  $templateCache.put('photos.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Photos</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('preferences.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Preferences</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('production_details.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Production Details</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('social_media.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Social Media</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('nav.html',
    ""
  );


  $templateCache.put('user_header.html',
    "<div class=\"user-header clearfix hidden-xs\"><ul class=\"user-header-left\"><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><img src=\"/assets/images/procur.png\" class=\"procur-logo\"></a></li><li class=\"user-header-item\"><a href=\"https://procur.com/earlyaccess\" class=\"early-access\">Early Access</a></li><li class=\"user-header-item\"><p class=\"text-lowercase\">{{user.firstName}} {{user.lastName}}</p><p>·</p><p>{{company.name}}</p></li></ul><ul class=\"user-header-right\"><li class=\"user-header-item\" ng-if=\"company.buyer && company.supplier\"><button class=\"btn btn-link buyer-supplier-switch\" ng-click=\"user.toggleActiveMode()\">Currently in {{user.activeMode}} mode <span class=\"glyphicon glyphicon-transfer\"></span> Switch to {{user.inactiveMode}}</button></li><li class=\"user-header-item\"><a ui-sref=\"dashboard\"><span class=\"glyphicon glyphicon-log-out\"></span> Logout</a></li></ul></div><div id=\"mobile-nav\" class=\"mobile-header hidden-sm hidden-md hidden-lg\"><!-- Mobile --><nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#nav-links\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button><div class=\"ea-logo\"><a class=\"logo-image logo-mobile\" id=\"mobile-fix\" href=\"/\"><img src=\"/assets/images/procur.png\"></a> <a href=\"https://procur.com/earlyaccess\" class=\"early-access logo-mobile\">Early Access</a></div></div><div class=\"collapse navbar-collapse\" id=\"nav-links\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"fdf\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"dfd\"><a ui-sref=\"fdf\">View Company Profile</a></li><li pc-nav=\"gg\"><a ui-sref=\"edit_company_profile.company_details\">Edit Company Profile</a></li><li pc-nav=\"dfd\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li><li class=\"divider\"></li><li class=\"divider\"></li><li><a ui-sref=\"dashboard\">LOGOUT</a></li></ul></div></div></nav></div><nav class=\"navbar navbar-default hidden-xs\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"collapse navbar-collapse hidden-sm hidden-md hidden-lg\"><ul class=\"nav navbar-nav navbar-right\"><li pc-nav=\"dashboard\"><a ui-sref=\"dashboard\">Dashboard</a></li><li pc-nav=\"dfd\"><a ui-sref=\"fdf\">View Company Profile</a></li><li pc-nav=\"edit_company_profile\"><a ui-sref=\"edit_company_profile.company_details\">Edit Company Profile</a></li><li pc-nav=\"user_account_settings\"><a ui-sref=\"user_account_settings.update_settings\">User Account Settings</a></li></ul></div><div class=\"navbar-header\"><span class=\"navbar-brand\">My Procur:</span></div></div></nav>"
  );


  $templateCache.put('user_account_settings.html',
    "<div id=\"user_account_settings\"><div class=\"row main-row\"><div class=\"col-sm-4\"><ul class=\"nav-panel\"><li pc-nav=\"update_settings\"><a ui-sref=\"user_account_settings.update_settings\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-cog\"></i></div><h6>Update settings</h6></a></li><li pc-nav=\"update_password\"><a ui-sref=\"user_account_settings.update_password\"><div class=\"left-icon\"><i class=\"glyphicon glyphicon-lock\"></i></div><h6>Change password</h6></a></li></ul></div><div ui-view></div></div></div>"
  );


  $templateCache.put('user_update_password.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Update Password</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"password\">Enter New Password</label><input id=\"password\" type=\"password\" placeholder=\"New Password\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"confirmPassword\">Confirm New Password</label><input id=\"confimPassword\" type=\"password\" placeholder=\"Confirm Password\"></div></div></div></form></div></div><button class=\"btn continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );


  $templateCache.put('user_update_settings.html',
    "<div class=\"col-sm-8\"><div class=\"panel-content\"><div class=\"panel-heading\"><h5>Contact Information</h5></div><div class=\"panel-body\"><form class=\"form\"><div class=\"row form-body\"><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"firstName\">Contact Name*</label><input type=\"text\" id=\"firstName\" placeholder=\"First\" ng-model=\"user.firstName\"> <input type=\"text\" id=\"lastName\" placeholder=\"Last\" ng-model=\"user.lastName\"></div><div class=\"form-group\"><label for=\"emailAddress\">Current Email Address</label><input for=\"emailAddress\" type=\"email\" placeholder=\"Current Email\" ng-model=\"user.email\"></div><div class=\"form-group\"><label for=\"newEmailAddress\">Update Email Address</label><input id=\"newEmailAddress\" type=\"email\" placeholder=\"Enter New Address\"> <input type=\"email\" placeholder=\"Confirm New Address\"></div></div><div class=\"col-md-6\"><div class=\"form-group\"><label for=\"jobTitle\">Job Title</label><input id=\"jobTitle\" type=\"text\" placeholder=\"Job Title\" ng-model=\"user.jobTitle\"></div><div class=\"form-group\"><label>Update Profile Picture</label><input type=\"file\"></div></div></div></form></div></div><button class=\"continue-button\" type=\"submit\">Save <span class=\"glyphicon glyphicon-ok\"></span></button></div>"
  );

}]);
