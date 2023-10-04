import accountRoutes from './admin/account'
import dashboardRoutes from './admin/dashboard'

// @ts-expect-error
export const globalRoutes = [].concat(dashboardRoutes, accountRoutes)
