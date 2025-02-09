import { lazy } from 'react'

const DashboardAnalytics = lazy(() => import('../../views/dashboard/analytics'))
const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))

const DashboardRoutes = [

  {
    path: '/dashboard',
    element: <DashboardEcommerce />
  }
]

export default DashboardRoutes
