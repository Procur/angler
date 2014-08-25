module.exports = {
  components: {
    src: [
      '<%= componentsPath %>/angular/angular.js',
      '<%= componentsPath %>/angular-ui-router/release/angular-ui-router.js',
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
      '<%= jsPath %>/my_procur/third_party/*.js',
      '<%= jsPath %>/my_procur/ajax/ajax_module.js',
      '<%= jsPath %>/my_procur/ajax/*.js',
      '<%= jsPath %>/my_procur/file_upload/file_upload_module.js',
      '<%= jsPath %>/my_procur/file_upload/*.js',
      '<%= jsPath %>/my_procur/snackbar/snackbar_module.js',
      '<%= jsPath %>/my_procur/snackbar/*.js',
      '<%= jsPath %>/my_procur/company/company_module.js',
      '<%= jsPath %>/my_procur/company/*.js',
      '<%= jsPath %>/my_procur/buyer_supplier/buyer_supplier_module.js',
      '<%= jsPath %>/my_procur/buyer_supplier/*.js',
      '<%= jsPath %>/my_procur/user/user_module.js',
      '<%= jsPath %>/my_procur/user/*.js',
      '<%= jsPath %>/my_procur/validation/validation_module.js',
      '<%= jsPath %>/my_procur/validation/*.js',
      '<%= jsPath %>/my_procur/nav/nav_module.js',
      '<%= jsPath %>/my_procur/nav/*.js',
      '<%= jsPath %>/my_procur/registration/registration_module.js',
      '<%= jsPath %>/my_procur/registration/*.js',
      '<%= jsPath %>/my_procur/dashboard/dashboard_module.js',
      '<%= jsPath %>/my_procur/dashboard/*.js',
      '<%= jsPath %>/my_procur/view_company_profile/view_company_profile_module.js',
      '<%= jsPath %>/my_procur/view_company_profile/*.js',
      '<%= jsPath %>/my_procur/user_account_settings/user_account_settings_module.js',
      '<%= jsPath %>/my_procur/user_account_settings/*.js',
      '<%= jsPath %>/my_procur/edit_company_profile/edit_company_profile_module.js',
      '<%= jsPath %>/my_procur/edit_company_profile/*.js',
      '<%= jsPath %>/my_procur/states/states_module.js',
      '<%= jsPath %>/my_procur/states/*.js',
      '<%= jsPath %>/my_procur/templates_module.js',
      '<%= jsPath %>/my_procur/main_module.js',
      '<%= jsPath %>/my_procur/**/*.js',
    ],
    dest: '<%= pubJsPath %>/my_procur.js'
  }
};
