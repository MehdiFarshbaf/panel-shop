// ** React Imports
import { lazy } from "react"

const DiscountAdd = lazy(() => import('../../views/discount/add'))
const DiscountList = lazy(() => import('../../views/discount/list'))
const DiscountEdit = lazy(() => import('../../views/discount/edit'))


const DiscountRoutes = [
  {
    key: "DISCOUNTS_LIST",
    element: <DiscountList />,
    path: '/discount/list'
  },
/*
  {
    element: <DiscountAdd />,
    path: '/discount/create'
  },
*/

]

export default DiscountRoutes
