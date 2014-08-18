module.exports = {
  components: {
    src: [
      '<%= componentsPath %>/angular/angular.js',
      '<%= componentsPath %>/angular-ui-router/release/angular-ui-router.js',
      '<%= componentsPath %>/lodash/dist/lodash.js',
      '<%= componentsPath %>/plupload/js/moxie.js',
      '<%= componentsPath %>/plupload/js/plupload.dev.js'
    ],
    dest: '<%= jsPath %>/components.js'
  },
  dev: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= jsPath %>/app/third_party/*.js',
      '<%= jsPath %>/app/ajax/ajax_module.js',
      '<%= jsPath %>/app/ajax/*.js',
      '<%= jsPath %>/app/file_upload/file_upload_module.js',
      '<%= jsPath %>/app/file_upload/*.js',
      '<%= jsPath %>/app/company/company_module.js',
      '<%= jsPath %>/app/company/*.js',
      '<%= jsPath %>/app/buyer_supplier/buyer_supplier_module.js',
      '<%= jsPath %>/app/buyer_supplier/*.js',
      '<%= jsPath %>/app/user/user_module.js',
      '<%= jsPath %>/app/user/*.js',
      '<%= jsPath %>/app/validation/validation_module.js',
      '<%= jsPath %>/app/validation/*.js',
      '<%= jsPath %>/app/nav/nav_module.js',
      '<%= jsPath %>/app/nav/*.js',
      '<%= jsPath %>/app/registration/registration_module.js',
      '<%= jsPath %>/app/registration/*.js',
      '<%= jsPath %>/app/dashboard/dashboard_module.js',
      '<%= jsPath %>/app/dashboard/*.js',
      '<%= jsPath %>/app/view_company_profile/view_company_profile_module.js',
      '<%= jsPath %>/app/view_company_profile/*.js',
      '<%= jsPath %>/app/user_account_settings/user_account_settings_module.js',
      '<%= jsPath %>/app/user_account_settings/*.js',
      '<%= jsPath %>/app/edit_company_profile/edit_company_profile_module.js',
      '<%= jsPath %>/app/edit_company_profile/*.js',
      '<%= jsPath %>/app/states/states_module.js',
      '<%= jsPath %>/app/states/*.js',
      '<%= jsPath %>/app/templates_module.js',
      '<%= jsPath %>/app/main_module.js',
      '<%= jsPath %>/app/**/*.js',
    ],
    dest: '<%= jsPath %>/app.js'
  },
  dist: {
    src: [
      '<%= jsPath %>/components.js',
      '<%= jsPath %>/app.js'
    ],
    dest: 'dist/javascripts/build.js'
  }
};
