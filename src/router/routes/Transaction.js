// ** React Imports
import { lazy } from "react"


const TransactionList = lazy(() => import('../../views/transaction/list'))



const TransactionRoutes = [
  {
    key: "TRANSACTIONS_LIST",
    element: <TransactionList />,
    path: '/transaction/list'
  },

]

export default TransactionRoutes
