function AdministrationController($scope, $localStorage) {
  $scope.$storage = $localStorage;
}

dc2DashboardControllers.controller('AdministrationController', ['$scope', '$localStorage', AdministrationController]);
