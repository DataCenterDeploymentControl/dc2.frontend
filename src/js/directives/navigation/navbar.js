
function navBarController() {
	var self = this;
	this.checkGroup = function(user, groupname) {
		if (groupname) {
			if ('groups' in user) {
				console.log('groups found in user');
				if (user.groups.indexOf(groupname) > -1) {
					return true;
				}
			}
		}
	}
	if (this.authenticaed) {
		this.is_admin = this.checkGroup(this.user,'admin');
		this.is_user = this.checkGroup(this.user,'user');
	}
}

dc2Directives.controller('navBarController', [navBarController]);

function DirectiveNavbar() {
	console.log('in Directive')
	return {
		templateUrl: 'partials/directives/navbar.html',
		restrict: 'E',
		scope:  {
			authenticated: "=",
			user: "="
		},
		bindToController: true,
		controller: 'navBarController',
		controllerAs: 'navBarCtrl'
	}
}

dc2Directives.directive('navbar', [DirectiveNavbar])
