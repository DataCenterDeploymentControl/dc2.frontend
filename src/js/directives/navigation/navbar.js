
function DirectiveNavbar() {
	console.log('in Directive')
	return {
		templateUrl: 'partials/directives/navbar.html',
		restrict: 'E',
		scope: {
			authenticated: "=",
			user: "="
		}
	}
}

dc2Directives.directive('navbar', [DirectiveNavbar])