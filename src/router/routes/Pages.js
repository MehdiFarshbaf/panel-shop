import { lazy } from "react"

const AccountSettings = lazy(() => import('../../views/pages/account-settings'))
const RegisterAdmin = lazy(() => import('../../views/pages/add'))

const PagesRoutes = [
  {
    path: '/pages/account-settings',
    element: <AccountSettings />
  },
  {
    path: '/pages/register-admin',
    element: <RegisterAdmin />
  },
]

export default PagesRoutes
