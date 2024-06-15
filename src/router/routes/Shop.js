// ** React Imports
import { lazy } from "react"

const ShopAdd = lazy(() => import('../../views/shop/add'))
const ShopList = lazy(() => import('../../views/shop/list'))
const ShopEdit = lazy(() => import('../../views/shop/edit'))


const ShopRoutes = [
  {
    key: "BUSINESSES_LIST",
    element: <ShopList />,
    path: '/shop/list'
  },
  {
    key: "BUSINESSES_UPDATE",
    element: <ShopEdit />,
    path: '/shop/edit/:id'
  },

]

export default ShopRoutes
