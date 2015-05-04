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