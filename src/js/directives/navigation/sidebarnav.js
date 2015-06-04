
function sideBarController(SideBarMenus, $location) {
	var self = this;
  this.sidebarmenus = SideBarMenus.menus;
	this.checkGroup = function(user, groupname) {
		if (groupname) {
			if ('groups' in user) {
				if (user.groups.indexOf(groupname) > -1) {
					return true;
				}
			}
		}
	}
  this.doDropDown = function(menu) {
    if (! menu.is_down) {
			console.log(menu);
      menu.is_down = true;
			if ('default' in menu) {
				console.log(menu.default);
				console.log(menu.items[menu.default].link);
				$location.path(menu.items[menu.default].link)
			}
    } else {
      menu.is_down = false;
    }
  }
  this.isDown = function(menu) {
    if (! 'is_down' in menu) {
      menu.is_down = false;
    }
    return menu.is_down;
  }
  console.log(SideBarMenus.menus);
	this.is_admin = this.checkGroup(this.user,'admin');
	this.is_user = this.checkGroup(this.user,'user');
}

dc2Directives.controller('sideBarController', ['SideBarMenus', '$location', sideBarController]);

function DirectiveSideBarNav() {
	console.log('in SideBarNav Directive')
	return {
		templateUrl: 'partials/directives/sidebarnav.html',
		restrict: 'E',
		scope:  {
			authenticated: "=",
			user: "="
		},
		bindToController: true,
		controller: 'sideBarController',
		controllerAs: 'ctrlSideBar'
	}
}

dc2Directives.directive('sidebar', [DirectiveSideBarNav]);
