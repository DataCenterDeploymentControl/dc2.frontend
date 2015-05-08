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
  return $resource("http://localhost:5000/api/ipam/v1/ipnetworks/info", {ipnetwork:null}, {
    get: {
      method:'GET',
      isArray:false,
      data:{ipnetwork:"@ipnetwork"}
    } 
  });
}

dc2Factories.factory('IPNetworkInfoFactory', ['$resource', IPNetworkInfoFactory]);

function IPNetworkUsedIPsFactory($resource) {
  return $resource("http://localhost:5000/api/ipam/v1/ipnetworks/used", {ipnetwork:null}, {
    get: {
      method: 'GET',
      isArray: true,
      data:{ipnetwork:"@ipnetwork"}
    }
  });
}

dc2Factories.factory('IPNetworkUsedIPsFactory', ['$resource', IPNetworkUsedIPsFactory]);

function HostEntryFactory($resource) {
  return $resource("http://localhost:5000/api/ipam/v1/hostentries", {hostipentry:null}, {
    new: {
      method: 'POST',
      isArray: false,
      data:"@hostipentry"
    }
  });
}

dc2Factories.factory('HostEntryFactory', ["$resource", HostEntryFactory]);