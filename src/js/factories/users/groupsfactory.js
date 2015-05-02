function GroupsFactory($resource) {
  return $resource("http://localhost:5000/api/admin/v1/groups",{}, {
    query: {
      method:'GET',
      isArray:true
    }
  });
}

dc2Factories.factory('GroupsFactory', ['$resource', GroupsFactory]);
