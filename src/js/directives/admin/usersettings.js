function UserSettingsController($scope, toaster, UsersFactory, GroupsFactory) {
  console.log('UserSettingsController');
  console.log($scope.newUser);
  console.log(($scope.newUser==true && $scope.is_edit==false))
  if ($scope.newUser) {
    $scope.new_user = {
      'username': null,
      'name': null,
      'email': null,
      'password': null
    }; 
    $scope.is_edit=true;
  } else {
    $scope.new_user = {};
    if ($scope.editEnable) {
      $scope.is_edit = true;
    } else {
      $scope.is_edit = false;
    }

    UsersFactory.get({username: $scope.user.username}, function(data) {
      console.log(data);
      $scope.user = data;
    });
  }
  angular.copy($scope.user, $scope.new_user);
  $scope.all_groups = null
  $scope.list = function() {
    GroupsFactory.query(function(data) {
      console.log('GroupsFactory list data');
      console.log(data);
      $scope.all_groups = data;
    }, function(error) {
      console.log('GroupsFactory list error');
      console.log(error);
    });
  }
  $scope.doEdit = function() {
    $scope.is_edit = true;
  }
  $scope.doSave = function() {
    $scope.is_edit = false; 
    if (! $scope.newUser) {
      UsersFactory.update({username: $scope.new_user.username}, $scope.new_user, function(data) {
        angular.copy($scope.new_user, $scope.user);
      }, function(error) {
        angular.copy($scope.user, $scope.new_user);
      });
    } else {
      UsersFactory.new($scope.new_user, function(data) {
        console.log('in User Save')
        console.log(data)
        toaster.pop('success', 'User '+data.user.username+ 'created');
        $location.path('/administration/users');
      }, function(error) {
        console.log('in user Save error');
        console.log(error);
        toaster.pop('error', 'An error occured');
      })
    }
  }
  $scope.doReset = function() {
    if (!$scope.newUser) {
      $scope.is_edit=false; 
    } else {
      console.log($scope.$parent.$parent);
      $scope.$parent.$parent.add_user=false;
    }
    angular.copy($scope.user, $scope.new_user);
  }
  $scope.list();
}

dc2Directives.controller('UserSettingsController', ['$scope', 'toaster', 'UsersFactory', 'GroupsFactory', UserSettingsController])

function UserSetting() {
  return {
    templateUrl: 'partials/directives/usersetting.html',
    restrict: 'E',
    scope: {
      authenticated: '=',
      user: '=',
      newUser: '=',
      editEnable: '='
    },
    controller: UserSettingsController
  }
}

dc2Directives.directive('userSettings', [UserSetting])