function UsersFactory($resource, dc2ResourceInterceptor) {
  return $resource("http://localhost:5000/api/admin/v1/users/:username", {username:null}, {
    query: {
      method:'GET',
      isArray:true
    },
    update: {
      method:'put',
      params:{username:'@username'},
      data:'@user',
      isArray:false
    }
  });
}

dc2Factories.factory('UsersFactory', ['$resource', 'dc2ResourceInterceptor', UsersFactory]);
