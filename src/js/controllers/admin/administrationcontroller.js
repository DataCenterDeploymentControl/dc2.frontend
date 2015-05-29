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
  $scope.doAdminXen = function() {
    $location.path('/administration/xen');
  }
}

dc2DashboardControllers.controller('AdministrationController', ['$scope', '$localStorage', '$location', '$routeParams', AdministrationController]);
