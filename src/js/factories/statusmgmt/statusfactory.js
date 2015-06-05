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
    }
  });
}

dc2Factories.factory('StatusFactory', ['$resource', StatusFactory]);
