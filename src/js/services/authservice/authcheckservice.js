function AuthCheckService($q, $location, AuthFactory) {
  console.log('In AuthCheckService');
  var defered = $q.defer();
  AuthFactory.check(function(data) {
    console.log('success');
    console.log(data);
    defered.resolve(true);
  }, function(error) {
    console.log('error');
    console.log(error);
    defered.reject();
    $location.path('/login');
  });
  return defered.promise;
}

dc2Services.service('AuthCheckService', ['$q', '$location', 'AuthFactory', AuthCheckService]);
