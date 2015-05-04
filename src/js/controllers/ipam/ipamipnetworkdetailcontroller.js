function IPAMIpNetworkDetailController($scope, $location, $localStorage, $routeParams, toaster, IPNetworkFactory,IPNetworkInfoFactory) {
  var self = this;
  console.log('here');
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  console.log($routeParams.ipnetwork);
  this.ipnetwork = $routeParams.ipnetwork;
  this.getInfo = function() {
    console.log('in getInfo');
    IPNetworkInfoFactory.get({ipnetwork: self.ipnetwork}, function(data) {
      console.log(data);
    }, function(error) {
      console.log(error);
    })
  }
}

dc2DashboardControllers.controller('IPAMIpNetworkDetailController', ['$scope', '$location', '$localStorage', '$routeParams', 'toaster', 'IPNetworkFactory', 'IPNetworkInfoFactory', IPAMIpNetworkDetailController]);
