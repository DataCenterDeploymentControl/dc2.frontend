function StatusManagementController($scope, $location, $localStorage, toaster, StatusFactory) {
  var self = this;
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  self.view_state = {
    add: false,
    edit: false,
    list: true,
    update: {
      add: false,
      edit: false,
      list: true
    }
  };
  self.statusList = null;
  self.select_values = {
    states: [
      'new',
      'update',
      'resolved',
      'done'
    ],
    impact: [
      'internal',
      'external'
    ]
  };

  self.emptyEntry = function() {
    self.entry = {
      title: null,
      status: 'new',
      description: null,
      impact: 'internal',
      updates: [],
    };
  }
  self.doList = function() {
    StatusFactory.query(function(data) {
      console.log(data);
      self.statuslist = data;
    }, function(error) {
      console.log(error);
      toaster.pop('error', error.status.message);
    })
  }

  self.doAdd = function() {
    self.emptyEntry();
    console.log(self.entry);
    self.view_state.add = true;
    self.view_state.edit = false;
    self.view_state.list = false;
  }
  self.doUpdateAdd = function() {
    self.view_state.update.add = true;
    self.view_state.update.edit = false;
    self.view_state.update.list = false;
  }

  self.doCancelEdit = function() {
    self.emptyEntry();
    self.view_state.add = false;
    self.view_state.edit = false;
    self.view_state.list = true;

  }
  self.doUpdateAddEntry = function() {
    self.entry.updates.push({update: self.update_entry});
    self.view_state.update.add = false;
    self.view_state.update.list = true;
  }
  self.doSaveEntry = function() {
    if (self.view_state.add) {
      StatusFactory.new({}, self.entry, function(data) {
        console.log('Controller: StatusMgmt.doSaveEntry add');
        console.log(data);
        self.doCancelEdit();
        self.doList();
      }, function(error) {
        console.log('Controller: StatusMgmt.doSaveEntry Error');
        console.log(error);
        toaster.pop('error', error.status.message);
        self.doCancelEdit();      
        self.doList();
      });
    }
    if (self.view_state.edit) {
      StatusFactory.update({id: self.entry.id}, self.entry, function(data) {
        console.log('Controller: StatusMgmt.doSaveEntry edit');
        console.log(data);
        self.doCancelEdit();
        self.doList();
      }, function(error) {
        console.log('Controller: StatusMgmt.doSaveEntry edit error');
        console.log(error);
        toaster.pop('error', error.status.message);
        self.doCancelEdit();
        self.doList();
      });
    }
  }
  self.doEditEntry = function(entry) {
    self.entry = entry;
    console.log(self.entry);
    self.view_state.add = false;
    self.view_state.list = false;
    self.view_state.edit = true;
  }
  self.doRemoveEntry = function(entry) {
    self.view_state.add = false;
    self.view_state.list = true;
    self.view_state.edit = false;
    StatusFactory.delete({id: entry.id}, entry, function(data) {
      self.doList();      
    }, function(error) {
      toaster.pop('error', error.status.message);
      self.doList();
    });
  }
  self.doList();
}

dc2DashboardControllers.controller('StatusManagementController', ['$scope', '$location', '$localStorage', 'toaster', 'StatusFactory', StatusManagementController]);
