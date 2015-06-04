function XenDashboardController($scope, $localStorage, toaster, XenFactory) {
  $scope.$storage = $localStorage;

  var self = this;
  self.loading_inventory = false;
  self.xenlist = null;
  self.xenlist_data = {};
  self.inventory_count = 1;
  self.chart = null;
  self.chart_memory_free_dps = [];
  self.chart_memory_used_dps = [];
  self.show_detail = false;
  self.doInventory = function() {
    console.log('doInventory');
    self.loading_inventory = true;
    if (self.xenlist.length != 0) {
      self.xenlist.forEach(function(element, index) {
        XenFactory.get({id:element.id}, function(data) {
          toaster.pop('success', 'Loaded Data for '+element.title);
          self.xenlist_data[element.hostname] = data.xenhost;
          self.updateChart(element.hostname);
        }, function(error) {
          toaster.pop('error', 'an error occured');
        });
      }, self);
    }
  }
  self.doShowDetail = function(xenhostname) {
    console.log('doShowDetail');
    console.log(xenhostname);
    self.show_detail = true;
    self.xenhost_selected = self.xenlist_data[xenhostname];
  }
  self.doHideDetail = function() {
    self.show_detail = false;
    self.xenhost_selected = null;
  }
  self.doChartRefresh = function() {
    self.chart_memory_free_dps.splice(0, self.chart_memory_free_dps.length);
    self.chart_memory_used_dps.splice(0, self.chart_memory_used_dps.length);
    self.xenlist_data = {};
    self.chart.render();
    self.doInventory();
  }
  self.updateChart = function(xenhostname) {
    self.chart_memory_used_dps.push({
      value: parseInt(self.xenlist_data[xenhostname].host[0].xen_memory_used),
      label: self.xenlist_data[xenhostname].host[0].xen_hostname
    });
    self.chart_memory_free_dps.push({
      value: parseInt(self.xenlist_data[xenhostname].host[0].xen_memory_free),
      label: self.xenlist_data[xenhostname].host[0].xen_hostname
    });
    // self.chart.render();

  }
  self.doList = function() {
    XenFactory.query({}, function(data) {
      self.xenlist = data;
      self.no_of_xenservers = self.xenlist.length;
      self.doInventory();
    }, function(error) {
      toaster.pop('error', 'An Error Occured');
    });
  }
  self.doCharting = function() {
    console.log('doCharting');
    self.chart = [
      {
        key: 'Memory Used',
        color: '#FF0000',
        values: self.chart_memory_used_dps
      },
      {
        key: 'Memory Free',
        color: '#00FF00',
        values: self.chart_memory_free_dps
      }

    ]
  }
  self.doList();
  self.doCharting();
}

dc2DashboardControllers.controller(
  'XenDashboardController',
  ['$scope', '$localStorage', 'toaster', 'XenFactory', XenDashboardController]);
