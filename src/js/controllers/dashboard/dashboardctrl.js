function DashBoardCtrl($rootScope, $scope, $location) {
  if ($rootScope.authenticated == null || $rootScope.authenticated == false) {
    console.log('not authenticated')
    $location.path('/login');
  }
}

dc2DashboardControllers.controller('DashBoardCtrl', ['$rootScope', '$scope', '$location', DashBoardCtrl]);
