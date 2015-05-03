function IPAMIpNetworkController($scope, $location, $localStorage, IPNetworkFactory) {
  var self = this;
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  this.ipnetworks = null;
  this.add_new = false;
  this.doList = function() {
    // list all ipnetworks
    console.log('in IPAMIpNetworkController.doList()')
    IPNetworkFactory.query(function(data) {
      console.log('in IPAMIpNetworkController.doList()');
      self.ipnetworks = data;
    }, function(error) {
      console.log('in IPAMIpNetworkController.doList() error');
    });
  }
  this.doAdd = function() {
    console.log('in doAdd');
    self.add_new = true;
  }
  this.doSave = function(ipnetwork) {
    console.log(ipnetwork);
    IPNetworkFactory.new(ipnetwork, function(data) {
      console.log('IPAMIpNetworkController.doSave() success');
      self.add_new = false;
      self.doList();
    }, function(error) {
      console.log('IPAMIpNetworkController.doSave() unsuccessfull');
    })
  }
  this.doList();
}

dc2DashboardControllers.controller('IPAMIpNetworkController', ['$scope', '$location', '$localStorage', 'IPNetworkFactory', IPAMIpNetworkController]);
