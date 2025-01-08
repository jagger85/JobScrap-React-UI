import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  HistoryIcon,
  AutomationIcon,
  ScrapIcon,
} from '../Icons'

export const sidebarLinks = [
  {
    label: 'Overview',
    path: '/',
    icon: <HomeIcon />,
    roles: ['admin', 'user', 'guest'],
  },
  {
    label: 'Run Scraper',
    path: '/scrap',
    icon: <ScrapIcon />,
    roles: ['admin', 'user'],
  },
  {
    label: 'Scheduled Tasks',
    path: '/automation',
    icon: <AutomationIcon />,
    roles: ['admin', 'user'],
  },
  {
    label: 'Scraping History',
    path: '/history',
    icon: <HistoryIcon />,
    roles: ['admin', 'user'],
  },

  {
    label: 'Manage Users',
    path: '/user-management',
    icon: <UserIcon />,
    roles: ['admin'],
  },
  {
    label: 'Preferences',
    path: '/settings',
    icon: <SettingsIcon />,
    roles: ['admin', 'user'],
  },
]
