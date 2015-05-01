function DashBoardCtrl($scope, $location, $localStorage) {
  if ($localStorage.authenticated == null || $localStorage.authenticated == false) {
    console.log('not authenticated')
    $location.path('/login');
  }
  $scope.$storage = $localStorage;
}

dc2DashboardControllers.controller('DashBoardCtrl', ['$scope', '$location', '$localStorage', DashBoardCtrl]);
