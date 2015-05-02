function UserSettingsController($scope, UsersFactory, GroupsFactory) {
  $scope.new_user = {};
  angular.copy($scope.user, $scope.new_user);
  $scope.all_groups = null
  GroupsFactory.query(function(data) {
    console.log('GroupsFactory data');
    console.log(data);
    $scope.all_groups = data;
  })
  $scope.is_edit = false;
  $scope.doEdit = function() {
    $scope.is_edit = true;
  }
  $scope.doSave = function() {
    console.log('$scope.user');
    console.log($scope.user);
    console.log('$scope.new_user');
    console.log($scope.new_user);
    $scope.is_edit = false; 
    console.log($scope.new_user);
    UsersFactory.update({username: $scope.new_user.username}, $scope.new_user, function(data) {
      console.log('in user update');
      console.log(data);
      angular.copy($scope.new_user, $scope.user);
    }, function(error) {
      angular.copy($scope.user, $scope.new_user);
      console.log('in user update error');
      console.log(error);
    })
  }
  $scope.doReset = function() {
    $scope.is_edit=false;
    angular.copy($scope.user, $scope.new_user);
  }
}

dc2Directives.controller('UserSettingsController', ['$scope', 'UsersFactory', 'GroupsFactory', UserSettingsController])

function UserSetting() {
  return {
    templateUrl: 'partials/directives/usersetting.html',
    restrict: 'E',
    scope: {
      authenticated: '=',
      user: '='
    },
    controller: UserSettingsController
  }
}

dc2Directives.directive('userSettings', [UserSetting])