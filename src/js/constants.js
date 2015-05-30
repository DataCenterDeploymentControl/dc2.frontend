DC2Frontend.constant('SideBarMenus', {
  'menus': [
    {
      'heading': 'Administration',
      'needs_group': 'admin',
      'items': [
        {
          'title': 'Users',
          'link': '/administration/users'
        },
        {
          'title': 'Groups',
          'link': '/administration/groups'
        },
        {
          'title': 'XenServers',
          'link': '/administration/xenservers'
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
    }
  ]
})
