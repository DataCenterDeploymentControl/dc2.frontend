function UsersFactory($resource, dc2ResourceInterceptor) {
  return $resource("http://localhost:5000/api/admin/v1/users/:username/:state", {username:null, state:null}, {
    query: {
      method:'GET',
      isArray:true
    },
    update: {
      method:'put',
      params:{username:'@username'},
      data:'@user',
      isArray:false
    },
    get: {
      method:'get',
      params:{username:'@username'},
      isArray:false
    },
    new: {
      method:'post',
      data:'@user',
      isArray:false
    },
    remove: {
      method:'delete',
      params:{username: '@username'},
      isArray:false
    },
    enable: {
      method:'get',
      params:{username: '@username', state:'enable'},
      isArray:false
    },
    disable: {
      method:'get',
      params:{username: '@username', state:'disable'},
      isArray:false
    }
  });
}

dc2Factories.factory('UsersFactory', ['$resource', 'dc2ResourceInterceptor', UsersFactory]);
