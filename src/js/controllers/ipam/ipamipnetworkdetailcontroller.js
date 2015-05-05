function IPAMIpNetworkDetailController($scope, $location, $localStorage, $routeParams, toaster, IPNetworkFactory, IPNetworkInfoFactory, IPNetworkUsedIPsFactory) {
  var self = this;
  console.log('here');
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  console.log($routeParams.ipnetwork);
  this.ipnetwork = {
    network: $routeParams.ipnetwork
  }
  self.add_new_entry=false;

  this.getInfo = function() {
    console.log('in getInfo');
    IPNetworkInfoFactory.get({ipnetwork: self.ipnetwork.network}, function(data) {
      console.log(data);
      self.ipnetwork.info = data;
    }, function(error) {
      console.log(error);
    })
  }
  this.getUsedIPs = function() {
    console.log('in getUsedIPs');
    IPNetworkUsedIPsFactory.get({ipnetwork: self.ipnetwork.network}, function(data) {
      console.log(data);
      self.ipnetwork.used = data;
    }, function(error) {
      console.log(error);
    })
  }
  this.addNewEntry = function() {
    console.log('in addNewEntry');
    self.new_entry = {};
    self.add_new_entry=true;
  }
  this.saveEntry = function() {
    console.log('in saveEntry');
    console.log(self.new_entry);
  }
  this.getInfo();
  this.getUsedIPs();
}

dc2DashboardControllers.controller('IPAMIpNetworkDetailController', ['$scope', '$location', '$localStorage', '$routeParams', 'toaster', 'IPNetworkFactory', 'IPNetworkInfoFactory', 'IPNetworkUsedIPsFactory', IPAMIpNetworkDetailController]);
