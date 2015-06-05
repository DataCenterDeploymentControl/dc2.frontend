function StatusManagementController($scope, $location, $localStorage, toaster, StatusFactory) {
  var self = this;
  $scope.$storage = $localStorage;
  if (! $scope.$storage.authenticated) {
    $location.path('/login');
  }
  self.view_state = {
    add: false,
    edit: false,
    list: true
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

  self.doCancelEdit = function() {
    self.emptyEntry();
    self.view_state.add = false;
    self.view_state.edit = false;
    self.view_state.list = true;

  }
  self.doSaveEntry = function() {
    StatusFactory.new({}, self.entry, function(data) {
      console.log('Controller: StatusMgmt.doSaveEntry');
      console.log(data);
      self.doCancelEdit();
      self.doList();
    }, function(error) {
      console.log('Controller: StatusMgmt.doSaveEntry Error');
      console.log(error);
      toaster.pop('error', error.status.message);
      self.doCancelEdit();      
    });
  }
  self.doEditEntry = function(entry) {
    self.entry = entry;
    console.log(self.entry);
    self.view_state.add = false;
    self.view_state.list = false;
    self.view_state.edit = true;
  }
  self.doList();
}

dc2DashboardControllers.controller('StatusManagementController', ['$scope', '$location', '$localStorage', 'toaster', 'StatusFactory', StatusManagementController]);
