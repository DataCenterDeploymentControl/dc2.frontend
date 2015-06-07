function StatusFactory($resource) {
  return $resource("http://localhost:5000/api/statusmgmt/v1/states", {}, {
    query: {
      method:'GET',
      isArray:true
    },
    new: {
      method: 'POST',
      isArray: false,
      data:'@entry'
    },
    update: {
      method: 'PUT',
      url:"http://localhost:5000/api/statusmgmt/v1/states/:id",
      params: {id: '@id'},
      data: '@entry',
      isArray: false
    },
    delete: {
      method: 'DELETE',
      url:"http://localhost:5000/api/statusmgmt/v1/states/:id",
      params: {id: '@id'},
      data: '@entry',
      isArray: false      
    }
  });
}

dc2Factories.factory('StatusFactory', ['$resource', StatusFactory]);
