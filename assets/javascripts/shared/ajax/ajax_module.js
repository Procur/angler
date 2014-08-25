(function(global, angular) {

  var
    dependencies;

  dependencies = [
    'pc.Vendor.LoDash',
    'pc.Vendor.Moxie',
    'pc.Snackbar'
  ];

  angular.module('pc.Ajax', dependencies)
    .constant('XHR_METHOD', {
      POST: 'POST',
      GET: 'GET',
      PUT: 'PUT',
      DELETE: 'DELETE'
    });

})(window, angular);