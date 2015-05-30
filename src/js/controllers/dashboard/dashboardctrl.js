function DashBoardCtrl($scope, $location, $localStorage, AuthFactory) {
  $scope.$storage = $localStorage;
}

dc2DashboardControllers.controller('DashBoardCtrl', ['$scope', '$location', '$localStorage', 'AuthFactory', DashBoardCtrl]);
