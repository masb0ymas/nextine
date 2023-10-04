import dynamic from 'next/dynamic'

const AdminContainer = dynamic(() => import('~/layouts/containers/Admin'))

const routes = [
  {
    path: '/account',
    layout: AdminContainer,
  },
]

const accountRoutes = routes

export default accountRoutes
