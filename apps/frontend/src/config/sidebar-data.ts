import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconDeviceDesktopCog,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconNotification,
  IconPackages,
  IconPalette,
  IconPlus,
  IconPresentation,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
  IconUserScan,
} from '@tabler/icons-react'
import { Command } from 'lucide-react'
import { type SidebarData } from '../components/layout/types'

export const sidebarData: SidebarData = {
  user: {
    name: 'kenneth',
    email: 'kenneth@gmail.com',
    avatar: '',
  },
  teams: [
    {
      name: 'Campaign 2022',
      logo: Command,
      plan: 'Nicaragua 2022',
    },
  ],
  navGroups: [
    {
      title: 'Campaign',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Manage Campaigns',
          url: '/campaign',
          icon: IconDeviceDesktopCog,
        },
        {
          title: 'Voters',
          url: '/campaign/voters',
          icon: IconChecklist,
        },
        {
          title: 'Settings',
          url: '/campaign/settings',
          icon: IconSettings,
        },
      ],
    },
    {
      title: 'Admin',
      items: [
        {
          title: "Users",
          url: "/admin/users",
          icon: IconUsers,
        },
        {
          title: 'Campaigns',
          icon: IconPresentation,
          items: [
            {
              title: 'Campaigns',
              url: '/campaigns',
              icon: IconPackages,
            },
            {
              title: 'Create Campaign',
              url: '/campaigns/create',
              icon: IconPlus,
            },
            {
              title: "Voters",
              url: "dashboard/admin/voters",
              icon: IconUserScan,
            },
          ],
        },
      ],
    },
    {
      title: 'App',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings/profile',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
