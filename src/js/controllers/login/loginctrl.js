function LoginCtrl($rootScope, $scope, $location, $localStorage, LoginFactory, UsersFactory) {

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
        $localStorage.authenticated=true;
        $localStorage.auth_token = headers()['x-dc2-auth-token'];
        $localStorage.auth_user = headers()['x-dc2-auth-user'];
        console.log('in doLogin');
        console.log($localStorage);
        if ('user' in data) {
          $localStorage.user = data['user'];
        }
      }
      console.log($localStorage.authenticated);
      if ($localStorage.authenticated) {
        $location.path('/');
      }

    }, function(errors) {
      alert('Authentication Error!')
    });

  }
}

dc2DashboardControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'LoginFactory', 'UsersFactory', LoginCtrl]);
