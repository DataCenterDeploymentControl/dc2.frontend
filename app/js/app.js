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
  'dc2Directives',
  'dc2Services',
  'dc2Filters'
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
        controller: 'AdminUserController',
        resolve: {
          AuthCheckService: AuthCheckService
        }
      }).
      when('/administration/users', {
        templateUrl: 'partials/administration/users.html',
        controller: 'AdministrationUsersController',
        resolve: {
          AuthCheckService: AuthCheckService
        }
      }).
      when('/administration/xen', {
        templateUrl: 'partials/administration/xen.html',
        controller: 'AdministrationXenController',
        controllerAs:'CtrlAdminXen',
        resolve: {
          AuthCheckService: AuthCheckService
        }
      }).
      when('/administration', {
        templateUrl: 'partials/administration/index.html',
        controller: 'AdministrationController',
        resolve: {
          AuthCheckService: AuthCheckService
        }

      }).
      when('/ipam/ipnetworks/details', {
        templateUrl: 'partials/ipam/ipnetworks/ipnetwork_details.html',
        controller: 'IPAMIpNetworkDetailController',
        controllerAs: 'IPNetworkDetailCtrl',
        resolve: {
          AuthCheckService: AuthCheckService
        }
      }).
      when('/ipam/ipnetworks', {
        templateUrl: 'partials/ipam/ipnetworks/index.html',
        controller: 'IPAMIpNetworkController',
        controllerAs: 'IPNetworkCtrl',
        resolve: {
          AuthCheckService: AuthCheckService
        }
      }).
      when('/xen/dashboard', {
        templateUrl: 'partials/xen/dashboard.html',
        controller: 'XenDashboardController',
        controllerAs: 'CtrlXenDashboard',
        resolve: {
          AuthCheckService: AuthCheckService
        }
      }).
      otherwise({
        templateUrl: 'partials/main/index.html',
        controller: 'DashBoardCtrl',
        resolve: {
          AuthCheckService: AuthCheckService
        }
      });
  }
]);

DC2Frontend.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('dc2ResourceInterceptor');
}])

// DC2Frontend.run(['$rootScope', '$location', function($rootScope, $location) {
//   $rootScope.$on('loginRequired', function() {
//     $location.path('/login');
//   });
// }]);

DC2Frontend.constant('SideBarMenus', {
  'menus': [
    {
      'heading': 'Administration',
      'needs_group': 'admin',
      'items': [
        {
          'title': 'Users',
          'link': '/administration/users',
          'id': 'admin_users'
        },
        {
          'title': 'Groups',
          'link': '/administration/groups',
          'id': 'admin_groups'
        },
        {
          'title': 'XenServers',
          'link': '/administration/xen',
          'id': 'admin_xenservers'
        }
      ]
    },
    {
      'heading': 'IPAM',
      'needs_group': 'users',
      'items': [
        {
          'title': 'IP Networks',
          'link': '/ipam/ipnetworks'
        },
        {
          'title': 'Domains',
          'link': '/ipam/domains'
        }
      ]
    },
    {
      'heading': 'Xen Infrastructure',
      'needs_group': 'users',
      'items': [
        {
          'title': 'Xen Dashboard',
          'link': '/xen/dashboard'
        }
      ]
    }
  ]
})

'use strict';


var dc2DashboardControllers = angular.module('dc2DashboardControllers', []);

//         UsersFactory.query(function(data) {
//          console.log(data);
//        });

'use strict';

var dc2Factories = angular.module('dc2Factories', []);


'use strict';


var dc2Directives = angular.module('dc2Directives', []);


'use strict';

var dc2Services = angular.module('dc2Services', []);

'use strict';

var dc2Filters = angular.module('dc2Filters', []);

function LoginFactory($resource) {
  return $resource("http://localhost:5000/api/auth/v1/login", {}, {
    post: {method: "POST"}
  });
}

