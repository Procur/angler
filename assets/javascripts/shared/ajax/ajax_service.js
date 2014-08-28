(function(angular) {
  var
    definition;

  definition = [
    '$q',
    '$cookies',
    '_',
    'FormData',
    'Xhr',
    'XHR_METHOD',
    'snackbarService',
    ajaxService
  ];

  angular.module('pc.Ajax')
    .factory('ajaxService', definition);

  function ajaxService($q, $cookies, _, FormData, Xhr, XHR_METHOD, snackbar) {

    return {
      get: get,
      post: post,
      put: put,
      destroy: destroy,
      handleError: handleError
    };

    function get(token, endpoint) {
      return ajax(token, XHR_METHOD.GET, endpoint);
    }

    function post(token, endpoint, postData) {
      return ajax(token, XHR_METHOD.POST, endpoint, postData);
    }

    function put(token, endpoint, putData) {
      return ajax(token, XHR_METHOD.PUT, endpoint, putData);
    }

    function destroy(token, endpoint) {
      return ajax(token, XHR_METHOD.DELETE, endpoint);
    }

    function handleError(err) {
      snackbar.error(err || 'There was an error processing your request at this time. Please try again.');
    }

    function ajax(token, method, endpoint, data) {
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
      xhr.setRequestHeader('X-CSRF-Token', $cookies['XSRF-TOKEN']);
      xhr.setRequestHeader('apitoken', token);
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