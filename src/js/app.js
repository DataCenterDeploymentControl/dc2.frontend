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
      when('/statusmgmt', {
        templateUrl: 'partials/statusmgmt/index.html',
        controller: 'StatusManagementController',
        controllerAs: 'CtrlStatusMgmt',
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