function AuthFactory($resource) {
  return $resource("http://localhost:5000/api/auth/v1/authcheck", {}, {
    check: {method: "GET"}
  });
}

dc2Factories.factory('LoginFactory', ['$resource', LoginFactory]);
dc2Factories.factory('AuthFactory', ['$resource', AuthFactory]);

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

function XenFactory($resource) {
  return $resource("http://localhost:5000/api/xen/v1/servers", {}, {
    query: {
      method:'GET',
      isArray:true
    },
    get: {
      method: 'GET',
      url: "http://localhost:5000/api/xen/v1/servers/:id",
      params:{id:'@id'},
      isArray: false
    }
    // new: {
    //   method:'POST',
    //   data:'@server',
    //   isArray: false
    // },
    // get: {
    //   method:'GET',
    //   url:"http://localhost:5000/api/xen/v1/admin/servers/:id",
    //   params:{id:'@id'},
    //   isArray:false
    // },
    // delete: {
    //   method: 'DELETE',
    //   url: "http://localhost:5000/api/xen/v1/admin/servers/:id",
    //   params: {id:'@id'},
    //   isArray: false
    // },
    // update: {
    //   method: 'PUT',
    //   url: "http://localhost:5000/api/xen/v1/admin/servers/:id",
    //   params: {id:'@id'},
    //   isArray: false
    // }
  });
}

dc2Factories.factory('XenFactory', ['$resource', XenFactory]);

function XenServerFactory($resource) {
  return $resource("http://localhost:5000/api/xen/v1/admin/servers", {}, {
    query: {
      method:'GET',
      isArray:true
    },
    new: {
      method:'POST',
      data:'@server',
      isArray: false
    },
    get: {
      method:'GET',
      url:"http://localhost:5000/api/xen/v1/admin/servers/:id",
      params:{id:'@id'},
      isArray:false
    },
    delete: {
      method: 'DELETE',
      url: "http://localhost:5000/api/xen/v1/admin/servers/:id",
      params: {id:'@id'},
      isArray: false
    },
    update: {
      method: 'PUT',
      url: "http://localhost:5000/api/xen/v1/admin/servers/:id",
      params: {id:'@id'},
      isArray: false
    }
  });
}

dc2Factories.factory('XenServerFactory', ['$resource', XenServerFactory]);

function AdministrationController($scope, $localStorage) {
  $scope.$storage = $localStorage;
}

dc2DashboardControllers.controller('AdministrationController', ['$scope', '$localStorage', AdministrationController]);

