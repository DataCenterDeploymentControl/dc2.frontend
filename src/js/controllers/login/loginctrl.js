function LoginCtrl($rootScope, $scope, $location, $routeParams, LoginFactory, UsersFactory) {

  console.log($routeParams);
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
        $rootScope.authenticated=true;
        $rootScope.auth_token = headers()['x-dc2-auth-token'];
        $rootScope.auth_user = headers()['x-dc2-auth-user'];
        console.log('in doLogin');
        console.log($rootScope)
        if ('user' in data) {
          $rootScope.user = data['user'];
        }
      }
      if ($rootScope.authenticated) {
        $location.path('/');
      }

    }, function(errors) {
      alert('Authentication Error!')
    });

    $scope.doLogout = function() {
      console.log('in doLogout')
    }
  }
}

dc2DashboardControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'LoginFactory', 'UsersFactory', LoginCtrl]);
