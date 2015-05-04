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


function IPNetworkInfoFactory($resource) {
  return $resource("http://localhost:5000/api/ipam/v1/ipnetworks/info/:ipnetwork", {ipnetwork:null}, {
    get: {
      method:'GET',
      isArray:false,
      params:{ipnetwork:"@ipnetwork"}
    } 
  })
}

dc2Factories.factory('IPNetworkInfoFactory', ['$resource', IPNetworkInfoFactory]);
