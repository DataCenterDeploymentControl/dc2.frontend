'use strict';

var DC2Frontend = angular.module('DC2Frontend', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'toaster',
  'dc2DashboardControllers',
  'dc2Factories',
  'dc2Directives'
]);

DC2Frontend.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login/login.html',
        controller: 'LoginCtrl'
      }).
      when('/logout', {
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


'use strict';


var dc2Directives = angular.module('dc2Directives', []);


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

function LoginCtrl($rootScope, $scope, $location, $routeParams, LoginFactory, UsersFactory) {

  console.log($routeParams);
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
        $rootScope.authenticated=true;
        $rootScope.auth_token = headers()['x-dc2-auth-token'];
        $rootScope.auth_user = headers()['x-dc2-auth-user'];
        console.log('in doLogin');
        console.log($rootScope)
        if ('user' in data) {
          $rootScope.user = data['user'];
        }
      }
      if ($rootScope.authenticated) {
        $location.path('/');
      }

    }, function(errors) {
      alert('Authentication Error!')
    });

    $scope.doLogout = function() {
      console.log('in doLogout')
    }
  }
}

dc2DashboardControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'LoginFactory', 'UsersFactory', LoginCtrl]);


function DirectiveNavbar() {
	console.log('in Directive')
	return {
		templateUrl: 'partials/directives/navbar.html',
		restrict: 'E',
		scope: {
			authenticated: "=",
			user: "="
		}
	}
}

dc2Directives.directive('navbar', [DirectiveNavbar])