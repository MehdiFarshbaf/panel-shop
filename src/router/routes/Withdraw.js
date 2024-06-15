// ** React Imports
import { lazy } from "react"


const WithdrawList = lazy(() => import('../../views/withdraw/list'))

const WithdrawRoutes = [
  {
    key: "WITHDRAWS_LIST",
    element: <WithdrawList />,
    path: '/withdraw/list'
  },

]

export default WithdrawRoutes
