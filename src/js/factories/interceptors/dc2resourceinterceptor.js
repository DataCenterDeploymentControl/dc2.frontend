function dc2ResourceInterceptor($localStorage, $q, $location) {
  return {
    request: function(config) {
      if ('auth_token' in $localStorage && 'auth_user' in $localStorage) {
        if ($localStorage.auth_token != null) {
          config.headers['X-DC2-Auth-Token']=$localStorage.auth_token;  
        }
        if ($localStorage.auth_user != null) {
          config.headers['X-DC2-Auth-User']=$localStorage.auth_user;
        }
      }
      console.log(config);
      return config;
    },
    response: function(config) {
      return config;
    },
    responseError: function(rejection) {
      console.log('in responseError')
      console.log(rejection);
      if (rejection.status == 401) { // Unauthorized
        $location.path('/login');
      } else {
        return $q.reject(rejection);
      }
    }
  }
}

dc2Factories.factory('dc2ResourceInterceptor', ['$localStorage', '$q', '$location', dc2ResourceInterceptor]);
