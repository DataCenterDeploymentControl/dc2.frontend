function IPNetworkFactory($resource) {
  return $resource("http://localhost:5000/api/ipam/v1/ipnetworks", {}, {
    query: {
      method:'GET',
      isArray:true
    },
    new: {
      method:'POST',
      data:'@ipnetwork',
      isArray:false
    }
  });
}

dc2Factories.factory('IPNetworkFactory', ['$resource', IPNetworkFactory]);
