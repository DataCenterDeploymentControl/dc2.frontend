function LoginFactory($resource) {
  return $resource("http://localhost:5000/api/auth/v1/login", {}, {
    post: {method: "POST"}
  });
}

function AuthFactory($resource) {
  return $resource("http://localhost:5000/api/auth/v1/authcheck", {}, {
    check: {method: "GET"}
  });
}

dc2Factories.factory('LoginFactory', ['$resource', LoginFactory]);
dc2Factories.factory('AuthFactory', ['$resource', AuthFactory]);
