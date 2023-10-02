import dynamic from 'next/dynamic'

const AdminContainer = dynamic(() => import('~/layouts/containers/Admin'))

const routes = [
  {
    path: '/dashboard',
    layout: AdminContainer,
  },
]

const dashboardRoutes = routes

export default dashboardRoutes
