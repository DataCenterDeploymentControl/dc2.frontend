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
      'heading': 'IPAM',
      'needs_group': 'users',
      'items': [
        {
          'title': 'IP Networks',
          'link': '/ipam/ipnetworks'
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
      'items': [
        {
          'title': 'Xen Dashboard',
          'link': '/xen/dashboard'
        }
      ]
    }
  ]
})
