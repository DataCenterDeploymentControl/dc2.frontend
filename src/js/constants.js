DC2Frontend.constant('SideBarMenus', {
  'menus': [
    {
      'heading': 'Administration',
      'needs_group': 'admin',
      'items': [
        {
          'title': 'Users',
          'link': '/administration/users',
          'id': 'admin_users'
        },
        {
          'title': 'Groups',
          'link': '/administration/groups',
          'id': 'admin_groups'
        },
        {
          'title': 'XenServers',
          'link': '/administration/xen',
          'id': 'admin_xenservers'
        }
      ]
    },
    {
      'heading': 'Status Management',
      'needs_group': 'users',
      'default': 0,
      'items': [
        {
          'title': 'Dashboard',
          'link': '/statusmgmt',
          'is_default': true
        }
      ]
    },
    {
      'heading': 'IPAM',
      'needs_group': 'users',
      'default': 0,
      'items': [
        {
          'title': 'IP Networks',
          'link': '/ipam/ipnetworks',
          'is_default': true
        },
        {
          'title': 'Domains',
          'link': '/ipam/domains'
        }
      ]
    },
    {
      'heading': 'Xen Infrastructure',
      'needs_group': 'users',
      'default': 0,
      'items': [
        {
          'title': 'Xen Dashboard',
          'link': '/xen/dashboard',
          'is_default': true
        }
      ]
    }
  ]
})
