function AdministrationXenController($scope, $localStorage, $location, toaster, XenServerFactory) {
  $scope.$storage = $localStorage;

  var self = this;
  self.breadcrumb = 'Home'+$location.path();
  self.view_status = {
    'add': false,
    'edit': false,
    'list': true
  };

  self.queryList = function() {
    XenServerFactory.query(function(data) {
      console.log('AdministrationXenController factory query');
      console.log(data);
      self.xenserver_list = data;
    }, function(error) {
      console.log('AdministrationXenController factory error');
      console.log(error);
      toaster.pop('error', 'Something went wrong');
    });
  }

  self.doAdd = function() {
    self.view_status.add = true;
    self.view_status.edit = false;
    self.view_status.list = false;
    self.xenserver = {};
  }
  self.doSave = function(entry) {
    console.log('in self.doSave');
    console.log(entry);
    if (entry.title == '') {
      entry.title=null;
    }
    if (self.view_status.add) {
      XenServerFactory.new(entry, function(data) {
        console.log('successfully saved');
        self.view_status.add = false;
        self.view_status.edit = false;
        self.view_status.list = true;
        self.queryList();
      }, function(error) {
        console.log('something went wrong');
        console.log(error);
        toaster.pop('error', error.data.message);
        self.view_status.add = false;
        self.view_status.edit = false;
        self.view_status.list = true;
        self.queryList();
      })
    }
    if (self.view_status.edit) {
      XenServerFactory.update(entry, function(data) {
        console.log('success updated');
        console.log(data);
        self.view_status.add = false;
        self.view_status.edit = false;
        self.view_status.list = true;
        toaster.pop('success', 'Entry Successfully Updated');
        self.queryList();
      });
    }
  }
  self.doCancel = function() {
    self.view_status.add = false;
    self.view_status.edit = false;
    self.view_status.list = true;
    self.queryList();
  }
  self.doEdit = function(entry) {
    XenServerFactory.get({id:entry.id}, function(data) {
      self.xenserver=data;
      self.view_status.add = false;
      self.view_status.edit = true;
      self.view_status.list = false;
    }, function(error) {
      toaster.pop('error', error.data.message);
    });
  }
  self.doDelete = function(entry) {
    XenServerFactory.delete({id: entry.id}, function(data) {
      console.log('delete successful');
      console.log(data);
      toaster.pop('success', data.message);
      self.queryList();
    }, function(error) {
      toaster.pop('error', error.data.message);
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
