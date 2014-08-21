(function(angular) {
  var
    definition;

  definition = [
    '$q',
    '_',
    'FormData',
    'Xhr',
    'XHR_METHOD',
    'snackbarService',
    ajaxService
  ];

  angular.module('pc.Ajax')
    .factory('ajaxService', definition);

  function ajaxService($q, _, FormData, Xhr, XHR_METHOD, snackbar) {
    return {
      get: get,
      post: post,
      put: put,
      destroy: destroy,
      handleError: handleError
    };

    function get(endpoint) {
      return ajax(XHR_METHOD.GET, endpoint);
    }

    function post(endpoint, postData) {
      return ajax(XHR_METHOD.POST, endpoint, postData);
    }

    function put(endpoint, putData) {
      return ajax(XHR_METHOD.PUT, endpoint, putData);
    }

    function destroy(endpoint) {
      return ajax(XHR_METHOD.DELETE, endpoint);
    }

    function handleError(err) {
      snackbar.error(err || 'There was an error processing your request at this time. Please try again.');
    }

    function ajax(method, endpoint, data) {
      var
        deferred = $q.defer(),
        xhr = new Xhr(),
        formData = new FormData();

      xhr.bind('load', onComplete);
      xhr.bind('error', onComplete);

      if (data && method !== XHR_METHOD.GET) {
        _.each(data, addDataParam);
      }

      xhr.open(method, endpoint, true);
      xhr.send(formData);

      return deferred.promise;

      function addDataParam(val, key) {
        formData.append(key, val);
      }

      function onComplete(data) {
        var
          request = data.target;

        if (request.status === 200 || request.status === 201) {
          deferred.resolve(JSON.parse(request.responseText));
        }
        else {
          deferred.reject(request.responseText);
        }
      }
    }

  }

})(angular);