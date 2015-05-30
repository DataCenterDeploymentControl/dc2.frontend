function AdministrationUsersController($scope, $localStorage, $location, $route, toaster, UsersFactory) {
  console.log('in AdministrationUsersController');
  $scope.$storage = $localStorage;
  $scope.breadcrumb = 'Home'+$location.path();

  $scope.add_user = false;
  $scope.edit_user = false;
  $scope.users = null;
  $scope.doList = function() {
    UsersFactory.query(function(data) {
      console.log(data)
      $scope.users = data
    }, function(error) {
      console.log('AdministrationUsersController: error from usersfactory');
    });
  }
  $scope.doAddUser = function() {
    $scope.add_user = true;
    $scope.edit_user = false;
  }
  $scope.doDelete = function(user) {
    console.log('in doDelete');
    if (user != null) {
      UsersFactory.remove({username: user.username}, function(data) {
        console.log('doDelete: removing '+user.username);
        console.log(data);
        $scope.doList();
        toaster.pop('success', 'User: '+user.username+' deleted');
      }, function(error) {
        console.log('doDelete: error');
        console.log(error);
        toaster.pop('error', 'An Error Occured');
      });
    }
  }
  $scope.doEnable = function(user) {
    console.log('in doEnable');
    if (user != null) {
      UsersFactory.enable({username: user.username}, function(data) {
        console.log('in doEnable: enable success');
        $scope.doList();
      }, function(error) {
        console.log('in doEnable: enable unsuccessful');
      });
    }
  }
  $scope.doDisable = function(user) {
    console.log('in doDisable');
    if (user != null) {
      UsersFactory.disable({username: user.username}, function(data) {
        console.log('in doDisable: disable success');
        $scope.doList();
      }, function(error) {
        console.log('in doDisable: disable unsuccessfull');
      });
    }
  }
  $scope.doEdit = function(user) {
    $scope.edit_user = true;
    $scope.add_user = false;
    $scope.user_to_edit = user;
  }
  $scope.doList();
}

dc2DashboardControllers.controller(
  'AdministrationUsersController',
  ['$scope', '$localStorage', '$location', '$route', 'toaster', 'UsersFactory', AdministrationUsersController]);
