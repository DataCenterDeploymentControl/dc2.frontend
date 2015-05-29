function AuthCheckService(AuthFactory) {
  console.log('In AuthCheckService');
  return AuthFactory.get().$promise;
}

dc2Services.service('AuthCheckService', ['AuthFactory', AuthCheckService]);
