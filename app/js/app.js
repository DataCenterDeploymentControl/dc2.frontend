'use strict';

var DC2Frontend = angular.module('DC2Frontend', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'toaster',
  'ngStorage',
  'rt.encodeuri',
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
      when('/administration/users', {
        templateUrl: 'partials/administration/users.html',
        controller: 'AdministrationUsersController'
      }).      
      when('/administration', {
        templateUrl: 'partials/administration/index.html',
        controller: 'AdministrationController'
      }).
      when('/ipam/ipnetworks/details', {
        templateUrl: 'partials/ipam/ipnetworks/ipnetwork_details.html',
        controller: 'IPAMIpNetworkDetailController',
        controllerAs: 'IPNetworkDetailCtrl'
      }).      
      when('/ipam/ipnetworks', {
        templateUrl: 'partials/ipam/ipnetworks/index.html',
        controller: 'IPAMIpNetworkController',
        controllerAs: 'IPNetworkCtrl'
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

function IPNetworkFactory($resource) {
  return $resource("http://localhost:5000/api/ipam/v1/ipnetworks", {}, {
    query: {
      method:'GET',
      isArray:true
    },
    new: {
      method:'POST',
      data:'@ipnetwork',
      isArray:false
    }
  });
}

dc2Factories.factory('IPNetworkFactory', ['$resource', IPNetworkFactory]);


function IPNetworkInfoFactory($resource) {
  return $resource("http://localhost:5000/api/ipam/v1/ipnetworks/info", {ipnetwork:null}, {
    get: {
      method:'GET',
      isArray:false,
      data:{ipnetwork:"@ipnetwork"}
    } 
  });
}

dc2Factories.factory('IPNetworkInfoFactory', ['$resource', IPNetworkInfoFactory]);

function IPNetworkUsedIPsFactory($resource) {
  return $resource("http://localhost:5000/api/ipam/v1/ipnetworks/used", {ipnetwork:null}, {
    get: {
      method: 'GET',
      isArray: true,
      data:{ipnetwork:"@ipnetwork"}
    }
  });
}

dc2Factories.factory('IPNetworkUsedIPsFactory', ['$resource', IPNetworkUsedIPsFactory]);

function HostEntryFactory($resource) {
  return $resource("http://localhost:5000/api/ipam/v1/hostentries", {hostipentry:null}, {
    new: {
      method: 'POST',
      isArray: false,
      data:"@hostipentry"
    }
  });
}

dc2Factories.factory('HostEntryFactory', ["$resource", HostEntryFactory]);
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
  return $resource("http://localhost:5000/api/admin/v1/users/:username/:state", {username:null, state:null}, {
    query: {
      method:'GET',
      isArray:true
    },
    update: {
      method:'put',
      params:{username:'@username'},
      data:'@user',
      isArray:false
    },
    get: {
      method:'get',
      params:{username:'@username'},
      isArray:false
    },
    new: {
      method:'post',
      data:'@user',
      isArray:false
    },
    remove: {
      method:'delete',
      params:{username: '@username'},
      isArray:false
    },
    enable: {
      method:'get',
      params:{username: '@username', state:'enable'},
      isArray:false
    },
    disable: {
      method:'get',
      params:{username: '@username', state:'disable'},
      isArray:false
    }
  });
}

dc2Factories.factory('UsersFactory', ['$resource', 'dc2ResourceInterceptor', UsersFactory]);

function AdministrationController($scope, $localStorage, $location, $routeParams) {
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  if ('action' in $routeParams) {
    console.log($routeParams.action)
  }
  $scope.doAdminUsers = function() {
    $location.path('/administration/users');
  }
  $scope.doAdminGroups = function() {
    $location.path('/administration/groups');
  }
}

dc2DashboardControllers.controller('AdministrationController', ['$scope', '$localStorage', '$location', '$routeParams', AdministrationController]);

function AdministrationUsersController($scope, $localStorage, $location, toaster, UsersFactory) {
  console.log('in AdministrationUsersController');
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  $scope.add_user = false;
  $scope.edit_user = false;
  $scope.users = null;
  $scope.doList = function() {
    UsersFactory.query(function(data) {
      console.log(data)
      $scope.users = data
    }, function(error) {
      console.log('AdministrationUsersController: error from usersfactory');
    });
  }
  $scope.doAddUser = function() {
    $scope.add_user = true;
    $scope.edit_user = false;
  }
  $scope.doDelete = function(user) {
    console.log('in doDelete');
    if (user != null) {
      UsersFactory.remove({username: user.username}, function(data) {
        console.log('doDelete: removing '+user.username);
        console.log(data);
        $scope.doList();
        toaster.pop('success', 'User: '+user.username+' deleted');
      }, function(error) {
        console.log('doDelete: error');
        console.log(error);
        toaster.pop('error', 'An Error Occured');
      });
    }
  }
  $scope.doEnable = function(user) {
    console.log('in doEnable');
    if (user != null) {
      UsersFactory.enable({username: user.username}, function(data) {
        console.log('in doEnable: enable success');
        $scope.doList();
      }, function(error) {
        console.log('in doEnable: enable unsuccessful');
      });
    }
  }
  $scope.doDisable = function(user) {
    console.log('in doDisable');
    if (user != null) {
      UsersFactory.disable({username: user.username}, function(data) {
        console.log('in doDisable: disable success');
        $scope.doList();
      }, function(error) {
        console.log('in doDisable: disable unsuccessfull');
      });
    }
  }
  $scope.doEdit = function(user) {
    $scope.edit_user = true;
    $scope.add_user = false;
    $scope.user_to_edit = user;
  }
  $scope.doList();
}

dc2DashboardControllers.controller('AdministrationUsersController', ['$scope', '$localStorage', '$location', 'toaster', 'UsersFactory', AdministrationUsersController]);

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

function IPAMIpNetworkDetailController($scope, $location, $localStorage, $routeParams, toaster, IPNetworkFactory, IPNetworkInfoFactory, IPNetworkUsedIPsFactory, HostEntryFactory) {
  var self = this;
  console.log('here');
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  console.log($routeParams.ipnetwork);
  this.ipnetwork = {
    network: $routeParams.ipnetwork
  }
  this.add_new_entry=false;
  this.new_entry = {};
  this.entry_error = {
    ipaddress: false
  };
  this.getInfo = function() {
    console.log('in getInfo');
    IPNetworkInfoFactory.get({ipnetwork: self.ipnetwork.network}, function(data) {
      console.log(data);
      self.ipnetwork.info = data;
    }, function(error) {
      console.log(error);
    })
  }
  this.getUsedIPs = function() {
    console.log('in getUsedIPs');
    IPNetworkUsedIPsFactory.get({ipnetwork: self.ipnetwork.network}, function(data) {
      console.log(data);
      self.ipnetwork.used = data;
    }, function(error) {
      console.log(error);
    })
  }
  this.addNewEntry = function() {
    console.log('in addNewEntry');
    self.new_entry = {'ipnetwork': self.ipnetwork.network};
    self.entry_error = {
      ipaddress: false
    };
    self.add_new_entry=true;
  }
  this.saveEntry = function() {
    console.log('in saveEntry');
    console.log(self.new_entry);
    HostEntryFactory.new(self.new_entry, function(data) {
      console.log(data);
      self.entry_error = {};
      self.add_new_entry = false
      self.getUsedIPs();
    }, function(error) {
      if (error.data.error) {
        self.entry_error.ipaddress=true;
        toaster.pop('error', error.data.message);
      }
    });
  }
  this.getInfo();
  this.getUsedIPs();
}

dc2DashboardControllers.controller('IPAMIpNetworkDetailController', 
  ['$scope', '$location', '$localStorage', '$routeParams', 'toaster', 
  'IPNetworkFactory', 'IPNetworkInfoFactory', 'IPNetworkUsedIPsFactory', 'HostEntryFactory', IPAMIpNetworkDetailController]);

function IPAMIpNetworkController($scope, $location, $localStorage, toaster, IPNetworkFactory) {
  var self = this;
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  this.foo = {};

  this.foo.regExp = /^[0-9]{1,2}$/;
  this.ipnetworks = null;
  this.add_new = false;
  this.new_ipnetwork = {}
  this.doList = function() {
    // list all ipnetworks
    console.log('in IPAMIpNetworkController.doList()')
    IPNetworkFactory.query(function(data) {
      console.log('in IPAMIpNetworkController.doList()');
      console.log(data);
      self.ipnetworks = data;
    }, function(error) {
      console.log('in IPAMIpNetworkController.doList() error');
    });
  }
  this.doAdd = function() {
    console.log('in doAdd');
    self.add_new = true;
    self.new_ipnetwork = {};
  }
  this.doSave = function(ipnetwork) {
    console.log(ipnetwork);
    IPNetworkFactory.new(ipnetwork, function(data) {
      console.log('IPAMIpNetworkController.doSave() success');
      self.add_new = false;
      self.doList();
    }, function(error) {
      console.log('IPAMIpNetworkController.doSave() unsuccessfull');
      console.log(error);

    });
  }
  this.doCancelSave = function() {
    self.add_new = false;
    self.new_ipnetwork = {}; 
  }
  this.doList();
}

dc2DashboardControllers.controller('IPAMIpNetworkController', ['$scope', '$location', '$localStorage', 'toaster', 'IPNetworkFactory', IPAMIpNetworkController]);

function LoginCtrl($rootScope, $scope, $location, $localStorage, LoginFactory, UsersFactory) {

  $scope.user = {
    'email': null,
    'password': null,
    'auth_type': 'local'
  }

  $scope.doLogin = function(login) {
    console.log('LoginCtrl.doLogin()');
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

function UserSettingsController($scope, $location, toaster, UsersFactory, GroupsFactory) {
  console.log('UserSettingsController');
  console.log($scope.newUser);
  console.log(($scope.newUser==true && $scope.is_edit==false))
  if ($scope.newUser) {
    $scope.new_user = {
      'username': null,
      'name': null,
      'email': null,
      'password': null
    }; 
    $scope.is_edit=true;
  } else {
    $scope.new_user = {};
    if ($scope.editEnable) {
      $scope.is_edit = true;
    } else {
      $scope.is_edit = false;
    }

    UsersFactory.get({username: $scope.user.username}, function(data) {
      console.log(data);
      $scope.user = data;
    });
  }
  angular.copy($scope.user, $scope.new_user);
  $scope.all_groups = null
  $scope.list = function() {
    GroupsFactory.query(function(data) {
      console.log('GroupsFactory list data');
      console.log(data);
      $scope.all_groups = data;
    }, function(error) {
      console.log('GroupsFactory list error');
      console.log(error);
    });
  }
  $scope.doEdit = function() {
    $scope.is_edit = true;
  }
  $scope.doSave = function() {
    $scope.is_edit = false; 
    if (! $scope.newUser) {
      UsersFactory.update({username: $scope.new_user.username}, $scope.new_user, function(data) {
        angular.copy($scope.new_user, $scope.user);
      }, function(error) {
        angular.copy($scope.user, $scope.new_user);
      });
    } else {
      UsersFactory.new($scope.new_user, function(data) {
        console.log('in User Save')
        console.log(data)
        toaster.pop('success', 'User '+data.user.username+ 'created');
        $scope.add_user=false;
        $scope.edit_user=false;        
      }, function(error) {
        console.log('in user Save error');
        console.log(error);
        toaster.pop('error', 'An error occured');
        $scope.add_user=false;
        $scope.edit_user=false;        
      })
    }
  }
  $scope.doReset = function() {
    if (!$scope.newUser) {
      $scope.is_edit=false; 
    } else {
      console.log($scope.$parent.$parent);
      $scope.$parent.$parent.add_user=false;
    }
    angular.copy($scope.user, $scope.new_user);
  }
  $scope.list();
}

dc2Directives.controller('UserSettingsController', ['$scope', '$location', 'toaster', 'UsersFactory', 'GroupsFactory', UserSettingsController])

function UserSetting() {
  return {
    templateUrl: 'partials/directives/usersetting.html',
    restrict: 'E',
    scope: {
      authenticated: '=',
      user: '=',
      newUser: '=',
      editEnable: '='
    },
    controller: UserSettingsController
  }
}

dc2Directives.directive('userSettings', [UserSetting])

function navBarController() {
	var self = this;
	this.checkGroup = function(user, groupname) {
		if (groupname) {
			if ('groups' in user) {
				console.log('groups found in user');
				if (user.groups.indexOf(groupname) > -1) {
					return true;
				}
			}
		}
	}
	this.is_admin = this.checkGroup(this.user,'admin');
	this.is_user = this.checkGroup(this.user,'user');
}

dc2Directives.controller('navBarController', [navBarController]);

function DirectiveNavbar() {
	console.log('in Directive')
	return {
		templateUrl: 'partials/directives/navbar.html',
		restrict: 'E',
		scope:  {
			authenticated: "=",
			user: "="
		},
		bindToController: true,
		controller: 'navBarController',
		controllerAs: 'navBarCtrl'
	}
}

dc2Directives.directive('navbar', [DirectiveNavbar])