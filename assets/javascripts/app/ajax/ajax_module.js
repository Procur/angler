(function(global, angular) {

  var
    dependencies;

  dependencies = [
    'pc.ThirdParty.LoDash',
    'pc.ThirdParty.Moxie'
  ];

  angular.module('pc.Ajax', dependencies)
    .constant('XHR_METHOD', {
      POST: 'POST',
      GET: 'GET',
      PUT: 'PUT',
      DELETE: 'DELETE'
    });

})(window, angular);