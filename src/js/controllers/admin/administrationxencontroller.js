function AdministrationXenController($scope, $localStorage, $location, toaster, XenServerFactory) {
  $scope.$storage = $localStorage;

  var self = this;

  self.queryList = function() {
    XenServerFactory.query(function(data) {
      console.log('AdministrationXenController factory query');
      console.log(data);
    }, function(error) {
      console.log('AdministrationXenController factory error');
      console.log(error);
    });
  }
  self.queryList();
}

dc2DashboardControllers.controller('AdministrationXenController', [
  '$scope',
  '$localStorage',
  '$location',
  'toaster',
  'XenServerFactory',
  AdministrationXenController
]);
