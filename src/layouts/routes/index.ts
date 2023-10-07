import accountRoutes from './admin/account'
import dashboardRoutes from './admin/dashboard'
import settingRoutes from './admin/setting'

export const globalRoutes = [].concat(
  // @ts-expect-error
  dashboardRoutes,
  accountRoutes,
  settingRoutes
)
