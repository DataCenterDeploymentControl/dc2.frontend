'use strict';

var DC2Frontend = angular.module('DC2Frontend', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'toaster',
  'ngStorage',
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
        templateUrl: 'partials/login/logout.html',
        controller: 'LogoutCtrl'
      }).
      when('/user/:action', {
        templateUrl: 'partials/user/index.html',
        controller: 'AdminUserController'
      }).
      // when('/administration', {
      //   templateUrl: 'partials/administration/index.html',
      //   controller: 'AdministrationController'
      // }).
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


function LoginFactory($resource) {
  return $resource("http://localhost:5000/api/auth/v1/login", {}, {
    post: {method: "POST"}
  });
}

dc2Factories.factory('LoginFactory', ['$resource', LoginFactory]);
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

function GroupsFactory($resource) {
  return $resource("http://localhost:5000/api/admin/v1/groups",{}, {
    query: {
      method:'GET',
      isArray:true
    }
  });
}

dc2Factories.factory('GroupsFactory', ['$resource', GroupsFactory]);

function UsersFactory($resource, dc2ResourceInterceptor) {
  return $resource("http://localhost:5000/api/admin/v1/users/:username", {username:null}, {
    query: {
      method:'GET',
      isArray:true
    },
    update: {
      method:'put',
      params:{username:'@username'},
      data:'@user',
      isArray:false
    }
  });
}

dc2Factories.factory('UsersFactory', ['$resource', 'dc2ResourceInterceptor', UsersFactory]);

function AdminUserController($scope, $localStorage, $location, $routeParams) {
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  console.log($routeParams.action);
  $scope.viewAction = null
  if ('action' in $routeParams && $routeParams.action == 'me') {
    // Show user settings
    $scope.viewAction = $routeParams.action
  }
}

dc2DashboardControllers.controller('AdminUserController', ['$scope', '$localStorage', '$location', '$routeParams', AdminUserController]);

function DashBoardCtrl($scope, $location, $localStorage) {
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  
}

dc2DashboardControllers.controller('DashBoardCtrl', ['$scope', '$location', '$localStorage', DashBoardCtrl]);

function LoginCtrl($rootScope, $scope, $location, $localStorage, LoginFactory, UsersFactory) {

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
        $localStorage.authenticated=true;
        $localStorage.auth_token = headers()['x-dc2-auth-token'];
        $localStorage.auth_user = headers()['x-dc2-auth-user'];
        console.log('in doLogin');
        console.log($localStorage);
        if ('user' in data) {
          $localStorage.user = data['user'];
        }
      }
      console.log($localStorage.authenticated);
      if ($localStorage.authenticated) {
        $location.path('/');
      }

    }, function(errors) {
      alert('Authentication Error!')
    });

  }
}

dc2DashboardControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'LoginFactory', 'UsersFactory', LoginCtrl]);


function LogoutCtrl($localStorage, $location) {
	if ($localStorage.authenticated) {
		delete $localStorage.authenticated;
		delete $localStorage.auth_token;
		delete $localStorage.auth_user;
		delete $localStorage.user;
	}
	$location.path('/login');
}

dc2DashboardControllers.controller('LogoutCtrl', ['$localStorage', '$location', '$localStorage', LogoutCtrl]);

function UserSettingsController($scope, UsersFactory, GroupsFactory) {
  $scope.new_user = {};
  angular.copy($scope.user, $scope.new_user);
  $scope.all_groups = null
  GroupsFactory.query(function(data) {
    console.log('GroupsFactory data');
    console.log(data);
    $scope.all_groups = data;
  })
  $scope.is_edit = false;
  $scope.doEdit = function() {
    $scope.is_edit = true;
  }
  $scope.doSave = function() {
    console.log('$scope.user');
    console.log($scope.user);
    console.log('$scope.new_user');
    console.log($scope.new_user);
    $scope.is_edit = false; 
    console.log($scope.new_user);
    UsersFactory.update({username: $scope.new_user.username}, $scope.new_user, function(data) {
      console.log('in user update');
      console.log(data);
      angular.copy($scope.new_user, $scope.user);
    }, function(error) {
      angular.copy($scope.user, $scope.new_user);
      console.log('in user update error');
      console.log(error);
    })
  }
  $scope.doReset = function() {
    $scope.is_edit=false;
    angular.copy($scope.user, $scope.new_user);
  }
}

dc2Directives.controller('UserSettingsController', ['$scope', 'UsersFactory', 'GroupsFactory', UserSettingsController])

function UserSetting() {
  return {
    templateUrl: 'partials/directives/usersetting.html',
    restrict: 'E',
    scope: {
      authenticated: '=',
      user: '='
    },
    controller: UserSettingsController
  }
}

dc2Directives.directive('userSettings', [UserSetting])

function navBarController($localStorage, $scope) {
	console.log('in navBarController');
	$scope.checkGroup = function(user, groupname) {
		if (user && groupname) {
			if ('groups' in user) {
				console.log('groups found in user');
				if (user.groups.indexOf(groupname) > -1) {
					return true;
				}
			}
		}
	}
}

dc2Directives.controller('navBarController', ['$localStorage', '$scope', navBarController]);

function DirectiveNavbar() {
	console.log('in Directive')
	return {
		templateUrl: 'partials/directives/navbar.html',
		restrict: 'E',
		scope: {
			authenticated: "=",
			user: "="
		},
		controller: navBarController
	}
}

dc2Directives.directive('navbar', [DirectiveNavbar])