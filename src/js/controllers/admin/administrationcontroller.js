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
