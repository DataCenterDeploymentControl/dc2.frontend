function StatusManagementController($scope, $location, $localStorage, toaster, StatusFactory) {
  var self = this;
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  self.statusList = null;

  this.doList = function() {
    StatusFactory.query(function(data) {
      console.log(data);
      self.statuslist = data;
    }, function(error) {
      console.log(error);
      toaster.pop('error', error.status.message);
    })
  }

  self.doList();
}

dc2DashboardControllers.controller('StatusManagementController', ['$scope', '$location', '$localStorage', 'toaster', 'StatusFactory', StatusManagementController]);
