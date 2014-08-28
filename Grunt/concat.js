module.exports = {
  components: {
    src: [
      '<%= componentsPath %>/angular/angular.js',
      '<%= componentsPath %>/angular-ui-router/release/angular-ui-router.js',
      '<%= componentsPath %>/angular-cookies/angular-cookies.js',
      '<%= componentsPath %>/lodash/dist/lodash.js',
      '<%= componentsPath %>/plupload/js/moxie.js',
      '<%= componentsPath %>/plupload/js/plupload.dev.js',
      '<%= componentsPath %>/jcrop/js/jquery.Jcrop.js'
    ],
    dest: '<%= pubJsPath %>/components.js'
  },
  my_procur: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= jsPath %>/vendor/**/*.js',
      '<%= jsPath %>/shared/ajax/ajax_module.js',
      '<%= jsPath %>/shared/ajax/*.js',
      '<%= jsPath %>/shared/file_upload/file_upload_module.js',
      '<%= jsPath %>/shared/file_upload/*.js',
      '<%= jsPath %>/shared/snackbar/snackbar_module.js',
      '<%= jsPath %>/shared/snackbar/*.js',
      '<%= jsPath %>/shared/validation/validation_module.js',
      '<%= jsPath %>/shared/validation/*.js',
      '<%= jsPath %>/shared/nav/nav_module.js',
      '<%= jsPath %>/shared/nav/*.js',
      '<%= jsPath %>/shared/company/company_module.js',
      '<%= jsPath %>/shared/company/*.js',
      '<%= jsPath %>/shared/buyer_supplier/buyer_supplier_module.js',
      '<%= jsPath %>/shared/buyer_supplier/*.js',
      '<%= jsPath %>/shared/user/user_module.js',
      '<%= jsPath %>/shared/user/*.js',
      '<%= jsPath %>/my_procur/dashboard/dashboard_module.js',
      '<%= jsPath %>/my_procur/dashboard/*.js',
      '<%= jsPath %>/my_procur/location/location_module.js',
      '<%= jsPath %>/my_procur/location/*.js',
      '<%= jsPath %>/my_procur/view_company_profile/view_company_profile_module.js',
      '<%= jsPath %>/my_procur/view_company_profile/*.js',
      '<%= jsPath %>/my_procur/user_account_settings/user_account_settings_module.js',
      '<%= jsPath %>/my_procur/user_account_settings/*.js',
      '<%= jsPath %>/my_procur/edit_company_profile/edit_company_profile_module.js',
      '<%= jsPath %>/my_procur/edit_company_profile/*.js',
      '<%= jsPath %>/my_procur/templates_module.js',
      '<%= jsPath %>/my_procur/states/states_module.js',
      '<%= jsPath %>/my_procur/states/*.js',
      '<%= jsPath %>/my_procur/my_procur_module.js',
      '<%= jsPath %>/my_procur/**/*.js',
    ],
    dest: '<%= pubJsPath %>/my_procur.js'
  },
  registration: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= jsPath %>/vendor/**/*.js',
      '<%= jsPath %>/shared/ajax/ajax_module.js',
      '<%= jsPath %>/shared/ajax/*.js',
      '<%= jsPath %>/shared/file_upload/file_upload_module.js',
      '<%= jsPath %>/shared/file_upload/*.js',
      '<%= jsPath %>/shared/snackbar/snackbar_module.js',
      '<%= jsPath %>/shared/snackbar/*.js',
      '<%= jsPath %>/shared/validation/validation_module.js',
      '<%= jsPath %>/shared/validation/*.js',
      '<%= jsPath %>/shared/company/company_module.js',
      '<%= jsPath %>/shared/company/*.js',
      '<%= jsPath %>/shared/user/user_module.js',
      '<%= jsPath %>/shared/user/*.js',
      '<%= jsPath %>/registration/wizard/wizard_module.js',
      '<%= jsPath %>/registration/wizard/*.js',
      '<%= jsPath %>/registration/templates_module.js',
      '<%= jsPath %>/registration/states/states_module.js',
      '<%= jsPath %>/registration/states/*.js',
      '<%= jsPath %>/registration/registration_module.js',
      '<%= jsPath %>/registration/**/*.js',
    ],
    dest: '<%= pubJsPath %>/registration.js'
  },
  main: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= jsPath %>/vendor/moxie_module.js',
      '<%= jsPath %>/vendor/lodash_module.js',
      '<%= jsPath %>/shared/ajax/ajax_module.js',
      '<%= jsPath %>/shared/ajax/*.js',
      '<%= jsPath %>/shared/snackbar/snackbar_module.js',
      '<%= jsPath %>/shared/snackbar/*.js',
      '<%= jsPath %>/shared/validation/validation_module.js',
      '<%= jsPath %>/shared/validation/*.js',
      '<%= jsPath %>/main/form_handler/templates_module.js',
      '<%= jsPath %>/main/form_handler/form_handler_module.js',
      '<%= jsPath %>/main/form_handler/*.js',
      '<%= jsPath %>/main/contact/**/*.js',
      '<%= jsPath %>/main/main_module.js',
      '<%= jsPath %>/main/**/*.js',
    ],
    dest: '<%= pubJsPath %>/main.js'
  }
};