function AdministrationUsersController($scope, $localStorage, $location, $route, toaster, UsersFactory) {
  console.log('in AdministrationUsersController');
  $scope.$storage = $localStorage;
  $scope.breadcrumb = 'Home'+$location.path();

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

dc2DashboardControllers.controller(
  'AdministrationUsersController',
  ['$scope', '$localStorage', '$location', '$route', 'toaster', 'UsersFactory', AdministrationUsersController]);

function AdministrationXenController($scope, $localStorage, $location, toaster, XenServerFactory) {
  $scope.$storage = $localStorage;

  var self = this;
  self.breadcrumb = 'Home'+$location.path();
  self.view_status = {
    'add': false,
    'edit': false,
    'list': true
  };

  self.queryList = function() {
    XenServerFactory.query(function(data) {
      console.log('AdministrationXenController factory query');
      console.log(data);
      self.xenserver_list = data;
    }, function(error) {
      console.log('AdministrationXenController factory error');
      console.log(error);
      toaster.pop('error', 'Something went wrong');
    });
  }

  self.doAdd = function() {
    self.view_status.add = true;
    self.view_status.edit = false;
    self.view_status.list = false;
    self.xenserver = {};
  }
  self.doSave = function(entry) {
    console.log('in self.doSave');
    console.log(entry);
    if (entry.title == '') {
      entry.title=null;
    }
    if (self.view_status.add) {
      XenServerFactory.new(entry, function(data) {
        console.log('successfully saved');
        self.view_status.add = false;
        self.view_status.edit = false;
        self.view_status.list = true;
        self.queryList();
      }, function(error) {
        console.log('something went wrong');
        console.log(error);
        toaster.pop('error', error.data.message);
        self.view_status.add = false;
        self.view_status.edit = false;
        self.view_status.list = true;
        self.queryList();
      })
    }
    if (self.view_status.edit) {
      XenServerFactory.update(entry, function(data) {
        console.log('success updated');
        console.log(data);
        self.view_status.add = false;
        self.view_status.edit = false;
        self.view_status.list = true;
        toaster.pop('success', 'Entry Successfully Updated');
        self.queryList();
      });
    }
  }
  self.doCancel = function() {
    self.view_status.add = false;
    self.view_status.edit = false;
    self.view_status.list = true;
    self.queryList();
  }
  self.doEdit = function(entry) {
    XenServerFactory.get({id:entry.id}, function(data) {
      self.xenserver=data;
      self.view_status.add = false;
      self.view_status.edit = true;
      self.view_status.list = false;
    }, function(error) {
      toaster.pop('error', error.data.message);
    });
  }
  self.doDelete = function(entry) {
    XenServerFactory.delete({id: entry.id}, function(data) {
      console.log('delete successful');
      console.log(data);
      toaster.pop('success', data.message);
      self.queryList();
    }, function(error) {
      toaster.pop('error', error.data.message);
    });
  }
  self.queryList();
}

dc2DashboardControllers.controller('AdministrationXenController', [
  '$scope',
  '$localStorage',
  '$location',
  'toaster',
  'XenServerFactory',
  AdministrationXenController
]);

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

function DashBoardCtrl($scope, $location, $localStorage, AuthFactory) {
  $scope.$storage = $localStorage;
}

dc2DashboardControllers.controller('DashBoardCtrl', ['$scope', '$location', '$localStorage', 'AuthFactory', DashBoardCtrl]);

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
  this.in_add_action = false;
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

function XenDashboardController($scope, $localStorage, toaster, XenFactory) {
  $scope.$storage = $localStorage;

  var self = this;
  self.loading_inventory = false;
  self.xenlist = null;
  self.xenlist_data = {};
  self.inventory_count = 1;
  self.chart = null;
  self.chart_memory_free_dps = [];
  self.chart_memory_used_dps = [];
  self.show_detail = false;
  self.doInventory = function() {
    console.log('doInventory');
    self.loading_inventory = true;
    if (self.xenlist.length != 0) {
      self.xenlist.forEach(function(element, index) {
        XenFactory.get({id:element.id}, function(data) {
          toaster.pop('success', 'Loaded Data for '+element.title);
          self.xenlist_data[element.hostname] = data.xenhost;
          self.updateChart(element.hostname);
        }, function(error) {
          toaster.pop('error', 'an error occured');
        });
      }, self);
    }
  }
  self.doShowDetail = function(xenhostname) {
    console.log('doShowDetail');
    console.log(xenhostname);
    self.show_detail = true;
    self.xenhost_selected = self.xenlist_data[xenhostname];
  }
  self.doHideDetail = function() {
    self.show_detail = false;
    self.xenhost_selected = null;
  }
  self.doChartRefresh = function() {
    self.chart_memory_free_dps.splice(0, self.chart_memory_free_dps.length);
    self.chart_memory_used_dps.splice(0, self.chart_memory_used_dps.length);
    self.xenlist_data = {};
    self.chart.render();
    self.doInventory();
  }
  self.updateChart = function(xenhostname) {
    self.chart_memory_used_dps.push({
      y: parseInt(self.xenlist_data[xenhostname].host[0].xen_memory_used),
      label: self.xenlist_data[xenhostname].host[0].xen_hostname
    });
    self.chart_memory_free_dps.push({
      y: parseInt(self.xenlist_data[xenhostname].host[0].xen_memory_free),
      label: self.xenlist_data[xenhostname].host[0].xen_hostname
    });
    self.chart.render();
  }
  self.doList = function() {
    XenFactory.query({}, function(data) {
      self.xenlist = data;
      self.no_of_xenservers = self.xenlist.length;
      self.doInventory();
    }, function(error) {
      toaster.pop('error', 'An Error Occured');
    });
  }
  self.doCharting = function() {
    console.log('doCharting');
    var dps = []

    self.chart = new CanvasJS.Chart('chartContainer', {
      theme: 'theme1',
      title: {
        text: 'XenServer Memory Chart'
      },
      axisY: {
          title: 'Memory (GiB)',
          labelFontSize: 16
      },
      axisX: {
        labelFontSize: 12,
      },
      data: [
        {
          type: "stackedColumn",
          legendText: 'Memeory Used (GiB)',
          showInLegend: true,
          dataPoints: self.chart_memory_used_dps,
          color: 'red'
        },
        {
          type: "stackedColumn",
          legendText: "Memory Free (GiB)",
          showInLegend: true,
          dataPoints: self.chart_memory_free_dps,
          color: 'green'
        }
      ],
      legend: {
        cursor: "pointer",
        itemclick: function (e) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                  e.dataSeries.visible = false;
              } else {
                  e.dataSeries.visible = true;
              }
              e.chart.render();
          }
      }
    });
    self.chart.render();

  }
  self.doList();
  self.doCharting();
}

