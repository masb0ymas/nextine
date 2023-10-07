import dynamic from 'next/dynamic'

const AdminContainer = dynamic(() => import('~/layouts/containers/Admin'))

const routes = [
  {
    path: '/setting',
    layout: AdminContainer,
  },
]

const settingRoutes = routes

export default settingRoutes
