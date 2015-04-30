function LoginCtrl($rootScope, $scope, $location, LoginFactory, UsersFactory) {
  $scope.user = {
    'email': null,
    'password': null,
    'auth_type': 'local'
  }

  $scope.doLogin = function(login) {
    console.log(login);
    LoginFactory.post(login, function(data, headers) {
      if ('x-dc2-auth-token' in headers() && 'x-dc2-auth-user' in headers()) {
        console.log(headers()['x-dc2-auth-token']);
        console.log(headers()['x-dc2-auth-user']);
        $rootScope.authenticated=false;
        $rootScope.auth_token = headers()['x-dc2-auth-token'];
        $rootScope.auth_user = headers()['x-dc2-auth-user'];
        console.log('in doLogin');
        console.log($rootScope)

      }
    }, function(errors) {
      console.log('in login error')
      console.log(errors);
    });

  }
}

dc2DashboardControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'LoginFactory', 'UsersFactory', LoginCtrl]);
