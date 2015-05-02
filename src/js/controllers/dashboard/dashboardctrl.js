function DashBoardCtrl($scope, $location, $localStorage) {
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  
}

dc2DashboardControllers.controller('DashBoardCtrl', ['$scope', '$location', '$localStorage', DashBoardCtrl]);
