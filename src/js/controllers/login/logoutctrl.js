
function LogoutCtrl($localStorage, $location) {
	if ($localStorage.authenticated) {
		delete $localStorage.authenticated;
		delete $localStorage.auth_token;
		delete $localStorage.auth_user;
		delete $localStorage.user;
	}
	$location.path('/login');
}

dc2DashboardControllers.controller('LogoutCtrl', ['$localStorage', '$location', '$localStorage', LogoutCtrl]);
