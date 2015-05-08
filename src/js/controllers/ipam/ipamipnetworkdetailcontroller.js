function IPAMIpNetworkDetailController($scope, $location, $localStorage, $routeParams, toaster, IPNetworkFactory, IPNetworkInfoFactory, IPNetworkUsedIPsFactory, HostEntryFactory) {
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
  this.add_new_entry=false;
  this.new_entry = {};
  this.entry_error = {
    ipaddress: false
  };
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
    self.new_entry = {'ipnetwork': self.ipnetwork.network};
    self.entry_error = {
      ipaddress: false
    };
    self.add_new_entry=true;
  }
  this.saveEntry = function() {
    console.log('in saveEntry');
    console.log(self.new_entry);
    HostEntryFactory.new(self.new_entry, function(data) {
      console.log(data);
      self.entry_error = {};
      self.add_new_entry = false
      self.getUsedIPs();
    }, function(error) {
      if (error.data.error) {
        self.entry_error.ipaddress=true;
        toaster.pop('error', error.data.message);
      }
    });
  }
  this.getInfo();
  this.getUsedIPs();
}

dc2DashboardControllers.controller('IPAMIpNetworkDetailController', 
  ['$scope', '$location', '$localStorage', '$routeParams', 'toaster', 
  'IPNetworkFactory', 'IPNetworkInfoFactory', 'IPNetworkUsedIPsFactory', 'HostEntryFactory', IPAMIpNetworkDetailController]);