dc2DashboardControllers.controller(
  'XenDashboardController',
  ['$scope', '$localStorage', 'toaster', 'XenFactory', XenDashboardController]);

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
      $scope.$parent.$parent.edit_user=false;
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
	if (this.authenticaed) {
		this.is_admin = this.checkGroup(this.user,'admin');
		this.is_user = this.checkGroup(this.user,'user');
	}
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


function sideBarController(SideBarMenus) {
	var self = this;
  this.sidebarmenus = SideBarMenus.menus;
	this.checkGroup = function(user, groupname) {
		if (groupname) {
			if ('groups' in user) {
				if (user.groups.indexOf(groupname) > -1) {
					return true;
				}
			}
		}
	}
  this.doDropDown = function(menu) {
    if (! menu.is_down) {
      menu.is_down = true;
    } else {
      menu.is_down = false;
    }
  }
  this.isDown = function(menu) {
    if (! 'is_down' in menu) {
      menu.is_down = false;
    }
    return menu.is_down;
  }
  console.log(SideBarMenus.menus);
	this.is_admin = this.checkGroup(this.user,'admin');
	this.is_user = this.checkGroup(this.user,'user');
}

dc2Directives.controller('sideBarController', ['SideBarMenus', sideBarController]);

function DirectiveSideBarNav() {
	console.log('in SideBarNav Directive')
	return {
		templateUrl: 'partials/directives/sidebarnav.html',
		restrict: 'E',
		scope:  {
			authenticated: "=",
			user: "="
		},
		bindToController: true,
		controller: 'sideBarController',
		controllerAs: 'ctrlSideBar'
	}
}

dc2Directives.directive('sidebar', [DirectiveSideBarNav]);

function AuthCheckService($q, $location, AuthFactory) {
  console.log('In AuthCheckService');
  var defered = $q.defer();
  AuthFactory.check(function(data) {
    console.log('success');
    console.log(data);
    defered.resolve(true);
  }, function(error) {
    console.log('error');
    console.log(error);
    defered.reject();
    $location.path('/login');
  });
  return defered.promise;
}

dc2Services.service('AuthCheckService', ['$q', '$location', 'AuthFactory', AuthCheckService]);

function Capitalize() {
  return function(input, all) {
    if (typeof(input) === 'string') {
      return input.charAt(0).toUpperCase() + input.substring(1).toLowerCase();
    }
  }
}

dc2Filters.filter('capitalize', [Capitalize]);
