function UserSettingsController($scope) {

}

dc2Directives.controller('UserSettingsController', ['$scope', UserSettingsController])

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