(function(angular) {
  var
    definition;

  definition = [
    '$http',
    ajaxService
  ];

  angular.module('pc.Ajax')
    .factory('ajaxService', definition);

  function ajaxService($http) {
    return {
      get: get,
      post: post,
      put: put,
      destroy: destroy
    };

    function get(endpoint) {
      return $http.get(endpoint)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function post(endpoint, data) {
      return $http.post(endpoint, data)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function put(endpoint, data) {
      return $http.put(endpoint, data)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function destroy(endpoint) {
      return $http['delete'](endpoint)
        .then(resolveResponse)
        ['catch'](handleError);
    }

    function resolveResponse(response) {
      return response.data;
    }

    function handleError(err) {
      console.log('There was an error!', err);
    }
  }

})(angular);