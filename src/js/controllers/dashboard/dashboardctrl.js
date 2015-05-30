function DashBoardCtrl($scope, $location, $localStorage, AuthFactory) {
  $scope.$storage = $localStorage;
  // if (! $scope.$storage.authenticated) {
  //   $location.path('/login');
  // }
}

dc2DashboardControllers.controller('DashBoardCtrl', ['$scope', '$location', '$localStorage', 'AuthFactory', DashBoardCtrl]);
