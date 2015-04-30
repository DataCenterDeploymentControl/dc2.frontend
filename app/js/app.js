'use strict';

var DC2Frontend = angular.module('DC2Frontend', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'dc2DashboardControllers',
  'dc2Factories'
]);

DC2Frontend.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login/login.html',
        controller: 'LoginCtrl'
      }).
      otherwise({
        templateUrl: 'partials/main/index.html',
        controller: 'DashBoardCtrl'
      });
  }
]);

DC2Frontend.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('dc2ResourceInterceptor');
}])
'use strict';


var dc2DashboardControllers = angular.module('dc2DashboardControllers', []);

//         UsersFactory.query(function(data) {
//          console.log(data);
//        });

'use strict';

var dc2Factories = angular.module('dc2Factories', []);


function dc2ResourceInterceptor($rootScope) {
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
    responseError: function(config) {
      console.log('in responseError')
      console.log(config);
      return $q.reject(rejection)
    }
  }
}

dc2Factories.factory('dc2ResourceInterceptor', ['$rootScope', dc2ResourceInterceptor]);

function LoginFactory($resource) {
  return $resource("http://localhost:5000/api/auth/v1/login", {}, {
    post: {method: "POST"}
  });
}

dc2Factories.factory('LoginFactory', ['$resource', LoginFactory]);
function UsersFactory($resource, dc2ResourceInterceptor) {
  return $resource("http://localhost:5000/api/admin/v1/users", {}, {
    query: {
      method:'GET',
      isArray:true
    }
  });
}

dc2Factories.factory('UsersFactory', ['$resource', 'dc2ResourceInterceptor', UsersFactory]);

function DashBoardCtrl($rootScope, $scope, $location) {
  if ($rootScope.authenticated == null || $rootScope.authenticated == false) {
    console.log('not authenticated')
    $location.path('/login');
  }
}

dc2DashboardControllers.controller('DashBoardCtrl', ['$rootScope', '$scope', '$location', DashBoardCtrl]);

function LoginCtrl($rootScope, $scope, $location, LoginFactory, UsersFactory) {
  $scope.user = {
    'email': null,
    'password': null,
    'auth_type': 'local'
  }

  $scope.doLogin = function(login) {
    console.log(login);
    LoginFactory.post(login, function(data, headers) {
      if ('x-dc2-auth-token' in headers() && 'x-dc2-auth-user' in headers()) {
        console.log(headers()['x-dc2-auth-token']);
        console.log(headers()['x-dc2-auth-user']);
        $rootScope.authenticated=false;
        $rootScope.auth_token = headers()['x-dc2-auth-token'];
        $rootScope.auth_user = headers()['x-dc2-auth-user'];
        console.log('in doLogin');
        console.log($rootScope)

      }
    }, function(errors) {
      console.log('in login error')
      console.log(errors);
    });

  }
}

dc2DashboardControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'LoginFactory', 'UsersFactory', LoginCtrl]);
