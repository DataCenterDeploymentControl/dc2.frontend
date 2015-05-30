function dc2ResourceInterceptor($rootScope, $q, $localStorage) {
  return {
    request: function(config) {
      console.log('in request');
      if ('auth_token' in $localStorage && 'auth_user' in $localStorage) {
        if ($localStorage.auth_token != null) {
          config.headers['X-DC2-Auth-Token']=$localStorage.auth_token;
        }
        if ($localStorage.auth_user != null) {
          config.headers['X-DC2-Auth-User']=$localStorage.auth_user;
        }
      }
      return config;
    },
    requestError: function(rejection) {
      console.log('in RequestError');
      return $q.reject(rejection);
    },
    response: function(config) {
      console.log('in response');
      return config;
    },
    responseError: function(rejection) {
      // if (rejection.status == 401) { // Unauthorized
      //   $rootScope.$emit('loginRequired');
      // }
      return $q.reject(rejection);
    }
  }
}

dc2Factories.factory('dc2ResourceInterceptor', ['$rootScope', '$q', '$localStorage', dc2ResourceInterceptor]);
