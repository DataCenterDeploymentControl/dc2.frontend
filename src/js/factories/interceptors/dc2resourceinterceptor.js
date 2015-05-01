function dc2ResourceInterceptor($rootScope, $q) {
  return {
    request: function(config) {
      if ('auth_token' in $rootScope && 'auth_user' in $rootScope) {
        if ($rootScope.auth_token != null) {
          config.headers['X-DC2-Auth-Token']=$rootScope.auth_token;  
        }
        if ($rootScope.auth_user != null) {
          config.headers['X-DC2-Auth-User']=$rootScope.auth_user;
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
      return $q.reject(rejection)
    }
  }
}

dc2Factories.factory('dc2ResourceInterceptor', ['$rootScope', '$q', dc2ResourceInterceptor]);
