import { HomeIcon, SettingsIcon, UserIcon, HistoryIcon, AutomationIcon } from '../Icons'

export const sidebarLinks = [
  {
    label: 'Dashboard',
    path: '/',
    icon: <HomeIcon />,
    roles: ['admin', 'user', 'guest'],
  },
  {
    label: 'History',
    path: '/history',
    icon: <HistoryIcon />,
    roles: ['admin', 'user'],
  },
  {
    label: 'Automation',
    path: '/automation',
    icon: <AutomationIcon />,
    roles: ['admin', 'user'],
  },
  {
    label: 'User management',
    path: '/user-management',
    icon: <UserIcon />,
    roles: ['admin'],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <SettingsIcon />,
    roles: ['admin', 'user'],
  },
]
