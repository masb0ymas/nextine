import {
  IconAnalyze,
  IconApps,
  IconDeviceDesktopAnalytics,
  IconHistory,
  IconHome2,
  IconServerCog,
  IconSettings,
  IconUser,
  IconUsers,
} from '@tabler/icons-react'
import React from 'react'

interface LinkProps {
  icon: React.ReactNode
  color: string
  label: string
  link?: string
}

export interface MainLinkProps extends LinkProps {
  links?: LinkProps[]
}

function useMenuSidebar() {
  const data = [
    { icon: IconHome2, label: 'Home', link: '/dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics', link: '/analytic' },
    {
      icon: IconUsers,
      label: 'Account',
      links: [
        {
          icon: IconUser,
          label: 'User',
          link: '/account/user',
        },
        {
          icon: IconAnalyze,
          label: 'Role',
          link: '/account/role',
        },
        {
          icon: IconHistory,
          label: 'Session',
          link: '/account/session',
        },
      ],
    },
    {
      icon: IconSettings,
      label: 'Settings',
      links: [
        {
          icon: IconApps,
          label: 'App',
          link: '/setting/app',
        },
        {
          icon: IconServerCog,
          label: 'Master Data',
          link: '/setting/master',
        },
      ],
    },
  ]

  return { data, total: data.length }
}

export default useMenuSidebar
