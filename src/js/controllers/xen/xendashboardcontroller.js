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
      y: parseInt(self.xenlist_data[xenhostname].host[0].xen_memory_used),
      label: self.xenlist_data[xenhostname].host[0].xen_hostname
    });
    self.chart_memory_free_dps.push({
      y: parseInt(self.xenlist_data[xenhostname].host[0].xen_memory_free),
      label: self.xenlist_data[xenhostname].host[0].xen_hostname
    });
    self.chart.render();

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
    var dps = []

    self.chart = new CanvasJS.Chart('chartContainer', {
      theme: 'theme1',
      title: {
        text: 'XenServer Memory Chart'
      },
      axisY: {
          title: 'Memory (GiB)',
          labelFontSize: 16
      },
      axisX: {
        labelFontSize: 12,
      },
      data: [
        {
          type: "stackedColumn",
          legendText: 'Memeory Used (GiB)',
          showInLegend: true,
          dataPoints: self.chart_memory_used_dps,
          color: 'red'
        },
        {
          type: "stackedColumn",
          legendText: "Memory Free (GiB)",
          showInLegend: true,
          dataPoints: self.chart_memory_free_dps,
          color: 'green'
        }
      ],
      legend: {
        cursor: "pointer",
        itemclick: function (e) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                  e.dataSeries.visible = false;
              } else {
                  e.dataSeries.visible = true;
              }
              e.chart.render();
          }
      }
    });
    self.chart.render();

  }
  self.doList();
  self.doCharting();
}

dc2DashboardControllers.controller(
  'XenDashboardController',
  ['$scope', '$localStorage', 'toaster', 'XenFactory', XenDashboardController]);
