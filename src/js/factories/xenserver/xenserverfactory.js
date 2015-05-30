function XenServerFactory($resource) {
  return $resource("http://localhost:5000/api/xen/v1/admin/servers", {}, {
    query: {
      method:'GET',
      isArray:true
    },
    new: {
      method:'POST',
      data:'@server',
      isArray: false
    },
    get: {
      method:'GET',
      url:"http://localhost:5000/api/xen/v1/admin/servers/:id",
      params:{id:'@id'},
      isArray:false
    },
    delete: {
      method: 'DELETE',
      url: "http://localhost:5000/api/xen/v1/admin/servers/:id",
      params: {id:'@id'},
      isArray: false
    },
    update: {
      method: 'PUT',
      url: "http://localhost:5000/api/xen/v1/admin/servers/:id",
      params: {id:'@id'},
      isArray: false
    }
  });
}

dc2Factories.factory('XenServerFactory', ['$resource', XenServerFactory]);
