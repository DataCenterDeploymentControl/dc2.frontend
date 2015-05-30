function XenFactory($resource) {
  return $resource("http://localhost:5000/api/xen/v1/servers", {}, {
    query: {
      method:'GET',
      isArray:true
    },
    get: {
      method: 'GET',
      url: "http://localhost:5000/api/xen/v1/servers/:id",
      params:{id:'@id'},
      isArray: false
    }
    // new: {
    //   method:'POST',
    //   data:'@server',
    //   isArray: false
    // },
    // get: {
    //   method:'GET',
    //   url:"http://localhost:5000/api/xen/v1/admin/servers/:id",
    //   params:{id:'@id'},
    //   isArray:false
    // },
    // delete: {
    //   method: 'DELETE',
    //   url: "http://localhost:5000/api/xen/v1/admin/servers/:id",
    //   params: {id:'@id'},
    //   isArray: false
    // },
    // update: {
    //   method: 'PUT',
    //   url: "http://localhost:5000/api/xen/v1/admin/servers/:id",
    //   params: {id:'@id'},
    //   isArray: false
    // }
  });
}

dc2Factories.factory('XenFactory', ['$resource', XenFactory]);
