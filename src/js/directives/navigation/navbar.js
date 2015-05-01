
function navBarController($localStorage, $scope) {
	console.log('in navBarController');
	$scope.checkGroup = function(user, groupname) {
		if (user && groupname) {
			if ('groups' in user) {
				console.log('groups found in user');
				if (user.groups.indexOf(groupname) > -1) {
					return true;
				}
			}
		}
	}
}

dc2Directives.controller('navBarController', ['$localStorage', '$scope', navBarController]);

function DirectiveNavbar() {
	console.log('in Directive')
	return {
		templateUrl: 'partials/directives/navbar.html',
		restrict: 'E',
		scope: {
			authenticated: "=",
			user: "="
		},
		controller: navBarController
	}
}

dc2Directives.directive('navbar', [DirectiveNavbar])