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
